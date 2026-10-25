import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { links, reels, site } from "../../data/site";
import { RevealLines, Magnetic } from "./motion";
import { InstagramIcon } from "./Vibe";

/** Instagram reels (collabs included) as a horizontal strip of real embeds. */
export default function Reels() {
  const hasReels = reels.length > 0;
  return (
    <section className="overflow-hidden bg-yellow py-20 text-ink md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <RevealLines lines={["As seen on", "your feed."]} className="font-display text-display-lg" />
          <div className="max-w-sm">
            <p className="font-accent text-2xl italic leading-snug">
              Food creators keep finding us. Post your plate, tag @{site.instagram}, and it might end up here.
            </p>
            <Magnetic
              href={links.instagram}
              target="_blank"
              rel="noopener"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-display font-bold text-yellow shadow-hard-yellow"
            >
              <InstagramIcon /> Follow @{site.instagram}
            </Magnetic>
          </div>
        </div>
      </div>

      <div className="mt-12 flex gap-5 overflow-x-auto px-5 pb-6 no-scrollbar md:px-10">
        {hasReels
          ? reels.map((url, i) => <ReelEmbed key={url} url={url} i={i} />)
          : Array.from({ length: 4 }).map((_, i) => <TagTile key={i} i={i} />)}
      </div>
    </section>
  );
}

function embedUrl(url: string) {
  const m = url.match(/instagram\.com\/(reel|p|reels)\/([A-Za-z0-9_-]+)/);
  return m ? `https://www.instagram.com/${m[1] === "reels" ? "reel" : m[1]}/${m[2]}/embed/` : null;
}

function ReelEmbed({ url, i }: { url: string; i: number }) {
  const src = embedUrl(url);
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setLoad(true), io.disconnect()), { rootMargin: "300px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  if (!src) return null;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: (i % 2 ? 1 : -1) * 1.5 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 200, damping: 22, delay: i * 0.05 }}
      className="h-[560px] w-[320px] shrink-0 overflow-hidden rounded-[28px] border-4 border-ink bg-paper shadow-hard"
    >
      {load && (
        <iframe
          src={src}
          title={`Instagram reel ${i + 1}`}
          loading="lazy"
          allow="encrypted-media"
          className="h-full w-full"
          style={{ border: 0 }}
        />
      )}
    </motion.div>
  );
}

function TagTile({ i }: { i: number }) {
  const copy = ["Your reel here", "Tag us in your story", "Collab? DM us", "Post the plate"];
  return (
    <motion.a
      href={links.instagram}
      target="_blank"
      rel="noopener"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0, rotate: (i % 2 ? 1 : -1) * 2 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 200, damping: 22, delay: i * 0.05 }}
      className="flex h-[420px] w-[260px] shrink-0 flex-col justify-between rounded-[28px] border-4 border-dashed border-ink/50 bg-paper/60 p-5 shadow-hard-sm"
    >
      <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-yellow">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
      </span>
      <span className="font-display text-3xl font-extrabold leading-none">{copy[i % copy.length]}</span>
      <span className="font-accent text-xl italic text-smoke">@{site.instagram}</span>
    </motion.a>
  );
}
