'use client';

import Link from 'next/link';

export default function Footer() {
    return (
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
    );
}
