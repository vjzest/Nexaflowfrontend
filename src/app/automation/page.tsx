'use client';

import { motion } from 'framer-motion';
import { Zap, Workflow, Bot, MessageSquare, ArrowRight, Share2, ShieldCheck, Cpu } from 'lucide-react';
import Link from 'next/link';

export default function AutomationPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-orange-500/30">
            {/* Navigation (Simple Header for sub-pages) */}
            <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-50">
                <Link href="/" className="text-2xl font-black tracking-tighter text-orange-600">
                    AutoSAAS.
                </Link>
                <div className="flex gap-4">
                    <Link href="/login" className="px-4 py-2 text-sm font-bold text-slate-300 hover:text-white transition-colors">
                        Login
                    </Link>
                    <Link href="/register" className="px-6 py-2 bg-white text-slate-950 rounded-full text-sm font-bold hover:bg-orange-50 transition-colors">
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-slate-950 to-slate-950" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-bold uppercase tracking-widest text-[10px] mb-8">
                            <Zap size={14} />
                            <span>Powered by n8n & OpenAI</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight">
                            Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Superhuman</span> Workflows.
                        </h1>
                        <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
                            Connect your favorite apps, automate mundane tasks, and let AI handle the complex logic. No coding required.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/register" className="px-8 py-4 bg-orange-600 text-white rounded-full font-bold text-lg hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/25 flex items-center justify-center gap-2">
                                Start Building Free <ArrowRight size={20} />
                            </Link>
                            <Link href="/pricing" className="px-8 py-4 bg-slate-900 text-white border border-slate-800 rounded-full font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center">
                                View Pricing
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-slate-950">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Workflow,
                                title: "Visual Workflow Builder",
                                desc: "Drag and drop nodes to create complex automations. Connect distinct apps with n8n-powered reliability."
                            },
                            {
                                icon: Bot,
                                title: "AI Decision Agents",
                                desc: "Inject GPT-4 intelligence into any step. Analyze leads, summarize emails, or categorize support tickets automatically."
                            },
                            {
                                icon: Share2,
                                title: "Webhook Triggers",
                                desc: "Instantly capture data from any source—forms, CRMs, or custom scripts—using our robust webhook infrastructure."
                            },
                            {
                                icon: MessageSquare,
                                title: "Multi-Channel Messaging",
                                desc: "Send WhatsApp, SMS, and Email notifications seamlessly. Engage customers where they are."
                            },
                            {
                                icon: ShieldCheck,
                                title: "Enterprise Security",
                                desc: "Bank-grade encryption, role-based access control, and dedicated execution environments for every tenant."
                            },
                            {
                                icon: Cpu,
                                title: "Serverless Execution",
                                desc: "Forget about infrastructure. Our auto-scaling engine handles millions of executions without breaking a sweat."
                            }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-orange-500/50 transition-colors group"
                            >
                                <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform">
                                    <feature.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Code / Visual Section */}
            <section className="py-24 bg-slate-900 border-y border-slate-800">
                <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 space-y-8">
                        <h2 className="text-4xl font-black tracking-tight">
                            Developers Love It.<br />
                            <span className="text-orange-500">Businesses Need It.</span>
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Whether you're a developer writing custom JS middleware or a business owner needing simple auto-responders, AutoSAAS adapts to your skill level.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Write custom JavaScript nodes when you need raw power.",
                                "Use pre-built integrations for 200+ popular services.",
                                "Debug in real-time with detailed execution logs."
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 font-medium text-slate-300">
                                    <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1 w-full max-w-xl">
                        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 font-mono text-sm shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-purple-600" />
                            <div className="flex gap-2 mb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>
                            <div className="space-y-2 text-slate-400">
                                <p><span className="text-purple-400">const</span> workflow = <span className="text-blue-400">new</span> Workflow();</p>
                                <p className="pl-4">
                                    <span className="text-purple-400">await</span> workflow.<span className="text-yellow-400">trigger</span>(<span className="text-green-400">'new_lead'</span>, (data) =&gt; {'{'}
                                </p>
                                <p className="pl-8">
                                    <span className="text-slate-500">// AI Lead Scoring</span>
                                </p>
                                <p className="pl-8">
                                    <span className="text-purple-400">const</span> score = <span className="text-purple-400">await</span> ai.<span className="text-blue-400">evaluate</span>(data);
                                </p>
                                <p className="pl-8">
                                    <span className="text-purple-400">if</span> (score &gt; 80) {'{'}
                                </p>
                                <p className="pl-12">
                                    <span className="text-slate-500">// Instant High-Value Alert</span>
                                </p>
                                <p className="pl-12">
                                    <span className="text-purple-400">return</span> sms.<span className="text-blue-400">send</span>(<span className="text-green-400">`HOT LEAD: {'${data.name}'}`</span>);
                                </p>
                                <p className="pl-8">{'}'}</p>
                                <p className="pl-4">{'}'});</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Automate?</h2>
                    <p className="text-xl text-slate-400 mb-10">Join thousands of businesses scaling their operations with AutoSAAS.</p>
                    <Link href="/register" className="inline-block px-10 py-5 bg-white text-slate-950 rounded-full font-bold text-xl hover:bg-orange-50 transition-all shadow-xl hover:scale-105">
                        Get Started Now
                    </Link>
                </div>
            </section>
        </div>
    );
}
