import { NextRequest, NextResponse } from "next/server";
import { readDB, writeDB, ClickEvent, getClientIp } from "../../../lib/db";

export async function POST(req: NextRequest) {
  try {
    const { offerId, videoId, offerName, offerPayout } = await req.json();
    if (!offerId || !videoId) {
      return NextResponse.json({ error: "Missing offerId or videoId" }, { status: 400 });
    }

    const ip = getClientIp(req);
    const userAgent = req.headers.get("user-agent") || "unknown-browser";
    
    const db = readDB();
    const newClick: ClickEvent = {
      offerId,
      videoId,
      ip,
      userAgent,
      timestamp: new Date().toISOString(),
      offerName: offerName || "Demo Offer",
      offerPayout: offerPayout || "$1.50"
    };

    db.clicks.push(newClick);
    writeDB(db);

    console.log(`[TRACK_CLICK] Saved click on offer ${offerId} for video ${videoId} from IP ${ip}`);
    return NextResponse.json({ success: true, info: "Click tracked successfully", click: newClick });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
