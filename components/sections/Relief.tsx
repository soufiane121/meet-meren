const GONE = [
  "Swiping through strangers",
  "Writing openers that get ignored",
  "Managing five dead conversations",
  "Wondering if someone's actually serious",
  "Performing for an algorithm",
];

export function Relief() {
  return (
    <section className="relief-section rv" data-sec="relief">
      <h2 className="relief-h">Things you&apos;re never doing again.</h2>
      <div className="relief-items">
        {GONE.map((item) => (
          <div className="relief-item" key={item}>
            <span className="relief-x">✕</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
      <p className="relief-coda">
        <strong>You open Maren when she has someone for you.</strong> That&apos;s it.
      </p>
    </section>
  );
}
