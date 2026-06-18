import React, { useState, useEffect } from "react";
import { 
  Film, 
  Menu, 
  X, 
  Sparkles, 
  Compass, 
  Coins, 
  Info, 
  Database, 
  Tv2, 
  PhoneCall, 
  Flame, 
  GitBranch, 
  ShieldCheck 
} from "lucide-react";

import HomeView from "./components/HomeView";
import LibraryView from "./components/LibraryView";
import FutureView from "./components/FutureView";
import PricingView from "./components/PricingView";
import AboutView from "./components/AboutView";
import AdminView from "./components/AdminView";

type ViewName = "home" | "library" | "future" | "pricing" | "about" | "admin";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewName>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unlockedVideoIds, setUnlockedVideoIds] = useState<string[]>([]);

  // Automatically check if some videos are already unlocked on load of session
  // We can look up server-side unlocked status if needed, but keeping a client list works perfectly
  const registerUnlock = (videoId: string) => {
    if (!unlockedVideoIds.includes(videoId)) {
      setUnlockedVideoIds(prev => [...prev, videoId]);
    }
  };

  // Scroll to top on view modification for immersive SPA experience
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  }, [currentView]);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col justify-between selection:bg-orange-500/30 selection:text-orange-200 relative overflow-x-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-orange-900/20 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Prime Header navigation bar */}
      <header className="sticky top-0 z-40 bg-black/40 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="container mx-auto max-w-7xl flex items-center justify-between">
          
          {/* Logo / Brand with the theme's custom VIRAL.AI gradient styling */}
          <div 
            onClick={() => setCurrentView("home")}
            className="flex items-center gap-2.5 cursor-pointer group z-10"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-500 to-purple-600 flex items-center justify-center font-display font-extrabold text-white text-sm shadow-md group-hover:scale-105 transition-transform">
              <Film className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <span className="font-display font-black text-base tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 block">
                VIRAL.AI
              </span>
              <span className="text-[9px] font-mono text-zinc-500 block uppercase tracking-widest leading-none">
                Shorts Lib
              </span>
            </div>
          </div>

          {/* Desktop Direct Links styled with the sleek theme's exact aesthetic */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-400 z-10">
            <button
              onClick={() => setCurrentView("home")}
              className={`hover:text-white transition-colors cursor-pointer font-medium ${currentView === "home" ? "text-white" : "text-gray-400"}`}
            >
              Library
            </button>
            <button
              onClick={() => setCurrentView("library")}
              className={`hover:text-white transition-colors cursor-pointer font-medium ${currentView === "library" ? "text-white" : "text-gray-400"}`}
            >
              Clips
            </button>
            <button
              onClick={() => setCurrentView("future")}
              className={`hover:text-white transition-colors cursor-pointer font-medium ${currentView === "future" ? "text-white" : "text-gray-400"}`}
            >
              Future
            </button>
            <button
              onClick={() => setCurrentView("pricing")}
              className={`hover:text-white transition-colors cursor-pointer font-medium ${currentView === "pricing" ? "text-white" : "text-gray-400"}`}
            >
              Pricing
            </button>
            <button
              onClick={() => setCurrentView("about")}
              className={`hover:text-white transition-colors cursor-pointer font-medium ${currentView === "about" ? "text-white" : "text-gray-400"}`}
            >
              How it works
            </button>
          </nav>

          {/* Action trigger button */}
          <div className="hidden lg:flex items-center gap-3 z-10">
          </div>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white transition z-10"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[73px] bottom-0 z-30 bg-[#050505]/95 backdrop-blur-lg border-t border-white/5 px-6 py-6 flex flex-col justify-between">
          <nav className="flex flex-col gap-5 text-sm font-medium text-gray-400 text-left">
            <button
              onClick={() => setCurrentView("home")}
              className={`py-2 border-b border-white/5 text-left ${currentView === "home" ? "text-white font-semibold" : ""}`}
            >
              Library Space
            </button>
            <button
              onClick={() => setCurrentView("library")}
              className={`py-2 border-b border-white/5 text-left ${currentView === "library" ? "text-white font-semibold" : ""}`}
            >
              Clips Gallery
            </button>
            <button
              onClick={() => setCurrentView("future")}
              className={`py-2 border-b border-white/5 text-left ${currentView === "future" ? "text-white font-semibold" : ""}`}
            >
              Future 2026
            </button>
            <button
              onClick={() => setCurrentView("pricing")}
              className={`py-2 border-b border-white/5 text-left ${currentView === "pricing" ? "text-white font-semibold" : ""}`}
            >
              Pricing Plans
            </button>
            <button
              onClick={() => setCurrentView("about")}
              className={`py-2 border-b border-white/5 text-left ${currentView === "about" ? "text-white font-semibold" : ""}`}
            >
              How it works
            </button>
          </nav>
        </div>
      )}

      {/* Main Core View Area */}
      <main className="flex-1 z-10 relative">
        {currentView === "home" && (
          <HomeView 
            onNavigateToLibrary={() => setCurrentView("library")}
            onNavigateToPricing={() => setCurrentView("pricing")}
          />
        )}
        
        {currentView === "library" && (
          <LibraryView 
            unlockedVideoIds={unlockedVideoIds}
            onVideoUnlock={registerUnlock}
          />
        )}

        {currentView === "future" && (
          <FutureView />
        )}

        {currentView === "pricing" && (
          <PricingView />
        )}

        {currentView === "about" && (
          <AboutView />
        )}

        {currentView === "admin" && (
          <AdminView />
        )}
      </main>

      {/* Clean Premium Footer */}
      <footer className="bg-black border-t border-white/5 px-8 py-3 z-10 relative">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-[11px] font-mono">
          <div className="flex items-center gap-4 uppercase tracking-widest font-semibold flex-wrap justify-center">
            <span>Total Clips: 4,120</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full border-2 border-black bg-purple-500"></div>
              <div className="w-6 h-6 rounded-full border-2 border-black bg-orange-500"></div>
              <div className="w-6 h-6 rounded-full border-2 border-black bg-blue-500"></div>
            </div>
            <span className="text-xs text-gray-400">Joined by 1.2k Creators this week</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
