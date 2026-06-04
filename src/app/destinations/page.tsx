import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";
import { DestinationFilters } from "./DestinationFilters";
import { DestinationGrid } from "./DestinationGrid";
import type { CharterDestination } from "@/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "All Charter Destinations",
  description:
    "Browse the world's finest charter sailing destinations. Filter by region, season, and budget to find your perfect cruising ground.",
  alternates: { canonical: "https://www.sailmarker.com/destinations" },
};

export default async function DestinationsPage() {
  const { data: destinations } = await supabase
    .from("charter_destinations")
    .select("*")
    .eq("status", "live")
    .order("region")
    .order("name");

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-white border-b border-navy-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-navy-900 tracking-tight">
              All Charter Destinations
            </h1>
            <p className="mt-4 text-lg text-navy-500 max-w-2xl mx-auto leading-relaxed">
              From the Aegean to the Grenadines — every cruising ground worth
              chartering, curated and mapped.
            </p>
          </div>
        </section>

        {/* Filter bar + grid — client-side filtering */}
        <Suspense>
          <DestinationFilters />
          <DestinationGrid destinations={(destinations as CharterDestination[]) || []} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
