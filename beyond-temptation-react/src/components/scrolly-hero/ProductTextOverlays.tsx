import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Product } from "../../data/products";

interface ProductTextOverlaysProps {
    product: Product;
}

const TextSection: React.FC<{
    title: string;
    subtitle: string;
    progress: MotionValue<number>;
    range: [number, number]
}> = ({ title, subtitle, progress, range }) => {
    const opacity = useTransform(progress,
        [range[0], range[0] + 0.05, range[1] - 0.05, range[1]],
        [0, 1, 1, 0]
    );

    const y = useTransform(progress,
        [range[0], range[0] + 0.05, range[1] - 0.05, range[1]],
        [50, 0, 0, -50]
    );

    return (
        <motion.div
            style={{ opacity, y }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
        >
            <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-2xl">
                {title}
            </h2>
            <p className="text-xl md:text-3xl text-amber-400 font-medium tracking-wide">
                {subtitle}
            </p>
        </motion.div>
    );
};

const ProductTextOverlays: React.FC<ProductTextOverlaysProps> = ({ product }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const sections = [
        product.section1,
        product.section2,
        product.section3,
        product.section4,
    ];

    return (
        <div ref={containerRef} className="absolute inset-0 h-[500vh] pointer-events-none">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {sections.map((section, index) => {
                    const step = 1 / sections.length;
                    const start = index * step;
                    const end = (index + 1) * step;

                    return (
                        <TextSection
                            key={index}
                            title={section.title}
                            subtitle={section.subtitle}
                            progress={scrollYProgress}
                            range={[start, end]}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ProductTextOverlays;
