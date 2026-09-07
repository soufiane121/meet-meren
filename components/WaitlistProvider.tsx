"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import {
  flush,
  getRefCode,
  getVisitorId,
  initAnalytics,
  markSignedUp,
  noteStep,
  setSuppressed,
  track,
} from "@/lib/analytics";
import { SITE_URL } from "@/lib/env";
import { rpc, type WaitlistPayload, type WaitlistStats } from "@/lib/supabase";
import { jsonGet, lsDel, lsGet, lsSet } from "@/lib/storage";

/** Nothing about the waitlist is shown until it means something. */
export const TOTAL_CAP = 5000;
export const MIN_SHOW = 25;
/** Each referral is worth this many places. Must agree with `waitlist_payload` in schema.sql. */
export const SPOTS_PER_REFERRAL = 25;

const SESSION_KEY = "maren_session";
const STATS_POLL_MS = 60000;

export type FormSource = "hero" | "bottom" | "sticky";

type WaitlistContextValue = {
  step: number;
  goToStep: (n: number) => void;

  /** The row this browser owns, once step 1 has created it. */
  session: WaitlistPayload | null;
  /** The payload the success screen renders — position, referral code, referral count. */
  success: WaitlistPayload | null;
  stats: WaitlistStats | null;
  signed: boolean;
  barPct: number;
  shareUrl: string;

  submitEmail: (args: {
    email: string;
    city?: string;
    source: FormSource;
  }) => Promise<WaitlistPayload>;
  patchWaitlist: (fields: Record<string, unknown>) => Promise<WaitlistPayload | null>;
  showSuccess: (p: WaitlistPayload | null, isNew: boolean, source?: FormSource) => void;

  termsOpen: boolean;
  openTerms: () => void;
  closeTerms: () => void;
  acceptTerms: () => void;
  agreedHero: boolean;
  setAgreedHero: (v: boolean) => void;
  agreedBottom: boolean;
  setAgreedBottom: (v: boolean) => void;

  noteFormFocus: () => void;

  heroFormRef: RefObject<HTMLDivElement | null>;
  bottomFormRef: RefObject<HTMLDivElement | null>;
  heroEmailRef: RefObject<HTMLInputElement | null>;
  /** Scrolls the hero form into view and puts the cursor in its email field. */
  focusHeroEmail: () => void;
};

const WaitlistContext = createContext<WaitlistContextValue | null>(null);

export function useWaitlist(): WaitlistContextValue {
  const ctx = useContext(WaitlistContext);
  if (!ctx) throw new Error("useWaitlist must be used inside <WaitlistProvider>");
  return ctx;
}

/**
 * The canonical site URL is the server-render default. Reading location.origin
 * during render would produce a different string on the client and blow up
 * hydration, so the real origin is swapped in from an effect instead — which
 * also means preview deploys hand out preview links rather than production ones.
 */
const CANONICAL_BASE = SITE_URL.replace(/\/?$/, "/");

function currentBase(): string | null {
  if (typeof location === "undefined") return null;
  if (!/^https?:$/.test(location.protocol)) return null;
  return location.origin + location.pathname.replace(/[^/]*$/, "");
}

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1);
  const [session, setSession] = useState<WaitlistPayload | null>(null);
  const [success, setSuccess] = useState<WaitlistPayload | null>(null);
  const [stats, setStats] = useState<WaitlistStats | null>(null);
  const [signed, setSigned] = useState(false);
  const [barPct, setBarPct] = useState(0);
  const [termsOpen, setTermsOpen] = useState(false);
  const [agreedHero, setAgreedHero] = useState(false);
  const [agreedBottom, setAgreedBottom] = useState(false);

  const heroFormRef = useRef<HTMLDivElement | null>(null);
  const bottomFormRef = useRef<HTMLDivElement | null>(null);
  const heroEmailRef = useRef<HTMLInputElement | null>(null);
  const focusSent = useRef(false);
  // Callbacks fired from event handlers need the current token without waiting
  // for a re-render, so the session is mirrored into a ref.
  const sessionRef = useRef<WaitlistPayload | null>(null);

  // ── Session persistence ────────────────────────────────────────────────────
  const saveSession = useCallback((p: WaitlistPayload | null) => {
    if (!p?.token) return;
    const next: WaitlistPayload = {
      token: p.token,
      referral_code: p.referral_code,
      position: p.position,
      referrals: p.referrals,
    };
    sessionRef.current = next;
    setSession(next);
    lsSet(SESSION_KEY, JSON.stringify(next));
  }, []);

  // ── Success ────────────────────────────────────────────────────────────────
  const showSuccess = useCallback(
    (p: WaitlistPayload | null, isNew: boolean, source?: FormSource) => {
      setSuccess(p || {});
      setSigned(true);
      setStep(4);
      noteStep(4);
      markSignedUp(p?.position, p?.referrals);
      if (isNew) {
        track("signup_complete", {
          source: source || "hero",
          position: p?.position ?? 0,
          referred: !!getRefCode(),
        });
        flush();
      }
    },
    [],
  );

  // ── Analytics boot ─────────────────────────────────────────────────────────
  useEffect(() => initAnalytics(), []);

  // ── Session restore ────────────────────────────────────────────────────────
  useEffect(() => {
    const stored = jsonGet<WaitlistPayload>(lsGet, SESSION_KEY);
    if (!stored?.token) return;

    sessionRef.current = stored;
    setSession(stored);

    // A bare update_waitlist call just returns a fresh payload — both position
    // and referral count may have moved since this browser last loaded.
    rpc<WaitlistPayload>("update_waitlist", { p_token: stored.token })
      .then((p) => {
        saveSession(p);
        // Replaying their success screen is not an action they just took, so
        // it must not land in the funnel as a step_view or a signup.
        setSuppressed(true);
        showSuccess(p, false);
        setSuppressed(false);
      })
      .catch(() => {
        lsDel(SESSION_KEY);
        sessionRef.current = null;
        setSession(null);
      });
  }, [saveSession, showSuccess]);

  // ── Stats ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    let alive = true;
    const load = () => {
      rpc<WaitlistStats>("waitlist_stats")
        .then((s) => {
          if (alive && s) setStats(s);
        })
        .catch(() => {});
    };
    load();
    const id = setInterval(load, STATS_POLL_MS);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  // The bar animates up from zero rather than painting at its final width, so
  // the fill reads as movement. A tick of delay is enough for the transition.
  const total = stats?.total ?? 0;
  const statsVisible = total >= MIN_SHOW;
  useEffect(() => {
    if (!statsVisible) return;
    const pct = Math.min((total / TOTAL_CAP) * 100, 100);
    const id = setTimeout(() => setBarPct(pct), 100);
    return () => clearTimeout(id);
  }, [total, statsVisible]);

  const statsShownOnce = useRef(false);
  useEffect(() => {
    if (statsVisible && !statsShownOnce.current) {
      statsShownOnce.current = true;
      track("stats_shown", { total, week: stats?.week ?? 0 });
    }
  }, [statsVisible, total, stats?.week]);

  // ── Step navigation ────────────────────────────────────────────────────────
  const goToStep = useCallback((n: number) => {
    setStep(n);
    noteStep(n);
    track("step_view", { n });
  }, []);

  // ── RPC wrappers ───────────────────────────────────────────────────────────
  const submitEmail = useCallback(
    ({ email, city, source }: { email: string; city?: string; source: FormSource }) =>
      rpc<WaitlistPayload>("join_waitlist", {
        p_email: email,
        p_city: city || null,
        p_ref: getRefCode() || null,
        p_source: source,
        p_visitor: getVisitorId(),
      }).then((p) => {
        saveSession(p);
        // Land the funnel events that led here before the visitor can navigate
        // away — join_waitlist back-stamps them with the new waitlist_id.
        flush();
        return p;
      }),
    [saveSession],
  );

  /** Patches the row created at step 1. Silently no-ops without a token. */
  const patchWaitlist = useCallback(
    (fields: Record<string, unknown>) => {
      const token = sessionRef.current?.token;
      if (!token) return Promise.resolve(null);
      return rpc<WaitlistPayload>("update_waitlist", { p_token: token, ...fields })
        .then((p) => {
          saveSession(p);
          return p;
        })
        .catch(() => null);
    },
    [saveSession],
  );

  // ── Terms modal ────────────────────────────────────────────────────────────
  const openTerms = useCallback(() => {
    setTermsOpen(true);
    track("terms_open", {});
  }, []);

  const closeTerms = useCallback(() => setTermsOpen(false), []);

  const acceptTerms = useCallback(() => {
    setTermsOpen(false);
    setAgreedHero(true);
    setAgreedBottom(true);
    track("terms_accept", {});
  }, []);

  useEffect(() => {
    if (!termsOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTermsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [termsOpen]);

  // ── First form interaction ─────────────────────────────────────────────────
  const focusHeroEmail = useCallback(() => {
    const el = heroEmailRef.current;
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    // Focusing mid-scroll fights the smooth scroll and, on iOS, yanks the
    // viewport as the keyboard opens. Let the scroll settle first.
    setTimeout(() => el.focus(), 500);
  }, []);

  const noteFormFocus = useCallback(() => {
    if (focusSent.current) return;
    focusSent.current = true;
    track("form_focus", {});
  }, []);

  const [shareBase, setShareBase] = useState(CANONICAL_BASE);
  useEffect(() => {
    const base = currentBase();
    if (base) setShareBase(base);
  }, []);

  const shareUrl = useMemo(
    () => shareBase + "?ref=" + (success?.referral_code || session?.referral_code || ""),
    [shareBase, success?.referral_code, session?.referral_code],
  );

  const value = useMemo<WaitlistContextValue>(
    () => ({
      step,
      goToStep,
      session,
      success,
      stats,
      signed,
      barPct,
      shareUrl,
      submitEmail,
      patchWaitlist,
      showSuccess,
      termsOpen,
      openTerms,
      closeTerms,
      acceptTerms,
      agreedHero,
      setAgreedHero,
      agreedBottom,
      setAgreedBottom,
      noteFormFocus,
      heroFormRef,
      bottomFormRef,
      heroEmailRef,
      focusHeroEmail,
    }),
    [
      step,
      goToStep,
      session,
      success,
      stats,
      signed,
      barPct,
      shareUrl,
      submitEmail,
      patchWaitlist,
      showSuccess,
      termsOpen,
      openTerms,
      closeTerms,
      acceptTerms,
      agreedHero,
      agreedBottom,
      noteFormFocus,
      focusHeroEmail,
    ],
  );

  return <WaitlistContext.Provider value={value}>{children}</WaitlistContext.Provider>;
}
