'use client';

import { motion } from 'framer-motion';
import { MousePointer2, Cpu, Zap, Share2, ClipboardCheck, ArrowRight, Activity, Database, Laptop } from 'lucide-react';

const STEPS = [
    {
        icon: MousePointer2,
        title: "Omnichannel Capture",
        desc: "Nexaflow embeds on any platform—web, mobile, or social—trapping high-intent events at the point of origin.",
        accent: "from-orange-500 to-amber-500"
    },
    {
        icon: Cpu,
        title: "Neural Processing",
        desc: "Leads pass through our proprietary AI engine where intent is scored and identity is verified against global databases.",
        accent: "from-amber-500 to-orange-400"
    },
    {
        icon: Database,
        title: "Intelligent Routing",
        desc: "Dynamic load balancing sends valid leads to the right destination—be it your CRM, WhatsApp, or email stack.",
        accent: "from-orange-400 to-amber-300"
    },
    {
        icon: Activity,
        title: "Closed-Loop Sync",
        desc: "Every interaction is tracked and fed back into your dashboard, creating a self-optimizing growth loop.",
        accent: "from-amber-300 to-orange-600"
    }
];

export default function ProcessPage() {
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
                            <Laptop size={14} /> operational lifecycle
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-7xl font-black tracking-tighter text-white"
                        >
                            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Nexaflow</span> Lifecycle.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-400 text-lg max-w-2xl mx-auto font-medium"
                        >
                            From initial click to finalized conversion, see how we orchestrate every millisecond of your lead's journey.
                        </motion.p>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-32 relative">
                        {/* Connecting Line */}
                        <div className="absolute top-0 bottom-0 left-[2rem] md:left-1/2 w-0.5 bg-gradient-to-b from-orange-600/50 via-amber-200/20 to-transparent -translate-x-1/2 hidden md:block" />

                        {STEPS.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className={`flex flex-col md:flex-row items-center gap-16 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                <div className="flex-1 text-center md:text-left">
                                    <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${step.accent} rounded-[2rem] text-white shadow-2xl mb-8`}>
                                        <step.icon size={36} />
                                    </div>
                                    <h3 className="text-4xl font-black text-white mb-6 tracking-tight">{step.title}</h3>
                                    <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-lg">
                                        {step.desc}
                                    </p>
                                </div>
                                <div className="flex-1 hidden md:block">
                                    <div className="aspect-video bg-slate-900/50 border border-white/5 rounded-[3rem] relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-1/2 h-1/2 bg-slate-800 rounded-full animate-pulse border-4 border-white/5 blur-xl" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
