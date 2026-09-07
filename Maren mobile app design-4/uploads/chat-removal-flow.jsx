import { useState, useEffect } from "react";

const COLORS = {
  cream: "#FAF7F2",
  warmWhite: "#F5F0E8",
  sand: "#E8E0D4",
  stone: "#C4B8A8",
  warmGray: "#8A7E72",
  charcoal: "#3D3530",
  espresso: "#2A2320",
  ember: "#C4744A",
  emberSoft: "rgba(196, 116, 74, 0.12)",
  emberGlow: "rgba(196, 116, 74, 0.06)",
  dangerSoft: "rgba(180, 60, 50, 0.08)",
  dangerText: "#9B4040",
  overlay: "rgba(42, 35, 32, 0.5)",
};

const FEEDBACK_OPTIONS = [
  { id: "conversation", label: "The conversation didn't flow" },
  { id: "values", label: "We seemed to want different things" },
  { id: "energy", label: "The energy felt off between us" },
  { id: "lifestyle", label: "Not enough in common day-to-day" },
  { id: "skip", label: "I'd rather not say" },
];

function MatchmakerOrb({ size = 32, style = {} }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `radial-gradient(circle at 40% 38%, ${COLORS.ember}, ${COLORS.charcoal})`,
      boxShadow: `0 0 ${size * 0.6}px ${COLORS.emberSoft}`,
      animation: "orbBreathe 3.5s ease-in-out infinite",
      flexShrink: 0, ...style,
    }} />
  );
}

function FeedbackChip({ label, selected, onSelect }) {
  return (
    <button onClick={onSelect} style={{
      width: "100%", padding: "14px 18px", borderRadius: 14,
      border: `1.5px solid ${selected ? COLORS.ember : COLORS.sand}`,
      background: selected ? COLORS.emberSoft : COLORS.cream,
      color: selected ? COLORS.ember : COLORS.charcoal,
      fontFamily: "'DM Sans', sans-serif", fontSize: 15,
      fontWeight: selected ? 500 : 400, textAlign: "left",
      cursor: "pointer", transition: "all 0.2s ease",
      outline: "none", lineHeight: 1.35,
    }}>
      {label}
    </button>
  );
}

function ConfirmStep({ onConfirm, onCancel, entering }) {
  return (
    <div style={{
      opacity: entering ? 1 : 0,
      transform: entering ? "translateY(0)" : "translateY(12px)",
      transition: "all 0.35s ease",
      display: "flex", flexDirection: "column", gap: 20,
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <MatchmakerOrb size={30} style={{ marginTop: 2 }} />
        <p style={{
          fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 400,
          color: COLORS.charcoal, lineHeight: 1.5, margin: 0, fontStyle: "italic",
        }}>
          Are you sure you'd like to close this connection?
        </p>
      </div>
      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 13.5,
        color: COLORS.warmGray, lineHeight: 1.55, margin: 0, paddingLeft: 42,
      }}>
        This will end your chat and remove them from your matches. This can't be undone.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 4 }}>
        <button onClick={onConfirm} style={{
          width: "100%", padding: "14px 0", borderRadius: 14, border: "none",
          background: COLORS.dangerSoft, color: COLORS.dangerText,
          fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 500,
          cursor: "pointer", transition: "all 0.2s ease",
        }}>End this match</button>
        <button onClick={onCancel} style={{
          width: "100%", padding: "14px 0", borderRadius: 14, border: "none",
          background: "transparent", color: COLORS.warmGray,
          fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 400,
          cursor: "pointer",
        }}>Go back</button>
      </div>
    </div>
  );
}

function FeedbackStep({ onSubmit, onSkip, entering }) {
  const [selected, setSelected] = useState(null);
  return (
    <div style={{
      opacity: entering ? 1 : 0,
      transform: entering ? "translateY(0)" : "translateY(12px)",
      transition: "all 0.35s ease",
      display: "flex", flexDirection: "column", gap: 16,
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <MatchmakerOrb size={30} style={{ marginTop: 2 }} />
        <p style={{
          fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 400,
          color: COLORS.charcoal, lineHeight: 1.5, margin: 0, fontStyle: "italic",
        }}>What didn't feel right?</p>
      </div>
      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 13,
        color: COLORS.stone, lineHeight: 1.5, margin: 0,
        paddingLeft: 42, letterSpacing: 0.1,
      }}>
        This stays between us — it only helps me learn your preferences.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {FEEDBACK_OPTIONS.map((opt) => (
          <FeedbackChip key={opt.id} label={opt.label}
            selected={selected === opt.id}
            onSelect={() => setSelected(opt.id)} />
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 4 }}>
        <button onClick={() => onSubmit(selected)} disabled={!selected} style={{
          width: "100%", padding: "14px 0", borderRadius: 14, border: "none",
          background: selected ? COLORS.charcoal : COLORS.sand,
          color: selected ? COLORS.cream : COLORS.stone,
          fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 500,
          cursor: selected ? "pointer" : "default", transition: "all 0.25s ease",
        }}>Done</button>
        <button onClick={onSkip} style={{
          width: "100%", padding: "12px 0", borderRadius: 14, border: "none",
          background: "transparent", color: COLORS.warmGray,
          fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 400,
          cursor: "pointer",
        }}>Skip</button>
      </div>
      <button style={{
        background: "none", border: "none", padding: "4px 0 0",
        fontFamily: "'DM Sans', sans-serif", fontSize: 12.5,
        color: COLORS.stone, cursor: "pointer",
        textDecoration: "underline",
        textDecorationColor: "rgba(196, 184, 168, 0.5)",
        textUnderlineOffset: 3, textAlign: "center", opacity: 0.8,
      }} onClick={() => alert("Opens dedicated safety/report flow")}>
        Report a concern instead
      </button>
    </div>
  );
}

function ClosureStep({ entering }) {
  return (
    <div style={{
      opacity: entering ? 1 : 0,
      transform: entering ? "translateY(0)" : "translateY(8px)",
      transition: "all 0.4s ease",
      display: "flex", flexDirection: "column", alignItems: "center",
      gap: 16, padding: "12px 0 4px",
    }}>
      <MatchmakerOrb size={36} />
      <p style={{
        fontFamily: "'Fraunces', serif", fontSize: 17, fontWeight: 400,
        color: COLORS.charcoal, lineHeight: 1.55, margin: 0,
        textAlign: "center", fontStyle: "italic", maxWidth: 240,
      }}>Noted. I'll keep this in mind for your next match.</p>
    </div>
  );
}

export default function ChatRemovalFlow() {
  const [showSheet, setShowSheet] = useState(false);
  const [step, setStep] = useState(0);
  const [entering, setEntering] = useState(false);
  const [chatVisible, setChatVisible] = useState(true);

  useEffect(() => {
    if (showSheet) requestAnimationFrame(() => setEntering(true));
  }, [showSheet]);

  const transitionTo = (nextStep) => {
    setEntering(false);
    setTimeout(() => {
      setStep(nextStep);
      requestAnimationFrame(() => setEntering(true));
    }, 300);
  };

  const openSheet = () => { setStep(0); setShowSheet(true); };

  const closeSheet = () => {
    setEntering(false);
    setTimeout(() => { setShowSheet(false); setStep(0); }, 300);
  };

  const handleFeedbackSubmit = (selection) => {
    console.log("Feedback:", selection);
    transitionTo(2);
    setTimeout(() => setChatVisible(false), 2200);
  };

  const handleSkip = () => {
    transitionTo(2);
    setTimeout(() => setChatVisible(false), 2200);
  };

  const reset = () => {
    setChatVisible(true);
    setShowSheet(false);
    setStep(0);
    setEntering(false);
  };

  return (
    <div style={{
      width: "100%", maxWidth: 390, height: 780, margin: "0 auto",
      background: COLORS.cream, borderRadius: 40, overflow: "hidden",
      position: "relative", fontFamily: "'DM Sans', sans-serif",
      boxShadow: "0 8px 40px rgba(42,35,32,0.12)",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes orbBreathe {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.08); opacity: 1; }
        }
        @keyframes emptyIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Chat screen */}
      <div style={{
        opacity: chatVisible ? 1 : 0,
        transition: "opacity 0.5s ease",
        height: "100%", display: "flex", flexDirection: "column",
      }}>
        {/* Header */}
        <div style={{
          padding: "56px 20px 16px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderBottom: `1px solid ${COLORS.sand}`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: `linear-gradient(135deg, ${COLORS.sand}, ${COLORS.stone})`,
            }} />
            <div>
              <div style={{ fontSize: 16, fontWeight: 500, color: COLORS.charcoal }}>Jordan</div>
              <div style={{ fontSize: 12, color: COLORS.stone }}>Matched 3 days ago</div>
            </div>
          </div>
          <button onClick={openSheet} style={{
            background: "none", border: "none", padding: 8, cursor: "pointer",
            fontSize: 20, color: COLORS.warmGray, letterSpacing: 2,
          }}>•••</button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, padding: "24px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <div style={{
              background: COLORS.warmWhite, borderRadius: "18px 18px 18px 4px",
              padding: "12px 16px", maxWidth: "72%", fontSize: 14.5,
              color: COLORS.charcoal, lineHeight: 1.45,
            }}>Hey! I saw you're into hiking too — have you done any trails around Charlotte?</div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
            <div style={{
              background: COLORS.charcoal, borderRadius: "18px 18px 4px 18px",
              padding: "12px 16px", maxWidth: "72%", fontSize: 14.5,
              color: COLORS.cream, lineHeight: 1.45,
            }}>Yeah! Crowders Mountain is my go-to. The views at the top are worth the climb.</div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <div style={{
              background: COLORS.warmWhite, borderRadius: "18px 18px 18px 4px",
              padding: "12px 16px", maxWidth: "72%", fontSize: 14.5,
              color: COLORS.charcoal, lineHeight: 1.45,
            }}>Nice, I've been meaning to check that one out</div>
          </div>
        </div>

        {/* Input bar */}
        <div style={{ padding: "12px 20px 36px", borderTop: `1px solid ${COLORS.sand}` }}>
          <div style={{
            background: COLORS.warmWhite, borderRadius: 24,
            padding: "12px 18px", fontSize: 14, color: COLORS.stone,
          }}>Type a message…</div>
        </div>
      </div>

      {/* Post-removal empty state */}
      {!chatVisible && (
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 16, padding: 40,
          animation: "emptyIn 0.8s ease 0.2s forwards",
          opacity: 0,
        }}>
          <MatchmakerOrb size={28} />
          <p style={{
            fontFamily: "'Fraunces', serif", fontSize: 15, fontStyle: "italic",
            color: COLORS.warmGray, textAlign: "center", lineHeight: 1.5, margin: 0,
          }}>This chapter is closed.</p>
          <button onClick={reset} style={{
            marginTop: 20, padding: "10px 24px", borderRadius: 12,
            border: `1px solid ${COLORS.sand}`, background: "transparent",
            color: COLORS.warmGray, fontFamily: "'DM Sans', sans-serif",
            fontSize: 13, cursor: "pointer",
          }}>Reset demo</button>
        </div>
      )}

      {/* Bottom sheet */}
      {showSheet && (
        <div style={{
          position: "absolute", inset: 0,
          background: entering ? COLORS.overlay : "transparent",
          transition: "background 0.3s ease",
          display: "flex", alignItems: "flex-end", zIndex: 10,
        }} onClick={(e) => {
          if (e.target === e.currentTarget && step === 0) closeSheet();
        }}>
          <div style={{
            width: "100%", background: COLORS.cream,
            borderRadius: "24px 24px 0 0", padding: "28px 24px 40px",
            transform: entering ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
            boxShadow: "0 -4px 30px rgba(42,35,32,0.1)",
          }}>
            <div style={{
              width: 36, height: 4, borderRadius: 2,
              background: COLORS.sand, margin: "0 auto 24px",
            }} />
            {step === 0 && <ConfirmStep onConfirm={() => transitionTo(1)} onCancel={closeSheet} entering={entering} />}
            {step === 1 && <FeedbackStep onSubmit={handleFeedbackSubmit} onSkip={handleSkip} entering={entering} />}
            {step === 2 && <ClosureStep entering={entering} />}
          </div>
        </div>
      )}
    </div>
  );
}
