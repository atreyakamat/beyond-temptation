"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { useScroll, motion } from "framer-motion";
import { Product } from "@/data/products";
import ProductTextOverlays from "./ProductTextOverlays";

interface Props {
    product: Product;
}

export default function ProductFoodScroll({ product }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loaded, setLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Preload images
    useEffect(() => {
        setLoaded(false);
        const imgArray: HTMLImageElement[] = [];
        const frameCount = 120;
        let loadedCount = 0;

        // Use a promise-based approach or just simple loop
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            // Assuming public/images/{product.id}/{i}.webp
            // The data product.folderPath is like "/images/pizza"
            img.src = `${product.folderPath}/${i}.webp`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === frameCount) setLoaded(true);
            };
            imgArray.push(img);
        }
        setImages(imgArray);
    }, [product.folderPath]);

    // Canvas Drawing
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || images.length === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // We assume images are sorted 1..120. 
        // Usually new Image() calls in loop end up in order in array if pushed synchronously, 
        // but network load time varies. 
        // It is safer to assign to specific index, but here we just pushed.
        // Let's fix the array order by re-mapping logic if needed, 
        // but the prompt implies simple 1..120 loading. 
        // A safer way is to store by index, but for this demo:
        // We already pushed them in order 1..120. 
        // Wait, the 'onload' doesn't guarantee readiness order, but the PUSH order IS guaranteed 
        // because JS is single threaded for the loop.
        // So images[0] is frame 1, images[1] is frame 2, etc.

        // Resize handler
        const handleResize = () => {
            // Handle High DPI
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.scale(dpr, dpr);

            // Trigger a redraw? relying on scroll update
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial size

        const unsubscribe = scrollYProgress.on("change", (latest) => {
            const frameIndex = Math.min(
                images.length - 1,
                Math.floor(latest * (images.length - 1))
            );
            const img = images[frameIndex];

            // We need to check if img is defined and loaded
            if (img && img.complete && img.naturalWidth > 0) {
                const dpr = window.devicePixelRatio || 1;
                // Ensure canvas size is correct (sometimes resize event misses)
                // But doing it every frame is expensive? 
                // Better to rely on valid state.

                const targetWidth = window.innerWidth;
                const targetHeight = window.innerHeight;

                // Contain logic to keep aspect ratio
                const scale = Math.min(targetWidth / img.width, targetHeight / img.height);
                const w = img.width * scale;
                const h = img.height * scale;
                const x = (targetWidth - w) / 2;
                const y = (targetHeight - h) / 2;

                ctx.clearRect(0, 0, targetWidth, targetHeight);
                ctx.drawImage(img, x, y, w, h);
            }
        });

        // Clean up
        return () => {
            unsubscribe();
            window.removeEventListener('resize', handleResize);
        };

    }, [scrollYProgress, images, loaded]);

    return (
        <div ref={containerRef} className="relative h-[500vh] w-full bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Canvas Layer */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-contain z-0"
                />

                {/* Gradients / Vignette for blending */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none z-0" />

                {/* Text Overlays Layer */}
                <ProductTextOverlays product={product} scrollYProgress={scrollYProgress} />
            </div>
        </div>
    );
}
