import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Eyebrow, MaskWords, useIsDesktop } from "./common";

// Upgraded SERVICES data with perfectly matched high-quality Unsplash images
const SERVICES = [
  {
    n: "01",
    title: "Luxury Weddings",
    description: "Bespoke wedding planning with meticulous attention to detail, from venue selection to floral design, ensuring your special day is perfectly executed.",
    highlights: ["Venue Sourcing", "Bridal Styling", "Guest Management"],
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop"
  },
  {
    n: "02",
    title: "Corporate Events",
    description: "Professional event management for galas, product launches, and conferences that elevate your brand and leave a lasting impression.",
    highlights: ["Brand Integration", "AV & Production", "Premium Catering"],
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop"
  },
  {
    n: "03",
    title: "Premium Décor",
    description: "Transformative event design featuring custom floral arrangements, luxury lighting, and bespoke architectural elements.",
    highlights: ["Floral Design", "Custom Lighting", "Stage Setup"],
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1943&auto=format&fit=crop"
  },
  {
    n: "04",
    title: "World-Class Catering",
    description: "Exquisite culinary experiences crafted by top-tier chefs, offering personalized menus that delight the senses.",
    highlights: ["Custom Menus", "Master Mixology", "Silver Service"],
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop"
  },
  {
    n: "05",
    title: "Photography",
    description: "Capturing your most precious moments with cinematic precision. Our award-winning photographers ensure every memory is preserved.",
    highlights: ["Cinematography", "Drone Footage", "Luxury Albums"],
    image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070&auto=format&fit=crop"
  },
  {
    n: "06",
    title: "Entertainment",
    description: "Curated performances, live bands, and world-renowned DJs that keep the energy alive and your guests engaged all night.",
    highlights: ["Live Bands", "Celebrity Acts", "Custom Choreography"],
    // Replaced with a reliable high-quality Unsplash image of a live performance/party
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2074&auto=format&fit=crop"
  },
  {
    n: "07",
    title: "Private Parties",
    description: "Intimate and exclusive gatherings designed for absolute privacy, featuring personalized themes and VIP hospitality.",
    highlights: ["Themed Events", "VIP Hosting", "Security Personnel"],
    // Replaced with a reliable high-quality Unsplash image of an intimate luxury gathering/toast
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    n: "08",
    title: "Venue Management",
    description: "Exclusive access to the world's most sought-after locations, complete with full logistical support and layout optimization.",
    highlights: ["Exclusive Permits", "Logistics", "Floor Plan Optimization"],
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop"
  }
];

export default function Services() {
  // We use `selected` to track which card is clicked/open. Set to 0 to open the first one by default.
  const [selected, setSelected] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);

  const desktop = useIsDesktop();
  const visibleServices = desktop || showAll ? SERVICES : SERVICES.slice(0, 4);

  const handleCardClick = (index: number) => {
    // Toggle: if clicking the already selected card, close it (set to null)
    setSelected((current) => (current === index ? null : index));
  };

  return (
    <section
      id="services"
      className="relative overflow-hidden border-t border-ivory/5 bg-obsidian py-24 sm:py-32 lg:py-44"
    >
      {/* Background ambient glows */}
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-burgundy/10 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        {/* Header Section */}
        <div className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>WHAT WE CREATE</Eyebrow>
            <MaskWords
              text="SERVICES"
              className="mt-6 font-serif text-[18vw] leading-[0.82] tracking-[0.04em] text-ivory sm:text-[11vw] lg:text-[8.5vw]"
            />
          </div>
          <p className="max-w-md font-sans text-[10px] leading-[2.2] tracking-[0.24em] text-ivory/45 sm:text-[11px]">
            EIGHT DISCIPLINES. ONE UNCOMPROMISING STANDARD.
          </p>
        </div>

        {/* 
          Grid Container for Cards 
          Using motion.div with 'layout' allows row heights to adjust smoothly when a card expands 
        */}
        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
          {visibleServices.map((s, i) => {
            const isSelected = selected === i;

            return (
              <motion.button
                key={s.title}
                layout
                onClick={() => handleCardClick(i)}
                className={`group relative flex w-full flex-col overflow-hidden rounded-[24px] border text-left transition-all duration-500 ${isSelected
                  ? "border-gold/50 shadow-[0_20px_50px_rgba(194,161,92,0.12)]"
                  : "border-ivory/10 hover:border-ivory/30"
                  }`}
                // Keep a generous minimum height so the images look great when collapsed
                style={{ minHeight: "480px" }}
              >
                {/* Background Image & Overlays */}
                <div className="absolute inset-0">
                  <img
                    src={s.image}
                    alt={s.title}
                    className={`h-full w-full object-cover transition-transform duration-1000 ease-out ${isSelected ? "scale-110" : "scale-100 group-hover:scale-105"
                      }`}
                  />
                  {/* Smart gradient overlay: gets darker when expanded so text is highly readable */}
                  <div
                    className={`absolute inset-0 transition-all duration-700 ${isSelected
                      ? "bg-[linear-gradient(0deg,rgba(13,11,16,0.98)_0%,rgba(13,11,16,0.85)_55%,rgba(13,11,16,0.3)_100%)]"
                      : "bg-[linear-gradient(0deg,rgba(13,11,16,0.9)_0%,rgba(13,11,16,0.1)_60%,transparent_100%)]"
                      }`}
                  />
                </div>

                {/* Content Area - Pins to bottom */}
                <div className="relative z-10 flex h-full w-full flex-col justify-end p-6 lg:p-7">

                  {/* Top utility row: Number and Arrow icon */}
                  <motion.div layout="position" className="mb-4 flex w-full items-center justify-between">
                    <span className="font-sans text-[11px] font-semibold tracking-[0.28em] text-gold/90">
                      {s.n}
                    </span>
                    <span
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-full border text-[13px] transition-all duration-500 ${isSelected
                        ? "rotate-90 border-gold/60 bg-gold/20 text-champagne"
                        : "border-ivory/20 bg-obsidian/20 text-ivory/80 backdrop-blur-md"
                        }`}
                    >
                      →
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    layout="position"
                    className={`font-serif leading-[1.05] transition-colors duration-500 ${isSelected ? "text-[32px] text-ivory sm:text-[36px]" : "text-[28px] text-ivory/90 sm:text-[32px]"
                      }`}
                  >
                    {s.title}
                  </motion.h3>

                  {/* Expandable Details Section */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: 20 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: 10 }}
                        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-5">
                          <p className="font-sans text-[15px] font-light leading-[1.7] tracking-[0.02em] text-ivory/80">
                            {s.description}
                          </p>

                          <div className="mt-6 border-t border-ivory/10 pt-5">
                            <p className="mb-4 font-sans text-[9px] font-semibold tracking-[0.3em] text-gold/80">
                              INCLUDES
                            </p>
                            <ul className="flex flex-col gap-3">
                              {s.highlights.map((item) => (
                                <li key={item} className="flex items-center gap-3">
                                  <span className="h-1.5 w-1.5 rounded-full bg-gold/60" />
                                  <span className="font-sans text-[12px] uppercase tracking-[0.18em] text-ivory/90">
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Mobile 'Show More' Button */}
        {!desktop && !showAll && SERVICES.length > 4 && (
          <div className="mt-10 flex justify-center sm:hidden">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="inline-flex items-center justify-center rounded-full border border-ivory/15 bg-[#0d0b10] px-8 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-ivory/90 transition-colors duration-300 hover:border-gold/50 hover:bg-gold/10 hover:text-champagne"
            >
              View All Services
            </button>
          </div>
        )}
      </div>
    </section>
  );
}