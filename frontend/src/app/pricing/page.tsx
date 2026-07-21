"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, Sparkles, X, CreditCard, ShieldCheck } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const PLANS = [
  {
    name: "Free Core",
    priceMonthly: 0,
    priceYearly: 0,
    period: "forever",
    description: "Start exploring developer tools with basic sandboxes and guides.",
    color: "#6366f1",
    popular: false,
    features: [
      "Access to basic learning documents",
      "Limited playground compiles (5 languages)",
      "Daily DSA challenges solved tracking",
      "Community forum threads",
      "Public developer profile link"
    ],
    cta: "Get Started Free",
    ctaStyle: "secondary"
  },
  {
    name: "Developer Pro",
    priceMonthly: 19,
    priceYearly: 15,
    period: "per user",
    description: "Unleash the full potential of AI mentoring and simulation hubs.",
    color: "#a855f7",
    popular: true,
    features: [
      "Everything in Free Core",
      "Unlimited AI Tutor reviews",
      "Interactive 50+ languages compiler sandbox",
      "Full AI Interview recruitment trials",
      "Advanced git collaboration merge rooms",
      "Priority API queue limits",
      "AI resume optimization exporter"
    ],
    cta: "Start Pro Trial",
    ctaStyle: "primary"
  },
  {
    name: "Enterprise Stack",
    priceMonthly: 89,
    priceYearly: 72,
    period: "per seat",
    description: "Tailored resources for universities, teams, and hiring scale.",
    color: "#f59e0b",
    popular: false,
    features: [
      "Everything in Developer Pro",
      "Direct recruiter matchmaking dashboards",
      "Custom assessment test design room",
      "University cohort classrooms",
      "SSO/SAML admin identity integrations",
      "Dedicated account managers",
      "API webhook triggers access"
    ],
    cta: "Contact Enterprise",
    ctaStyle: "secondary"
  }
];

const COMPARISON = [
  { feature: "AI Mentor Assistance", free: "Basic (5/day)", pro: "Unlimited", enterprise: "Unlimited + Custom Model" },
  { feature: "Languages Supported", free: "5 Languages", pro: "50+ Languages", enterprise: "50+ Languages" },
  { feature: "Git Repositories", free: "Public Only", pro: "Unlimited Private", enterprise: "Unlimited Private" },
  { feature: "AI Recruiter Interviews", free: "—", pro: "Unlimited", enterprise: "Unlimited" },
  { feature: "API Webhook Access", free: "—", pro: "—", enterprise: "Full Access" },
  { feature: "SLA Support Response", free: "Best Effort", pro: "24-Hour Queue", enterprise: "1-Hour Dedicated" }
];

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [checkoutPlan, setCheckoutPlan] = useState<typeof PLANS[0] | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleCheckout = (plan: typeof PLANS[0]) => {
    if (plan.priceMonthly === 0) {
      alert("You are successfully subscribed to the Free Core tier.");
      return;
    }
    setCheckoutPlan(plan);
    setCheckoutSuccess(false);
  };

  const submitCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingOut(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsCheckingOut(false);
    setCheckoutSuccess(true);
  };

  return (
    <>
      <div className="bg-grid" />
      <div className="bg-mesh" />
      <Navbar />

      <main className="min-h-screen pt-32 pb-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-10">
            <Link href="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-4 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold tracking-tight">
              Honest Plans, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Tailored Pricing</span>
            </h1>
            <p className="text-slate-400 mt-2 text-sm max-w-xl mx-auto">
              Start prototyping for free and expand your plan as your engineering scope grows.
            </p>

            {/* Toggle monthly/yearly */}
            <div className="flex justify-center mt-8">
              <div className="bg-slate-900/80 border border-white/5 p-1 rounded-xl flex items-center gap-1">
                <button
                  onClick={() => setBillingPeriod("monthly")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    billingPeriod === "monthly"
                      ? "bg-purple-600 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Monthly Billing
                </button>
                <button
                  onClick={() => setBillingPeriod("yearly")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    billingPeriod === "yearly"
                      ? "bg-purple-600 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Yearly Billing
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Save 20%
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-stretch">
            {PLANS.map((plan) => {
              const price = billingPeriod === "monthly" ? plan.priceMonthly : plan.priceYearly;
              return (
                <div
                  key={plan.name}
                  className={`bg-slate-950/70 border rounded-3xl p-8 backdrop-blur-xl relative flex flex-col justify-between transition-all ${
                    plan.popular
                      ? "border-purple-500/40 shadow-xl shadow-purple-500/5 ring-1 ring-purple-500/20"
                      : "border-white/5"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-[10px] font-black uppercase tracking-wider text-white flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Most Popular
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-bold text-slate-100">{plan.name}</h3>
                    <p className="text-xs text-slate-400 mt-2 min-h-[32px]">{plan.description}</p>
                    
                    <div className="mt-6 flex items-baseline gap-1">
                      <span className="text-4xl font-black text-white">${price}</span>
                      <span className="text-slate-500 text-xs">/{billingPeriod === "monthly" ? "mo" : "yr"}</span>
                    </div>

                    <ul className="mt-8 space-y-3.5">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-xs text-slate-350">
                          <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: plan.color }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleCheckout(plan)}
                    className={`w-full py-2.5 mt-8 rounded-xl font-semibold text-sm transition-all ${
                      plan.ctaStyle === "primary"
                        ? "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/20"
                        : "bg-slate-900 border border-white/10 hover:bg-slate-800 text-slate-300 hover:text-white"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Comparison Matrix */}
          <div className="mt-16">
            <h2 className="text-xl font-bold text-center mb-8">Compare Plan Features</h2>
            <div className="bg-slate-950/70 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/5 bg-slate-900/40 text-slate-400 font-semibold">
                      <th className="px-6 py-4">Capability</th>
                      <th className="px-6 py-4">Free Core</th>
                      <th className="px-6 py-4">Developer Pro</th>
                      <th className="px-6 py-4">Enterprise Stack</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {COMPARISON.map((row) => (
                      <tr key={row.feature} className="hover:bg-slate-900/10">
                        <td className="px-6 py-3.5 font-medium text-slate-200">{row.feature}</td>
                        <td className="px-6 py-3.5">{row.free}</td>
                        <td className="px-6 py-3.5 text-purple-300">{row.pro}</td>
                        <td className="px-6 py-3.5 text-amber-300">{row.enterprise}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Checkout Modal Simulation */}
      <AnimatePresence>
        {checkoutPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-md w-full relative text-white"
            >
              <button
                onClick={() => setCheckoutPlan(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <AnimatePresence mode="wait">
                {!checkoutSuccess ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-purple-400" />
                      Subscribe to {checkoutPlan.name}
                    </h3>
                    <p className="text-xs text-slate-450 mt-1">
                      Safe simulated transaction. No actual currency is billed.
                    </p>

                    <form onSubmit={submitCheckout} className="mt-6 space-y-4">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Card Holder Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Himan Barman"
                          className="w-full mt-1.5 bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Card Number</label>
                        <input
                          type="text"
                          required
                          placeholder="4242 4242 4242 4242"
                          className="w-full mt-1.5 bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Exp. Date</label>
                          <input
                            type="text"
                            required
                            placeholder="12/28"
                            className="w-full mt-1.5 bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase">CVC</label>
                          <input
                            type="text"
                            required
                            placeholder="123"
                            className="w-full mt-1.5 bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isCheckingOut}
                        className="w-full mt-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all disabled:opacity-50"
                      >
                        {isCheckingOut ? "Processing..." : `Pay $${billingPeriod === "monthly" ? checkoutPlan.priceMonthly : checkoutPlan.priceYearly}.00`}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-6"
                  >
                    <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full mb-4">
                      <ShieldCheck className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold">Checkout Complete</h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      Your workspace credentials have been promoted. Welcome to the Developer Pro tier!
                    </p>
                    <button
                      onClick={() => setCheckoutPlan(null)}
                      className="w-full mt-8 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-all"
                    >
                      Close Window
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
