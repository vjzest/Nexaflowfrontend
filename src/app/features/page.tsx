'use client';

import { motion } from 'framer-motion';
import { Zap, Shield, BarChart3, Users, Globe, Layers, Cpu, Repeat, Lock, Share2, MousePointer2, Clock } from 'lucide-react';

const FEATURE_CARDS = [
    {
        icon: Zap,
        title: "Micro-Orchestration",
        description: "Intelligent workflow routing that adapts to lead behavior in real-time. No more static logic gates.",
        color: "text-orange-500",
        bg: "bg-orange-500/10"
    },
    {
        icon: Shield,
        title: "Neural Verification",
        description: "Multi-layer lead validation using proprietary AI models to ensure 99.9% data accuracy.",
        color: "text-amber-500",
        bg: "bg-amber-500/10"
    },
    {
        icon: BarChart3,
        title: "Predictive Analytics",
        description: "Anticipate conversion bottlenecks before they happen with our 'Flow-Cast' trend engine.",
        color: "text-orange-400",
        bg: "bg-orange-400/10"
    },
    {
        icon: Globe,
        title: "Edge Synchronization",
        description: "Global data propagation in under 50ms. Your leads are everywhere they need to be, instantly.",
        color: "text-amber-400",
        bg: "bg-amber-400/10"
    },
    {
        icon: Cpu,
        title: "AI Automation Hub",
        description: "Connect your entire stack into a single neural network. Nexaflow is the brain of your business.",
        color: "text-orange-600",
        bg: "bg-orange-600/10"
    },
    {
        icon: Lock,
        title: "Quantum Encryption",
        description: "Military-grade security for your proprietary lead data. 256-bit AES encryption at rest and in transit.",
        color: "text-amber-600",
        bg: "bg-amber-600/10"
    }
];

export default function FeaturesPage() {
    return (
        <div className="bg-[#020617] min-h-screen text-slate-100 font-sans selection:bg-orange-500/30">
            <main className="pt-32 pb-32">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Header */}
                    <div className="text-center space-y-6 mb-32">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-xs font-black uppercase tracking-[0.2em]"
                        >
                            <Layers size={14} /> core infrastructure
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-7xl font-black tracking-tighter text-white"
                        >
                            Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 pointer-events-none">Velocity.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-400 text-lg max-w-2xl mx-auto font-medium"
                        >
                            Nexaflow isn't just another automation tool. We've rebuilt the lead lifecycle from the ground up using advanced AI orchestration patterns.
                        </motion.p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {FEATURE_CARDS.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card p-10 rounded-[2.5rem] border border-white/5 hover:border-orange-500/50 transition-all group"
                            >
                                <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                                    <feature.icon className={`${feature.color}`} size={32} />
                                </div>
                                <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed font-medium">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="mt-32 p-16 rounded-[4rem] bg-gradient-to-br from-orange-600 to-amber-600 relative overflow-hidden text-center group"
                    >
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 bg-[length:40px_40px]" />
                        <div className="relative z-10 space-y-8">
                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                                Ready to bypass the <br /> status quo?
                            </h2>
                            <button className="bg-slate-950 text-white px-10 py-5 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-black transition-all shadow-2xl active:scale-95">
                                Start Scaling Now
                            </button>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
