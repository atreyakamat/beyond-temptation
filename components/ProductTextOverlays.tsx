"use client";

import React from "react";
import { MotionValue, motion, useTransform } from "framer-motion";
import { Product } from "@/data/products";

interface Props {
    product: Product;
    scrollYProgress: MotionValue<number>;
}

export default function ProductTextOverlays({ product, scrollYProgress }: Props) {
    // Section 1: Intro (0 - 0.2)
    const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

    // Section 2: Experience (0.25 - 0.45)
    const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
    const scale2 = useTransform(scrollYProgress, [0.2, 0.5], [0.8, 1]);

    // Section 3: Detail (0.5 - 0.7)
    const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
    const x3 = useTransform(scrollYProgress, [0.5, 0.8], [100, 0]);

    // Section 4: Climax (0.75 - 1.0)
    const opacity4 = useTransform(scrollYProgress, [0.75, 0.85, 1], [0, 1, 1]);
    const y4 = useTransform(scrollYProgress, [0.75, 1], [50, 0]);

    return (
        <div className="absolute inset-0 pointer-events-none z-10 w-full h-full flex flex-col justify-between">
            {/* Sticky container for text forces them to stay in view while scrolling effectively */}
            {/* Actually, since ProductFoodScroll is 500vh, we need these texts to appear at specific scroll positions.
           But usually, we want them fixed on screen while the user scrolls through the 500vh.
           So we use a sticky or fixed container INSIDE the sticky parent of ProductFoodScroll.
           The parent ProductFoodScroll has a sticky div. We should render this inside that sticky div.
       */}

            {/* Section 1 */}
            <motion.div
                style={{ opacity: opacity1, y: y1 }}
                className="absolute top-1/3 left-10 md:left-20 max-w-xl"
            >
                <h2 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50 leading-tight">
                    {product.section1.title}
                </h2>
                <p className="text-xl md:text-2xl text-cheese mt-4 font-light tracking-wider">
                    {product.section1.subtitle}
                </p>
            </motion.div>

            {/* Section 2 */}
            <motion.div
                style={{ opacity: opacity2, scale: scale2 }}
                className="absolute top-1/2 right-10 md:right-20 max-w-xl text-right transform -translate-y-1/2"
            >
                <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                    {product.section2.title}
                </h2>
                <p className="text-xl text-fry mt-4 font-medium">
                    {product.section2.subtitle}
                </p>
            </motion.div>

            {/* Section 3 */}
            <motion.div
                style={{ opacity: opacity3, x: x3 }}
                className="absolute bottom-1/4 left-10 md:left-20 max-w-xl"
            >
                <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                    {product.section3.title}
                </h2>
                <p className="text-xl text-white/70 mt-4">
                    {product.section3.subtitle}
                </p>
            </motion.div>

            {/* Section 4 */}
            <motion.div
                style={{ opacity: opacity4, y: y4 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full"
            >
                <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase ml-4">
                    {product.section4.title}
                </h2>
                {/* <p className="text-2xl text-cheese mt-6 font-bold uppercase tracking-widest">
            {product.section4.subtitle}
        </p> */}
            </motion.div>
        </div>
    );
}
