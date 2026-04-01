'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCheckout, ShippingAddress } from "@/context/CheckoutContext";
import { Header } from "@/components/Header";
import { MapPin, AlertCircle, ArrowLeft, ArrowRight, Plus, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AddressPage() {
    const router = useRouter();
    const { address, setAddress, addresses, setAddresses, isHydrated } = useCheckout();
    const [mounted, setMounted] = useState(false);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof typeof address, string>>>({});

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

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

    const handleNextStep = () => {
        if (addresses.length > 0 && !isAddingNew) {
            if (address.id || address.fullName) {
                router.push("/checkout/payment");
            } else {
                alert("Please select an address or add a new one.");
            }
            return;
        }

        if (validate()) {
            let activeAddress = address;
            if (!address.id) {
                activeAddress = { ...address, id: Date.now().toString() };
                setAddress(activeAddress);
                setAddresses([...addresses, activeAddress]);
            } else {
                const index = addresses.findIndex(a => a.id === address.id);
                if (index >= 0) {
                    const updated = [...addresses];
                    updated[index] = address;
                    setAddresses(updated);
                }
            }
            setIsAddingNew(false);
            router.push("/checkout/payment");
        }
    };

    const handleSelectAddress = (addr: ShippingAddress) => {
        setAddress(addr);
        setIsAddingNew(false);
        setErrors({});
    };

    const handleAddNewClick = () => {
        setAddress({
            id: '',
            fullName: '',
            email: '',
            phone: '',
            pinCode: '',
            city: '',
            state: ''
        });
        setIsAddingNew(true);
        setErrors({});
    };

    if (!mounted || !isHydrated) {
        return (
            <>
                <Header />
                <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex justify-center items-center h-screen pt-24">
                  <div className="relative">
                     <div className="absolute -inset-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 blur-xl opacity-50 animate-pulse"></div>
                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 relative z-10"></div>
                  </div>
                </main>
            </>
        );
    }

    const showForm = isAddingNew || addresses.length === 0;

    return (
        <>
            <Header />
            <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-16 pb-32 lg:pb-32 pt-24 animate-fade-in relative z-0">
                
                {/* Subtle background blur blobs */}
                <div className="absolute top-20 right-10 w-64 h-64 bg-teal-100/40 dark:bg-teal-900/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
                
                <Link href="/" className="inline-flex items-center gap-2 text-gray-500 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors mb-8 text-sm font-semibold tracking-wide uppercase">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Cart
                </Link>

                <div className="flex items-center gap-4 mb-10 animate-slide-up">
                    <div className="bg-gradient-to-tr from-emerald-100 to-teal-50 dark:from-emerald-900/40 dark:to-teal-900/20 p-3 rounded-2xl shadow-inner border border-white dark:border-slate-800">
                        <MapPin className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 tracking-tight">Shipping Address</h1>
                </div>

                {addresses.length > 0 && !isAddingNew && (
                    <div className="mb-8 animate-slide-up delay-100">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">Select an Address</h2>
                            <button 
                                onClick={handleAddNewClick}
                                className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/30 px-4 py-2 rounded-full transition-colors border border-emerald-100/50 dark:border-emerald-800/30"
                            >
                                <Plus className="w-4 h-4" /> Add New
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {addresses.map((addr) => {
                                const isSelected = address.id === addr.id;
                                return (
                                    <div 
                                        key={addr.id}
                                        onClick={() => handleSelectAddress(addr)}
                                        className={`relative p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 hover:-translate-y-1 ${isSelected ? 'border-emerald-400 dark:border-emerald-500 bg-gradient-to-b from-emerald-50/80 to-teal-50/30 dark:from-emerald-900/40 dark:to-teal-900/20 shadow-[0_8px_30px_rgb(16,185,129,0.1)] dark:shadow-[0_8px_30px_rgb(16,185,129,0.2)]' : 'border-white dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgb(0,0,0,0.2)] hover:border-emerald-200 dark:hover:border-emerald-700/50 hover:bg-white/90 dark:hover:bg-slate-800/90 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]'}`}
                                    >
                                        {isSelected && (
                                            <div className="absolute top-5 right-5 text-emerald-500 animate-fade-in drop-shadow-sm">
                                                <CheckCircle2 className="w-7 h-7 flex-shrink-0 bg-white dark:bg-emerald-950 rounded-full" />
                                            </div>
                                        )}
                                        <p className="font-extrabold text-gray-900 dark:text-slate-100 mb-2 pr-10 text-lg tracking-tight">{addr.fullName}</p>
                                        <div className="text-sm text-gray-500 dark:text-slate-400 font-medium space-y-1.5">
                                            <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-slate-600"></span>{addr.email}</p>
                                            <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-slate-600"></span>{addr.phone}</p>
                                            <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-slate-800 break-words leading-relaxed">
                                                <span className="text-gray-700 dark:text-slate-300 block mb-0.5 font-semibold text-xs uppercase tracking-wider">Address</span>
                                                {addr.city}, {addr.state} - {addr.pinCode}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {showForm && (
                     <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-white/60 dark:border-slate-800/50 p-6 sm:p-10 animate-slide-up delay-100">
                        {addresses.length > 0 && (
                            <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-100 dark:border-slate-800">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Add New Address</h2>
                                <button 
                                    onClick={() => {
                                        setIsAddingNew(false);
                                        setAddress(addresses[0]); 
                                        setErrors({});
                                    }}
                                    className="text-sm font-bold text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200 bg-gray-100 dark:bg-slate-800 px-4 py-2 rounded-full transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                        <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }} className="space-y-8">
                            <div className="space-y-6">
                                {/* Full Name */}
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        value={address.fullName}
                                        onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                                        className={`w-full px-5 py-4 rounded-2xl border bg-white/50 dark:bg-slate-900/50 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm ${errors.fullName ? 'border-red-300 dark:border-red-500/50 focus:ring-red-500/50' : 'border-gray-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700'}`}
                                        placeholder="John Doe"
                                    />
                                    {errors.fullName && <p className="mt-2 text-sm text-red-500 dark:text-red-400 flex items-center gap-1.5 font-medium animate-fade-in"><AlertCircle className="w-4 h-4" />{errors.fullName}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={address.email}
                                            onChange={(e) => setAddress({ ...address, email: e.target.value })}
                                            className={`w-full px-5 py-4 rounded-2xl border bg-white/50 dark:bg-slate-900/50 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm ${errors.email ? 'border-red-300 dark:border-red-500/50 focus:ring-red-500/50' : 'border-gray-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700'}`}
                                            placeholder="john@example.com"
                                        />
                                        {errors.email && <p className="mt-2 text-sm text-red-500 dark:text-red-400 flex items-center gap-1.5 font-medium animate-fade-in"><AlertCircle className="w-4 h-4" />{errors.email}</p>}
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            value={address.phone}
                                            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                                            className={`w-full px-5 py-4 rounded-2xl border bg-white/50 dark:bg-slate-900/50 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm ${errors.phone ? 'border-red-300 dark:border-red-500/50 focus:ring-red-500/50' : 'border-gray-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700'}`}
                                            placeholder="9876543210"
                                        />
                                        {errors.phone && <p className="mt-2 text-sm text-red-500 dark:text-red-400 flex items-center gap-1.5 font-medium animate-fade-in"><AlertCircle className="w-4 h-4" />{errors.phone}</p>}
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-100 dark:border-slate-800 mt-8">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-6">Location Details</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        {/* PIN Code */}
                                        <div>
                                            <label htmlFor="pinCode" className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">PIN Code</label>
                                            <input
                                                type="text"
                                                id="pinCode"
                                                value={address.pinCode}
                                                onChange={(e) => setAddress({ ...address, pinCode: e.target.value })}
                                                className={`w-full px-5 py-4 rounded-2xl border bg-white/50 dark:bg-slate-900/50 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm ${errors.pinCode ? 'border-red-300 dark:border-red-500/50 focus:ring-red-500/50' : 'border-gray-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700'}`}
                                                placeholder="560001"
                                                maxLength={6}
                                            />
                                            {errors.pinCode && <p className="mt-2 text-sm text-red-500 dark:text-red-400 flex items-center gap-1.5 font-medium animate-fade-in"><AlertCircle className="w-4 h-4" />{errors.pinCode}</p>}
                                        </div>

                                        {/* City */}
                                        <div>
                                            <label htmlFor="city" className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">City</label>
                                            <input
                                                type="text"
                                                id="city"
                                                value={address.city}
                                                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                                className={`w-full px-5 py-4 rounded-2xl border bg-white/50 dark:bg-slate-900/50 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm ${errors.city ? 'border-red-300 dark:border-red-500/50 focus:ring-red-500/50' : 'border-gray-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700'}`}
                                                placeholder="Bengaluru"
                                            />
                                            {errors.city && <p className="mt-2 text-sm text-red-500 dark:text-red-400 flex items-center gap-1.5 font-medium animate-fade-in"><AlertCircle className="w-4 h-4" />{errors.city}</p>}
                                        </div>
                                    </div>

                                    {/* State */}
                                    <div>
                                        <label htmlFor="state" className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">State</label>
                                        <input
                                            type="text"
                                            id="state"
                                            value={address.state}
                                            onChange={(e) => setAddress({ ...address, state: e.target.value })}
                                            className={`w-full px-5 py-4 rounded-2xl border bg-white/50 dark:bg-slate-900/50 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm ${errors.state ? 'border-red-300 dark:border-red-500/50 focus:ring-red-500/50' : 'border-gray-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700'}`}
                                            placeholder="Karnataka"
                                        />
                                        {errors.state && <p className="mt-2 text-sm text-red-500 dark:text-red-400 flex items-center gap-1.5 font-medium animate-fade-in"><AlertCircle className="w-4 h-4" />{errors.state}</p>}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </main>

            {/* Sticky Bottom Action Bar with Back and Next Step */}
            <div className="fixed bottom-0 left-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border-t border-white/40 dark:border-slate-800/50 p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_-8px_30px_rgba(0,0,0,0.2)] z-50 animate-slide-up">
                <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
                    <Link
                        href="/"
                        className="flex-1 sm:flex-none flex justify-center items-center py-4 px-8 rounded-2xl bg-white dark:bg-slate-800 border border-gray-200/80 dark:border-slate-700/80 text-gray-700 dark:text-slate-200 font-bold text-lg transition-all hover:bg-gray-50 dark:hover:bg-slate-700 hover:border-gray-300 dark:hover:border-slate-600 shadow-sm gap-2 group"
                    >
                        <ArrowLeft className="w-5 h-5 hidden sm:block group-hover:-translate-x-1 transition-transform" />
                        Back
                    </Link>
                    
                    <button
                        onClick={handleNextStep}
                        className="flex-1 sm:flex-[2] flex justify-center items-center py-4 px-8 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-lg transition-all shadow-lg shadow-emerald-500/25 dark:shadow-emerald-900/40 hover:shadow-emerald-500/40 transform hover:-translate-y-0.5 gap-2 group"
                    >
                        Next Step
                        <ArrowRight className="w-5 h-5 hidden sm:block group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </>
    );
}
