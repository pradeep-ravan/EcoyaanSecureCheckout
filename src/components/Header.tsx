import Link from "next/link";
import { Leaf } from "lucide-react";

export function Header() {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800 transition-colors">
                    <Leaf className="w-8 h-8" />
                    <span className="font-bold text-xl tracking-tight">Ecoyaan</span>
                </Link>
                <div className="text-sm text-gray-500 font-medium">
                    Secure Checkout
                </div>
            </div>
        </header>
    );
}
