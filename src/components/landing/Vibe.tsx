import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { RevealLines } from "./motion";
import { links, site, vibeTiles } from "../../data/site";

export default function Vibe() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return (
    <section ref={ref} className="grain relative bg-ink py-20 text-paper md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <RevealLines lines={["Come for the food.", "Stay because it's Mapusa."]} className="font-display text-display-lg text-yellow" />
          <a
            href={links.instagram}
            target="_blank"
            rel="noopener"
            className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-yellow px-5 py-3 font-display font-bold text-yellow transition-colors hover:bg-yellow hover:text-ink"
          >
            <InstagramIcon />@{site.instagram}
          </a>
        </div>

        <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4 md:gap-4">
          {vibeTiles.map((t, i) => (
            <Tile key={t.src} t={t} i={i} progress={scrollYProgress} reduce={!!reduce} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Tile({
  t,
  i,
  progress,
  reduce,
}: {
  t: (typeof vibeTiles)[number];
  i: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduce: boolean;
}) {
  const depth = [40, -60, 30, -30, 50][i % 5];
  const y = useTransform(progress, [0, 1], [reduce ? 0 : -depth, reduce ? 0 : depth]);
  return (
    <motion.figure
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: i * 0.07 }}
      className={`group relative overflow-hidden rounded-xl border-2 border-paper/10 ${
        t.span === "wide" ? "col-span-2" : t.span === "tall" ? "row-span-2" : ""
      }`}
    >
      <motion.img
        src={t.src}
        alt={t.alt}
        loading="lazy"
        style={{ y }}
        className="h-[130%] w-full -translate-y-[12%] object-cover grayscale-[30%] will-change-transform transition-[filter,transform] duration-700 group-hover:grayscale-0"
      />
      <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-yellow px-4 py-2 font-display font-bold text-ink transition-transform duration-300 group-hover:translate-y-0">
        {t.alt}
      </figcaption>
    </motion.figure>
  );
}

export function InstagramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
