"use client";

import { useState, type KeyboardEvent } from "react";
import { track } from "@/lib/analytics";
import { useWaitlist } from "@/components/WaitlistProvider";
import { stepClass } from "./stepClass";

const LABEL = "Get early access";

export function Step3Phone({ active, animate }: { active: boolean; animate: boolean }) {
  const { goToStep, patchWaitlist, session, showSuccess } = useWaitlist();
  const [phone, setPhone] = useState("");
  const [pending, setPending] = useState(false);

  const complete = (viaSkip: boolean) => {
    if (pending) return;
    const value = viaSkip ? "" : phone.trim();
    track(viaSkip ? "phone_skip" : "phone_submit", { length: value.length });

    // Step 1 creates the row. Without its token there is nothing to patch, so
    // send them back rather than pretending the signup landed.
    if (!session?.token) {
      goToStep(1);
      return;
    }

    setPending(true);
    patchWaitlist({ p_phone: value || null }).then((p) => {
      setPending(false);
      // A failed patch is not a failed signup — the row already exists.
      showSuccess(p || session, true, "hero");
    });
  };

  const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    complete(false);
  };

  return (
    <div className={stepClass(active, animate)} id="step3">
      <p className="step-label">Want a text when it&apos;s your turn?</p>
      <p className="step-sub">
        We&apos;ll send one message. No spam, no newsletters. Just &ldquo;you&apos;re in.&rdquo;
      </p>

      <div className="phone-row">
        <span className="phone-flag">🇺🇸</span>
        <input
          type="tel"
          className="phone-in"
          placeholder="(555) 000-0000"
          autoComplete="tel"
          aria-label="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onKeyDown={onEnter}
        />
      </div>
      <p className="phone-note">SMS only. We&apos;ll never share your number.</p>

      <button
        type="button"
        className="next-btn"
        onClick={() => complete(false)}
        disabled={pending}
      >
        {pending ? "..." : LABEL}
      </button>
      <button
        type="button"
        className="next-btn"
        onClick={() => complete(true)}
        disabled={pending}
        style={{
          background: "transparent",
          color: "var(--warm)",
          border: "1.5px solid var(--border)",
          marginTop: "0.5rem",
        }}
      >
        Continue with email only
      </button>
    </div>
  );
}
