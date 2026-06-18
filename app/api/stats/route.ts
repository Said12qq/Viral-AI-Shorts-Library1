import { NextRequest, NextResponse } from "next/server";
import { readDB } from "../../../lib/db";

export async function GET(req: NextRequest) {
  try {
    const db = readDB();
    
    const totalClicks = db.clicks.length;
    const totalUnlocks = db.unlocks.length;
    
    let totalEstimatedPayout = 0;
    db.clicks.forEach(c => {
      const amt = parseFloat((c.offerPayout || "$1.50").replace(/[^0-9.]/g, ""));
      if (!isNaN(amt)) {
        totalEstimatedPayout += amt;
      }
    });

    const deviceCounts: Record<string, number> = {};
    db.clicks.forEach(c => {
      let dev = "Desktop Web";
      const ua = (c.userAgent || "").toLowerCase();
      if (ua.includes("mobi") || ua.includes("iphone") || ua.includes("android")) {
        dev = "Mobile Touch";
      } else if (ua.includes("tablet") || ua.includes("ipad")) {
        dev = "Tablet Device";
      }
      deviceCounts[dev] = (deviceCounts[dev] || 0) + 1;
    });

    const popularVideos: Record<string, number> = {};
    db.clicks.forEach(c => {
      popularVideos[c.videoId] = (popularVideos[c.videoId] || 0) + 1;
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalClicks,
        totalUnlocks,
        estimatedRevenue: `$${(totalUnlocks * 1.85).toFixed(2)}`,
        averagePayout: `$${totalClicks > 0 ? (totalEstimatedPayout / totalClicks).toFixed(2) : "1.50"}`,
        devices: Object.keys(deviceCounts).map(k => ({ name: k, count: deviceCounts[k] })),
        popularVideos: Object.keys(popularVideos).map(k => ({ videoId: k, count: popularVideos[k] })),
        recentActivity: db.clicks.slice(-10).reverse()
      }
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
