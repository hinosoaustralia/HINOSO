import type { Metadata, Viewport } from "next";
import { Bodoni_Moda } from "next/font/google";
import "./globals.css";

import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ThemeColorSync from "@/components/ui/ThemeColorSync";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Bodoni Moda — an elegant, high-contrast serif, exposed as a CSS variable.
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bodoni",
  weight: ["400", "500", "600", "700", "800"],
});

const SITE_URL = "https://hinoso.com";

// ---- SEO ---------------------------------------------------------------
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "HINOSO — Recovery. Made Simple.",
    template: "%s — HINOSO",
  },
  description:
    "HINOSO is a wearable recovery system designed for everyday movement. Wireless heat, EMS and TENS in one modular ecosystem. Join the waitlist.",
  keywords: [
    "HINOSO",
    "wearable recovery",
    "EMS",
    "TENS",
    "wireless heat therapy",
    "muscle recovery",
    "recovery wearable",
    "modular recovery system",
  ],
  authors: [{ name: "HINOSO" }],
  creator: "HINOSO",
  applicationName: "HINOSO",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "HINOSO — Recovery. Made Simple.",
    description:
      "A wearable recovery system designed for everyday movement. Wireless heat, EMS and TENS in one modular ecosystem.",
    siteName: "HINOSO",
  },
  twitter: {
    card: "summary_large_image",
    title: "HINOSO — Recovery. Made Simple.",
    description:
      "A wearable recovery system designed for everyday movement. Join the waitlist.",
  },
  robots: { index: true, follow: true },
  category: "technology",
};

export const viewport: Viewport = {
  // Start dark to match the hero on first paint; ThemeColorSync updates it on
  // scroll so the mobile browser bars always match the section on screen.
  themeColor: "#0C0C0B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={bodoni.variable}>
      <body className="bg-bone text-charcoal antialiased selection:bg-sage/30">
        {/* Keeps the mobile browser bars matching the section on screen. */}
        <ThemeColorSync />

        {/* First-load cinematic curtain with the HINOSO wordmark. */}
        <LoadingScreen />

        {/* Lenis smooth scrolling + GSAP ScrollTrigger sync. */}
        <SmoothScrollProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScrollProvider>

        {/* Subtle film grain over everything for a crafted, premium feel. */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[35] opacity-[0.045] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </body>
    </html>
  );
}
