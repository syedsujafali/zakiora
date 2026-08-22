import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
// Assuming you still have these local imports, otherwise they can be easily swapped for standard tags
import { Reveal } from "./common";
import Particles from "./Particles";

// Added high-quality Unsplash images for the luxury catering vibe
const CUISINES_DATA = [
  {
    name: "Indian Traditional",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Mughlai Heritage",
    image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Italian & Continental",
    image: "https://images.unsplash.com/photo-1498579150354-979475cb1ab1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Pan-Asian Fusion",
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Artisan Desserts",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1200&auto=format&fit=crop",
  },
];

const COPY = [
  "At Zakiora Events, food is at the heart of every celebration. Our expert catering team serves a wide variety of Indian and international cuisines, carefully prepared using high-quality ingredients and authentic recipes.",
  "Whether you’re hosting an intimate gathering or a grand celebration, our chefs create customized menus that delight every guest, leaving lasting impressions on the palate.",
];

export default function Catering() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeCuisine = CUISINES_DATA[activeIdx];

  return (
    <section
      id="catering"
      className="relative overflow-hidden bg-[#050505] py-20 sm:py-32 lg:py-40"
    >
      {/* Background Ambience */}
      <Particles density={20} />
      <div
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle at 15% 30%, rgba(212,175,55,0.03) 0%, transparent 40%), radial-gradient(circle at 85% 70%, rgba(255,255,240,0.02) 0%, transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
        {/* Header Section */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-12 lg:flex-row lg:items-end lg:pb-20">
          <div className="max-w-4xl">

            <h2 className="font-serif text-[10vw] leading-[0.9] text-white sm:text-[7vw] lg:text-[5.5vw]">
              <span className="block opacity-90">Food is the heart</span>
              <span className="block text-[#D4AF37] italic pr-4">
                of every celebration.
              </span>
            </h2>
          </div>
          <p className="max-w-xs font-sans text-xs font-light leading-relaxed tracking-wide text-white/50 lg:text-right lg:text-sm">
            Curated menus, authentic recipes, and exquisite presentation tailored to elevate your grandest moments.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="mt-16 grid gap-16 lg:mt-24 lg:grid-cols-12 lg:gap-10">

          {/* Left: Copy & Details (Cols 1-4) */}
          <div className="flex flex-col justify-center space-y-10 lg:col-span-4">
            <div className="space-y-6">
              {COPY.map((text, idx) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <p className="font-sans text-[14px] font-light leading-[1.9] text-white/60">
                    {text}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <div className="mt-8 border-l border-gold/30 pl-6">
                <p className="font-sans text-[9px] font-bold tracking-[0.3em] text-gold/70 uppercase mb-2">
                  Signature Expertise
                </p>
                <p className="font-serif text-3xl italic text-white/90">
                  Mughlai Cuisine
                </p>
              </div>
            </Reveal>
          </div>

          {/* Center: Elegant Arch Image Showcase (Cols 5-8) */}
          <div className="relative flex justify-center lg:col-span-4">
            <div className="relative aspect-[1/1.4] w-full max-w-[400px] overflow-hidden rounded-t-[200px] rounded-b-[20px] border border-white/10 bg-white/5">
              <AnimatePresence mode="sync">
                <motion.img
                  key={activeCuisine.image}
                  src={activeCuisine.image}
                  alt={activeCuisine.name}
                  initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>

              {/* Luxurious Image Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]" />

              {/* Image Label */}
              <div className="absolute bottom-8 left-0 right-0 flex justify-center px-6 text-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeCuisine.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="font-serif text-xl text-white tracking-wide"
                  >
                    {activeCuisine.name}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right: Interactive Menu (Cols 9-12) */}
          <div className="flex flex-col justify-center lg:col-span-4 lg:pl-10">
            <p className="mb-8 font-sans text-[10px] font-bold tracking-[0.4em] text-white/30 uppercase">
              Tasting Menu
            </p>
            <ul className="flex flex-col gap-y-6">
              {CUISINES_DATA.map((cuisine, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <li key={cuisine.name}>
                    <button
                      data-cursor="explore"
                      onMouseEnter={() => setActiveIdx(idx)}
                      onClick={() => setActiveIdx(idx)}
                      className="group relative flex w-full items-center gap-6 py-2 text-left transition-all duration-500"
                    >
                      <span
                        className={`font-sans text-[10px] tracking-[0.2em] transition-all duration-500 ${isActive ? "text-gold" : "text-white/20"
                          }`}
                      >
                        0{idx + 1}
                      </span>

                      <span
                        className={`font-serif text-2xl transition-all duration-700 sm:text-3xl lg:text-4xl ${isActive
                          ? "text-white translate-x-4 italic"
                          : "text-white/40 group-hover:text-white/70"
                          }`}
                      >
                        {cuisine.name}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}