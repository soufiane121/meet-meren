"use client";

import { useReportWebVitals } from "next/web-vitals";
import { gaEvent } from "@/lib/gtag";

/**
 * Ships Core Web Vitals to GA4 as `web_vitals` events.
 *
 * These do not go to Supabase — the `analytics.events` table is a funnel, and
 * five perf samples per visitor would swamp it. GA4 handles the aggregation.
 *
 * CLS is a unitless ratio, so it is scaled by 1000 before rounding; every other
 * metric is already milliseconds.
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    gaEvent("web_vitals", {
      metric_name: metric.name,
      metric_value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      metric_rating: metric.rating,
      metric_id: metric.id,
      navigation_type: metric.navigationType,
    });
  });

  return null;
}
