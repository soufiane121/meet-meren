"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import { useWaitlist } from "@/components/WaitlistProvider";
import { stepClass } from "./stepClass";

const CHIPS = [
  { value: "Too many bad matches", label: "Too many bad matches" },
  { value: "Conversations go nowhere", label: "Conversations go nowhere" },
  { value: "It feels like a chore", label: "Feels like a chore" },
  { value: "People aren't serious", label: "People aren't serious" },
];

const CUSTOM_MAX = 200;

export function Step2Question({ active, animate }: { active: boolean; animate: boolean }) {
  const { goToStep, patchWaitlist } = useWaitlist();
  const [selected, setSelected] = useState("");
  const [custom, setCustom] = useState("");

  const submit = () => {
    const typed = custom.trim();
    // Their own words win over the chip — a chip is a shortcut, not the answer.
    const answer = typed || selected;

    track("step_continue", {
      n: 2,
      has_custom_text: !!typed,
      answered: !!answer,
      chip: selected || undefined,
    });

    if (answer) patchWaitlist({ p_frustration: answer });
    goToStep(3);
  };

  return (
    <div className={stepClass(active, animate)} id="step2">
      <p className="step-label">One quick question.</p>
      <p className="step-sub">What&apos;s the most frustrating thing about dating apps?</p>

      <div className="q-chips">
        {CHIPS.map((chip) => (
          <button
            key={chip.value}
            type="button"
            className={selected === chip.value ? "q-chip selected" : "q-chip"}
            aria-pressed={selected === chip.value}
            onClick={() => {
              setSelected(chip.value);
              track("chip_select", { value: chip.value });
            }}
          >
            {chip.label}
          </button>
        ))}
      </div>

      <textarea
        className="q-custom"
        placeholder="Or tell us in your own words..."
        maxLength={CUSTOM_MAX}
        value={custom}
        onChange={(e) => setCustom(e.target.value)}
        onBlur={() => {
          if (custom.trim()) track("custom_answer_typed", { length: custom.trim().length });
        }}
      />

      <button type="button" className="next-btn" onClick={submit}>
        Continue
      </button>
    </div>
  );
}
