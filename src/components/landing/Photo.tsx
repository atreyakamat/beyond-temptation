import { useEffect, useState } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

/**
 * Renders `fallback` immediately (safe before hydration), then swaps to `src`
 * once the real photo is confirmed to load. Lets the owner drop files into
 * public/photos without any build step.
 */
export default function Photo({
  src,
  fallback,
  alt,
  ...rest
}: { src: string; fallback: string; alt: string } & Omit<HTMLMotionProps<"img">, "src" | "alt">) {
  const [real, setReal] = useState<string | null>(null);
  useEffect(() => {
    const img = new Image();
    img.onload = () => setReal(src);
    img.src = src;
  }, [src]);
  return <motion.img src={real ?? fallback} alt={alt} loading="lazy" decoding="async" {...rest} />;
}
