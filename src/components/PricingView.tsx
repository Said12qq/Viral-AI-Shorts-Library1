import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Check, 
  Sparkles, 
  HelpCircle, 
  Lock, 
  Crown, 
  Coins, 
  ArrowRight, 
  Smartphone, 
  ShieldCheck 
} from "lucide-react";

export default function PricingView() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      name: "Sponsor Free",
      priceMonthly: 0,
      priceYearly: 0,
      description: "Support our cloud servers by completing simple daily partner verifications. Perfect for hobby editors.",
      features: [
        "Access via Standard Community Route",
        "Over 10+ standard video packets",
        "High-Speed Google Drive archive access",
        "Samba skill tracks & AI loop assets",
        "Standard MP4 exports (1080p)"
      ],
      cta: "Unlock First Clip Pro",
      highlighted: false,
      icon: <Coins className="w-5 h-5 text-zinc-400" />
    },
    {
      name: "Creator Premium",
      priceMonthly: 19,
      priceYearly: 14,
      description: "Skip all verification gates. Instant direct high-speed folder access for professional creators.",
      features: [
        "Direct high-speed downloads with zero checkpoints",
        "Unrestricted access to all 4K source zips",
        "Daily automated folder updates",
        "Exclusive Phonk Sound Effects tracks",
        "Multi-cam project composition files",
        "Priority Discord support room"
      ],
      cta: "Acquire Creator Premium",
      highlighted: true,
      icon: <Sparkles className="w-5 h-5 text-orange-400" />
    },
    {
      name: "Agency Studio",
      priceMonthly: 49,
      priceYearly: 39,
      description: "Heavy volume agency storage. Custom requests made directly to our video team.",
      features: [
        "Includes every Premium feature set",
        "White-labelled delivery API keys",
        "Custom vertical edit requests (3/mo)",
        "Raw AI visual training models",
        "Unlimited seat licenses for editors",
        "24/7 dedicated support representative"
      ],
      cta: "Upgrade to Agency Max",
      highlighted: false,
      icon: <Crown className="w-5 h-5 text-purple-400" />
    }
  ];

  return (
    <div className="relative min-h-screen text-zinc-100 bg-[#050505] py-16 px-6">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-orange-900/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        
        {/* Page Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-xs font-mono text-purple-400">
            <Coins className="w-3.5 h-3.5" />
            <span>Pricing Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Flexible Plans for Any Scale
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Support our raw storage bandwidth through simple free sponsor checkouts, or acquire direct cloud folders for seamless, high-volume video arbitrage operations.
          </p>

          {/* Monthly / Yearly Billing Toggle */}
          <div className="flex items-center justify-center gap-3 pt-6">
            <span className={`text-xs font-mono ${billingPeriod === "monthly" ? "text-white font-semibold" : "text-zinc-500"}`}>
              Monthly Core
            </span>
            <button
              onClick={() => setBillingPeriod(p => p === "monthly" ? "yearly" : "monthly")}
              className="w-12 h-6 rounded-full bg-white/5 border border-white/10 p-1 flex items-center transition relative cursor-pointer"
              aria-label="Toggle pricing cycle"
            >
              <div 
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  billingPeriod === "yearly" ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-xs font-mono flex items-center gap-1.5 ${billingPeriod === "yearly" ? "text-white font-semibold" : "text-zinc-500"}`}>
              <span>Yearly Core</span>
              <span className="bg-orange-500/10 text-orange-400 px-1.5 py-0.5 rounded-full text-[9.5px] uppercase font-bold border border-orange-500/20">
                Save ~25%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan) => {
            const price = billingPeriod === "monthly" ? plan.priceMonthly : plan.priceYearly;
            
            return (
              <div 
                key={plan.name}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between border relative overflow-hidden transition-all duration-300 ${
                  plan.highlighted 
                  ? "bg-white/10 border-orange-500/40 shadow-2xl" 
                  : "bg-white/5 border-white/10 hover:border-white/20 hover:scale-[1.02]"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-4 right-4 bg-orange-500 text-black text-[9.5px] uppercase font-extrabold px-2.5 py-0.5 rounded-full font-mono tracking-widest flex items-center gap-1">
                    <Crown className="w-3 h-3" /> Best Choice
                  </div>
                )}

                {/* Card Header */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center">
                      {plan.icon}
                    </div>
                    <h3 className="font-display font-bold text-lg text-white">
                      {plan.name}
                    </h3>
                  </div>

                  <p className="text-gray-400 text-xs leading-relaxed min-h-[46px] text-left">
                    {plan.description}
                  </p>

                  <div className="pt-2 text-left">
                    <span className="text-4xl font-display font-extrabold text-white">
                      ${price}
                    </span>
                    <span className="text-zinc-505 text-xs font-mono">
                      {price === 0 ? "" : billingPeriod === "monthly" ? " / mo" : " / mo, billed yearly"}
                    </span>
                  </div>

                  {/* Included features checklist */}
                  <ul className="space-y-2.5 pt-6 border-t border-white/10">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 font-mono text-left">What's Included:</p>
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-zinc-300 text-left">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions bottom */}
                <div className="pt-8">
                  <button
                    className={`w-full py-3 px-4 rounded-full text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                      plan.highlighted
                      ? "bg-white text-black font-extrabold hover:bg-gray-200 shadow-md"
                      : "bg-white/5 hover:bg-white/10 text-white border border-white/15"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Deleted FAQ Panel Block */}

      </div>
    </div>
  );
}
