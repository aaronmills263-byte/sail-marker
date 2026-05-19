import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Anchor, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "List Your Marina",
  description:
    "List your marina or charter base on Sail Marker. Reach sailors planning their next charter across the Mediterranean, Caribbean, and beyond.",
  alternates: { canonical: "https://www.sailmarker.com/list-your-marina" },
};

const benefits = [
  "Free directory listing for all marinas",
  "Reach sailors actively planning charters",
  "Showcase your facilities, berths, and services",
  "Link directly to your booking system",
  "Premium placement available for charter bases",
];

export default function ListYourMarinaPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-navy-700">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
            <Anchor className="w-10 h-10 text-sky-300 mx-auto mb-4" />
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
              List Your Marina
            </h1>
            <p className="mt-4 text-lg text-sky-300 max-w-2xl mx-auto leading-relaxed">
              Join Sail Marker&apos;s directory and reach sailors planning their next charter.
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Benefits */}
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold text-navy-900 mb-6">
                Why list with us
              </h2>
              <ul className="space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                    <span className="text-navy-600 text-sm leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <form
                action="/api/listing-enquiry"
                method="POST"
                className="bg-white rounded-2xl border border-navy-100 p-8 shadow-sm space-y-5"
              >
                <div>
                  <label htmlFor="marina-name" className="block text-sm font-semibold text-navy-900 mb-1.5">
                    Marina Name *
                  </label>
                  <input
                    id="marina-name"
                    name="marina_name"
                    type="text"
                    required
                    className="w-full border border-navy-200 rounded-lg px-4 py-2.5 text-navy-700 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300"
                    placeholder="e.g. ACI Marina Dubrovnik"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-semibold text-navy-900 mb-1.5">
                    Location *
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    className="w-full border border-navy-200 rounded-lg px-4 py-2.5 text-navy-700 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300"
                    placeholder="e.g. Dubrovnik, Croatia"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-semibold text-navy-900 mb-1.5">
                      Contact Name *
                    </label>
                    <input
                      id="contact-name"
                      name="contact_name"
                      type="text"
                      required
                      className="w-full border border-navy-200 rounded-lg px-4 py-2.5 text-navy-700 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-semibold text-navy-900 mb-1.5">
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      name="contact_email"
                      type="email"
                      required
                      className="w-full border border-navy-200 rounded-lg px-4 py-2.5 text-navy-700 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="facilities" className="block text-sm font-semibold text-navy-900 mb-1.5">
                    Key Facilities
                  </label>
                  <input
                    id="facilities"
                    name="facilities"
                    type="text"
                    className="w-full border border-navy-200 rounded-lg px-4 py-2.5 text-navy-700 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300"
                    placeholder="e.g. Fuel, water, electricity, Wi-Fi, haul-out"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-navy-900 mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full border border-navy-200 rounded-lg px-4 py-2.5 text-navy-700 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300 resize-none"
                    placeholder="Tell us about your marina, charter fleet, or anything else..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-navy-700 text-white font-semibold rounded-lg hover:bg-navy-800 transition-colors"
                >
                  Submit Listing Enquiry
                </button>

                <p className="text-xs text-navy-400 text-center">
                  We&apos;ll review your submission and be in touch within a few working days.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
