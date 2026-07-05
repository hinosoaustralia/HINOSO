import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Introducing from "@/components/sections/Introducing";
import Movement from "@/components/sections/Movement";
import Waitlist from "@/components/sections/Waitlist";

// Rich result / SEO structured data.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "HINOSO",
  description:
    "A wearable recovery system designed for everyday movement. Wireless heat, EMS and TENS in one pod, with reusable gel pads and no wires.",
  brand: { "@type": "Brand", name: "HINOSO" },
  category: "Wearable recovery device",
  slogan: "Recovery. Made Simple.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/PreOrder",
    priceCurrency: "USD",
  },
};

/**
 * HINOSO landing page — a single cinematic scroll that reveals the product
 * section by section, from darkness to daylight, and guides the visitor to the
 * waitlist.
 */
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />
      <Problem />
      <Introducing />
      <Movement />
      <Waitlist />
    </>
  );
}
