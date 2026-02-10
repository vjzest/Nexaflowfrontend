'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, Users, Shield, BarChart3, ArrowRight, MessageSquare, PhoneCall, Mail, Star, CheckCircle2, TrendingUp, Globe, Lock, Sparkles } from 'lucide-react';
import HeroModern from '@/components/landing/HeroModern';

export default function Home() {
  const features = [
    {
      icon: <Users className="text-orange-500" size={28} />,
      title: "Smart Lead Capture",
      description: "Capture leads from WhatsApp, Web Forms, and Social Media instantly into a single dashboard.",
      gradient: "from-blue-500/10 to-purple-500/10"
    },
    {
      icon: <Zap className="text-orange-500" size={28} />,
      title: "n8n Orchestration",
      description: "Automate complex business logic with n8n workflows. No code, just results.",
      gradient: "from-orange-500/10 to-red-500/10"
    },
    {
      icon: <Shield className="text-orange-500" size={28} />,
      title: "Enterprise Security",
      description: "Bank-grade encryption, JWT authentication, and Cloudflare protection for your data.",
      gradient: "from-green-500/10 to-emerald-500/10"
    },
    {
      icon: <BarChart3 className="text-orange-500" size={28} />,
      title: "Advanced Analytics",
      description: "Track conversion rates, user behavior, and automation success with self-hosted PostHog.",
      gradient: "from-purple-500/10 to-pink-500/10"
    }
  ];

  const stats = [
    { value: "10X", label: "Revenue Growth", icon: <TrendingUp size={20} /> },
    { value: "99.9%", label: "Uptime SLA", icon: <Globe size={20} /> },
    { value: "256-bit", label: "Encryption", icon: <Lock size={20} /> },
    { value: "24/7", label: "Support", icon: <MessageSquare size={20} /> }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-[family-name:var(--font-geist-sans)] selection:bg-orange-600/30 selection:text-orange-500">
      {/* Premium Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500/20 blur-xl group-hover:bg-orange-500/30 transition-all"></div>
              <img src="/logo.jpg" alt="AutoSAAS" className="w-20 h-20 object-contain relative z-10 group-hover:scale-110 transition-transform" />
            </div>
          </motion.div>

          <div className="hidden md:flex items-center space-x-10">
            {[
              { name: 'Features', href: '/features' },
              { name: 'Automation', href: '#automation' },
              { name: 'Pricing', href: '/pricing' },
              { name: 'Docs', href: '/docs' }
            ].map((item, idx) => (
              <motion.a
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                href={item.href}
                className="text-sm font-bold text-slate-400 hover:text-white transition-colors relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4"
          >
            <Link href="/login" className="text-sm font-bold text-slate-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5">
              Sign In
            </Link>
            <Link href="/register" className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-6 py-3 rounded-xl text-sm font-black transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-600/30">
              Get Started
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Modern Hero Section */}
      <HeroModern />

      {/* Stats Bar */}
      <section className="py-16 px-6 border-y border-white/5 bg-slate-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-500/10 text-orange-500 mb-3 group-hover:bg-orange-500 group-hover:text-white transition-all">
                {stat.icon}
              </div>
              <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Premium Features Section */}
      <section id="features" className="py-32 px-6 bg-slate-950 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full mb-6">
              <Sparkles size={16} className="text-orange-500" />
              <span className="text-orange-400 text-xs font-black uppercase tracking-widest">Powerful Features</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Everything You Need to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Dominate Your Market</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Enterprise-grade automation platform designed to scale with your business
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`group p-10 rounded-3xl bg-gradient-to-br ${feature.gradient} border border-white/10 hover:border-orange-500/30 transition-all duration-500 relative overflow-hidden`}
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/10 group-hover:to-transparent transition-all duration-500" />

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900/50 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-500/20 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-4 text-white group-hover:text-orange-500 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-orange-500 font-bold text-sm group-hover:gap-3 transition-all">
                    Learn more <ArrowRight size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-600/20 rounded-full blur-[120px] animate-blob" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] animate-blob animation-delay-2000" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-16 rounded-[3rem] border border-white/10 relative overflow-hidden group"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-transparent to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
              {/* Left Content */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                  </span>
                  <span className="text-orange-400 text-xs font-black uppercase tracking-widest">Limited Beta Access</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-black leading-[1.1] text-white">
                  Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">10X</span> Your Growth?
                </h2>

                <p className="text-slate-400 text-lg leading-relaxed">
                  Join <span className="text-white font-bold">1,000+ businesses</span> using AutoSAAS to capture more leads and automate their success.
                </p>

                <div className="flex items-center gap-8 pt-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 border-2 border-slate-950 flex items-center justify-center text-white font-bold">
                        {String.fromCharCode(65 + i - 1)}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4 fill-orange-500" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-slate-500 text-xs font-bold mt-1">4.9/5 from 500+ reviews</p>
                  </div>
                </div>
              </div>

              {/* Right CTA */}
              <div className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href="/register" className="flex items-center justify-center gap-3 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-10 py-6 rounded-2xl text-xl font-black transition-all shadow-xl shadow-orange-600/30 group w-full">
                    Start Free Trial
                    <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'No Credit Card', icon: '💳' },
                    { label: '14-Day Trial', icon: '⚡' },
                    { label: 'Cancel Anytime', icon: '✓' }
                  ].map((item, idx) => (
                    <div key={idx} className="text-center p-4 bg-slate-900/50 rounded-xl border border-white/5">
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <p className="text-xs font-bold text-slate-400">{item.label}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/5">
                  <p className="text-center text-xs text-slate-500 font-medium">
                    Trusted by startups to Fortune 500 companies
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="relative border-t border-white/5 bg-slate-950">
        {/* Newsletter Section */}
        <div className="border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="glass-card p-12 rounded-3xl border border-white/10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-black text-white mb-3">Stay in the Loop</h3>
                <p className="text-slate-400">Get the latest updates, tips, and exclusive offers delivered to your inbox.</p>
              </div>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-6 py-4 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder:text-slate-600 outline-none focus:border-orange-500/50 transition-all"
                />
                <button className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-8 py-4 rounded-xl font-black transition-all hover:scale-105 active:scale-95">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            {/* Brand Column */}
            <div className="md:col-span-4 space-y-6">
              <div className="flex items-center gap-3">
                <img src="/logo.jpg" alt="AutoSAAS" className="w-24 h-24 object-contain" />
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                Empowering businesses with enterprise-grade automation that's easy to use and scale. Built for the modern web.
              </p>
              <div className="flex items-center gap-3">
                {['X', 'LN', 'IG', 'YT'].map((social) => (
                  <div key={social} className="w-10 h-10 bg-white/5 hover:bg-orange-500 rounded-xl flex items-center justify-center cursor-pointer transition-all text-slate-400 hover:text-white font-bold text-xs group">
                    <span className="group-hover:scale-110 transition-transform">{social}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Product',
                  links: ['Features', 'Integrations', 'Pricing', 'Documentation', 'API Reference']
                },
                {
                  title: 'Company',
                  links: ['About Us', 'Careers', 'Blog', 'Press Kit', 'Partners']
                },
                {
                  title: 'Support',
                  links: ['Help Center', 'Contact Sales', 'System Status', 'Community', 'Security']
                }
              ].map((column, idx) => (
                <div key={idx}>
                  <h4 className="font-black text-white mb-6 text-sm uppercase tracking-widest">{column.title}</h4>
                  <ul className="space-y-3">
                    {column.links.map((link) => (
                      <li key={link}>
                        <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                          <span className="w-0 h-0.5 bg-orange-500 group-hover:w-2 transition-all"></span>
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-600 font-medium">
              © 2026 AutoSAAS. All rights reserved. Built for champions.
            </p>
            <div className="flex items-center gap-6 text-xs text-slate-600 font-medium">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
