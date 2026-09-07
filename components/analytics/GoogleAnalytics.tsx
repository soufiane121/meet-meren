"use client";

import Script from "next/script";
import { GA_ENABLED, GA_MEASUREMENT_ID } from "@/lib/env";

/**
 * gtag.js loader.
 *
 * Renders nothing when NEXT_PUBLIC_GA_MEASUREMENT_ID is unset or malformed, so
 * local dev and preview builds do not pollute the property. Everything else in
 * the app still calls `track()` unconditionally — `lib/gtag.ts` no-ops.
 *
 * `afterInteractive` is deliberate: GA is not worth blocking first paint for,
 * and the dataLayer shim below buffers any event fired before the script lands.
 */
export function GoogleAnalytics() {
  if (!GA_ENABLED) return null;

  return (
    <>
      <Script
        id="ga4-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            send_page_view: true,
            anonymize_ip: true,
            allow_google_signals: true,
            allow_ad_personalization_signals: true
          });
        `}
      </Script>
    </>
  );
}
