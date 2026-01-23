import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Product } from "../../data/products";

interface ProductFoodScrollProps {
    product: Product;
}

const ProductFoodScroll: React.FC<ProductFoodScrollProps> = ({ product }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map scroll progress (0-1) to frame index (1-totalFrames)
    const frameIndex = useTransform(scrollYProgress, [0, 1], [1, product.totalFrames]);

    // Load all images for the current product
    useEffect(() => {
        let isMounted = true;
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        const loadImage = (index: number) => {
            const img = new Image();
            img.src = `${product.folderPath}/${index}.${product.imageExtension}`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === product.totalFrames && isMounted) {
                    setImages(loadedImages);
                    setImagesLoaded(true);
                }
            };
            loadedImages[index - 1] = img;
        };

        for (let i = 1; i <= product.totalFrames; i++) {
            loadImage(i);
        }

        return () => {
            isMounted = false;
        };
    }, [product]);

    // Draw the current frame on canvas
    useEffect(() => {
        const render = () => {
            const canvas = canvasRef.current;
            const context = canvas?.getContext("2d");
            if (!canvas || !context || !imagesLoaded) return;

            const index = Math.floor(frameIndex.get());
            const img = images[index - 1];

            if (img) {
                // Clear and draw image with contain fit
                context.clearRect(0, 0, canvas.width, canvas.height);

                const canvasAspect = canvas.width / canvas.height;
                const imgAspect = img.width / img.height;

                let drawWidth, drawHeight, offsetX, offsetY;

                if (canvasAspect > imgAspect) {
                    drawHeight = canvas.height;
                    drawWidth = canvas.height * imgAspect;
                    offsetX = (canvas.width - drawWidth) / 2;
                    offsetY = 0;
                } else {
                    drawWidth = canvas.width;
                    drawHeight = canvas.width / imgAspect;
                    offsetX = 0;
                    offsetY = (canvas.height - drawHeight) / 2;
                }

                context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            }
        };

        // Use requestAnimationFrame for smooth updates
        const unsubscribe = frameIndex.on("change", () => {
            requestAnimationFrame(render);
        });

        // Initial render
        render();

        return () => unsubscribe();
    }, [images, imagesLoaded, frameIndex]);

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                canvas.width = window.innerWidth * window.devicePixelRatio;
                canvas.height = window.innerHeight * window.devicePixelRatio;
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div ref={containerRef} className="relative h-[500vh] w-full">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-contain"
                    style={{
                        maxWidth: "100%",
                        maxHeight: "100vh",
                    }}
                />

                {!imagesLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
                        <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-white font-bold text-xl uppercase tracking-widest"
                        >
                            Loading Indulgence...
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductFoodScroll;
