"use client";

import Link from "next/link";
import { Leaf, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="fixed top-0 w-full z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-white/20 dark:border-slate-800/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all animate-fade-in">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group transition-all">
                    <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 p-1.5 rounded-xl shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-300">
                        <Leaf className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-emerald-800 to-emerald-600 dark:from-emerald-400 dark:to-emerald-200 bg-clip-text text-transparent">Ecoyaan</span>
                </Link>
                <div className="flex items-center gap-4">
                    <div className="text-sm font-semibold bg-gray-100/50 dark:bg-slate-800/50 text-gray-600 dark:text-slate-300 px-3 py-1 rounded-full border border-gray-200/50 dark:border-slate-700/50 backdrop-blur-sm shadow-sm hidden sm:block">
                        Secure Checkout
                    </div>
                    
                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200/50 dark:border-slate-700/50 shadow-sm"
                            aria-label="Toggle Dark Mode"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}

