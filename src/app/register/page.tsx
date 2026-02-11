'use client';

import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { register, clearError, getMe } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import BrandLogo from '@/components/brand/BrandLogo';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const { user, isLoading, isCheckingAuth, error } = useAppSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (!user && isCheckingAuth) {
            dispatch(getMe());
        }
    }, [dispatch, user, isCheckingAuth]);

    useEffect(() => {
        if (user && !isCheckingAuth) {
            router.push('/dashboard');
        }
    }, [user, isCheckingAuth, router]);

    if (isCheckingAuth) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center font-sans text-white">
                <div className="flex flex-col items-center gap-6">
                    <div className="w-16 h-16 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
                    <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">Provisioning Nexaflow Node...</p>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await dispatch(register({ name, email, password }));
        if (register.fulfilled.match(result)) {
            router.push('/dashboard');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#020617] py-12 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden text-white">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px] -ml-64 -mt-64" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[120px] -mr-64 -mb-64" />

            <div className="max-w-md w-full space-y-8 glass-card p-12 rounded-[3rem] relative z-10 border border-white/5 shadow-2xl">
                <div className="text-center">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex justify-center mb-8"
                    >
                        <BrandLogo size={64} showText={false} />
                    </motion.div>
                    <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">
                        Request <span className="text-orange-500">Access</span>
                    </h2>
                    <p className="mt-4 text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                        Provisioning Interface
                        <span className="w-1 h-1 rounded-full bg-slate-800" />
                        <Link href="/login" className="text-orange-500 hover:text-orange-400 transition-colors">
                            Initialize Session
                        </Link>
                    </p>
                </div>

                <form className="mt-12 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <motion.div
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 text-[10px] font-black rounded-2xl uppercase tracking-widest text-center"
                        >
                            {error}
                        </motion.div>
                    )}
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Identity Designation</label>
                            <input
                                type="text"
                                required
                                className="w-full px-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl text-white outline-none focus:border-orange-500/50 transition-all font-bold placeholder:text-slate-800"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Command Email</label>
                            <input
                                type="email"
                                required
                                className="w-full px-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl text-white outline-none focus:border-orange-500/50 transition-all font-bold placeholder:text-slate-800"
                                placeholder="name@nexaflow.tech"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Access Key</label>
                            <input
                                type="password"
                                required
                                className="w-full px-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl text-white outline-none focus:border-orange-500/50 transition-all font-bold placeholder:text-slate-800"
                                placeholder="Min. 6 digits"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-5 px-4 bg-orange-600 hover:bg-orange-500 text-white text-[11px] font-black rounded-2xl transition-all shadow-2xl shadow-orange-600/30 uppercase tracking-[0.2em] disabled:opacity-50"
                        >
                            {isLoading ? 'Processing...' : 'Provision Instance'}
                        </motion.button>
                        <p className="mt-8 text-[9px] text-center text-slate-600 font-bold uppercase tracking-widest leading-relaxed">
                            By provisioning an instance, you agree to our <br />
                            <a href="#" className="underline">Flow Protocols</a> and <span className="underline">Security Standards</span>.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
