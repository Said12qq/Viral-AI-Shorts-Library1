import React from "react";
import { motion } from "motion/react";
import { 
  Sparkles, 
  Cpu, 
  Tv, 
  Workflow, 
  MessageSquare, 
  ShieldCheck, 
  Share2, 
  Bot, 
  Clock, 
  RefreshCw 
} from "lucide-react";

export default function FutureView() {
  const steps = [
    {
      id: "01",
      title: "Generative Video Engine (Runway Gen-4 / Sora)",
      description: "Direct server-side script prompt execution. Generate vertical high-impact cinema shorts from a simple paragraph text without manual video editors.",
      icon: <Tv className="w-5 h-5 text-orange-400" />,
      tag: "CGI Synthetics"
    },
    {
      id: "02",
      title: "Neuromorph Face Tracking Refinement",
      description: "Intelligent facial landmarks detection matching velocity beat transitions. Let AI align raw sport kicks with rhythmic heavy bass drop markers.",
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
      tag: "Rhythm Alignment"
    },
    {
      id: "03",
      title: "Enterprise Verification Gateways",
      description: "Automated distributed access layers designed for secure multi-region creator authentication, connecting digital storage assets with high-speed download slots.",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      tag: "Verification Flow"
    },
    {
      id: "04",
      title: "Multi-Platform Auto Post Bot",
      description: "Trigger downloads that feed into scheduling queues. Instantly deploy your raw edited folders to 15+ faceless TikTok handles simultaneously.",
      icon: <Bot className="w-5 h-5 text-blue-400" />,
      tag: "Automation Node"
    }
  ];

  return (
    <div className="relative min-h-screen text-zinc-100 bg-[#050505] py-16 px-6">
      {/* Glow backgrounds */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-orange-900/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">
        
        {/* Page Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-xs font-mono text-orange-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Futuristic Roadmap: 2026 Shift</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            The Future of <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-450 to-purple-400">
              Faceless Video Content Automation
            </span>
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            The short-form ecosystem is transitioning into intelligent media distribution networks. See what revolutionary workflow modules we represent on our current tech sprint.
          </p>
        </div>

        {/* Big visual spotlight */}
        <div className="bg-white/5 rounded-3xl border border-white/10 p-6 sm:p-10 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-gradient-to-br from-orange-500/10 to-transparent blur-2xl" />
          <h3 className="text-lg font-display font-bold text-white mb-3 flex items-center gap-2">
            <Workflow className="w-5 h-5 text-orange-500" />
            Synthetic Video Integration Blueprint
          </h3>
          <p className="text-gray-400 text-xs leading-relaxed mb-6">
            Our pipeline acts as a high-velocity connector between unreleased artistic clips and organic distribution channels. Instead of wasting hundreds of hours editing raw media sequences or paying high software overheads, creators utilize our pre-graded assets to scale accounts instantly.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-[11px]">
            <div className="bg-[#050505]/60 border border-white/10 p-3.5 rounded-xl text-center space-y-1">
              <span className="text-zinc-500 block">Current Step</span>
              <span className="text-white font-bold block text-sm">Asset Sourcing</span>
              <span className="text-orange-400">Secure Cloud Access</span>
            </div>
            <div className="bg-[#050505]/60 border border-white/10 p-3.5 rounded-xl text-center space-y-1">
              <span className="text-zinc-500 block">Processing Sprint</span>
              <span className="text-white font-bold block text-sm">Smart Auto-Crop</span>
              <span className="text-purple-400">In Development</span>
            </div>
            <div className="bg-[#050505]/60 border border-white/10 p-3.5 rounded-xl text-center space-y-1">
              <span className="text-zinc-500 block">Server Integration</span>
              <span className="text-white font-bold block text-sm">Direct Secure Gateway</span>
              <span className="text-emerald-500 font-semibold text-[10px]">Active Secure Access</span>
            </div>
          </div>
        </div>

        {/* Step Cards List */}
        <div className="space-y-6">
          <h3 className="font-display font-bold text-lg text-[#efefef]">Phase Pipelines & Modules</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {steps.map((step) => (
              <div 
                key={step.id}
                className="bg-white/5 border border-white/10 p-5 rounded-2xl flex gap-4 group hover:border-white/20 transition-all duration-300"
              >
                <div className="w-11 h-11 shrink-0 bg-black/40 border border-white/10 rounded-xl flex items-center justify-center">
                  {step.icon}
                </div>

                <div className="space-y-1.5 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-zinc-500 font-bold">{step.id}</span>
                    <span className="text-zinc-500 text-xs">•</span>
                    <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider font-mono">{step.tag}</span>
                  </div>
                  <h4 className="text-zinc-250 text-sm font-semibold group-hover:text-white transition">
                    {step.title}
                  </h4>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final alert text */}
        <div className="text-center py-10">
          <p className="text-[11.5px] text-zinc-500 font-mono flex items-center justify-center gap-1.5 justify-self-center">
            <Clock className="w-4 h-4 text-zinc-600 animate-spin" /> Roadmap scheduled for automatic package upgrades starting Q3 2026.
          </p>
        </div>

      </div>
    </div>
  );
}
