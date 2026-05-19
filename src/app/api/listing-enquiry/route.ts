import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const supabase = getServiceClient();

    const { error } = await supabase.from("listing_enquiries").insert({
      name: body.name,
      email: body.email,
      company_name: body.company_name || null,
      marina_or_charter_company: body.marina_or_charter_company || null,
      destination: body.destination || null,
      enquiry_type: body.enquiry_type || "marina_listing",
      message: body.message || null,
    });

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
