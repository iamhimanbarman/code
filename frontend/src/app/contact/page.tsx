"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, MessageSquare, MapPin, Send, HelpCircle, ShieldAlert,
  CheckCircle2, CreditCard, Briefcase, GraduationCap, ChevronDown
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const CATEGORY_OPTIONS = [
  {
    value: "Support",
    label: "Developer Support & Sandboxes",
    desc: "Sandbox compilation bugs, execution errors, or account issues.",
    icon: HelpCircle
  },
  {
    value: "Sales",
    label: "Pricing & Subscriptions",
    desc: "Pro plans, corporate team discounts, or custom enterprise terms.",
    icon: CreditCard
  },
  {
    value: "Careers",
    label: "Careers & Open Roles",
    desc: "Application inquiries, developer advocate roles, or internship hubs.",
    icon: Briefcase
  },
  {
    value: "Partnership",
    label: "Universities & Partnerships",
    desc: "Educational curricula licensing or university computing integration.",
    icon: GraduationCap
  }
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Support");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    }, 1500);
  };

  const contactOptions = [
    {
      icon: Mail,
      title: "Support Hub",
      val: "support@codeverse.com",
      desc: "For sandbox errors, billing issues, or accounts."
    },
    {
      icon: MessageSquare,
      title: "Partnerships",
      val: "partners@codeverse.com",
      desc: "Corporate learning tracks or university access."
    },
    {
      icon: MapPin,
      title: "Global Office",
      val: "San Francisco, CA",
      desc: "Remote-first team with hubs in USA and EU."
    }
  ];

  return (
    <>
      <div className="bg-grid" />
      <div className="bg-mesh" />
      <Navbar />

      <main className="min-h-screen pt-32 pb-24 relative z-10 text-white font-sans">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 space-y-16">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Touch</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Have a question about our compiler sandboxes, billing plans, or developer curriculum tracks? We are here to help.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Left Side: Contact Information Cards */}
            <div className="lg:col-span-2 space-y-4">
              {contactOptions.map((opt, idx) => (
                <motion.div
                  key={opt.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-900/40 border border-white/5 p-5 rounded-2xl space-y-3 hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400 shrink-0">
                      <opt.icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-white">{opt.title}</h3>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-emerald-300 font-mono break-all">{opt.val}</p>
                    <p className="text-xs text-slate-400">{opt.desc}</p>
                  </div>
                </motion.div>
              ))}

              {/* FAQ Small banner */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-900/10 border border-white/5 rounded-2xl p-5 text-xs text-slate-400 space-y-2.5"
              >
                <p className="font-bold text-white flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-emerald-400" />
                  Quick Answer Check
                </p>
                <p className="leading-relaxed">
                  For common questions regarding level computations, custom avatars, or profile resets, check the FAQ guides inside our <a href="/journey" className="text-emerald-400 hover:text-emerald-300 underline">Journey Hub Documentation</a> first.
                </p>
              </motion.div>
            </div>

            {/* Right Side: Interactive Form Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3 bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-visible"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400 shadow-lg shadow-emerald-500/5">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Message Sent Successfully!</h3>
                  <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out. A developer support manager will review your submission and contact you within 24 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-lg font-bold mb-2">Send a Message</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Your Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ada Lovelace"
                        className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all font-sans"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ada@computing.org"
                        className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 relative">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Category</label>
                    
                    {/* Custom Dropdown Trigger Button */}
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-slate-950/60 border border-white/5 rounded-xl text-left text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all font-sans"
                    >
                      <div className="flex items-center gap-2.5">
                        {(() => {
                          const activeOpt = CATEGORY_OPTIONS.find(o => o.value === category) || CATEGORY_OPTIONS[0];
                          const Icon = activeOpt.icon;
                          return (
                            <>
                              <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span>{activeOpt.label}</span>
                            </>
                          );
                        })()}
                      </div>
                      <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {isDropdownOpen && (
                        <>
                          {/* Close overlay on backdrop click */}
                          <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                          
                          {/* Dropdown Options List */}
                          <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute left-0 right-0 mt-1.5 z-50 bg-slate-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-2 max-h-80 overflow-y-auto"
                          >
                            <div className="space-y-1">
                              {CATEGORY_OPTIONS.map((opt) => {
                                const Icon = opt.icon;
                                const isSelected = opt.value === category;
                                return (
                                  <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => {
                                      setCategory(opt.value);
                                      setIsDropdownOpen(false);
                                    }}
                                    className={`w-full text-left p-3 rounded-xl flex items-start gap-3 transition-colors ${
                                      isSelected
                                        ? "bg-emerald-500/10 text-white border border-emerald-500/20"
                                        : "text-slate-300 hover:bg-white/[0.03] border border-transparent"
                                    }`}
                                  >
                                    <div className="w-7 h-7 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                                      <Icon className="w-3.5 h-3.5" />
                                    </div>
                                    <div className="space-y-0.5 text-left">
                                      <p className="text-xs font-bold text-white">{opt.label}</p>
                                      <p className="text-[10px] text-slate-500 font-normal leading-normal">{opt.desc}</p>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Message / Request</label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Explain your compiler error, billing inquiry, or partnerships proposal..."
                      className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all font-sans resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:shadow-lg hover:shadow-emerald-500/10 text-white rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span>Sending inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
