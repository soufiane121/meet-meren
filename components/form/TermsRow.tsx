"use client";

import { forwardRef, type CSSProperties } from "react";
import { useWaitlist } from "@/components/WaitlistProvider";

type Props = {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  style?: CSSProperties;
};

/**
 * The consent checkbox. The "Terms of Use" trigger sits inside the <label> so
 * the whole sentence stays one flex child — `.terms-row` has a 0.5rem gap that
 * would otherwise cut the sentence into pieces. preventDefault stops the label
 * from also toggling the checkbox when the trigger itself is clicked.
 */
export const TermsRow = forwardRef<HTMLDivElement, Props>(function TermsRow(
  { id, checked, onChange, style },
  ref,
) {
  const { openTerms } = useWaitlist();

  return (
    <div className="terms-row" ref={ref} style={style}>
      <input
        type="checkbox"
        id={id}
        className="terms-cb"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-label="Agree to Terms of Use"
      />
      <label className="terms-label" htmlFor={id}>
        I agree to the{" "}
        <button
          type="button"
          className="terms-link"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openTerms();
          }}
        >
          Terms of Use
        </button>{" "}
        and understand that Maren will contact me about the product.
      </label>
    </div>
  );
});
