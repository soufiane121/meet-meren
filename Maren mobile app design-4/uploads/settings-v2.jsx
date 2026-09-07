import { useState, useEffect } from "react";

const T = {
  bg: { cream: "#FDFBF8", surface: "#F5F0EA", input: "#FFFFFF" },
  text: { dark: "#1A1210", body: "#3D3028", sec: "rgba(26,18,16,0.55)", muted: "rgba(26,18,16,0.28)", mm: "#6B4D35" },
  accent: { warm: "#C4956A", ember: "#E8A87C", border: "rgba(196,149,106,0.25)", glow: "rgba(196,149,106,0.1)", red: "#C4645A" },
  font: { mm: "'Fraunces', serif", body: "'DM Sans', sans-serif", label: "'Space Mono', monospace" },
};

const Orb = ({ size = 14 }) => {
  const [p, setP] = useState(0);
  useEffect(() => { const id = setInterval(() => setP(v => v + 0.02), 16); return () => clearInterval(id); }, []);
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", flexShrink: 0, background: `radial-gradient(circle at 35% 35%, ${T.accent.ember} 0%, ${T.accent.warm} 50%, #8B6B4A 100%)`, transform: `scale(${1 + Math.sin(p * 0.8) * 0.05})` }} />
  );
};

const Toggle = ({ on, onToggle }) => (
  <div onClick={onToggle} style={{
    width: 44, height: 26, borderRadius: 13, cursor: "pointer",
    background: on ? T.accent.warm : "rgba(26,18,16,0.12)",
    padding: 3, transition: "background 0.2s", flexShrink: 0,
  }}>
    <div style={{
      width: 20, height: 20, borderRadius: "50%", background: "#FFF",
      transform: `translateX(${on ? 18 : 0}px)`, transition: "transform 0.2s",
      boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
    }} />
  </div>
);

const BackHeader = ({ title, onBack }) => (
  <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, borderBottom: `1px solid rgba(26,18,16,0.06)` }}>
    <div onClick={onBack} style={{ cursor: "pointer", padding: 4 }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.text.sec} strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
    </div>
    <span style={{ fontFamily: T.font.mm, fontSize: 18, color: T.text.dark, fontWeight: 300 }}>{title}</span>
  </div>
);

const NavRow = ({ icon, label, value, danger, sub, onTap }) => (
  <div onClick={onTap} style={{
    display: "flex", alignItems: "center", gap: 14,
    padding: "16px 0", borderBottom: `1px solid rgba(26,18,16,0.04)`,
    cursor: onTap ? "pointer" : "default",
  }}>
    {icon && <div style={{ width: 20, display: "flex", justifyContent: "center", flexShrink: 0 }}>{icon}</div>}
    <div style={{ flex: 1 }}>
      <span style={{ fontFamily: T.font.body, fontSize: 15, color: danger ? T.accent.red : T.text.dark }}>{label}</span>
      {sub && <span style={{ fontFamily: T.font.body, fontSize: 12, color: T.text.muted, display: "block", marginTop: 2 }}>{sub}</span>}
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
      {value && <span style={{ fontFamily: T.font.body, fontSize: 13, color: T.text.sec }}>{value}</span>}
      {onTap && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={danger ? T.accent.red + "55" : T.text.muted} strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>}
    </div>
  </div>
);

const ToggleRow = ({ label, sub, on, onToggle }) => (
  <div style={{
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "15px 0", borderBottom: `1px solid rgba(26,18,16,0.04)`,
  }}>
    <div style={{ flex: 1, marginRight: 12 }}>
      <span style={{ fontFamily: T.font.body, fontSize: 15, color: T.text.dark }}>{label}</span>
      {sub && <span style={{ fontFamily: T.font.body, fontSize: 12, color: T.text.muted, display: "block", marginTop: 2 }}>{sub}</span>}
    </div>
    <Toggle on={on} onToggle={onToggle} />
  </div>
);

const InfoRow = ({ label, value }) => (
  <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: `1px solid rgba(26,18,16,0.04)` }}>
    <span style={{ fontFamily: T.font.body, fontSize: 14, color: T.text.sec }}>{label}</span>
    <span style={{ fontFamily: T.font.body, fontSize: 14, color: T.text.dark }}>{value}</span>
  </div>
);

// Icon helpers
const Icon = ({ d, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={T.text.sec} strokeWidth="1.5">{typeof d === "string" ? <path d={d} /> : d}</svg>
);

// ── Sub-screens ──

const AccountScreen = ({ onBack }) => (
  <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
    <BackHeader title="Account" onBack={onBack} />
    <div style={{ padding: "0 20px", flex: 1 }}>
      <NavRow label="Name" value="Aoh" onTap={() => {}} />
      <NavRow label="Email" value="a••@••.com" onTap={() => {}} />
      <NavRow label="Phone" value="•••-••42" onTap={() => {}} />
      <NavRow label="Password" value="Change" onTap={() => {}} />
    </div>
  </div>
);

const SubscriptionScreen = ({ onBack }) => (
  <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
    <BackHeader title="Subscription" onBack={onBack} />
    <div style={{ padding: "0 20px", flex: 1 }}>
      <div style={{ margin: "16px 0", padding: "20px", borderRadius: 16, background: T.accent.glow, border: `1px solid ${T.accent.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
          <span style={{ fontFamily: T.font.mm, fontSize: 18, color: T.text.dark, fontWeight: 300 }}>Premium</span>
          <span style={{ fontFamily: T.font.label, fontSize: 9, color: T.accent.warm, letterSpacing: 0.5 }}>active</span>
        </div>
        <p style={{ fontFamily: T.font.body, fontSize: 14, color: T.text.sec, margin: "0 0 4px" }}>Renews Sep 3, 2026</p>
        <p style={{ fontFamily: T.font.body, fontSize: 13, color: T.text.muted, margin: 0 }}>$14.99/month</p>
      </div>
      <NavRow label="Manage subscription" onTap={() => {}} />
      <NavRow label="Restore purchases" onTap={() => {}} />
    </div>
  </div>
);

const NotificationsScreen = ({ onBack }) => {
  const [n, setN] = useState({ matches: true, messages: true, nudges: true, moments: true, sounds: false });
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <BackHeader title="Notifications" onBack={onBack} />
      <div style={{ padding: "0 20px", flex: 1 }}>
        <ToggleRow label="New matches" sub="When someone new is ready for you" on={n.matches} onToggle={() => setN(p => ({ ...p, matches: !p.matches }))} />
        <ToggleRow label="Messages" sub="New messages in active chats" on={n.messages} onToggle={() => setN(p => ({ ...p, messages: !p.messages }))} />
        <ToggleRow label="Gentle nudges" sub="Day 10 check-ins on quiet conversations" on={n.nudges} onToggle={() => setN(p => ({ ...p, nudges: !p.nudges }))} />
        <ToggleRow label="Matchmaker moments" sub="When your matchmaker needs your attention" on={n.moments} onToggle={() => setN(p => ({ ...p, moments: !p.moments }))} />
        <div style={{ height: 20 }} />
        <ToggleRow label="Sounds" on={n.sounds} onToggle={() => setN(p => ({ ...p, sounds: !p.sounds }))} />
      </div>
    </div>
  );
};

const PrivacyScreen = ({ onBack }) => {
  const [p, setP] = useState({ read: true, active: false });
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <BackHeader title="Privacy & data" onBack={onBack} />
      <div style={{ padding: "0 20px", flex: 1 }}>
        <ToggleRow label="Read receipts" sub="Let matches see when you've read their messages" on={p.read} onToggle={() => setP(v => ({ ...v, read: !v.read }))} />
        <ToggleRow label="Active status" sub="Show when you're online" on={p.active} onToggle={() => setP(v => ({ ...v, active: !v.active }))} />
        <div style={{ height: 12 }} />
        <NavRow label="Blocked users" value="2" onTap={() => {}} />
        <NavRow label="Download my data" onTap={() => {}} />
        <div style={{ padding: "16px 0" }}>
          <p style={{ fontFamily: T.font.mm, fontSize: 13, color: T.text.mm, fontStyle: "italic", lineHeight: 1.6, margin: 0 }}>
            Your onboarding responses are processed and encrypted. Raw text is purged after extraction. We never sell or share your data.
          </p>
        </div>
      </div>
    </div>
  );
};

const MatchmakerScreen = ({ onBack }) => (
  <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
    <BackHeader title="About your matchmaker" onBack={onBack} />
    <div style={{ padding: "0 20px", flex: 1 }}>
      <div style={{ padding: "16px 0" }}>
        <p style={{ fontFamily: T.font.mm, fontSize: 14, color: T.text.mm, fontStyle: "italic", lineHeight: 1.65, margin: 0 }}>
          Your matchmaker learns from your choices, not your conversations. It sees who you like, who you pass on, and how long your connections last — never what you say to each other.
        </p>
      </div>
      <InfoRow label="Profile version" value="v3" />
      <InfoRow label="Last updated" value="Jul 22, 2026" />
      <InfoRow label="Matches generated" value="14" />
      <InfoRow label="Mutual connections" value="5" />
      <div style={{ height: 12 }} />
      <NavRow label="How matching works" onTap={() => {}} />
      <NavRow label="What your Signal means" onTap={() => {}} />
    </div>
  </div>
);

const SupportScreen = ({ onBack }) => (
  <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
    <BackHeader title="Support" onBack={onBack} />
    <div style={{ padding: "0 20px", flex: 1 }}>
      <NavRow label="Help center" onTap={() => {}} />
      <NavRow label="Report a problem" onTap={() => {}} />
      <NavRow label="Contact us" onTap={() => {}} />
      <div style={{ height: 20 }} />
      <NavRow label="Terms of service" onTap={() => {}} />
      <NavRow label="Privacy policy" onTap={() => {}} />
      <NavRow label="Community guidelines" onTap={() => {}} />
    </div>
  </div>
);

// ── Settings Hub ──
const SettingsHub = ({ onNavigate, onBack }) => (
  <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
    <BackHeader title="Settings" onBack={onBack} />
    <div style={{ padding: "0 20px", flex: 1 }}>
      <NavRow
        icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.text.sec} strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>}
        label="Account" sub="Name, email, password"
        onTap={() => onNavigate("account")}
      />
      <NavRow
        icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.text.sec} strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>}
        label="Subscription" sub="Premium · $14.99/mo"
        onTap={() => onNavigate("subscription")}
      />
      <NavRow
        icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.text.sec} strokeWidth="1.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>}
        label="Notifications" sub="Matches, messages, nudges"
        onTap={() => onNavigate("notifications")}
      />
      <NavRow
        icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.text.sec} strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>}
        label="Privacy & data" sub="Visibility, blocked users, your data"
        onTap={() => onNavigate("privacy")}
      />
      <NavRow
        icon={<Orb size={16} />}
        label="About your matchmaker" sub="How matching works, your stats"
        onTap={() => onNavigate("matchmaker")}
      />
      <NavRow
        icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.text.sec} strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>}
        label="Support & legal" sub="Help, terms, privacy policy"
        onTap={() => onNavigate("support")}
      />

      {/* Verification badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 0", marginTop: 8, borderTop: `1px solid rgba(26,18,16,0.04)` }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5CB85C" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
        <span style={{ fontFamily: T.font.body, fontSize: 14, color: T.text.dark }}>Identity verified</span>
        <span style={{ fontFamily: T.font.label, fontSize: 9, color: T.text.muted, letterSpacing: 0.5, marginLeft: "auto" }}>aug 1</span>
      </div>

      {/* Danger zone */}
      <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid rgba(26,18,16,0.06)` }}>
        <NavRow label="Pause account" sub="Take a break without losing anything" onTap={() => {}} />
        <NavRow label="Log out" onTap={() => {}} />
        <NavRow label="Delete account" danger onTap={() => {}} />
      </div>

      <div style={{ textAlign: "center", padding: "24px 0" }}>
        <span style={{ fontFamily: T.font.label, fontSize: 9, color: T.text.muted, letterSpacing: 1 }}>v1.0.0</span>
      </div>
    </div>
  </div>
);

// ── Main App ──
export default function SettingsApp() {
  const [screen, setScreen] = useState("hub");

  const screens = {
    hub: <SettingsHub onNavigate={setScreen} onBack={() => setScreen("hub")} />,
    account: <AccountScreen onBack={() => setScreen("hub")} />,
    subscription: <SubscriptionScreen onBack={() => setScreen("hub")} />,
    notifications: <NotificationsScreen onBack={() => setScreen("hub")} />,
    privacy: <PrivacyScreen onBack={() => setScreen("hub")} />,
    matchmaker: <MatchmakerScreen onBack={() => setScreen("hub")} />,
    support: <SupportScreen onBack={() => setScreen("hub")} />,
  };

  return (
    <div style={{
      width: "100%", maxWidth: 390, height: "100vh", margin: "0 auto",
      display: "flex", flexDirection: "column", background: T.bg.cream,
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300;1,9..144,400&family=DM+Sans:wght@300;400;500&family=Space+Mono:wght@400&display=swap');
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { width: 0; }
      `}</style>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {screens[screen]}
      </div>
    </div>
  );
}
