"use client";

import { MIN_SHOW, useWaitlist } from "@/components/WaitlistProvider";
import type { CSSProperties } from "react";

/**
 * The waitlist counter and progress bar. Hidden entirely until the number is
 * worth showing — on day one the hero is just the form, and nothing is seeded.
 */
export function ScarcityBar({
  capLabel,
  style,
}: {
  capLabel: string;
  style?: CSSProperties;
}) {
  const { stats, barPct } = useWaitlist();
  const total = stats?.total ?? 0;
  const visible = total >= MIN_SHOW;

  return (
    <div className="scarcity" style={style} hidden={!visible}>
      <div className="scarcity-label">
        <span className="scarcity-count">
          <strong>{visible ? total.toLocaleString() : "—"}</strong> on the waitlist
        </span>
        <span className="scarcity-cap">{capLabel}</span>
      </div>
      <div className="bar-track">
        <div className="bar-fill" style={{ width: barPct + "%" }} />
      </div>
    </div>
  );
}

/**
 * "Filling 2.4× faster than last week" — shown only when the prior week had
 * signups and this week genuinely beats it by 20% or more.
 */
export function VelocityBadge() {
  const { stats } = useWaitlist();
  const week = stats?.week ?? 0;
  const prev = stats?.prev_week ?? 0;
  const ratio = prev > 0 ? week / prev : 0;

  if (ratio < 1.2) return null;

  return (
    <div className="velocity-badge">
      <span className="velocity-dot" />
      <span>Filling {Math.round(ratio * 10) / 10}× faster than last week</span>
    </div>
  );
}
