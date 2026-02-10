'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, Code, Zap, Shield, Users, BarChart3, ArrowRight, ExternalLink, Search, FileText, Lightbulb } from 'lucide-react';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function DocsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        {
            icon: <Zap size={28} />,
            title: "Getting Started",
            color: "from-orange-500 to-red-500",
            docs: [
                { title: "Quick Start Guide", desc: "Get up and running in 5 minutes", time: "5 min read" },
                { title: "Installation", desc: "Step-by-step installation instructions", time: "10 min read" },
                { title: "Configuration", desc: "Configure your AutoSAAS instance", time: "15 min read" },
            ]
        },
        {
            icon: <Code size={28} />,
            title: "API Reference",
            color: "from-blue-500 to-cyan-500",
            docs: [
                { title: "Authentication", desc: "JWT-based API authentication", time: "8 min read" },
                { title: "REST API", desc: "Complete REST API documentation", time: "20 min read" },
                { title: "Webhooks", desc: "Configure and use webhooks", time: "12 min read" },
            ]
        },
        {
            icon: <Users size={28} />,
            title: "Lead Management",
            color: "from-purple-500 to-pink-500",
            docs: [
                { title: "Lead Capture", desc: "Capture leads from multiple sources", time: "10 min read" },
                { title: "Lead Scoring", desc: "Automatically score and prioritize leads", time: "12 min read" },
                { title: "CRM Integration", desc: "Integrate with popular CRMs", time: "15 min read" },
            ]
        },
        {
            icon: <BarChart3 size={28} />,
            title: "Analytics",
            color: "from-green-500 to-emerald-500",
            docs: [
                { title: "Dashboard Overview", desc: "Understanding your analytics dashboard", time: "8 min read" },
                { title: "Custom Events", desc: "Track custom events with PostHog", time: "10 min read" },
                { title: "Reports", desc: "Generate and export reports", time: "12 min read" },
            ]
        },
        {
            icon: <Shield size={28} />,
            title: "Security",
            color: "from-red-500 to-orange-500",
            docs: [
                { title: "Security Best Practices", desc: "Keep your data secure", time: "15 min read" },
                { title: "User Permissions", desc: "Manage roles and permissions", time: "10 min read" },
                { title: "Data Encryption", desc: "Understanding our encryption", time: "8 min read" },
            ]
        },
        {
            icon: <Lightbulb size={28} />,
            title: "Tutorials",
            color: "from-yellow-500 to-orange-500",
            docs: [
                { title: "Build Your First Workflow", desc: "Create automation workflows", time: "25 min read" },
                { title: "WhatsApp Integration", desc: "Connect WhatsApp to your system", time: "20 min read" },
                { title: "Email Automation", desc: "Automate email campaigns", time: "18 min read" },
            ]
        },
    ];

    const popularDocs = [
        { title: "Authentication Guide", category: "API Reference" },
        { title: "Lead Capture Setup", category: "Lead Management" },
        { title: "First Workflow", category: "Tutorials" },
        { title: "Security Overview", category: "Security" },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white font-[family-name:var(--font-geist-sans)]">
            <Navbar />

            {/* Hero */}
            <section className="pt-40 pb-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-5 py-3 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8"
                    >
                        <BookOpen size={20} className="text-blue-500" />
                        <span className="text-blue-400 text-sm font-black uppercase tracking-widest">Documentation</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black mb-6"
                    >
                        Everything You Need to
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            Master AutoSAAS
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-400 max-w-3xl mx-auto mb-12"
                    >
                        Comprehensive guides, API references, and tutorials to help you build amazing automation workflows.
                    </motion.p>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="max-w-2xl mx-auto"
                    >
                        <div className="relative">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={24} />
                            <input
                                type="text"
                                placeholder="Search documentation..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-16 pr-6 py-5 bg-slate-900/50 border border-white/10 rounded-2xl text-white placeholder:text-slate-600 outline-none focus:border-blue-500/50 transition-all text-lg backdrop-blur-xl"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Popular Docs */}
            <section className="py-12 px-6 bg-slate-900/30">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                        <FileText size={28} className="text-orange-500" />
                        Popular Documentation
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {popularDocs.map((doc, idx) => (
                            <motion.div
                                key={doc.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="p-4 bg-slate-900/50 border border-white/5 hover:border-orange-500/30 rounded-xl transition-all cursor-pointer group"
                            >
                                <p className="font-bold text-sm mb-1 group-hover:text-orange-500 transition-colors">{doc.title}</p>
                                <p className="text-xs text-slate-500">{doc.category}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Documentation Categories */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((category, idx) => (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group p-8 rounded-3xl bg-slate-900/50 border border-white/10 hover:border-blue-500/30 transition-all"
                            >
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                                    {category.icon}
                                </div>

                                <h3 className="text-2xl font-black mb-6">{category.title}</h3>

                                <div className="space-y-4">
                                    {category.docs.map((doc) => (
                                        <div key={doc.title} className="group/doc cursor-pointer">
                                            <div className="flex items-start justify-between gap-3 p-4 rounded-xl hover:bg-white/5 transition-all">
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-sm mb-1 group-hover/doc:text-blue-400 transition-colors flex items-center gap-2">
                                                        {doc.title}
                                                        <ExternalLink size={14} className="opacity-0 group-hover/doc:opacity-100 transition-opacity" />
                                                    </h4>
                                                    <p className="text-xs text-slate-500 mb-2">{doc.desc}</p>
                                                    <p className="text-xs text-slate-600 font-bold">{doc.time}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 pt-6 border-t border-white/5">
                                    <button className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2 group/btn">
                                        View All
                                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-card p-12 rounded-3xl border border-white/10"
                    >
                        <h2 className="text-4xl md:text-5xl font-black mb-6">
                            Can't Find What You're <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Looking For?</span>
                        </h2>
                        <p className="text-xl text-slate-400 mb-8">
                            Our support team is here to help you 24/7. Get in touch and we'll assist you right away.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="mailto:support@autosaas.com" className="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-2xl font-black text-lg transition-all hover:scale-105 shadow-xl shadow-blue-600/30 flex items-center justify-center gap-3">
                                Contact Support
                            </Link>
                            <Link href="/register" className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-lg transition-all hover:bg-white/10">
                                Start Free Trial
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
