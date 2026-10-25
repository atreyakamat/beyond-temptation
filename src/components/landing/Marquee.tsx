import { useMemo, useRef } from "react";
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
import { menu, formatPrice } from "../../data/menu";

type Entry = { name: string; price: string; nonVeg?: boolean };

/** Pull a spread of real dishes from the menu, one or two per section, in a fixed shuffle. */
function pickDishes(seed: number, perSection = 2): Entry[] {
  const out: Entry[] = [];
  menu.forEach((s, si) => {
    const starred = s.items.filter((d) => d.star);
    const pool = starred.length ? starred : s.items;
    for (let k = 0; k < perSection && k < pool.length; k++) {
      const d = pool[(si * 7 + k * 3 + seed) % pool.length];
      if (!out.find((e) => e.name === d.name)) out.push({ name: d.name, price: formatPrice(d.price), nonVeg: d.nonVeg });
    }
  });
  // deterministic interleave so sections don't clump
  return out.sort((a, b) => ((a.name.length * 31 + seed) % 17) - ((b.name.length * 31 + seed) % 17));
}

const STYLES = [
  "font-display font-extrabold text-3xl md:text-5xl",
  "font-accent italic text-4xl md:text-6xl",
  "font-display font-bold text-2xl md:text-4xl uppercase tracking-tight",
  "font-accent italic text-3xl md:text-5xl",
];

/** Dish marquee: real menu items in mixed type, speeds up with scroll and reverses when you scroll up. */
export default function Marquee({
  tone = "yellow",
  seed = 0,
  baseSpeed = 2,
}: {
  tone?: "yellow" | "black";
  seed?: number;
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
    x.set(wrap(-50, 0, x.get() + move * -0.1));
  });

  const pct = useTransform(x, (v) => `${v}%`);
  const dishes = useMemo(() => pickDishes(seed), [seed]);
  const doubled = [...dishes, ...dishes];

  const wrapCls = tone === "yellow" ? "bg-yellow text-ink" : "bg-ink text-yellow";
  const tagCls = tone === "yellow" ? "bg-ink text-yellow" : "bg-yellow text-ink";

  return (
    <div className={`overflow-hidden border-y-4 border-ink py-4 ${wrapCls}`} aria-hidden>
      <motion.div style={{ x: pct }} className="flex w-max items-center whitespace-nowrap will-change-transform">
        {doubled.map((d, i) => (
          <span key={i} className="flex items-center gap-4 px-5">
            <span className={`${STYLES[(i + seed) % STYLES.length]} leading-none`}>{d.name}</span>
            <span className={`rounded-full px-2.5 py-1 font-display text-sm font-bold ${tagCls}`}>{d.price}</span>
            <span className={`inline-block h-2.5 w-2.5 rotate-45 ${d.nonVeg ? "bg-tomato" : "bg-current"}`} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
