import { motion } from "framer-motion";
import { links, site, vibeTiles } from "../../data/site";

export default function Vibe() {
  return (
    <section className="grain relative bg-ink py-20 text-paper md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-display-lg text-yellow">
            Come for the food.
            <br />
            Stay because it's Mapusa.
          </h2>
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
            <motion.figure
              key={t.src}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`group relative overflow-hidden rounded-xl border-2 border-paper/10 ${
                t.span === "wide" ? "col-span-2" : t.span === "tall" ? "row-span-2" : ""
              }`}
            >
              <img
                src={t.src}
                alt={t.alt}
                loading="lazy"
                className="h-full w-full object-cover grayscale-[30%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-yellow px-4 py-2 font-display font-bold text-ink transition-transform duration-300 group-hover:translate-y-0">
                {t.alt}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
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
