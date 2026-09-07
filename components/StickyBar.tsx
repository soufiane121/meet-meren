"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { track } from "@/lib/analytics";
import { isValidEmail } from "@/lib/validation";
import { useWaitlist } from "@/components/WaitlistProvider";

const LABEL = "Get early access";

/**
 * Slides up once the hero form has scrolled off and the bottom form is not yet
 * on screen — i.e. only during the stretch of page with no visible way to sign
 * up. Once someone has signed up it stays down for good.
 */
export function StickyBar() {
  const {
    goToStep,
    submitEmail,
    signed,
    heroFormRef,
    bottomFormRef,
    focusHeroEmail,
  } = useWaitlist();

  const [email, setEmail] = useState("");
  const [visible, setVisible] = useState(false);
  const [pending, setPending] = useState(false);
  const dismissed = useRef(false);

  useEffect(() => {
    if (signed) {
      setVisible(false);
      return;
    }

    let ticking = false;
    const check = () => {
      if (dismissed.current) return;
      const hero = heroFormRef.current;
      const bottom = bottomFormRef.current;
      if (!hero || !bottom) return;
      const heroGone = hero.getBoundingClientRect().bottom < 0;
      const bottomVisible = bottom.getBoundingClientRect().top < window.innerHeight;
      setVisible(heroGone && !bottomVisible);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        check();
        ticking = false;
      });
    };

    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [signed, heroFormRef, bottomFormRef]);

  const submit = () => {
    if (pending) return;
    const value = email.trim();

    // The sticky bar has no room for the consent checkbox, so an incomplete or
    // invalid entry is handed back to the hero form, which does.
    if (!value || !isValidEmail(value)) {
      track("email_invalid", { reason: value ? "format" : "empty", source: "sticky" });
      focusHeroEmail();
      return;
    }

    track("email_valid", { source: "sticky" });
    setPending(true);
    submitEmail({ email: value, source: "sticky" })
      .then(() => {
        setPending(false);
        goToStep(2);
        dismissed.current = true;
        setVisible(false);
        document
          .getElementById("heroSection")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      })
      .catch(() => {
        setPending(false);
        // Surface the real error where there is space to show it.
        document
          .getElementById("heroSection")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
  };

  const className = ["sticky-bar", visible && !signed && "show", signed && "hide-final"]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className} aria-hidden={!visible || signed}>
      <div className="sticky-inner">
        <input
          type="email"
          className="em-in"
          placeholder="your email"
          autoComplete="email"
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key !== "Enter") return;
            e.preventDefault();
            submit();
          }}
          tabIndex={visible && !signed ? 0 : -1}
        />
        <button
          type="button"
          className="join-btn"
          onClick={submit}
          disabled={pending}
          tabIndex={visible && !signed ? 0 : -1}
        >
          {pending ? "..." : LABEL}
        </button>
      </div>
    </div>
  );
}
