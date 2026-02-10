'use client';

import { motion } from 'framer-motion';
import { Check, HelpCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PricingPage() {
    const [isAnnual, setIsAnnual] = useState(true);

    const plans = [
        {
            name: "Free Starter",
            price: 0,
            desc: "Perfect for testing the waters and simple automations.",
            features: [
                "100 Leads / Month",
                "Basic Workflow Builders",
                "Email Notifications",
                "Community Support",
                "1 Team Member"
            ],
            cta: "Start for Free",
            highlight: false
        },
        {
            name: "Professional",
            price: isAnnual ? 999 : 1299,
            desc: "For growing businesses needing power and reliability.",
            features: [
                "Unlimited Leads",
                "Advanced AI Agents",
                "WhatsApp & SMS",
                "Priority Email Support",
                "5 Team Members",
                "Remove Branding"
            ],
            cta: "Get Professional",
            highlight: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            desc: "Tailored solutions for large-scale operations.",
            features: [
                "Dedicated Instance",
                "SLA Guarantees",
                "Custom Integrations",
                "24/7 Phone Support",
                "Unlimited Team Members",
                "Audit Logs"
            ],
            cta: "Contact Sales",
            highlight: false
        }
    ];

    const faqs = [
        {
            q: "Can I cancel anytime?",
            a: "Yes, you can cancel your subscription at any time. We don't believe in locking you in."
        },
        {
            q: "What happens if I exceed my lead limit?",
            a: "We'll notify you when you're close. You can either upgrade or pay a small overage fee for additional leads."
        },
        {
            q: "Do you offer discounts for non-profits?",
            a: "Absolutely! Contact our sales team with proof of your non-profit status for a 50% discount."
        },
        {
            q: "Is my data secure?",
            a: "Security is our top priority. We use bank-grade encryption and regular security audits to keep your data safe."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-orange-500/30">
            <Navbar />

            {/* Hero */}
            <section className="pt-40 pb-20 px-6 text-center">
                <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
                    Simple, Transparent Pricing.
                </h1>
                <p className="text-xl text-slate-400 mb-8">
                    Choose the plan that fits your growth. No hidden fees.
                </p>

                {/* Toggle */}
                <div className="flex items-center justify-center gap-4 mb-16">
                    <span className={`text-sm font-bold ${!isAnnual ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
                    <button
                        onClick={() => setIsAnnual(!isAnnual)}
                        className="w-16 h-8 bg-slate-800 rounded-full p-1 relative transition-colors hover:bg-slate-700"
                    >
                        <motion.div
                            animate={{ x: isAnnual ? 32 : 0 }}
                            className="w-6 h-6 bg-orange-600 rounded-full shadow-lg"
                        />
                    </button>
                    <span className={`text-sm font-bold ${isAnnual ? 'text-white' : 'text-slate-500'}`}>
                        Yearly <span className="text-orange-500 text-[10px] uppercase font-black ml-1">Save 20%</span>
                    </span>
                </div>

                {/* Pricing Grid */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                    {plans.map((plan, idx) => (
                        <div
                            key={idx}
                            className={`p-8 rounded-3xl relative flex flex-col items-start text-left ${plan.highlight
                                ? 'bg-slate-900 border-2 border-orange-600 shadow-2xl shadow-orange-600/10 scale-105 z-10'
                                : 'bg-slate-950 border border-slate-800'
                                }`}
                        >
                            {plan.highlight && (
                                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-600 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                    Recommended
                                </span>
                            )}
                            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                            <p className="text-slate-500 text-sm mb-6 min-h-[40px]">{plan.desc}</p>
                            <div className="flex items-baseline mb-8">
                                <span className="text-4xl font-black">
                                    {typeof plan.price === 'number' ? `₹${plan.price}` : plan.price}
                                </span>
                                {typeof plan.price === 'number' && <span className="text-slate-500 ml-2 font-bold">/mo</span>}
                            </div>
                            <ul className="space-y-4 mb-8 flex-1 w-full">
                                {plan.features.map((f, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-300">
                                        <Check size={16} className="text-green-500 shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href="/register"
                                className={`w-full py-4 rounded-xl font-bold text-center transition-all ${plan.highlight
                                    ? 'bg-orange-600 text-white hover:bg-orange-700'
                                    : 'bg-white text-slate-950 hover:bg-slate-200'
                                    }`}
                            >
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-slate-900">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-black text-center mb-16">Frequently Asked Questions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {faqs.map((faq, idx) => (
                            <div key={idx}>
                                <h3 className="font-bold text-lg mb-3 flex items-start gap-2">
                                    <HelpCircle size={20} className="text-orange-500 shrink-0 mt-1" />
                                    {faq.q}
                                </h3>
                                <p className="text-slate-400 leading-relaxed pl-7">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 text-center px-6">
                <div className="max-w-4xl mx-auto bg-gradient-to-br from-orange-600 to-red-600 rounded-3xl p-12 shadow-2xl">
                    <h2 className="text-3xl md:text-4xl font-black mb-6 text-white">Still have questions?</h2>
                    <p className="text-orange-100 text-lg mb-8">Our support team is available 24/7 to help you choose the right plan.</p>
                    <div className="flex justify-center gap-4">
                        <Link href="mailto:support@autosaas.com" className="px-8 py-3 bg-white text-orange-600 rounded-full font-bold hover:bg-orange-50 transition-colors">
                            Contact Support
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
