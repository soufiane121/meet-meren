"use client";

import { Fragment, useEffect, useRef } from "react";
import { track } from "@/lib/analytics";
import { LAST_UPDATED, TERMS } from "@/lib/terms";
import { useWaitlist } from "@/components/WaitlistProvider";

/**
 * Rendered only while open. `.terms-overlay` is display:none when closed, so
 * mounting it anyway would leave focusable controls sitting in a hidden
 * subtree for keyboard and screen-reader users to trip over.
 */
export function TermsModal() {
  const { termsOpen, closeTerms, acceptTerms } = useWaitlist();
  const bodyRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const readToEnd = useRef(false);

  useEffect(() => {
    readToEnd.current = false;
    closeRef.current?.focus();
  }, []);

  const onScroll = () => {
    const el = bodyRef.current;
    if (!el || readToEnd.current) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 24) {
      readToEnd.current = true;
      track("terms_read_to_end", {});
    }
  };

  if (!termsOpen) return null;

  return (
    <div
      className="terms-overlay open"
      role="dialog"
      aria-modal="true"
      aria-label="Terms of Use"
      onClick={(e) => {
        // Backdrop only — a click inside the modal must not dismiss it.
        if (e.target === e.currentTarget) {
          track("terms_close", { via: "backdrop" });
          closeTerms();
        }
      }}
    >
      <div className="terms-modal">
        <div className="terms-header">
          <h2>Terms of Use</h2>
          <button
            ref={closeRef}
            type="button"
            className="terms-close"
            aria-label="Close"
            onClick={() => {
              track("terms_close", { via: "button" });
              closeTerms();
            }}
          >
            ✕
          </button>
        </div>

        <div className="terms-body" ref={bodyRef} onScroll={onScroll}>
          <p
            style={{ color: "var(--muted)", fontSize: "0.75rem", marginBottom: "1.25rem" }}
          >
            Last updated: {LAST_UPDATED}
          </p>

          {TERMS.map((section) => (
            <Fragment key={section.heading}>
              <h3>{section.heading}</h3>
              {section.blocks.map((block, i) =>
                block.type === "p" ? (
                  <p key={i}>{block.text}</p>
                ) : (
                  <ul key={i}>
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ),
              )}
            </Fragment>
          ))}
        </div>

        <div className="terms-footer">
          <button type="button" className="terms-accept" onClick={acceptTerms}>
            I understand
          </button>
        </div>
      </div>
    </div>
  );
}
