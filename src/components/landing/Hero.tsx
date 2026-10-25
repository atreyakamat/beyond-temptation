import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { links, site } from "../../data/site";
import { Magnetic, SplitWord } from "./motion";

const WORDS = ["burgers", "pizza", "thick shakes", "cold coffee", "your people"];

type Sticker = {
  label: string;
  x: string;
  y: string;
  rot: number;
  depth: number;
  bg: string;
  fg: string;
  hideOnMobile?: boolean;
  mobileOnly?: boolean;
};

const STICKERS: Sticker[] = [
  { label: "₹400 for two", x: "6%", y: "18%", rot: -12, depth: 28, bg: "#FFD60A", fg: "#000" },
  { label: "Mapusa", x: "62%", y: "22%", rot: 8, depth: 22, bg: "#FF3B1F", fg: "#fff", mobileOnly: true },
  { label: "Mon–Sat, 10 am – 9 pm", x: "70%", y: "14%", rot: 9, depth: 40, bg: "#FFFFFF", fg: "#000", hideOnMobile: true },
  { label: "Mapusa, Goa", x: "80%", y: "66%", rot: -7, depth: 22, bg: "#FF3B1F", fg: "#fff", hideOnMobile: true },
  { label: "order on WhatsApp", x: "4%", y: "72%", rot: 6, depth: 34, bg: "#FFFFFF", fg: "#000", hideOnMobile: true },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % WORDS.length), 2200);
    return () => clearInterval(t);
  }, [reduce]);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="grain relative isolate min-h-[100svh] overflow-hidden bg-ink text-paper"
      aria-label="Welcome"
    >
      {/* Rotating badge */}
      <div className="pointer-events-none absolute right-5 top-24 z-20 hidden md:block">
        <RotatingBadge />
      </div>

      {/* Stickers with mouse parallax */}
      {STICKERS.map((s) => (
        <Sticker key={s.label} s={s} sx={sx} sy={sy} reduce={!!reduce} />
      ))}

      {/* Headline */}
      <motion.div
        style={{ y: titleY, opacity: fade }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-28 pt-32 md:px-10 md:pb-24"
      >
        <h1 className="font-display text-display-xl text-yellow">
          <SplitWord text="Beyond" delay={0.1} />
          <SplitWord text="Temptation" delay={0.3} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-4 font-display text-lg font-bold text-paper/60 md:text-xl"
        >
          {site.motto}
        </motion.p>

        <div className="mt-6 flex flex-col gap-6 md:mt-8 md:flex-row md:items-end md:justify-between">
          <p className="font-display text-display-md max-w-xl text-paper">
            Mapusa's meeting point for{" "}
            <span className="relative inline-block align-bottom">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={WORDS[i]}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block border-b-[6px] border-yellow font-accent italic text-yellow"
                >
                  {WORDS[i]}
                </motion.span>
              </AnimatePresence>
            </span>
            .
          </p>

          <div className="flex flex-wrap gap-3">
            <Magnetic
              href={links.whatsapp()}
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center gap-2 rounded-full bg-yellow px-6 py-4 font-display text-lg font-bold text-ink shadow-hard-yellow"
            >
              <WhatsAppIcon />
              Order on WhatsApp
            </Magnetic>
            <Magnetic
              href="/menu"
              className="inline-flex items-center rounded-full border-2 border-paper px-6 py-4 font-display text-lg font-bold text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              See the menu
            </Magnetic>
          </div>
        </div>
      </motion.div>

      {/* Big ghost word drifting behind */}
      <motion.div
        aria-hidden
        style={{ x: useTransform(sx, (v) => v * -40) }}
        className="pointer-events-none absolute -bottom-6 left-0 z-0 select-none whitespace-nowrap font-display text-[22vw] font-extrabold leading-none text-paper/[0.04]"
      >
        {site.tagline.replace(".", "")} &nbsp; {site.tagline.replace(".", "")}
      </motion.div>
    </section>
  );
}

function Sticker({
  s,
  sx,
  sy,
  reduce,
}: {
  s: Sticker;
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
  reduce: boolean;
}) {
  const x = useTransform(sx, (v) => (reduce ? 0 : v * s.depth));
  const y = useTransform(sy, (v) => (reduce ? 0 : v * s.depth));
  return (
    <motion.div
      style={{ left: s.x, top: s.y, x, y, rotate: s.rot, background: s.bg, color: s.fg }}
      initial={{ scale: 0, rotate: s.rot - 30 }}
      animate={{ scale: 1, rotate: s.rot }}
      transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.6 + s.depth / 100 }}
      className={`absolute z-20 rounded-md border-2 border-ink px-4 py-2 font-display text-base font-bold shadow-hard ${
        s.hideOnMobile ? "hidden md:block" : s.mobileOnly ? "md:hidden" : ""
      }`}
    >
      {s.label}
    </motion.div>
  );
}

function RotatingBadge() {
  return (
    <div className="relative h-36 w-36">
      <svg viewBox="0 0 200 200" className="h-full w-full animate-spin-slow">
        <defs>
          <path id="circ" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
        </defs>
        <text className="font-display" fontSize="18" fontWeight="700" fill="#FFD60A" letterSpacing="3">
          <textPath href="#circ" textLength="450">more than coffee  ·  it's a vibe  ·</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-4xl font-extrabold text-yellow">BT</span>
      </div>
    </div>
  );
}

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1 2.7.1.2 1.8 2.8 4.5 3.9 1.7.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}
