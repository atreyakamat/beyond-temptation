import React from "react";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6 bg-black/10 backdrop-blur-md border-b border-white/5">
            <Link href="/" className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cheese to-fry hover:from-fry hover:to-cheese transition-all duration-500">
                Beyond Temptation
            </Link>
            <button className="px-6 py-2 rounded-full border border-cheese/50 text-cheese hover:bg-cheese hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(244,162,97,0.2)] hover:shadow-[0_0_25px_rgba(244,162,97,0.6)] font-medium uppercase tracking-widest text-sm">
                Order Now
            </button>
        </nav>
    );
}
