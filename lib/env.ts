/**
 * Every public knob the browser bundle is allowed to read.
 *
 * `process.env.NEXT_PUBLIC_*` is inlined at build time, so each one has to be
 * written out literally — a computed lookup like `process.env[name]` compiles
 * to nothing.
 */

export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://yeayejlzcrykgfmnigxy.supabase.co";

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_bc0h8u3Rspkke0wc5izmGA_6F2W_Hdx";

/** GA4 Measurement ID, e.g. `G-XXXXXXXXXX`. Empty string disables GA entirely. */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

export const GA_ENABLED = /^G-[A-Z0-9]+$/i.test(GA_MEASUREMENT_ID);

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://meetmaren.app";

/** Mirrors every tracked event to the console. */
export const ANALYTICS_DEBUG = process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true";
