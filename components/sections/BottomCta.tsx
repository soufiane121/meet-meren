"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { track } from "@/lib/analytics";
import { isValidEmail } from "@/lib/validation";
import { useWaitlist } from "@/components/WaitlistProvider";
import { FormMessage } from "@/components/form/FormMessage";
import { ScarcityBar } from "@/components/form/ScarcityBar";
import { TermsRow } from "@/components/form/TermsRow";

const LABEL = "Get early access";

export function BottomCta() {
  const {
    submitEmail,
    showSuccess,
    signed,
    agreedBottom,
    setAgreedBottom,
    noteFormFocus,
    bottomFormRef,
  } = useWaitlist();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const termsRowRef = useRef<HTMLDivElement>(null);

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
      emailRef.current?.focus();
      track("email_invalid", { reason: "empty", source: "bottom" });
      return;
    }
    if (!isValidEmail(value)) {
      setError("That doesn't look right.");
      emailRef.current?.focus();
      track("email_invalid", { reason: "format", source: "bottom" });
      return;
    }
    if (!agreedBottom) {
      shakeTerms();
      setError("Please agree to the Terms of Use.");
      track("terms_required", { source: "bottom" });
      return;
    }

    setError("");
    track("email_valid", { source: "bottom" });
    setPending(true);
    submitEmail({ email: value, source: "bottom" })
      .then((p) => {
        setPending(false);
        // The bottom form is a shortcut past steps 2 and 3 — send them to the
        // success screen at the top, which is where the referral link lives.
        showSuccess(p, true, "bottom");
        document
          .getElementById("heroSection")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      })
      .catch((err: Error) => {
        setPending(false);
        setError(err.message || "Something went wrong. Please try again.");
      });
  };

  return (
    <section className="cta-bottom rv" data-sec="cta_bottom">
      <h2 className="cta-bottom-h">The list is moving.</h2>
      <p className="cta-bottom-p">
        First 5,000 get early access. After that, there&apos;s a real line.
      </p>

      <div ref={bottomFormRef} style={signed ? { display: "none" } : undefined}>
        <div className="inline-btn">
          <input
            ref={emailRef}
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
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
              if (e.key !== "Enter") return;
              e.preventDefault();
              submit();
            }}
          />
          <button type="button" className="join-btn" onClick={submit} disabled={pending}>
            {pending ? "..." : LABEL}
          </button>
        </div>

        <TermsRow
          ref={termsRowRef}
          id="termsCb2"
          checked={agreedBottom}
          onChange={(v) => {
            setAgreedBottom(v);
            if (v) setError("");
          }}
          style={{ marginTop: "0.375rem" }}
        />

        <FormMessage text={error} />

        <ScarcityBar capLabel="5,000 spots" style={{ marginTop: "0.75rem" }} />
      </div>
    </section>
  );
}
