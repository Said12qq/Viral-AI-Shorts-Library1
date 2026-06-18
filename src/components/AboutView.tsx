import React from "react";
import { motion } from "motion/react";
import { 
  Info, 
  HelpCircle, 
  Mail, 
  ShieldCheck, 
  Cpu, 
  Compass, 
  User, 
  Globe 
} from "lucide-react";

export default function AboutView() {
  const faqs = [
    {
      q: "What is the Viral AI Shorts Library?",
      a: "We are an elite design resource library offering performance-optimized, high-retention vertical background sequences (including high-clarity 4K sports captures and custom neural network loop overlays). Content architects and social media managers leverage our assets to command viewer focus and boost engagement rates across modern short-form networks."
    },
    {
      q: "How is this premium platform kept completely free?",
      a: "To maintain premium 4K data servers without requiring subscriber fees or credit cards, we leverage a secure and fully integrated micro-sponsorship framework. By simply completing a brief sponsor checkpoint (such as discovering a free utility app or giving anonymous feedback), our cloud storage continues to be fully subsidized for independent creators worldwide."
    },
    {
      q: "Are these video clips copyright-compliant and safe?",
      a: "Yes! All cinematic tracks and sports transitions are cropped and multi-layer remastered under strict fair-use guidelines. They are ready to be integrated with original audio tracks, caption commentary, and creative visual filters to satisfy standard platforms' policy standards."
    },
    {
      q: "Can I use these assets for commercial content?",
      a: "Absolutely. Once verified and retrieved from our library system, you obtain full digital creative rights to edit, modify, and publish the media assets across all main video networks, including partner monetization streams."
    }
  ];

  return (
    <div className="relative min-h-screen text-zinc-100 bg-[#050505] py-16 px-6">
      {/* Decorative Glow backgrounds */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-orange-900/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">

        {/* Page Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-xs font-mono text-orange-400">
            <Info className="w-3.5 h-3.5" />
            <span>Platform Overview</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            Built by Editors, <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-450 to-purple-400">
              For Vertical Scale
            </span>
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Discover the mission behind our curated folder networks, designed specifically to address the global demand for dynamic vertical hooks.
          </p>
        </div>

        {/* Core Narrative card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 mb-12 space-y-5 text-left">
          <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-purple-400" />
            Our Core Mission & Strategy
          </h3>
          <p className="text-gray-400 text-xs leading-relaxed">
            The short-form ecosystem has changed forever. Audiences no longer tolerate standard, slow slideshows or boring stock backgrounds. High-growth TikTok compilation accounts require intense dynamic visuals (called 'secondary screen loops' or 'satisfying clips') to retain viewer attention while a main audio or podcast speaks in the primary portion.
          </p>
          <p className="text-gray-400 text-xs leading-relaxed">
            We source high-frame-rate football dribbles (CR7 leaping, Messi dribbling, Ronaldinho vintage street skills) and render custom sci-fi AI morph loops so that you have immediate access to world-class clips. By substituting upfront fees with interactive verification milestones, we keep professional-grade layouts accessible to independent designers worldwide.
          </p>
          
        </div>

        {/* FAQ list */}
        <div className="space-y-6 text-left">
          <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-orange-400" />
            Frequently Answered Questions
          </h3>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2 hover:border-white/20 transition-all duration-300"
              >
                <h4 className="text-zinc-200 text-sm font-semibold flex items-start gap-2">
                  <span className="text-orange-500 font-mono text-xs">Q:</span>
                  <span>{faq.q}</span>
                </h4>
                <p className="text-gray-400 text-xs leading-relaxed pl-5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Contact bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-xs font-mono">
          <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-zinc-650" /> Secure SSL Gateway Active</span>
          <span>© 2026 Viral AI Shorts Library Inc.</span>
          <a href="mailto:ouradasaid18@gmail.com" className="text-zinc-400 hover:text-white transition flex items-center gap-1">
            <Mail className="w-3.5 h-3.5" /> Support Mailbox
          </a>
        </div>

      </div>
    </div>
  );
}
