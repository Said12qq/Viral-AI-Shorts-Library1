import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";

const DB_FILE = path.join(process.cwd(), "clicks_unlocks.json");

export interface ClickEvent {
  offerId: string;
  videoId: string;
  ip: string;
  userAgent: string;
  timestamp: string;
  offerName?: string;
  offerPayout?: string;
}

export interface UnlockEvent {
  videoId: string;
  ip: string;
  userAgent: string;
  timestamp: string;
  method: "test_bypass" | "lead_conversion";
}

export interface LocalDB {
  clicks: ClickEvent[];
  unlocks: UnlockEvent[];
}

export function readDB(): LocalDB {
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

export function writeDB(db: LocalDB): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing database:", err);
  }
}

export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return "127.0.0.1";
}
