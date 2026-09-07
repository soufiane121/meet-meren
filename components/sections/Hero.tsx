import { HeroForm } from "@/components/form/HeroForm";

export function Hero() {
  return (
    <section className="hero" id="heroSection">
      <div className="orb-w en d2">
        <div className="orb-g" />
        <div className="orb-c" />
      </div>

      <h1 className="hero-h en d3">
        What if you didn&apos;t have to search for the right person?
      </h1>

      <p className="hero-p en d4">
        Maren gets to know you, what you actually want, what hasn&apos;t worked, what
        you&apos;re done settling for. Then she finds one person she thinks you should
        meet, and tells you exactly why.
      </p>

      <HeroForm />
    </section>
  );
}
