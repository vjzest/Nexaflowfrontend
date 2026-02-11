'use client';

import Link from 'next/link';
import { Mail, PhoneCall, MessageSquare, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import BrandLogo from '@/components/brand/BrandLogo';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();

    // Hide footer on dashboard and auth pages
    if (pathname.startsWith('/dashboard') || pathname === '/login' || pathname === '/register') {
        return null;
    }

    return (
        <footer className="bg-slate-950 border-t border-white/5 pt-32 pb-12 px-6 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px] -mr-64 -mt-64" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8">
                    {/* Brand Section */}
                    <div className="space-y-8">
                        <Link href="/" className="transition-transform active:scale-95">
                            <BrandLogo />
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                            Next-generation business automation. We bridge the gap between leads and conversions with AI-driven orchestration and seamless workflows.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Linkedin, Instagram].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-orange-600 hover:text-white text-slate-400 transition-all active:scale-90">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Products */}
                    <div className="space-y-8">
                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-200">Infrastructure</h4>
                        <ul className="space-y-4">
                            {['Lead Capture', 'Automation Hub', 'Workflow Engine'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-sm text-slate-400 hover:text-orange-400 transition-colors">{item}</a>
                                </li>
                            ))}
                            <li>
                                <Link href="/ai-analytics" className="text-sm text-slate-400 hover:text-orange-400 transition-colors">AI Analytics</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-8">
                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-200">Connect</h4>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-sm text-slate-400">
                                <Mail size={16} className="text-orange-500" />
                                hello@nexaflow.tech
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-400">
                                <PhoneCall size={16} className="text-orange-500" />
                                +1 (888) NEXA-FLOW
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-400">
                                <MessageSquare size={16} className="text-orange-500" />
                                24/7 Priority Support
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-8">
                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-200">Stay Updated</h4>
                        <p className="text-sm text-slate-400">Join 2,000+ scaling teams receiving bi-weekly automation insights.</p>
                        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5 focus-within:border-orange-500/50 transition-all">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="bg-transparent border-none outline-none text-sm px-4 py-2 w-full text-white placeholder:text-slate-600"
                            />
                            <button className="bg-orange-600 text-white p-2.5 rounded-xl hover:bg-orange-500 transition-colors">
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-600">
                    <p>© 2026 NEXAFLOW TECHNOLOGIES. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-slate-300">Privacy Policy</a>
                        <a href="#" className="hover:text-slate-300">Terms of Service</a>
                        <a href="#" className="hover:text-slate-300">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
