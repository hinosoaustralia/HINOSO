import type { Metadata, Viewport } from "next";
import { Bodoni_Moda } from "next/font/google";
import "./globals.css";

import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import LoadingScreen from "@/components/ui/LoadingScreen";
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F7F3" },
    { media: "(prefers-color-scheme: dark)", color: "#0C0C0B" },
  ],
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
        {/* First-load cinematic curtain with the HINOSO wordmark. */}
        <LoadingScreen />

        {/* Lenis smooth scrolling + GSAP ScrollTrigger sync. */}
        <SmoothScrollProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
