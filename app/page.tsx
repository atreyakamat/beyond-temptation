"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductFoodScroll from "@/components/ProductFoodScroll";
import ProductTextOverlays from "@/components/ProductTextOverlays";

// Chevron Left Icon
function ChevronLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

// Chevron Right Icon
function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const product = products[currentIndex];

  const nextProduct = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToProduct = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Reset scroll on product change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [currentIndex]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-cheese selection:text-black overflow-x-hidden">
      <Navbar />

      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={product.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="w-full"
        >
          {/* 1. Scrollytelling Section (500vh) */}
          <ProductFoodScroll product={product} />

          {/* 2. Visual Details Section */}
          <section className="relative z-10 bg-black border-t border-white/10 py-24 px-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2">
                {/* Placeholder for detail image - in real app, use Image component */}
                <div
                  className="w-full aspect-square rounded-2xl overflow-hidden bg-white/5 relative group"
                  style={{ boxShadow: `0 0 50px ${product.themeColor}20` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent z-10" />
                  {/* We use the theme gradient as a placeholder visual if image is missing */}
                  <div className="w-full h-full" style={{ background: product.gradient, opacity: 0.3 }} />
                  <div className="absolute bottom-8 left-8 z-20">
                    <p className="uppercase tracking-widest text-xs font-bold mb-2 text-white/60">Specification</p>
                    <h3 className="text-3xl font-bold text-white">{product.detailsSection.title}</h3>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  {product.detailsSection.title}
                </h2>
                <p className="text-lg text-white/70 leading-relaxed border-l-2 border-cheese pl-6">
                  {product.detailsSection.description}
                </p>

                <div className="grid grid-cols-2 gap-6 mt-8">
                  {product.features.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full" style={{ background: product.themeColor }} />
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-white/10 flex justify-between">
                  {product.stats.map((stat, i) => (
                    <div key={i}>
                      <p className="text-xs uppercase tracking-wider text-white/50 mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold" style={{ color: product.themeColor }}>{stat.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 3. Indulgence Section */}
          <section className="relative z-10 py-32 px-8 overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ background: product.gradient }} />
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-none">
                {product.indulgenceSection.title}
              </h2>
              <p className="text-xl md:text-2xl text-white/80 font-light">
                {product.indulgenceSection.description}
              </p>
            </div>
          </section>

          {/* 4. Buy Now Section */}
          <section className="relative z-10 bg-[#0f0f0f] py-24 px-8 border-t border-white/5">
            <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-16 border border-white/10 flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 space-y-6">
                <div className="inline-block px-4 py-1 rounded-full border border-white/20 text-xs uppercase tracking-widest mb-4">
                  Available Now
                </div>
                <h2 className="text-5xl font-bold tabular-nums">
                  {product.buyNowSection.price}
                  <span className="text-xl text-white/50 font-normal ml-2">{product.buyNowSection.unit}</span>
                </h2>
                <p className="text-white/60">{product.buyNowSection.deliveryPromise}</p>

                <ul className="space-y-2 mt-6">
                  {product.buyNowSection.preparation.map((prep, i) => (
                    <li key={i} className="text-sm flex items-center text-cheese">
                      <span className="mr-2">✓</span> {prep}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex-1 w-full text-center">
                <button className="w-full py-6 bg-gradient-to-r from-cheese to-fry text-black font-black text-xl uppercase tracking-widest hover:scale-105 transition-transform duration-300 rounded-xl shadow-[0_0_40px_rgba(244,162,97,0.4)]">
                  Add to Order
                </button>
                <p className="mt-4 text-xs text-white/40">{product.buyNowSection.returnPolicy}</p>
              </div>
            </div>
          </section>

          {/* 5. Next CTA */}
          <section className="relative z-10 bg-black py-32 text-center cursor-pointer group" onClick={nextProduct}>
            <p className="text-white/50 uppercase tracking-widest text-sm mb-4">Up Next</p>
            <h2 className="text-4xl md:text-6xl font-bold group-hover:text-cheese transition-colors duration-500">
              {products[(currentIndex + 1) % products.length].name} →
            </h2>
          </section>

          <Footer />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-6 bg-black/80 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-2xl">
        <button
          onClick={prevProduct}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Previous Product"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex gap-3">
          {products.map((p, i) => (
            <button
              key={p.id}
              onClick={() => goToProduct(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-cheese scale-125' : 'bg-white/20 hover:bg-white/40'}`}
              aria-label={`Go to ${p.name}`}
            />
          ))}
        </div>

        <button
          onClick={nextProduct}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Next Product"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Side Navigation Arrows (Desktop) */}
      <button
        onClick={prevProduct}
        className="fixed top-1/2 left-4 md:left-8 z-40 p-4 rounded-full bg-black/20 backdrop-blur hover:bg-white/10 border border-white/5 transition-all hidden md:block"
      >
        <ChevronLeft className="w-8 h-8 opacity-50 hover:opacity-100" />
      </button>

      <button
        onClick={nextProduct}
        className="fixed top-1/2 right-4 md:right-8 z-40 p-4 rounded-full bg-black/20 backdrop-blur hover:bg-white/10 border border-white/5 transition-all hidden md:block"
      >
        <ChevronRight className="w-8 h-8 opacity-50 hover:opacity-100" />
      </button>

    </main>
  );
}
