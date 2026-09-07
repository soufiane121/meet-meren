const ITEMS = [
  { icon: "✦", label: "Solo-built in Charlotte" },
  { icon: "◉", label: "AI-powered matching" },
  { icon: "♡", label: "Outcomes over attention" },
];

export function TrustBar() {
  return (
    <div className="trust-bar rv" data-sec="trust">
      {ITEMS.map((item) => (
        <span className="trust-item" key={item.label}>
          <span className="t-icon">{item.icon}</span> {item.label}
        </span>
      ))}
    </div>
  );
}

export function LaunchBanner() {
  return (
    <div className="launch-banner rv" style={{ paddingTop: "0.5rem", paddingBottom: "2rem" }}>
      <div className="lb-inner">
        <span>Charlotte beta opens Fall 2026</span>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <p className="foot-local">Built in Charlotte. This is where it starts.</p>
      <p className="foot-t">Maren · Charlotte, NC · Fall 2026</p>
    </footer>
  );
}
