import { NextRequest, NextResponse } from "next/server";
import { readDB, writeDB, getClientIp } from "../../../lib/db";

export async function POST(req: NextRequest) {
  try {
    const { videoId } = await req.json();
    if (!videoId) {
      return NextResponse.json({ error: "Missing videoId" }, { status: 400 });
    }

    const ip = getClientIp(req);
    const userAgent = req.headers.get("user-agent") || "unknown";

    const db = readDB();
    
    const exists = db.unlocks.some(u => u.videoId === videoId && u.ip === ip);

    if (!exists) {
      db.unlocks.push({
        videoId,
        ip,
        userAgent,
        timestamp: new Date().toISOString(),
        method: "test_bypass"
      });
      writeDB(db);
    }

    console.log(`[UNLOCK] Manual unlock bypass trigger for video ${videoId} from IP ${ip}`);
    return NextResponse.json({ success: true, unlocked: true, message: "Manual test bypass registered successfully." });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
