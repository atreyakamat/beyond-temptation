import React from "react";

export default function Footer() {
    return (
        <footer className="w-full bg-[#1a1a1a] text-white/60 py-16 px-8 mt-20 border-t border-white/5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="md:col-span-1">
                    <h3 className="text-2xl font-bold text-white mb-6">Beyond Temptation</h3>
                    <p className="text-sm leading-relaxed">
                        Where visual craving meets actual taste. Indulgence engineered for the modern palate.
                    </p>
                </div>
                <div>
                    <h4 className="text-white font-medium mb-4 uppercase tracking-wider text-xs">Menu</h4>
                    <ul className="space-y-3 text-sm">
                        <li className="hover:text-cheese transition-colors cursor-pointer">Molten Pizza</li>
                        <li className="hover:text-fry transition-colors cursor-pointer">Golden Fries</li>
                        <li className="hover:text-shake transition-colors cursor-pointer">Velvet Shake</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-medium mb-4 uppercase tracking-wider text-xs">Support</h4>
                    <ul className="space-y-3 text-sm">
                        <li className="hover:text-white transition-colors cursor-pointer">Order Tracking</li>
                        <li className="hover:text-white transition-colors cursor-pointer">FAQs</li>
                        <li className="hover:text-white transition-colors cursor-pointer">Contact Us</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-medium mb-4 uppercase tracking-wider text-xs">Newsletter</h4>
                    <div className="flex">
                        <input
                            type="email"
                            placeholder="Enter email"
                            className="bg-white/5 border border-white/10 px-4 py-2 rounded-l-md w-full focus:outline-none focus:border-cheese/50 transition-colors"
                        />
                        <button className="bg-cheese text-black px-4 py-2 rounded-r-md font-medium hover:bg-cheese-dark transition-colors">
                            →
                        </button>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs">
                <p>&copy; {new Date().getFullYear()} Beyond Temptation. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <span className="cursor-pointer hover:text-white">Privacy</span>
                    <span className="cursor-pointer hover:text-white">Terms</span>
                </div>
            </div>
        </footer>
    );
}
