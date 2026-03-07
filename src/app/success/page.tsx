'use client';

import { useEffect } from 'react';
import { useCheckout } from "@/context/CheckoutContext";
import { Header } from "@/components/Header";
import { CheckCircle2, Package, ArrowRight, Heart } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
    const { setCartItems, setAddress } = useCheckout();

    // Clear cart upon successful order load
    useEffect(() => {
        setCartItems([]);
        // Optionally reset address if desired, but we can keep it
    }, [setCartItems]);

    return (
        <>
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center min-h-[80vh] px-4 py-12">
                <div className="max-w-md w-full bg-white rounded-3xl shadow-lg border border-gray-100 p-8 sm:p-12 text-center transform transition-all animate-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                        <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                            <Package className="w-6 h-6 text-emerald-600" />
                        </div>
                    </div>

                    <h1 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">Order Successful!</h1>
                    <p className="text-gray-500 mb-8 text-lg">
                        Thank you for making an eco-friendly choice. We've received your order and are preparing it for shipment.
                    </p>

                    <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100 text-left">
                        <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-500 mt-0.5">•</span>
                                You will receive an order confirmation email shortly.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-500 mt-0.5">•</span>
                                Your green package will be shipped within 24 hours.
                            </li>
                        </ul>
                    </div>

                    <Link
                        href="/"
                        className="w-full flex justify-center items-center gap-2 py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg transition-all shadow-md transform hover:-translate-y-0.5"
                    >
                        Continue Shopping
                        <ArrowRight className="w-5 h-5" />
                    </Link>

                    <p className="mt-6 text-sm text-gray-400 flex items-center justify-center gap-1 font-medium">
                        Made with <Heart className="w-4 h-4 text-emerald-500 fill-emerald-500" /> by Ecoyaan
                    </p>
                </div>
            </main>
        </>
    );
}
