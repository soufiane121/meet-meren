import { PageInstrumentation } from "@/components/PageInstrumentation";
import { StickyBar } from "@/components/StickyBar";
import { TermsModal } from "@/components/TermsModal";
import { WaitlistProvider } from "@/components/WaitlistProvider";
import { BottomCta } from "@/components/sections/BottomCta";
import { Explainer } from "@/components/sections/Explainer";
import { Fit } from "@/components/sections/Fit";
import { FounderNote } from "@/components/sections/FounderNote";
import { Hero } from "@/components/sections/Hero";
import { Pain } from "@/components/sections/Pain";
import { Peek } from "@/components/sections/Peek";
import { Relief } from "@/components/sections/Relief";
import { SocialProof } from "@/components/sections/SocialProof";
import { Footer, LaunchBanner, TrustBar } from "@/components/sections/TrustBar";

/**
 * Everything below is server-rendered except the pieces that genuinely need
 * state — the form, the carousel, the sticky bar and the terms modal. The copy
 * ships as HTML, which is what the crawlers and the first paint both want.
 */
export default function Page() {
  return (
    <WaitlistProvider>
      <div className="topbar en d1">
        <span className="wordmark">Maren</span>
      </div>

      <Hero />
      <Explainer />

      <FounderNote
        section="founder-top"
        style={{ paddingTop: "0.5rem" }}
        quote="I built Maren because I watched good people waste years on apps that were never designed to help them find someone. The business model was attention, not outcomes. I wanted to build the opposite."
        attribution={
          <>
            <strong>— Soufi</strong>, building Maren solo in Charlotte. Because someone
            should.
          </>
        }
      />

      <SocialProof />
      <Pain />
      <Relief />
      <Peek />
      <Fit />

      <FounderNote
        section="founder"
        quote="Outcomes over attention. That's the whole idea."
        attribution={
          <>
            <strong>— Soufi</strong>, founder · Charlotte, NC
          </>
        }
      />

      <TrustBar />
      <LaunchBanner />
      <BottomCta />
      <Footer />

      <StickyBar />
      <TermsModal />
      <PageInstrumentation />
    </WaitlistProvider>
  );
}
