"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { track } from "@/lib/analytics";
import { isValidEmail } from "@/lib/validation";
import { useWaitlist } from "@/components/WaitlistProvider";
import { stepClass } from "./stepClass";
import { FormMessage } from "./FormMessage";
import { ScarcityBar, VelocityBadge } from "./ScarcityBar";
import { TermsRow } from "./TermsRow";

const LABEL = "Get early access";

export function Step1Email({ active, animate }: { active: boolean; animate: boolean }) {
  const {
    goToStep,
    submitEmail,
    agreedHero,
    setAgreedHero,
    noteFormFocus,
    heroEmailRef,
  } = useWaitlist();

  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const termsRowRef = useRef<HTMLDivElement>(null);

  /** Restarts the CSS animation — without the reflow a second miss does nothing. */
  const shakeTerms = () => {
    const row = termsRowRef.current;
    if (!row) return;
    row.classList.remove("shake");
    void row.offsetWidth;
    row.classList.add("shake");
  };

  const submit = () => {
    if (pending) return;
    const value = email.trim();

    if (!value) {
      setError("Enter your email.");
      heroEmailRef.current?.focus();
      track("email_invalid", { reason: "empty", source: "hero" });
      return;
    }
    if (!isValidEmail(value)) {
      setError("That doesn't look right.");
      heroEmailRef.current?.focus();
      track("email_invalid", { reason: "format", source: "hero" });
      return;
    }
    if (!agreedHero) {
      shakeTerms();
      setError("Please agree to the Terms of Use.");
      track("terms_required", { source: "hero" });
      return;
    }

    setError("");
    track("email_valid", { source: "hero", has_city: !!city.trim() });
    setPending(true);
    submitEmail({ email: value, city: city.trim(), source: "hero" })
      .then(() => {
        setPending(false);
        goToStep(2);
      })
      .catch((err: Error) => {
        setPending(false);
        setError(err.message || "Something went wrong. Please try again.");
      });
  };

  const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    submit();
  };

  return (
    <div className={stepClass(active, animate)} id="step1">
      <div className="inline-btn">
        <input
          ref={heroEmailRef}
          type="email"
          className="em-in"
          placeholder="your email"
          autoComplete="email"
          aria-label="Email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          onFocus={noteFormFocus}
          onKeyDown={onEnter}
        />
        <button type="button" className="join-btn" onClick={submit} disabled={pending}>
          {pending ? "..." : LABEL}
        </button>
      </div>

      <div className="field-row" style={{ marginTop: "0.5rem" }}>
        <input
          type="text"
          className="field-in"
          placeholder="your city (optional)"
          autoComplete="address-level2"
          aria-label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onFocus={noteFormFocus}
          onBlur={() => {
            if (city.trim()) track("city_filled", { length: city.trim().length });
          }}
          onKeyDown={onEnter}
        />
      </div>

      <TermsRow
        ref={termsRowRef}
        id="termsCb1"
        checked={agreedHero}
        onChange={(v) => {
          setAgreedHero(v);
          if (v) setError("");
        }}
      />

      <FormMessage text={error} />

      <ScarcityBar capLabel="5,000 spots in Charlotte" />
      <VelocityBadge />
    </div>
  );
}
