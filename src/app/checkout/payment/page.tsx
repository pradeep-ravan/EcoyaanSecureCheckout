'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import { Header } from "@/components/Header";
import { CreditCard, ArrowLeft, Lock, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PaymentPage() {
    const router = useRouter();
    const { cartItems, subtotal, shippingFee, grandTotal, address, discountApplied } = useCheckout();
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = () => {
        setIsProcessing(true);
        // Simulate payment processing delay
        setTimeout(() => {
            router.push("/success");
        }, 1500);
    };

    // If no items, redirect to home
    if (cartItems.length === 0 && !isProcessing) {
        if (typeof window !== 'undefined') {
            router.push("/");
        }
    }

    return (
        <>
            <Header />
            <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <Link href="/checkout/address" className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-700 transition-colors mb-6 text-sm font-medium">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Address
                </Link>

                <div className="flex items-center gap-3 mb-8">
                    <CreditCard className="w-8 h-8 text-emerald-600" />
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Payment & Confirmation</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Main Payment Section */}
                    <div className="lg:col-span-7 space-y-6">

                        {/* Address Summary */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                            <div className="flex items-center gap-2 mb-4">
                                <Truck className="w-5 h-5 text-emerald-600" />
                                <h2 className="text-xl font-bold text-gray-900">Shipping To</h2>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <p className="font-semibold text-gray-900">{address.fullName}</p>
                                <p className="text-gray-600 mt-1">{address.email} | {address.phone}</p>
                                <p className="text-gray-600 mt-1">
                                    {address.city}, {address.state} - {address.pinCode}
                                </p>
                                <div className="mt-3">
                                    <Link href="/checkout/address" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
                                        Edit Address
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Payment Options (Simulated) */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <Lock className="w-5 h-5 text-emerald-600" />
                                    <h2 className="text-xl font-bold text-gray-900">Payment Options</h2>
                                </div>
                                <div className="flex gap-2">
                                    {/* Mock CC icons */}
                                    <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-gray-400">VISA</div>
                                    <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-gray-400">MC</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="flex items-center p-4 border-2 border-emerald-500 rounded-xl bg-emerald-50 cursor-pointer">
                                    <input type="radio" readOnly checked className="w-5 h-5 text-emerald-600" />
                                    <span className="ml-3 font-medium text-gray-900">Credit / Debit Card</span>
                                </label>
                                <label className="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer opacity-50">
                                    <input type="radio" disabled className="w-5 h-5 text-gray-400" />
                                    <span className="ml-3 font-medium text-gray-900">UPI (Coming Soon)</span>
                                </label>
                                <label className="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer opacity-50">
                                    <input type="radio" disabled className="w-5 h-5 text-gray-400" />
                                    <span className="ml-3 font-medium text-gray-900">Net Banking (Coming Soon)</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-5 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 lg:sticky lg:top-24">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Final Order Summary</h2>

                        <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                            {cartItems.map((item) => (
                                <div key={item.product_id} className="flex gap-4 border-b border-gray-50 pb-4">
                                    <div className="w-16 h-16 shrink-0 relative rounded-md overflow-hidden bg-gray-50 border border-gray-100">
                                        <Image src={item.image} alt={item.product_name} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-gray-900 truncate">{item.product_name}</h4>
                                        <p className="text-gray-500 text-sm mt-1">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900">
                                        ₹{(item.product_price * item.quantity).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 text-sm mb-6 bg-gray-50 p-4 rounded-xl">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span className="font-medium text-gray-900">₹{subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="font-medium text-gray-900">₹{shippingFee.toLocaleString()}</span>
                            </div>
                            {discountApplied > 0 && (
                                <div className="flex justify-between text-emerald-600">
                                    <span>Discount</span>
                                    <span className="font-medium">-₹{discountApplied.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between items-end">
                                <span className="text-base font-bold text-gray-900">Amount to Pay</span>
                                <span className="text-2xl font-bold text-emerald-600">₹{grandTotal.toLocaleString()}</span>
                            </div>
                        </div>

                        <button
                            onClick={handlePayment}
                            disabled={isProcessing}
                            className={`w-full flex justify-center items-center py-4 px-6 rounded-xl font-semibold text-lg transition-all shadow-md  ${isProcessing ? 'bg-emerald-400 text-white cursor-wait' : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-lg transform hover:-translate-y-0.5'}`}
                        >
                            {isProcessing ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5" />
                                    Pay Securely
                                </span>
                            )}
                        </button>
                        <p className="text-xs text-center text-gray-500 mt-4 flex justify-center items-center gap-1">
                            <Lock className="w-3 h-3" /> Payments are 100% secure and encrypted
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}
