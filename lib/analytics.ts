"use client";

import { ANALYTICS_DEBUG } from "./env";
import { gaEvent, gaSetDefaults, gaSetUserProperties, type EventParams } from "./gtag";
import { rpc } from "./supabase";
import { jsonGet, lsGet, lsSet, ssGet, ssSet, uuid } from "./storage";

/**
 * Dual-track analytics.
 *
 * Every call to `track()` goes two places:
 *
 *   1. Supabase — batched into the `track` RPC, exactly the wire format the
 *      `analytics` schema and its six views already expect. Event names here
 *      are load-bearing: `analytics.funnel` matches on the literal strings
 *      'page_view', 'form_focus', 'email_valid', 'step_view', 'signup_complete'.
 *      Renaming one silently empties a funnel stage.
 *
 *   2. GA4 — sent immediately via gtag, with names remapped where GA4 has a
 *      recommended equivalent (signup_complete also fires `sign_up`).
 *
 * The two systems answer different questions and neither replaces the other:
 * Supabase can join an event back to a waitlist row, GA4 knows about
 * acquisition channels. `visitor_id` is set as a GA4 user property so the two
 * can be reconciled.
 */

// ── Identity & context ───────────────────────────────────────────────────────

const VISITOR_KEY = "maren_vid";
const SESSION_KEY = "maren_sid";
const CTX_KEY = "maren_ctx";
const REF_KEY = "maren_ref";

export type PageContext = {
  path: string;
  referrer: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  gclid: string;
  fbclid: string;
  ref: string;
};

let visitorId = "";
let sessionId = "";
let refCode = "";
let ctx: PageContext | null = null;
let isNewVisitor = false;

function ensureIdentity(): void {
  if (visitorId) return;

  const stored = lsGet(VISITOR_KEY);
  if (stored) {
    visitorId = stored;
  } else {
    visitorId = uuid();
    isNewVisitor = true;
    lsSet(VISITOR_KEY, visitorId);
  }

  sessionId = ssGet(SESSION_KEY) || "";
  if (!sessionId) {
    sessionId = uuid();
    ssSet(SESSION_KEY, sessionId);
  }

  const params = new URLSearchParams(location.search);
  refCode = ssGet(REF_KEY) || params.get("ref") || "";
  if (refCode) ssSet(REF_KEY, refCode);

  // First-touch attribution: whatever brought them in stays pinned for the
  // whole session, so a later in-page navigation cannot overwrite the source.
  ctx = jsonGet<PageContext>(ssGet, CTX_KEY);
  if (!ctx) {
    ctx = {
      path: location.pathname,
      referrer: document.referrer || "",
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_term: params.get("utm_term") || "",
      utm_content: params.get("utm_content") || "",
      gclid: params.get("gclid") || "",
      fbclid: params.get("fbclid") || "",
      ref: refCode,
    };
    ssSet(CTX_KEY, JSON.stringify(ctx));
  }
}

export function getVisitorId(): string {
  ensureIdentity();
  return visitorId;
}

export function getRefCode(): string {
  ensureIdentity();
  return refCode;
}

export function getContext(): PageContext | null {
  ensureIdentity();
  return ctx;
}

// ── Supabase batching ────────────────────────────────────────────────────────

type QueuedEvent = { n: string; p: Record<string, unknown> };

const BATCH_TRIGGER = 25;
const BATCH_MAX = 50;
const FLUSH_DELAY_MS = 5000;

const queue: QueuedEvent[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let t0 = 0;

export function flush(opts?: { keepalive?: boolean }): void {
  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }
  if (!queue.length) return;
  const batch = queue.splice(0, BATCH_MAX);
  rpc(
    "track",
    { p_visitor: visitorId, p_session: sessionId, p_events: batch, p_ctx: ctx },
    opts,
  ).catch(() => {
    /* analytics must never surface an error to the visitor */
  });
}

// ── GA4 mapping ──────────────────────────────────────────────────────────────

/**
 * `null` means "do not forward to GA4". `page_view` is already collected
 * automatically by the gtag config call — forwarding ours would double every
 * session's pageview count.
 */
const GA_ALIAS: Record<string, string | null> = {
  page_view: null,
};

/** GA4 recommended events fired alongside our own, so the standard reports light up. */
const GA_ALSO: Record<string, string[]> = {
  signup_complete: ["sign_up", "generate_lead"],
  share_copy: ["share"],
  share_click: ["share"],
};

// ── track() ──────────────────────────────────────────────────────────────────

export function track(name: string, props?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  // UI transitions replayed on behalf of a returning visitor are not events.
  if (suppressed) return;
  ensureIdentity();

  const p: Record<string, unknown> = { ...(props || {}) };
  p.ms = Date.now() - t0;

  // 1. Supabase — queued, flushed in batches.
  queue.push({ n: name, p });
  if (queue.length >= BATCH_TRIGGER) flush();
  else if (!flushTimer) flushTimer = setTimeout(flush, FLUSH_DELAY_MS);

  // 2. GA4 — immediate.
  const alias = name in GA_ALIAS ? GA_ALIAS[name] : name;
  if (alias) {
    gaEvent(alias, p as EventParams);
    for (const extra of GA_ALSO[name] || []) gaEvent(extra, p as EventParams);
  }

  if (ANALYTICS_DEBUG) console.debug("[track]", name, p);
}

// ── Funnel depth, engagement time, exit ──────────────────────────────────────

let maxStep = 1;
let suppressed = false;

/** Records how far into the multi-step form the visitor got, for the `exit` event. */
export function noteStep(n: number): void {
  if (n > maxStep) maxStep = n;
}

/**
 * While restoring a returning signer's success screen we replay UI transitions
 * that the visitor did not actually perform. Those must not be tracked.
 */
export function setSuppressed(v: boolean): void {
  suppressed = v;
}

export function isSuppressed(): boolean {
  return suppressed;
}

let visAccum = 0;
let visStart = 0;
let exitSent = false;
let openingEventsSent = false;

/** Foreground milliseconds only — a tab left open in the background is not engagement. */
export function engagedMs(): number {
  return visAccum + (visStart ? Date.now() - visStart : 0);
}

// ── init ─────────────────────────────────────────────────────────────────────

let bootstrapped = false;

/**
 * Registers the page-level listeners and, the first time it runs, emits the
 * opening events.
 *
 * The listeners are re-registered on every call and torn down by the returned
 * cleanup, because React StrictMode mounts effects twice in development — a
 * once-only guard around the whole function would leave the second mount with
 * no listeners at all, and `exit` would never fire.
 */
export function initAnalytics(): () => void {
  if (typeof window === "undefined") return () => {};

  ensureIdentity();

  if (!bootstrapped) {
    bootstrapped = true;
    t0 = Date.now();
    visStart = document.visibilityState === "visible" ? Date.now() : 0;

    // Pin identity and campaign onto GA4 so every event, including the ones
    // gtag sends on its own, carries them.
    gaSetUserProperties({
      visitor_id: visitorId,
      is_new_visitor: isNewVisitor,
      arrived_via_referral: !!refCode,
    });
    gaSetDefaults({
      maren_visitor_id: visitorId,
      maren_session_id: sessionId,
      referral_code: refCode || undefined,
    });
  }

  const onVisibility = () => {
    if (document.visibilityState === "hidden") {
      if (visStart) {
        visAccum += Date.now() - visStart;
        visStart = 0;
      }
      finalFlush();
    } else if (!visStart) {
      visStart = Date.now();
    }
  };

  function finalFlush() {
    if (!exitSent) {
      exitSent = true;
      track("exit", { step: maxStep, seconds: Math.round(engagedMs() / 1000) });
    }
    flush({ keepalive: true });
  }

  const onPageHide = () => finalFlush();

  const onError = (e: ErrorEvent) => {
    track("js_error", {
      message: String(e.message || "").slice(0, 200),
      source: String(e.filename || "").slice(0, 120),
      line: e.lineno || 0,
    });
  };

  const onRejection = (e: PromiseRejectionEvent) => {
    const reason = e.reason as { message?: string } | string | undefined;
    const message =
      typeof reason === "string" ? reason : reason?.message || "unhandled rejection";
    track("js_error", { message: String(message).slice(0, 200), source: "promise" });
  };

  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("pagehide", onPageHide);
  window.addEventListener("error", onError);
  window.addEventListener("unhandledrejection", onRejection);

  if (!openingEventsSent) {
    openingEventsSent = true;
    track("page_view", {
      path: location.pathname,
      referrer: document.referrer || "",
      utm_source: ctx?.utm_source || "",
      utm_medium: ctx?.utm_medium || "",
      utm_campaign: ctx?.utm_campaign || "",
      new_visitor: isNewVisitor,
      viewport_w: window.innerWidth,
      viewport_h: window.innerHeight,
    });
    if (refCode) track("referral_visit", { code: refCode });
  }

  return () => {
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("pagehide", onPageHide);
    window.removeEventListener("error", onError);
    window.removeEventListener("unhandledrejection", onRejection);
  };
}

/** Called once someone signs up, so later GA4 events are segmentable by it. */
export function markSignedUp(position?: number, referrals?: number): void {
  gaSetUserProperties({
    waitlist_member: true,
    waitlist_position: typeof position === "number" ? position : undefined,
    referral_count: typeof referrals === "number" ? referrals : undefined,
  });
}
