import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Particles from "./Particles";
import { GoldButton, useIsDesktop } from "./common";
import { scrollToId } from "./Nav";

// Beautiful, dark-mood luxury event placeholder from Unsplash
const HERO_IMAGE = "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop";

export default function Hero({ ready }: { ready: boolean }) {
  const desktop = useIsDesktop();
  const [m, setM] = useState({ x: 0, y: 0 });
  const [sy, setSy] = useState(0);

  useEffect(() => {
    if (!desktop) return;
    const on = (e: MouseEvent) => {
      setM({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", on);
    return () => window.removeEventListener("mousemove", on);
  }, [desktop]);

  useEffect(() => {
    const on = () => setSy(window.scrollY);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const t = (d: number) => ({
    duration: 1.8,
    delay: ready ? d : 0,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  });

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-obsidian"
    >
      {/* Background Image & Overlays */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.15 }}
        animate={ready ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 3.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translate3d(0, ${sy * 0.25}px, 0)` }}
        >
          <img
            src={HERO_IMAGE}
            alt="Zakiora Events luxury celebration"
            className="h-full w-full object-cover"
            style={{
              transform: desktop
                ? `scale(1.1) translate(${m.x * -12}px, ${m.y * -12}px)`
                : "scale(1.05)",
              transition: "transform 1.2s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        </div>

        {/* Layered gradients for perfect text readability and mood */}
        <div className="absolute inset-0 bg-obsidian/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-obsidian/30 opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(8,7,10,0.8)_100%)]" />
      </motion.div>

      {/* Ambient Light Sweeps */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-1/4 top-1/4 h-[60vmax] w-[60vmax] rounded-full mix-blend-screen"
        style={{
          background: "radial-gradient(circle, rgba(109,28,48,0.15) 0%, transparent 65%)",
          transform: `translate3d(${m.x * 26}px, ${m.y * 20}px, 0)`,
          transition: "transform 1.6s cubic-bezier(0.16,1,0.3,1)",
        }}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 3 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-1/4 bottom-0 h-[55vmax] w-[55vmax] rounded-full mix-blend-screen"
        style={{
          background: "radial-gradient(circle, rgba(194,161,92,0.12) 0%, transparent 65%)",
          transform: `translate3d(${m.x * -22}px, ${m.y * -16}px, 0)`,
          transition: "transform 1.8s cubic-bezier(0.16,1,0.3,1)",
        }}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 3, delay: 0.4 }}
      />

      {/* Gentle Particle Overlay */}
      <Particles density={30} />

      {/* Main Content */}
      <div
        className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-col items-center justify-center px-5 pt-16 text-center sm:px-8"
        style={{
          transform: `translate3d(0, ${sy * -0.15}px, 0)`,
          opacity: Math.max(0, 1 - sy / 600),
        }}
      >
        {/* Eyebrow Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={t(0.5)}
          className="mb-6 flex items-center gap-4 sm:mb-8"
        >
          <span className="h-[1px] w-8 bg-gold/50 sm:w-12" />
          <span className="font-sans text-[9px] font-medium uppercase tracking-[0.4em] text-gold sm:text-[11px]">
            The Art of Celebration
          </span>
          <span className="h-[1px] w-8 bg-gold/50 sm:w-12" />
        </motion.div>

        {/* Hero Title */}
        <h1 className="flex flex-col items-center font-serif leading-[0.9] tracking-[0.02em]">
          {["ZAKIORA", "EVENTS"].map((w, i) => (
            <span key={w} className="block overflow-hidden py-[0.04em]">
              <motion.span
                className={`block ${i === 0
                  ? "bg-gradient-to-b from-[#dfc894] to-[#a38042] bg-clip-text text-transparent text-[16vw] sm:text-[13vw] lg:text-[11vw]"
                  : "text-ivory/95 text-[14vw] sm:text-[11vw] lg:text-[9vw]"
                  }`}
                initial={{ y: "110%" }}
                animate={ready ? { y: "0%" } : {}}
                transition={t(0.75 + i * 0.15)}
                style={i === 1 ? { letterSpacing: "0.25em", marginLeft: "0.25em" } : {}}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={t(1.3)}
          className="mx-auto mt-8 max-w-2xl font-sans text-[11px] font-medium uppercase leading-[2] tracking-[0.3em] text-ivory/70 sm:mt-10 sm:text-[13px] lg:text-[14px]"
        >
          Creating Extraordinary Experiences With Over 35 Years Of Excellence
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={t(1.6)}
          className="mt-12 flex flex-col items-center justify-center gap-5 sm:mt-14 sm:flex-row sm:gap-6"
        >
          <GoldButton onClick={() => scrollToId("contact")} className="w-[220px] justify-center sm:w-auto">
            Plan Your Event
          </GoldButton>
          <GoldButton variant="ghost" onClick={() => scrollToId("about")} className="w-[220px] justify-center sm:w-auto">
            Discover More
          </GoldButton>
        </motion.div>
      </div>

      {/* Elegant Scroll Indicator */}

    </section>
  );
}