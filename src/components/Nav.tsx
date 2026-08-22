import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { NAV, EMAIL, INSTAGRAM } from "../lib/data";
import { GoldButton, Magnetic } from "./common";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="100%" stopColor="#285AEB" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" className="group-hover:stroke-[url(#ig-grad)] transition-all duration-300" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" className="group-hover:stroke-[url(#ig-grad)] transition-all duration-300" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" className="group-hover:fill-[url(#ig-grad)] transition-all duration-300" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current transition-colors duration-300 group-hover:fill-[#1877F2]" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function SocialChip({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      aria-label={label}
      className="group flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-500 hover:scale-110 hover:border-gold/40 hover:bg-white/5 sm:h-8 sm:w-8"
    >
      {icon}
    </a>
  );
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } })
    .__lenis;
  if (lenis) lenis.scrollTo(el, { offset: -10, duration: 1.6 });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Nav({ ready }: { ready: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 60);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), open ? 700 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed left-0 top-0 z-[9000] w-full transition-all duration-700 ${scrolled
          ? "bg-[#050505]/85 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          : "bg-gradient-to-b from-[#050505]/95 via-[#050505]/60 to-transparent"
          }`}
      >
        {/* Unified Top Utility Bar */}
        <div
          className={`flex justify-center border-b border-white/5 transition-all duration-500 overflow-hidden ${scrolled ? "h-0 opacity-0 border-transparent" : "h-10 opacity-100"
            }`}
        >
          <div className="flex h-full w-full max-w-[1400px] items-center justify-between px-6 sm:px-8">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 truncate font-sans text-[9px] font-medium uppercase tracking-[0.2em] text-white/60 transition-colors duration-300 hover:text-gold sm:text-[10px]"
            >
              {EMAIL}
            </a>

            <div className="flex items-center gap-3">
              <SocialChip href="https://facebook.com" label="Facebook" icon={<FacebookIcon />} />
              <SocialChip href="https://instagram.com/zakiora.events" label="Instagram" icon={<InstagramIcon />} />
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="mx-auto flex h-[72px] w-full max-w-[1400px] items-center justify-between px-6 sm:h-20 sm:px-8">

          {/* Logo */}
          <button
            onClick={() => go("home")}
            data-cursor="explore"
            className="group flex flex-col items-start text-left"
          >
            <span className="block font-serif text-[18px] tracking-[0.3em] text-white transition-colors duration-500 group-hover:text-gold sm:text-[20px]">
              ZAKIORA
            </span>
            <span className="mt-1 block font-sans text-[7px] font-bold tracking-[0.7em] text-gold/70 sm:text-[8px]">
              EVENTS
            </span>
          </button>

          {/* Nav Links */}
          <nav className="hidden items-center gap-10 lg:flex">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                data-cursor="explore"
                className="group relative font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70 transition-colors duration-300 hover:text-white"
              >
                {n.label}
                <span className="absolute -bottom-2 left-1/2 h-[1px] w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 transition-all duration-300 group-hover:w-full group-hover:opacity-100" />
              </button>
            ))}
          </nav>

          {/* Action / Mobile Toggle */}
          <div className="flex items-center gap-5">
            <div className="hidden lg:block">
              <GoldButton onClick={() => go("contact")} className="h-11 scale-95 px-8 text-[10px]">
                Plan Your Event
              </GoldButton>
            </div>

            <Magnetic strength={0.25}>
              <button
                aria-label="Menu"
                data-cursor="explore"
                onClick={() => setOpen((o) => !o)}
                className="group flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-gold/40 hover:bg-gold/10 lg:hidden"
              >
                <span
                  className={`h-[1px] w-4 bg-white transition-all duration-500 group-hover:bg-gold ${open ? "translate-y-[3px] rotate-45" : "group-hover:w-5"
                    }`}
                />
                <span
                  className={`h-[1px] w-4 bg-white transition-all duration-500 group-hover:bg-gold ${open ? "-translate-y-[3px] -rotate-45" : "group-hover:w-3"
                    }`}
                />
              </button>
            </Magnetic>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[8999] flex flex-col justify-center bg-[#050505] px-6 lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Minimalist Mobile Background Glow */}
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(circle at 80% 20%, rgba(212,175,55,0.1), transparent 50%), radial-gradient(circle at 20% 80%, rgba(212,175,55,0.05), transparent 50%)",
              }}
            />

            <div className="relative flex h-full flex-col justify-center py-24">
              <nav className="flex flex-col gap-6">
                {NAV.map((n, i) => (
                  <div key={n.id} className="overflow-hidden">
                    <motion.button
                      onClick={() => go(n.id)}
                      initial={{ y: "110%", opacity: 0, rotate: 2 }}
                      animate={{ y: "0%", opacity: 1, rotate: 0 }}
                      exit={{ y: "110%", opacity: 0 }}
                      transition={{
                        duration: 0.85,
                        delay: 0.15 + i * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="group flex w-full items-baseline gap-6 text-left"
                    >
                      <span className="font-sans text-[11px] font-semibold tracking-[0.3em] text-gold/50 transition-colors duration-300 group-hover:text-gold">
                        0{i + 1}
                      </span>
                      <span className="font-serif text-[12vw] leading-[1] tracking-tight text-white transition-colors duration-300 group-hover:text-gold sm:text-[10vw]">
                        {n.label}
                      </span>
                    </motion.button>
                  </div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative mt-auto space-y-8 pt-12"
              >
                <div className="h-[1px] w-full max-w-[120px] bg-gradient-to-r from-gold/40 to-transparent" />

                <div className="flex flex-col gap-3">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="block font-sans text-[12px] font-medium uppercase tracking-[0.15em] text-white/80 transition-colors hover:text-gold"
                  >
                    {EMAIL}
                  </a>
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40">
                    {INSTAGRAM}
                  </p>
                </div>

                <div className="pt-2">
                  <GoldButton onClick={() => go("contact")} className="w-full max-w-[280px] justify-center h-12">
                    Plan Your Event
                  </GoldButton>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}