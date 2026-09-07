import { useState, useEffect } from "react";

// ─── Design Tokens (Light Warm Palette) ──────────────────────
const T = {
  bg: "#FDFBF8",
  bgSoft: "#F7F3EE",
  bgWarm: "#F2EBE2",
  ink: "#2C2420",
  inkSoft: "#6B5D52",
  inkGhost: "#A89888",
  warmAccent: "#C4956A",
  devotedGold: "#B8862D",
  devotedGoldSoft: "rgba(184,134,45,0.12)",
  devotedGoldGlow: "rgba(184,134,45,0.25)",
  border: "rgba(44,36,32,0.08)",
  borderStrong: "rgba(44,36,32,0.14)",
  fontDisplay: "'Fraunces', 'Georgia', serif",
  fontBody: "'DM Sans', 'Helvetica Neue', sans-serif",
  fontMono: "'Space Mono', 'Courier New', monospace",
};

// ─── Breathing Orb (Light variant) ───────────────────────────
function Orb({ size = 72, devoted = false, reaching = false, style = {} }) {
  const base = devoted ? T.devotedGold : T.warmAccent;
  const inner = devoted ? "#D4A853" : "#D4AA7D";
  const glow = devoted ? T.devotedGoldGlow : "rgba(196,149,106,0.2)";

  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: `radial-gradient(circle at 40% 35%, ${inner}, ${base})`,
      boxShadow: `0 0 ${size * 0.4}px ${glow}, 0 0 ${size * 0.8}px ${devoted ? "rgba(184,134,45,0.1)" : "rgba(196,149,106,0.08)"}`,
      animation: `orbBreathe ${devoted ? "3s" : "4s"} ease-in-out infinite`,
      position: "relative",
      flexShrink: 0,
      ...style,
    }}>
      {reaching && (
        <>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              position: "absolute",
              inset: -10 - i * 9,
              borderRadius: "50%",
              border: `1px solid ${devoted ? "rgba(184,134,45,0.18)" : "rgba(196,149,106,0.12)"}`,
              animation: `orbPulse 2.5s ease-out infinite`,
              animationDelay: `${i * 0.8}s`,
              opacity: 0,
            }} />
          ))}
        </>
      )}
    </div>
  );
}

// ─── Locked Chapter Row ──────────────────────────────────────
function LockedChapter({ label, description }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "14px 16px",
      background: T.bgSoft,
      borderRadius: 14,
      border: `1px solid ${T.border}`,
    }}>
      <div style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        border: `1.5px solid ${T.inkGhost}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}>
        <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
          <rect x="1" y="6" width="10" height="7" rx="2" stroke={T.inkGhost} strokeWidth="1.2"/>
          <path d="M3 6V4a3 3 0 116 0v2" stroke={T.inkGhost} strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: T.fontBody,
          fontSize: 13.5,
          fontWeight: 500,
          color: T.ink,
        }}>{label}</div>
        {description && (
          <div style={{
            fontFamily: T.fontBody,
            fontSize: 11.5,
            color: T.inkGhost,
            marginTop: 2,
          }}>{description}</div>
        )}
      </div>
    </div>
  );
}

// ─── Phase Label ─────────────────────────────────────────────
function PhaseLabel({ children }) {
  return (
    <div style={{
      fontFamily: T.fontMono,
      fontSize: 10,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: T.inkGhost,
    }}>{children}</div>
  );
}

// ─── CTA Button ──────────────────────────────────────────────
function CTAButton({ children, onClick, devoted = false, secondary = false }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        width: "100%",
        padding: secondary ? "14px 24px" : "16px 24px",
        borderRadius: 28,
        border: secondary ? `1px solid ${T.borderStrong}` : "none",
        background: secondary
          ? "transparent"
          : devoted
            ? `linear-gradient(135deg, #C99A30, ${T.devotedGold})`
            : T.warmAccent,
        color: secondary ? T.inkSoft : "#FFFDF8",
        fontFamily: T.fontBody,
        fontSize: secondary ? 14 : 15,
        fontWeight: 600,
        letterSpacing: "0.01em",
        cursor: "pointer",
        transform: pressed ? "scale(0.97)" : "scale(1)",
        transition: "transform 0.15s ease, box-shadow 0.3s ease",
        boxShadow: devoted && !secondary
          ? `0 4px 20px ${T.devotedGoldGlow}`
          : "none",
      }}
    >{children}</button>
  );
}

// ─── Matchmaker whisper ──────────────────────────────────────
function Whisper({ children }) {
  return (
    <p style={{
      fontFamily: T.fontDisplay,
      fontStyle: "italic",
      fontSize: 12.5,
      color: T.inkGhost,
      textAlign: "center",
      margin: 0,
      lineHeight: 1.5,
    }}>{children}</p>
  );
}

// ─── SCREEN: Discover Action Limit ───────────────────────────
function DiscoverActionLimit({ onUpgrade, onDismiss }) {
  return (
    <div style={{ ...screenBase, justifyContent: "center", padding: "56px 32px 40px" }}>
      <Orb size={64} reaching style={{ margin: "0 auto" }} />
      <div style={{ height: 36 }} />

      <PhaseLabel>Out of actions</PhaseLabel>
      <div style={{ height: 14 }} />

      <h1 style={headline}>
        You felt something.
        <br />I could tell.
      </h1>

      <div style={{ height: 18 }} />

      <p style={body}>
        You've used your three actions for today. She'll still be here tomorrow — but if you'd rather not wait, Devoted gives you six.
      </p>

      <div style={{ height: 12 }} />
      <Whisper>You can keep browsing. I won't stop showing you people.</Whisper>

      <div style={{ flex: 1, minHeight: 36 }} />

      <div style={ctaStack}>
        <CTAButton devoted onClick={onUpgrade}>Become Devoted</CTAButton>
        <CTAButton secondary onClick={onDismiss}>Keep browsing</CTAButton>
      </div>
    </div>
  );
}

// ─── SCREEN: Drawn to You Paywall ────────────────────────────
function DrawnToYouPaywall({ onUpgrade, onDismiss }) {
  return (
    <div style={{ ...screenBase, justifyContent: "flex-start", padding: "48px 28px 40px" }}>
      <div style={{ textAlign: "center" }}>
        <Orb size={56} reaching style={{ margin: "0 auto" }} />
        <div style={{ height: 28 }} />
        <PhaseLabel>She found you</PhaseLabel>
        <div style={{ height: 12 }} />

        <h1 style={{ ...headline, fontSize: 23 }}>
          She went through your story.
          <br />And she's already here.
        </h1>
        <div style={{ height: 14 }} />
        <p style={{ ...body, maxWidth: 270 }}>
          Her reveal isn't finished yet. The rest is waiting.
        </p>
      </div>

      <div style={{ height: 24 }} />

      <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
        <LockedChapter label="The Echo" description="Where your words nearly overlap" />
        <LockedChapter label="Investment Gate" description="Choose what draws you closer" />
        <LockedChapter label="The Hidden Layer" description="What neither of you said out loud" />
        <LockedChapter label="Photo Reveal" description="Now you see her" />
      </div>

      <div style={{ height: 16 }} />

      <p style={{
        fontFamily: T.fontDisplay,
        fontStyle: "italic",
        fontSize: 13,
        color: T.devotedGold,
        textAlign: "center",
        margin: 0,
        lineHeight: 1.5,
      }}>
        She's waiting. And this Signal won't stay warm forever.
      </p>

      <div style={{ flex: 1, minHeight: 20 }} />

      <div style={ctaStack}>
        <CTAButton devoted onClick={onUpgrade}>Become Devoted</CTAButton>
        <CTAButton secondary onClick={onDismiss}>Not yet</CTAButton>
      </div>
    </div>
  );
}

// ─── SCREEN: Chat Hard Cap ───────────────────────────────────
function ChatCapPrompt({ onUpgrade, onDismiss }) {
  return (
    <div style={{ ...screenBase, justifyContent: "center", padding: "56px 32px 40px" }}>
      {/* Five seat dots */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 12 }}>
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: T.warmAccent,
            opacity: 0.35 + i * 0.14,
          }} />
        ))}
      </div>

      <div style={{ height: 16 }} />
      <Orb size={56} style={{ margin: "0 auto" }} />
      <div style={{ height: 32 }} />

      <PhaseLabel>All seats taken</PhaseLabel>
      <div style={{ height: 14 }} />

      <h1 style={headline}>
        Your attention is full.
        <br />That's not a bad thing.
      </h1>

      <div style={{ height: 18 }} />

      <p style={body}>
        Five conversations is your limit right now. Clear a seat to make room — or Devoted removes the wall entirely.
      </p>

      <div style={{ flex: 1, minHeight: 36 }} />

      <div style={ctaStack}>
        <CTAButton devoted onClick={onUpgrade}>Become Devoted</CTAButton>
        <CTAButton secondary onClick={onDismiss}>I'll make room</CTAButton>
      </div>
    </div>
  );
}

// ─── SCREEN: Queue Expiration ────────────────────────────────
function QueueExpiration({ onUpgrade, onDismiss }) {
  return (
    <div style={{ ...screenBase, justifyContent: "center", padding: "56px 32px 40px" }}>
      {/* Fading constellation */}
      <div style={{ position: "relative", width: 80, height: 80, margin: "0 auto" }}>
        <Orb size={44} style={{ position: "absolute", top: 18, left: 18, opacity: 0.28 }} />
        {[0, 1, 2, 3, 4].map(i => {
          const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
          return (
            <div key={i} style={{
              position: "absolute",
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: T.inkGhost,
              left: 38 + Math.cos(a) * 34,
              top: 38 + Math.sin(a) * 34,
              opacity: 0.25,
            }} />
          );
        })}
      </div>

      <div style={{ height: 28 }} />
      <PhaseLabel>Connection missed</PhaseLabel>
      <div style={{ height: 14 }} />

      <h1 style={headline}>
        Someone who chose you
        <br />just slipped away.
      </h1>
      <div style={{ height: 18 }} />

      <p style={body}>
        You had a mutual match waiting, but your conversations were full and time ran out. Devoted means I stop holding people back.
      </p>

      <div style={{ flex: 1, minHeight: 36 }} />

      <div style={ctaStack}>
        <CTAButton devoted onClick={onUpgrade}>Become Devoted</CTAButton>
        <CTAButton secondary onClick={onDismiss}>I understand</CTAButton>
      </div>
    </div>
  );
}

// ─── SCREEN: Devoted Subscription ────────────────────────────
function DevotedSubscription({ onSubscribe, onBack }) {
  return (
    <div style={{
      ...screenBase,
      justifyContent: "flex-start",
      padding: 0,
      overflowY: "auto",
      textAlign: "left",
    }}>
      {/* Back */}
      <button onClick={onBack} style={{
        position: "sticky",
        top: 0,
        left: 0,
        zIndex: 10,
        background: "rgba(253,251,248,0.85)",
        backdropFilter: "blur(12px)",
        border: "none",
        color: T.inkSoft,
        fontFamily: T.fontBody,
        fontSize: 14,
        cursor: "pointer",
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        gap: 4,
        width: "100%",
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8l5 5" stroke={T.inkSoft} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back
      </button>

      {/* Hero */}
      <div style={{
        padding: "24px 32px 36px",
        textAlign: "center",
        background: `radial-gradient(ellipse at 50% 60%, ${T.devotedGoldSoft} 0%, transparent 70%)`,
      }}>
        <Orb size={80} devoted reaching style={{ margin: "0 auto" }} />
        <div style={{ height: 28 }} />

        <div style={{
          fontFamily: T.fontMono,
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: T.devotedGold,
        }}>DEVOTED</div>
        <div style={{ height: 12 }} />

        <h1 style={{
          fontFamily: T.fontDisplay,
          fontWeight: 300,
          fontStyle: "italic",
          fontSize: 27,
          lineHeight: 1.3,
          color: T.ink,
          margin: 0,
        }}>
          Stop holding back.
          <br />Neither will I.
        </h1>
        <div style={{ height: 16 }} />

        <p style={{
          fontFamily: T.fontBody,
          fontSize: 13.5,
          lineHeight: 1.65,
          color: T.inkSoft,
          margin: "0 auto",
          maxWidth: 290,
        }}>
          Right now, I'm working within limits — how many people I show you, how many you can reach, how many conversations you can hold. Devoted means I stop rationing.
        </p>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: T.border, margin: "0 28px" }} />

      {/* Benefits */}
      <div style={{ padding: "28px 28px 24px" }}>
        <div style={{
          fontFamily: T.fontMono,
          fontSize: 9,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: T.inkGhost,
          marginBottom: 20,
        }}>WHAT CHANGES</div>

        {[
          { icon: "⬡", title: "Six actions a day", desc: "Double the likes and dislikes. More chances to act on what you feel." },
          { icon: "◎", title: "No conversation wall", desc: "Your chats never lock. I slow delivery as you fill up, but I never shut the door." },
          { icon: "◈", title: "Full incoming reveals", desc: "When someone chooses you in Drawn to You, see every chapter of their story." },
          { icon: "△", title: "Priority in the queue", desc: "When someone you like can't talk yet, you move to the front of their line." },
        ].map((item, i) => (
          <div key={i} style={{
            display: "flex",
            gap: 14,
            padding: "16px 0",
            borderBottom: `1px solid ${T.border}`,
          }}>
            <div style={{
              fontFamily: T.fontMono,
              fontSize: 17,
              color: T.devotedGold,
              lineHeight: 1,
              width: 22,
              textAlign: "center",
              flexShrink: 0,
              marginTop: 2,
            }}>{item.icon}</div>
            <div>
              <div style={{
                fontFamily: T.fontBody,
                fontSize: 14,
                fontWeight: 500,
                color: T.ink,
                marginBottom: 3,
              }}>{item.title}</div>
              <div style={{
                fontFamily: T.fontBody,
                fontSize: 12,
                color: T.inkGhost,
                lineHeight: 1.5,
              }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing + CTA */}
      <div style={{ padding: "12px 28px 44px", textAlign: "center" }}>
        <div style={{
          fontFamily: T.fontDisplay,
          fontSize: 38,
          fontWeight: 300,
          color: T.ink,
          letterSpacing: "-0.02em",
        }}>$24.99</div>
        <div style={{
          fontFamily: T.fontBody,
          fontSize: 12,
          color: T.inkGhost,
          marginTop: 4,
          marginBottom: 24,
        }}>per month · cancel anytime</div>

        <CTAButton devoted onClick={onSubscribe}>Become Devoted</CTAButton>

        <p style={{
          fontFamily: T.fontDisplay,
          fontStyle: "italic",
          fontSize: 12,
          color: T.inkGhost,
          margin: "16px 0 0",
          lineHeight: 1.5,
        }}>No commitment plans. I'm not designed to keep you long.</p>
      </div>
    </div>
  );
}

// ─── SCREEN: Post-Purchase Confirmation ──────────────────────
function DevotedConfirmation({ onContinue }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1800);
    const t3 = setTimeout(() => setPhase(3), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div style={{
      ...screenBase,
      justifyContent: "center",
      padding: "56px 32px 40px",
      background: `radial-gradient(ellipse at 50% 40%, ${T.devotedGoldSoft} 0%, ${T.bg} 70%)`,
    }}>
      <div style={{
        opacity: phase >= 0 ? 1 : 0,
        transform: phase >= 0 ? "scale(1)" : "scale(0.8)",
        transition: "all 0.8s cubic-bezier(0.23, 1, 0.32, 1)",
        margin: "0 auto",
      }}>
        <Orb size={96} devoted reaching />
      </div>

      <div style={{ height: 36 }} />

      <div style={{
        opacity: phase >= 1 ? 1 : 0,
        transform: phase >= 1 ? "translateY(0)" : "translateY(12px)",
        transition: "all 0.6s ease",
        textAlign: "center",
      }}>
        <div style={{
          fontFamily: T.fontMono,
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: T.devotedGold,
          marginBottom: 14,
        }}>DEVOTED</div>

        <h1 style={{
          fontFamily: T.fontDisplay,
          fontWeight: 300,
          fontStyle: "italic",
          fontSize: 26,
          lineHeight: 1.35,
          color: T.ink,
          margin: 0,
        }}>
          Good.
          <br />Now I can really work.
        </h1>
      </div>

      <div style={{ height: 20 }} />

      <div style={{
        opacity: phase >= 2 ? 1 : 0,
        transform: phase >= 2 ? "translateY(0)" : "translateY(12px)",
        transition: "all 0.6s ease",
        textAlign: "center",
      }}>
        <p style={{
          fontFamily: T.fontBody,
          fontSize: 13,
          lineHeight: 1.65,
          color: T.inkSoft,
          margin: "0 auto",
          maxWidth: 260,
        }}>
          Your limits just opened. Same matchmaker, same standards — I just have more room to move.
        </p>
      </div>

      <div style={{ flex: 1, minHeight: 36 }} />

      <div style={{
        opacity: phase >= 3 ? 1 : 0,
        transition: "opacity 0.6s ease",
        width: "100%",
        maxWidth: 300,
        margin: "0 auto",
      }}>
        <CTAButton devoted onClick={onContinue}>Continue</CTAButton>
      </div>
    </div>
  );
}

// ─── Shared Styles ───────────────────────────────────────────
const screenBase = {
  width: "100%",
  height: "100%",
  background: T.bg,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  position: "relative",
  overflowY: "auto",
};

const headline = {
  fontFamily: T.fontDisplay,
  fontWeight: 300,
  fontStyle: "italic",
  fontSize: 25,
  lineHeight: 1.32,
  color: T.ink,
  margin: 0,
};

const body = {
  fontFamily: T.fontBody,
  fontSize: 13.5,
  lineHeight: 1.65,
  color: T.inkSoft,
  margin: "0 auto",
  maxWidth: 280,
};

const ctaStack = {
  width: "100%",
  maxWidth: 300,
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

// ─── Screen Nav Tabs ─────────────────────────────────────────
const SCREENS = [
  "Discover Limit",
  "Drawn to You",
  "Chat Cap",
  "Queue Expired",
  "Subscribe",
  "Confirmed",
];

function ScreenNav({ active, onSelect }) {
  return (
    <div style={{
      display: "flex",
      gap: 4,
      padding: "10px 12px",
      overflowX: "auto",
      WebkitOverflowScrolling: "touch",
      background: T.bgSoft,
      borderBottom: `1px solid ${T.border}`,
    }}>
      {SCREENS.map((s, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          style={{
            padding: "7px 14px",
            borderRadius: 20,
            border: active === i ? "none" : `1px solid ${T.border}`,
            background: active === i ? T.devotedGold : "transparent",
            color: active === i ? "#FFFDF8" : T.inkSoft,
            fontFamily: T.fontMono,
            fontSize: 10,
            letterSpacing: "0.04em",
            whiteSpace: "nowrap",
            cursor: "pointer",
            fontWeight: active === i ? 700 : 400,
            transition: "all 0.2s ease",
          }}
        >{s}</button>
      ))}
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────
export default function DevotedFlow() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [entryContext, setEntryContext] = useState(null);

  const goToSubscribe = (ctx) => {
    setEntryContext(ctx);
    setActiveScreen(4);
  };

  return (
    <div style={{
      width: "100%",
      maxWidth: 390,
      height: "100dvh",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      background: T.bgSoft,
      overflow: "hidden",
      fontFamily: T.fontBody,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300;1,9..144,400&family=DM+Sans:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');

        @keyframes orbBreathe {
          0%, 100% { transform: scale(1); opacity: 0.92; }
          50% { transform: scale(1.06); opacity: 1; }
        }
        @keyframes orbPulse {
          0% { transform: scale(0.9); opacity: 0.35; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        * { box-sizing: border-box; -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Title bar */}
      <div style={{ padding: "14px 16px 4px", background: T.bgSoft }}>
        <div style={{
          fontFamily: T.fontMono,
          fontSize: 9,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: T.devotedGold,
        }}>DEVOTED FLOW · WIREFRAME</div>
        <div style={{
          fontFamily: T.fontBody,
          fontSize: 11,
          color: T.inkGhost,
          marginTop: 3,
        }}>Tap entry points → Subscribe → Confirmed</div>
      </div>

      <ScreenNav active={activeScreen} onSelect={setActiveScreen} />

      {/* Phone frame */}
      <div style={{
        flex: 1,
        margin: "12px 16px 16px",
        borderRadius: 32,
        overflow: "hidden",
        border: `1.5px solid ${T.borderStrong}`,
        background: T.bg,
        position: "relative",
      }}>
        {activeScreen === 0 && (
          <DiscoverActionLimit
            onUpgrade={() => goToSubscribe("discover")}
            onDismiss={() => {}}
          />
        )}
        {activeScreen === 1 && (
          <DrawnToYouPaywall
            onUpgrade={() => goToSubscribe("drawn")}
            onDismiss={() => {}}
          />
        )}
        {activeScreen === 2 && (
          <ChatCapPrompt
            onUpgrade={() => goToSubscribe("chat")}
            onDismiss={() => {}}
          />
        )}
        {activeScreen === 3 && (
          <QueueExpiration
            onUpgrade={() => goToSubscribe("queue")}
            onDismiss={() => {}}
          />
        )}
        {activeScreen === 4 && (
          <DevotedSubscription
            onSubscribe={() => setActiveScreen(5)}
            onBack={() => setActiveScreen(
              entryContext === "discover" ? 0
              : entryContext === "drawn" ? 1
              : entryContext === "chat" ? 2
              : 3
            )}
          />
        )}
        {activeScreen === 5 && (
          <DevotedConfirmation onContinue={() => setActiveScreen(0)} />
        )}
      </div>
    </div>
  );
}
