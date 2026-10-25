import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { links, reels, site, vibeTiles } from "../../data/site";
import Photo from "./Photo";

/** Gallery: your photos (public/photos/gallery-N.jpg) mixed with Instagram reel embeds. */
export default function Gallery() {
  const [tab, setTab] = useState<"all" | "photos" | "reels">("all");
  const items: ({ kind: "photo"; i: number; alt: string; fb: string } | { kind: "reel"; url: string })[] = [];
  vibeTiles.forEach((t, i) => items.push({ kind: "photo", i, alt: t.alt, fb: t.src }));
  reels.forEach((url) => items.push({ kind: "reel", url }));
  // interleave photos and reels
  const ordered = items.sort((a, b) => (a.kind === b.kind ? 0 : 0));
  const shown = ordered.filter((it) => tab === "all" || (tab === "photos" ? it.kind === "photo" : it.kind === "reel"));

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-10">
      <div className="flex gap-2" role="tablist">
        {(["all", "photos", "reels"] as const).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`rounded-full border-2 border-ink px-5 py-2 font-display font-bold capitalize ${tab === t ? "bg-ink text-yellow shadow-hard-sm" : "hover:bg-yellow"}`}
          >
            {t}
          </button>
        ))}
        <a
          href={links.instagram}
          target="_blank"
          rel="noopener"
          className="ml-auto rounded-full bg-yellow px-5 py-2 font-display font-bold text-ink shadow-hard-sm"
        >
          More on Instagram
        </a>
      </div>

      <motion.div layout className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {shown.map((it, idx) =>
          it.kind === "photo" ? (
            <motion.figure
              key={`p${it.i}`}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 6) * 0.05 }}
              className="mb-5 break-inside-avoid overflow-hidden rounded-2xl border-2 border-ink shadow-hard"
            >
              <Photo src={`/photos/gallery-${it.i + 1}.jpg`} fallback={it.fb} alt={it.alt} className="w-full object-cover" />
            </motion.figure>
          ) : (
            <ReelCard key={it.url} url={it.url} />
          ),
        )}
      </motion.div>
    </div>
  );
}

function ReelCard({ url }: { url: string }) {
  const m = url.match(/instagram\.com\/(reel|p)\/([A-Za-z0-9_-]+)/);
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setLoad(true), io.disconnect()), { rootMargin: "400px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  if (!m) return null;
  return (
    <motion.div
      ref={ref}
      layout
      className="mb-5 h-[600px] break-inside-avoid overflow-hidden rounded-2xl border-2 border-ink bg-paper shadow-hard"
    >
      {load && (
        <iframe src={`https://www.instagram.com/${m[1]}/${m[2]}/embed/`} title="Instagram reel" className="h-full w-full" style={{ border: 0 }} loading="lazy" allow="encrypted-media" />
      )}
    </motion.div>
  );
}
