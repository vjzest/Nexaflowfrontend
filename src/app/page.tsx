'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, Users, Shield, BarChart3, ArrowRight, MessageSquare, PhoneCall, Mail, Globe, Cpu, Rocket, CheckCircle2 } from 'lucide-react';
import HeroModern from '@/components/landing/HeroModern';

export default function Home() {
  const features = [
    {
      icon: <Users className="text-orange-500" size={24} />,
      title: "Omni-Channel Capture",
      description: "Capture leads from WhatsApp, Web Forms, and Social API's instantly into a single high-performance dashboard."
    },
    {
      icon: <Cpu className="text-orange-500" size={24} />,
      title: "AI Orchestration",
      description: "Automate complex business logic with intelligent workflows. No code, just raw execution power."
    },
    {
      icon: <Shield className="text-orange-500" size={24} />,
      title: "Hardened Security",
      description: "Military-grade encryption and JWT authentication. Your data is protected by our global security perimeter."
    },
    {
      icon: <BarChart3 className="text-orange-500" size={24} />,
      title: "Conversion Insights",
      description: "Deep-dive into conversion rates and user behavior with real-time telemetry and advanced analytics."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Deploy Instance",
      description: "Connect your domain and authorize our tracking node with a single line of code."
    },
    {
      number: "02",
      title: "Intercept Leads",
      description: "Our AI immediately starts capturing and qualifying every signal from your ecosystem."
    },
    {
      number: "03",
      title: "Automate Flow",
      description: "Nexaflow triggers custom workflows, syncing data to your CRM and notifying your team."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-[family-name:var(--font-geist-sans)] selection:bg-orange-500/30 selection:text-orange-400">

      {/* Hero Section */}
      <HeroModern />

      {/* Process Section */}
      <section id="process" className="py-32 px-6 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-orange-500 font-black uppercase tracking-[0.3em] text-xs">The Infrastructure</h2>
            <p className="text-4xl md:text-6xl font-black tracking-tighter">How Nexaflow Powers Growth</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-[45px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-slate-800 to-transparent z-0" />

            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative z-10 space-y-6 text-center group"
              >
                <div className="w-[90px] h-[90px] bg-slate-900 border border-slate-800 rounded-3xl mx-auto flex items-center justify-center font-black text-3xl text-orange-500 group-hover:border-orange-500/50 transition-all shadow-xl">
                  {step.number}
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-[250px] mx-auto">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 bg-slate-900/30 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto space-y-24 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-4 max-w-2xl text-left">
              <h2 className="text-orange-500 font-black uppercase tracking-[0.3em] text-xs">Core Capabilities</h2>
              <p className="text-4xl md:text-6xl font-black tracking-tighter leading-none">Engineered for <br />Enterprise Speed.</p>
            </div>
            <p className="text-slate-400 font-medium max-w-sm mb-2">Designed to handle millions of events with sub-millisecond latency and absolute reliability.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="p-10 rounded-[2.5rem] bg-slate-900/40 border border-white/5 hover:border-orange-500/30 transition-all group backdrop-blur-sm relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                  <Rocket size={120} />
                </div>
                <div className="mb-8 p-4 bg-orange-500/10 w-fit rounded-2xl group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black mb-4 uppercase tracking-tight">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-orange-600 pointer-events-none opacity-[0.03]" />
        <div className="max-w-5xl mx-auto glass-card rounded-[4rem] p-12 md:p-24 text-center space-y-12 relative border border-white/10 shadow-3xl">
          <div className="space-y-6">
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              className="w-20 h-20 bg-orange-600 rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-orange-600/40"
            >
              <Rocket size={40} className="text-white" />
            </motion.div>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.9]">Ready to Sync <br />Your Success?</h2>
            <p className="text-slate-400 max-w-lg mx-auto text-xl italic font-medium">Join 500+ high-growth teams currently dominating their local markets with Nexaflow.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/register" className="w-full sm:w-auto bg-white text-slate-950 px-12 py-6 rounded-2xl text-xl font-black hover:bg-orange-50 transition-all hover:scale-105 active:scale-95 shadow-2xl flex items-center justify-center gap-3">
              Start Your Flow
              <ArrowRight size={24} />
            </Link>
            <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-500">
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800" />
                ))}
              </div>
              <span>50+ New Seats Today</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
