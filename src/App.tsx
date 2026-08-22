import { useEffect, useState } from "react";
import Lenis from "lenis";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Experience from "./components/Experience";
import Catering from "./components/Catering";
import Gallery from "./components/Gallery";
import About from "./components/About";
import Contact from "./components/Contact";
import FinalCTA from "./components/FinalCTA";

function Marquee() {
  const items = [
    "PREMIUM EVENT PLANNING",
    "STUNNING DECORATIONS",
    "VENUE MANAGEMENT",
    "PHOTOGRAPHY",
    "VIDEOGRAPHY",
    "ENTERTAINMENT",
    "HOSPITALITY",
    "COMPLETE EVENT COORDINATION",
    "CATERING SERVICES",
  ];
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-ivory/8 bg-obsidian py-5 sm:py-7">
      <div className="marquee-track flex w-max items-center gap-10 sm:gap-16">
        {[0, 1].map((k) => (
          <div key={k} className="flex items-center gap-10 sm:gap-16">
            {row.map((t, i) => (
              <span key={k + "-" + i} className="flex items-center gap-10 sm:gap-16">
                <span className="whitespace-nowrap font-serif text-lg tracking-[0.14em] text-ivory/45 sm:text-2xl">
                  {t}
                </span>
                <span className="h-1 w-1 rotate-45 bg-gold/60" />
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-obsidian to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-obsidian to-transparent" />
    </div>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      lerp: 0.09,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    (window as unknown as { __lenis?: unknown }).__lenis = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const l = (window as unknown as { __lenis?: { start: () => void; stop: () => void } })
      .__lenis;
    if (!l) return;
    if (ready) l.start();
    else l.stop();
  }, [ready]);

  return (
    <div className="grain relative min-h-screen w-full bg-obsidian text-ivory antialiased">
      <Preloader onDone={() => setReady(true)} />
      <Nav ready={ready} />
      <main>
        <Hero ready={ready} />
        <About />
        <Marquee />
        <Services />
        <Experience />
        <Catering />
        <Gallery />
        <Contact />
        <FinalCTA />
      </main>
    </div>
  );
}
