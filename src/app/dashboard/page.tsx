'use client';

import { useState, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchLeads, updateLeadStatus } from '@/redux/slices/leadSlice';
import { logout, updateProfile, getMe } from '@/redux/slices/authSlice';
import { fetchWebsites, fetchLogs, addWebsite, deleteWebsite } from '@/redux/slices/appSlice';
import { fetchAdminStats, fetchAllUsers, updateUserPlan } from '@/redux/slices/adminSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut, Users, Zap, BarChart3, Settings, CreditCard, Copy, CheckCircle, RefreshCcw, Download, Globe, FileText, Phone, ChevronRight, LayoutDashboard, X, ShieldCheck, Activity, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PricingSection from '@/components/dashboard/PricingSection';
import AnalyticsChart from '@/components/dashboard/AnalyticsChart';
import RevenueChart from '@/components/admin/RevenueChart';
import BrandLogo from '@/components/brand/BrandLogo';


// ... (imports remain same)

export default function DashboardPage() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { user, isLoading: loginLoading, isCheckingAuth } = useAppSelector((state) => state.auth);
    const { leads, isLoading: leadsLoading } = useAppSelector((state) => state.leads);
    const { items: websites } = useAppSelector((state) => state.websites);
    const { items: logs } = useAppSelector((state) => state.logs);
    const { stats: adminStats, users: adminUsers } = useAppSelector((state) => state.admin);

    const [activeTab, setActiveTab] = useState<'leads' | 'billing' | 'websites' | 'logs' | 'settings' | 'admin-stats' | 'admin-users'>('leads');
    const [isAddWebsiteModalOpen, setIsAddWebsiteModalOpen] = useState(false);
    const [newWebsite, setNewWebsite] = useState({ name: '', url: '' });
    const [profileData, setProfileData] = useState({ name: user?.name || '' });
    const [isSubmittingSite, setIsSubmittingSite] = useState(false);
    const [selectedWebsiteForGuide, setSelectedWebsiteForGuide] = useState<any>(null);

    // Generate dynamic trend data from leads
    const trendData = useMemo(() => {
        if (!leads) return [];
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (6 - i));
            return d.toISOString().split('T')[0];
        });

        return last7Days.map(date => {
            const dayLeads = leads.filter((l: any) => new Date(l.createdAt).toISOString().startsWith(date)).length;
            return {
                name: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
                leads: dayLeads
            };
        });
    }, [leads]);

    useEffect(() => {
        if (user) setProfileData({ name: user.name });
    }, [user]);

    useEffect(() => {
        // If still checking auth, do nothing
        if (isCheckingAuth) return;

        // After check is done, if no user, redirect
        if (!user) {
            router.push('/login');
            return;
        }

        if (user) {
            // Fetch basic data
            dispatch(fetchLeads());
            dispatch(fetchWebsites());
            dispatch(fetchLogs());

            // If admin, fetch specific admin data
            if (user.role === 'admin') {
                dispatch(fetchAdminStats());
                dispatch(fetchAllUsers());
            }
        }
    }, [dispatch, user, router, isCheckingAuth]);

    // Initial check on mount
    useEffect(() => {
        if (!user && isCheckingAuth) {
            dispatch(getMe());
        }
    }, [dispatch, user]);

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

    if (!user) return null;


    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('API Key copied to clipboard!');
    };

    const handleAddWebsite = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSubmittingSite(true);
            const resultAction = await dispatch(addWebsite(newWebsite));
            if (addWebsite.fulfilled.match(resultAction)) {
                setIsAddWebsiteModalOpen(false);
                setNewWebsite({ name: '', url: '' });
            } else {
                alert(resultAction.payload as string || 'Failed to add website');
            }
        } catch (error) {
            alert('An unexpected error occurred');
        } finally {
            setIsSubmittingSite(false);
        }
    };

    const handleDeleteWebsite = async (id: string) => {
        if (confirm('Are you sure you want to delete this website?')) {
            await dispatch(deleteWebsite(id));
        }
    };

    const handleUpdateProfile = async () => {
        await dispatch(updateProfile(profileData));
        alert('Profile updated successfully!');
    };

    const handleLogout = async () => {
        try {
            await dispatch(logout()).unwrap();
            router.push('/login');
        } catch (error) {
            router.push('/login');
        }
    };

    const exportToCSV = () => {
        if (leads.length === 0) return;
        const headers = ['Name', 'Email', 'Phone', 'Source', 'Status', 'Date'];
        const csvRows = [
            headers.join(','),
            ...leads.map(lead => [
                lead.name,
                lead.email,
                lead.phone,
                lead.source,
                lead.status,
                new Date(lead.createdAt).toLocaleDateString()
            ].join(','))
        ];
        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `leads_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlePlanUpdate = async (userId: string, plan: string) => {
        await dispatch(updateUserPlan({ userId, plan }));
    };


    return (
        <div className="h-screen overflow-hidden bg-[#020617] text-slate-100 flex font-sans selection:bg-orange-500/30">
            <div className="bg-glow" />

            {/* Sidebar */}
            <aside className="w-72 h-full bg-slate-950/40 backdrop-blur-xl border-r border-slate-800/50 flex flex-col z-20 overflow-hidden">
                <div className="p-8">
                    <Link href="/" className="transition-transform active:scale-95">
                        <BrandLogo />
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto pt-4">
                    <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Main Menu</p>
                    {[
                        { id: 'leads', icon: Users, label: 'Lead Management' },
                        { id: 'websites', icon: Globe, label: 'Tracking Sites' },
                        { id: 'logs', icon: FileText, label: 'Automation Logs' },
                        ...(user?.role === 'admin' ? [
                            { id: 'admin-stats', icon: LayoutDashboard, label: 'System Overview' },
                            { id: 'admin-users', icon: ShieldCheck, label: 'User Management' }
                        ] : []),
                        { id: 'billing', icon: CreditCard, label: 'Billing & Plans' },
                        { id: 'settings', icon: Settings, label: 'Account Settings' }
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id as any)}
                            className={`flex items-center justify-between group p-3.5 w-full rounded-2xl transition-all duration-300 relative overflow-hidden ${activeTab === item.id
                                ? 'bg-orange-500/10 text-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.1)]'
                                : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200'
                                }`}
                        >
                            <div className="flex items-center space-x-3.5 z-10 transition-transform duration-300 group-hover:translate-x-1">
                                <item.icon size={20} className={activeTab === item.id ? 'text-orange-500' : 'text-slate-500 group-hover:text-slate-300'} />
                                <span className="font-bold tracking-tight">{item.label}</span>
                            </div>
                            {activeTab === item.id && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-orange-500 rounded-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <ChevronRight size={14} className={`opacity-0 group-hover:opacity-100 transition-all duration-300 ${activeTab === item.id ? 'text-orange-500' : 'text-slate-600'}`} />
                        </button>
                    ))}
                </nav>

                <div className="p-6 mt-auto">
                    <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-800/50 mb-6 group cursor-pointer hover:border-orange-500/30 transition-colors">
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 text-xs font-black uppercase">
                                {user?.plan ? user.plan[0].toUpperCase() : 'F'}
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Your Plan</p>
                                <p className="text-xs font-bold text-white mt-0.5">
                                    {user?.plan ? (user.plan.charAt(0).toUpperCase() + user.plan.slice(1)) + ' Plan' : 'Free Plan'}
                                </p>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-2.5 bg-slate-950/50 hover:bg-slate-900 border border-slate-800 text-[10px] font-black text-white uppercase tracking-widest rounded-xl transition-all"
                        >
                            {user?.plan === 'free' ? 'Upgrade Now' : 'Manage Plan'}
                        </motion.button>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 p-4 w-full text-slate-500 hover:text-red-500 hover:bg-red-500/5 rounded-2xl transition-all duration-300 font-bold group"
                    >
                        <LogOut size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>


            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
                <header className="h-24 bg-slate-950/20 backdrop-blur-xl border-b border-slate-800/50 flex items-center justify-between px-10 z-10">
                    <div className="flex items-center space-x-4">
                        <div className="p-2 bg-slate-900/50 rounded-lg border border-slate-800">
                            <LayoutDashboard size={20} className="text-orange-500" />
                        </div>
                        <div>
                            <h2 className="text-sm font-black text-slate-500 uppercase tracking-[0.2em] leading-none">Console</h2>
                            <h3 className="text-lg font-bold text-white mt-1 capitalize">{activeTab}</h3>
                        </div>
                    </div>

                    <div className="flex items-center space-x-8">
                        <div className="hidden lg:flex items-center space-x-4 bg-slate-900/40 px-4 py-2 rounded-2xl border border-slate-800/50">
                            <div className="flex flex-col items-end">
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Master API Key</p>
                                <code className="text-xs font-mono text-orange-400 mt-0.5">
                                    {user?.apiKey ? `${user.apiKey.substring(0, 8)}...${user.apiKey.substring(user.apiKey.length - 4)}` : '••••••••••••'}
                                </code>
                            </div>
                            <button
                                onClick={() => copyToClipboard(user?.apiKey || '')}
                                className="p-2 transition-all duration-300 transform active:scale-95 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl"
                                title="Copy API Key"
                            >
                                <Copy size={16} />
                            </button>
                        </div>
                        <div className="group relative cursor-pointer">
                            <div className="h-11 w-11 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-white font-black shadow-xl shadow-orange-600/20 group-hover:rotate-6 group-hover:scale-105 transition-all duration-300">
                                {user?.name?.[0] || 'A'}
                            </div>
                            <div className="absolute right-0 top-full mt-2 w-48 bg-slate-900 border border-slate-800 rounded-2xl p-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-2xl z-50">
                                <div className="px-3 py-2 border-b border-slate-800 mb-1">
                                    <p className="text-xs font-bold text-white">{user?.name}</p>
                                    <p className="text-[10px] text-slate-500 italic truncate">{user?.email}</p>
                                </div>
                                <button onClick={() => setActiveTab('settings')} className="w-full text-left px-3 py-2 text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors">Profile Settings</button>
                                <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-500/10 rounded-xl transition-colors">Sign Out</button>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto px-10 py-8 relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="space-y-8 pb-12"
                        >
                            {activeTab === 'leads' && (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {[
                                            { label: 'Total Leads', value: leads.length, icon: Users, color: 'orange' },
                                            { label: 'Automated', value: leads.filter(l => l.status === 'processed').length, icon: CheckCircle, color: 'green' },
                                            { label: 'Pending', value: leads.filter(l => l.status === 'pending').length, icon: RefreshCcw, color: 'blue' }
                                        ].map((stat, i) => (
                                            <motion.div
                                                key={stat.label}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="glass-card p-8 rounded-[2.5rem] flex items-center gap-7 group relative overflow-hidden"
                                            >
                                                <div className="absolute top-0 left-0 w-full h-1 transition-all duration-500 group-hover:h-full bg-gradient-to-b from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100" />
                                                <div className={`p-5 bg-${stat.color}-500/10 text-${stat.color}-500 rounded-3xl group-hover:bg-${stat.color}-500 group-hover:text-white transition-all duration-500 group-hover:rotate-6 shadow-lg shadow-${stat.color}-500/5`}>
                                                    <stat.icon size={28} />
                                                </div>
                                                <div className="relative z-10">
                                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                                                    <h4 className="text-4xl font-black text-white mt-1 cursor-default tabular-nums">
                                                        {stat.value}
                                                    </h4>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                                        <div className="xl:col-span-2 glass-card p-10 rounded-[2.5rem]">
                                            <div className="flex items-center justify-between mb-8">
                                                <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                                                    <div className="w-2 h-6 bg-orange-500 rounded-full" />
                                                    Lead Acquisition Trends
                                                </h3>
                                                <div className="flex gap-2">
                                                    {['7D', '1M', '3M'].map(p => (
                                                        <button key={p} className={`px-4 py-1.5 rounded-full text-[10px] font-black transition-all ${p === '7D' ? 'bg-orange-500 text-white shadow-lg shadow-orange-600/20' : 'bg-slate-900/50 text-slate-500 hover:text-white'}`}>{p}</button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="h-[340px] w-full">
                                                <AnalyticsChart
                                                    data={trendData}
                                                    dataKey="leads"
                                                    color="#f97316"
                                                />
                                            </div>
                                        </div>

                                        {/* Activity or something else */}
                                        <div className="glass-card p-10 rounded-[2.5rem] flex flex-col">
                                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-8">System Health</h3>
                                            <div className="flex-1 flex flex-col justify-center space-y-8">
                                                {[
                                                    { label: 'API Connection', val: 100, color: 'green' },
                                                    { label: 'Success Rate', val: 98.4, color: 'orange' },
                                                    { label: 'Response Time', val: '240ms', color: 'blue' }
                                                ].map(h => (
                                                    <div key={h.label} className="space-y-3">
                                                        <div className="flex justify-between items-baseline">
                                                            <span className="text-xs font-bold text-slate-500">{h.label}</span>
                                                            <span className={`text-sm font-black text-${h.color}-500`}>{h.val}{typeof h.val === 'number' ? '%' : ''}</span>
                                                        </div>
                                                        <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: typeof h.val === 'number' ? `${h.val}%` : '70%' }}
                                                                className={`h-full bg-${h.color}-500 shadow-[0_0_10px_rgba(var(--color-${h.color}-500),0.5)]`}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="pt-8 border-t border-slate-800/50 mt-8">
                                                <button className="w-full py-4 bg-slate-900/50 hover:bg-slate-800 border border-slate-800/50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">View detailed metrics</button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Recent Leads Table */}
                                    <div className="glass-card rounded-[2.5rem] overflow-hidden">
                                        <div className="p-8 border-b border-slate-800/50 flex justify-between items-center bg-slate-950/20">
                                            <div className="space-y-1">
                                                <h3 className="text-lg font-bold text-white">Capture Stream</h3>
                                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Real-time Lead Activity</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="px-4 py-1.5 bg-slate-900/50 border border-slate-800/50 rounded-full text-[10px] text-slate-400 font-black tracking-widest uppercase">
                                                    {leads.length} Records Found
                                                </span>
                                                <button
                                                    onClick={exportToCSV}
                                                    className="flex items-center gap-2.5 bg-white text-black px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all transform active:scale-95 shadow-lg shadow-white/5"
                                                >
                                                    <Download size={16} />
                                                    Export Logs
                                                </button>
                                            </div>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left">
                                                <thead className="bg-slate-950/40 text-slate-500 text-[9px] uppercase font-black tracking-[0.2em]">
                                                    <tr>
                                                        <th className="px-8 py-5">Full Name</th>
                                                        <th className="px-8 py-5">Point of Contact</th>
                                                        <th className="px-8 py-5">Origin</th>
                                                        <th className="px-8 py-5">Verification</th>
                                                        <th className="px-8 py-5">Intent Score</th>
                                                        <th className="px-8 py-5 text-right">Timestamp</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-800/30">
                                                    {leadsLoading ? (
                                                        <tr>
                                                            <td colSpan={6} className="px-8 py-20 text-center text-slate-500 font-bold animate-pulse uppercase tracking-widest">Streaming leads...</td>
                                                        </tr>
                                                    ) : leads.length === 0 ? (
                                                        <tr>
                                                            <td colSpan={6} className="px-8 py-24 text-center">
                                                                <div className="flex flex-col items-center gap-4">
                                                                    <div className="w-16 h-16 bg-slate-900/50 rounded-full flex items-center justify-center text-slate-700">
                                                                        <Users size={32} />
                                                                    </div>
                                                                    <p className="text-slate-500 font-bold">No leads synchronized yet.</p>
                                                                    <button className="text-[10px] font-black text-orange-500 uppercase tracking-widest border-b border-orange-500/30 pb-0.5">Integrate Documentation</button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ) : leads.map((lead, i) => (
                                                        <motion.tr
                                                            key={lead._id}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: i * 0.05 }}
                                                            className="hover:bg-slate-800/20 transition-all duration-300 group"
                                                        >
                                                            <td className="px-8 py-6 font-bold text-slate-100 group-hover:text-orange-500 transition-colors uppercase tracking-tight">{lead.name}</td>
                                                            <td className="px-8 py-6">
                                                                <div className="flex flex-col">
                                                                    <a href={`tel:${lead.phone}`} className="text-xs font-bold text-slate-300 hover:text-orange-400 transition-colors flex items-center gap-1">
                                                                        <Phone size={10} /> {lead.phone}
                                                                    </a>
                                                                    <a href={`mailto:${lead.email}`} className="text-[10px] text-slate-600 font-medium group-hover:text-slate-500 transition-colors hover:underline">
                                                                        {lead.email}
                                                                    </a>
                                                                </div>
                                                            </td>
                                                            <td className="px-8 py-6">
                                                                <span className="px-3 py-1 bg-slate-900/50 border border-slate-800/50 text-slate-400 text-[9px] rounded-lg uppercase font-black tracking-widest group-hover:bg-slate-800 transition-colors">
                                                                    {lead.source}
                                                                </span>
                                                            </td>
                                                            <td className="px-8 py-6">
                                                                <div className="flex items-center gap-2.5 relative group/status">
                                                                    <div className={`w-1.5 h-1.5 rounded-full ${lead.status === 'processed' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-orange-500 animate-pulse'}`} />
                                                                    <select
                                                                        value={lead.status}
                                                                        onChange={(e) => dispatch(updateLeadStatus({ id: lead._id, status: e.target.value }))}
                                                                        className="bg-transparent text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer hover:text-white transition-colors appearance-none pr-4"
                                                                        style={{ color: lead.status === 'processed' ? '#22c55e' : '#f97316' }}
                                                                    >
                                                                        <option value="new">New</option>
                                                                        <option value="contacted">Contacted</option>
                                                                        <option value="processed">Processed</option>
                                                                        <option value="lost">Lost</option>
                                                                    </select>
                                                                </div>
                                                            </td>
                                                            <td className="px-8 py-6">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="h-1.5 w-12 bg-slate-900 rounded-full overflow-hidden">
                                                                        <div
                                                                            className={`h-full ${lead.aiScore && lead.aiScore > 7 ? 'bg-green-500' : 'bg-slate-700'}`}
                                                                            style={{ width: `${(lead.aiScore || 0) * 10}%` }}
                                                                        />
                                                                    </div>
                                                                    <span className={`text-xs font-black tabular-nums ${lead.aiScore && lead.aiScore > 7 ? 'text-green-500' : 'text-slate-500'}`}>
                                                                        {lead.aiScore || 'N/A'}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td className="px-8 py-6 text-right text-[10px] font-mono font-bold text-slate-700 group-hover:text-slate-500 transition-colors">
                                                                {new Date(lead.createdAt).toLocaleDateString()}
                                                            </td>
                                                        </motion.tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </>
                            )}
                            {activeTab === 'websites' && (
                                <div className="space-y-10">
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-2">
                                            <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Your Ecosystem</h3>
                                            <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.2em]">Manage your connected domains</p>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setIsAddWebsiteModalOpen(true)}
                                            className="bg-orange-600 text-white px-8 py-3.5 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] hover:bg-orange-500 transition-all shadow-xl shadow-orange-600/20"
                                        >
                                            Connect New Site
                                        </motion.button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {websites.length === 0 ? (
                                            <div className="col-span-2 p-20 glass-card rounded-[3rem] text-center border-dashed">
                                                <div className="inline-flex p-6 bg-slate-900/50 text-slate-600 rounded-3xl mb-6">
                                                    <Globe size={48} />
                                                </div>
                                                <h4 className="text-xl font-bold text-slate-300 mb-2">No domains discovered</h4>
                                                <p className="text-slate-500 max-w-sm mx-auto text-sm">Add your first domain to begin capturing leads with AI-powered insights.</p>
                                            </div>
                                        ) : (
                                            websites.map((site: any, i: number) => (
                                                <motion.div
                                                    key={site._id}
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    className="glass-card p-10 rounded-[2.5rem] relative group"
                                                >
                                                    <div className="flex justify-between items-start mb-8">
                                                        <div className="space-y-2">
                                                            <h4 className="font-black text-xl text-white group-hover:text-orange-500 transition-colors uppercase tracking-tight">{site.name}</h4>
                                                            <div className="flex items-center space-x-2 text-slate-500 group-hover:text-slate-400 transition-colors">
                                                                <Globe size={14} />
                                                                <p className="text-xs font-mono">{site.url}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col items-end gap-3">
                                                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${site.isActive ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                                                                {site.isActive ? 'Active' : 'Inactive'}
                                                            </span>
                                                            <button
                                                                onClick={() => handleDeleteWebsite(site._id)}
                                                                className="text-[9px] text-slate-600 hover:text-red-500 font-black uppercase tracking-widest transition-colors flex items-center gap-1.5"
                                                            >
                                                                Terminate Connection
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="pt-8 border-t border-slate-800/50 flex items-center justify-between">
                                                        <div className="space-y-1">
                                                            <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Instance Token</p>
                                                            <div className="flex items-center gap-3">
                                                                <code className="text-xs bg-slate-950 px-3 py-1.5 rounded-xl text-orange-400 font-mono border border-slate-800/50">{site.apiKey?.substring(0, 12)}...</code>
                                                                <button onClick={() => copyToClipboard(site.apiKey)} className="p-2 bg-slate-900/50 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
                                                                    <Copy size={14} />
                                                                </button>
                                                                <button
                                                                    onClick={() => setSelectedWebsiteForGuide(site)}
                                                                    className="ml-auto px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-300 border border-white/5 transition-all"
                                                                >
                                                                    Setup Integration
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => setActiveTab('leads')}
                                                            className="px-5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-slate-800 transition-all"
                                                        >
                                                            Analytics
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'logs' && (
                                <div className="glass-card rounded-[2.5rem] overflow-hidden">
                                    <div className="p-10 border-b border-slate-800/50 flex justify-between items-center bg-slate-950/20">
                                        <div className="space-y-1">
                                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Event Logs</h3>
                                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">System Execution History</p>
                                        </div>
                                        <button className="p-3 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-all">
                                            <RefreshCcw size={18} />
                                        </button>
                                    </div>
                                    <div className="divide-y divide-slate-800/30">
                                        {logs.length === 0 ? (
                                            <div className="p-20 text-center text-slate-500 font-bold uppercase tracking-[0.2em] text-xs">No execution signals recorded</div>
                                        ) : (
                                            logs.map((log: any, i: number) => (
                                                <motion.div
                                                    key={log._id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.03 }}
                                                    className="p-6 px-10 flex items-center justify-between hover:bg-slate-800/20 transition-all duration-300 group"
                                                >
                                                    <div className="flex items-center gap-6">
                                                        <div className={`p-4 rounded-2xl ${log.status === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'} group-hover:scale-110 transition-transform`}>
                                                            {log.type === 'lead_capture' ? <Users size={20} /> : <Zap size={20} />}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-slate-200 group-hover:text-white transition-colors">{log.message}</p>
                                                            <p className="text-[10px] text-slate-500 font-mono mt-0.5">{new Date(log.createdAt).toLocaleString()}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${log.status === 'success' ? 'text-green-500 border-green-500/20' : 'text-red-500 border-red-500/20'}`}>
                                                            {log.status}
                                                        </span>
                                                        <ChevronRight size={16} className="text-slate-800 group-hover:text-slate-600 group-hover:translate-x-1 transition-all" />
                                                    </div>
                                                </motion.div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'admin-stats' && user?.role === 'admin' && adminStats && (
                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                        {[
                                            { label: 'Total Users', value: adminStats.totalUsers, icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
                                            { label: 'Total Leads', value: adminStats.totalLeads, icon: Activity, color: 'text-orange-400', bg: 'bg-orange-400/10' },
                                            { label: 'Active Domains', value: adminStats.totalWebsites, icon: Globe, color: 'text-green-400', bg: 'bg-green-400/10' },
                                            { label: 'Monthly Revenue', value: `$${adminStats.estimatedRevenue}`, icon: DollarSign, color: 'text-purple-400', bg: 'bg-purple-400/10' },
                                        ].map((stat, i) => (
                                            <div key={i} className="glass-card p-6 rounded-3xl border border-slate-800/50 flex items-center gap-5">
                                                <div className={`p-4 ${stat.bg} ${stat.color} rounded-2xl`}>
                                                    <stat.icon size={24} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">{stat.label}</p>
                                                    <h4 className="text-3xl font-black text-white mt-1.5">{stat.value}</h4>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                        <div className="lg:col-span-2 glass-card rounded-[2.5rem] p-10 border border-slate-800/50">
                                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                                                <div className="w-1.5 h-6 bg-orange-500 rounded-full" />
                                                System Revenue Velocity
                                            </h3>
                                            <div className="h-[300px]">
                                                <RevenueChart
                                                    data={[
                                                        { name: 'Jan', revenue: 1200 },
                                                        { name: 'Feb', revenue: 1900 },
                                                        { name: 'Mar', revenue: 3400 },
                                                        { name: 'Apr', revenue: 2800 },
                                                        { name: 'May', revenue: 4500 },
                                                        { name: 'Jun', revenue: 5200 },
                                                    ]}
                                                />
                                            </div>
                                        </div>

                                        <div className="glass-card rounded-[2.5rem] p-10 border border-slate-800/50 space-y-6">
                                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Infrastructure Health</h3>
                                            <div className="space-y-4">
                                                {[
                                                    { name: 'Node.js Cluster', status: 'Optimal', color: 'bg-green-500' },
                                                    { name: 'MongoDB Aggregation', status: 'Optimal', color: 'bg-green-500' },
                                                    { name: 'Lead Queue (BullMQ)', status: 'Active', color: 'bg-green-500' },
                                                    { name: 'WhatsApp Worker', status: 'Standby', color: 'bg-blue-500' },
                                                ].map((service, i) => (
                                                    <div key={i} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-slate-800/50">
                                                        <span className="font-bold text-xs text-slate-300">{service.name}</span>
                                                        <div className="flex items-center gap-2">
                                                            <div className={`w-1.5 h-1.5 rounded-full ${service.color} animate-pulse`} />
                                                            <span className="text-[10px] font-mono text-slate-500 uppercase">{service.status}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'admin-users' && user?.role === 'admin' && (
                                <div className="glass-card rounded-[2.5rem] overflow-hidden border border-slate-800/50">
                                    <div className="p-8 border-b border-slate-800/50 bg-slate-950/20">
                                        <h3 className="text-xl font-black text-white uppercase tracking-tighter">Global User Directory</h3>
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Management & Permission Control</p>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead className="bg-slate-950/40 text-slate-500 text-[10px] uppercase font-black tracking-widest">
                                                <tr>
                                                    <th className="px-8 py-5">Profile</th>
                                                    <th className="px-8 py-5">Tier</th>
                                                    <th className="px-8 py-5">API Footprint</th>
                                                    <th className="px-8 py-5">Registration</th>
                                                    <th className="px-8 py-5 text-right">Utility</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-800/30">
                                                {adminUsers.map((u) => (
                                                    <tr key={u._id} className="hover:bg-slate-800/20 transition-all group">
                                                        <td className="px-8 py-5">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center font-black text-white shadow-lg">
                                                                    {u.name[0]}
                                                                </div>
                                                                <div>
                                                                    <p className="font-bold text-slate-200">{u.name}</p>
                                                                    <p className="text-[10px] text-slate-500 font-medium italic">{u.email}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-5">
                                                            <select
                                                                value={u.plan}
                                                                onChange={(e) => handlePlanUpdate(u._id, e.target.value)}
                                                                className="bg-slate-900/50 border border-slate-800/50 rounded-xl px-4 py-2 text-[10px] font-black uppercase text-orange-500 outline-none focus:border-orange-500/50 transition-all cursor-pointer"
                                                            >
                                                                <option value="free">FREE</option>
                                                                <option value="pro">PRO</option>
                                                                <option value="enterprise">ENTERPRISE</option>
                                                            </select>
                                                        </td>
                                                        <td className="px-8 py-5">
                                                            <code className="text-[10px] bg-slate-950 border border-slate-800/50 px-3 py-1.5 rounded-lg text-slate-400 font-mono">
                                                                {u.apiKey?.substring(0, 15)}...
                                                            </code>
                                                        </td>
                                                        <td className="px-8 py-5 text-[10px] text-slate-500 font-black uppercase tracking-widest">
                                                            {new Date(u.createdAt).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-8 py-5 text-right">
                                                            <button className="text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-red-500 transition-colors">Terminate</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'settings' && (
                                <div className="max-w-3xl space-y-8">
                                    <div className="glass-card p-12 rounded-[3rem] relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                                            <Settings size={180} />
                                        </div>
                                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-10">Account Architecture</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <div className="space-y-6">
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Legal Identity</label>
                                                    <input
                                                        type="text"
                                                        className="w-full p-4 bg-slate-950/50 border border-slate-800 rounded-2xl text-white outline-none focus:border-orange-500/50 focus:bg-slate-950 transition-all font-bold"
                                                        value={profileData.name}
                                                        onChange={e => setProfileData({ name: e.target.value })}
                                                        placeholder="Full Name"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Registry Email</label>
                                                    <div className="relative group">
                                                        <input type="email" className="w-full p-4 bg-slate-900/30 border border-slate-800/50 rounded-2xl text-slate-500 cursor-not-allowed font-medium" defaultValue={user?.email} disabled />
                                                        <div className="absolute inset-y-0 right-4 flex items-center">
                                                            <div className="px-2 py-0.5 bg-slate-800 rounded text-[8px] font-black uppercase tracking-tighter text-slate-500">Locked</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col justify-end">
                                                <div className="p-8 bg-slate-950 rounded-[2rem] border border-slate-800 space-y-4 mb-2">
                                                    <p className="text-xs text-slate-400 font-medium leading-relaxed">Ensure your profile information is accurate to receive relevant system notifications and platform updates.</p>
                                                    <motion.button
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={handleUpdateProfile}
                                                        className="w-full bg-white text-black py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-orange-500 hover:text-white transition-all shadow-xl shadow-white/5"
                                                    >
                                                        Finalize Changes
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'billing' && (
                                <div className="space-y-10">
                                    <div className="glass-card p-12 py-16 rounded-[3rem] text-white overflow-hidden relative group">
                                        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-orange-500/10 to-transparent pointer-events-none" />
                                        <div className="relative z-10 max-w-xl">
                                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                                                <Zap size={12} className="text-orange-400 fill-current" />
                                                Cloud Infrastructure
                                            </div>
                                            <h3 className="text-5xl font-black uppercase tracking-tighter leading-none mb-4">Professional <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Tier v2.0</span></h3>
                                            <p className="text-slate-400 text-lg font-medium mb-10 leading-relaxed">Your current deployment is running on the <span className="text-white">{(user?.plan?.charAt(0).toUpperCase() + user?.plan?.slice(1)) || 'Standard'}</span> framework. Scale your operations with WhatsApp automation and multi-site tracking.</p>
                                            <div className="flex gap-4">
                                                <button className="bg-orange-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-500 transition-all shadow-2xl shadow-orange-600/30">Scale Upwards</button>
                                                <button className="px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-black uppercase tracking-widest text-xs transition-all">View Analytics</button>
                                            </div>
                                        </div>
                                    </div>
                                    <PricingSection />
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>

            {isAddWebsiteModalOpen && (
                <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-6 text-slate-100">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="glass-card rounded-[3rem] p-12 max-w-lg w-full relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-red-600" />
                        <h3 className="text-3xl font-black uppercase tracking-tighter mb-8 text-white">Scale Perimeter</h3>
                        <form onSubmit={handleAddWebsite} className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Instance Designation</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white outline-none focus:border-orange-500 transition-all font-bold"
                                    placeholder="e.g. Primary Alpha"
                                    value={newWebsite.name}
                                    onChange={e => setNewWebsite({ ...newWebsite, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Primary URL</label>
                                <input
                                    required
                                    type="url"
                                    className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white outline-none focus:border-orange-500 transition-all font-bold"
                                    placeholder="https://instance-a.com"
                                    value={newWebsite.url}
                                    onChange={e => setNewWebsite({ ...newWebsite, url: e.target.value })}
                                />
                            </div>
                            <div className="flex gap-4 pt-6">
                                <button
                                    type="submit"
                                    disabled={isSubmittingSite}
                                    className={`flex-1 bg-orange-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-500 shadow-xl shadow-orange-600/20 transition-all ${isSubmittingSite ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmittingSite ? 'Authorizing...' : 'Authorize Instance'}
                                </button>
                                <button type="button" onClick={() => setIsAddWebsiteModalOpen(false)} className="px-10 py-5 border border-slate-800 rounded-2xl font-black uppercase tracking-widest text-[10px] text-slate-500 hover:text-white hover:bg-slate-900 transition-all">Cancel</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
            {selectedWebsiteForGuide && (
                <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-2xl z-[150] flex items-center justify-center p-6 text-slate-100">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="glass-card rounded-[3rem] p-12 max-w-4xl w-full relative overflow-y-auto max-h-[90vh]"
                    >
                        <button
                            onClick={() => setSelectedWebsiteForGuide(null)}
                            className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-4xl font-black uppercase tracking-tighter mb-2 text-white">Integration Manual</h3>
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Deploying tracking node to <span className="text-orange-500">{selectedWebsiteForGuide.name}</span></p>
                            </div>

                            <div className="space-y-6">
                                <div className="p-8 bg-slate-900/50 rounded-3xl border border-slate-800/50">
                                    <h4 className="text-sm font-black uppercase tracking-widest text-white mb-4 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                        Automatic Lead Capture Script
                                    </h4>
                                    <p className="text-xs text-slate-400 mb-6 leading-relaxed">Paste this high-performance script before the closing <code className="text-orange-500 bg-orange-500/10 px-1.5 py-0.5 rounded">&lt;/body&gt;</code> tag of your website. It automatically intercepts all form submissions and synchronizes them with your dashboard.</p>

                                    <div className="relative group">
                                        <pre className="bg-slate-950 p-6 rounded-2xl text-[10px] font-mono text-slate-300 overflow-x-auto border border-slate-800">
                                            {`<script>
/* AutoSAAS Universal Lead Tracker */
(function() {
    const API_KEY = '${selectedWebsiteForGuide.apiKey}';
    const API_URL = '${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/leads/capture';

    window.addEventListener('submit', function(e) {
        const form = e.target;
        if (!form) return;

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => { data[key] = value; });

        const payload = {
            apiKey: API_KEY,
            name: data.name || data.fullname || data.user_name || 'Anonymous Lead',
            email: data.email || data.user_email || '',
            phone: data.phone || data.mobile || data.tel || '',
            source: window.location.hostname,
            data: data
        };

        if (payload.email || payload.phone) {
            fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }).then(r => r.json()).then(res => {
                console.log('AutoSAAS: Lead synced');
            }).catch(console.error);
        }
    }, true);
})();
</script>`}
                                        </pre>
                                        <button
                                            onClick={() => {
                                                const script = `/* AutoSAAS Universal Lead Tracker */\n(function() {\n    const API_KEY = '${selectedWebsiteForGuide.apiKey}';\n    const API_URL = '${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/leads/capture';\n\n    window.addEventListener('submit', function(e) {\n        const form = e.target;\n        if (!form) return;\n\n        const formData = new FormData(form);\n        const data = {};\n        formData.forEach((value, key) => { data[key] = value; });\n\n        const payload = {\n            apiKey: API_KEY,\n            name: data.name || data.fullname || data.user_name || 'Anonymous Lead',\n            email: data.email || data.user_email || '',\n            phone: data.phone || data.mobile || data.tel || '',\n            source: window.location.hostname,\n            data: data\n        };\n\n        if (payload.email || payload.phone) {\n            fetch(API_URL, {\n                method: 'POST',\n                headers: { 'Content-Type': 'application/json' },\n                body: JSON.stringify(payload)\n            }).then(r => r.json()).then(res => {\n                console.log('AutoSAAS: Lead synced');\n            }).catch(console.error);\n        }\n    }, true);\n})();`;
                                                navigator.clipboard.writeText(`<script>\n${script}\n</script>`);
                                                alert('Script copied to clipboard!');
                                            }}
                                            className="absolute top-4 right-4 p-3 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 opacity-0 group-hover:opacity-100 transition-all"
                                        >
                                            <Copy size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-6 bg-slate-900/30 rounded-2xl border border-slate-800/50">
                                        <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Step 1</h5>
                                        <p className="text-xs text-slate-300 font-bold">Copy the tracking script to your clipboard.</p>
                                    </div>
                                    <div className="p-6 bg-slate-900/30 rounded-2xl border border-slate-800/50">
                                        <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Step 2</h5>
                                        <p className="text-xs text-slate-300 font-bold">Paste it in the Global Header/Footer settings of your CMS.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}

