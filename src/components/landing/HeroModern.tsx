'use client';

import { motion } from 'framer-motion';
import { Play, ArrowRight, Zap, Shield, BarChart3, Users } from 'lucide-react';
import Link from 'next/link';
import BrandLogo from '@/components/brand/BrandLogo';

export default function HeroModern() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden bg-slate-950">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-orange-600/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-0 -right-1/4 w-1/2 h-full bg-amber-600/10 blur-[120px] rounded-full animate-pulse delay-700" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-[length:50px_50px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 w-full">
                <div className="flex flex-col items-center text-center space-y-12">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-[10px] font-black uppercase tracking-[0.2em]"
                    >
                        <BrandLogo size={16} showText={false} className="bg-transparent border-none p-0 shadow-none overflow-visible" />
                        Next-Gen Automation Engine v4.0
                    </motion.div>

                    {/* Headline */}
                    <div className="space-y-6 max-w-5xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter"
                        >
                            Scale Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Revenue Flow</span> <br />
                            with AI Orchestration.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed"
                        >
                            Stop chasing leads. Nexaflow intelligently captures, qualifies, and synchronizes your business growth in real-time.
                        </motion.p>
                    </div>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-6 pt-4 w-full sm:w-auto"
                    >
                        <Link
                            href="/register"
                            className="px-10 py-5 bg-orange-600 hover:bg-orange-500 text-white rounded-2xl text-lg font-black transition-all flex items-center justify-center gap-3 shadow-2xl shadow-orange-600/30 group active:scale-95"
                        >
                            Get Started Free
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button
                            onClick={() => document.getElementById('demo-video')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl text-lg font-black transition-all flex items-center justify-center gap-3 backdrop-blur-md active:scale-95"
                        >
                            Watch Demo
                            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                                <Play size={14} fill="white" className="ml-0.5" />
                            </div>
                        </button>
                    </motion.div>

                    {/* Hero Video Demo */}
                    <motion.div
                        id="demo-video"
                        initial={{ opacity: 0, scale: 0.95, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="w-full max-w-5xl aspect-video rounded-[2.5rem] bg-slate-900 border border-white/10 shadow-[0_0_100px_rgba(249,115,22,0.15)] overflow-hidden relative group mt-20"
                    >
                        {/* Live Tech Video */}
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                        >
                            <source src="https://videos.pexels.com/video-files/853889/853889-hd_1280_720_25fps.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                        {/* Glass Overlay for Depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

                        {/* Video Content Info */}
                        <div className="absolute bottom-10 left-10 text-left p-6 bg-slate-950/40 backdrop-blur-xl rounded-2xl border border-white/5 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-400">Nexaflow Live Node</p>
                            </div>
                            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Autonomous Lead Orchestration</h4>
                        </div>

                        {/* Scanning Effect Overlay */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <motion.div
                                animate={{
                                    y: ['-100%', '200%']
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className="w-full h-[100px] bg-gradient-to-b from-transparent via-orange-500/10 to-transparent skew-y-12"
                            />
                        </div>
                    </motion.div>

                    {/* Social Proof */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="pt-20"
                    >
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8">Trusted by Engineering Teams at</p>
                        <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 grayscale opacity-20 hover:grayscale-0 hover:opacity-100 transition-all">
                            {['Vercel', 'Stripe', 'Supabase', 'Discord', 'Linear'].map(company => (
                                <span key={company} className="text-2xl font-black text-white italic tracking-tighter">{company}</span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
