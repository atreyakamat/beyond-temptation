import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";

/** Marquee that speeds up with scroll velocity and reverses when you scroll up. */
export default function Marquee({
  items = ["Burgers", "Pizza", "Thick shakes", "Cold coffee", "Loaded sandwiches", "Brownie sizzlers", "Mapusa"],
  tone = "yellow",
  baseSpeed = 2,
}: {
  items?: string[];
  tone?: "yellow" | "black";
  baseSpeed?: number;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = dir.current * baseSpeed * (delta / 1000) * 20;
    const v = factor.get();
    if (v < 0) dir.current = -1;
    else if (v > 0) dir.current = 1;
    move += dir.current * Math.abs(v) * (delta / 1000) * 20;
    x.set(wrap(-50, 0, x.get() + move * -1 * 0.1));
  });

  const pct = useTransform(x, (v) => `${v}%`);
  const wrapCls = tone === "yellow" ? "bg-yellow text-ink" : "bg-ink text-yellow";
  const doubled = [...items, ...items];

  return (
    <div className={`overflow-hidden border-y-4 border-ink py-3 ${wrapCls}`} aria-hidden>
      <motion.div
        style={{ x: pct }}
        className="flex w-max whitespace-nowrap font-display text-2xl font-extrabold will-change-transform md:text-4xl"
      >
        {doubled.map((t, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6">{t}</span>
            <span className="inline-block h-3 w-3 rotate-45 bg-current" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
