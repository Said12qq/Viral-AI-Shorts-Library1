import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const PORT = 3000;
const DB_FILE = path.join(process.cwd(), "clicks_unlocks.json");

// Define DB Schemas
interface ClickEvent {
  offerId: string;
  videoId: string;
  ip: string;
  userAgent: string;
  timestamp: string;
  offerName?: string;
  offerPayout?: string;
}

interface UnlockEvent {
  videoId: string;
  ip: string;
  userAgent: string;
  timestamp: string;
  method: "test_bypass" | "lead_conversion";
}

interface LocalDB {
  clicks: ClickEvent[];
  unlocks: UnlockEvent[];
}

// Ensure database file exists
function readDB(): LocalDB {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(data) as LocalDB;
    }
  } catch (err) {
    console.error("Error reading database:", err);
  }
  return { clicks: [], unlocks: [] };
}

function writeDB(db: LocalDB) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing database:", err);
  }
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // Setup database structure immediately
  const initialDb = readDB();
  writeDB(initialDb);

  // Helper helper to get clean IP
  const getClientIp = (req: express.Request): string => {
    const forwarded = req.headers["x-forwarded-for"];
    if (forwarded) {
      const ipList = typeof forwarded === "string" ? forwarded.split(",") : forwarded;
      if (Array.isArray(ipList)) return ipList[0].trim();
      return (forwarded as string).split(",")[0].trim();
    }
    return req.socket.remoteAddress || "127.0.0.1";
  };

  // ==========================================================
  // API ROUTE: GET /api/offers
  // ==========================================================
  app.get("/api/offers", async (req, res) => {
    const ip = getClientIp(req);
    const userAgent = req.headers["user-agent"] || "unknown-browser";

    const apiKey = (process.env.NEW_API_KEY && process.env.NEW_API_KEY !== "YOUR_NEW_API_KEY" && process.env.NEW_API_KEY.trim() !== "")
      ? process.env.NEW_API_KEY.trim()
      : "45028|qbibATC67qAJ59cm5sdbKJsIK5psKbH5NKe3uBHv39ecbe65";
    const apiEndpoint = (process.env.NEW_API_ENDPOINT && process.env.NEW_API_ENDPOINT !== "https://saveapp.store/api/v2")
      ? process.env.NEW_API_ENDPOINT.trim()
      : "https://appsave.online/api/v2";

    console.log(`[API_OFFERS] Fetching offers for IP: ${ip}, UA: ${userAgent}`);

    // Standard high-quality local fallback campaigns for testing if Offer API is offline/empty/unconfigured
    const fallbackOffers = [
      {
        campaign_id: "demo_tiktok_boost",
        anchor: "TikTok Viral Mastery Pack",
        conversion: "Complete a simple 1-minute survey to preview the secrets",
        url: "#demo-complete-tiktok",
        picture: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=100&auto=format&fit=crop",
        country: "US",
        device: "All Devices",
        payout: "$1.40"
      },
      {
        campaign_id: "demo_capcut_presets",
        anchor: "Get Free AI Video CapCut Pro Presets",
        conversion: "Enter your email for immediate viral overlay packs",
        url: "#demo-complete-capcut",
        picture: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop",
        country: "ALL",
        device: "Mobile Only",
        payout: "$2.10"
      },
      {
        campaign_id: "demo_phonk_beats",
        anchor: "Download Football Phonk Creator Kit",
        conversion: "Confirm your phone pin or simple quiz to acquire files",
        url: "#demo-complete-phonk",
        picture: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100&auto=format&fit=crop",
        country: "ALL",
        device: "All Devices",
        payout: "$1.85"
      }
    ];

    if (!apiKey || apiKey === "YOUR_NEW_API_KEY" || apiKey === "") {
      console.warn("[API_OFFERS] NEW_API_KEY is missing or draft. Returning premium fallbacks.");
      return res.json({ success: true, offers: fallbackOffers, isFallback: true });
    }

    try {
      // Build the URL with required query parameters
      // Send ip, user_agent, and ctype=1
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
        throw new Error(`External status ${response.status}`);
      }

      const rawData: any = await response.json();
      console.log("[API_OFFERS] Raw response from sponsor network:", JSON.stringify(rawData).slice(0, 300));

      // Check if response has offers
      let rawOffers: any[] = [];
      if (Array.isArray(rawData)) {
        rawOffers = rawData;
      } else if (rawData && typeof rawData === "object") {
        rawOffers = rawData.offers || rawData.data || [];
      }

      if (rawOffers.length === 0) {
        console.warn("[API_OFFERS] External network returned empty offer array. Using demo fallbacks.");
        return res.json({ success: true, offers: fallbackOffers, isFallback: true });
      }

      // Map up to 3 offers
      const mappedOffers = rawOffers.slice(0, 3).map((offer: any) => ({
        campaign_id: offer.offerid || offer.campaign_id || offer.id || "unknown",
        anchor: offer.name_short || offer.name || offer.title || "Premium Reward Offer",
        conversion: offer.adcopy || offer.conversion || offer.description || "Complete simple step to unlock folder",
        url: offer.link || offer.url || "#",
        picture: offer.picture || "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=120",
        country: offer.country || "All",
        device: offer.device || "All",
        payout: offer.payout || "$1.50"
      }));

      return res.json({ success: true, offers: mappedOffers, isFallback: false });
    } catch (err: any) {
      console.error("[API_OFFERS] Error calling saveapp API:", err);
      return res.json({
        success: true,
        offers: fallbackOffers,
        isFallback: true,
        error_context: err.message
      });
    }
  });

  // ==========================================================
  // API ROUTE: POST /api/track-click
  // ==========================================================
  app.post("/api/track-click", (req, res) => {
    const { offerId, videoId, offerName, offerPayout } = req.body;
    if (!offerId || !videoId) {
      return res.status(400).json({ error: "Missing offerId or videoId" });
    }

    const ip = getClientIp(req);
    const userAgent = req.headers["user-agent"] || "unknown-browser";
    
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
    return res.json({ success: true, info: "Click tracked successfully", click: newClick });
  });

  // ==========================================================
  // API ROUTE: POST /api/check-leads
  // ==========================================================
  app.post("/api/check-leads", async (req, res) => {
    const { videoId } = req.body;
    if (!videoId) {
      return res.status(400).json({ error: "Missing videoId" });
    }

    const ip = getClientIp(req);
    const userAgent = req.headers["user-agent"] || "unknown";

    console.log(`[CHECK_LEADS] Checking leads for videoId: ${videoId}, IP: ${ip}`);

    // Read click history to see if they've at least clicked something
    const db = readDB();
    const isUnlocked = db.unlocks.some(u => u.videoId === videoId && u.ip === ip);

    if (isUnlocked) {
      return res.json({ success: true, unlocked: true, reason: "Already unlocked previously" });
    }

    // Let's check click history in our local JSON db
    const ipClicks = db.clicks.filter(c => c.videoId === videoId && c.ip === ip);
    
    // For local interactive demo purposes to keep user content completely testable,
    // if there is a click on any of our fallback demo offers, we auto-convert it
    // with a helper message so the user can easily see the unlocked screen!
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

      console.log(`[CHECK_LEADS] Click detected for IP ${ip}. Auto-converting for immediate locker unlock feedback!`);
      return res.json({
        success: true,
        unlocked: true,
        reason: "Lead converted successfully! Folder now available."
      });
    }

    // If they have not clicked, tell them they must click and complete an offer
    return res.json({
      success: true,
      unlocked: false,
      reason: "No active completions detected. Click on an offer list below and complete the action.",
      tips: [
        "Please tap on one of the premium offers shown.",
        "Ensure you complete the instruction steps on the target page.",
        "Use real information in the offer to ensure the network signs the lead!"
      ]
    });
  });

  // ==========================================================
  // API ROUTE: POST /api/unlock
  // ==========================================================
  app.post("/api/unlock", (req, res) => {
    const { videoId } = req.body;
    if (!videoId) {
      return res.status(400).json({ error: "Missing videoId" });
    }

    const ip = getClientIp(req);
    const userAgent = req.headers["user-agent"] || "unknown";

    const db = readDB();
    
    // Check if already unlocked
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
    return res.json({ success: true, unlocked: true, message: "Manual test bypass registered successfully." });
  });

  // ==========================================================
  // API ROUTE: POST /api/download
  // ==========================================================
  app.post("/api/download", (req, res) => {
    const { videoId } = req.body;
    if (!videoId) {
      return res.status(400).json({ error: "Missing videoId" });
    }

    const ip = getClientIp(req);
    const db = readDB();

    const isUnlocked = db.unlocks.some(u => u.videoId === videoId && u.ip === ip);

    if (!isUnlocked) {
      return res.json({
        success: false,
        unlocked: false,
        error: "Locker is still locked. Please complete an offer first to get your download."
      });
    }

    // Return mock success and secure instructions
    return res.json({
      success: true,
      message: "Credentials validated. Redirecting to Google Drive asset folder.",
      redirectNote: "A new browser tab will launch to download your high-frame-rate MP4 source assets."
    });
  });

  // ==========================================================
  // API ROUTE: GET /api/stats
  // ==========================================================
  app.get("/api/stats", (req, res) => {
    const db = readDB();
    
    // Calculate total layout metrics
    const totalClicks = db.clicks.length;
    const totalUnlocks = db.unlocks.length;
    
    // Calculate simulated overall revenue or payouts unlocked
    let totalEstimatedPayout = 0;
    db.clicks.forEach(c => {
      const amt = parseFloat((c.offerPayout || "$1.50").replace(/[^0-9.]/g, ""));
      if (!isNaN(amt)) {
        totalEstimatedPayout += amt;
      }
    });

    // Device metrics
    const deviceCounts: Record<string, number> = {};
    db.clicks.forEach(c => {
      let dev = "Desktop Web";
      const ua = c.userAgent.toLowerCase();
      if (ua.includes("mobi") || ua.includes("iphone") || ua.includes("android")) {
        dev = "Mobile Touch";
      } else if (ua.includes("tablet") || ua.includes("ipad")) {
        dev = "Tablet Device";
      }
      deviceCounts[dev] = (deviceCounts[dev] || 0) + 1;
    });

    // Popular video locks
    const popularVideos: Record<string, number> = {};
    db.clicks.forEach(c => {
      popularVideos[c.videoId] = (popularVideos[c.videoId] || 0) + 1;
    });

    return res.json({
      success: true,
      stats: {
        totalClicks,
        totalUnlocks,
        estimatedRevenue: `$${(totalUnlocks * 1.85).toFixed(2)}`, // Approximate rate per certified lock conversion
        averagePayout: `$${totalClicks > 0 ? (totalEstimatedPayout / totalClicks).toFixed(2) : "1.50"}`,
        devices: Object.keys(deviceCounts).map(k => ({ name: k, count: deviceCounts[k] })),
        popularVideos: Object.keys(popularVideos).map(k => ({ videoId: k, count: popularVideos[k] })),
        recentActivity: db.clicks.slice(-10).reverse()
      }
    });
  });

  // Vite middleware setup or production static file server
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Critical server bootstrap error:", err);
});
