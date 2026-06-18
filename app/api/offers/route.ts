import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const apiKey = process.env.NEW_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      success: false,
      error: "Missing NEW_API_KEY",
    });
  }

  const apiEndpoint =
    process.env.NEW_API_ENDPOINT || "https://appsave.online/api/v2";

  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
  const userAgent = request.headers.get("user-agent") || "Mozilla/5.0";

  try {
    const url = new URL(apiEndpoint);
    url.searchParams.set("ip", ip);
    url.searchParams.set("user_agent", userAgent);
    url.searchParams.set("ctype", "1");

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const rawText = await response.text();

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        error: "CPA API request failed",
        status: response.status,
        raw: rawText.slice(0, 300),
      });
    }

    let rawData: any;

    try {
      rawData = JSON.parse(rawText);
    } catch {
      return NextResponse.json({
        success: false,
        error: "CPA API returned invalid JSON",
        raw: rawText.slice(0, 300),
      });
    }

    const rawOffers = Array.isArray(rawData)
      ? rawData
      : rawData?.offers || rawData?.data || rawData?.results || [];

    const offers = rawOffers.slice(0, 3).map((offer: any) => ({
      campaign_id: String(
        offer.offerid || offer.campaign_id || offer.id || "unknown"
      ),
      anchor:
        offer.name_short || offer.name || offer.title || "Secure Access Offer",
      name:
        offer.name_short || offer.name || offer.title || "Secure Access Offer",
      conversion:
        offer.adcopy ||
        offer.description ||
        offer.conversion ||
        "Complete the offer to unlock this content.",
      picture: offer.picture || "",
      payout: offer.payout || "",
      country: offer.country || "",
      device: offer.device || "",
      url: offer.link || offer.url || "#",
      epc: offer.epc || "",
    }));

    return NextResponse.json({
      success: true,
      offers,
      testing: false,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: "CPA API request failed",
      status: 500,
      raw: err?.message || "Unknown error",
    });
  }
}
