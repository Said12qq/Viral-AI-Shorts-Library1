import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Lock, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  RefreshCw, 
  AlertTriangle, 
  Download, 
  ShieldCheck, 
  Flame, 
  Smartphone, 
  Gamepad, 
  Gift 
} from "lucide-react";
import { Video } from "../data/videos";

interface CpaLockerModalProps {
  video: Video;
  onClose: () => void;
  onUnlockedSuccess: () => void;
}

interface Offer {
  campaign_id: string;
  anchor: string;
  conversion: string;
  url: string;
  picture: string;
  country: string;
  device: string;
  payout: string;
}

export default function CpaLockerModal({ video, onClose, onUnlockedSuccess }: CpaLockerModalProps) {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorChat, setErrorChat] = useState("");
  const [checkingLead, setCheckingLead] = useState(false);
  const [clickedOffers, setClickedOffers] = useState<string[]>([]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isTestingBypassLoading, setIsTestingBypassLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch offers on load
  const fetchOffers = async () => {
    setLoading(true);
    setErrorChat("");
    try {
      const res = await fetch("/api/offers");
      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Verification server response was not valid JSON. Please refresh in a moment.");
      }
      const data = await res.json();
      if (data.success) {
        setOffers(data.offers);
      } else {
        setErrorChat(data.error || "Failed to load verification routes.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorChat(err.message || "Could not connect to secure routing provider.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, [video.id]);

  // Handle Offer Click Tracking
  const handleOfferClick = async (offer: Offer) => {
    try {
      // Register click with Express server
      await fetch("/api/track-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offerId: offer.campaign_id,
          videoId: video.id,
          offerName: offer.anchor,
          offerPayout: offer.payout
        })
      });

      // Track locally
      if (!clickedOffers.includes(offer.campaign_id)) {
        setClickedOffers(prev => [...prev, offer.campaign_id]);
      }

      // Open offer in a new tab securely
      // Avoid raw window.open on parent, rather use clean standard click tag behavior or open fallback
      window.open(offer.url, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("Error tracking click:", err);
    }
  };

  // Check lead status
  const checkLeadStatus = async () => {
    setCheckingLead(true);
    setErrorChat("");
    try {
      const res = await fetch("/api/check-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId: video.id })
      });
      const data = await res.json();

      if (data.success && data.unlocked) {
        setIsUnlocked(true);
        setSuccessMsg(data.reason || "Unlock approved! File ready.");
        setTimeout(() => {
          onUnlockedSuccess();
        }, 1500);
      } else {
        // If not unlocked, tell user they must visit the URL first
        setErrorChat(data.reason || "We checked but did not detect a complete lead. Make sure to complete the steps on screen!");
      }
    } catch (err) {
      console.error(err);
      setErrorChat("Error verifying lead transaction. Please retry.");
    } finally {
      setCheckingLead(false);
    }
  };

  // Manual tester bypass route
  const handleTestBypass = async () => {
    setIsTestingBypassLoading(true);
    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId: video.id })
      });
      const data = await res.json();
      if (data.success) {
        setIsUnlocked(true);
        setSuccessMsg("Bypass active! File unlocked successfully.");
        setTimeout(() => {
          onUnlockedSuccess();
        }, 1200);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsTestingBypassLoading(false);
    }
  };

  // Icon mapping helper
  const getOfferIcon = (index: number) => {
    switch (index) {
      case 0: return <Smartphone className="w-5 h-5 text-orange-500" />;
      case 1: return <Gamepad className="w-5 h-5 text-purple-500" />;
      default: return <Gift className="w-5 h-5 text-teal-500" />;
    }
  };

  return (
    <div id="verification-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg bg-[#050505] border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-6 my-8"
      >
        {/* Close Button unless locked/unlocked */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors duration-200 cursor-pointer"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Header decoration */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500 to-purple-500" />

        {/* Main Content */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-orange-400 mb-3 animate-pulse">
            <Lock className="w-5 h-5 text-orange-400" />
          </div>
          <h2 className="text-xl font-display font-bold text-white tracking-tight">
            Premium Verification Required
          </h2>
          <p className="text-gray-400 text-xs mt-1.5 max-w-sm mx-auto">
            This high-definition creator resource is provided completely free of charge. Verify with one partner channel below to receive your direct high-speed download.
          </p>
        </div>

        {/* Video mini preview info card */}
        <div className="bg-white/5 rounded-xl border border-white/10 p-3 mb-5 flex items-center gap-3">
          <img 
            src={video.thumbnail_url} 
            alt={video.title} 
            className="w-14 h-14 object-cover rounded-lg border border-white/10"
            referrerPolicy="no-referrer"
          />
          <div className="text-left flex-1 min-w-0">
            <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">{video.category.replace("-", " ")}</p>
            <h4 className="text-zinc-200 text-sm font-semibold truncate">{video.title}</h4>
            <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] mt-0.5">
              <span className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-purple-400 font-mono font-medium">{video.viral_style}</span>
              <span>•</span>
              <span className="text-orange-400/90 font-medium">{video.views_badge}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs px-1 text-gray-400">
            <span className="font-semibold text-zinc-350">Select verification partner:</span>
            <span className="text-zinc-500 flex items-center gap-1 font-mono text-[10px] uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Secure SSL
            </span>
          </div>

          {/* Offer List */}
          {loading ? (
            <div className="py-8 text-center space-y-3">
              <RefreshCw className="w-7 h-7 text-orange-500 animate-spin mx-auto" />
              <p className="text-zinc-500 text-xs font-mono">Initializing connection to secure verification servers...</p>
            </div>
          ) : errorChat && offers.length === 0 ? (
            <div className="p-4 rounded-xl border border-red-950 bg-red-950/20 text-center text-xs text-red-400 space-y-2">
              <AlertTriangle className="w-5 h-5 mx-auto text-red-500" />
              <p>{errorChat}</p>
              <button 
                onClick={fetchOffers}
                className="px-3 py-1 bg-[#050505] border border-white/10 hover:bg-white/10 text-white rounded font-mono text-[10px] transition cursor-pointer"
              >
                Retry Request
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {offers.slice(0, 3).map((offer, idx) => {
                const clicked = clickedOffers.includes(offer.campaign_id);
                return (
                  <button
                    key={offer.campaign_id}
                    onClick={() => handleOfferClick(offer)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between gap-3 group relative overflow-hidden cursor-pointer ${
                      clicked 
                      ? "bg-white/10 border-orange-500/30" 
                      : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center shrink-0">
                        {getOfferIcon(idx)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <h5 className="text-zinc-200 text-xs font-semibold truncate group-hover:text-white transition-colors">
                            {offer.anchor}
                          </h5>
                          {clicked && (
                            <span className="text-[10px] text-orange-400 font-medium px-1 bg-orange-500/10 rounded">Clicked</span>
                          )}
                        </div>
                        <p className="text-gray-400 text-[10px] line-clamp-1 mt-0.5">
                          {offer.conversion}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 bg-black/40 py-1.5 px-2.5 rounded-lg border border-white/10 group-hover:border-white/20 transition">
                      <span className="text-[10px] font-bold text-emerald-400 font-mono tracking-tight">{clicked ? "Verify" : "Free"}</span>
                      <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-white transition" />
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Verification Actions */}
          <div className="pt-2 border-t border-white/5 space-y-3">

            {/* Error notifications */}
            {errorChat && (
              <p className="text-[10.5px] text-zinc-400 leading-snug text-center bg-white/5 p-2.5 rounded-lg border border-white/10 font-mono">
                ⚠️ <span className="text-orange-300">{errorChat}</span>
              </p>
            )}

            {/* Success notification */}
            {isUnlocked && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-center"
              >
                <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  {successMsg}
                </div>
                <p className="text-[10px] text-zinc-400 mt-1">Starting folder delivery process...</p>
              </motion.div>
            )}

            {/* Anti-fraud guarantees */}
            <div className="flex items-center justify-center gap-5 text-[10px] text-zinc-600 pt-1">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-zinc-500" /> Direct Drive Delivery</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-zinc-500" /> Anti-Virus Certified</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
