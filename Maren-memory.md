# Claude Memory Export — Aoh
**Exported: August 23, 2026**

---

## /profile.md
```
---
name: profile
description: Who Aoh is — solo founder building NightPeek
sources: [backfill]
aliases: []
---
- [stated] Goes by Aoh
- [stated] Solo founder building NightPeek, a real-time nightlife intelligence mobile app
- [stated] Initial target market is Charlotte, NC, with planned expansion to other US cities
- [stated] Formed an LLC for NightPeek
```

---

## /preferences.md
```
---
name: preferences
description: How Aoh wants Claude to respond
sources: [backfill]
aliases: []
---
- [stated] Prefers direct, honest, and critical feedback over validation
- [stated] Wants pushback when assessments are too encouraging or imprecise
```

---

## /areas/nightpeek.md
```
---
name: nightpeek
description: NightPeek — real-time nightlife intelligence app; architecture, launch prep, product decisions
sources: [backfill]
aliases: [wtspoppin]
---
- [stated] Real-time nightlife intelligence mobile app; initial market Charlotte, NC, with planned US expansion
- [stated] Solo-founded project; an LLC has been formed for it
- [stated] Received a reference document covering LLC formation steps, corporate veil protection, IP assignment, and tax guidance tailored to app store revenue and Stripe/RevenueCat streams

Tech stack
- [stated] iOS-only for now
- [stated] Built in React Native bare workflow with Expo modules
- [stated] Node.js / MongoDB backend
- [stated] Python ML microservice on DigitalOcean
- [stated] Mux for live streaming with geofenced venue-selection enforcement
- [stated] RevenueCat for user-side IAP (chosen over raw StoreKit)
- [stated] Stripe for B2B venue subscriptions
- [stated] EAS Build chosen for iOS builds (Mac hardware incompatible with the required macOS/Xcode version)

Product & brand decisions
- [stated] Fully dynamic ephemeral map — no static venue markers, no fake data, 24-hour reset
- [stated] B2B-primary revenue model: venue crowd intelligence dashboards and promoted placement
- [stated] Squad Mode is the key social acquisition mechanic
- [stated] VibeShift ML predictions kept out of public marketing until accuracy thresholds are met
- [stated] Heatmap uses the Arctic Signal color theme (hex #1E8CC8)
- [stated] Venue data pipeline uses geohash-based harvested zones for progressive DB self-sufficiency
- [stated] VibeShift ML pipeline designed from the start with a `features_snapshot` field and an automated heuristic accuracy feedback loop
- [stated] Final name NightPeek selected after testing 40+ candidates; nightpeek.app, nightpeek.net, and @nightpeek.app on Instagram and TikTok secured
- [stated] Tagline: "Real Crowd. Real Time. Right Night."
- [stated] Core value prop framing: NightPeek reduces friction from "where should we go?" to "we're here and it's exactly what we expected"
- [stated] Core features completed: auth, squad creation, event creation, squad recommendations, live streaming, heatmap, venue cards, VibeShift ML
- [stated] Squad Mode invite works without requiring the recipient to download the app (live and working)
- [stated] Live streaming limited to 10 min per session, twice per week, until a global limit is reached (free tier); paid IAP minute packs (30/120/300 min) unlock more streaming time
- [stated] Live streams are ephemeral — deleted immediately after ending, no VOD or replay
- [stated] Live streams are 720p
- [stated] Building a video upload feature: up to 40 sec, 720p, camera-only (no gallery), stored on Cloudflare R2 per user, shown on map like livestreams with emoji reactions, persists 12 hours then auto-removed

Launch prep
- [stated] App not yet publicly released as of Aug 2026; running a pre-launch waitlist with ~98 email signups
- [stated] TestFlight rejection resolved; has been actively testing on TestFlight for over a month as of Aug 2026
- [stated] Considers MVP ready
- [stated] Deployed backend and ML model to DigitalOcean
- [stated] Plan: submit to TestFlight under a personal name first, then initiate an LLC entity name change concurrently
- [stated] Plan: verify the bundle ID doesn't contain a personal name before public release
- [stated] Produced a pre-launch testing checklist, UI wireframes (Profile and Settings screens), and multiple master prompt files for feature development

Marketing & ASO
- [stated] Conducted extensive ASO and keyword research; reframed strategy around content-first acquisition given the emerging category with limited existing search volume
- [stated] Built a guerrilla Reddit marketing strategy for the Charlotte waitlist, with a converting comment formula built around casual framing, "cheat code" phrasing, and local specificity
- [stated] Reddit account flagged/burned; channel unusable for now
- [stated] wtspoppin.com currently serves as the NightPeek waitlist page
- [stated] No outside testers yet as of Aug 2026; solo testing only
- [stated] Venue dashboard planned for nightpeek.app web portal; venues sign up via web only, not through the mobile app

History
- [stated] Building the nightlife platform concept since at least early 2025, originally under the brand "wtspoppin" (wtspoppin.com retained)
```

---

## /areas/ai-matchmaker.md
```
---
name: ai-matchmaker
description: AI matchmaker dating app concept — curated matches, feedback-loop ML, conversational profiling; building after NightPeek launches
sources: [chat, backfill]
aliases: [dating app, pocket matchmaker, Maren]
---

- [stated] Core concept: AI matchmaker that shows only a curated handful of matches (not a swipe feed), with mandatory feedback that retrains the model
- [stated] Conversational AI onboarding using open-ended questions instead of forms to extract personality, values, and preferences
- [stated] AI layer processes unstructured conversation into structured JSON for an ML prediction model
- [stated] Users describe themselves deeply (not just what they want in a partner); ML learns which self-descriptions correlate with successful matches over time
- [stated] User swipes only within the AI-curated set (agency + quality control)
- [stated] Daily mood check-in serves three purposes: conversation starter hints for matches, re-engagement habit loop, and ongoing data enrichment via rotating micro-questions
- [stated] Mandatory feedback on rejected matches — structured taps, not open text — feeds back into ML
- [stated] Time-gated match cycles (exact timing TBD, initially considered 3 matches per 8 hours)
- [stated] Plans to cross-promote from NightPeek; NightPeek venue behavior data could feed matching engine as unique signal
- [stated] Separate app from NightPeek, not a feature inside it
- [stated] Tagline direction: "designed to not stay long in your pocket" — app's goal is successful matches, not retention
- [stated] Initial target market: Charlotte, NC (same as NightPeek)
- [stated] Building only after NightPeek launches and gains traction
- [stated] Decided against mascot for now
- [stated] Pricing model revised: free users get full onboarding AND full Discover reveal experience (all chapters, all reasoning, photos, everything — identical to premium). Free limit is action count (3 likes/dislikes per day). After actions spent, free users continue browsing full reveals but upgrade prompt triggers only when they tap like/dislike with 0 actions remaining — conversion at point of highest intent. Old model ("paid to receive matches / free sees reasoning but not person") killed — hiding the product before users feel its value kills growth at Charlotte scale
- [stated] Privacy disclaimer should appear when questions get personal, reassuring users others won't see their answers
- [stated] Onboarding is pure conversational: chat interface with the AI matchmaker personality, open text input for all Phase 2-4 questions — no interactive fragment components (V5 fragments concept killed entirely; orbit emoji, gravity sliders, reflex cards never built)
- [stated] Psychology frameworks embedded: Big Five, Attachment Theory, Gottman, Love Languages, Schwartz Values, Aron's closeness research
- [stated] Wants onboarding questions to go deep — full personality, relationship patterns, communication style, values, life direction, emotional intelligence
- [stated] "Vibe Before Face" reveal: show personality Signal and "why I picked them" first, photos only after interest expressed
- [stated] "Your Signal" — unique generated visual from onboarding data, shareable like Spotify Wrapped; doubles as viral growth mechanic
- [stated] "Dating Wrapped" — monthly/yearly shareable recap cards showing matchmaker stats and dating pattern insights
- [stated] Duo Onboarding — invite a friend to answer about you, compare self vs friend perception; built-in referral — post-MVP feature
- [stated] Considering "Matchmaker Guarantee" — 90 days free if no worthwhile intro in first 90 days
- [stated] Charlotte launch: campus ambassadors at UNC Charlotte and Johnson C. Smith, local venue event partnerships via NightPeek relationships
- [stated] Density target: 5,000 active users in Charlotte before expanding to next city
- [stated] Success anti-metric: time spent in app (less is better, unlike competitors)
- [stated] Full product bible document created covering all sections from vision through technical architecture
- [stated] Post-MVP: MCP server / ChatGPT plugin integration so users can opt-in share real-life AI conversations to enrich matchmaker profile over time
- [stated] UI/UX design is the primary concern right now — wants it to feel fun, premium, creative, and unique, matching the ambition of the concept
- [stated] Onboarding design uses progressive atmosphere shifting: light cream → warm peach → deep brown → near-black, all staying in warm spectrum (no blues/purples)
- [stated] AI matchmaker visual identity is a breathing orb (no mascot) that changes color temperature and breathing speed per phase
- [stated] Orb position is the identity system: centered above conversation during conversational phases (Phases 2-4) = she's talking to you; small top-right on user-controlled screens (intake, settings, profile editing) = she's nearby; full-screen on welcome/complete/Signal Reveal = something important is happening
- [stated] Centered orb during conversation also solves attribution in bubble-less chat — spatial hierarchy (Maren's text near orb, user's text near input) replaces chat bubbles
- [stated] Orb should lead phase transitions (orb changes character first, background environment follows) — Maren sets the mood, the room catches up
- [stated] 5-phase onboarding structure: Introduction (editorial), Warm-Up (playful chat), Real Talk (intimate chat), Deep Dive (stripped-down vulnerability), Signal Reveal (payoff)
- [stated] Not a light/dark mode toggle — one continuous experience that darkens as user goes deeper
- [stated] Decided to use full AI personalization on every answer (~22 calls per onboarding) since cost is negligible (~2.5-8 cents per user). Haiku for Phase 2 speed, Sonnet for Phase 3-4 depth.
- [stated] 18 total questions mapped across phases, estimated 9-13 min completion
- [stated] V5 is the definitive onboarding design: bubble-less chat (no message containers), open text input for Phases 2-4, Fraunces serif typography, ember particle atmosphere in Phase 4, asymmetric generative Signal constellation — V5 fragment components (orbit emoji, gravity sliders, reflex cards, floating chips in chat) removed; intake uses standard branded form controls only
- [stated] Design reference doc (matchmaker-design-reference.md) and question map created as build artifacts
- [stated] Two-layer data storage: structured profile (permanent) + raw text responses (encrypted, auto-purge after extraction)
- [stated] Sound design spec: atmospheric textures per phase via Tone.js, cinematic swell for Signal reveal
- [stated] Haptic spec: light taps Phase 2, continuous selection Phase 3, silence Phase 4, success buzz Phase 5
- [stated] Pre-onboarding intake flow finalized: Splash → Basic Info (name, birthday, gender, interested in — 4 fields only, ~30 sec) → Conversational Onboarding (Phases 2-4) → Signal Reveal (Phase 5) → Profile Completion (height, kids, smoking, location) → Photo Upload
- [stated] Photos collected AFTER Signal reveal, not before onboarding — preserves "this isn't about looks" brand promise and leverages peak emotional investment
- [stated] Basic info intake uses Phase 1 cream palette (#FDFBF8), same typography (Fraunces headlines, DM Sans body, Space Mono labels), breathing orb present throughout
- [stated] Only 4 fields gate the onboarding: name, birthday, gender, interested in — the minimum the AI needs to start the conversation
- [stated] Filter fields (height, kids, smoking/drinking, location, education, job title, religion, ethnicity) collected post-Signal as "profile completion" step, required before first match is delivered
- [stated] Location in profile completion uses GPS auto-detect with manual city entry as fallback
- [stated] Behavioral psychology in intake: foot-in-the-door (name first), endowed progress (bar starts at 8%), personalization echo (name used immediately in next step), Zeigarnik effect (visible incomplete progress), completion momentum (step-by-step reveal not a long form)
- [stated] Intake uses step-by-step single-question-per-screen flow, not a scrolling form — each step animates in/out with spring easing
- [stated] Chip selections in intake use V5 floating chip styling: transparent bg, warm border, spring easing, glow on select
- [stated] matchmaker-intake.jsx prototype created with full Splash + Basic Info flow
- [stated] Remaining screens to design: Signal Reveal (Phase 5), Post-Signal profile completion, chat (between matches) — settings screen already designed

## Auth / Login / Signup

- [stated] Auth method: email OTP (magic code, no password) — free, no password reset flow to build, no security liability
- [stated] One-time SMS phone verification at signup only — identity gate to prevent fake accounts, never asked again
- [stated] No social auth (no Google/Apple sign-in) — keeps UI clean, avoids Apple's Sign In with Apple requirement, matches intimate non-techy brand
- [stated] Signup flow (4 steps): email → email OTP → phone number → SMS OTP → complete → transitions to Basic Info
- [stated] Login flow (2 steps): email → email OTP → complete → transitions to main app (Discover or Chats)
- [stated] Welcome screen: breathing orb center stage, no logo/app name, Fraunces italic tagline "Someone out there already makes sense", matchmaker voice "I just need to get to know you first"
- [stated] Two entry points on welcome: "Begin" (signup) and "I've been here before" (login) — personal language, not product language
- [stated] Progress pips adjust per flow: 4 dots for signup, 2 for login
- [stated] Phone step headline: "One real person per seat." with lock icon privacy note and matchmaker voice "I won't ask again"
- [stated] Phase labels shift across steps: "Let's start" → "Verification" → "One-time verification" → "Almost there" (Space Mono caps)
- [stated] Complete screen splits by flow: signup gets "Good. Now let's see who you really are." / login gets "There you are. Let's pick up where we left off."
- [stated] Complete screen auto-transitions (pulsing dots, no button tap) — matchmaker moves you forward
- [stated] Orb present on every screen: large on welcome + complete, small breathing top-right on form screens
- [stated] Email collected at auth step (not deferred to profile completion) — gives marketing channel before high-dropoff onboarding zone
- [stated] matchmaker-auth-v3.jsx prototype created with full interactive flow for both paths
- [stated] V5.1 design reference doc created — updated from V5 with intake flow, full user sequence, and behavioral psychology specs
- [stated] Match browsing uses chapter-based tap-through reveal (not scroll) — matchmaker controls pacing like a story, each chapter is a full-screen moment
- [stated] Match browsing chapter sequence: Intro → Signal → Why You Two → The Echo → Investment Gate → Photo Reveal → Her Words + Traits → Hidden Layer → Decision → Post-action
- [stated] "The Echo" feature: shows user's own onboarding words, then matchmaker describes the match said something remarkably similar WITHOUT revealing the match's actual words — preserves privacy promise, creates curiosity gap, gives reason to connect ("I'll let her tell you that herself")
- [stated] Privacy-first Echo design: never show one user's raw answers to another; matchmaker can describe similarity but not quote
- [stated] Investment Gate before photo reveal: user picks what intrigues them (how she thinks / signal alignment / what she protects); choice influences matchmaker's photo commentary — creates IKEA effect and confirmation bias
- [stated] "Hidden Layer" chapter: matchmaker reveals a pattern neither person explicitly stated but AI inferred from answer patterns — peak psychological moment
- [stated] Unified warm cream palette (#FDFBF8) across the entire post-onboarding app — all tabs (Discover, Drawn to You, Chats, Profile) share the same cream world; no dark/light palette switching between screens (previous dark-for-reveals / cream-for-user-screens split killed because tab switching created jarring strobe effect and felt like two apps)
- [stated] Psychology stack for match browsing: curiosity cascade, IKEA effect, peak-end rule, halo effect, investment escalation, confirmation bias, Zeigarnik effect
- [stated] Match delivery: up to 10 queued per batch (as many as ML has scored and ready), user sees one reveal at a time, must spend an action (like/dislike) to advance to next — free users (3+3 actions) see at most 6 per day, premium (6+6) can clear all 10
- [stated] Running out of actions means stuck on current reveal (can re-read chapters but not advance) — upgrade prompt at point of maximum investment in a specific person
- [stated] Decided to build matchmaker app alongside NightPeek (side by side) rather than waiting — riding the AI matchmaker wave while it has momentum
- [stated] Match browsing interest does not auto-open chat — requires mutual interest from both sides before chat slot is used
- [stated] Action economy: 3 likes and 3 dislikes per day in profile browser, hard stop after limits reached
- [stated] Chat cap system with inactivity enforcement (day 10 nudge, day 15 enforced resolution)
- [stated] 4-hour cooldown after chat removal before new matches push to chat list
- [stated] Hidden queue for timing mismatches — silent, TTL-based, with ML resurfacing up to 2 times
- [stated] Architecture decisions documented in separate matchmaker-architecture.md file

## Psychology Framework Stack (Finalized)

- [stated] Tier 1 core matching: Attachment Theory, Schwartz Values, Differentiation of Self (new), Relationship Mindset destiny vs growth (new)
- [stated] Tier 2 high-value matching: Big Five, Gottman Conflict Patterns, Emotional Intelligence (new), Conflict Resolution Style (new)
- [stated] Tier 3 enrichment: Aron's Self-Expansion, Love Languages (demoted from most apps' core), Humor Style (new)
- [stated] Extraction-only layers (no dedicated questions, AI analyzes all responses): Narrative Identity (new), Emotional Regulation Strategies (new), Dark Triad Screening (new — safety flags for manual review)
- [stated] Love Languages demoted — academically weak, solvable with basic communication, not a deep compatibility driver
- [stated] Differentiation of Self identified as biggest gap no mainstream dating app measures — determines whether attachment patterns run on autopilot or get managed
- [stated] Dark Triad screening runs as background AI analysis across all answers — flagged profiles get manual review before entering matching pool
- [stated] 110-question pool document created organized by 12 psychological categories, each question tagged with dimensions it extracts
- [stated] Full psychology framework analysis document created — stress tests all frameworks, explains matching logic, documents rejected frameworks with rationale

## Dynamic Question Architecture (replacing static 18)

- [stated] Onboarding is NOT a fixed 18-question script — AI dynamically selects next question from the 110-question bank based on confidence gaps
- [stated] AI maintains live confidence map across all psychological dimensions, updated after every answer
- [stated] 5-7 anchor questions always asked regardless (multi-extraction heavyweights that are too valuable to skip and create the emotional arc)
- [stated] Remaining questions dynamically selected based on biggest confidence gap + current phase eligibility
- [stated] Question count is flexible — targets 9-13 min time window and minimum confidence threshold per dimension, not a fixed number
- [stated] Three-layer AI pipeline runs between every question: (1) Communication Profile — how the user communicates, figured out by question 2-3, adapts question framing and depth, (2) Psychological Profile — live confidence map, tracks contradictions between stated and revealed patterns, tests hypotheses about user, (3) Emotional State Tracking — real-time openness/closure detection, response length trends, deflection patterns, triggers dynamic phase adjustments
- [stated] Verbose users get fewer follow-ups and sharper reflections; brief users get smaller concrete questions with more structure (forced-choice framed in natural language, not UI chips)
- [stated] AI tracks contradictions between self-report and behavioral signals — weights behavioral signal heavier (e.g. says "fine being alone" but no single gap between relationships)
- [stated] AI doesn't just fill gaps — it tests hypotheses about the emerging user profile by choosing questions that confirm or challenge the picture
- [stated] Fallback mode: if AI's read on user is low-confidence (contradictory signals, very terse), defaults to safer semi-structured path instead of bold dynamic choices
- [stated] Confidence threshold minimum bar per dimension — if any core dimension below threshold in back half of onboarding, AI must prioritize it over more interesting threads
- [stated] 6 anchor questions defined and placed in phases:
  - Anchor 1 (Phase 2): "keep two things, rebuild everything else — what are you protecting?" — values + differentiation
  - Anchor 2 (Phase 2): "version of you at month one vs month six — what changed?" — attachment + Big Five + authenticity
  - Anchor 3 (Phase 3): "first real fight, hours after — what's going through your mind?" — 6 dimensions, the heavyweight
  - Anchor 4 (Phase 3): "if your ex described you fairly — what would they say?" — accountability + dark triad screening + EQ
  - Anchor 5 (Phase 4): "difference between closeness you want and closeness you're comfortable with?" — attachment + differentiation + meta-awareness
  - Anchor 6 (Phase 4): "most honest reason a relationship ended — not the version you tell people?" — narrative identity + accountability + attachment
- [stated] Emotional arc: what matters → performing vs real → when it gets hard → how you affected others → want vs can handle → the truth you hide
- [stated] Confidence thresholds and fallback path still need to be defined

## Notification Permission Flow

- [stated] Notification permission asked immediately after selfie submission, before waiting screen loads — maximum sunk cost moment, user's self-interest aligned (they want to be found)
- [stated] Pre-permission soft ask screen before iOS native dialog — matchmaker-voiced primer preserves the one OS shot; if user declines soft ask, native dialog is never triggered
- [stated] Soft ask copy: phase label "BEFORE I START", headline "I'll be working while you're away." (Fraunces italic), body "When I find someone worth your time, I don't want you to miss it."
- [stated] Orb uses "reaching" animation on notification screen — concentric pulses expanding outward
- [stated] Primary CTA: "Reach me" → triggers iOS native dialog; Secondary: "I'll check in myself" → skips without burning OS prompt
- [stated] Matchmaker whisper at bottom: "I won't be noisy. I only speak when it matters." — preempts #1 objection
- [stated] iOS dialog subtitle: "Get notified when your matchmaker finds someone worth meeting."
- [stated] Users who deny get waiting screen normally — no guilt, no acknowledgment of denial

## Waiting-for-Matches Screen

- [stated] Waiting screen lives inside main app shell — Discover tab empty state with bottom nav and settings avatar visible
- [stated] Cream palette (#FDFBF8) — user-controlled screens stay light
- [stated] Orb is the hero element with "constellation scatter" animation — particles drift outward from orb suggesting matchmaker is searching through possibilities
- [stated] Matchmaker headline: "Give me a moment with this." (Fraunces italic)
- [stated] Rotating status line crossfades between messages for sense of living activity
- [stated] Context card shows 3 concrete steps: photo verification (in-progress), profile built (done), finding people (pending) — endowed progress, not an indefinite void
- [stated] Settings accessible while waiting; user can edit details section
- [stated] Realistic wait time at MVP: couple hours (manual verification by Aoh); automation planned as user DB grows
- [stated] Whether user knows verification is manual: TBD

## Waiting → First Match Transition

- [stated] When verification clears: step 1 checkmark animates in, step 3 shifts to in-progress, headline crossfades to "Good. Now let me look.", orb particle spawn rate doubles and drift speed increases
- [stated] When match found: particles REVERSE direction — spawn at edges and pull inward toward orb (gathering motion), context card fades out, all steps complete
- [stated] Stillness beat: orb stops particles, settles into slow warm breathing with extra bloom glow, orb lifts slightly on screen
- [stated] Reveal line: "I think I found someone." fades up alone under orb, sits for ~2 seconds
- [stated] First match reveal begins on same cream palette — no dark cinema transition (unified cream decision supersedes earlier dark reveal spec)
- [stated] Full transition sequence runs ~10 seconds across 5 phases
- [stated] matchmaker-screens.jsx prototype created with both notification and waiting screens plus full transition animation

## App Name

- [stated] App name chosen: Maren — the matchmaker character IS the brand; name is Nordic/German for "the sea"
- [stated] Maren chosen over Arden (runner-up) after stress-testing both on marketing, branding, tone, and design alignment
- [stated] Naming rationale: Maren collapses brand, product, and character into one word; competitors are named after things, Maren is named after someone — category-creating
- [stated] Key brand sentence: "Maren found someone for you" — sounds like a trusted friend, not a notification
- [stated] Domain purchased: meetmaren.app ($15)

## Speech-to-Text in Onboarding

- [stated] Speech-to-text added as optional input method during onboarding — user can speak or type to answer questions
- [stated] Using expo-speech-recognition (on-device STT, no cloud, audio never leaves device)
- [stated] Flow: user taps mic → speaks → stops recording → final transcribed text appears in user input field → user can edit or tap send — no auto-send
- [stated] No backend changes — transcribed text enters the same AI pipeline as typed text
- [stated] Mic button in input area: mic icon when input is empty, send icon when text exists
- [stated] Mic permission should be requested early (Phase 2 at latest) to avoid interrupting intimate Phase 3-4 moments with OS permission dialog
- [stated] Maren vocal micro-reactions during onboarding — pre-recorded audio clips (hmm, mm, yeah, okay, soft breaths, inhales) that play as acknowledgments after user submits an answer, not full TTS speech
- [stated] Vocal reactions are local audio clips stored in app bundle — no cloud TTS, no cost, no latency
- [stated] Reactions phase-appropriate: lighter/warmer in Phase 2, grounded in Phase 3, near-subliminal in Phase 4, silence in Phase 5
- [stated] 30-40% of answers get no vocal reaction (visual orb response only) — unpredictability keeps it feeling alive
- [stated] Volume decreases across phases matching atmospheric darkening
- [stated] "This is you." is the only full sentence Maren speaks aloud — plays once during Signal Reveal, pre-recorded not TTS; the single spoken line defines Maren's voice identity
- [stated] Reactions play before text appears (not simultaneously) — 300-500ms gap creates listen-then-respond sequence
- [stated] No identical reactions within a 3-response window
- [stated] Full voice TTS for onboarding questions rejected at MVP — voice identity risk, uncanny valley, latency, cost; reconsider post-launch
- [stated] Ship only non-verbal reactions at launch (breaths, exhales, hums, tones, orb resonance) — can't misfire contextually; defer verbal reactions ("I like that", "right", "thank you", "I hear you") until content-aware classification exists, because a misfired word after a vulnerable answer is harmful
- [stated] Sound production plan: ElevenLabs Sound Effects API to prototype vocal reactions, replace with real human recordings (one person, close-mic, ~30 min session) before Charlotte launch
- [stated] Orb resonance tone (non-human sound) generated programmatically via Tone.js, not recorded — should feel digital/entity, not human
- [stated] Onboarding chat scroll behavior: fade/collapse older messages, focus on last 2-3 exchanges — older messages reduce opacity as they scroll up, keeping user psychologically in the present
- [stated] Phase atmosphere transitions should be gradual across several questions (barely noticeable to user) — not distinct moments between phases
- [stated] maren-onboarding-chat.jsx prototype created — high-fidelity interactive Phases 2-4 conversational flow with all 6 anchor questions, atmosphere darkening, breathing orb, bubble-less layout, ember particles, suggested quick-responses for demo
- [stated] MatchExperience-creamy.jsx prototype created — match browsing chapter-based reveal on unified cream palette
- [stated] discovery-creamy.jsx prototype created — Discover tab on unified cream palette
- [stated] maren-photo-verification.jsx prototype created — photo upload + selfie verification flow
- [stated] Profile screen prototype created — Signal visualization at top, photo grid with reorder, editable detail fields (job, education, height, location, children, smoking, drinking), "Deeper Profile" section surfacing Maren's psychological read back to user (values, attachment, communication, conflict, what you're looking for), and "Revisit with matchmaker" conversational flow
- [stated] "Revisit with matchmaker" feature: time-gated re-onboarding where user tells Maren what changed, Maren routes (practical vs deeper), asks targeted questions referencing original onboarding answers, and updates the Signal — serves as retention and data-freshness mechanic
- [stated] Signal Reveal (Phase 5) and Chat screen prototypes created
- [stated] maren-drawn-to-you.jsx prototype created — Drawn to You tab with empty state, populated 2-column grid, warmth decay, free paywall reveal, and Devoted full reveal
- [stated] All major screens now prototyped

## Post-Signal Profile Completion (Designed)

- [stated] 3 grouped screens (not one-per-field like intake) — faster completion when emotional momentum is high post-Signal
- [stated] Screen 1 "You in the world": height (ft/in picker), job title (text input, optional), education (chips)
- [stated] Screen 2 "Where you come from": location (GPS auto-detect + manual city entry), religion (chips), ethnicity (multi-select chips)
- [stated] Screen 3 "How you live": children (chips), smoking (chips), drinking (chips)
- [stated] Opening Maren transition beat: centered orb settling from Signal energy, line "Now I need to know who to look for." — auto-advances after ~3 seconds
- [stated] Closing Maren photo transition beat: "Good. Now let them see you." with pulsing dots auto-transition (matches auth complete pattern) — flows into photo upload
- [stated] Orb follows position rules: centered on transition beats (Maren speaking), small top-right on form screens (user in control)
- [stated] Phase label "THE PRACTICAL STUFF" in Space Mono caps across all 3 form screens
- [stated] Maren voice lines per screen: "I'll be quick with these." / "Where you come from matters." / "Last few."
- [stated] Privacy lock note on Screen 2 (religion/ethnicity): "Used for matching only. Never shown on your profile."
- [stated] Progress line continues from onboarding (starts ~85%, hits 100% at photo beat) — warm gradient line at top, not a new progress indicator
- [stated] Screen transitions use horizontal slide with spring easing (matches intake pattern)
- [stated] Step indicator: 3 pips with active pill expansion (not numbered)
- [stated] Job title noted as optional with helper text; all other fields required before first match delivery
- [stated] maren-profile-completion.jsx prototype created with full interactive flow

## Competitive Landscape

- [stated] Overtone identified as direct competitor — founded by Hinge creator Justin McLeod, $18M raised (FirstMark, Pace Capital, Match Group), Esther Perel on board, nearly identical positioning (AI matchmaker, no swiping, curated introductions, "not a dating app — a service"), launching select cities late 2026
- [stated] Maren's competitive advantages vs Overtone: city-first density strategy (Charlotte), product preview showing the experience (phone mockups), FOMO waitlist mechanics (scarcity bar, referral loop, velocity signals), emotional brand voice vs Overtone's corporate-founder tone, inline multi-step signup flow vs Overtone's generic Tally form redirect

## Waitlist Launch

- [stated] Waitlist is live at meetmaren.app
- [stated] Charlotte beta opens Fall 2026
- [stated] First 5,000 signups get early access
- [stated] Concerned "matchmaker" positioning may attract too narrow an audience — exploring reframing around action language ("finds your person," "introduces you") instead of the matchmaker label
- [stated] Chat screen prototype uses an "Ink & Wash" bubble-less design
- [stated] Governing palette rule: cream = user in control, dark = Maren has something to show; unified dark palette now governs the full app shell (supersedes earlier unified cream decision)
- [stated] AI pipeline passes full verbatim conversation history each turn rather than a compressed ring buffer — confirmed appropriate given conversation length
- [stated] Maren's orb is a reactive character with listening/processing/emotional mirroring states, positioned centrally during Phases 2-4
- [stated] Devoted is the single paid tier; free users get the full cinematic reveal experience with action-based limits (3 likes/3 dislikes daily); Discover batch is 15 profiles per cycle; Drawn to You is the primary conversion lever with a paywall after the disclosure chapter; chat cap is 5 slots free / 7 paid
- [stated] Analytics system is fully in-house with zero third-party SDKs — append-only PostgreSQL event pipeline and Redis Streams for real-time ML label writing
- [stated] Prototype inventory confirmed: matchmaker-auth-v3.jsx, matchmaker-intake.jsx, maren-onboarding-chat.jsx, matchmaker-screens.jsx, MatchExperience-creamy.jsx, discovery-creamy.jsx (saved as maren-discover.jsx), maren-photo-verification.jsx, Profile screen, maren-profile-completion.jsx, Chat screen
- [stated] Tech stack: bare workflow React Native with Expo modules, React Navigation, Redux Toolkit, Socket.io, Redux Toolkit Query, Node.js backend, PostgreSQL, Redis, Python ML service (LightGBM → LambdaMART path)
- [stated] Completed a full memory export/migration of all Maren product decisions to a new Claude account — consolidated app bible, architecture decisions, prototype inventory, and design specs into a portable document
- [stated] Early Maren concept (then "AI Matchmaker") developed from scratch: hybrid chat + fragment onboarding, "Vibe Before Face" reveal philosophy, chapter-based cinematic match reveals, anti-retention design philosophy, Charlotte launch market with campus ambassador strategy
- [stated] Three critical product risks identified and addressed: onboarding length, cold-start density crisis, free tier pool imbalance
- [stated] Drawn to You tab designed as a dedicated bottom nav tab with warmth decay states and a chapter reveal paywall

## Speech-to-Text in Onboarding (continued, if needed)
(see above — merged into main section)
```

---

## /areas/matchmaker-architecture.md
```
---
name: matchmaker-architecture
description: AI matchmaker backend architecture — AI/ML pipeline, chat cap system, match lifecycle, action economy, and behavioral mechanics
sources: [chat, backfill]
aliases: [matchmaker backend, matchmaker pipeline, chat cap]
---

## AI/ML Pipeline

- [stated] Onboarding raw responses get extracted into structured JSON profiles (values, attachment signals, communication style, etc.)
- [stated] Two-layer storage: structured profile (permanent, versioned) + encrypted raw text (auto-purged after extraction)
- [stated] ML scoring model takes structured profiles and outputs match pair scores
- [stated] AI narrative generation is a separate step AFTER ML scoring — not part of ML itself
- [stated] Each match pair requires 2 AI calls: one generating User A's view of B, one generating B's view of A (different framing per reader)
- [stated] Narratives are pre-generated in background jobs and cached, not generated at browse time
- [stated] Investment Gate requires pre-generating 3 variants of post-gate commentary (one per user choice), all cached, correct one served at tap time — zero latency during emotional peak
- [stated] Haiku used for narrative generation; estimated cost ~$0.001-0.002 per call
- [stated] At Charlotte scale (5,000 users), narrative generation cost is negligible — estimated $30-60/day worst case

## ML Model Strategy

- [stated] Phase 1 (launch — month 2): heuristic scoring using psychology framework rules (attachment compatibility, Schwartz values proximity, Big Five complementarity, love language alignment) — no trained model yet, no outcome data exists
- [stated] Phase 2 (month 2-3): XGBoost takes over when enough outcome data exists — trained on profile similarity features, behavioral features (like/dislike history, chat duration, feedback chips), and contextual features (days since last match, mood, time of day)
- [stated] Training labels are graduated not binary: dislike=0, liked but no mutual=1, mutual but short chat=2, sustained chat 5+ days=3, positive removal feedback=4
- [stated] LambdaMART (Learning-to-Rank) implemented from day one in shadow mode — trains on real data continuously but output is not consumed until feature flag is flipped on from dashboard
- [stated] Feature flag controlled from admin dashboard to turn LambdaMART on/off — allows validating shadow rankings against actual outcomes before going live
- [stated] Dashboard includes A/B comparison view: heuristic/XGBoost ranking vs LambdaMART ranking with outcome data as confidence metric for flipping the flag
- [stated] At maturity: XGBoost scores compatibility for candidate pairs → LambdaMART re-ranks top candidates per user per cycle → AI generates narratives for matches that will be shown
- [stated] Model choice: LightGBM over XGBoost — faster training, lower memory, native categorical feature handling, better fit for profile data heavy on categorical features (attachment style, love language, gender, orientation)
- [stated] LightGBM with lambdarank objective from the moment enough outcome data exists — learns relative compatibility ("B is better match for A than C") rather than absolute scores, smoother transition to full re-ranking later
- [stated] LambdaMART implemented from day one in shadow mode behind feature flag — trains continuously but output not consumed until flag flipped on from admin dashboard
- [stated] Explicitly avoiding collaborative filtering — creates convergence toward popular profiles, contradicts personal deep-compatibility thesis
- [stated] Explicitly avoiding deep learning at Charlotte scale — not enough data to outperform gradient boosted trees on tabular features
- [stated] Sentence embeddings from onboarding responses (via pre-trained sentence transformer like all-MiniLM-L6-v2) stored alongside structured profiles and fed into LightGBM as additional features — captures semantic nuance that structured extraction misses
- [stated] From day one, all match outcomes logged in ML-consumable format (match pairs shown, likes, dislikes with feedback chips, chat duration, removal reasons) so model training can begin the moment enough data exists

## Confirmed Tech Stack

- [stated] Mobile app: React Native (cross-platform)
- [stated] Backend API server: Node.js
- [stated] Database: PostgreSQL via Supabase as host only — no Supabase auth, REST API, or other services used
- [stated] Auth: custom in-house authentication built in Node.js
- [stated] ML service: Python (LightGBM, sentence transformers, all ML tooling)
- [stated] Node.js ↔ Python boundary: message queue (Redis/RabbitMQ) for async jobs (batch scoring, narrative generation), REST/gRPC for real-time needs
- [stated] Chose PostgreSQL over MongoDB — data model is heavily relational (users, matches with states, chats, feedback, action economy tracking all need transactional guarantees and joins)
- [stated] PostgreSQL JSONB used for flexible data where needed (e.g. raw onboarding transcripts before extraction)
- [stated] Development: local PostgreSQL via Docker, production on Supabase

## Infrastructure Scaling Strategy

- [stated] Start simple, upgrade when real signals demand it — not based on projected user counts
- [stated] pgvector handles candidate retrieval at Charlotte scale — no separate vector service needed until ~200-500K users when query time exceeds 500ms
- [stated] LightGBM loaded in-process in application server — no separate model server, just model.predict() — extract to dedicated service only when inference competes with app logic for CPU
- [stated] Redis for caching scored match pairs and generated narratives
- [stated] Background job queue (Celery or similar) for narrative generation and model retraining
- [stated] Feature store is just SQL joins at this scale — migrate to Feast/Tecton only when feature joins become a bottleneck
- [stated] Architecture designed with clean interfaces between stages (filter → retrieve → score → rank → serve) so each component can be swapped independently without full rewrite
- [stated] Upgrade triggers based on measured signals: pgvector latency, inference time, feature join speed, match cycle completion time — not user count projections

## Chat Infrastructure

- [stated] Real-time messaging via Socket.io through Node.js
- [stated] Chat UI uses same bubble-less design language as onboarding (warm cream bg, Fraunces for matchmaker voice, DM Sans for human messages)
- [stated] Matchmaker orb present in chat header — fully non-interactive/decorative only, no tap interaction, no pull-down nudge panel; orb cannot interact with the chat at all (revised from earlier "pull-based" concept)
- [stated] No typing indicators — intentional product decision to reduce relationship anxiety, matches low-pressure philosophy
- [stated] Voice message UI: waveform visualization with simple play button and duration display
- [stated] Chat thread header: small photo + match name
- [stated] Day 10/15 inactivity enforcement appears as separate overlay when opening the chat, not as messages in the thread
- [stated] Text and voice messages only at launch — no GIFs, stickers, or reactions; intentionality over convenience
- [stated] Voice messages free for all users, up to 1 minute, hold-to-record and release-to-send
- [stated] Chat input placeholder: "Or say it your way..." matching V5.1 onboarding style
- [stated] Send button uses warm accent circular button matching onboarding; mic button for voice when input is empty

## Backend Architecture Note

- [stated] Every UI decision requires corresponding backend support — full backend architecture discussion deferred until UI/UX design is complete
- [stated] Backend must support: all chat mechanics (Socket.io, orb nudge generation, message storage), profile update flow (conversational routing, phase-specific question serving, rate limiting), action economy enforcement (daily like/dislike counts, chat cap, cooldown timers), match lifecycle state machine, narrative caching and staleness detection, hidden queue TTL management

## Selfie Verification

- [stated] Selfie verification happens after onboarding completes, during the waiting-for-matches period — turns dead time into a trust gate
- [stated] MVP: manual verification by Aoh — user is told verification takes a few hours
- [stated] Post-MVP: integrate automated selfie verification service
- [stated] Selfie image deleted completely from DB after verification decision (approved or declined)
- [stated] Verification result stored permanently (verified: true/false, timestamp, method: manual/automated) — image purged, flag kept
- [stated] User cannot receive matches until verification is approved

## App Navigation

- [stated] Three bottom tabs: Discover (matchmaker curated picks, full reveal), Drawn to You (incoming interest, conversion lever), and Chats — plus Settings accessible via profile avatar
- [stated] Matchmaker has no dedicated tab — it lives across the entire app (reveal voice, chat orb nudges, enforcement overlays, Signal on profile)
- [stated] Matchmaker's presence is the architecture itself, not a destination
- [stated] Warm dot indicator on Drawn to You tab icon when new incoming interest exists

## Push Notifications

- [stated] Push notification strategy v2 completed — 10 categories, matchmaker-voiced copy pools, evening delivery windows, segmented free/paid paths, Drawn to You as primary conversion driver, 2-notification re-engagement limit then permanent silence, Phase 4 one-time monetization nudge

## Profile Versioning & Staleness

- [stated] Every structured profile gets a version hash
- [stated] User-initiated profile updates change the hash (via "revisit with matchmaker" option in profile/settings)
- [stated] Before serving a cached narrative, check if both users' profile hashes still match what the narrative was generated against
- [stated] Stale narratives use lazy regeneration — only regenerate when the match is next in queue to be shown, not all cached narratives at once

## Profile Update Flow ("Revisit with Matchmaker")

- [stated] Entry point: "Revisit with matchmaker" in profile screen — not "Edit Profile"
- [stated] Opens same conversational interface as onboarding (warm cream, bubble-less, Fraunces matchmaker voice, orb)
- [stated] First screen: matchmaker asks "What brought you back?" with routing chips that map to onboarding phases
- [stated] Routing chips use human emotional language, not backend categories: "I've been through something" → Phase 4, "What I want looks different now" → Phase 3-4, "My life changed" → Phase 2, "I was holding back before" → Phase 4, "I know myself better now" → Phase 3
- [stated] Free text option also available — single AI call routes to correct phase based on user's response
- [stated] Chip selection requires zero AI calls (hardcoded mapping), free text requires one routing call
- [stated] After routing chip, matchmaker confirms before diving in: "Are you talking about the practical stuff or the deeper stuff?" — if practical, redirects to simple filter edit screen; if deeper, enters conversational flow. Prevents misrouting frustration
- [stated] Only the relevant phase's questions are presented — not the full 18-question onboarding
- [stated] Questions are personalized based on existing profile: matchmaker references what user said before and asks if it's still true
- [stated] Estimated 3-5 questions per update, 4-6 AI calls total (vs 22 for full onboarding)
- [stated] Structured profile updates extracted, version hash bumped, stale narratives flagged for lazy regeneration
- [stated] Signal visualization shifts after update — visible proof the conversation changed something; key viral/screenshot moment
- [stated] Rate limited: once per week, maximum twice per month — matchmaker frames as "I need time to recalibrate who I show you" not as a restriction
- [stated] Rate limit shown as "next revisit available [date]" — no countdown timer, no locked button appearance
- [stated] Profile screen has two distinct sections: "Your details" (photos, job, location, filters — editable anytime, no conversation needed) and "Your deeper profile" (psychological dimensions — revisit with matchmaker only, rate limited)
- [stated] Motivation framing: not "optimize your matches" but "your matchmaker is working with an outdated picture of you — if something shifted, it should know." Trust action, not optimization action
- [stated] Matchmaker frames gaps as curiosity not deficiency: "I have a hunch there's more to this part of you than what you showed me"
- [stated] The update experience is positioned as growth, not maintenance — the Signal evolution after revisit is the proof

## Data Sources (Ongoing)

- [stated] Onboarding: deep initial personality snapshot (18 questions across 6 psychology frameworks)
- [stated] Match behavior: likes, dislikes with feedback chips, chat duration, chat removal reasons — continuous behavioral signal without asking the user anything
- [stated] User-initiated profile updates: "revisit with matchmaker" option for when life circumstances change — user controls when, not the app
- [stated] Behavioral data valued over self-reported data — what users do reveals more than what they say

## Data Stream Separation

- [stated] Rejection/removal feedback goes to ML scoring model to retune match weighting — does NOT change user's structured profile directly
- [stated] Over time, patterns in rejection feedback may surface as matchmaker conversation prompts (e.g. "you say you want X but keep passing on people who have it")

## Feedback Collection

- [stated] Feedback collected at chat removal, not at match browsing rejection — richer signal because user has actually interacted
- [stated] Feedback uses structured chips (e.g. "conversation fizzled," "different life direction," "no physical attraction," "didn't feel safe")
- [stated] "Didn't feel safe" flagged separately as trust/safety signal
- [stated] Two taps max for feedback — user is emotionally checked out at removal, keep friction minimal

## Action Economy

- [stated] Free: 3 likes, 3 dislikes per day from profile browser
- [stated] Premium: 6 likes, 6 dislikes per day from profile browser
- [stated] After daily limits hit, hard stop — user is stuck on current reveal (can re-read chapters but cannot advance to next reveal or act)
- [stated] Expressing interest in browser does NOT automatically open chat — must wait for mutual interest
- [stated] Like/dislike counts are feature flagged per tier on dashboard

## Chat Cap System (Revised)

- [stated] Free users: hard cap at 5 active chats — firm wall, cannot open new chats until one is cleared
- [stated] Premium users: soft cap with no hard wall — matchmaker slows delivery as chat count rises but never locks them out
- [stated] Soft cap delivery thresholds feature flagged per market on dashboard
- [stated] Premium inactivity timers shorten as chat count rises (e.g. Day 7 nudge at 8 chats instead of Day 10) — still binary silence check only, no chat monitoring
- [stated] Inactivity timer scaling per chat count is feature flagged on dashboard
- [stated] No chat monitoring for either tier — only chat count (integer) and binary silence check (did anyone send anything) are used
- [stated] When free user hits hard cap, can still browse reveals but cannot express interest or decline
- [stated] Browsing while capped is the primary motivation engine for free users — emotional investment in reveals motivates clearing inactive chats

## Discover Free Tier Model (Finalized)

- [stated] Free users get full reveal experience in Discover — all chapters, all reasoning, photos, everything identical to premium
- [stated] Free limit is action count only (3 likes/dislikes per day), not content gating
- [stated] After actions spent, free users continue browsing full reveals — no chapters hidden, no reveals stopped
- [stated] Upgrade prompt triggers ONLY when free user taps like/dislike with 0 actions remaining — conversion at point of highest emotional intent
- [stated] Upgrade prompt is matchmaker-voiced, not a generic paywall card
- [stated] No mid-reveal paywall in Discover for any tier — the cinematic pacing is never interrupted
- [stated] Narratives are pre-generated and cached so free browsing after actions spent costs zero incremental AI compute
- [stated] Drawn to You remains separate conversion lever — free users hit hard paywall after disclosure chapter ("She Found You"), unchanged

## Chat Inactivity & Enforcement

- [stated] Day 10 (mutual silence): gentle nudge from matchmaker character inside the chat thread — normalizes silence, reframes slot as limited resource, no deadline mentioned
- [stated] Day 15 (mutual silence): full-screen matchmaker takeover — AI personality explains the closure warmly with behavioral psychology framing
- [stated] Day 15 gives two options: "let go" (triggers feedback chips, frees slot) or "wait — I want to try" (grants 48-hour micro-deadline to send a message, with matchmaker offering conversation starter help)
- [stated] If 48 hours pass after "I want to try" with no message sent, matchmaker closes automatically — no second chance
- [stated] One-sided silence handled differently: matchmaker advocates for both sides — tells the sender their effort isn't wasted, gently prompts the silent person to respond or release

## Chat Removal Cooldown

- [stated] 4-hour cooldown after removing someone from chat before new matches can be pushed to chat list
- [stated] Matchmaker frames cooldown as reflection time, not penalty
- [stated] Prevents remove-and-grab cycling behavior

## Hidden Queue (Mutual Interest Timing — Revised)

- [stated] Hidden queue applies primarily to free capped users — premium soft cap means most premium mutual matches open as chats directly
- [stated] When premium user matches with a capped free user, chat appears in premium user's list normally — matchmaker opening line as only content, identical to an unresponsive chat; premium user never sees queue mechanics or the other user's capacity
- [stated] Hidden queue capped at 3 pending mutuals per free user (feature flagged per market)
- [stated] Queue resolution order: when free user clears a slot, premium matches pull first, then oldest timestamp within same tier
- [stated] Each queue entry has independent TTL (7-10 days, feature flagged) starting from mutual interest confirmation
- [stated] Nudge sent to capped free user for each mutual match entering their queue (up to 3): "Someone you were drawn to feels the same. You'll need to make room." — no name, no details
- [stated] If TTL expires, matchmaker tells both users a connection was missed — serves as natural premium conversion nudge for free user
- [stated] Expired queue matches can be resurfaced by ML in future cycles with regenerated narratives, capped at 2 resurfacings per pair

## Exposure Throttling (Queue Overflow Prevention)

- [stated] Triggers when BOTH conditions true: free user at hard cap AND queue at depth limit (3 pending mutuals)
- [stated] When triggered: matchmaker stops showing that user to new people in Discover/Drawn to You AND stops delivering new reveals to that user
- [stated] Matchmaker frames throttle naturally: "I'm letting you focus on who's already here"
- [stated] Lifts when either condition clears (queue drops below limit OR chat count drops below cap)
- [stated] Slight queue overflow allowed for timing edge cases (user started reveal before throttle kicked in)
- [stated] User never sees throttle mechanics — they just notice fewer new reveals
- [stated] ML pipeline continues scoring all pairs regardless of throttle state — Node API layer applies filtering before serving results

## Match Browsing While Capped

- [stated] Free users can experience full chapter-based reveal even while chat-capped — actions locked, not the experience
- [stated] At hard cap AND max queue depth, reveals also stop — matchmaker won't generate demand it can't fulfill
- [stated] Discovery browser is one-at-a-time — user must like or dislike before seeing the next reveal, so no undecided pile-up possible

## Architecture Separation (ML vs Node)

- [stated] ML pipeline scores all pairs regardless of capacity constraints — pure compatibility scoring, no awareness of chat counts or queue states
- [stated] Node API layer applies all business rules before serving results: chat count check, queue depth check, exposure throttle filtering
- [stated] Pre-scored matches cached in Redis — when slots clear or queue drains, Node stops filtering and serves immediately with no ML recomputation
- [stated] Feature flag changes (cap numbers, queue depth, throttle thresholds) only touch Node filtering layer — never trigger ML retrain or rescore

## Devoted Tier (Subscription — Single Paid Tier at Launch)

- [stated] Subscription tier named "Devoted" — describes user's intent, not product features
- [stated] One paid tier at Charlotte launch — second tier only after conversion data exists
- [stated] Upgrade CTA: "Become Devoted" — matchmaker frames it as matching the user's energy, not shaming free tier
- [stated] Base price: $24.99/month, monthly only — no 3-month or 6-month discount plans (contradicts "designed to not stay long in your pocket" brand promise)
- [stated] $24.99 price point chosen as revenue-maximizing for Charlotte demographics — A/B tested against other price points once user base is large enough
- [stated] Soft cap (no hard wall on chat count)
- [stated] Full Drawn to You access with complete reveals
- [stated] 6 likes, 6 dislikes per day (doubled from free)
- [stated] Priority position in free users' hidden queues

## Upgrade/Downgrade Rules

- [stated] Upgrade: soft cap applies immediately, fresh 6/6 actions granted on upgrade day regardless of how many free actions were already spent — immediate abundance feeling validates the purchase
- [stated] Past expired queue matches stay expired on upgrade — no retroactive resurrection
- [stated] Downgrade: keep all existing chats, cannot open new ones until count drops below free hard cap (5)

## Dashboard Feature Flags

- [stated] Free hard cap number
- [stated] Free daily like/dislike count
- [stated] Premium daily like/dislike count
- [stated] Hidden queue depth limit per user
- [stated] Hidden queue TTL
- [stated] Soft cap delivery thresholds per market
- [stated] Inactivity timer scaling per chat count
- [stated] Compatibility threshold modifiers per chat count level

## Dashboard Monitoring Metrics

- [stated] Average queue depth per user across network
- [stated] Queue expiration rate (% of entries that TTL out vs convert to chat)
- [stated] Average time-to-conversion in queue (how long entries wait before slot opens)
- [stated] Throttle activation rate (% of users currently suppressed from Discover)

## Removed Ideas (Archive)

- [stated] Daily check-in / daily questions — removed because no clear purpose; onboarding captures deep personality data, ongoing behavioral signals (likes, dislikes, chat patterns) provide richer data than self-reported mood; manufactured engagement conflicts with "designed to not stay long in your pocket" philosophy
- [stated] AI-triggered contextual questions — briefly considered as replacement for daily check-in, also removed; same fundamental issue of polling users for self-reported data when behavioral data is more honest and abundant
- [stated] Dedicated matchmaker tab in bottom navigation — removed because matchmaker doesn't need a room, it IS the architecture; lives across reveals, chat orb nudges, enforcement overlays, and Signal visualization
- [stated] "The Bridge" (matchmaker-facilitated chat-to-date transition) — removed because monitoring chat patterns (even metadata like frequency/response times) violates the app's privacy-first principle; if users learn the matchmaker watches their conversations, trust is destroyed
- [stated] Bonus chat slot for premium (premium match opens extra slot for free capped user) — removed because it violates the cap's purpose, creates transactional dynamic between users, and turns quality constraint into a paywall
- [stated] Fixed hard cap for both tiers (5 free, 7 paid) — replaced with hard cap free / soft cap premium model to eliminate hidden queue congestion at scale
- [stated] Introduction system (matchmaker-prompted exchange before chat opens) — initially designed as congestion infrastructure for hard cap timing mismatches, then repositioned as premium feature, ultimately removed because the chapter-based reveal already IS the introduction; adding another layer inserts friction where premium should have less
- [stated] Chat quality monitoring for soft cap (matchmaker adjusting behavior based on conversation patterns) — removed because it's chat monitoring under a different name, violates privacy-first principle

## Auth Architecture

- [stated] Auth method: email OTP (6-digit code sent to email, no password) — zero ongoing cost, no password storage/hashing/reset flow to maintain
- [stated] No password by design — eliminates bcrypt/salt management, brute force protection, forgot-password flow, and the #1 support burden (password resets) for an app where users may be inactive for weeks
- [stated] One-time SMS phone verification at signup only — identity gate preventing fake accounts (email addresses are free and infinite, phone numbers cost money and are carrier-tied)
- [stated] SMS verification happens immediately after account creation, before Basic Info — so failures are cheap (no wasted onboarding AI calls or user emotional investment)
- [stated] No social auth (Google/Apple sign-in) — avoids Apple's Sign In with Apple requirement, keeps UI clean, matches intimate non-techy brand
- [stated] Session tokens keep users logged in for weeks/months — email OTP only needed on new device or expired session (rare events)
- [stated] Email captured at auth step (not deferred to profile completion) — gives marketing channel before the high-dropoff onboarding zone
- [stated] Marketing value of email-first auth: enables free re-engagement of onboarding dropoffs, churned user win-back sequences, waitlist-to-signup conversion (Charlotte Reddit/landing page funnel enters via email), pre-launch nurture content
- [stated] SMS re-engagement is TCPA-regulated ($500-1,500 per unsolicited text violation) — email avoids this entirely
- [stated] Phone number stored for identity verification record only — not used as login method, not shown to other users
- [stated] Estimated SMS cost at Charlotte scale (5,000 users): $50-250 total one-time, never charged again for those users
- [stated] Auth flow: email + OTP → SMS one-time verify (signup only) → Basic Info → Onboarding → Signal Reveal → Profile Completion → Photos → Selfie Verification

## "Drawn to You" Tab — Incoming Interest

- [stated] Dedicated bottom nav tab called "Drawn to You" — separate from Discover, separate concerns
- [stated] Shows people who went through your reveal and expressed interest — filtered by matchmaker's compatibility threshold, not a raw dump
- [stated] Card layout revised: 2-column grid (2 cards per row), vertical scroll — each card is vertical with miniaturized Signal constellation on top, matchmaker whisper below, warmth badge at bottom
- [stated] Each card shows: miniaturized version of their actual Signal constellation, AI-generated one-line matchmaker whisper (the specific thing about you that resonated with them), and warmth state indicator
- [stated] Warmth states: "Just arrived" → "Still warm" → "Cooling" → "Fading" — Signal breathing slows and dims over 48-72h TTL; entire card visual energy tied to warmth (glow, opacity, animation speed)
- [stated] Tapping a card opens the same dark cinematic chapter reveal used in Discover
- [stated] Incoming interest reveal includes a special disclosure chapter ("She Found You") after Why You Two — user is already emotionally invested before learning the other person chose them
- [stated] Disclosure chapter is staged with timed reveals: orb → "I should tell you something." → "She went through your story first. And she's already here."
- [stated] Free users hit paywall AFTER the disclosure chapter — they know she's interested, felt the compatibility, but can't finish the reveal or act. Strongest conversion state: certainty you can't act on
- [stated] Paywall shows locked remaining chapters (The Echo, Investment Gate, The Hidden Layer, Photo Reveal) with teaser descriptions
- [stated] Paywall matchmaker line for incoming: "She's waiting. And this Signal won't stay warm forever."
- [stated] Paid users get full reveal; since she already expressed interest, expressing interest back creates instant mutual match — chat opens immediately, no waiting
- [stated] Matchmaker curates which incoming interests appear — popularity doesn't create a 40-card inbox; compatibility threshold same as curated picks
- [stated] Popular users see a filtered subset, rotated as matchmaker deems relevant
- [stated] No empty state visible — section doesn't show "no one liked you" message; tab indicator only appears when filtered incoming interests exist

## Discover Tab — Curated Picks (Clarified)

- [stated] Discover shows a mixed feed: matchmaker curated picks AND profiles of people who liked you — algorithm for interleaving TBD
- [stated] Up to 15 reveals queued per discovery batch — matchmaker serves as many scored profiles as it has ready, capped at 15; both free and devoted users can browse all 15 reveals regardless of action count
- [stated] One-at-a-time browsing: user must like or dislike current reveal to advance; when actions run out, user is stuck on current reveal (re-read chapters but can't advance or act)
- [stated] Mixing algorithm finalized in Discover Mixing Algorithm section below
- [stated] Curated match card takes full screen space in Discover
- [stated] Free users get the FULL chapter reveal experience in Discover (all chapters, no mid-reveal paywall)
- [stated] Discover paywall is action-based: limited daily likes/dislikes; when user hits max, they can still browse reveals but cannot act
- [stated] Drawn to You tab is the dedicated space for incoming interest with partial reveal + subscription paywall
- [stated] No queue indicator in Discover — user never sees how many reveals are queued; Maren controls pacing invisibly
- [stated] Between-reveal transition: next reveal auto-loads immediately after action (like/dislike) — no interstitial, no matchmaker line between reveals
- [stated] Session re-entry: if user leaves mid-reveal and returns later, reveal restarts from beginning (chapter 1), not mid-chapter resume
- [stated] Batch exhausted empty state: orb centered with slow warm breathing (no particles), headline "That's everyone I wanted you to meet today." (Fraunces italic), body "I'm still looking. I'll reach you when someone's worth your time." (DM Sans muted) — no progress card, no countdown, no upgrade prompt; identical for free and Devoted
- [stated] When new reveals become available on the exhausted screen, orb transitions with inward-gathering particles and crossfades directly into first chapter of next reveal — no "new matches" announcement

## Discover Mixing Algorithm

- [stated] Discover shows a mix of matchmaker curated picks and incoming interest profiles (people who liked the user)
- [stated] Incoming profiles in Discover must clear the same compatibility bar as curated picks — no exceptions
- [stated] If user has 0 profiles in incoming queue, Discover is pure curated — no fake reciprocity
- [stated] Incoming profiles are not labeled differently in Discover — same chapter-based reveal, user doesn't know which are incoming vs curated
- [stated] Base dosing: 1-2 incoming profiles per day, weighted random (never 0 if queue has inventory, never above 2)
- [stated] Queue depth modifies dosing odds: queue 1-3 → always 1; queue 4-6 → 75% one / 25% two; queue 7+ → 60% one / 40% two
- [stated] Cap holds at 2 per day regardless of queue depth — excess stays exclusively in Drawn to You for premium conversion pressure
- [stated] First session: lead with an incoming profile as slot 1 — "this app works" moment on day one (if queue has inventory)
- [stated] After first session: placement is weighted random biased toward early slots (positions 1-3) so incoming tends to appear in first half of session but position is never predictable
- [stated] Variable dosing and placement prevent users from learning patterns — every reveal carries the possibility that this person already chose them
- [stated] Drawn to You retains the bulk of incoming interest inventory — warm dot, decaying warmth states, and queue nudges create premium upgrade pressure
- [stated] Conversion psychology: user should always suspect Drawn to You queue is deeper than what leaks into Discover
- [stated] All mixing parameters are feature-flagged on dashboard per market: dosing weights, queue depth thresholds, placement bias

## Additional Tech Stack & Infrastructure Decisions

- [stated] File/media storage: Cloudflare R2 for user photos and voice messages
- [stated] Payment processing: RevenueCat (App Store/Play Store billing — RevenueCat is source of truth, local DB is webhook-synced cache)
- [stated] Location: PostGIS for geographic queries, user-adjustable radius (default 20 miles), discovery data based on user device GPS location
- [stated] Sessions: single device only — one active session per user, new login kills previous session
- [stated] Push notifications: Firebase Cloud Messaging directly (may migrate to OneSignal later)
- [stated] Admin system: RBAC with owner (can create admins), admin, and moderator roles; full audit logging for selfie verification decisions, content moderation actions, and feature flag changes
- [stated] GDPR/CCPA compliance required — soft delete with anonymization function, behavioral data preserved for ML while PII stripped
- [stated] Voice message TTL: free users 10 days, devoted 20 days (set at send time based on sender's tier); all chat data (messages + voice) deleted on block or chat removal
- [stated] Photos not moderated at MVP — only selfie verification reviewed manually by admin

## Redis Key Namespace Design

- [stated] BullMQ confirmed as Node.js job queue (free, MIT license) — queues for narrative generation, ML scoring, notifications, selfie verification, profile extraction, narrative regeneration
- [stated] Narratives and pre-scored candidates: Postgres is source of truth, Redis is hot read cache — eviction = cache miss triggers Postgres fetch, not data loss
- [stated] Hidden queue lives in Postgres table only — no Redis keys needed
- [stated] Multi-process Node behind load balancer — Socket.io Redis adapter required for cross-process pub/sub
- [stated] Starting with free tier Redis (Upstash free 256MB recommended) — upgrade when measured signals demand it
- [stated] Session accumulator (onboarding intermediate state): namespace reserved at m:accum:{userId}:{sessionId}, shape/TTL TBD until onboarding pipeline is specified
- [stated] Key convention: {owner}:{type}:{entityId}[:{qualifier}] — owner prefixes: m: (app), bull: (BullMQ), sio: (Socket.io adapter)
- [stated] Match pair canonical key: {lowerUserId}_{higherUserId} (lexicographic sort, underscore separator within ID field)
- [stated] Eviction policy: volatile-lru — all app keys have TTLs, least-recently-used evicted first under memory pressure; protects active sessions while allowing cache keys to shed
- [stated] Python ML service never writes directly to Redis — all ML results flow through Node.js BullMQ workers (persist to Postgres first, then backfill Redis)
- [stated] Estimated total Redis memory at Charlotte scale: 60-135 MB (narrative cache is largest consumer at 30-90 MB)
- [stated] Full Redis key registry, TTL strategy, memory budgets, ownership map, and collision prevention rules documented in maren-redis-namespace-design.md

## React Native Mobile Scaffolding (no mobile code exists yet)

- [stated] Bare workflow React Native with Expo modules
- [stated] React Navigation for navigation (confirmed by tab-based design, not yet set up)
- [stated] Redux Toolkit for state management
- [stated] Socket.io for client-side real-time integration (pattern TBD — whatever best fits the app)
- [stated] Redux Toolkit (RTK Query) for API client layer (fetch/cache/retry); fall back to React Query if RTK Query insufficient for cache/retry needs
- [stated] Offline handling: queue-and-retry strategy
- [stated] Image caching: best option for speed and scalability between FastImage and Expo Image (to be finalized)
- [stated] Auth token storage: using local storage for now, flagged as potentially needing secure storage upgrade
- [stated] Analytics: fully in-house with zero third-party SDKs — append-only PostgreSQL event pipeline and Redis Streams for real-time ML label writing
```

---

## /areas/the-path.md
```
---
name: the-path
description: The Path — AI wellness coach app concept for women (Cycle & Recovery journeys); separate from NightPeek
sources: [chat]
aliases: []
---

- [stated] Product concept: "The Path", an AI-powered personalized wellness coach app for women, positioned as non-medical (no diagnosis, medication advice, or treatment recommendations)
- [stated] Two core user journeys: Cycle Journey (regular menstrual cycle, cycle-phase-aware guidance) and Recovery Journey (post hormonal-birth-control / irregular cycle, lifestyle-focused)
- [stated] Core experience is a "Daily Path" of personalized daily action blocks (nutrition, movement, recovery) each paired with a "why" explanation
- [stated] Personalization engine draws on user profile, daily check-ins, Apple HealthKit data, and user behavior patterns
- [stated] Includes an "AI Kitchen" (personalized meals, recipes, grocery lists, substitutions) and nutrition education framing (what/why for each nutrient)
- [stated] Community features planned: journey groups, guided post prompts, and privacy-conscious "Workout Buddy" matching (approximate location only, no exact location sharing)
- [stated] Planned mascot companion that evolves with habit consistency, not health/body metrics; candidate names under consideration: Luma, Poppy, Nori, Luna, Mira
- [stated] Decided against a rules-engine MVP (previously planned); wants personalization driven directly by AI instead, technical approach still being worked out
- [stated] Building after NightPeek launches, not in parallel
- [stated] Same tech stack as NightPeek: React Native / Node.js / MongoDB
- [stated] Tight budget; may hire a contract RD for content review if absolutely necessary but no dedicated budget for it
- [stated] Data handling decisions: users will be able to delete their own data, and user data will not be shared with any third party for any reason; still undecided whether to avoid storing health data in raw form in the database
- [stated] Building an in-house analytics engine (no third-party analytics SDK) to track product/usage data
- [stated] Target audience is women 18 and older only; no minors
```

---

## /topics/diy.md
```
---
name: diy
description: Hands-on DIY and home/garden projects
sources: [backfill]
aliases: []
---
- [stated] Hands-on DIY interests, including bathroom flooring projects
- [stated] Grows strawberries / does strawberry gardening
```

---

## /topics/investing.md
```
---
name: investing
description: Interest in investing and financial markets
sources: [backfill]
aliases: []
---
- [stated] Interested in investing and financial markets
- [stated] Explored startup funding mechanics (seed funding, equity structure, secondary sales)
```

---

## /topics/recent-work.md
```
---
name: recent-work
description: Work-shaped activity outside NightPeek that doesn't meet the project bar
sources: [backfill]
aliases: []
---
- [stated] Exploring LLM prompt engineering; evaluating a "reasoning and behavior distillation" prompt strategy for transferring large-model reasoning patterns to smaller models
- [stated] Explored a code repository indexing pipeline with vector database architecture (Pinecone/Qdrant/pgvector evaluated) and Bitbucket integration patterns — parallel technical work outside NightPeek
- [stated] Worked on AI image generation prompts for a "nano banana" workflow involving restaurant scene photo transformation
- [stated] Researching and shopping for a used SUV in the Charlotte area (budget ~$26k); BMW X3 and Acura RDX primary candidates, with the Acura RDX A-Spec/Technology Package (SH-AWD) emerging as the stronger fit on reliability and maintenance cost
```
