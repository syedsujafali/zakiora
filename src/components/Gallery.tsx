import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { GALLERY } from "../lib/data";
import { Eyebrow, MaskWords } from "./common";

const spanClass: Record<string, string> = {
  tall: "aspect-[4/5] sm:col-span-4",
  std: "aspect-[4/5] sm:col-span-4",
  wide: "aspect-[4/5] sm:col-span-4",
};

const FILTERS = ["ALL", "WEDDINGS", "DECOR", "EVENTS", "CATERING", "VENUES"] as const;

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>("ALL");
  const [open, setOpen] = useState<number | null>(null);

  const filteredGallery = useMemo(() => {
    if (activeFilter === "ALL") return GALLERY;
    return GALLERY.filter((item) => item.category.toUpperCase() === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    setOpen(null);
  }, [activeFilter]);

  useEffect(() => {
    document.body.style.overflow = open !== null ? "hidden" : "";
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (open === null || filteredGallery.length === 0) return;
      if (e.key === "ArrowRight")
        setOpen((o) => ((o ?? 0) + 1) % filteredGallery.length);
      if (e.key === "ArrowLeft")
        setOpen((o) => ((o ?? 0) - 1 + filteredGallery.length) % filteredGallery.length);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [open, filteredGallery]);

  const currentItem = open !== null ? filteredGallery[open] : null;

  return (
    <section
      id="gallery"
      className="relative overflow-hidden border-t border-ivory/5 bg-[radial-gradient(circle_at_top,_rgba(194,161,92,0.18),_transparent_35%),_linear-gradient(180deg,_#08070a_0%,_#0d0c10_100%)] py-24 sm:py-32 lg:py-44"
    >
      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>GALLERY</Eyebrow>
            <MaskWords
              text="THE ARCHIVE"
              className="mt-6 font-serif text-[15vw] leading-[0.88] text-ivory sm:text-[10vw] lg:text-[8vw]"
            />
          </div>
          <p className="max-w-[260px] font-sans text-[10px] leading-[2.3] tracking-[0.26em] text-ivory/45">
            IMAGERY OF THE CELEBRATIONS WE CREATE.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={[
                "rounded-full border px-4 py-2 text-[9px] font-medium tracking-[0.28em] transition-all duration-500",
                activeFilter === filter
                  ? "border-champagne bg-champagne text-obsidian shadow-[0_0_30px_rgba(226,207,174,0.25)]"
                  : "border-ivory/15 bg-white/0 text-ivory/60 hover:border-ivory/30 hover:text-ivory",
              ].join(" ")}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-12 sm:gap-5">
          {filteredGallery.map((g, i) => (
            <motion.figure
              key={`${g.title}-${i}`}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              onClick={() => setOpen(i)}
              className={[
                "group relative w-full overflow-hidden rounded-[1.8rem] border border-ivory/10 bg-coal shadow-[0_30px_80px_rgba(0,0,0,0.35)] cursor-pointer",
                spanClass[g.span],
              ].join(" ")}
            >
              <img
                src={g.src}
                alt={g.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover grayscale-[38%] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08070a]/90 via-[#08070a]/15 to-transparent" />
              <div className="absolute inset-0 border border-ivory/10" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-sans text-[9px] tracking-[0.32em] text-champagne/90">
                      {g.category.toUpperCase()}
                    </p>
                    <h3 className="mt-2 font-serif text-3xl leading-none text-ivory sm:text-[2.35rem]">
                      {g.title}
                    </h3>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 bg-obsidian/35 text-lg text-ivory transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </div>
                </div>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {currentItem && (
          <motion.div
            className="fixed inset-0 z-[9500] flex items-center justify-center bg-obsidian/96 px-4 py-8 backdrop-blur-sm sm:px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setOpen(null)}
          >
            <button
              aria-label="Close"
              className="absolute right-5 top-5 z-10 font-sans text-[10px] tracking-[0.34em] text-ivory/60 hover:text-champagne sm:right-9 sm:top-9"
              onClick={() => setOpen(null)}
            >
              CLOSE ✕
            </button>

            <motion.div
              key={currentItem.title}
              initial={{ opacity: 0, y: 25, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-ivory/10 bg-[#121115] shadow-[0_40px_120px_rgba(0,0,0,0.65)] lg:grid-cols-[1.45fr_0.7fr]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative min-h-[280px] bg-coal sm:min-h-[420px] lg:min-h-[620px]">
                <img
                  src={currentItem.src}
                  alt={currentItem.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
                <div>
                  <p className="font-sans text-[9px] tracking-[0.34em] text-champagne">
                    {currentItem.category.toUpperCase()}
                  </p>
                  <h3 className="mt-4 font-serif text-4xl leading-none text-ivory sm:text-5xl">
                    {currentItem.title}
                  </h3>
                  <p className="mt-6 max-w-sm font-sans text-sm leading-7 text-ivory/60">
                    Crafted with cinematic lighting, layered textures, and a refined sense of ceremony to create unforgettable event experiences.
                  </p>
                </div>

                <div className="mt-10">
                  <div className="flex items-center justify-between border-t border-ivory/10 pt-5">
                    <button
                      className="font-sans text-[10px] tracking-[0.34em] text-ivory/60 hover:text-champagne"
                      onClick={() =>
                        setOpen((o) =>
                          o === null ? 0 : ((o - 1 + filteredGallery.length) % filteredGallery.length)
                        )
                      }
                    >
                      ← PREV
                    </button>
                    <span className="font-sans text-[10px] tracking-[0.3em] text-gold/80">
                      {String(open + 1).padStart(2, "0")} / {String(filteredGallery.length).padStart(2, "0")}
                    </span>
                    <button
                      className="font-sans text-[10px] tracking-[0.34em] text-ivory/60 hover:text-champagne"
                      onClick={() =>
                        setOpen((o) => ((o ?? 0) + 1) % filteredGallery.length)
                      }
                    >
                      NEXT →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
