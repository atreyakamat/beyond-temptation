import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { galleryPhotos, links, reels, site, videos } from "../../data/site";

/** Gallery: your photos (public/photos/gallery-N.jpg) mixed with Instagram reel embeds. */
export default function Gallery() {
  const [tab, setTab] = useState<"all" | "photos" | "videos" | "reels">("all");
  type Item =
    | { kind: "photo"; src: string; alt: string }
    | { kind: "video"; src: string; poster: string; alt: string; portrait: boolean }
    | { kind: "reel"; url: string };
  const items: Item[] = [];
  // interleave: 2 photos, a video, 2 photos, a reel ...
  const ph = [...galleryPhotos], vd = [...videos], rl = [...reels];
  while (ph.length || vd.length || rl.length) {
    for (let k = 0; k < 2 && ph.length; k++) items.push({ kind: "photo", ...ph.shift()! });
    if (vd.length) items.push({ kind: "video", ...vd.shift()! });
    for (let k = 0; k < 2 && ph.length; k++) items.push({ kind: "photo", ...ph.shift()! });
    if (rl.length) items.push({ kind: "reel", url: rl.shift()! });
  }
  const shown = items.filter((it) => tab === "all" || it.kind === tab.replace(/s$/, ""));

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-10">
      <div className="flex gap-2" role="tablist">
        {(["all", "photos", "videos", "reels"] as const).map((t) => (
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
              key={it.src}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 6) * 0.05 }}
              className="group mb-5 break-inside-avoid overflow-hidden rounded-2xl border-2 border-ink shadow-hard"
            >
              <img src={it.src} alt={it.alt} loading="lazy" decoding="async" className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            </motion.figure>
          ) : it.kind === "video" ? (
            <VideoCard key={it.src} v={it} />
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

/** Muted autoplay loop; only loads when near the viewport. */
function VideoCard({ v }: { v: (typeof videos)[number] }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!el.src) el.src = v.src;
          el.play().catch(() => {});
        } else el.pause();
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [v.src]);
  return (
    <motion.figure
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-5 break-inside-avoid overflow-hidden rounded-2xl border-2 border-ink bg-ink shadow-hard"
    >
      <video
        ref={ref}
        poster={v.poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={v.alt}
        className={`w-full object-cover ${v.portrait ? "aspect-[9/16]" : "aspect-square"}`}
      />
    </motion.figure>
  );
}
