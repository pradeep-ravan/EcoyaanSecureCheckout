import Link from "next/link";
import { Leaf } from "lucide-react";

export function Header() {
    return (
        <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all animate-fade-in">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group transition-all">
                    <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 p-1.5 rounded-xl shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-300">
                        <Leaf className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-emerald-800 to-emerald-600 bg-clip-text text-transparent">Ecoyaan</span>
                </Link>
                <div className="text-sm font-semibold bg-gray-100/50 text-gray-600 px-3 py-1 rounded-full border border-gray-200/50 backdrop-blur-sm shadow-sm">
                    Secure Checkout
                </div>
            </div>
        </header>
    );
}
