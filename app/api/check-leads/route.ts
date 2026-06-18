import { NextRequest, NextResponse } from "next/server";
import { readDB, writeDB, UnlockEvent, getClientIp } from "../../../lib/db";

export async function POST(req: NextRequest) {
  try {
    const { videoId } = await req.json();
    if (!videoId) {
      return NextResponse.json({ error: "Missing videoId" }, { status: 400 });
    }

    const ip = getClientIp(req);
    const userAgent = req.headers.get("user-agent") || "unknown";

    console.log(`[CHECK_LEADS] Checking leads for videoId: ${videoId}, IP: ${ip}`);

    const db = readDB();
    const isUnlocked = db.unlocks.some(u => u.videoId === videoId && u.ip === ip);

    if (isUnlocked) {
      return NextResponse.json({ success: true, unlocked: true, reason: "Already unlocked previously" });
    }

    const ipClicks = db.clicks.filter(c => c.videoId === videoId && c.ip === ip);
    
    if (ipClicks.length > 0) {
      const dbWithNewUnlock = readDB();
      const newUnlock: UnlockEvent = {
        videoId,
        ip,
        userAgent,
        timestamp: new Date().toISOString(),
        method: "lead_conversion"
      };
      
      dbWithNewUnlock.unlocks.push(newUnlock);
      writeDB(dbWithNewUnlock);

      console.log(`[CHECK_LEADS] Click detected for IP ${ip}. Auto-converting for immediate verification feedback!`);
      return NextResponse.json({
        success: true,
        unlocked: true,
        reason: "Lead converted successfully! Folder now available."
      });
    }

    return NextResponse.json({
      success: true,
      unlocked: false,
      reason: "No active completions detected. Click on an option below and complete the action.",
      tips: [
        "Please tap on one of the standard verification options shown.",
        "Ensure you complete the instruction steps on the target page.",
        "Use correct information to satisfy system validation!"
      ]
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
