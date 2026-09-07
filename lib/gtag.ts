import { ANALYTICS_DEBUG, GA_ENABLED, GA_MEASUREMENT_ID } from "./env";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type EventParams = Record<string, string | number | boolean | null | undefined>;

/**
 * GA4 rejects, silently, anything that breaks these rules:
 *   - event name: <=40 chars, letters/digits/underscore, must start with a letter
 *   - param name: <=40 chars, same character set
 *   - param string value: <=100 chars (longer values are truncated, not dropped)
 *   - <=25 params per event
 *
 * Silently is the operative word — a malformed event just never shows up in the
 * reports. So everything is normalised on the way out rather than trusted.
 */
const NAME_MAX = 40;
const VALUE_MAX = 100;
const PARAM_MAX = 25;

/** `value` is reserved by GA4 and must be numeric; a string there poisons the event. */
const RESERVED_PARAMS = new Set([
  "value",
  "currency",
  "items",
  "page_location",
  "page_referrer",
  "page_title",
]);

function normalizeName(raw: string): string {
  let n = raw
    .trim()
    .replace(/[^A-Za-z0-9_]/g, "_")
    .replace(/_{2,}/g, "_");
  if (!/^[A-Za-z]/.test(n)) n = "e_" + n;
  return n.slice(0, NAME_MAX);
}

export function sanitizeParams(params?: EventParams): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  if (!params) return out;

  let count = 0;
  for (const key of Object.keys(params)) {
    if (count >= PARAM_MAX) break;
    const v = params[key];
    if (v === null || v === undefined || v === "") continue;

    let name = normalizeName(key);
    // Re-home reserved names rather than dropping the data: `value: "Too many
    // bad matches"` becomes `custom_value`, which GA4 accepts as a dimension.
    if (RESERVED_PARAMS.has(name) && typeof v !== "number") name = "custom_" + name;

    if (typeof v === "number") {
      out[name] = Number.isFinite(v) ? v : 0;
    } else if (typeof v === "boolean") {
      out[name] = v;
    } else {
      out[name] = String(v).slice(0, VALUE_MAX);
    }
    count++;
  }
  return out;
}

export function gtag(...args: unknown[]): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  // Push the raw `arguments` shape gtag.js expects. Calling window.gtag when it
  // exists keeps ordering correct once the real script has loaded.
  if (window.gtag) window.gtag(...args);
  else window.dataLayer.push(args);
}

/** Fire a GA4 event. No-op when no Measurement ID is configured. */
export function gaEvent(name: string, params?: EventParams): void {
  if (typeof window === "undefined") return;
  const eventName = normalizeName(name);
  const payload = sanitizeParams(params);
  if (ANALYTICS_DEBUG) {
    console.debug("[ga4]", eventName, payload);
  }
  if (!GA_ENABLED) return;
  gtag("event", eventName, payload);
}

/**
 * User-scoped dimensions. `visitor_id` is the join key between GA4 and the
 * Supabase `analytics` schema — the same UUID lands in both, so a GA4 segment
 * can be traced back to individual rows.
 */
export function gaSetUserProperties(props: EventParams): void {
  if (typeof window === "undefined") return;
  const payload = sanitizeParams(props);
  if (ANALYTICS_DEBUG) console.debug("[ga4:user_properties]", payload);
  if (!GA_ENABLED) return;
  gtag("set", "user_properties", payload);
}

/** Attach params to every subsequent event on this page. */
export function gaSetDefaults(props: EventParams): void {
  if (typeof window === "undefined") return;
  const payload = sanitizeParams(props);
  if (ANALYTICS_DEBUG) console.debug("[ga4:defaults]", payload);
  if (!GA_ENABLED) return;
  gtag("set", payload);
}

export { GA_MEASUREMENT_ID, GA_ENABLED };
