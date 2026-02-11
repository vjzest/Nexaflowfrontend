'use client';

import { motion } from 'framer-motion';
import { Check, HelpCircle, ArrowRight, ShieldCheck, Zap, Laptop } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function PricingPage() {
    const [isAnnual, setIsAnnual] = useState(true);

    const plans = [
        {
            name: "Neural Starter",
            price: 0,
            desc: "Perfect for testing Nexaflow's core orchestration logic.",
            features: [
                "100 Leads / Month",
                "Visual Flow Builder",
                "Email Integrations",
                "Community Support",
                "1 Node Instance"
            ],
            cta: "Deploy Free Node",
            highlight: false
        },
        {
            name: "Pro Orchestrator",
            price: isAnnual ? 999 : 1299,
            desc: "For businesses scaling their lead infrastructure.",
            features: [
                "Unlimited Flow Leads",
                "Advanced AI Agents",
                "WhatsApp API + SMS",
                "Priority VIP Support",
                "5 User Nodes",
                "White-label Engine"
            ],
            cta: "Provision Pro",
            highlight: true
        },
        {
            name: "Enterprise Core",
            price: "Custom",
            desc: "Dedicated hardware and custom AI engineering.",
            features: [
                "Isolated Instance",
                "SLA Guarantee (99.99%)",
                "Custom API Adapters",
                "24/7 Strategic Support",
                "Unlimited Node Capacity",
                "On-premise Deployment"
            ],
            cta: "Contact Architecture",
            highlight: false
        }
    ];

    const faqs = [
        {
            q: "How does the lead limit work?",
            a: "We track unique entities flowing through your nodes. On Pro and Enterprise, limits are removed to allow infinite scaling."
        },
        {
            q: "Can I migrate from another CRM?",
            a: "Yes, our universal API adapters can sync with any existing CRM or lead database in minutes."
        },
        {
            q: "Is the AI engine included?",
            a: "Absolutely. Nexaflow's core identity is built on AI orchestration, included in all paid plans."
        },
        {
            q: "Do you offer custom onboarding?",
            a: "Enterprise clients receive a dedicated Solutions Architect for end-to-end setup and optimization."
        }
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-orange-500/30 font-sans">
            {/* Hero */}
            <section className="pt-32 pb-24 px-6 text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-orange-600/5 blur-[120px] rounded-full -mt-64" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6 relative z-10"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-[10px] font-black uppercase tracking-[0.2em]">
                        <ShieldCheck size={14} /> transparent tokenomics
                    </div>
                    <h1 className="text-6xl md:text-7xl font-black tracking-tighter">
                        Investment for <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Growth.</span>
                    </h1>
                    <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                        Scale your business infrastructure with precision. No hidden fees, just pure orchestration power.
                    </p>

                    {/* Toggle */}
                    <div className="flex items-center justify-center gap-6 mt-16 bg-white/5 w-fit mx-auto p-1.5 rounded-2xl border border-white/5 shadow-2xl">
                        <button
                            onClick={() => setIsAnnual(false)}
                            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${!isAnnual ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setIsAnnual(true)}
                            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${isAnnual ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            Yearly <span className="text-[9px] text-orange-200 ml-1 opacity-80">(Save 20%)</span>
                        </button>
                    </div>
                </motion.div>

                {/* Pricing Grid */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 mt-24 relative z-10">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`p-10 rounded-[3rem] relative flex flex-col items-start text-left group transition-all duration-500 ${plan.highlight
                                ? 'bg-slate-900 border-2 border-orange-600/50 shadow-[0_30px_60px_-15px_rgba(234,88,12,0.15)] md:-mt-6'
                                : 'bg-slate-950/50 border border-white/5 hover:border-white/10'
                                }`}
                        >
                            {plan.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-600 to-amber-500 text-white px-6 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-xl">
                                    Strategic Choice
                                </div>
                            )}
                            <div className="mb-10 w-full">
                                <h3 className="text-sm font-black text-slate-500 uppercase tracking-[0.3em] mb-4">{plan.name}</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-black tracking-tighter">
                                        {typeof plan.price === 'number' ? `₹${plan.price}` : plan.price}
                                    </span>
                                    {typeof plan.price === 'number' && <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">/mo</span>}
                                </div>
                                <p className="text-slate-400 text-sm font-medium mt-6 leading-relaxed">{plan.desc}</p>
                            </div>

                            <div className="w-full h-px bg-white/5 mb-10" />

                            <ul className="space-y-5 mb-12 flex-1 w-full">
                                {plan.features.map((f, i) => (
                                    <li key={i} className="flex items-center gap-4 text-xs font-bold text-slate-300">
                                        <div className="w-5 h-5 bg-orange-500/10 rounded-full flex items-center justify-center shrink-0">
                                            <Check size={12} className="text-orange-500" />
                                        </div>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/register"
                                className={`w-full py-5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.2em] text-center transition-all shadow-2xl active:scale-95 ${plan.highlight
                                    ? 'bg-orange-600 text-white hover:bg-orange-500 shadow-orange-600/20'
                                    : 'bg-white text-slate-950 hover:bg-slate-200'
                                    }`}
                            >
                                {plan.cta}
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* FAQ */}
            <section className="py-32 bg-slate-950/50 border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-24 space-y-4">
                        <h2 className="text-4xl font-black tracking-tighter">Query <span className="text-orange-500 text-stroke">Resolution.</span></h2>
                        <p className="text-slate-500 font-medium uppercase tracking-[0.2em] text-[10px]">Answers to common protocol questions</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="group">
                                <h3 className="font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-3 text-slate-200 group-hover:text-orange-500 transition-colors">
                                    <span className="text-orange-500 font-black">Q.</span> {faq.q}
                                </h3>
                                <p className="text-slate-400 text-sm font-medium leading-relaxed pl-7 border-l-2 border-orange-500/10 group-hover:border-orange-500/30 transition-all">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 px-6">
                <div className="max-w-5xl mx-auto rounded-[4rem] bg-gradient-to-br from-slate-900 to-slate-950 border border-white/5 p-20 text-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-600/5 rounded-full blur-[100px] -mr-48 -mt-48" />
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">Still computing <br /> your options?</h2>
                        <p className="text-slate-400 text-lg mb-12 font-medium max-w-xl mx-auto">Our Solutions Architects are available 24/7 to help you design the perfect automation stack for your unique needs.</p>
                        <Link href="mailto:architecture@nexaflow.tech" className="inline-flex items-center gap-3 px-10 py-5 bg-orange-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-orange-500 transition-all shadow-2xl active:scale-95 shadow-orange-600/20">
                            Open Comms Channel
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
