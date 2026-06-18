import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  Flame, 
  Compass, 
  BarChart3, 
  Cpu, 
  Zap, 
  Share2, 
  Crown, 
  ChevronRight, 
  ChevronLeft 
} from "lucide-react";

interface HomeViewProps {
  onNavigateToLibrary: () => void;
  onNavigateToPricing: () => void;
}

// Viral Emotion carousel items
const EMOTIONS = [
  {
    title: "The Nostalgia Trap",
    hook: "Ronaldinho raw pitch clips with 90s vintage vhs overlays.",
    trigger: "Nostalgia / Childlike Awesomeness",
    stat: "+420% Higher Average Duration",
    color: "from-amber-500 to-orange-600",
    videoSample: "Ronaldinho Joga Bonito"
  },
  {
    title: "Satisfying AI Metamorphosis",
    hook: "Android parts morphing sequentially with modular mechanical clicks.",
    trigger: "ASMR / Hypnotic Loop",
    stat: "95% Fully Completed Watch Ratio",
    color: "from-purple-500 to-indigo-600",
    videoSample: "Awakening Droid Loop"
  },
  {
    title: "The Outrage/Curiosity Twist",
    hook: "AI dark universe facts: 'The terrifying truth about deep-sea portals.'",
    trigger: "Curiosity Space Gap",
    stat: "8.2x Higher Shared Action Rate",
    color: "from-red-500 to-rose-600",
    videoSample: "Cosmic Secrets Faceless"
  },
  {
    title: "Ultra High Intensity Phonk Cuts",
    hook: "Deep velocity sync, heavy bass drop cuts tracking Neymar Jr.",
    trigger: "Adrenaline / Hype Boost",
    stat: "140% Loop Completion Spike",
    color: "from-cyan-500 to-purple-600",
    videoSample: "Neymar Samba Skills"
  }
];

export default function HomeView({ onNavigateToLibrary, onNavigateToPricing }: HomeViewProps) {
  const [activeCarousel, setActiveCarousel] = useState(0);

  const nextCarousel = () => {
    setActiveCarousel((prev) => (prev + 1) % EMOTIONS.length);
  };

  const prevCarousel = () => {
    setActiveCarousel((prev) => (prev - 1 + EMOTIONS.length) % EMOTIONS.length);
  };

  return (
    <div className="relative min-h-screen text-zinc-100 overflow-hidden bg-[#050505]">
      {/* Premium ambient decorative glows */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-orange-900/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-20" />

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-24 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge indicator */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-orange-400"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
            <span>Next-Generation Content Arbitrage System</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight leading-none text-white animate-fade-in"
          >
            Premium <span className="text-orange-500 font-extrabold">Creative Assets</span> Library
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Gain instant access to unreleased premium AI video templates & raw football clips pre-graded for split-screen hooks. Lock, load, and multiply your short-form revenue instantly.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button
              onClick={onNavigateToLibrary}
              className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
            >
              <Compass className="w-5 h-5 text-black" />
              <span>Explore Premium Library</span>
              <ArrowRight className="w-5 h-5 text-zinc-700" />
            </button>
          </motion.div>

          {/* Social Proof */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="pt-6 flex justify-center items-center gap-8 text-zinc-550 text-xs font-mono"
          >
            <div>
              <span className="text-zinc-200 text-sm font-bold block">15,000+</span> Creators Daily
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div>
              <span className="text-zinc-200 text-sm font-bold block">4.2 Billion</span> Combined Views
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div>
              <span className="text-zinc-200 text-sm font-bold block">$0.00</span> Free Access Available
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature stats spotlight */}
      <section className="border-t border-white/5 bg-black/40 backdrop-blur-md py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-4 group-hover:bg-orange-500/20 transition">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Algorithm-Optimized</h3>
              <p className="text-gray-400 text-xs mt-2 leading-relaxed">
                Every video layout, pace speed, and phonk sync track is optimized for high vertical watch times to trigger immediate FYP algorithmic recommendations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4 group-hover:bg-purple-500/20 transition">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Free Community Access</h3>
              <p className="text-gray-400 text-xs mt-2 leading-relaxed">
                By accessing our standard library tier, you unlock immediate high-speed download links completely free of charge. No subscription or hidden billing details required.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 group-hover:bg-indigo-500/20 transition">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Proven View Badging</h3>
              <p className="text-gray-400 text-xs mt-2 leading-relaxed">
                Check real-world validated analytics. Over 80% of our registered download archives have crossed millions of organic views on TikTok, Shorts, and Reels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Viral Emotion Carousel Section */}
      <section className="container mx-auto px-6 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-white">
            Viral Psychology Mechanics Carousel
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-1 max-w-xl mx-auto">
            Swipe through the precise scientific triggers we embed into our premium video overlays. Our templates don't grab attention by hazard — they force it.
          </p>
        </div>

        <div className="max-w-2xl mx-auto relative font-sans">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCarousel}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden"
            >
              {/* Top Accent background glow */}
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br ${EMOTIONS[activeCarousel].color} opacity-20 blur-xl`} />

              <div className="flex items-center gap-2.5 mb-4">
                <span className="px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-widest font-mono bg-white/5 text-orange-400 border border-white/10">
                  Concept Trigger
                </span>
                <span className="text-zinc-500">•</span>
                <span className="text-zinc-300 text-xs font-semibold">{EMOTIONS[activeCarousel].trigger}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
                {EMOTIONS[activeCarousel].title}
              </h3>
              
              <div className="bg-black/40 p-4 rounded-xl border border-white/5 mb-5 text-zinc-300 text-xs leading-relaxed italic">
                "{EMOTIONS[activeCarousel].hook}"
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500">
                  <Play className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Target Template: <strong>{EMOTIONS[activeCarousel].videoSample}</strong></span>
                </div>
                <div className="text-emerald-400 font-mono font-bold text-xs bg-emerald-950/40 border border-emerald-500/20 px-3 py-1 rounded-full inline-self-start">
                  {EMOTIONS[activeCarousel].stat}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Left / Right Navigation */}
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={prevCarousel}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-all hover:bg-white/10"
              aria-label="Previous emotion"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextCarousel}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-all hover:bg-white/10"
              aria-label="Next emotion"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Dynamic CTA Sections */}
      <section className="container mx-auto px-6 py-16 relative z-10 border-t border-white/5">
        <div className="max-w-4xl mx-auto rounded-2xl p-8 sm:p-12 bg-white/5 border border-white/10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-[-20%] right-[-25%] w-[350px] h-[350px] rounded-full bg-purple-600/10 blur-[80px] pointer-events-none" />
          
          <div className="text-left space-y-3 max-w-lg">
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">Ready to 10x Your Account Growth?</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Unlock the viral loops used by top accounts with over 10M followers. Instantly test-bypass or complete minor tasks for your direct video assets right now.
            </p>
          </div>

          <button
            onClick={onNavigateToLibrary}
            className="w-full md:w-auto px-6 py-3.5 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors whitespace-nowrap flex items-center justify-center gap-2 shrink-0 group shadow-md"
          >
            <span>Open Library Space</span>
            <ChevronRight className="w-4 h-4 text-black group-hover:translate-x-0.5 transition" />
          </button>
        </div>
      </section>
    </div>
  );
}
