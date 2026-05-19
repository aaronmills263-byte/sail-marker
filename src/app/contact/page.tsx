import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Sail Marker — partnerships, press, marina listings, or general enquiries.",
  alternates: { canonical: "https://www.sailmarker.com/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-navy-700">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
            <Mail className="w-10 h-10 text-sky-300 mx-auto mb-4" />
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-sky-300 max-w-2xl mx-auto leading-relaxed">
              Partnerships, press, marina listings, or just to say hello.
            </p>
          </div>
        </section>

        {/* Form */}
        <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <form className="bg-white rounded-2xl border border-navy-100 p-8 sm:p-10 shadow-sm space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-navy-900 mb-1.5">
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full border border-navy-200 rounded-lg px-4 py-2.5 text-navy-700 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-navy-900 mb-1.5">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full border border-navy-200 rounded-lg px-4 py-2.5 text-navy-700 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-navy-900 mb-1.5">
                Subject *
              </label>
              <select
                id="subject"
                name="subject"
                required
                className="w-full border border-navy-200 rounded-lg px-4 py-2.5 text-navy-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300"
              >
                <option value="">Select a subject...</option>
                <option value="general">General Enquiry</option>
                <option value="partnership">Partnership</option>
                <option value="press">Press</option>
                <option value="marina-listing">Marina Listing</option>
                <option value="charter-partner">Charter Partnership</option>
                <option value="editorial">Editorial / Content</option>
                <option value="bug">Bug Report</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-navy-900 mb-1.5">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="w-full border border-navy-200 rounded-lg px-4 py-2.5 text-navy-700 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300 resize-none"
                placeholder="How can we help?"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-navy-700 text-white font-semibold rounded-lg hover:bg-navy-800 transition-colors"
            >
              Send Message
            </button>

            <p className="text-xs text-navy-400 text-center">
              We aim to respond within two working days.
            </p>
          </form>

          <div className="mt-10 text-center">
            <p className="text-navy-500 text-sm">
              You can also reach us directly at{" "}
              <a
                href="mailto:hello@sailmarker.com"
                className="text-navy-700 underline hover:text-sky-500 transition-colors"
              >
                hello@sailmarker.com
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
