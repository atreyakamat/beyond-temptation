import { motion } from "framer-motion";
import { links, reviews, site } from "../../data/site";
import { RevealLines } from "./motion";

/** Real Google reviews as a draggable strip of tilted cards. */
export default function Reviews() {
  const g = site.ratings[0];
  return (
    <section className="overflow-hidden bg-cream py-20 text-ink md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <RevealLines lines={["Don't take", "our word for it."]} className="font-display text-display-lg" />
          <div className="flex items-center gap-4">
            <span className="font-display text-6xl font-extrabold leading-none">{g.score}</span>
            <span className="font-accent text-xl italic leading-tight text-smoke">
              on Google
              <br />
              {g.count}
            </span>
          </div>
        </div>
      </div>

      <motion.ul
        drag="x"
        dragConstraints={{ left: -900, right: 0 }}
        dragElastic={0.08}
        className="mt-12 flex w-max cursor-grab gap-5 px-5 active:cursor-grabbing md:px-10"
      >
        {reviews.map((r, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: (i % 2 ? 1 : -1) * (1 + (i % 3)) }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: i * 0.06 }}
            className={`w-[300px] shrink-0 rounded-2xl border-2 border-ink p-6 shadow-hard md:w-[360px] ${
              i % 3 === 1 ? "bg-yellow" : "bg-paper"
            }`}
          >
            <Stars />
            <p className="mt-4 font-accent text-2xl italic leading-snug">"{r.text}"</p>
            <p className="mt-5 font-display text-sm font-bold text-smoke">{r.who}</p>
          </motion.li>
        ))}
        <li className="flex w-[260px] shrink-0 items-center">
          <a
            href={links.review}
            target="_blank"
            rel="noopener"
            className="rounded-full bg-ink px-6 py-4 font-display text-lg font-bold text-yellow shadow-hard-yellow"
          >
            Leave yours on Google
          </a>
        </li>
      </motion.ul>
    </section>
  );
}

function Stars() {
  return (
    <div className="flex gap-1 text-tomato" aria-label="5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
          <path d="m12 2 2.9 6.6 7.1.7-5.4 4.8 1.6 7L12 17.5 5.8 21l1.6-7L2 9.3l7.1-.7L12 2Z" />
        </svg>
      ))}
    </div>
  );
}
