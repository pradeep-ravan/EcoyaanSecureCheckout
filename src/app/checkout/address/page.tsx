'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import { Header } from "@/components/Header";
import { MapPin, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddressPage() {
    const router = useRouter();
    const { address, setAddress } = useCheckout();

    const [errors, setErrors] = useState<Partial<Record<keyof typeof address, string>>>({});

    const validate = () => {
        const newErrors: Partial<Record<keyof typeof address, string>> = {};
        let isValid = true;

        if (!address.fullName.trim()) {
            newErrors.fullName = "Full Name is required";
            isValid = false;
        }

        if (!address.email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(address.email)) {
            newErrors.email = "Please enter a valid email address";
            isValid = false;
        }

        if (!address.phone.trim()) {
            newErrors.phone = "Phone number is required";
            isValid = false;
        } else if (!/^\d{10}$/.test(address.phone.replace(/[- ]/g, ''))) {
            newErrors.phone = "Please enter a valid 10-digit phone number";
            isValid = false;
        }

        if (!address.pinCode.trim()) {
            newErrors.pinCode = "PIN Code is required";
            isValid = false;
        } else if (!/^\d{6}$/.test(address.pinCode)) {
            newErrors.pinCode = "PIN Code must be 6 digits";
            isValid = false;
        }

        if (!address.city.trim()) {
            newErrors.city = "City is required";
            isValid = false;
        }

        if (!address.state.trim()) {
            newErrors.state = "State is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            router.push("/checkout/payment");
        }
    };

    return (
        <>
            <Header />
            <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-700 transition-colors mb-6 text-sm font-medium">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Cart
                </Link>

                <div className="flex items-center gap-3 mb-8">
                    <MapPin className="w-8 h-8 text-emerald-600" />
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Shipping Address</h1>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            {/* Full Name */}
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    value={address.fullName}
                                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                                    className={`w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.fullName ? 'border-red-300' : 'border-gray-200'}`}
                                    placeholder="John Doe"
                                />
                                {errors.fullName && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.fullName}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={address.email}
                                        onChange={(e) => setAddress({ ...address, email: e.target.value })}
                                        className={`w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.email ? 'border-red-300' : 'border-gray-200'}`}
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.email}</p>}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={address.phone}
                                        onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                                        className={`w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.phone ? 'border-red-300' : 'border-gray-200'}`}
                                        placeholder="9876543210"
                                    />
                                    {errors.phone && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.phone}</p>}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Location Details</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    {/* PIN Code */}
                                    <div>
                                        <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                                        <input
                                            type="text"
                                            id="pinCode"
                                            value={address.pinCode}
                                            onChange={(e) => setAddress({ ...address, pinCode: e.target.value })}
                                            className={`w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.pinCode ? 'border-red-300' : 'border-gray-200'}`}
                                            placeholder="560001"
                                            maxLength={6}
                                        />
                                        {errors.pinCode && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.pinCode}</p>}
                                    </div>

                                    {/* City */}
                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                        <input
                                            type="text"
                                            id="city"
                                            value={address.city}
                                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                            className={`w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.city ? 'border-red-300' : 'border-gray-200'}`}
                                            placeholder="Bengaluru"
                                        />
                                        {errors.city && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.city}</p>}
                                    </div>
                                </div>

                                {/* State */}
                                <div>
                                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                    <input
                                        type="text"
                                        id="state"
                                        value={address.state}
                                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                                        className={`w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.state ? 'border-red-300' : 'border-gray-200'}`}
                                        placeholder="Karnataka"
                                    />
                                    {errors.state && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.state}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                className="w-full flex justify-center items-center py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                Continue to Payment
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}
