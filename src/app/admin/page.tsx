'use client';

import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchAdminStats, fetchAllUsers, updateUserPlan } from '@/redux/slices/adminSlice';
import { useRouter } from 'next/navigation';
import { Users, LayoutDashboard, Settings, ShieldCheck, DollarSign, Activity, Globe, LogOut } from 'lucide-react';
import { logout } from '@/redux/slices/authSlice';
import RevenueChart from '@/components/admin/RevenueChart';

export default function AdminPage() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { user } = useAppSelector((state) => state.auth);
    const { stats, users, isLoading } = useAppSelector((state) => state.admin);

    const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'settings'>('overview');

    useEffect(() => {
        router.replace('/dashboard');
    }, [router]);

    const handlePlanUpdate = async (userId: string, plan: string) => {
        await dispatch(updateUserPlan({ userId, plan }));
    };

    const handleLogout = async () => {
        await dispatch(logout());
        router.push('/login');
    };

    if (!user || user.role !== 'admin') return null;

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex">
            {/* Admin Sidebar */}
            <div className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col">
                <div className="p-8">
                    <h1 className="text-xl font-black text-orange-500 flex items-center gap-2">
                        <ShieldCheck size={24} />
                        SUPERADMIN
                    </h1>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`flex items-center space-x-3 p-3 w-full rounded-xl transition-all ${activeTab === 'overview' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'text-slate-400 hover:bg-slate-900'}`}
                    >
                        <LayoutDashboard size={20} />
                        <span className="font-bold">System Overview</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`flex items-center space-x-3 p-3 w-full rounded-xl transition-all ${activeTab === 'users' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'text-slate-400 hover:bg-slate-900'}`}
                    >
                        <Users size={20} />
                        <span className="font-bold">User Management</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`flex items-center space-x-3 p-3 w-full rounded-xl transition-all ${activeTab === 'settings' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'text-slate-400 hover:bg-slate-900'}`}
                    >
                        <Settings size={20} />
                        <span className="font-bold">Global Config</span>
                    </button>
                </nav>
                <div className="p-6">
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 p-3 w-full text-red-400 hover:bg-red-500/10 rounded-xl transition-colors font-bold"
                    >
                        <LogOut size={20} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>

            {/* Main Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-20 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md flex items-center justify-between px-10">
                    <h2 className="text-2xl font-black uppercase tracking-tighter">
                        {activeTab === 'overview' ? 'System Pulse' : 'Manage Fleet'}
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Systems Nominal</span>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-10 space-y-8">
                    {activeTab === 'overview' && stats && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                {[
                                    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
                                    { label: 'Total Leads', value: stats.totalLeads, icon: Activity, color: 'text-orange-400', bg: 'bg-orange-400/10' },
                                    { label: 'Active Domains', value: stats.totalWebsites, icon: Globe, color: 'text-green-400', bg: 'bg-green-400/10' },
                                    { label: 'Monthly Revenue', value: `$${stats.estimatedRevenue}`, icon: DollarSign, color: 'text-purple-400', bg: 'bg-purple-400/10' },
                                ].map((stat, i) => (
                                    <div key={i} className="bg-slate-950 p-6 rounded-3xl border border-slate-800 flex items-center gap-5">
                                        <div className={`p-4 ${stat.bg} ${stat.color} rounded-2xl`}>
                                            <stat.icon size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                                            <h4 className="text-3xl font-black mt-1">{stat.value}</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Revenue Chart */}
                                <div className="lg:col-span-2 bg-slate-950 rounded-3xl border border-slate-800 p-8">
                                    <h3 className="font-bold text-slate-400 uppercase tracking-widest mb-6">Revenue Growth</h3>
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

                                {/* System Health */}
                                <div className="bg-slate-950 rounded-3xl border border-slate-800 p-8 space-y-6">
                                    <h3 className="font-bold text-slate-400 uppercase tracking-widest mb-2">System Health</h3>
                                    <div className="space-y-4">
                                        {[
                                            { name: 'API Gateway', status: 'Optimal', color: 'bg-green-500' },
                                            { name: 'MongoDB Cluster', status: 'Optimal', color: 'bg-green-500' },
                                            { name: 'Redis Queue', status: 'High Load', color: 'bg-yellow-500' },
                                            { name: 'Email Workers', status: 'Optimal', color: 'bg-green-500' },
                                            { name: 'Twilio Gateway', status: 'Optimal', color: 'bg-green-500' },
                                        ].map((service, i) => (
                                            <div key={i} className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800">
                                                <span className="font-bold text-sm text-slate-300">{service.name}</span>
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${service.color} animate-pulse`} />
                                                    <span className="text-xs font-mono text-slate-500">{service.status}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-4 border-t border-slate-800">
                                        <div className="flex justify-between text-xs text-slate-500 font-mono mb-2">
                                            <span>CPU Usage</span>
                                            <span>45%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 w-[45%]" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
                                <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                                    <h3 className="font-bold text-slate-400 uppercase tracking-widest">Global Live Logs</h3>
                                    <button className="text-xs font-bold text-orange-500 hover:text-orange-400">VIEW ALL STREAM</button>
                                </div>
                                <div className="p-4 space-y-4">
                                    <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 font-mono text-xs text-slate-400 leading-relaxed max-h-48 overflow-y-auto">
                                        <div className="text-green-400">[INFO] Worker started processing job: lead_capture_12345</div>
                                        <div className="text-blue-400">[DEBUG] n8n webhook triggered for user_882</div>
                                        <div className="text-orange-400">[WARN] High latency detected on /api/leads (250ms)</div>
                                        {/* Mock logs */}
                                        $ systemctl status automation-engine.service<br />
                                        ● automation-engine.service - SaaS Core Processor<br />
                                        &nbsp;&nbsp;&nbsp;Active: active (running) since Sat 2024-05-18 12:00:00 UTC<br />
                                        &nbsp;&nbsp;&nbsp;Main PID: 1234 (node)<br />
                                        &nbsp;&nbsp;&nbsp;Tasks: 45 (limit: 4915)<br />
                                        &nbsp;&nbsp;&nbsp;Memory: 256.4M
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'users' && (
                        <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-900/50 text-slate-500 text-[10px] uppercase font-black tracking-widest">
                                        <tr>
                                            <th className="px-8 py-5">User Profile</th>
                                            <th className="px-8 py-5">Access Tier</th>
                                            <th className="px-8 py-5">API Footprint</th>
                                            <th className="px-8 py-5">Joined</th>
                                            <th className="px-8 py-5 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800">
                                        {users.map((u) => (
                                            <tr key={u._id} className="hover:bg-slate-900/40 transition-colors">
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center font-black text-white">
                                                            {u.name[0]}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold">{u.name}</p>
                                                            <p className="text-xs text-slate-500">{u.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <select
                                                        value={u.plan}
                                                        onChange={(e) => handlePlanUpdate(u._id, e.target.value)}
                                                        className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1 text-xs font-bold uppercase text-orange-400 outline-none"
                                                    >
                                                        <option value="free">FREE</option>
                                                        <option value="pro">PRO</option>
                                                        <option value="enterprise">ENTERPRISE</option>
                                                    </select>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <code className="text-[10px] bg-slate-900 px-2 py-1 rounded text-slate-400">{u.apiKey}</code>
                                                </td>
                                                <td className="px-8 py-5 text-xs text-slate-500">
                                                    {new Date(u.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <button className="text-xs font-bold text-red-500/50 hover:text-red-500 transition-colors">SUSPEND</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
