const QUOTES = [
  "I've been saying this for years, just pick for me. I don't want to browse, I don't want to choose from a grid. I just want someone to say 'trust me, meet this person.'",
  "The part about telling you WHY you should meet someone. That's the thing. Every app shows you a face and says good luck. This actually explains the reason.",
];

export function SocialProof() {
  return (
    <section className="social-proof rv" data-sec="social-proof">
      <p className="sp-label">What people keep telling us</p>
      <div className="sp-quotes">
        {QUOTES.map((quote, i) => (
          <div className="sp-quote" key={i}>
            <p>&ldquo;{quote}&rdquo;</p>
            <div className="sp-attr">— Waitlist member, Charlotte</div>
          </div>
        ))}
      </div>
    </section>
  );
}
