# MAREN — Complete Design Handoff for Claude Design

> **What this document is:** The single source of truth for designing every screen of Maren, an AI matchmaker dating app. Every detail here has been decided. Do not assume, invent, or deviate from any specification. If something is not covered here, ask — do not fill the gap with a generic dating app pattern.

> **What Maren is:** A mobile-only dating app where an AI matchmaker named Maren curates a small number of deep-compatibility matches per day. There is no swiping feed. Users go through a conversational onboarding, receive curated match reveals presented as cinematic chapter-based stories, and chat only after mutual interest. The app is designed to be left — the success metric is matches made, not time spent.

> **App name:** Maren
> **Tagline direction:** "designed to not stay long in your pocket"
> **Brand sentence:** "Maren found someone for you" — sounds like a trusted friend, not a notification
> **Domain:** meetmaren.app
> **Target market:** Charlotte, NC (first city)
> **Platform:** Mobile only (React Native, iOS + Android)

---

## 1. DESIGN SYSTEM — TYPOGRAPHY

Three typefaces. No substitutions.

### Fraunces (Serif — Display/Matchmaker Voice)
- **Role:** Headlines, matchmaker dialogue, emotional moments, taglines, Signal Reveal text
- **Usage:** Fraunces Italic for matchmaker's spoken lines and headlines. Fraunces Regular for secondary display text.
- **Where it appears:** Every line attributed to Maren the matchmaker character. All screen headlines. Phase labels DO NOT use Fraunces (they use Space Mono).
- **Weight:** Variable — use optical size axis for display sizes. Soft axis for warmth where available.
- **Character:** Warm, human, literary. This is Maren's voice made visual.

### DM Sans (Sans-serif — Body/User Text)
- **Role:** Body copy, user-authored text, descriptions, helper text, form field values, button labels, tab labels
- **Usage:** Regular (400) for body text, Medium (500) for emphasis, SemiBold (600) for buttons and labels
- **Where it appears:** All non-matchmaker, non-utility text. User messages in chat. Button text. Navigation labels. Card descriptions.
- **Character:** Clean, friendly, modern. Invisible — lets content breathe.

### Space Mono (Monospace — Utility/Labels)
- **Role:** Phase labels, status indicators, metadata, timestamps, caps-lock micro-labels
- **Usage:** Always UPPERCASE. Always letter-spaced (+0.08em minimum). Small size (11-13px equivalent).
- **Where it appears:** Phase labels above headlines ("LET'S START", "VERIFICATION", "THE PRACTICAL STUFF", "BEFORE I START"), status lines, warmth badges on cards, timestamp labels in chat, progress metadata.
- **Character:** Technical, grounding. Contrasts the warmth of Fraunces — signals structure underneath emotion.

### Type Scale (mobile, base 16px)
- Phase label: Space Mono, 11px, uppercase, letter-spacing +0.1em, muted opacity (0.5-0.6)
- Body: DM Sans Regular, 16px, line-height 1.5
- Body small: DM Sans Regular, 14px, line-height 1.4
- Helper/caption: DM Sans Regular, 13px, muted opacity
- Button: DM Sans SemiBold, 16px
- Headline: Fraunces Italic, 28-32px, line-height 1.2
- Sub-headline: Fraunces Regular, 22-24px, line-height 1.3
- Matchmaker whisper: Fraunces Italic, 15-16px, reduced opacity (0.7)
- Tab label: DM Sans Medium, 11px

---

## 2. DESIGN SYSTEM — COLOR PALETTES

Maren has TWO palette modes with a governing rule:

**Governing rule:** Cream = user is in control. Dark = Maren has something to show you.

### Cream Palette (User-Control Screens)
Used on: Auth/login screens, Basic Info intake, Profile Completion forms, Settings, Profile editing, Waiting-for-matches screen, any screen where the USER is providing input or managing their account.

| Token | Hex | Usage |
|-------|-----|-------|
| `cream-bg` | `#FDFBF8` | Page background |
| `cream-surface` | `#F7F3EE` | Card surfaces, input field backgrounds |
| `cream-border` | `#E8E0D6` | Subtle borders, dividers |
| `cream-text-primary` | `#2C2420` | Primary text (near-black, warm undertone) |
| `cream-text-secondary` | `#8B7E74` | Secondary/muted text |
| `cream-text-tertiary` | `#B5A99D` | Placeholder text, disabled states |
| `cream-accent` | `#C4956A` | Warm amber — active states, selected chips, progress indicators |
| `cream-accent-glow` | `#C4956A` at 15% opacity | Glow behind selected elements |

### Dark Palette (Maren-Control Screens)
Used on: Onboarding Phases 2-4 (progressively darkens), Signal Reveal, Match browsing/Discover reveals, Drawn to You reveals, the full app shell (bottom nav, status bar background). The dark palette is the app's dominant visual identity post-onboarding.

| Token | Hex | Usage |
|-------|-----|-------|
| `dark-bg` | `#0D0B09` | Deepest background (Phase 4, match reveals) |
| `dark-bg-mid` | `#1A1614` | Mid-dark (Phase 3 territory) |
| `dark-bg-warm` | `#2C2420` | Warm dark (Phase 2 start) |
| `dark-surface` | `#1E1A17` | Card surfaces on dark backgrounds |
| `dark-text-primary` | `#F2EBE3` | Primary text on dark (warm white) |
| `dark-text-secondary` | `#A89888` | Muted text on dark |
| `dark-text-tertiary` | `#6B5E52` | Very muted / decorative text on dark |
| `dark-accent` | `#C4956A` | Same warm amber accent — consistent across both palettes |
| `dark-accent-glow` | `#C4956A` at 20% opacity | Glow on dark backgrounds (slightly more visible) |
| `ember` | `#E8A065` | Ember particle color (Phase 4 atmosphere) |
| `ember-dim` | `#8B6040` | Dim ember particles |

### Onboarding Atmosphere Progression
The background does NOT switch suddenly between phases. It transitions GRADUALLY across several questions — barely noticeable per question, dramatic over the full experience.

- **Phase 1 (Splash/Welcome):** `#FDFBF8` cream
- **Phase 2 (Warm-Up):** Starts at `#FDFBF8`, by end of Phase 2 reaches approximately `#F0E6DA` (light warm peach)
- **Phase 3 (Real Talk):** Continues darkening from `#F0E6DA` → `#3D3028` (deep warm brown)
- **Phase 4 (Deep Dive):** `#3D3028` → `#0D0B09` (near-black). Ember particles begin appearing.
- **Phase 5 (Signal Reveal):** `#0D0B09` stays — Signal constellation appears on near-black

The transition is continuous. There are NO distinct moments where the palette "switches." The user should not be able to pinpoint when it changed.

---

## 3. DESIGN SYSTEM — THE ORB

The orb is Maren's visual identity. It is NOT a logo, NOT a mascot, NOT a button. It is a living, breathing character indicator.

### Orb Visual Properties
- Shape: Perfect circle with soft radial gradient (warm amber center fading to transparent edge)
- Glow: Soft ambient bloom around the orb, radius extends ~1.5x the orb diameter
- Animation: Continuous "breathing" — slow scale pulse (1.0 → 1.03 → 1.0) over 4-6 second cycle
- Color temperature: Shifts with phases. Phase 2 = warm gold. Phase 3 = deeper amber. Phase 4 = muted ember. Phase 5 = bright warm white (Signal energy).

### Orb Position Rules (CRITICAL — these are the identity system)

| Context | Position | Size | Meaning |
|---------|----------|------|---------|
| Welcome screen, Complete screen, Signal Reveal, Transition beats | **Center of screen**, above any text | Large (80-100px) | "Something important is happening" |
| Conversational phases (Phases 2-4 chat) | **Center, above the conversation area** | Medium (56-64px) | "She's talking to you" — spatial hierarchy replaces chat bubbles |
| User-controlled screens (intake forms, settings, profile editing, filter forms) | **Top-right corner** | Small (28-32px), subtle breathing | "She's nearby but you're in control" |
| Chat threads | **Chat header** | Small (24-28px), decorative only, non-interactive | Presence indicator |
| Waiting-for-matches | **Center, hero element** | Large (80-100px) with "constellation scatter" particle animation | "Searching" |

### Orb Animation States
- **Breathing (default):** Slow scale pulse. Universal resting state.
- **Listening:** Subtle faster pulse when user is typing/speaking during onboarding.
- **Processing:** Slight shimmer/glow intensification when AI is generating a response.
- **Emotional mirroring:** Warmth/speed adjusts based on conversation depth.
- **Constellation scatter:** Particles drift outward from orb (used on waiting screen — matchmaker is searching).
- **Gathering:** Particles spawn at screen edges and pull INWARD toward orb (used when match is found — gathering the connection).
- **Reaching:** Concentric pulses expanding outward from orb (used on notification permission screen — "reaching out to you").
- **Stillness:** All particles stop. Orb settles into slow warm breathing with extra bloom glow, lifts slightly. (Used in the beat before "I think I found someone.")

### Orb Leads Transitions
When the phase or atmosphere changes, the orb changes character FIRST (color temperature, breathing speed, glow intensity), THEN the background environment follows. Maren sets the mood, the room catches up.

---

## 4. DESIGN SYSTEM — INTERACTION PATTERNS

### Chip Selections (used in intake, profile completion, feedback)
- Background: Transparent
- Border: 1px solid `cream-border` (on cream) or `dark-text-tertiary` (on dark)
- Border radius: 24px (full pill shape)
- Text: DM Sans Regular, 15px, `cream-text-primary` or `dark-text-primary`
- Selected state: Border color changes to `cream-accent` / `dark-accent`, background gains `accent-glow`, text stays same color
- Animation: Spring easing on selection (slight scale bounce 1.0 → 1.05 → 1.0, ~300ms)
- Spacing: 8px gap between chips, chips wrap naturally

### Buttons
- **Primary CTA:** Full-width, 56px height, border-radius 28px (full pill), background `cream-accent`, text DM Sans SemiBold 16px `#FFFFFF`. On dark backgrounds, same accent color.
- **Secondary/Ghost:** Full-width, 56px height, border-radius 28px, background transparent, border 1px solid `cream-border`, text DM Sans Medium 16px `cream-text-secondary`.
- **Disabled:** Primary CTA at 40% opacity, non-interactive.

### Input Fields
- Background: `cream-surface` (on cream) or `dark-surface` (on dark)
- Border: 1px solid `cream-border` / transparent on dark
- Border radius: 16px
- Text: DM Sans Regular, 16px
- Placeholder: DM Sans Regular, 16px, `cream-text-tertiary`
- Focus state: Border becomes `cream-accent` with subtle glow
- Height: 52px for single-line, auto-expand for text areas

### Screen Transitions
- Between form steps (intake, profile completion): Horizontal slide with spring easing (not linear, not ease-in-out — spring with slight overshoot and settle)
- Auto-transitions (complete screens, transition beats): Pulsing dots indicator (3 dots, sequential fade animation), screen auto-advances after ~3 seconds. No button tap required.
- Onboarding atmosphere: CSS transition on background-color, 2-3 second duration per question, eased

### Progress Indicators
- **Intake/Profile Completion:** 3 pips at top of screen. Active pip expands to a wider pill shape. Inactive pips are small dots. All in `cream-accent` (active) and `cream-border` (inactive).
- **Auth flow:** Dot pips — 4 dots for signup, 2 dots for login. Same styling as above.
- **Onboarding progress:** Warm gradient line at top of screen. Starts at ~8% at beginning of intake. Reaches ~85% at start of profile completion. Hits 100% at photo upload beat. Gradient goes from `cream-accent` to slightly brighter amber.
- **No numbered step indicators.** No "Step 1 of 4" text. Progress is felt, not counted.

### Empty States
- Never show negative empty states ("no one liked you", "no matches yet")
- Tabs with nothing to show simply don't show the indicator dot — the tab exists but has no attention-drawing signal
- When Discover batch is exhausted: orb centered, slow breathing, no particles. Headline in Fraunces Italic: "That's everyone I wanted you to meet today." Body in DM Sans muted: "I'm still looking. I'll reach you when someone's worth your time." No progress card, no countdown, no upgrade prompt. Identical for free and Devoted users.

---

## 5. DESIGN SYSTEM — LAYOUT & SPACING

### Mobile Frame
- Design for 390px width (iPhone 14/15 standard)
- Safe area insets respected — no content under notch or home indicator
- Bottom nav height: 56px + home indicator safe area
- Status bar: Dark text on cream screens, light text on dark screens

### Spacing Scale (base 4px)
- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px
- `2xl`: 48px
- `3xl`: 64px
- Screen horizontal padding: 24px (consistent across all screens)
- Between form fields: 24px
- Between sections: 48px

### Bottom Navigation Bar
- Background: `dark-bg` (#0D0B09) — dark regardless of current screen palette
- 3 tabs + profile avatar
- Tab icons: Custom line icons, 24px, `dark-text-secondary` inactive, `dark-accent` active
- Tab labels: DM Sans Medium 11px, same color as icons
- Tabs from left: **Discover** (compass or flame icon), **Drawn to You** (magnet or pull icon), **Chats** (message icon)
- Profile avatar: Small circular user photo, 28px, top-right of nav bar — tapping opens Settings/Profile
- **Warm dot indicator:** Small 8px circle in `cream-accent` on Drawn to You tab icon when new incoming interest exists
- Bottom nav is visible on: Discover, Drawn to You, Chats, Profile/Settings, Waiting-for-matches
- Bottom nav is NOT visible during: Auth, Intake, Onboarding (Phases 2-5), Profile Completion, Photo Upload, Selfie Verification, Notification Permission

---

## 6. COMPLETE USER FLOW — SCREEN SEQUENCE

This is the exact order a new user experiences every screen. Design them in this order.

### A. AUTH FLOW

**Screen A1: Welcome**
- Palette: Cream (`#FDFBF8`)
- Layout: Orb center stage (large, breathing). No logo. No app name displayed.
- Tagline: Fraunces Italic, centered below orb: "Someone out there already makes sense"
- Matchmaker voice: DM Sans, muted, smaller, below tagline: "I just need to get to know you first"
- Two CTAs at bottom:
  - Primary: "Begin" (full-width pill button, `cream-accent`)
  - Below it, text link style: "I've been here before" (DM Sans Medium, `cream-text-secondary`, underline or no underline — not a button shape)
- No social auth buttons. No "Sign in with Google/Apple." None.

**Screen A2: Email Entry (both flows)**
- Phase label: Space Mono caps — "LET'S START" (signup) or "WELCOME BACK" (login)
- Headline: Fraunces Italic — "Where can I reach you?" (signup) or "Where did we leave off?" (login)
- Single email input field, auto-focused, keyboard type = email
- Primary CTA: "Continue" — disabled until valid email format entered
- Orb: small, top-right, breathing
- Progress pips at top: 4 pips for signup (pip 1 active), 2 pips for login (pip 1 active)

**Screen A3: Email OTP Verification**
- Phase label: Space Mono caps — "VERIFICATION"
- Headline: Fraunces Italic — "I sent you something."
- Helper text: DM Sans muted — "Check [email] for a 6-digit code"
- 6-digit code input: Individual boxes (6 boxes, monospaced digits, auto-advance on each digit)
- Auto-submit when 6th digit entered (no explicit "Verify" button needed)
- Resend link: DM Sans, muted, below input — "Didn't get it? Resend" with cooldown timer
- Orb: small, top-right

**Screen A4: Phone Number Entry (SIGNUP ONLY — login skips to Complete)**
- Phase label: Space Mono caps — "ONE-TIME VERIFICATION"
- Headline: Fraunces Italic — "One real person per seat."
- Country code picker + phone number input field
- Privacy note: Small lock icon + DM Sans 13px muted: "Your number is never shown to anyone. I won't ask again."
- Matchmaker whisper below privacy note: Fraunces Italic 14px, reduced opacity: "I won't ask again."
- Primary CTA: "Verify"
- Orb: small, top-right

**Screen A5: SMS OTP Verification (SIGNUP ONLY)**
- Same layout pattern as Email OTP (Screen A3)
- Phase label: Space Mono caps — "ALMOST THERE"
- Headline: Fraunces Italic — "One more."
- 6-digit code input, same pattern as A3

**Screen A6: Complete**
- Orb: Center stage, large, bright breathing
- Copy splits by flow:
  - Signup: Fraunces Italic headline — "Good. Now let's see who you really are."
  - Login: Fraunces Italic headline — "There you are. Let's pick up where we left off."
- Auto-transition indicator: 3 pulsing dots below headline (sequential fade, ~3 sec total)
- **No button.** Screen auto-advances. Maren moves you forward.
- Signup → transitions to Basic Info intake (Screen B1)
- Login → transitions to main app (Discover or Chats, wherever they left off)

---

### B. BASIC INFO INTAKE

All intake screens use cream palette. Orb small top-right. Step-by-step single-question-per-screen flow. Horizontal slide transitions with spring easing.

**Screen B1: Name**
- Phase label: Space Mono caps — "THE BASICS"
- Headline: Fraunces Italic — "What should I call you?"
- Single text input, auto-focused
- Primary CTA: "Continue"
- Progress bar at top: warm gradient line, starts at 8%

**Screen B2: Birthday**
- Headline: Fraunces Italic — "When were you born?"
- Date picker (scrollable wheels or month/day/year dropdowns — native-feeling)
- Primary CTA: "Continue"
- Progress bar advances slightly

**Screen B3: Gender**
- Headline: Fraunces Italic — "How do you identify?"
- Chip selection: "Woman", "Man", "Non-binary" (+ potentially "More options" text link)
- Single-select. Primary CTA activates after selection.
- Progress bar advances

**Screen B4: Interested In**
- Headline: Fraunces Italic — "Who are you looking for?"
- Chip selection: "Women", "Men", "Everyone"
- Single-select. Primary CTA: "Continue"
- Progress bar advances
- After this screen → transitions into Conversational Onboarding (Phase 2)

**Behavioral psychology baked in:**
- Foot-in-the-door: Name first (easiest question)
- Endowed progress: Bar starts at 8%, not 0%
- Personalization echo: User's name is used by Maren immediately in Phase 2
- Zeigarnik effect: Visible incomplete progress bar
- Completion momentum: One question per screen, not a long form

---

### C. CONVERSATIONAL ONBOARDING (Phases 2-4)

This is the core experience. It is a conversation with Maren, not a form. No chat bubbles. No message containers.

**Layout:**
- Orb: Centered above conversation area (medium size, 56-64px)
- Maren's text: Positioned near the orb (upper portion of screen). Fraunces Italic. Appears by fading/typing in.
- User's text: Positioned near the input area (lower portion of screen). DM Sans Regular.
- Spatial hierarchy replaces chat bubbles — Maren's words are near her orb, user's words are near their input. This IS the attribution system.
- Older messages: Fade/collapse as conversation progresses. Older messages reduce opacity as they scroll up. Only the last 2-3 exchanges are fully visible. The user is psychologically kept in the present.

**Input area:**
- Text input field at bottom of screen: DM Sans Regular, placeholder "Type or speak..."
- When input is empty: Mic button (microphone icon) on the right side of input
- When text exists in input: Send button (warm accent circular button) replaces mic button
- Tapping mic triggers speech-to-text (on-device, audio never leaves device). Transcribed text appears in input field for user to review/edit before sending.

**Phase 2 (Warm-Up):**
- Atmosphere: Starts cream, begins warming to light peach
- Orb: Warm gold, relaxed breathing
- Maren's tone: Light, playful, curious
- Contains Anchor Question 1: "If you could keep two things about your life and rebuild everything else — what are you protecting?"
- Contains Anchor Question 2: "Think about the version of you at month one of a relationship versus month six. What changed?"

**Phase 3 (Real Talk):**
- Atmosphere: Continues darkening through warm browns
- Orb: Deeper amber, slightly slower breathing
- Maren's tone: More grounded, direct, knowing
- Contains Anchor Question 3: "Think about your first real fight in a relationship. Not what it was about — but hours after. What's going through your mind?"
- Contains Anchor Question 4: "If your ex described you — and they were being genuinely fair — what would they say?"
- Privacy disclaimer appears when questions get personal: Small text, muted, appearing briefly — reassuring users that others won't see their answers.

**Phase 4 (Deep Dive):**
- Atmosphere: Near-black (`#0D0B09`). Ember particles begin appearing — small warm orange dots drifting slowly across the background.
- Orb: Muted ember color, very slow breathing
- Maren's tone: Stripped down, quiet, intimate
- Contains Anchor Question 5: "What's the difference between the closeness you want and the closeness you're actually comfortable with?"
- Contains Anchor Question 6: "What's the most honest reason a relationship of yours ended — not the version you tell people?"
- Ember particles: Small circles (2-4px), color `ember` and `ember-dim`, slow random drift, low opacity (0.2-0.4), sparse (15-25 visible at any time). Not distracting — atmospheric.

**Dynamic question selection:**
- The onboarding is NOT a fixed 18-question script
- 6 anchor questions are always asked (listed above, placed in their phases)
- Remaining questions are dynamically selected by AI from a 110-question bank based on confidence gaps across psychological dimensions
- Question count is flexible — targets 9-13 minute completion time, not a fixed number
- AI adapts question framing based on how the user communicates (verbose users get fewer follow-ups, brief users get more structured prompts)

**Phase atmosphere transitions are GRADUAL** across several questions, not sudden switches. The user should not notice a distinct moment where the phase changed.

**Maren's vocal micro-reactions (audio):**
- After user submits an answer, ~60-70% of the time a brief non-verbal audio clip plays: hums, soft "mm", "hmm", breaths, exhales
- Phase 2: Lighter, warmer sounds
- Phase 3: More grounded sounds
- Phase 4: Near-subliminal, very quiet
- No verbal reactions at launch (no "I like that" or "right") — only non-verbal sounds
- 30-40% of answers get NO vocal reaction (visual orb response only)
- Reaction plays BEFORE Maren's next text appears (300-500ms gap)
- No identical reaction within a 3-response window
- Volume decreases across phases

---

### D. SIGNAL REVEAL (Phase 5)

- Background: Near-black (`#0D0B09`)
- Orb: Center stage, large, bright warm white, energized breathing
- Signal: An asymmetric generative constellation visualization — NOT a simple geometric shape. It's unique to each user, generated from their onboarding data. Think: connected nodes of varying sizes and positions forming an abstract constellation shape. Each node represents a psychological dimension. Connection lines between nodes show relationship between dimensions.
- The Signal is the user's psychological fingerprint made visual. It should feel personal, beautiful, and sharable (like Spotify Wrapped).
- "This is you." — Fraunces Italic, centered below Signal. This line is also the ONLY full sentence Maren speaks aloud (pre-recorded audio). The single spoken line defines Maren's voice identity.
- After a moment of sitting with their Signal, screen transitions to Profile Completion

---

### E. POST-SIGNAL PROFILE COMPLETION

3 grouped screens (NOT one-per-field). User has high emotional momentum post-Signal — move fast.

**Transition Beat (before Screen E1):**
- Orb: Centered, settling from Signal energy
- Maren line: Fraunces Italic — "Now I need to know who to look for."
- Auto-advances after ~3 seconds (pulsing dots, no button)
- Orb then moves to small top-right position for the form screens

**Screen E1: "You in the world"**
- Palette: Cream (`#FDFBF8`)
- Phase label: Space Mono caps — "THE PRACTICAL STUFF"
- Maren whisper: Fraunces Italic, muted — "I'll be quick with these."
- Fields:
  - Height: ft/in picker (scrollable wheels)
  - Job title: Text input with helper text noting "Optional"
  - Education: Chip selection (e.g., "High school", "Some college", "Bachelor's", "Master's", "Doctorate", "Trade school")
- Step indicator: 3 pips at top, pip 1 active (expanded pill)
- Progress line continues from onboarding (~85%)

**Screen E2: "Where you come from"**
- Phase label: Space Mono caps — "THE PRACTICAL STUFF"
- Maren whisper: Fraunces Italic, muted — "Where you come from matters."
- Fields:
  - Location: GPS auto-detect with displayed city name. Manual city entry as fallback. "📍 Charlotte, NC" style display with "Change" text link.
  - Religion: Chip selection (e.g., "Christian", "Catholic", "Jewish", "Muslim", "Hindu", "Buddhist", "Spiritual", "Agnostic", "Atheist", "Other", "Prefer not to say")
  - Ethnicity: Multi-select chips (user can select multiple)
- Privacy lock note: Small lock icon + DM Sans 13px muted — "Used for matching only. Never shown on your profile."
- Step indicator: pip 2 active

**Screen E3: "How you live"**
- Phase label: Space Mono caps — "THE PRACTICAL STUFF"
- Maren whisper: Fraunces Italic, muted — "Last few."
- Fields:
  - Children: Chips ("Don't have kids", "Have kids", "Want kids someday", "Don't want kids", "Not sure yet")
  - Smoking: Chips ("Never", "Sometimes", "Often")
  - Drinking: Chips ("Never", "Sometimes", "Often")
- Step indicator: pip 3 active
- Progress line reaches ~95%

**Closing Transition Beat (after Screen E3):**
- Orb: Returns to center, warm glow
- Maren line: Fraunces Italic — "Good. Now let them see you."
- Pulsing dots auto-transition → flows into Photo Upload

---

### F. PHOTO UPLOAD & SELFIE VERIFICATION

Photos are collected AFTER the Signal reveal, not before onboarding. This preserves the "this isn't about looks" brand promise and leverages peak emotional investment.

**Screen F1: Photo Upload**
- Headline: Fraunces Italic — "Show them who they're meeting."
- Photo grid: 6 slots (2 columns × 3 rows). First slot is required (marked). Remaining 5 are optional.
- Slot styling: Rounded rectangle (16px radius), dashed border when empty, solid when filled
- Add photo: "+" icon in empty slots, opens system image picker
- Reorder: Long-press and drag to rearrange
- Primary CTA: "Continue" (enabled when at least 1 photo uploaded)
- Orb: small, top-right

**Screen F2: Selfie Verification**
- Headline: Fraunces Italic — "One quick check."
- Helper text: DM Sans — "Take a selfie so I know your photos are really you. This image is deleted after verification."
- Camera preview: Large rounded rectangle showing front camera feed
- Capture button: Large circular button at bottom of camera view
- After capture: Shows captured selfie with "Retake" and "Submit" options
- Privacy note: DM Sans 13px muted — "Your selfie is deleted after review. It is never shown to anyone."
- Progress line reaches ~98%

---

### G. NOTIFICATION PERMISSION

Appears immediately after selfie submission, before the waiting screen loads. Maximum sunk cost moment.

**Screen G1: Pre-Permission Soft Ask**
- This is a custom screen shown BEFORE the iOS native dialog. The purpose is to preserve the one OS permission shot.
- Palette: Cream
- Phase label: Space Mono caps — "BEFORE I START"
- Headline: Fraunces Italic — "I'll be working while you're away."
- Body: DM Sans — "When I find someone worth your time, I don't want you to miss it."
- Orb: Center, large, "reaching" animation (concentric pulses expanding outward)
- Primary CTA: "Reach me" → triggers the actual iOS native permission dialog
- Secondary: Ghost button or text link — "I'll check in myself" → skips without triggering the native dialog (preserves the OS prompt for later)
- Matchmaker whisper at bottom: Fraunces Italic, very muted — "I won't be noisy. I only speak when it matters."
- If user taps "Reach me" → iOS native dialog appears. Subtitle in native dialog: "Get notified when your matchmaker finds someone worth meeting."
- If user declines either option, they land on the waiting screen with no guilt, no retry, no acknowledgment.

---

### H. WAITING-FOR-MATCHES SCREEN

This is the Discover tab's empty state while the user waits for verification and first matches.

- Lives inside the main app shell — bottom nav is visible, settings avatar is accessible
- Palette: Cream (`#FDFBF8`)
- Orb: Center, hero element, large, with "constellation scatter" animation — particles drift outward suggesting Maren is searching through possibilities
- Headline: Fraunces Italic — "Give me a moment with this."
- Rotating status line: DM Sans, muted, crossfades between messages to show living activity. Examples: "Looking through who's here...", "Reading between the lines...", "Comparing notes..."
- Context card below the status line, showing 3 concrete steps:
  1. "Photo verification" — shows in-progress spinner/indicator
  2. "Profile built" — shows completed checkmark
  3. "Finding your people" — shows pending/waiting state
- This card provides endowed progress — not an indefinite void

**Transition when verification clears:**
1. Step 1 checkmark animates in (verified)
2. Step 3 shifts to in-progress
3. Headline crossfades to "Good. Now let me look."
4. Orb particle spawn rate doubles, drift speed increases

**Transition when first match found:**
1. Particles REVERSE direction — spawn at edges, pull inward toward orb (gathering motion)
2. Context card fades out, all steps complete
3. **Stillness beat:** Orb stops all particles. Settles into slow warm breathing with extra bloom glow. Orb lifts slightly on screen.
4. Reveal line: "I think I found someone." — Fraunces Italic, fades up alone under orb. Sits for ~2 seconds.
5. First match reveal begins (still on cream? — see note below)

Full transition sequence runs ~10 seconds across these 5 phases.

---

### I. DISCOVER TAB — MATCH BROWSING (Chapter-Based Reveal)

The core post-onboarding experience. Each match is presented as a cinematic, chapter-based, tap-through story. NOT a scrolling profile. NOT a card stack.

**Layout:** Full-screen. Each chapter is a full-screen moment. User taps to advance through chapters. Dark palette (`dark-bg`).

**Match Reveal Chapter Sequence (in order):**

1. **Intro** — Matchmaker sets the stage. Maren introduces why she picked this person. Fraunces Italic text on dark background. Orb present.

2. **Signal** — The match's Signal constellation is shown. Their unique psychological fingerprint. Fraunces headline describes their Signal character.

3. **Why You Two** — Matchmaker explains the specific compatibility reasoning. Why these two Signals complement each other. This is AI-generated narrative, pre-cached.

4. **The Echo** — Shows the USER's own onboarding words, then Maren describes that the match said something remarkably similar — WITHOUT revealing the match's actual words. Privacy-first: never show one user's raw answers to another. Creates curiosity gap. Maren might say: "I'll let her tell you that herself."

5. **Investment Gate** — User picks what intrigues them most about this match (e.g., "How she thinks" / "Signal alignment" / "What she protects"). This is a chip selection. The user's choice influences Maren's commentary in the Photo Reveal chapter. Creates IKEA effect and confirmation bias. Three options presented as chips.

6. **Photo Reveal** — Match's photos appear. Maren's commentary is personalized based on the Investment Gate choice. "Vibe Before Face" achieved — user has already formed an opinion before seeing photos.

7. **Her Words + Traits** — Surface-level profile traits. Matchmaker weaves them into the narrative rather than listing them as a spec sheet.

8. **Hidden Layer** — Matchmaker reveals a pattern NEITHER person explicitly stated but AI inferred from answer patterns. Peak psychological moment. Something like: "Neither of you said this, but..."

9. **Decision** — Like or Dislike. Two clear action buttons. Full-width, stacked or side by side.
   - Like: Warm accent button, "I'm interested" or similar
   - Dislike: Ghost/muted button, "Not this time" or similar
   - If free user has 0 actions remaining: tapping either triggers upgrade prompt (matchmaker-voiced, not generic paywall)

10. **Post-Action** — Brief matchmaker acknowledgment of the choice. Then auto-loads next reveal.

**Between reveals:** Next reveal auto-loads immediately after action. No interstitial. No matchmaker line between reveals.

**Session re-entry:** If user leaves mid-reveal and returns, reveal restarts from Chapter 1 (not mid-chapter resume).

**One-at-a-time browsing:** User must like or dislike the current reveal before seeing the next one. No skipping without spending an action.

**Free user experience in Discover:** FULL reveal — all chapters, all reasoning, all photos. Identical to premium. The only limit is action count (3 likes + 3 dislikes per day). After actions spent, user can still browse full reveals but cannot tap like/dislike. Upgrade prompt triggers ONLY when they tap like/dislike with 0 remaining.

---

### J. DRAWN TO YOU TAB — INCOMING INTEREST

**Layout:** 2-column grid (2 cards per row), vertical scroll. Dark palette.

**Each card shows:**
- Top: Miniaturized version of the interested person's Signal constellation (animated, breathing)
- Middle: AI-generated one-line matchmaker whisper (Fraunces Italic, small) — the specific thing about the user that resonated with this person
- Bottom: Warmth badge — Space Mono caps, small

**Warmth States (time-based decay over 48-72h TTL):**
- "JUST ARRIVED" — Full glow, full opacity, fast Signal breathing
- "STILL WARM" — Slightly dimmed, slightly slower
- "COOLING" — Noticeably dimmed, slow breathing
- "FADING" — Very dim, barely animated, about to expire

The entire card's visual energy is tied to warmth: glow intensity, opacity, animation speed all decay together.

**Tapping a card:** Opens the same dark cinematic chapter-based reveal used in Discover, with one addition:

**Special disclosure chapter: "She Found You"** — Inserted after "Why You Two" chapter.
- Staged timed reveals:
  1. Orb animation
  2. "I should tell you something." (Fraunces Italic, pause)
  3. "She went through your story first. And she's already here." (fade in)

**Free user paywall:** Hits AFTER the disclosure chapter. They know she's interested, felt the compatibility, but can't finish the reveal.
- Locked remaining chapters shown with teaser descriptions: The Echo, Investment Gate, The Hidden Layer, Photo Reveal
- Matchmaker paywall line: Fraunces Italic — "She's waiting. And this Signal won't stay warm forever."

**Paid users:** Get full reveal. Since she already expressed interest, expressing interest back = instant mutual match → chat opens immediately.

**Empty state:** Tab indicator (warm dot) only appears when filtered incoming interests exist. No "no one liked you" message ever shown.

---

### K. CHAT

**Chat List (Chats tab):**
- List of active chat threads
- Each row: Small circular profile photo (40px), match name (DM Sans Medium), last message preview (DM Sans Regular, muted), timestamp (Space Mono, muted)
- Dark palette for the list

**Chat Thread:**
- Palette: Uses a bubble-less "Ink & Wash" design — warm cream background for the thread area
- Chat header: Small profile photo (32px) + match name (DM Sans Medium) + small decorative orb (24-28px, non-interactive)
- Messages: DM Sans Regular. No chat bubbles, no containers. User messages and match messages distinguished by alignment and subtle color difference. User messages right-aligned. Match messages left-aligned.
- Input area: Text input with placeholder "Or say it your way..." (matches onboarding style). Send button (warm accent circular) when text exists. Mic button (microphone icon) when input is empty.
- Voice messages: Waveform visualization with play button and duration display
- No typing indicators — intentional product decision
- Text and voice only — no GIFs, stickers, or reactions
- Voice messages: Hold-to-record, release-to-send, up to 1 minute

**Day 10 Inactivity Nudge (mutual silence):**
- Appears as a separate overlay when opening the chat, NOT as a message in the thread
- Matchmaker-voiced, warm, normalizes silence

**Day 15 Enforcement (mutual silence):**
- Full-screen matchmaker takeover overlay
- AI personality explains the closure warmly
- Two options: "Let go" (→ feedback chips, frees slot) or "Wait — I want to try" (→ 48-hour micro-deadline)
- If "Wait" chosen and 48 hours pass with no message → auto-close, no second chance

**Chat removal feedback:**
- Structured chips: "Conversation fizzled", "Different life direction", "No physical attraction", "Didn't feel safe" (flagged separately as safety signal)
- Two taps maximum — user is emotionally checked out at removal

---

### L. PROFILE SCREEN

**Layout:**
- Signal visualization at top — the user's own Signal constellation, animated
- Photo grid below Signal — reorderable, editable
- **"Your Details" section** — Editable anytime without conversation:
  - Job title, Education, Height, Location, Children, Smoking, Drinking
  - Standard form controls, direct editing
- **"Deeper Profile" section** — Maren's psychological read surfaced back to the user:
  - Values, Attachment style, Communication style, Conflict patterns, What you're looking for
  - These are NOT editable directly — they come from onboarding analysis
  - "Revisit with Maren" button at the bottom of this section — opens conversational update flow
- Palette: Dark for Signal area, Cream for details/editing sections (or unified — follow governing palette rule)

**"Revisit with Maren" Flow:**
- Opens same conversational interface as onboarding (warm, bubble-less, Fraunces matchmaker voice, orb)
- First screen: Maren asks "What brought you back?" with routing chips:
  - "I've been through something" → Phase 4
  - "What I want looks different now" → Phase 3-4
  - "My life changed" → Phase 2
  - "I was holding back before" → Phase 4
  - "I know myself better now" → Phase 3
- Free text option also available
- Rate limited: once per week, max twice per month. Shown as "Next revisit available [date]" — not a countdown, not a locked button appearance.
- Maren frames: "I need time to recalibrate who I show you" — not a restriction

---

### M. SETTINGS

- Accessible via profile avatar in bottom nav (top-right)
- Standard settings layout on cream palette
- Details section editable here as well
- Notification preferences
- Subscription management ("Become Devoted" upgrade CTA)
- Account (email, phone verification status)
- Privacy & Terms
- Delete account
- Orb: small, top-right

---

## 7. SUBSCRIPTION MODEL — "DEVOTED"

- Single paid tier at launch: **Devoted**
- Price: $24.99/month, monthly only (no multi-month discounts — contradicts "designed to leave" brand)
- Upgrade CTA language: "Become Devoted" — frames as matching user's energy, not shaming free tier

### Free vs Devoted Comparison

| Feature | Free | Devoted |
|---------|------|---------|
| Discover reveals | Full experience, all chapters | Full experience, all chapters |
| Daily likes | 3 | 6 |
| Daily dislikes | 3 | 6 |
| Active chat cap | 5 (hard cap) | Soft cap (no hard wall, delivery slows at high count) |
| Drawn to You reveals | Paywall after disclosure chapter | Full reveal |
| Discover batch size | Up to 15 | Up to 15 |
| Chat slot per match | Same | Same |
| Queue priority | Standard | Priority in free users' hidden queues |

---

## 8. MATCHMAKER VOICE — COPY GUIDELINES

Maren is a character, not a system. She speaks in first person. She is warm, direct, a little mysterious, never corporate.

**Voice rules:**
- Always first person ("I found someone" not "A match has been found")
- Uses "I", "you", "we" — never "the app", "the system", "our algorithm"
- Short sentences. Occasionally fragments. Literary, not marketing.
- Never exclamation marks in matchmaker dialogue. Period energy, not excitement energy.
- Can be wry, knowing, a little withholding — she knows things you don't yet
- Never apologizes for the product (no "Sorry, you've run out of likes!")
- Frames limitations as intentionality ("I only show you people worth your time" not "You've reached your daily limit")

**Copy examples by context:**
- Waiting: "Give me a moment with this."
- Match found: "I think I found someone."
- Notification: "Maren found someone for you."
- Upgrade: "Become Devoted"
- Chat nudge: matchmaker-voiced, warm, normalizing
- Paywall: "She's waiting. And this Signal won't stay warm forever."
- Empty discover: "That's everyone I wanted you to meet today. I'm still looking."
- Rate limit: "I need time to recalibrate who I show you."
- Profile completion: "Now I need to know who to look for."
- Photo prompt: "Good. Now let them see you."
- Notification ask: "I'll be working while you're away."

---

## 9. SOUND & HAPTIC DESIGN (For Reference)

### Sound (Tone.js)
- Atmospheric textures per phase: light ambient in Phase 2, deeper in Phase 3, sparse in Phase 4
- Cinematic swell for Signal Reveal
- Non-verbal vocal micro-reactions between questions (hums, breaths — see onboarding section)

### Haptics
- Phase 2: Light taps on interactions
- Phase 3: Continuous selection feedback
- Phase 4: Silence — no haptics
- Phase 5 (Signal Reveal): Success buzz pattern

---

## 10. KEY DESIGN PRINCIPLES — NON-NEGOTIABLE

1. **No swiping.** Ever. Anywhere. This is not a swipe app.
2. **No chat bubbles in onboarding.** Spatial hierarchy (position relative to orb and input) IS the attribution system.
3. **Chat thread uses the "Ink & Wash" bubble-less design** — but this is the chat between matched users, not onboarding.
4. **Photos come AFTER personality.** "Vibe Before Face" is the core philosophy.
5. **The matchmaker is the architecture, not a feature.** Maren doesn't have a tab — she IS the reveal voice, chat orb, enforcement overlays, and Signal.
6. **Progress is felt, not counted.** No "Step 2 of 7" anywhere.
7. **Empty states are never negative.** No "no matches" or "no one liked you."
8. **One thing at a time.** One question per screen in intake. One reveal at a time in Discover. One chat open at a time for engagement.
9. **Auto-transitions where Maren is in control.** Pulsing dots + auto-advance. User never needs to tap "Next" on Maren's transition beats.
10. **Warmth spectrum only for the brand palette.** Creams, ambers, browns, near-blacks. No blues. No purples. No cold colors anywhere in the design.

---

## 11. PROTOTYPE INVENTORY (Existing References)

These JSX prototypes have been built in previous conversations. If any are available as attachments, use them as visual reference for the established design language:

1. `matchmaker-auth-v3.jsx` — Full auth flow (welcome, email, OTP, phone, complete) for both signup and login
2. `matchmaker-intake.jsx` — Splash + Basic Info intake (name, birthday, gender, interested in)
3. `maren-onboarding-chat.jsx` — Phases 2-4 conversational flow with anchor questions, atmosphere darkening, orb, ember particles
4. `matchmaker-screens.jsx` — Notification permission + waiting screen + first match transition animation
5. `MatchExperience-creamy.jsx` — Match browsing chapter-based reveal
6. `maren-discover.jsx` — Discover tab layout
7. `maren-photo-verification.jsx` — Photo upload + selfie verification
8. Profile screen prototype — Signal, photo grid, details, deeper profile, revisit flow
9. `maren-profile-completion.jsx` — Post-Signal profile completion (3 grouped screens)
10. Chat screen prototype — Ink & Wash bubble-less chat design
11. Signal Reveal prototype — Phase 5 constellation animation
12. `maren-drawn-to-you.jsx` — Drawn to You tab with warmth decay, 2-column grid, paywall

---

## 12. SCREEN INVENTORY CHECKLIST

Every screen that needs to be designed:

**Auth:** Welcome → Email → Email OTP → Phone (signup) → SMS OTP (signup) → Complete
**Intake:** Name → Birthday → Gender → Interested In
**Onboarding:** Phase 2 chat → Phase 3 chat → Phase 4 chat (continuous, not separate screens)
**Signal Reveal:** Phase 5 constellation
**Profile Completion:** Transition beat → You in the World → Where You Come From → How You Live → Photo transition beat
**Photo:** Photo Upload → Selfie Verification
**Notification:** Pre-permission soft ask
**Waiting:** Waiting-for-matches (with verification status) → First match transition
**Discover:** Match reveal (10 chapters) → Batch exhausted empty state → Upgrade prompt (when 0 actions)
**Drawn to You:** Grid view → Incoming reveal (with disclosure chapter) → Free paywall → Devoted full reveal
**Chat:** Chat list → Chat thread → Day 10 nudge overlay → Day 15 enforcement overlay → Removal feedback chips
**Profile:** Signal + photos + details + deeper profile + Revisit with Maren flow
**Settings:** Standard settings screen
**Upgrade:** "Become Devoted" upgrade presentation (matchmaker-voiced)
