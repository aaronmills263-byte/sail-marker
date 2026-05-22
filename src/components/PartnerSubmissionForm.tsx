"use client";

import { useState } from "react";
import type { PartnerCategory } from "@/data/partner-pricing";

interface PartnerSubmissionFormProps {
  category: PartnerCategory;
}

export function PartnerSubmissionForm({ category }: PartnerSubmissionFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const body = {
      business_name: data.get("business_name"),
      contact_name: data.get("contact_name"),
      email: data.get("email"),
      phone: data.get("phone") || null,
      website: data.get("website") || null,
      country: data.get("country") || null,
      destination: data.get("destination") || null,
      category,
      tier_interest: data.get("tier_interest"),
      description: data.get("description") || null,
    };

    try {
      const res = await fetch("/api/partner-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-navy-100 p-8 text-center">
        <h3 className="font-display text-2xl font-bold text-navy-900 mb-3">
          Thanks for your enquiry
        </h3>
        <p className="text-navy-600 leading-relaxed">
          We&apos;ll review your submission and be in touch within 2 business days.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full border border-navy-200 rounded-lg px-4 py-2.5 text-navy-700 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300";
  const labelClass = "block text-sm font-semibold text-navy-900 mb-1.5";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-navy-100 p-8 shadow-sm space-y-5"
    >
      <h3 className="font-display text-xl font-bold text-navy-900">
        Get started
      </h3>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="business_name" className={labelClass}>
            Business Name *
          </label>
          <input
            id="business_name"
            name="business_name"
            type="text"
            required
            className={inputClass}
            placeholder="e.g. Aegean Yacht Services"
          />
        </div>
        <div>
          <label htmlFor="contact_name" className={labelClass}>
            Contact Name *
          </label>
          <input
            id="contact_name"
            name="contact_name"
            type="text"
            required
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className={labelClass}>
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="website" className={labelClass}>
            Website
          </label>
          <input
            id="website"
            name="website"
            type="url"
            className={inputClass}
            placeholder="https://"
          />
        </div>
        <div>
          <label htmlFor="country" className={labelClass}>
            Country
          </label>
          <input
            id="country"
            name="country"
            type="text"
            className={inputClass}
            placeholder="e.g. Greece"
          />
        </div>
      </div>

      <div>
        <label htmlFor="destination" className={labelClass}>
          Primary Destination / Marina
        </label>
        <input
          id="destination"
          name="destination"
          type="text"
          className={inputClass}
          placeholder="e.g. We're based at Marina X / We serve the Greek Ionian"
        />
      </div>

      <div>
        <label className={labelClass}>Tier Interested In</label>
        <div className="flex flex-wrap gap-4 mt-1">
          {[
            { value: "free", label: "Free" },
            { value: "featured", label: "Featured" },
            { value: "premium", label: "Premium" },
            { value: "tell_me_more", label: "Tell me more" },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 text-sm text-navy-700 cursor-pointer">
              <input
                type="radio"
                name="tier_interest"
                value={opt.value}
                defaultChecked={opt.value === "tell_me_more"}
                className="accent-navy-700"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Brief Description of Services
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder="Tell us about your business and the services you offer..."
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full px-6 py-3 bg-navy-700 text-white font-semibold rounded-lg hover:bg-navy-800 transition-colors disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Submit Enquiry"}
      </button>
    </form>
  );
}
