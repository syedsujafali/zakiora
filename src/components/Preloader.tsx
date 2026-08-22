import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(
      () => {
        setShow(false);
        onDone();
      },
      reduce ? 300 : 3200,
    );
    document.body.style.overflow = "hidden";
    return () => clearTimeout(t);
  }, [onDone]);

  useEffect(() => {
    if (!show) {
      const t = setTimeout(() => (document.body.style.overflow = ""), 500);
      return () => clearTimeout(t);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-obsidian"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* slow light bloom */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(194,161,92,0.16) 0%, rgba(109,28,48,0.07) 40%, transparent 70%)",
            }}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* horizontal light line */}
          <motion.div
            className="absolute left-0 top-1/2 h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(226,207,174,0.7), transparent)",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: [0, 1, 0.25] }}
            transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="relative text-center">
            <div className="overflow-hidden">
              <motion.h1
                className="gold-text font-serif text-[13vw] leading-[0.95] tracking-[0.16em] sm:text-[8vw]"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                ZAKIORA
              </motion.h1>
            </div>
            <motion.p
              className="mt-4 font-sans text-[9px] tracking-[0.6em] text-ivory/45 sm:text-[11px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.6, delay: 1.9 }}
            >
              E V E N T S
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
