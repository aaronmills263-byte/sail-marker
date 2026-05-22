import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";
import nodemailer from "nodemailer";

const ENQUIRY_TYPE_MAP: Record<string, string> = {
  charter: "charter_partner",
  marina: "marina_listing",
  provisioning: "provisioning_partner",
  transfers: "transfer_partner",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const supabase = getServiceClient();

    const enquiryType = ENQUIRY_TYPE_MAP[body.category] || "other";

    const { error } = await supabase.from("listing_enquiries").insert({
      name: body.contact_name,
      email: body.email,
      company_name: body.business_name,
      marina_or_charter_company: body.business_name,
      destination: body.destination || null,
      enquiry_type: enquiryType,
      message: [
        body.phone ? `Phone: ${body.phone}` : null,
        body.website ? `Website: ${body.website}` : null,
        body.country ? `Country: ${body.country}` : null,
        body.tier_interest ? `Tier interest: ${body.tier_interest}` : null,
        body.description ? `\nDescription:\n${body.description}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (error) throw error;

    // Send email notification
    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;

    if (gmailUser && gmailPassword) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: gmailUser, pass: gmailPassword },
      });

      const categoryLabel = body.category
        ? body.category.charAt(0).toUpperCase() + body.category.slice(1)
        : "Unknown";

      await transporter.sendMail({
        from: gmailUser,
        to: gmailUser,
        subject: `[Sail Marker] New ${categoryLabel} partnership enquiry from ${body.business_name}`,
        text: [
          `New ${categoryLabel} Partnership Enquiry`,
          `${"=".repeat(40)}`,
          ``,
          `Business Name: ${body.business_name}`,
          `Contact Name: ${body.contact_name}`,
          `Email: ${body.email}`,
          `Phone: ${body.phone || "—"}`,
          `Website: ${body.website || "—"}`,
          `Country: ${body.country || "—"}`,
          `Destination/Marina: ${body.destination || "—"}`,
          `Category: ${categoryLabel}`,
          `Tier Interest: ${body.tier_interest || "—"}`,
          ``,
          `Description:`,
          body.description || "—",
        ].join("\n"),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Partner enquiry error:", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
