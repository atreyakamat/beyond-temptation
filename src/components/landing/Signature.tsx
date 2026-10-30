import { motion } from "framer-motion";
import { links } from "../../data/site";
import { Magnetic, RevealLines } from "./motion";

const PHOTO = "/photos/beyond-special.webp";

/** The house signature, given the full-width treatment. */
export default function Signature() {
  return (
    <section className="relative overflow-hidden bg-tomato py-20 text-paper md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 top-6 select-none font-accent text-[28vw] italic leading-none text-ink/10 md:text-[18vw]"
      >
        No.1
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:grid-cols-2 md:px-10">
        <div className="relative order-2 md:order-1">
          <RevealLines
            lines={["The Beyond", "Special."]}
            className="font-display text-display-lg text-paper"
          />
          <p className="mt-6 max-w-md font-accent text-2xl italic leading-snug md:text-3xl">
            Chicken burger, fries and dips on one plate. The thing regulars order without reading the board.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2 font-display text-sm font-bold">
            {["Crispy patty", "Peri peri fries", "Two dips", "₹250, feeds one properly"].map((t) => (
              <li key={t} className="rounded-full border-2 border-paper px-3 py-1">
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Magnetic
              href={links.whatsapp("Hi! One Beyond Special please (₹250).")}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-display text-lg font-bold text-yellow shadow-hard-yellow"
            >
              Order the Beyond Special
            </Magnetic>
          </div>
        </div>

        <motion.figure
          initial={{ rotate: -6, scale: 0.92, opacity: 0 }}
          whileInView={{ rotate: 3, scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
          className="relative order-1 aspect-[4/5] overflow-hidden rounded-[32px] border-4 border-ink shadow-hard md:order-2"
        >
          <img
            src={PHOTO}
            alt="The Beyond Special spread: burger, loaded fries, shake and pizza"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <figcaption className="absolute bottom-4 left-4 rotate-[-4deg] rounded-md border-2 border-ink bg-yellow px-3 py-1 font-display text-lg font-extrabold text-ink shadow-hard-sm">
            ₹250
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
