import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Waves, Anchor, Fish, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Responsible Sailing",
  description:
    "Sail Marker's commitment to responsible sailing — marine conservation, reef protection, responsible anchoring, and supporting local communities.",
  alternates: { canonical: "https://www.sailmarker.com/responsible-sailing" },
};

const principles = [
  {
    icon: Waves,
    title: "Marine Conservation",
    content:
      "The oceans are not infinite. Charter sailing gives us privileged access to some of the most pristine marine environments on earth — crystal-clear waters, thriving coral reefs, remote anchorages untouched by mass tourism. That privilege comes with responsibility. We advocate for marine protected areas, sustainable fishing practices, and zero-discharge policies. Every guide we write includes information on local marine conservation efforts and how charterers can support them.",
  },
  {
    icon: Anchor,
    title: "Responsible Anchoring",
    content:
      "A single careless anchor drop can destroy decades of coral growth. We provide detailed anchoring guidance for every destination — where to anchor on sand, where mooring buoys are available, and where anchoring is prohibited to protect seagrass meadows and reef systems. When possible, we recommend marinas and mooring fields over anchoring, and we highlight destinations that have invested in mooring infrastructure.",
  },
  {
    icon: Fish,
    title: "Reef & Habitat Protection",
    content:
      "Coral reefs, seagrass beds, and mangrove forests are the foundations of the marine ecosystems that make charter sailing extraordinary. We encourage charterers to maintain safe distances from reef systems, avoid standing on or touching coral, use reef-safe sunscreen, and dispose of waste responsibly. Our destination guides include information on local regulations, no-take zones, and seasonal restrictions designed to protect marine habitats.",
  },
  {
    icon: Heart,
    title: "Local Communities",
    content:
      "The best sailing destinations are defined as much by their people as by their waters. We believe charter tourism should benefit local communities — through patronage of local restaurants, markets, and services; through respectful engagement with local culture; and through fair economic exchange. Our guides direct sailors to locally-owned businesses, highlight cultural sensitivities, and encourage meaningful connection with the places we visit.",
  },
];

export default function ResponsibleSailingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-navy-700">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Responsible Sailing
            </h1>
            <p className="mt-4 text-lg text-sky-300 max-w-2xl mx-auto leading-relaxed">
              Protecting the waters, coastlines, and communities that make charter sailing extraordinary.
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-lg text-navy-600 leading-relaxed">
            At Sail Marker, we believe that the future of charter sailing depends on how we treat the environments we sail through today. Every cruising ground we cover — from the Aegean to the Grenadines, from the Seychelles to Patagonia — exists in a delicate balance. Our editorial approach integrates responsible sailing principles into every guide, every destination profile, and every piece of advice we publish.
          </p>
        </section>

        {/* Principles */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="space-y-8">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="bg-white rounded-2xl border border-navy-100 p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-navy-700 flex items-center justify-center flex-shrink-0">
                    <principle.icon className="w-6 h-6 text-sky-300" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-navy-900 mb-3">
                      {principle.title}
                    </h2>
                    <p className="text-navy-600 leading-relaxed">{principle.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white border-t border-navy-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
              Sail thoughtfully
            </h2>
            <p className="text-navy-600 mb-6 leading-relaxed">
              Every charter is an opportunity to leave the waters better than you found them. Explore our destination guides for location-specific responsible sailing advice.
            </p>
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy-700 text-white font-medium rounded-lg hover:bg-navy-800 transition-colors"
            >
              Explore Destinations
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
