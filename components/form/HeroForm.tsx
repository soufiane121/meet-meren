"use client";

import { useEffect, useRef, useState } from "react";
import { useWaitlist } from "@/components/WaitlistProvider";
import { StepProgress } from "./StepProgress";
import { Step1Email } from "./Step1Email";
import { Step2Question } from "./Step2Question";
import { Step3Phone } from "./Step3Phone";
import { Step4Success } from "./Step4Success";

/**
 * The four-step hero form. All four stay mounted — `.step` only toggles
 * display, which keeps whatever the visitor typed intact if a later step sends
 * them back.
 */
export function HeroForm() {
  const { step, heroFormRef } = useWaitlist();

  // Suppress the step-in animation until the visitor actually moves, so the
  // opening view is animated once by the hero's own entrance, not twice.
  const [hasMoved, setHasMoved] = useState(false);
  const prevStep = useRef(step);
  useEffect(() => {
    if (prevStep.current !== step) {
      prevStep.current = step;
      setHasMoved(true);
    }
  }, [step]);

  return (
    <div className="form-wrap en d5" ref={heroFormRef}>
      <StepProgress />
      <Step1Email active={step === 1} animate={hasMoved} />
      <Step2Question active={step === 2} animate={hasMoved} />
      <Step3Phone active={step === 3} animate={hasMoved} />
      <Step4Success active={step === 4} animate={hasMoved} />
    </div>
  );
}
