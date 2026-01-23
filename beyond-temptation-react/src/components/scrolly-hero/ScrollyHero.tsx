import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "../../data/products";
import ProductFoodScroll from "./ProductFoodScroll";
import ProductTextOverlays from "./ProductTextOverlays";
import { ArrowLeft, ArrowRight, ShoppingCart, Zap, ShieldCheck } from "lucide-react";

const ScrollyHero: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const product = products[currentIndex];

    const nextProduct = () => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const prevProduct = () => {
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="relative bg-black text-white">
            {/* Navigation Arrows */}
            <div className="fixed top-1/2 left-4 z-50 -translate-y-1/2">
                <button
                    onClick={prevProduct}
                    className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all hover:scale-110 active:scale-95"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
            </div>
            <div className="fixed top-1/2 right-4 z-50 -translate-y-1/2">
                <button
                    onClick={nextProduct}
                    className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all hover:scale-110 active:scale-95"
                >
                    <ArrowRight className="w-6 h-6" />
                </button>
            </div>

            {/* Main Scrolly Experience */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <div className="relative h-[500vh]">
                        <ProductFoodScroll product={product} />
                        <ProductTextOverlays product={product} />
                    </div>

                    {/* Details Section */}
                    <section className="relative py-32 px-4 bg-zinc-950 border-t border-white/5">
                        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-4xl md:text-6xl font-black mb-8">
                                    {product.detailsSection.title}
                                </h3>
                                <p className="text-xl text-zinc-400 leading-relaxed mb-8">
                                    {product.detailsSection.description}
                                </p>
                                <div className="grid grid-cols-3 gap-4">
                                    {product.stats.map((stat, i) => (
                                        <div key={i} className="text-center p-4 rounded-2xl bg-white/5 border border-white/10">
                                            <div className="text-2xl font-black text-amber-500">{stat.val}</div>
                                            <div className="text-xs text-zinc-500 uppercase tracking-widest">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="aspect-square rounded-3xl overflow-hidden glass-morphism relative"
                                style={{ background: product.gradient }}
                            >
                                {/* Placeholder for detail image */}
                                <div className="absolute inset-0 flex items-center justify-center text-4xl font-black text-black/20 uppercase rotate-12">
                                    {product.name}
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* Indulgence CTA Section */}
                    <section className="relative py-24 px-4 overflow-hidden">
                        <div className="absolute inset-0 opacity-20" style={{ background: product.gradient, filter: 'blur(100px)' }} />
                        <div className="max-w-4xl mx-auto text-center relative z-10">
                            <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase italic">
                                {product.indulgenceSection.title}
                            </h2>
                            <p className="text-xl md:text-2xl text-zinc-300 mb-12">
                                {product.indulgenceSection.description}
                            </p>

                            <div className="flex flex-wrap items-center justify-center gap-6">
                                {product.features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20">
                                        <Zap className="w-4 h-4 text-amber-400" />
                                        <span className="text-sm font-bold uppercase tracking-wider">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Buy Now Section */}
                    <section className="relative py-32 px-4 bg-white text-black rounded-t-[4rem]">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid md:grid-cols-2 gap-16 items-center">
                                <div>
                                    <h2 className="text-6xl md:text-8xl font-black mb-4 uppercase tracking-tighter italic">
                                        {product.name}
                                    </h2>
                                    <div className="flex items-baseline gap-2 mb-8">
                                        <span className="text-5xl font-black">{product.buyNowSection.price}</span>
                                        <span className="text-zinc-500 text-xl">/ {product.buyNowSection.unit}</span>
                                    </div>

                                    <div className="space-y-6 mb-12">
                                        {product.buyNowSection.preparation.map((item, i) => (
                                            <div key={i} className="flex items-center gap-4 text-xl font-bold">
                                                <div className="w-2 h-2 rounded-full bg-black" />
                                                {item}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-100 border border-zinc-200 mb-12">
                                        <ShieldCheck className="w-6 h-6 text-emerald-600" />
                                        <div>
                                            <p className="font-bold text-sm uppercase">Guarantee</p>
                                            <p className="text-zinc-600 text-sm">{product.buyNowSection.returnPolicy}</p>
                                        </div>
                                    </div>

                                    <button
                                        className="w-full py-6 rounded-2xl bg-black text-white text-xl font-black flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
                                        style={{ background: product.themeColor, color: '#000' }}
                                    >
                                        <ShoppingCart className="w-6 h-6" />
                                        GIVE IN NOW
                                    </button>
                                </div>

                                <div className="relative aspect-square">
                                    <div className="absolute inset-0 rounded-[3rem] rotate-3" style={{ background: product.themeColor, opacity: 0.1 }} />
                                    <div className="absolute inset-0 rounded-[3rem] -rotate-3 border-4 border-black/5" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <p className="text-2xl font-black text-zinc-300 transform -rotate-45 uppercase pointer-events-none">
                                            Visualizing Indulgence
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </motion.div>
            </AnimatePresence>

            {/* Bottom Product Nav */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
                <div className="flex items-center gap-2 p-2 rounded-2xl bg-black/50 backdrop-blur-2xl border border-white/10">
                    {products.map((p, i) => (
                        <button
                            key={p.id}
                            onClick={() => {
                                setCurrentIndex(i);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${currentIndex === i
                                ? "bg-white text-black scale-105"
                                : "text-white/50 hover:text-white hover:bg-white/10"
                                }`}
                        >
                            {p.id.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScrollyHero;
