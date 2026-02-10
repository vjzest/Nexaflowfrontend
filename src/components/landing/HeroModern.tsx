'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, CheckCircle2, Zap, X, Sparkles, TrendingUp, Users, Shield } from 'lucide-react';

export default function HeroModern() {
    const [showDemo, setShowDemo] = useState(false);

    const floatingIcons = [
        { Icon: Zap, color: 'text-orange-500', delay: 0, position: 'top-20 left-10' },
        { Icon: Users, color: 'text-blue-500', delay: 0.2, position: 'top-40 right-20' },
        { Icon: Shield, color: 'text-green-500', delay: 0.4, position: 'bottom-40 left-20' },
        { Icon: TrendingUp, color: 'text-purple-500', delay: 0.6, position: 'bottom-20 right-10' },
    ];

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-24 pb-20">
            {/* Advanced Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient Orbs */}
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-orange-600/30 via-orange-500/20 to-transparent rounded-full blur-[120px] animate-blob" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-purple-600/20 via-pink-500/10 to-transparent rounded-full blur-[100px] animate-blob animation-delay-2000" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-t from-blue-600/10 to-transparent rounded-full blur-[150px] animate-blob animation-delay-4000" />

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            </div>

            {/* Floating Icons */}
            {floatingIcons.map(({ Icon, color, delay, position }, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.2, 1],
                        rotate: [0, 360],
                        y: [0, -20, 0]
                    }}
                    transition={{
                        opacity: { duration: 3, repeat: Infinity, delay },
                        scale: { duration: 3, repeat: Infinity, delay },
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        y: { duration: 4, repeat: Infinity, delay }
                    }}
                    className={`absolute ${position} hidden lg:block`}
                >
                    <div className={`w-16 h-16 ${color} bg-slate-900/50 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/10`}>
                        <Icon size={28} />
                    </div>
                </motion.div>
            ))}

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="space-y-8 text-center lg:text-left"
                        >
                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-orange-500/10 via-orange-500/5 to-transparent border border-orange-500/20 backdrop-blur-sm"
                            >
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                                </span>
                                <Sparkles size={16} className="text-orange-400" />
                                <span className="text-orange-400 text-xs font-black uppercase tracking-[0.2em]">
                                    Enterprise-Grade AI Automation
                                </span>
                            </motion.div>

                            {/* Main Heading */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-6">
                                    <span className="block text-white mb-2">Scale Your Sales</span>
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 animate-gradient">
                                        On Autopilot.
                                    </span>
                                </h1>
                            </motion.div>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                            >
                                Capture leads, automate follow-ups, and close deals <span className="text-white font-bold">24/7</span> with the world's most powerful AI-driven platform.
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                            >
                                <Link
                                    href="/register"
                                    className="group relative w-full sm:w-auto overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                                    <div className="relative px-10 py-5 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-2xl">
                                        Start Free Trial
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>

                                <button
                                    onClick={() => setShowDemo(true)}
                                    className="w-full sm:w-auto group px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white rounded-2xl font-black text-lg transition-all backdrop-blur-sm flex items-center justify-center gap-3"
                                >
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Play size={16} fill="currentColor" />
                                    </div>
                                    Watch Demo
                                </button>
                            </motion.div>

                            {/* Trust Indicators */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="pt-8 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm"
                            >
                                {[
                                    { icon: CheckCircle2, text: 'No Credit Card' },
                                    { icon: CheckCircle2, text: '14-Day Free Trial' },
                                    { icon: CheckCircle2, text: 'Cancel Anytime' }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-slate-500 font-bold group">
                                        <item.icon size={18} className="text-green-500 group-hover:scale-110 transition-transform" />
                                        <span className="group-hover:text-slate-300 transition-colors">{item.text}</span>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Right Visual - 3D Card Stack */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="relative perspective-1000"
                        >
                            <div className="relative">
                                {/* Main Dashboard Card */}
                                <motion.div
                                    animate={{
                                        y: [0, -10, 0],
                                        rotateZ: [-1, 1, -1]
                                    }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="relative z-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl backdrop-blur-xl"
                                >
                                    {/* Card Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                                                <img src="/logo.jpg" alt="Logo" className="w-12 h-12 object-contain" />
                                            </div>
                                            <div>
                                                <div className="h-3 w-32 bg-slate-700 rounded-full mb-2" />
                                                <div className="h-2 w-20 bg-slate-800 rounded-full" />
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                            <div className="w-3 h-3 rounded-full bg-red-500" />
                                        </div>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        {[
                                            { value: '2,847', label: 'Total Leads', color: 'from-blue-500 to-cyan-500' },
                                            { value: '+45%', label: 'Conversion', color: 'from-green-500 to-emerald-500' },
                                        ].map((stat, idx) => (
                                            <div key={idx} className="p-4 bg-slate-900/50 rounded-2xl border border-slate-700/50">
                                                <div className={`text-2xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                                                    {stat.value}
                                                </div>
                                                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                                                    {stat.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Activity List */}
                                    <div className="space-y-3">
                                        {[1, 2, 3].map((i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.5 + i * 0.1 }}
                                                className="flex items-center justify-between p-4 bg-slate-900/30 rounded-xl border border-slate-700/30 hover:border-orange-500/30 transition-all group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
                                                        {String.fromCharCode(64 + i)}
                                                    </div>
                                                    <div className="space-y-1">
                                                        <div className="h-2 w-28 bg-slate-700 rounded-full" />
                                                        <div className="h-2 w-20 bg-slate-800 rounded-full" />
                                                    </div>
                                                </div>
                                                <div className="px-3 py-1 bg-green-500/20 border border-green-500/30 text-green-400 text-xs rounded-full font-bold">
                                                    Active
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Floating Badge */}
                                    <motion.div
                                        animate={{
                                            y: [-5, 5, -5],
                                            rotate: [-2, 2, -2]
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="absolute -top-4 -right-4 bg-gradient-to-br from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl font-black text-sm shadow-2xl flex items-center gap-2 border border-green-400/50"
                                    >
                                        <TrendingUp size={20} />
                                        +45% Conversion
                                    </motion.div>
                                </motion.div>

                                {/* Background Cards Stack Effect */}
                                <div className="absolute inset-0 -z-10 translate-x-4 translate-y-4 bg-slate-800/50 rounded-3xl border border-slate-700/50 blur-sm" />
                                <div className="absolute inset-0 -z-20 translate-x-8 translate-y-8 bg-slate-800/30 rounded-3xl border border-slate-700/30 blur-md" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {showDemo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-xl bg-slate-950/90"
                        onClick={() => setShowDemo(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-5xl aspect-video bg-slate-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowDemo(false)}
                                className="absolute top-6 right-6 z-10 p-3 bg-slate-950/80 hover:bg-slate-950 text-white rounded-2xl transition-all border border-white/10 hover:scale-110 active:scale-95"
                            >
                                <X size={24} />
                            </button>

                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/IvGmHDrzTmE?autoplay=1"
                                title="AutoSAAS Product Demo"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
