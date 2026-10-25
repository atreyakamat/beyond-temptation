import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { links } from "../../data/site";
import { WhatsAppIcon } from "./Hero";

/** Sticky bottom bar on phones; floating WhatsApp pill on larger screens. */
export default function MobileBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > window.innerHeight * 0.6);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-3 gap-1 rounded-2xl border-2 border-ink bg-yellow p-1 shadow-hard md:hidden"
          >
            <a href={links.tel} className="rounded-xl py-3 text-center font-display font-bold text-ink">
              Call
            </a>
            <a href={links.maps} target="_blank" rel="noopener" className="rounded-xl py-3 text-center font-display font-bold text-ink">
              Directions
            </a>
            <a
              href={links.whatsapp()}
              target="_blank"
              rel="noopener"
              className="flex items-center justify-center gap-1 rounded-xl bg-ink py-3 font-display font-bold text-yellow"
            >
              <WhatsAppIcon className="h-4 w-4" /> Order
            </a>
          </motion.div>

          <motion.a
            href={links.whatsapp()}
            target="_blank"
            rel="noopener"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.06 }}
            className="fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full border-2 border-ink bg-yellow px-5 py-3 font-display font-bold text-ink shadow-hard md:flex"
          >
            <WhatsAppIcon /> Order on WhatsApp
          </motion.a>
        </>
      )}
    </AnimatePresence>
  );
}
