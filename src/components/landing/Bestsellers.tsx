import { useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { RevealLines } from "./motion";
import { bestsellers, links, type MenuItem } from "../../data/site";

const CATS = ["All", "Burgers", "Pizza", "Sandwiches", "Shakes", "Coffee", "Desserts"] as const;

export default function Bestsellers() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const items = cat === "All" ? bestsellers : bestsellers.filter((b) => b.category === cat);

  return (
    <section id="bestsellers" className="bg-cream py-20 text-ink md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <RevealLines lines={["What people", "keep coming back for"]} className="font-display text-display-lg" />
          <div className="max-w-sm">
            <p className="text-lg text-smoke">
              The bestsellers, as voted by the counter queue. Tap a card to order it straight on WhatsApp.
            </p>
            <a href="/menu" className="mt-3 inline-block font-display text-lg font-bold underline decoration-4 decoration-yellow underline-offset-4 hover:decoration-ink">
              Full menu with prices
            </a>
          </div>
        </div>

        <div className="mt-10 flex gap-2 overflow-x-auto pb-2 no-scrollbar" role="tablist" aria-label="Menu categories">
          {CATS.map((c) => {
            const active = c === cat;
            return (
              <button
                key={c}
                role="tab"
                aria-selected={active}
                onClick={() => setCat(c)}
                className={`shrink-0 rounded-full border-2 border-ink px-5 py-2 font-display text-base font-bold transition-all ${
                  active ? "bg-ink text-yellow shadow-hard-sm" : "bg-transparent hover:bg-yellow"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        <LayoutGroup>
          <motion.div layout className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {items.map((item, idx) => (
                <Card key={item.name} item={item} idx={idx} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}

function Card({ item, idx }: { item: MenuItem; idx: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });
  const shineX = useTransform(sry, [-10, 10], ["0%", "100%"]);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 16);
    rx.set(-py * 16);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={links.whatsapp(`Hi! I'd like to order a ${item.name} (${item.price}).`)}
      target="_blank"
      rel="noopener"
      layout
      initial={{ opacity: 0, scale: 0.9, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 26, delay: idx * 0.04 }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      className="group relative block overflow-hidden rounded-2xl border-2 border-ink bg-paper shadow-hard will-change-transform transition-shadow hover:shadow-[10px_10px_0_0_#000]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <motion.div
          aria-hidden
          style={{ left: shineX }}
          className="pointer-events-none absolute top-0 h-full w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
        />
        {item.tag && (
          <span
            className="absolute left-3 top-3 rotate-[-4deg] rounded-md border-2 border-ink px-2 py-1 font-display text-sm font-bold text-ink shadow-hard-sm"
            style={{ background: item.accent, color: item.accent === "#FF3B1F" ? "#fff" : "#000" }}
          >
            {item.tag}
          </span>
        )}
        <span className="absolute bottom-3 right-3 rounded-full bg-ink px-3 py-1 font-display text-lg font-bold text-yellow">
          {item.price}
        </span>
      </div>
      <div className="flex items-start justify-between gap-3 p-5">
        <div>
          <h3 className="font-display text-2xl font-bold leading-tight">{item.name}</h3>
          <p className="mt-1 text-smoke">{item.blurb}</p>
        </div>
        <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-ink transition-colors group-hover:bg-yellow">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </span>
      </div>
    </motion.a>
  );
}
