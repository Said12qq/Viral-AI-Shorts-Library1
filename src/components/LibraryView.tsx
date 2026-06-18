import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  SlidersHorizontal, 
  Film, 
  Lock, 
  Unlock, 
  Play, 
  Download, 
  Sparkles, 
  Eye, 
  RefreshCw, 
  Award 
} from "lucide-react";
import { VIDEOS, Video } from "../data/videos";
import CpaLockerModal from "./CpaLockerModal";

interface LibraryViewProps {
  unlockedVideoIds: string[];
  onVideoUnlock: (id: string) => void;
}

export default function LibraryView({ unlockedVideoIds, onVideoUnlock }: LibraryViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "ai-videos" | "football-clips">("all");
  const [selectedStyleFilter, setSelectedStyleFilter] = useState("all");

  // Interactive UI modals
  const [previewingVideo, setPreviewingVideo] = useState<Video | null>(null);
  const [lockedVideo, setLockedVideo] = useState<Video | null>(null);

  // Load unlock check statuses from server
  const [checkingStatusMap, setCheckingStatusMap] = useState<Record<string, boolean>>({});

  // Styles unique categories for filter sub-header
  const styleGroups = ["all", ...Array.from(new Set(VIDEOS.map(v => v.viral_style.split(" & ")[0])))];

  // Filter video items
  const filteredVideos = VIDEOS.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          video.viral_style.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || video.category === selectedCategory;
    
    const matchesStyle = selectedStyleFilter === "all" || video.viral_style.includes(selectedStyleFilter);

    return matchesSearch && matchesCategory && matchesStyle;
  });

  // Verify server status of locks
  const queryLockerStatus = async (videoId: string) => {
    setCheckingStatusMap(prev => ({ ...prev, [videoId]: true }));
    try {
      const res = await fetch("/api/check-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId })
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response was not JSON");
      }
      const data = await res.json();
      if (data.success && data.unlocked) {
        onVideoUnlock(videoId);
      }
    } catch (err) {
      console.error("Error check status:", err);
    } finally {
      setCheckingStatusMap(prev => ({ ...prev, [videoId]: false }));
    }
  };

  // Launch direct file downloader
  const triggerDownloadAction = async (video: Video) => {
    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId: video.id })
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response was not JSON");
      }
      const data = await res.json();
      if (data.success) {
        // Since iframe restricts raw downloads directly, we trigger a friendly browser alert & open in a tab!
        // We'll redirect the current tab or launch a secure drive location
        window.open(video.download_url, "_blank");
      } else {
        // Trigger content locker if not unlocked yet
        setLockedVideo(video);
      }
    } catch (err) {
      console.error(err);
      setLockedVideo(video);
    }
  };

  return (
    <div className="relative min-h-screen text-zinc-100 bg-[#050505] py-12 px-6">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-orange-900/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* Dynamic Section Header */}
        <div className="mb-10 text-center md:text-left md:flex md:items-end md:justify-between border-b border-white/5 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-purple-400 mb-3 animate-pulse">
              <Film className="w-3.5 h-3.5" />
              <span>Premium Asset Library</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Premium <span className="text-orange-500 font-extrabold">AI Shorts</span> Library
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm mt-1 max-w-xl">
              High-retention viral templates for content creators. Pre-graded and styled for split-screen overlays.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center justify-center gap-1.5 text-zinc-400 font-mono text-[11px] bg-white/5 p-2.5 rounded-xl border border-white/10">
            <span>Unlocked Packets: </span>
            <span className="text-emerald-450 font-bold bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              {unlockedVideoIds.length} / {VIDEOS.length}
            </span>
          </div>
        </div>

        {/* Dashboard search/filters board */}
        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full md:flex-1">
              <span className="absolute inset-y-0 left-3.5 flex items-center text-zinc-500 pointer-events-none">
                <Search className="w-4 h-4 text-zinc-400" />
              </span>
              <input 
                type="text" 
                placeholder="Search viral styles (e.g. 'Cinematic', 'Football High-Energy')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-white transition-all text-xs"
              />
            </div>

            {/* Main Category Toggles */}
            <div className="flex bg-black/40 border border-white/10 p-1 rounded-xl w-full md:w-auto overflow-x-auto min-w-fit">
              <button 
                onClick={() => { setSelectedCategory("all"); setSelectedStyleFilter("all"); }}
                className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === "all" ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                All Clips
              </button>
              <button 
                onClick={() => { setSelectedCategory("ai-videos"); setSelectedStyleFilter("all"); }}
                className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
                  selectedCategory === "ai-videos" ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span>AI Videos</span>
              </button>
              <button 
                onClick={() => { setSelectedCategory("football-clips"); setSelectedStyleFilter("all"); }}
                className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
                  selectedCategory === "football-clips" ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                <Award className="w-3.5 h-3.5 text-purple-400" />
                <span>Football</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-5 text-xs text-gray-450 flex items-center justify-between font-mono">
          <span>Displaying <strong>{filteredVideos.length}</strong> available packets</span>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="text-orange-500 hover:underline"
            >
              Clear Search Query
            </button>
          )}
        </div>

        {/* Video Grid list */}
        {filteredVideos.length === 0 ? (
          <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl">
            <SlidersHorizontal className="w-10 h-10 text-gray-600 mx-auto mb-4" />
            <h3 className="text-gray-300 font-display font-bold text-lg">No Match Found</h3>
            <p className="text-gray-500 text-xs mt-1 max-w-sm mx-auto">
              No shorts files match your filtered query parameters. Try editing your key tags or category toggles above!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVideos.map((video) => {
              const isUnlocked = unlockedVideoIds.includes(video.id);
              const checking = checkingStatusMap[video.id] || false;

              return (
                <motion.div
                  key={video.id}
                  layoutId={`video-card-${video.id}`}
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 flex flex-col h-full"
                >
                  {/* Thumbnail stage */}
                  <div className="relative aspect-[9/16] w-full bg-zinc-900 overflow-hidden cursor-pointer" onClick={() => setPreviewingVideo(video)}>
                    <img 
                      src={video.thumbnail_url} 
                      alt={video.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient top & bottom covers */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/80" />

                    {/* Meta Overlays */}
                    <div className="absolute top-3 left-3 flex items-center justify-between right-3 pointer-events-none">
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded font-mono border ${
                        video.category === "ai-videos" 
                        ? "bg-orange-500 text-black border-orange-500/20" 
                        : "bg-purple-600 text-white border-purple-500/20"
                      }`}>
                        {video.category === "ai-videos" ? "VIRAL STYLE" : "EMOTION AI"}
                      </span>
                      <span className="bg-black/70 border border-white/10 px-2 py-0.5 rounded-full text-[10px] font-mono text-zinc-300">
                        {video.duration}s
                      </span>
                    </div>

                    {/* Center play trigger overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/40">
                      <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg transition transform hover:scale-110">
                        <Play className="w-5 h-5 fill-current ml-0.5 text-black" />
                      </div>
                    </div>

                    <div className="absolute bottom-3 left-3 bg-white/20 px-2.5 py-0.5 rounded-full pointer-events-none border border-white/10 text-[10px] font-semibold">
                      {video.views_badge} Views
                    </div>
                  </div>

                  {/* Descriptions Stage */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-[#050505]/40 backdrop-blur-md">
                    <div className="space-y-1.5">
                      <h3 className="line-clamp-1 font-display font-bold text-white hover:text-orange-500 transition cursor-pointer text-sm" onClick={() => setPreviewingVideo(video)}>
                        {video.title}
                      </h3>
                      <p className="text-zinc-450 text-xs line-clamp-2 leading-relaxed">
                        {video.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-2.5 border-t border-white/5">
                      {/* Stylistic tag line */}
                      <div className="flex items-center gap-1 shadow-inner rounded-xl p-2 bg-white/5 border border-white/15">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Sync:</span>
                        <span className="text-[10px] text-zinc-300 truncate font-semibold font-mono">{video.viral_style}</span>
                      </div>

                      {/* Call Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => setPreviewingVideo(video)}
                          className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all"
                        >
                          <Play className="w-3.5 h-3.5 text-gray-400" />
                          <span>Preview</span>
                        </button>

                        <button
                          onClick={() => triggerDownloadAction(video)}
                          className={`flex-1 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-300 ${
                            isUnlocked 
                            ? "bg-white/10 hover:bg-white/20 border border-white/15 text-white" 
                            : "bg-white text-black hover:bg-gray-200"
                          }`}
                        >
                          {isUnlocked ? (
                            <>
                              <Unlock className="w-3.5 h-3.5" />
                              <span>Download</span>
                            </>
                          ) : (
                            <>
                              <Lock className="w-3.5 h-3.5 text-black" />
                              <span>Unlock</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Verify lead tracker trigger link */}
                      {!isUnlocked && (
                        <button 
                          onClick={() => queryLockerStatus(video.id)}
                          disabled={checking}
                          className="w-full text-[10px] text-gray-500 font-mono hover:text-white flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50 transition-colors"
                        >
                          {checking ? (
                            <>
                              <RefreshCw className="w-3 h-3 animate-spin text-orange-400" />
                              Checking completions database...
                            </>
                          ) : (
                            <>
                              <RefreshCw className="w-3 h-3" />
                              Verify status
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Video Preview Overlay modal */}
        <AnimatePresence>
          {previewingVideo && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-2xl bg-[#050505] border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-5 flex flex-col md:flex-row gap-5"
              >
                <button 
                  onClick={() => setPreviewingVideo(null)}
                  className="absolute top-3 right-3 text-zinc-400 hover:text-white bg-white/5 w-8 h-8 rounded-full flex items-center justify-center transition border border-white/10"
                >
                  ✕
                </button>

                {/* Left: Video Player */}
                <div className="w-full md:w-[240px] shrink-0 aspect-[9/16] bg-black rounded-xl overflow-hidden border border-white/10 relative">
                  <video 
                    src={previewingVideo.preview_url}
                    autoPlay
                    loop
                    controls
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Subtle watermarked trigger */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/80 border border-white/15 text-[9px] uppercase font-mono tracking-wider text-orange-500 font-bold">
                    PREVIEW VIDEO
                  </div>
                </div>

                {/* Right: Meta & call directions */}
                <div className="flex-1 text-left flex flex-col justify-between py-2 text-zinc-300">
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold mb-1">
                        VIRAL TEMPLATE PREVIEW
                      </span>
                      <h3 className="text-xl font-display font-extrabold text-white leading-tight">
                        {previewingVideo.title}
                      </h3>
                      <p className="text-[11px] text-zinc-500 mt-2 italic">
                        Category: {previewingVideo.category === "ai-videos" ? "AI Generated Visuals" : "Football Highlights Match footage"}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {previewingVideo.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 pt-2 font-mono text-[10.5px]">
                        <span className="bg-white/5 px-2.5 py-1 rounded-xl text-zinc-300 border border-white/10 font-sans">
                          {previewingVideo.viral_style}
                        </span>
                        <span className="bg-white/5 px-2.5 py-1 rounded-xl text-orange-400 border border-white/10">
                          {previewingVideo.views_badge} Views
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 space-y-3 mt-4">
                    <p className="text-[10px] text-zinc-500 flex items-center gap-1.5 font-mono">
                      🔒 Direct link unlocked once verification is complete.
                    </p>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const v = previewingVideo;
                          setPreviewingVideo(null);
                          setLockedVideo(v);
                        }}
                        className="flex-1 py-3 px-5 bg-white text-black rounded-full text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md hover:bg-gray-200"
                      >
                        <Lock className="w-3.5 h-3.5 text-black" />
                        <span>Unlock Download Files</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Verification Active overlay */}
        <AnimatePresence>
          {lockedVideo && (
            <CpaLockerModal 
              video={lockedVideo}
              onClose={() => setLockedVideo(null)}
              onUnlockedSuccess={() => {
                onVideoUnlock(lockedVideo.id);
                setLockedVideo(null);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
