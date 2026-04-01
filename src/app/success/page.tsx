'use client';

import { useEffect } from 'react';
import { useCheckout } from "@/context/CheckoutContext";
import { Header } from "@/components/Header";
import { CheckCircle2, Package, ArrowRight, Heart, Sparkles } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
    const { setCartItems } = useCheckout();

    // Clear cart upon successful order load
    useEffect(() => {
        setCartItems([]);
    }, [setCartItems]);

    return (
        <>
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 pt-24 animate-fade-in relative z-0">
                
                {/* Subtle background blur blobs */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-200/40 dark:bg-primary-900/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

                <div className="max-w-md w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-white/60 dark:border-slate-800/50 p-8 sm:p-12 text-center animate-slide-up relative overflow-hidden group">
                    <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary-50 dark:bg-primary-900/20 rounded-full blur-3xl group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors duration-700"></div>
                    
                    <div className="w-28 h-28 bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/40 dark:to-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-8 relative shadow-inner border border-white dark:border-slate-800">
                        <CheckCircle2 className="w-14 h-14 text-primary-600 dark:text-primary-400 drop-shadow-sm" />
                        <div className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-800 rounded-2xl p-2.5 shadow-lg border border-primary-50/50 dark:border-primary-800/30 hover:-translate-y-1 transition-transform">
                            <Package className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                        </div>
                    </div>

                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 mb-4 tracking-tight flex items-center justify-center gap-2">
                        Order Successful! <Sparkles className="w-6 h-6 text-primary-400 dark:text-primary-500" />
                    </h1>
                    <p className="text-gray-500 dark:text-slate-400 mb-10 text-lg font-medium">
                        Thank you for making an eco-friendly choice. We&apos;ve received your order and are preparing it for shipment.
                    </p>

                    <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl p-6 mb-10 border border-white/80 dark:border-slate-700/50 shadow-sm text-left relative z-10 transition-all hover:bg-white/80 dark:hover:bg-slate-800/80">
                        <h3 className="font-bold text-gray-900 dark:text-slate-100 mb-4 text-base tracking-tight">What happens next?</h3>
                        <ul className="space-y-4 text-sm text-gray-600 dark:text-slate-400 font-medium">
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-50 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 flex items-center justify-center text-xs font-bold border border-primary-100 dark:border-primary-800/50">1</span>
                                You will receive an order confirmation email shortly.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-50 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 flex items-center justify-center text-xs font-bold border border-primary-100 dark:border-primary-800/50">2</span>
                                Your green package will be shipped within 24 hours.
                            </li>
                        </ul>
                    </div>

                    <Link
                        href="/"
                        className="w-full flex justify-center items-center py-4 px-6 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-bold text-lg transition-all shadow-lg shadow-primary-500/25 dark:shadow-primary-900/40 hover:shadow-primary-500/40 transform hover:-translate-y-1 relative z-10 gap-2 group/btn"
                    >
                        Continue Shopping
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>

                    <p className="mt-8 text-sm text-gray-400 dark:text-slate-500 flex items-center justify-center gap-1.5 font-bold uppercase tracking-wider relative z-10">
                        Made with <Heart className="w-4 h-4 text-primary-500 fill-primary-500 drop-shadow-sm" /> by Ecoyaan
                    </p>
                </div>
            </main>
        </>
    );
}
