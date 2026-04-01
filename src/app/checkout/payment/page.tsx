'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import { Header } from "@/components/Header";
import { CreditCard, ArrowLeft, Lock, ShieldCheck, Truck, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PaymentPage() {
    const router = useRouter();
    const { cartItems, subtotal, shippingFee, grandTotal, address, discountApplied, isHydrated } = useCheckout();
    const [isProcessing, setIsProcessing] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const handlePayment = () => {
        if (isProcessing) return;
        setIsProcessing(true);
        // Simulate payment processing delay
        setTimeout(() => {
            router.push("/success");
        }, 1500);
    };

    if (!mounted || !isHydrated) {
        return (
            <>
                <Header />
                <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex justify-center items-center h-screen pt-24">
                  <div className="relative">
                     <div className="absolute -inset-4 rounded-full bg-emerald-100 blur-xl opacity-50 animate-pulse"></div>
                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 relative z-10"></div>
                  </div>
                </main>
            </>
        );
    }

    // If no items, redirect to home
    if (cartItems.length === 0 && !isProcessing) {
        if (typeof window !== 'undefined') {
            router.push("/");
        }
    }

    return (
        <>
            <Header />
            <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-16 pb-32 lg:pb-32 pt-24 animate-fade-in relative z-0">
                
                {/* Subtle background blur blobs */}
                <div className="absolute top-20 right-10 w-64 h-64 bg-teal-100/40 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

                <Link href="/checkout/address" className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-700 transition-colors mb-8 text-sm font-semibold tracking-wide uppercase">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Address
                </Link>

                <div className="flex items-center gap-4 mb-10 animate-slide-up">
                    <div className="bg-gradient-to-tr from-emerald-100 to-teal-50 p-3 rounded-2xl shadow-inner border border-white">
                        <CreditCard className="w-8 h-8 text-emerald-600" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 tracking-tight">Secure Payment</h1>
                        <p className="text-gray-500 mt-1 font-medium flex items-center gap-1">
                            <Lock className="w-4 h-4 text-emerald-400" /> Encrypted and safe
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                    {/* Main Payment Section */}
                    <div className="lg:col-span-7 space-y-8">

                        {/* Address Summary */}
                        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-6 sm:p-8 animate-slide-up delay-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600">
                                    <Truck className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Shipping To</h2>
                            </div>
                            <div className="bg-gradient-to-br from-gray-50/80 to-white/50 rounded-2xl p-5 border border-gray-100/80 shadow-inner relative group transition-all duration-300 hover:shadow-md">
                                <Link 
                                    href="/checkout/address" 
                                    className="absolute top-5 right-5 text-sm font-bold text-emerald-600 hover:text-emerald-700 bg-white shadow-sm border border-emerald-100 px-4 py-1.5 rounded-full transition-all group-hover:-translate-y-0.5"
                                >
                                    Change
                                </Link>
                                <p className="font-extrabold text-gray-900 pr-24 text-lg tracking-tight mb-2">{address?.fullName || 'No Name Provided'}</p>
                                <div className="space-y-1">
                                    <p className="flex items-center gap-2 text-sm text-gray-600 font-medium"><span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>{address?.email}</p>
                                    <p className="flex items-center gap-2 text-sm text-gray-600 font-medium"><span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>{address?.phone}</p>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-200/50 break-words leading-relaxed text-sm text-gray-600 font-medium">
                                    <span className="text-gray-700 block mb-0.5 font-semibold text-xs uppercase tracking-wider">Address</span>
                                    {address?.city}, {address?.state} - {address?.pinCode}
                                </div>
                            </div>
                        </div>

                        {/* Payment Options (Simulated) */}
                        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-6 sm:p-8 animate-slide-up delay-200">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">Payment Method</h2>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-12 h-8 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/50 rounded-lg flex items-center justify-center text-[10px] font-extrabold text-blue-800 shadow-sm">VISA</div>
                                    <div className="w-12 h-8 bg-gradient-to-br from-red-50 to-orange-50 border border-red-200/50 rounded-lg flex items-center justify-center text-[10px] font-extrabold text-red-700 shadow-sm">MC</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="flex items-center p-5 border-2 border-emerald-400 rounded-2xl bg-gradient-to-r from-emerald-50/80 to-teal-50/30 cursor-pointer transition-all shadow-sm">
                                    <input type="radio" readOnly checked className="w-5 h-5 text-emerald-600 focus:ring-emerald-500" />
                                    <span className="ml-4 font-bold text-gray-900 text-lg">Credit / Debit Card</span>
                                    <Sparkles className="w-4 h-4 text-emerald-500 ml-auto" />
                                </label>
                                <label className="flex items-center p-5 border border-white rounded-2xl bg-white/50 cursor-not-allowed opacity-60 transition-all hover:bg-white/80">
                                    <input type="radio" disabled className="w-5 h-5 text-gray-400" />
                                    <span className="ml-4 font-bold text-gray-900 text-lg flex items-center">
                                        UPI <span className="text-[10px] bg-gray-200/80 text-gray-600 px-2.5 py-1 rounded-full ml-3 uppercase font-extrabold tracking-wider">Coming Soon</span>
                                    </span>
                                </label>
                                <label className="flex items-center p-5 border border-white rounded-2xl bg-white/50 cursor-not-allowed opacity-60 transition-all hover:bg-white/80">
                                    <input type="radio" disabled className="w-5 h-5 text-gray-400" />
                                    <span className="ml-4 font-bold text-gray-900 text-lg flex items-center">
                                        Net Banking <span className="text-[10px] bg-gray-200/80 text-gray-600 px-2.5 py-1 rounded-full ml-3 uppercase font-extrabold tracking-wider">Coming Soon</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-5 bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-6 sm:p-8 lg:sticky lg:top-24 animate-slide-up delay-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">Final Summary</h2>

                        <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {cartItems.map((item) => (
                                <div key={item.product_id} className="flex gap-4 border-b border-gray-100/80 pb-4 group">
                                    <div className="w-16 h-16 shrink-0 relative rounded-2xl overflow-hidden bg-gray-50 border border-white/60 shadow-sm group-hover:scale-[1.05] transition-transform duration-300">
                                        <Image src={item.image} alt={item.product_name} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                                        <h4 className="text-sm font-bold text-gray-900 truncate leading-tight">{item.product_name}</h4>
                                        <p className="text-gray-500 text-xs font-medium mt-1">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="text-sm font-bold text-gray-900 flex items-center">
                                        ₹{(item.product_price * item.quantity).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4 text-base mb-8">
                            <div className="flex justify-between text-gray-500 font-medium">
                                <span>Subtotal</span>
                                <span className="text-gray-900">₹{subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-gray-500 font-medium">
                                <span>Standard Shipping</span>
                                <span className="text-gray-900">₹{shippingFee.toLocaleString()}</span>
                            </div>
                            {discountApplied > 0 && (
                                <div className="flex justify-between text-emerald-600 font-semibold bg-emerald-50 p-2 rounded-lg -mx-2 px-2">
                                    <span>Discount</span>
                                    <span>-₹{discountApplied.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="border-t border-gray-200/80 pt-4 mt-4 flex justify-between items-end">
                                <div>
                                    <span className="text-sm text-gray-500 font-medium block">Total Amount</span>
                                    <span className="text-xs text-gray-400 mt-0.5 block">Inclusive of all taxes</span>
                                </div>
                                <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">₹{grandTotal.toLocaleString()}</span>
                            </div>
                        </div>

                        <p className="text-xs text-center text-gray-500 flex justify-center items-center gap-1.5 font-medium bg-gray-50/80 rounded-full py-2">
                            <Lock className="w-3.5 h-3.5 text-emerald-600" /> Payments are 100% secure and encrypted
                        </p>
                    </div>
                </div>
            </main>

            {/* Sticky Bottom Action Bar with Back and Pay Buttons */}
            <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-2xl border-t border-white/40 p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] z-50 animate-slide-up">
                <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
                    <Link
                        href="/checkout/address"
                        className="flex-1 sm:flex-none flex justify-center items-center py-4 px-8 rounded-2xl bg-white border border-gray-200/80 text-gray-700 font-bold text-lg transition-all hover:bg-gray-50 hover:border-gray-300 shadow-sm gap-2 group"
                    >
                        <ArrowLeft className="w-5 h-5 hidden sm:block group-hover:-translate-x-1 transition-transform" />
                        Back
                    </Link>
                    
                    <button
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className={`flex-1 sm:flex-[2] flex justify-center items-center py-4 px-8 rounded-2xl font-bold text-lg transition-all shadow-lg gap-2 group ${isProcessing ? 'bg-emerald-400 text-white cursor-wait opacity-80' : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-500/25 hover:shadow-emerald-500/40 transform hover:-translate-y-0.5'}`}
                    >
                        {isProcessing ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing Securely...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                Pay ₹{grandTotal.toLocaleString()} Securely
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </>
    );
}
