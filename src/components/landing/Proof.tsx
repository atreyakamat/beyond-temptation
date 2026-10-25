import { useEffect, useRef } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { site } from "../../data/site";

export default function Proof() {
  return (
    <section className="bg-yellow py-16 text-ink md:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="font-display text-display-md max-w-md">
          Rated by the people who actually eat here.
        </p>
        <ul className="flex flex-wrap gap-4 md:gap-6">
          {site.ratings.map((r, i) => (
            <motion.li
              key={r.source}
              initial={{ rotate: -8, scale: 0.8, opacity: 0 }}
              whileInView={{ rotate: i % 2 ? 3 : -3, scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 14, delay: i * 0.1 }}
              className="flex h-36 w-36 flex-col items-center justify-center rounded-full border-4 border-ink bg-paper shadow-hard"
            >
              <CountUp value={r.score} />
              <span className="mt-1 font-display text-base font-bold">{r.source}</span>
              <span className="text-xs text-smoke">{r.count}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!inView || !ref.current) return;
    const target = parseFloat(value);
    ref.current.textContent = "0.0";
    if (reduce || Number.isNaN(target)) {
      ref.current.textContent = value;
      return;
    }
    const ctrl = animate(0, target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = v.toFixed(1);
      },
    });
    return () => ctrl.stop();
  }, [inView, value, reduce]);
  return (
    <span ref={ref} className="font-display text-5xl font-extrabold leading-none tabular-nums">
      {value}
    </span>
  );
}
