"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";

const DEVICE_GAP_PX = 16;

/**
 * The three phone mockups. Native horizontal scroll-snap rather than a JS
 * carousel — the dots just follow scrollLeft.
 */
export function Peek() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let ticking = false;
    let last = 0;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const device = el.querySelector<HTMLElement>(".device");
        if (device) {
          const width = device.offsetWidth + DEVICE_GAP_PX;
          const idx = Math.max(0, Math.min(Math.round(el.scrollLeft / width), 2));
          setIndex(idx);
          if (idx !== last) {
            last = idx;
            track("carousel_swipe", { idx });
          }
        }
        ticking = false;
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="peek">
      <h2 className="peek-h rv" data-sec="preview">
        A glimpse of what it feels like.
      </h2>
      <p className="peek-sub rv">
        This is what it looks like when someone finds the right person for you.
      </p>

      <div className="phone-track rv" ref={trackRef}>
        <div className="device">
          <div className="island" />
          <div className="screen">
            <div className="ph-orb">
              <div className="ph-orb-glow" />
              <div className="ph-orb-core" />
            </div>
            <p className="ph-title">I found someone.</p>
            <p className="ph-sub">Someone I think you need to meet.</p>
            <div className="ph-bars">
              <div className="ph-bar b1" />
              <div className="ph-bar b2" />
              <div className="ph-bar b3" />
              <div className="ph-bar b4" />
            </div>
          </div>
        </div>

        <div className="device">
          <div className="island" />
          <div className="screen">
            <p className="ph-label">Why you two</p>
            <p className="ph-insight">
              <strong>
                When things get tense, you both pull back instead of pushing.
              </strong>{" "}
              Then you come back. I matched you on that before anything else.
            </p>
            <div className="ph-redact">
              <div className="rl rl1" />
              <div className="rl rl2" />
              <div className="rl rl3" />
              <div className="rl rl4" />
              <div className="rl rl5" />
            </div>
          </div>
        </div>

        <div className="device">
          <div className="island" />
          <div className="screen">
            <div className="ph-lock">
              <div className="ph-lock-icon" />
            </div>
            <p className="ph-more-title">There&apos;s more.</p>
            <p className="ph-more-sub">
              A lot more. This is just the beginning of how Maren introduces you.
            </p>
            <div className="ph-more-bars">
              <div className="ph-bar b1" />
              <div className="ph-bar b2" />
              <div className="ph-bar b3" />
              <div className="ph-bar b4" />
            </div>
          </div>
        </div>
      </div>

      <div className="peek-dots">
        {[0, 1, 2].map((i) => (
          <div key={i} className={i === index ? "dot active" : "dot"} />
        ))}
      </div>

      <p className="peek-caption rv">
        <strong>This is what your first match looks like.</strong> Join the list to see who
        it is.
      </p>
    </section>
  );
}
