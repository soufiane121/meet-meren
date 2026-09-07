import { useState, useEffect } from "react";

const T = {
  bg: { cream: "#FDFBF8", surface: "#F5F0EA" },
  text: { dark: "#1A1210", body: "#3D3028", sec: "rgba(26,18,16,0.55)", muted: "rgba(26,18,16,0.28)", mm: "#6B4D35" },
  accent: { warm: "#C4956A", ember: "#E8A87C", border: "rgba(196,149,106,0.25)", glow: "rgba(196,149,106,0.1)" },
  font: { mm: "'Fraunces', serif", body: "'DM Sans', sans-serif", label: "'Space Mono', monospace" },
};

const Orb = ({ size = 32, intensity = 1, active = false }) => {
  const [p, setP] = useState(0);
  useEffect(() => { const id = setInterval(() => setP(v => v + 0.02), 16); return () => clearInterval(id); }, []);
  const s = 1 + Math.sin(p * (active ? 1.2 : 0.8)) * 0.08 * intensity;
  const go = (0.25 + Math.sin(p * (active ? 1.2 : 0.8)) * 0.12) * intensity;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", width: size * 2.2, height: size * 2.2, borderRadius: "50%", background: `radial-gradient(circle, ${T.accent.warm} 0%, transparent 70%)`, opacity: go, transform: `translate(-50%,-50%) scale(${s})` }} />
      <div style={{ position: "absolute", top: 0, left: 0, width: size, height: size, borderRadius: "50%", background: `radial-gradient(circle at 35% 35%, ${T.accent.ember} 0%, ${T.accent.warm} 50%, #8B6B4A 100%)`, transform: `scale(${s})`, boxShadow: `0 0 ${size * 0.4}px rgba(196,149,106,${0.25 * intensity})` }} />
    </div>
  );
};

const Label = ({ children, c }) => (
  <span style={{ fontFamily: T.font.label, fontSize: 9, color: c || T.text.muted, letterSpacing: 1.1, textTransform: "uppercase" }}>{children}</span>
);

/* --- capacity meter: makes the mechanic legible without words --- */
const Slots = ({ used, total, waiting }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} style={{
        width: 16, height: 4, borderRadius: 2,
        background: i < used ? T.accent.warm : "rgba(26,18,16,0.10)",
        opacity: i < used ? 0.85 : 1,
      }} />
    ))}
    {waiting > 0 && (
      <>
        <div style={{ width: 7 }} />
        {Array.from({ length: waiting }).map((_, i) => (
          <div key={`w${i}`} style={{
            width: 16, height: 4, borderRadius: 2,
            background: "transparent", border: `1px dashed ${T.accent.warm}`, opacity: 0.6,
          }} />
        ))}
      </>
    )}
  </div>
);

const Avatar = ({ letter, dim }) => (
  <div style={{
    width: 46, height: 46, borderRadius: "50%", flexShrink: 0,
    background: `linear-gradient(135deg, ${T.bg.surface}, ${T.accent.warm}22)`,
    border: `1px solid ${T.accent.border}`, opacity: dim ? 0.4 : 1,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: T.font.mm, fontSize: 18, color: T.accent.warm,
  }}>{letter}</div>
);

const ChatRow = ({ letter, name, preview, meta, dim }) => (
  <div style={{ display: "flex", gap: 12, alignItems: "center", padding: "13px 0", borderBottom: `1px solid rgba(26,18,16,0.05)` }}>
    <Avatar letter={letter} dim={dim} />
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
        <span style={{ fontFamily: T.font.mm, fontSize: 16, color: dim ? T.text.sec : T.text.dark, fontWeight: 300 }}>{name}</span>
        <span style={{ fontFamily: T.font.label, fontSize: 9, color: T.text.muted }}>{meta}</span>
      </div>
      <p style={{ fontFamily: T.font.body, fontSize: 13, margin: "3px 0 0", color: dim ? T.text.muted : T.text.sec, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{preview}</p>
    </div>
  </div>
);

/* --- the nudge --- */
const Nudge = ({ line, sub, weight }) => (
  <div style={{
    padding: "17px 18px", borderRadius: 18, marginBottom: 6,
    background: weight >= 3 ? `linear-gradient(160deg, ${T.bg.surface}, ${T.accent.glow})` : T.bg.surface,
    border: `1px solid ${weight >= 3 ? T.accent.warm : T.accent.border}`,
    boxShadow: weight >= 4 ? `0 0 22px ${T.accent.glow}` : "none",
    transition: "all 0.3s",
  }}>
    <div style={{ display: "flex", gap: 13, alignItems: "flex-start" }}>
      <Orb size={weight >= 3 ? 26 : 22} intensity={0.55 + weight * 0.12} active={weight >= 3} />
      <div style={{ flex: 1 }}>
        <p style={{ fontFamily: T.font.mm, fontSize: weight >= 3 ? 17 : 16, fontStyle: "italic", fontWeight: 300, color: T.text.mm, margin: 0, lineHeight: 1.45 }}>
          {line}
        </p>
        {sub && (
          <p style={{ fontFamily: T.font.body, fontSize: 13, color: T.text.sec, margin: "7px 0 0", lineHeight: 1.5 }}>
            {sub}
          </p>
        )}
      </div>
    </div>
  </div>
);

const STATES = [
  {
    k: "Day 1 — she chose you",
    used: 5, waiting: 1, weight: 1, days: null,
    line: "She read your whole story. Then she chose you.",
    sub: "There's nowhere to put her.",
    why: "The loss is a person, not a queue entry. She did the work — went through every chapter — before choosing. That's what he's missing, and it's all true.",
  },
  {
    k: "Day 2 — she wrote",
    used: 5, waiting: 1, weight: 2, days: null,
    line: "She read you, chose you, and wrote something.",
    sub: "It's still sealed. You don't have room to open it.",
    why: "Sealed, not unread. An envelope he can't open holds more than a message he could dismiss. And he can't discount what he hasn't seen.",
  },
  {
    k: "Day 6 — two waiting",
    used: 5, waiting: 2, weight: 3, days: 6,
    line: "Two people have read your story and chosen you. One of them wrote.",
    sub: "She's been waiting six days.",
    why: "Elapsed time, not a countdown. A timer is manufactured urgency; days already spent are just true. Endowment rises with the count — two is more his than one was.",
  },
  {
    k: "Day 9 — full, throttled",
    used: 5, waiting: 3, weight: 4, days: 9,
    line: "Three people read you and chose you. Two of them wrote.",
    sub: "I've stopped bringing you anyone new. And they aren't waiting only on you — I'm still showing them to other people.",
    why: "The sharpest honest line in the product. A mutual match doesn't take her off the market; she's still in other people's reveals. Brutal, completely true, and it never mentions Devoted.",
  },
  {
    k: "Day 14 — running out",
    used: 5, waiting: 3, weight: 5, days: 14,
    line: "She's been waiting fourteen days.",
    sub: "I can't hold her much longer than that.",
    why: "Maren's limit, not a system countdown. She's telling him what she can do, which is a friend's constraint rather than a paywall's timer.",
  },
  {
    k: "Day 16 — gone",
    used: 5, waiting: 2, weight: 5, days: null,
    line: "She's gone.",
    sub: "She read your whole story, chose you, waited sixteen days. I couldn't keep her longer than that.",
    why: "The only real, attributable loss in the free product. Every element of her investment restated at the moment it's lost — and framed as Maren's limit, so she stays on his side when their interests diverge.",
  },
];

export default function CapacityNudge() {
  const [i, setI] = useState(0);
  const s = STATES[i];

  return (
    <div style={{ minHeight: "100vh", background: "#F0EFEC", fontFamily: T.font.body, padding: "26px 18px 70px" }}>
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@400;500&family=Space+Mono&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <Label>Free tier · at capacity</Label>
        <h1 style={{ fontFamily: T.font.mm, fontSize: 25, color: T.text.dark, fontWeight: 300, margin: "6px 0 4px" }}>
          The nudge, across every state
        </h1>
        <p style={{ fontFamily: T.font.body, fontSize: 13.5, color: T.text.sec, margin: "0 0 20px", maxWidth: 620, lineHeight: 1.55 }}>
          Fixed card, cannot be dismissed. Copy changes only when the facts change — never on a timer.
        </p>

        <div style={{ display: "flex", gap: 7, marginBottom: 22, flexWrap: "wrap" }}>
          {STATES.map((st, n) => (
            <button key={st.k} onClick={() => setI(n)} style={{
              padding: "8px 14px", borderRadius: 18, cursor: "pointer",
              background: i === n ? T.accent.warm : "transparent",
              border: `1px solid ${i === n ? T.accent.warm : T.accent.border}`,
              fontFamily: T.font.body, fontSize: 12.5,
              color: i === n ? "#FFF" : T.text.mm, transition: "all 0.2s",
            }}>{st.k}</button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>

          <div style={{ flex: "1 1 350px", maxWidth: 390, background: T.bg.cream, border: `1px solid rgba(26,18,16,0.09)`, borderRadius: 22, padding: "16px 18px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 11, borderBottom: `1px solid rgba(26,18,16,0.06)`, marginBottom: 14 }}>
              <span style={{ fontFamily: T.font.mm, fontSize: 20, color: T.text.dark, fontWeight: 300 }}>Chats</span>
              <Slots used={s.used} total={5} waiting={s.waiting} />
            </div>

            <Nudge line={s.line} sub={s.sub} weight={s.weight} />

            <ChatRow letter="A" name="Alex" preview="haha ok fair" meta="4h" />
            <ChatRow letter="K" name="Kit" preview="Voice message" meta="1d" />
            <ChatRow letter="M" name="Mo" preview="i'll let you know" meta="3d" />
            <ChatRow letter="T" name="Tess" preview="—" meta="9d" dim />
            <ChatRow letter="B" name="Bee" preview="—" meta="12d" dim />

            <p style={{ fontFamily: T.font.label, fontSize: 9, color: T.text.muted, letterSpacing: 1, textTransform: "uppercase", textAlign: "center", margin: "18px 0 0" }}>
              5 of 5 · {s.waiting} waiting{s.days ? ` · longest ${s.days} days` : ""}
            </p>
          </div>

          <div style={{ flex: "1 1 300px", maxWidth: 380 }}>
            <div style={{ background: T.bg.cream, border: `1px solid rgba(26,18,16,0.09)`, borderRadius: 18, padding: "20px 22px", marginBottom: 14 }}>
              <Label>Why this line</Label>
              <p style={{ fontFamily: T.font.body, fontSize: 14, color: T.text.body, lineHeight: 1.6, margin: "10px 0 0" }}>
                {s.why}
              </p>
            </div>

            <div style={{ background: T.bg.cream, border: `1px solid rgba(26,18,16,0.09)`, borderRadius: 18, padding: "20px 22px" }}>
              <Label>Rules every line passes</Label>
              {[
                ["States the situation, never the remedy", "Devoted is never mentioned. He reaches it himself, which holds better than being told."],
                ["Escalation is arithmetic, not tone", "Her register never sharpens. His situation gets heavier. Manufactured urgency reads as a tactic and discounts everything else she says."],
                ["Two dead chats are always visible", "Tess at 9 days, Bee at 12. The free path is legible in the interface, so the copy doesn't have to explain it."],
                ["Nothing is ever dismissible", "It's a state, not an interruption. Dismissing a true state would be the app helping him pretend."],
              ].map(([h, b]) => (
                <div key={h} style={{ marginTop: 13 }}>
                  <p style={{ fontFamily: T.font.mm, fontSize: 14.5, color: T.text.dark, margin: "0 0 3px", fontWeight: 400 }}>{h}</p>
                  <p style={{ fontFamily: T.font.body, fontSize: 12.5, color: T.text.sec, margin: 0, lineHeight: 1.5 }}>{b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* rejected lines */}
        <div style={{ marginTop: 30, background: T.bg.cream, border: `1px solid rgba(26,18,16,0.09)`, borderRadius: 18, padding: "22px 24px" }}>
          <Label>Rejected, and why</Label>
          <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
            {[
              ['"3 people are waiting — upgrade to Devoted to see them"', "Names the remedy. Converts on first read, reads as a sales tactic on second. A $25/month decision involves a second read."],
              ['"Your queue expires in 4 days"', "A countdown is manufactured. Elapsed time — \"she\'s been waiting fourteen days\" — is just true, and it lands harder."],
              ['"More people wrote to you"', "Usually false. A queue entry is a mutual match; most won\'t have written. False in the one place she can least afford it."],
              ['"Don\'t let this one slip away"', "Tells him how to feel. Maren describes, she doesn\'t coach."],
              ['"You have room if you make it"', "True, but it\'s Maren instructing him. He learns the mechanic the first time a slot refills. Discovered beats explained."],
            ].map(([bad, why]) => (
              <div key={bad} style={{ paddingLeft: 13, borderLeft: `2px solid rgba(166,75,42,0.3)` }}>
                <p style={{ fontFamily: T.font.body, fontSize: 13.5, color: "#7A3820", margin: "0 0 3px" }}>{bad}</p>
                <p style={{ fontFamily: T.font.body, fontSize: 12.5, color: T.text.sec, margin: 0, lineHeight: 1.5 }}>{why}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
