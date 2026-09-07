"use client";

import { useWaitlist } from "@/components/WaitlistProvider";

/** Three dots for three input steps. Step 4 is the payoff, not a step. */
export function StepProgress() {
  const { step } = useWaitlist();

  return (
    <div className="step-progress" style={{ display: step === 4 ? "none" : "flex" }}>
      {[1, 2, 3].map((n) => {
        let cls = "sp-dot";
        if (step === 4 || n < step) cls += " done";
        else if (n === step) cls += " current";
        return <div key={n} className={cls} />;
      })}
    </div>
  );
}
