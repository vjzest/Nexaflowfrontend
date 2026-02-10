'use client';

import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { register, clearError, getMe } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
            <div className="min-h-screen bg-[#020617] flex items-center justify-center">
                <div className="flex flex-col items-center gap-6">
                    <div className="w-16 h-16 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
                    <p className="text-slate-500 font-black uppercase tracking-widest text-[10px] animate-pulse">Synchronizing Session...</p>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await dispatch(register({ name, email, password }));
        if (register.fulfilled.match(result)) {
            const user = result.payload.user || result.payload;
            if (user.role === 'admin') {
                router.push('/admin');
            } else {
                router.push('/dashboard');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#020617] py-12 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
            <div className="bg-glow" />

            <div className="max-w-md w-full space-y-8 glass-card p-10 rounded-[2.5rem] relative z-10 border border-slate-800/50">
                <div className="text-center">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="mx-auto w-32 h-32 mb-6"
                    >
                        <img src="/logo.jpg" alt="AutoSAAS" className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(249,115,22,0.4)]" />
                    </motion.div>
                    <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
                        Request <span className="text-orange-500">Access</span>
                    </h2>
                    <p className="mt-3 text-sm text-slate-500 font-bold uppercase tracking-widest">
                        Already registered?{' '}
                        <Link href="/login" className="text-orange-500 hover:text-orange-400 transition-colors">
                            Initialize session
                        </Link>
                    </p>
                </div>

                <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <motion.div
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 text-xs font-bold rounded-2xl uppercase tracking-widest text-center"
                        >
                            {error}
                        </motion.div>
                    )}
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Identity Designation</label>
                            <input
                                type="text"
                                required
                                className="w-full px-5 py-4 bg-slate-950/50 border border-slate-800 rounded-2xl text-white outline-none focus:border-orange-500 transition-all font-bold placeholder:text-slate-700"
                                placeholder="Commander Shepard"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Registry Email</label>
                            <input
                                type="email"
                                required
                                className="w-full px-5 py-4 bg-slate-950/50 border border-slate-800 rounded-2xl text-white outline-none focus:border-orange-500 transition-all font-bold placeholder:text-slate-700"
                                placeholder="commander@autosaas.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Generate Access Key</label>
                            <input
                                type="password"
                                required
                                className="w-full px-5 py-4 bg-slate-950/50 border border-slate-800 rounded-2xl text-white outline-none focus:border-orange-500 transition-all font-bold placeholder:text-slate-700"
                                placeholder="Minimum 6 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-5 px-4 bg-orange-600 hover:bg-orange-500 text-white text-xs font-black rounded-2xl transition-all shadow-xl shadow-orange-600/20 uppercase tracking-[0.2em] disabled:opacity-50"
                        >
                            {isLoading ? 'Processing...' : 'Provision Account'}
                        </motion.button>
                    </div>
                </form>
            </div>
        </div>
    );
}
