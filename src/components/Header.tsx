"use client";

import Link from "next/link";
import { Leaf, Sun, Moon, Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useCheckout, ThemeColor } from "@/context/CheckoutContext";

export function Header() {
    const { theme, setTheme } = useTheme();
    const { themeColor, setThemeColor } = useCheckout();
    const [mounted, setMounted] = useState(false);
    const [showPicker, setShowPicker] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const themes: { name: ThemeColor; bg: string }[] = [
        { name: 'emerald', bg: 'bg-emerald-500' },
        { name: 'blue', bg: 'bg-blue-500' },
        { name: 'violet', bg: 'bg-violet-500' },
        { name: 'rose', bg: 'bg-rose-500' },
        { name: 'amber', bg: 'bg-amber-500' },
    ];

    return (
        <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-white/20 dark:border-slate-800/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all animate-fade-in">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group transition-all shrink-0">
                    <div className="bg-gradient-to-br from-primary-400 to-primary-600 p-1.5 rounded-xl shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-all duration-300">
                        <Leaf className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-primary-800 to-primary-600 dark:from-primary-400 dark:to-primary-200 bg-clip-text text-transparent">Ecoyaan</span>
                </Link>

                <div className="flex items-center gap-2 sm:gap-4">
                    <div className="text-sm font-semibold bg-gray-100/50 dark:bg-slate-800/50 text-gray-600 dark:text-slate-300 px-3 py-1 rounded-full border border-gray-200/50 dark:border-slate-700/50 backdrop-blur-sm shadow-sm hidden md:block">
                        Secure Checkout
                    </div>
                    
                    {mounted && (
                        <div className="flex items-center gap-2 bg-gray-50/50 dark:bg-slate-800/50 p-1 rounded-2xl border border-gray-200/50 dark:border-slate-700/50 shadow-inner">
                            {/* Theme Color Picker */}
                            <div className="relative flex items-center">
                                <button
                                    onClick={() => setShowPicker(!showPicker)}
                                    className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 hover:text-primary-600 dark:hover:text-primary-400 transition-all"
                                    aria-label="Change Theme Color"
                                >
                                    <Palette className="w-5 h-5" />
                                </button>
                                
                                {showPicker && (
                                    <div className="absolute top-12 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-gray-200 dark:border-slate-700 p-3 rounded-2xl shadow-xl flex gap-2 animate-slide-up z-[60]">
                                        {themes.map((t) => (
                                            <button
                                                key={t.name}
                                                onClick={() => {
                                                    setThemeColor(t.name);
                                                    setShowPicker(false);
                                                }}
                                                className={`w-8 h-8 rounded-full ${t.bg} border-2 ${themeColor === t.name ? 'border-white dark:border-slate-200 ring-2 ring-primary-500' : 'border-transparent'} hover:scale-110 transition-transform shadow-sm`}
                                                title={t.name.charAt(0).toUpperCase() + t.name.slice(1)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="w-px h-4 bg-gray-200 dark:bg-slate-700 mx-1"></div>

                            {/* Dark Mode Toggle */}
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 transition-all"
                                aria-label="Toggle Dark Mode"
                            >
                                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-primary-600" />}
                            </button>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Overlay to close picker */}
            {showPicker && (
                <div 
                    className="fixed inset-0 z-[55] pointer-events-auto" 
                    onClick={() => setShowPicker(false)}
                />
            )}
        </header>
    );
}

