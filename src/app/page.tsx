'use client';

import { useCheckout } from "@/context/CheckoutContext";
import { Header } from "@/components/Header";
import { Minus, Plus, Trash2, ShoppingBag, Leaf } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { cartItems, subtotal, shippingFee, grandTotal, discountApplied, updateQuantity, removeItem } = useCheckout();

  return (
    <>
      <Header />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag className="w-8 h-8 text-emerald-600" />
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Your Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10 text-gray-300" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any eco-friendly items yet.</p>
            <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cart Items */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item) => (
                <div key={item.product_id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start transition-all hover:shadow-md">
                  <div className="w-28 h-28 shrink-0 relative rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                    <Image
                      src={item.image}
                      alt={item.product_name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col w-full">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">{item.product_name}</h3>
                      <button
                        onClick={() => removeItem(item.product_id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="text-emerald-700 font-bold text-lg mb-4">
                      ₹{item.product_price.toLocaleString()}
                    </div>

                    <div className="flex items-center gap-4 mt-auto">
                      <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 p-1">
                        <button
                          onClick={() => updateQuantity(item.product_id, -1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-medium text-gray-900 text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product_id, 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-sm text-gray-500 font-medium">
                        Total: <span className="text-gray-900 font-semibold">₹{(item.product_price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 text-sm mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Standard Shipping</span>
                  <span className="font-medium text-gray-900">₹{shippingFee.toLocaleString()}</span>
                </div>
                {discountApplied > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount</span>
                    <span className="font-medium">-₹{discountApplied.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-100 pt-4 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold text-gray-900">Grand Total</span>
                  <span className="text-2xl font-bold text-emerald-600">₹{grandTotal.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-right">Inclusive of all taxes</p>
              </div>

              <Link
                href="/checkout/address"
                className="w-full flex justify-center items-center py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Proceed to Checkout
              </Link>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                <Leaf className="w-4 h-4 text-emerald-500" />
                <span>100% Eco-friendly packaging</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
