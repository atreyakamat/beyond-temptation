import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { formatPrice, menu } from "../../data/menu";
import { links } from "../../data/site";
import { RevealLines } from "./motion";

const SHAKE_SECTIONS = ["chocolate-shakes", "mastani-shakes", "thick-shakes", "fruit-shakes"];
const PALETTE: Record<string, { bg: string; fg: string; label: string }> = {
  "chocolate-shakes": { bg: "#3B1F14", fg: "#FFD60A", label: "Chocolate" },
  "mastani-shakes": { bg: "#FF3B1F", fg: "#FFFFFF", label: "Mastani" },
  "thick-shakes": { bg: "#FFD60A", fg: "#000000", label: "Thick" },
  "fruit-shakes": { bg: "#FFF8D6", fg: "#000000", label: "Fruit" },
};

/** Horizontal, scroll-driven wall of every shake on the menu. The brand is "more than chocolate" — show it. */
export default function ShakeWall() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["6%", reduce ? "6%" : "-38%"]);

  const shakes = SHAKE_SECTIONS.flatMap((id) => {
    const s = menu.find((m) => m.id === id)!;
    return s.items.map((d) => ({ ...d, section: id }));
  });

  return (
    <section ref={ref} className="grain relative overflow-hidden bg-[#1A0F0A] py-20 text-paper md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <RevealLines
            lines={["Twenty shakes.", "Zero regrets."]}
            className="font-display text-display-lg text-yellow"
          />
          <p className="max-w-xs font-accent text-2xl italic text-paper/70">
            Chocolate is just a beginning. Every shake on the board, from ₹60.
          </p>
        </div>
      </div>

      <motion.ul style={{ x }} className="mt-12 flex w-max gap-4 px-5 will-change-transform md:px-10">
        {shakes.map((d, i) => {
          const p = PALETTE[d.section];
          return (
            <li key={d.name}>
              <a
                href={links.whatsapp(`Hi! One ${d.name} shake please (${formatPrice(d.price)}).`)}
                target="_blank"
                rel="noopener"
                style={{ background: p.bg, color: p.fg, rotate: `${((i % 3) - 1) * 1.5}deg` }}
                className="group flex h-56 w-44 flex-col justify-between rounded-[28px] border-2 border-ink p-4 shadow-hard transition-transform hover:-translate-y-2 md:h-64 md:w-52"
              >
                <span className="self-start rounded-full border border-current px-2 py-0.5 font-display text-xs font-bold">
                  {p.label}
                </span>
                <span>
                  <span className="block font-display text-2xl font-extrabold leading-none md:text-3xl">{d.name}</span>
                  <span className="mt-2 block font-accent text-2xl italic opacity-80">{formatPrice(d.price)}</span>
                </span>
                <Straw fg={p.fg} />
              </a>
            </li>
          );
        })}
      </motion.ul>
    </section>
  );
}

function Straw({ fg }: { fg: string }) {
  return (
    <svg viewBox="0 0 40 40" className="absolute right-3 top-3 h-8 w-8 opacity-60 transition-transform duration-500 group-hover:rotate-12" aria-hidden>
      <path d="M28 4 14 36" stroke={fg} strokeWidth="5" strokeLinecap="round" />
      <path d="M28 4h6" stroke={fg} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
