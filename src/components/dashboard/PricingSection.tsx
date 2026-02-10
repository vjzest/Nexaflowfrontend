'use client';

import { Check } from 'lucide-react';
import { processPayment } from '@/services/razorpay';
import { useAppSelector } from '@/redux/hooks';

export default function PricingSection() {
    const { user } = useAppSelector((state) => state.auth);
    const userPlan = user?.plan || 'free';

    const plans = [
        {
            id: 'free',
            name: 'Free',
            price: 0,
            features: ['100 Leads / Mo', 'Basic n8n Access', 'Email Notifications'],
            buttonText: 'Current Plan',
            current: userPlan === 'free',
        },
        {
            id: 'pro',
            name: 'Pro',
            price: 999,
            features: ['Unlimited Leads', 'Priority Queue', 'WhatsApp & SMS', 'Dedicated Support'],
            buttonText: userPlan === 'pro' ? 'Current Plan' : 'Upgrade to Pro',
            current: userPlan === 'pro',
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            price: 4999,
            features: ['Custom Nodes', 'Dedicated Instance', '24/7 Phone Support', 'White Labeling'],
            buttonText: 'Contact Sales',
            current: false,
        },
    ];

    const handleUpgrade = async (planId: string, amount: number) => {
        if (amount === 0 || userPlan === planId) return;
        await processPayment({ amount, planId });
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className={`p-8 rounded-3xl bg-slate-950 border ${plan.id === 'pro' ? 'border-orange-500 ring-2 ring-orange-500/20' : 'border-slate-800'
                            } flex flex-col h-full relative group hover:border-orange-500/30 transition-all`}
                    >
                        {plan.id === 'pro' && (
                            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-orange-600/20">
                                Most Popular
                            </span>
                        )}
                        <div className="mb-6">
                            <h3 className="text-xl font-black text-white uppercase tracking-wide">{plan.name}</h3>
                            <div className="mt-4 flex items-baseline">
                                <span className="text-4xl font-black text-white">₹{plan.price}</span>
                                <span className="ml-1 text-slate-500 text-sm font-bold">/month</span>
                            </div>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-slate-400 font-bold">
                                    <div className="p-1 bg-green-500/10 rounded-full">
                                        <Check size={12} className="text-green-500" />
                                    </div>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => handleUpgrade(plan.id, plan.price)}
                            disabled={plan.current}
                            className={`w-full py-4 px-6 rounded-xl font-bold transition-all active:scale-95 ${plan.current
                                ? 'bg-slate-900 text-slate-500 cursor-not-allowed border border-slate-800'
                                : plan.id === 'pro'
                                    ? 'bg-orange-600 text-white hover:bg-orange-500 shadow-xl shadow-orange-600/20'
                                    : 'bg-white text-slate-950 hover:bg-gray-200'
                                }`}
                        >
                            {plan.buttonText}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
