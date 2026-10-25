import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { links, site } from "../../data/site";

const NAV = [
  { href: "/menu", label: "Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/events", label: "Events" },
  { href: "/visit", label: "Visit" },
];

export default function Nav({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || solid ? "bg-ink/85 py-3 backdrop-blur-md" : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10">
          <a href="/" className="font-display text-2xl font-extrabold tracking-tight text-yellow">
            BT<span className="text-paper">.</span>
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="rounded-full px-4 py-2 font-display text-base font-bold text-paper transition-colors hover:bg-paper/10"
              >
                {n.label}
              </a>
            ))}
            <a
              href={links.whatsapp()}
              target="_blank"
              rel="noopener"
              className="ml-3 rounded-full bg-yellow px-5 py-2 font-display text-base font-bold text-ink transition-transform hover:-translate-y-0.5"
            >
              Order now
            </a>
          </nav>

          <button
            onClick={() => setOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-full border-2 border-yellow text-yellow md:hidden"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 7h16M4 12h16M4 17h10" />
            </svg>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-yellow px-6 pb-10 pt-6 text-ink"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl font-extrabold">{site.name}</span>
              <button
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-full border-2 border-ink"
                aria-label="Close menu"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
            <nav className="mt-14 flex flex-col" aria-label="Mobile">
              {NAV.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                  className="border-b-2 border-ink py-5 font-display text-5xl font-extrabold"
                >
                  {n.label}
                </motion.a>
              ))}
            </nav>
            <a
              href={links.whatsapp()}
              target="_blank"
              rel="noopener"
              className="mt-auto rounded-full bg-ink py-5 text-center font-display text-xl font-bold text-yellow"
            >
              Order on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
