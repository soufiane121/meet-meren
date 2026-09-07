"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

const SCROLL_MILESTONES = [25, 50, 75, 100];

/**
 * Two things the page needs but no single component owns:
 *
 *   - `.rv` reveal-on-scroll, which also emits `section_view` for any element
 *     carrying `data-sec`. This is the only way to see which parts of the page
 *     people actually reach.
 *   - scroll-depth milestones.
 *
 * Both work by querying the DOM once on mount rather than threading a ref
 * through every static section, which keeps those sections server-rendered.
 */
export function PageInstrumentation() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".rv"));

    const reveal = (el: HTMLElement) => {
      el.classList.add("v");
      const name = el.getAttribute("data-sec");
      if (name) track("section_view", { name });
    };

    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            reveal(entry.target as HTMLElement);
            observer?.unobserve(entry.target);
          }
        },
        { threshold: 0.1 },
      );
      nodes.forEach((n) => observer?.observe(n));
    } else {
      // No observer means no reveal animation, but the content must still show.
      nodes.forEach((n) => n.classList.add("v"));
    }

    return () => observer?.disconnect();
  }, []);

  useEffect(() => {
    const sent = new Set<number>();
    let ticking = false;

    const measure = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = ((window.scrollY || doc.scrollTop) / scrollable) * 100;
      for (const milestone of SCROLL_MILESTONES) {
        if (pct >= milestone && !sent.has(milestone)) {
          sent.add(milestone);
          track("scroll_depth", { pct: milestone });
        }
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        measure();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
