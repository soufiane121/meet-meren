import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces, Space_Mono } from "next/font/google";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { WebVitals } from "@/components/analytics/WebVitals";
import { SITE_URL, SUPABASE_URL } from "@/lib/env";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-space-mono",
  display: "swap",
});

const DESCRIPTION =
  "You've done enough swiping. Maren gets to know you, then finds one person worth meeting — and tells you exactly why. Charlotte beta opens Fall 2026.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Maren — Meet Someone Worth Your Time & Your Energy",
  description: DESCRIPTION,
  applicationName: "Maren",
  keywords: [
    "Maren",
    "dating app",
    "Charlotte dating",
    "AI matchmaking",
    "dating waitlist",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Maren",
    title: "Maren — Meet Someone Worth Your Time | Charlotte Dating",
    description:
      "You've done enough swiping. Maren gets to know you, then finds one person worth meeting — and tells you exactly why. Charlotte beta — Fall 2026.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@meetmaren",
    title: "Maren — Meet Someone Worth Your Time | Charlotte Dating",
    description:
      "You've done enough swiping. Maren gets to know you, then finds one person worth meeting — and tells you exactly why. Charlotte beta — Fall 2026.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  colorScheme: "light",
  themeColor: "#fdfbf8",
};

const ORGANIZATION_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Maren",
  url: SITE_URL,
  description:
    "Maren gets to know you first, then introduces you to someone worth your time. AI-powered dating in Charlotte, NC.",
  foundingLocation: { "@type": "Place", name: "Charlotte, NC" },
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Maren?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Maren is an AI-powered dating app that gets to know you through conversation, then introduces you to one person at a time — with a detailed explanation of why you two might click.",
      },
    },
    {
      "@type": "Question",
      name: "How is Maren different from other dating apps?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Instead of swiping through hundreds of profiles, Maren introduces you to one person at a time, chosen with intention. She tells you exactly why she thinks you two are worth an introduction.",
      },
    },
    {
      "@type": "Question",
      name: "When does Maren launch in Charlotte?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Maren's Charlotte beta opens Fall 2026. The first 5,000 people on the waitlist get early access.",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${fraunces.variable} ${spaceMono.variable}`}
      style={{ background: "#fdfbf8" }}
    >
      <head>
        <link rel="preconnect" href={SUPABASE_URL} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }}
        />
      </head>
      <body>
        {children}
        <GoogleAnalytics />
        <WebVitals />
      </body>
    </html>
  );
}
