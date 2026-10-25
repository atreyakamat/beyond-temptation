import { motion, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";

/**
 * Animated hero backdrop: drifting colour blobs (transform-only keyframes),
 * a cursor-following glow, and a chocolate-drip edge like the menu card.
 */
export default function Backdrop({ sx, sy }: { sx: MotionValue<number>; sy: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const glowX = useTransform(sx, (v) => `${50 + v * 60}%`);
  const glowY = useTransform(sy, (v) => `${45 + v * 60}%`);
  const glow = useSpring(useTransform([glowX, glowY], ([x, y]) =>
    `radial-gradient(520px circle at ${x} ${y}, rgba(255,214,10,0.22), rgba(255,59,31,0.10) 40%, transparent 70%)`,
  ), { stiffness: 60, damping: 20 });

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* base: deep chocolate → black */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,#2A1510_0%,#120906_45%,#000_100%)]" />

      {/* drifting blobs */}
      <div className={`blob blob-a ${reduce ? "" : "animate-blob-a"}`} />
      <div className={`blob blob-b ${reduce ? "" : "animate-blob-b"}`} />
      <div className={`blob blob-c ${reduce ? "" : "animate-blob-c"}`} />

      {/* cursor glow */}
      <motion.div style={{ backgroundImage: glow }} className="absolute inset-0 will-change-[background]" />

      {/* dot grid for texture */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      {/* chocolate drip from the top, like the menu card */}
      <svg
        className={`absolute -top-1 left-0 w-full text-[#3B1F14] ${reduce ? "" : "animate-drip"}`}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0 0h1440v38c-30 0-40 46-70 46s-30-30-60-30-26 58-56 58-28-44-58-44-30 24-60 24-22-52-52-52-32 36-62 36-30-20-60-20-24 62-54 62-30-50-60-50-26 28-56 28-30-40-60-40-28 54-58 54-30-30-60-30-26 44-56 44-30-62-60-62-28 30-58 30-30-24-60-24-24 50-54 50-30-40-60-40-26 20-56 20-30-58-60-58-28 38-58 38-30-16-60-16-24 50-54 50-30-50-60-50-26 20-56 20-30-28-60-28V0Z"
        />
      </svg>

      {/* grain */}
      <div className="grain absolute inset-0" />
    </div>
  );
}
