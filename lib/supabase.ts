import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./env";

export type RpcOptions = { keepalive?: boolean };

/**
 * Calls one of the four `security definer` RPCs the landing page is allowed to
 * reach. Identical wire format to the old inline script — the schema did not
 * change, only where the call is made from.
 */
export function rpc<T = unknown>(
  fn: string,
  args?: Record<string, unknown>,
  opts?: RpcOptions,
): Promise<T> {
  return fetch(SUPABASE_URL + "/rest/v1/rpc/" + fn, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: "Bearer " + SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args || {}),
    keepalive: !!opts?.keepalive,
  }).then((r) =>
    r.text().then((t) => {
      let body: unknown = null;
      try {
        body = t ? JSON.parse(t) : null;
      } catch {
        /* non-JSON body — fall through to the generic error below */
      }
      if (!r.ok) {
        const e = body as { message?: string; hint?: string } | null;
        throw new Error(
          e?.message || e?.hint || "Something went wrong. Please try again.",
        );
      }
      return body as T;
    }),
  );
}

/** Payload returned by `join_waitlist` / `update_waitlist`. */
export type WaitlistPayload = {
  token?: string;
  referral_code?: string;
  position?: number;
  referrals?: number;
  signup_order?: number;
};

/** Payload returned by `waitlist_stats`. */
export type WaitlistStats = {
  total?: number;
  today?: number;
  charlotte?: number;
  week?: number;
  prev_week?: number;
};
