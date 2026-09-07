# Maren — landing page

Next.js 15 (App Router, TypeScript), Supabase for the waitlist, GA4 for
acquisition analytics. Deployed on Vercel.

```
app/               layout (metadata, fonts, GA), page, globals.css, robots, sitemap
components/        sections (server-rendered) + form/sticky/modal (client)
lib/               analytics, gtag, supabase, terms, env, storage
supabase/          schema.sql — run once, in the Supabase SQL editor
legacy/            the original single-file index.html, for reference
```

## Setup

```sh
npm install
cp .env.example .env.local     # then paste your GA4 Measurement ID
npm run dev
```

`.env.local`:

| var | what it does |
|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` from GA4 → Admin → Data Streams. **Blank disables GA entirely** — the site works fine without it. |
| `NEXT_PUBLIC_ANALYTICS_DEBUG` | `true` logs every event to the browser console. Off in production. |
| `NEXT_PUBLIC_SUPABASE_URL` / `_ANON_KEY` | The publishable key. Safe in the browser — see below. |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL. Used for OG tags, sitemap, and the server-rendered share link. |

Database, once: open the [SQL editor](https://supabase.com/dashboard/project/yeayejlzcrykgfmnigxy/sql),
paste all of `supabase/schema.sql`, run it. Safe to re-run. Confirm with
`select * from public.waitlist_stats();` — all zeros.

## Deploy

```sh
npx vercel                     # link once
npx vercel --prod
```

Set the four `NEXT_PUBLIC_*` vars in the Vercel project settings. They are
build-time inlined, so **changing one requires a redeploy**, not just a restart.

## Analytics

Every event goes to **both** Supabase and GA4. They answer different questions
and neither replaces the other:

- **Supabase** (`analytics` schema) can join an event back to a waitlist row.
  Events are batched — 25 events or 5 seconds, whichever comes first — and
  flushed with `keepalive` on page hide so the last batch survives the tab
  closing.
- **GA4** knows about acquisition channels, devices, and geography, and fires
  immediately.

`visitor_id` is the join key: the same UUID is written to `analytics.events` and
set as a GA4 user property, so a GA4 segment can be traced back to individual
rows.

### The event table

| event | fires when | Supabase | GA4 |
|---|---|---|---|
| `page_view` | on load | ✓ | — (gtag sends its own; ours would double-count) |
| `referral_visit` | arrived on a `?ref=` link | ✓ | ✓ |
| `section_view` | a `data-sec` block scrolls into view | ✓ | ✓ |
| `scroll_depth` | 25 / 50 / 75 / 100% | ✓ | ✓ |
| `carousel_swipe` | phone preview swiped | ✓ | ✓ |
| `form_focus` | first touch of any email/city field | ✓ | ✓ |
| `email_invalid` | empty or malformed, with `source` | ✓ | ✓ |
| `email_valid` | passed validation, with `source` | ✓ | ✓ |
| `city_filled` | optional city field left non-empty | ✓ | ✓ |
| `step_view` | steps 2, 3, 4 shown | ✓ | ✓ |
| `chip_select` | frustration chip picked | ✓ | ✓ |
| `custom_answer_typed` | they typed their own words instead | ✓ | ✓ |
| `step_continue` | left step 2 | ✓ | ✓ |
| `phone_submit` / `phone_skip` | step 3 resolved | ✓ | ✓ |
| `signup_complete` | row finalised | ✓ | ✓ + `sign_up` + `generate_lead` |
| `share_copy` / `share_click` | referral link copied or a channel opened | ✓ | ✓ + `share` |
| `dream_send` / `dream_skip` | post-signup open question | ✓ | ✓ |
| `terms_open` / `terms_accept` / `terms_close` / `terms_required` / `terms_read_to_end` | modal | ✓ | ✓ |
| `stats_shown` | counters crossed `MIN_SHOW` and painted | ✓ | ✓ |
| `js_error` | uncaught error or rejected promise | ✓ | ✓ |
| `exit` | page hidden, with `step` and foreground `seconds` | ✓ | ✓ |
| `web_vitals` | LCP / CLS / INP / FCP / TTFB | — | ✓ |

GA4 user properties: `visitor_id`, `is_new_visitor`, `arrived_via_referral`,
and after signup `waitlist_member`, `waitlist_position`, `referral_count`.

GA4 silently drops malformed events, so `lib/gtag.ts` normalises everything on
the way out: event and param names to `[A-Za-z0-9_]` under 40 chars, string
values truncated at 100, at most 25 params. Reserved names are re-homed rather
than dropped — a string in `value` would poison the event, so it becomes
`custom_value`.

**Do not rename the Supabase event names.** `analytics.funnel` matches on the
literal strings `page_view`, `form_focus`, `email_valid`, `step_view` and
`signup_complete`. Renaming one silently empties a funnel stage.

### Reading your analytics

GA4 has the acquisition reports. For the funnel, these six views are the
dashboard — run them in the SQL editor:

```sql
select * from analytics.funnel;    -- where do people leave?
select * from analytics.drop_off;  -- how far did each visitor get?
select * from analytics.sources;   -- which traffic actually converts?
select * from analytics.forms;     -- which of the three forms does the work?
select * from analytics.chips;     -- which pain point resonates?
select * from analytics.daily;     -- last 30 days
```

`analytics.funnel` first:

```
stage         visitors  pct_of_landed
landed             412          100.0
form_focus         188           45.6
email_valid         97           23.5
step2_viewed        71           17.2
step3_viewed        66           16.0
signup              64           15.5
```

The gap between `landed` and `form_focus` is people who read the hero and left
without touching anything — the segment row-level data alone can never see.

Events carry no PII: `visitor_id` is a random UUID in `localStorage`, there are
no cookies of our own and no fingerprinting. Once someone signs up,
`join_waitlist` back-stamps their earlier events with `waitlist_id`, so a
converted person's whole first visit is traceable.

## Why the Supabase key in the bundle is safe

`NEXT_PUBLIC_SUPABASE_ANON_KEY` is the **publishable** key. It is meant to be
public and is useless on its own:

- `public.waitlist` has RLS enabled with **zero policies**, and all grants
  revoked from `anon`. `GET /rest/v1/waitlist` returns nothing no matter what
  you send it.
- The only reachable surface is four `security definer` RPCs: `join_waitlist`,
  `update_waitlist`, `waitlist_stats`, `track`. None ever returns another
  person's email, phone, city, or answers.
- Follow-up writes are authorized by an unguessable `token`, not by email —
  otherwise anyone could overwrite a stranger's row by knowing their address.
- Analytics lives in the `analytics` schema, which PostgREST does not expose.
  The browser can write events; it has no route to read them back.
- Both write RPCs are IP rate limited (10 signups/hour, 600 events/hour).

The key that *would* be dangerous is the **service role** key. Never put that in
anything `NEXT_PUBLIC_`.

## The referral rule is a promise, not a display trick

The success screen tells people:

> You're #1,248 on the list — 2 friends have joined, you moved up 50 spots

That comes from `position = signup_order - (referrals × 25)`, floored at 1.

**Invites must be sent in that order**, or the number stops being true. To pull
the next 100 people:

```sql
select w.email, w.signup_order, count(r.id) as referrals,
       greatest(1, w.signup_order - count(r.id) * 25) as position
from public.waitlist w
left join public.waitlist r on r.referred_by = w.id
group by w.id
order by position
limit 100;
```

To change the 25, change it in `waitlist_payload` (schema.sql), in
`SPOTS_PER_REFERRAL` (`components/WaitlistProvider.tsx`), **and** in whatever
query you invite from. All three must agree.

## What gets stored

The row is created the moment someone enters a valid email at step 1, then
patched as they advance — so a person who abandons at step 2 still leaves you
their email and city, which is most of them.

| column | from |
|---|---|
| `email`, `city` | step 1 (or the bottom / sticky form) |
| `frustration` | step 2 — the chip they picked, or their own words if they typed any |
| `phone` | step 3 |
| `dream_feature` | the open question after signup |
| `source` | which of the three forms they used: `hero`, `bottom`, `sticky` |
| `referred_by` | who shared the link they arrived on |
| `visitor_id` | links the row to everything they did before signing up |

## The numbers on the page are real

The counters read from the database, and each hides itself until it means
something:

| element | appears when |
|---|---|
| waitlist count + progress bar | 25+ signups (`MIN_SHOW`) |
| "Filling N× faster than last week" | the prior week had signups *and* this week beats it by 20%+ |

On day one the hero shows just the form. Nothing is seeded, and nothing is
invented.
