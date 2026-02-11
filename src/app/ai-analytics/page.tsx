'use client';

import { motion } from 'framer-motion';
import { BrainCircuit, Cpu, Network, Zap, Lock, BarChart, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AIAnalyticsPage() {
    return (
        <div className="bg-[#020617] min-h-screen text-slate-100 font-sans selection:bg-orange-500/30">
            <main className="pt-32 pb-32">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Header */}
                    <div className="text-center space-y-6 mb-32 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/20 blur-[120px] rounded-full pointer-events-none" />

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-[10px] font-black uppercase tracking-[0.2em] relative z-10"
                        >
                            <Sparkles size={12} />
                            Nexaflow Intelligence Node
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black text-white tracking-tighter relative z-10"
                        >
                            Predictive <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">AI Analytics</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-slate-400 max-w-2xl mx-auto font-medium"
                        >
                            Go beyond basic metrics. Our neural engine analyzes lead behavior, predicts conversion probabilities, and optimizes your workflows in real-time.
                        </motion.p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                        {[
                            {
                                icon: BrainCircuit,
                                title: "Lead Scoring V4",
                                desc: "Our algorithm evaluates 50+ data points to assign a purchase intent score to every captured lead instantly.",
                                color: "orange"
                            },
                            {
                                icon: Network,
                                title: "Pattern Recognition",
                                desc: "Identify hidden trends in your traffic sources and user demographics to double down on what works.",
                                color: "amber"
                            },
                            {
                                icon: Cpu,
                                title: "Automated Decisions",
                                desc: "set rules to automatically route high-value leads to priority sales queues or trigger specific nurture sequences.",
                                color: "red"
                            },
                            {
                                icon: Lock,
                                title: "Privacy First",
                                desc: "Enterprise-grade encryption ensures your proprietary data remains secure while being processed by our AI.",
                                color: "orange"
                            },
                            {
                                icon: BarChart,
                                title: "Revenue Forecasting",
                                desc: "Project future earnings based on current pipeline velocity and historical conversion rates with 94% accuracy.",
                                color: "amber"
                            },
                            {
                                icon: Zap,
                                title: "Real-time Processing",
                                desc: "Zero latency analysis. Insights are generated systematically the moment a user interacts with your platform.",
                                color: "red"
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-[2.5rem] bg-slate-900/50 border border-slate-800/50 hover:border-orange-500/30 transition-all group hover:bg-slate-900"
                            >
                                <div className={`w-14 h-14 rounded-2xl bg-${feature.color}-500/10 flex items-center justify-center text-${feature.color}-500 mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:bg-${feature.color}-500 group-hover:text-white`}>
                                    <feature.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">{feature.title}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-32 p-12 rounded-[3rem] bg-slate-950 border border-slate-800 relative overflow-hidden text-center"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-orange-600/10 to-transparent pointer-events-none" />
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-6 relative z-10">Start Analyzing Today</h2>
                        <p className="text-slate-400 mb-10 max-w-xl mx-auto relative z-10">Unlock the power of data-driven decision making. Join 2,000+ companies scaling with Nexaflow.</p>

                        <div className="flex justify-center gap-6 relative z-10">
                            <Link
                                href="/register"
                                className="px-8 py-4 bg-orange-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-500 transition-all shadow-xl shadow-orange-600/20"
                            >
                                Get Started Free
                            </Link>
                            <Link
                                href="/pricing"
                                className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all"
                            >
                                View Pricing
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
