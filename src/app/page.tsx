'use client';

import { useCheckout } from "@/context/CheckoutContext";
import { Header } from "@/components/Header";
import { Minus, Plus, Trash2, ShoppingBag, Leaf, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { cartItems, subtotal, shippingFee, grandTotal, discountApplied, updateQuantity, removeItem, isHydrated } = useCheckout();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setMounted(true);
  }, []);

  if (!mounted || !isHydrated) {
    return (
      <>
        <Header />
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex justify-center items-center h-screen pt-24">
          <div className="relative">
             <div className="absolute -inset-4 rounded-full bg-primary-100 dark:bg-primary-900/30 blur-xl opacity-50 animate-pulse"></div>
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 relative z-10"></div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-16 pb-32 lg:pb-16 pt-24 animate-fade-in relative z-0">
        
        {/* Subtle background blur blobs */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary-200/40 dark:bg-primary-900/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-primary-100/40 dark:bg-primary-900/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <div className="flex items-center gap-4 mb-10 animate-slide-up">
          <div className="bg-gradient-to-tr from-primary-100 to-primary-50 dark:from-primary-900/40 dark:to-primary-900/20 p-3 rounded-2xl shadow-inner border border-white dark:border-slate-800">
            <ShoppingBag className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 tracking-tight">Your Cart</h1>
            <p className="text-gray-500 dark:text-slate-400 mt-1 font-medium flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-primary-400 dark:text-primary-500" /> Great choices for a greener planet
            </p>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-white dark:border-slate-800 p-16 text-center animate-slide-up max-w-2xl mx-auto relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-50 dark:bg-primary-900/20 rounded-full blur-3xl"></div>
            <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-white dark:border-slate-700 relative z-10">
              <ShoppingBag className="w-10 h-10 text-gray-400 dark:text-slate-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-3 relative z-10">Your cart is feeling light</h2>
            <p className="text-gray-500 dark:text-slate-400 mb-8 relative z-10 text-lg">Looks like you haven&apos;t added any eco-friendly items yet.</p>
            <Link href="/" className="inline-block bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-primary-500/30 hover:-translate-y-0.5 transition-all duration-300 relative z-10">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            {/* Cart Items */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              {cartItems.map((item, index) => (
                <div 
                  key={item.product_id} 
                  className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-white/60 dark:border-slate-800/50 p-5 sm:p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:bg-white/90 dark:hover:bg-slate-800/90 animate-slide-up group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-32 h-32 shrink-0 relative rounded-2xl overflow-hidden bg-gray-50 dark:bg-slate-800 border border-gray-100/50 dark:border-slate-700/50 shadow-sm group-hover:scale-[1.02] transition-transform duration-500">
                    <Image
                      src={item.image}
                      alt={item.product_name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col w-full h-full justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 pr-4 leading-tight">{item.product_name}</h3>
                        <button
                          onClick={() => removeItem(item.product_id)}
                          className="bg-red-50 dark:bg-red-900/30 text-red-400 dark:text-red-400 hover:bg-red-500 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-colors p-2 rounded-xl"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="text-primary-600 dark:text-primary-400 font-extrabold text-xl mb-4">
                        ₹{item.product_price.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-6 mt-auto">
                      <div className="flex items-center bg-gray-50/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-slate-700/50 p-1 shadow-inner">
                        <button
                          onClick={() => updateQuantity(item.product_id, -1)}
                          className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-slate-400 hover:text-primary-700 dark:hover:text-primary-400 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all shadow-sm disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:shadow-none"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-bold text-gray-900 dark:text-slate-100 text-base">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product_id, 1)}
                          className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-slate-400 hover:text-primary-700 dark:hover:text-primary-400 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all shadow-sm"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-sm text-gray-500 dark:text-slate-400 font-medium ml-auto">
                        Total: <span className="text-gray-900 dark:text-slate-100 font-bold text-lg">₹{(item.product_price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-white/60 dark:border-slate-800/50 p-6 sm:p-8 sticky top-24 animate-slide-up delay-200">
              <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                Order Summary
              </h2>

              <div className="space-y-4 text-base mb-6">
                <div className="flex justify-between text-gray-500 dark:text-slate-400 font-medium">
                  <span>Subtotal</span>
                  <span className="text-gray-900 dark:text-slate-100">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-500 dark:text-slate-400 font-medium">
                  <span>Standard Shipping</span>
                  <span className="text-gray-900 dark:text-slate-100">₹{shippingFee.toLocaleString()}</span>
                </div>
                {discountApplied > 0 && (
                  <div className="flex justify-between text-primary-600 dark:text-primary-400 font-semibold bg-primary-50 dark:bg-primary-900/30 p-2 rounded-lg -mx-2 px-2">
                    <span>Discount</span>
                    <span>-₹{discountApplied.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-end bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-slate-800/80 dark:to-slate-800/30 p-4 rounded-2xl mb-8 border border-white dark:border-slate-700/50">
                <div>
                  <span className="text-sm text-gray-500 dark:text-slate-400 font-medium block">Total Amount</span>
                  <span className="text-xs text-gray-400 dark:text-slate-500 mt-0.5 block">Inclusive of all taxes</span>
                </div>
                <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-400 dark:to-primary-400">
                  ₹{grandTotal.toLocaleString()}
                </span>
              </div>

              <Link
                href="/checkout/address"
                className="w-full hidden lg:flex justify-center items-center py-4 px-6 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-bold text-lg transition-all duration-300 shadow-lg shadow-primary-500/25 dark:shadow-primary-900/20 transform hover:-translate-y-1 mb-6"
              >
                Proceed to Checkout
              </Link>

              <div className="flex flex-col items-center justify-center gap-3 text-xs text-gray-500 dark:text-slate-400 font-medium hidden lg:flex bg-gray-50/50 dark:bg-slate-800/30 p-4 rounded-xl border border-dashed border-gray-200 dark:border-slate-700/50">
                <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-3 py-1.5 rounded-full">
                  <Leaf className="w-4 h-4" />
                  <span className="font-semibold">100% Eco-friendly packaging</span>
                </div>
                <p>Every purchase plants a tree.</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Sticky Bottom Action Bar for Mobile - Premium Glass Look */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border-t border-white/40 dark:border-slate-800/50 p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_-8px_30px_rgba(0,0,0,0.2)] z-50 lg:hidden animate-slide-up">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="hidden sm:flex flex-col">
              <span className="text-xs text-gray-400 dark:text-slate-500 font-medium uppercase tracking-wider">Total Amount</span>
              <span className="text-primary-600 dark:text-primary-400 font-extrabold text-2xl">₹{grandTotal.toLocaleString()}</span>
            </div>
            
            <div className="w-full sm:w-auto flex flex-1 justify-end">
              <Link
                href="/checkout/address"
                className="w-full sm:w-auto flex justify-center items-center py-4 px-8 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold text-lg transition-all shadow-lg shadow-primary-500/25 gap-2 group"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

