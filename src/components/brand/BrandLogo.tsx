'use client';

import { motion } from 'framer-motion';

interface BrandLogoProps {
    size?: number;
    showText?: boolean;
    className?: string;
}

export default function BrandLogo({ size = 44, showText = true, className = "" }: BrandLogoProps) {
    return (
        <div className={`flex items-center gap-4 ${className}`}>
            <motion.div
                style={{ width: size, height: size }}
                className="relative flex items-center justify-center p-2 bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-[1.25rem] overflow-hidden shadow-[0_20px_50px_rgba(249,115,22,0.15)] group"
            >
                {/* Dynamic Background Glow */}
                <div className="absolute inset-0 bg-orange-600/5 group-hover:bg-orange-600/10 transition-colors" />
                <motion.div
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-orange-500/10 blur-2xl rounded-full"
                />

                {/* SVG Logo Icon v2 */}
                <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full relative z-10"
                >
                    <defs>
                        <linearGradient id="nexa-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ffedd5" />
                            <stop offset="50%" stopColor="#f97316" />
                            <stop offset="100%" stopColor="#ea580c" />
                        </linearGradient>
                        <filter id="nexa-glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Shadow Path */}
                    <path
                        d="M25 75 V25 L75 75 V25"
                        stroke="#000"
                        strokeWidth="14"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.2"
                        transform="translate(2, 2)"
                    />

                    {/* Main 'N' Path with Animation */}
                    <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, ease: "circOut" }}
                        d="M25 75 V25 L75 75 V25"
                        stroke="url(#nexa-gradient)"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#nexa-glow)"
                    />

                    {/* Floating Tech Orbits */}
                    <motion.circle
                        animate={{
                            y: [0, -4, 0],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        cx="25" cy="25" r="5" fill="#fdba74"
                    />
                    <motion.circle
                        animate={{
                            y: [0, 4, 0],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                        cx="75" cy="75" r="5" fill="#f97316"
                    />

                    {/* Connecting Flow Lines */}
                    <motion.path
                        animate={{
                            opacity: [0, 0.5, 0],
                            pathLength: [0, 1, 1]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        d="M35 45 H65"
                        stroke="#f97316"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                    />
                </svg>
            </motion.div>

            {showText && (
                <div className="flex flex-col -space-y-1">
                    <span className="text-2xl font-black tracking-tighter text-white">
                        Nexa<span className="text-orange-500">flow</span>
                    </span>
                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-500 pl-0.5">Automation Engine</span>
                </div>
            )}
        </div>
    );
}
