import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { partner, destination_slug, source_page } = await req.json();

    const supabase = getServiceClient();
    await supabase.from("affiliate_clicks").insert({
      partner,
      destination_slug: destination_slug || null,
      source_page: source_page || req.headers.get("referer") || null,
      user_agent: req.headers.get("user-agent") || null,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
