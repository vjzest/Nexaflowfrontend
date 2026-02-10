'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 group cursor-pointer"
                >
                    <Link href="/" className="relative">
                        <div className="absolute inset-0 bg-orange-500/20 blur-xl group-hover:bg-orange-500/30 transition-all"></div>
                        <img src="/logo.jpg" alt="AutoSAAS" className="w-20 h-20 object-contain relative z-10 group-hover:scale-110 transition-transform" />
                    </Link>
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
    );
}
