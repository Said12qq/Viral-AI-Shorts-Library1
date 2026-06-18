import { NextRequest, NextResponse } from "next/server";
import { readDB, getClientIp } from "../../../lib/db";

export async function POST(req: NextRequest) {
  try {
    const { videoId } = await req.json();
    if (!videoId) {
      return NextResponse.json({ error: "Missing videoId" }, { status: 400 });
    }

    const ip = getClientIp(req);
    const db = readDB();

    const isUnlocked = db.unlocks.some(u => u.videoId === videoId && u.ip === ip);

    if (!isUnlocked) {
      return NextResponse.json({
        success: false,
        unlocked: false,
        error: "Verification is still pending. Please verify first to get your download."
      });
    }

    return NextResponse.json({
      success: true,
      message: "Credentials validated. Redirecting to Google Drive asset folder.",
      redirectNote: "A new browser tab will launch to download your high-frame-rate MP4 source assets."
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
