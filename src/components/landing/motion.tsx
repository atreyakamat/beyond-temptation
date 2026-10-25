import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, type HTMLMotionProps } from "framer-motion";

/** Button/link that leans toward the cursor. Transform-only, so it stays on the compositor. */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
  ...rest
}: { children: React.ReactNode; strength?: number } & HTMLMotionProps<"a">) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className={`will-change-transform ${className}`}
      {...rest}
    >
      {children}
    </motion.a>
  );
}

/** Heading that unmasks line-by-line as it scrolls into view. */
export function RevealLines({
  lines,
  className = "",
  as: Tag = "h2",
}: {
  lines: string[];
  className?: string;
  as?: "h1" | "h2" | "p";
}) {
  const MTag = motion[Tag];
  return (
    <MTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: 0.09 }}
    >
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            variants={{
              hidden: { y: "105%", rotate: 3 },
              show: { y: 0, rotate: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="block origin-left will-change-transform"
          >
            {l}
          </motion.span>
        </span>
      ))}
    </MTag>
  );
}

/** Per-letter stagger for the hero headline. */
export function SplitWord({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="block overflow-hidden" aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          initial={{ y: "110%", rotate: 8 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: delay + i * 0.035, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block origin-bottom-left will-change-transform"
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}
