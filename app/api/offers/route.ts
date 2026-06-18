import { NextResponse } from "next/server";



export async function GET(request: Request) {

  const apiKey = process.env.NEW_API_KEY;

  if (!apiKey) {

    return NextResponse.json({ success: false, error: "Missing NEW_API_KEY" });

  }



  const apiEndpoint = process.env.NEW_API_ENDPOINT || "https://appsave.online/api/v2";



  // Extract client IP and user agent

  const forwarded = request.headers.get("x-forwarded-for");

  const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

  const userAgent = request.headers.get("user-agent") || "unknown-browser";



  try {

    const url = new URL(apiEndpoint);

    url.searchParams.append("ip", ip);

    url.searchParams.append("user_agent", userAgent);

    url.searchParams.append("ctype", "1");



    const response = await fetch(url.toString(), {

      method: "GET",

      headers: {

        "Authorization": `Bearer ${apiKey}`,

        "Accept": "application/json"

      },

    });



    if (!response.ok) {

      let rawText = "";

      try {

        rawText = await response.text();

      } catch (e) {}

      return NextResponse.json({

        success: false,

        error: "CPA API request failed",

        status: response.status,

        raw: rawText || `HTTP error ${response.status}`

      });

    }



    const rawData = await response.json();

    let rawOffers: any[] = [];

    if (Array.isArray(rawData)) {

      rawOffers = rawData;

    } else if (rawData && typeof rawData === "object") {

      rawOffers = rawData.offers || rawData.data || rawData.results || [];

    }



    const mappedOffers = rawOffers.map((offer: any) => ({

      campaign_id: offer.offerid || offer.campaign_id || offer.id || "unknown",

      anchor: offer.name_short || offer.name || offer.title || "Secure Gate Clearance",

      name: offer.name_short || offer.name || offer.title || "Secure Gate Clearance",

      conversion: offer.adcopy || offer.description || offer.conversion || "Establish node authentication",

      picture: offer.picture || "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=120",

      payout: offer.payout || "$1.50",

      country: offer.country || "All",

      device: offer.device || "All",

      url: offer.link || offer.url || "#",

      epc: offer.epc || "0"

    })).slice(0, 3);



    return NextResponse.json({

      success: true,

      offers: mappedOffers,

      testing: false

    });

  } catch (err: any) {

    console.error("[CPA API Error]:", err);

    return NextResponse.json({

      success: false,

      error: "CPA API request failed",

      status: 500,

      raw: err.message || "Unknown dynamic reference error"

    });

  }

}
