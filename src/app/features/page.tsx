'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Zap, Users, Shield, BarChart3, MessageSquare, Workflow, Globe, Lock, RefreshCw, Bell, Sparkles, ArrowRight, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function FeaturesPage() {
    const mainFeatures = [
        {
            icon: <Users size={32} />,
            title: "Smart Lead Capture",
            description: "Capture leads from multiple sources instantly - WhatsApp, web forms, social media, and more. All in one unified dashboard.",
            gradient: "from-blue-500 to-cyan-500",
            features: ["WhatsApp Integration", "Web Forms", "Social Media", "API Access"]
        },
        {
            icon: <Workflow size={32} />,
            title: "n8n Automation",
            description: "Build complex workflows without code using n8n. Connect apps, automate tasks, and scale your operations effortlessly.",
            gradient: "from-purple-500 to-pink-500",
            features: ["Visual Builder", "1000+ Integrations", "Custom Logic", "Error Handling"]
        },
        {
            icon: <Shield size={32} />,
            title: "Enterprise Security",
            description: "Bank-grade encryption, JWT authentication, and Cloudflare protection. Your data is always secure.",
            gradient: "from-green-500 to-emerald-500",
            features: ["256-bit Encryption", "JWT Auth", "Cloudflare", "GDPR Compliant"]
        },
        {
            icon: <BarChart3 size={32} />,
            title: "Advanced Analytics",
            description: "Track every interaction with self-hosted PostHog. Understand user behavior and optimize conversions.",
            gradient: "from-orange-500 to-red-500",
            features: ["Real-time Analytics", "Conversion Tracking", "User Insights", "Custom Events"]
        },
        {
            icon: <MessageSquare size={32} />,
            title: "AI-Powered Chat",
            description: "Automate customer support with intelligent chatbots. Reduce response time and increase satisfaction.",
            gradient: "from-indigo-500 to-purple-500",
            features: ["24/7 Availability", "Natural Language", "Multi-language", "Context Aware"]
        },
        {
            icon: <Bell size={32} />,
            title: "Smart Notifications",
            description: "Stay informed with real-time alerts via email, SMS, and push notifications. Never miss a lead.",
            gradient: "from-pink-500 to-rose-500",
            features: ["Email Alerts", "SMS Notifications", "Push Messages", "Webhooks"]
        }
    ];

    const additionalFeatures = [
        { icon: <Globe />, text: "Multi-Channel Support" },
        { icon: <Lock />, text: "Role-Based Access Control" },
        { icon: <RefreshCw />, text: "Automatic Backups" },
        { icon: <Zap />, text: "Lightning Fast Performance" },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white font-[family-name:var(--font-geist-sans)]">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-40 pb-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-orange-600/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-5 py-3 bg-orange-500/10 border border-orange-500/20 rounded-full mb-8"
                    >
                        <Sparkles size={20} className="text-orange-500" />
                        <span className="text-orange-400 text-sm font-black uppercase tracking-widest">Powerful Features</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black mb-6"
                    >
                        Everything You Need to
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                            Automate Your Success
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-400 max-w-3xl mx-auto mb-12"
                    >
                        Enterprise-grade automation platform with powerful features designed to scale your business without limits.
                    </motion.p>
                </div>
            </section>

            {/* Main Features Grid */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {mainFeatures.map((feature, idx) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group p-8 rounded-3xl bg-slate-900/50 border border-white/10 hover:border-orange-500/30 transition-all duration-500 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/10 group-hover:to-transparent transition-all duration-500" />

                                <div className="relative z-10">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                                        {feature.icon}
                                    </div>

                                    <h3 className="text-2xl font-black mb-4 group-hover:text-orange-500 transition-colors">
                                        {feature.title}
                                    </h3>

                                    <p className="text-slate-400 mb-6 leading-relaxed">
                                        {feature.description}
                                    </p>

                                    <ul className="space-y-2">
                                        {feature.features.map((item) => (
                                            <li key={item} className="flex items-center gap-2 text-sm text-slate-500">
                                                <Check size={16} className="text-green-500" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Additional Features */}
            <section className="py-20 px-6 bg-slate-900/30">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-black text-center mb-16">
                        And Much <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">More</span>
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {additionalFeatures.map((feature, idx) => (
                            <motion.div
                                key={feature.text}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="p-6 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-orange-500/30 transition-all text-center group"
                            >
                                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                                    {feature.icon}
                                </div>
                                <p className="text-sm font-bold text-slate-400 group-hover:text-white transition-colors">
                                    {feature.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-card p-12 rounded-3xl border border-white/10"
                    >
                        <h2 className="text-4xl md:text-5xl font-black mb-6">
                            Ready to Experience These <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Features?</span>
                        </h2>
                        <p className="text-xl text-slate-400 mb-8">
                            Start your 14-day free trial and see how AutoSAAS can transform your business.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/register" className="px-10 py-5 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-2xl font-black text-lg transition-all hover:scale-105 shadow-xl shadow-orange-600/30 flex items-center justify-center gap-3 group">
                                Start Free Trial
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link href="/pricing" className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-lg transition-all hover:bg-white/10">
                                View Pricing
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
