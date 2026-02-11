'use client';

import { motion } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2, ArrowRight, Download, Mail, Calendar, CreditCard, Package, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, Suspense } from 'react';

function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [orderDetails, setOrderDetails] = useState({
        orderId: '',
        amount: '',
        plan: '',
        date: '',
        paymentMethod: ''
    });

    useEffect(() => {
        // Get payment details from URL params or API
        const orderId = searchParams.get('orderId') || `ORD-${Date.now()}`;
        const amount = searchParams.get('amount') || '2,999';
        const plan = searchParams.get('plan') || 'Professional Plan';
        const paymentMethod = searchParams.get('method') || 'Credit Card';

        setOrderDetails({
            orderId,
            amount,
            plan,
            date: new Date().toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }),
            paymentMethod
        });

        // Optional: Send confirmation email via API
        // fetch('/api/payment/send-confirmation', { method: 'POST', body: JSON.stringify({ orderId }) });
    }, [searchParams]);

    const confettiVariants = {
        initial: { scale: 0, rotate: 0 },
        animate: (i: number) => ({
            scale: [0, 1.5, 1],
            rotate: [0, 180, 360],
            y: [0, -100, 0],
            x: [0, (i % 2 === 0 ? 50 : -50), 0],
            opacity: [0, 1, 0],
            transition: {
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 3
            }
        })
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white font-[family-name:var(--font-geist-sans)] flex items-center justify-center px-6 py-12">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-green-600/20 rounded-full blur-[120px] animate-blob" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] animate-blob animation-delay-2000" />

                {/* Floating Confetti */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        custom={i}
                        variants={confettiVariants}
                        initial="initial"
                        animate="animate"
                        className="absolute"
                        style={{
                            left: `${10 + (i * 8)}%`,
                            top: `${20 + (i % 3) * 20}%`,
                        }}
                    >
                        <Sparkles
                            size={24}
                            className={`${i % 3 === 0 ? 'text-green-500' : i % 3 === 1 ? 'text-orange-500' : 'text-blue-500'}`}
                        />
                    </motion.div>
                ))}
            </div>

            <div className="max-w-4xl w-full relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="glass-card p-8 md:p-12 rounded-3xl border border-white/10"
                >
                    {/* Success Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="flex justify-center mb-8"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-green-500/30 blur-2xl rounded-full animate-pulse" />
                            <div className="relative w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
                                <CheckCircle2 size={48} className="text-white" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Success Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-black mb-4">
                            Payment <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Successful!</span>
                        </h1>
                        <p className="text-xl text-slate-400">
                            Thank you for your purchase. Your order has been confirmed.
                        </p>
                    </motion.div>

                    {/* Order Details Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-white/5 mb-8"
                    >
                        <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                            <Package className="text-orange-500" size={28} />
                            Order Details
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Order ID</p>
                                <p className="text-lg font-black text-white font-mono">{orderDetails.orderId}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Amount Paid</p>
                                <p className="text-lg font-black text-green-500">₹{orderDetails.amount}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Plan</p>
                                <p className="text-lg font-black text-white">{orderDetails.plan}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Date</p>
                                <p className="text-lg font-black text-white">{orderDetails.date}</p>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Payment Method</p>
                                <div className="flex items-center gap-2">
                                    <CreditCard size={20} className="text-orange-500" />
                                    <p className="text-lg font-black text-white">{orderDetails.paymentMethod}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="grid md:grid-cols-2 gap-4 mb-8"
                    >
                        <button className="flex items-center justify-center gap-3 bg-slate-900/50 hover:bg-slate-900 border border-white/10 hover:border-orange-500/30 text-white px-6 py-4 rounded-xl font-bold transition-all group">
                            <Download size={20} className="group-hover:scale-110 transition-transform" />
                            Download Invoice
                        </button>
                        <button className="flex items-center justify-center gap-3 bg-slate-900/50 hover:bg-slate-900 border border-white/10 hover:border-orange-500/30 text-white px-6 py-4 rounded-xl font-bold transition-all group">
                            <Mail size={20} className="group-hover:scale-110 transition-transform" />
                            Email Receipt
                        </button>
                    </motion.div>

                    {/* What's Next */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-gradient-to-br from-orange-500/10 to-transparent rounded-2xl p-8 border border-orange-500/20 mb-8"
                    >
                        <h3 className="text-xl font-black mb-4 flex items-center gap-3">
                            <Calendar className="text-orange-500" size={24} />
                            What's Next?
                        </h3>
                        <ul className="space-y-3">
                            {[
                                'Check your email for order confirmation and receipt',
                                'Your account has been upgraded to the selected plan',
                                'Access all premium features from your dashboard',
                                'Our team will reach out within 24 hours for onboarding'
                            ].map((item, idx) => (
                                <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 + idx * 0.1 }}
                                    className="flex items-start gap-3 text-slate-300"
                                >
                                    <CheckCircle2 size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>{item}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link
                            href="/dashboard"
                            className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-8 py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-orange-600/30 group"
                        >
                            Go to Dashboard
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/"
                            className="flex-1 flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-5 rounded-2xl font-black text-lg transition-all backdrop-blur-sm"
                        >
                            Back to Home
                        </Link>
                    </motion.div>

                    {/* Support Note */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-center text-sm text-slate-500 mt-8"
                    >
                        Need help? Contact us at <a href="mailto:support@autosaas.com" className="text-orange-500 hover:text-orange-400 font-bold">support@autosaas.com</a>
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-950 text-white font-[family-name:var(--font-geist-sans)] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-400">Loading payment details...</p>
                </div>
            </div>
        }>
            <PaymentSuccessContent />
        </Suspense>
    );
}
