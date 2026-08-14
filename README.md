# Maren — landing page

One static HTML file backed by Supabase. No build step, no npm, no bundler, no server.

```
maren-landing-v3.html    the entire site
supabase/schema.sql      run once, in the Supabase SQL editor
```

## Setup

1. Open the [SQL editor](https://supabase.com/dashboard/project/yeayejlzcrykgfmnigxy/sql),
   paste all of `supabase/schema.sql`, run it. It is safe to re-run.
2. Confirm it took: `select * from public.waitlist_stats();` should return all zeros.

## Deploy

Rename the file to `index.html` and drop it anywhere that serves static files —
Netlify, Cloudflare Pages, GitHub Pages, S3, a bucket, whatever:

```sh
cp maren-landing-v3.html index.html
npx netlify deploy --prod --dir .      # or drag the folder onto netlify.com/drop
```

That's the whole deploy. No environment variables, because there are no secrets in the page.

## Why the key in the HTML is safe

`SUPABASE_KEY` at the top of the script is the **publishable** key. It is meant to be public,
and it is useless on its own:

- `public.waitlist` has RLS enabled with **zero policies**, and all grants revoked from `anon`.
  `GET /rest/v1/waitlist` returns nothing no matter what you send it.
- The only reachable surface is four `security definer` RPCs: `join_waitlist`,
  `update_waitlist`, `waitlist_stats`, `track`. None of them ever returns another person's
  email, phone, city, or answers.
- Follow-up writes are authorized by an unguessable `token`, not by email — otherwise anyone
  could overwrite a stranger's row by knowing their address.
- Analytics lives in the `analytics` schema, which PostgREST does not expose at all. The browser
  can write events; it has no route to read them back.
- Both write RPCs are IP rate limited (10 signups/hour, 600 events/hour).

The key that *would* be dangerous is the **service role** key. Never put that in the page.

## The referral rule is a promise, not a display trick

The success screen tells people:

> You're #1,248 on the list — 2 friends have joined, you moved up 50 spots

That number comes from `position = signup_order - (referrals × 25)`, floored at 1.

**Invites must be sent in that order**, or the number stops being true. To pull the next 100
people:

```sql
select w.email, w.signup_order, count(r.id) as referrals,
       greatest(1, w.signup_order - count(r.id) * 25) as position
from public.waitlist w
left join public.waitlist r on r.referred_by = w.id
group by w.id
order by position
limit 100;
```

If you ever want to change the 25, change it in `waitlist_payload` **and** in whatever query you
invite from. They must agree.

## What gets stored

Every field on the page. The row is created the moment someone enters a valid email at step 1,
then patched as they advance — so a person who abandons at step 2 still leaves you their email
and city, which is usually most of them.

| column | from |
|---|---|
| `email`, `city` | step 1 (or the bottom / sticky form) |
| `frustration` | step 2 — the chip they picked, or their own words if they typed any |
| `phone` | step 3 |
| `dream_feature` | the open question after signup |
| `source` | which of the three forms they used: `hero`, `bottom`, `sticky` |
| `referred_by` | who shared the link they arrived on |
| `visitor_id` | links the row to everything they did before signing up |

## Reading your analytics

There is no dashboard — these five views are the dashboard. Run them in the SQL editor.

```sql
select * from analytics.funnel;    -- where do people leave?
select * from analytics.drop_off;  -- how far did each visitor get?
select * from analytics.sources;   -- which traffic actually converts?
select * from analytics.forms;     -- which of the three forms does the work?
select * from analytics.chips;     -- which pain point resonates?
select * from analytics.daily;     -- last 30 days
```

`analytics.funnel` is the one to look at first:

```
stage         visitors  pct_of_landed
landed             412          100.0
form_focus         188           45.6
email_valid         97           23.5
step2_viewed        71           17.2
step3_viewed        66           16.0
signup              64           15.5
```

The gap between `landed` and `form_focus` is people who read the hero and left without touching
anything — the segment that row-level data alone can never see.

Events carry no PII: `visitor_id` is a random UUID in `localStorage`, there are no cookies, no
fingerprinting, and no third-party scripts. Once someone signs up, `join_waitlist` back-stamps
their earlier events with `waitlist_id`, so you can trace a converted person's whole first visit.

## The numbers on the page are real

The counters read from the database, and each one **hides itself until it means something**:

| element | appears when |
|---|---|
| waitlist count + progress bar | 25+ signups |
| "N joined today" | at least one today (Charlotte time) |
| "N from Charlotte" | at least one city matching Charlotte |
| "Filling N× faster than last week" | the prior week had signups *and* this week beats it by 20%+ |

So on day one the hero shows just the form. Nothing is seeded, and nothing is invented. If you
want the block to appear sooner, lower `MIN_SHOW` in the script — but it is showing a real
number either way.
