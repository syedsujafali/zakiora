import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { IMG } from "../lib/data";
import { Eyebrow, MaskWords, ParallaxImage, Reveal } from "./common";
import Particles from "./Particles";

const INTRO =
  "Welcome to Zakiora Events, where elegance meets perfection. We specialize in luxury weddings, birthdays, corporate events, premium décor, world-class catering, photography, entertainment, and complete event planning. From intimate gatherings to grand celebrations, we create unforgettable experiences with exceptional service, creativity, and attention to every detail.";

function WordScroll({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const words = text.split(" ");
  return (
    <p
      ref={ref}
      className="max-w-[1200px] font-serif text-[24px] leading-[1.7] tracking-[0.01em] text-ivory/85 sm:text-[30px] lg:text-[44px]"
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block pr-[0.22em]"
          initial={{ opacity: 0, y: 26, filter: "blur(5px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{
            duration: 0.9,
            delay: i * 0.045,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {w}
        </motion.span>
      ))}
    </p>
  );
}

export default function Intro() {
  return (
    <section
      id="intro"
      className="relative overflow-hidden border-t border-ivory/5 bg-obsidian py-24 sm:py-36 lg:py-52"
    >
      <Particles density={22} />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[40vmax] w-[80vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(74,18,32,0.35) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <Eyebrow>THE HOUSE OF CELEBRATION</Eyebrow>

        <div className="mt-10 max-w-full sm:mt-16">
          <MaskWords
            text="Where elegance"
            className="font-sans text-[11vw] font-light uppercase leading-[0.82] tracking-[0.08em] text-ivory/90 sm:text-[7.6vw] lg:text-[5.7vw]"
          />
          <MaskWords
            text="meets perfection."
            delay={0.12}
            className="gold-text mt-[-0.08em] font-serif text-[10.5vw] leading-[0.72] tracking-[-0.05em] italic sm:text-[7.1vw] lg:text-[5.2vw]"
          />
        </div>

        <div className="mt-16 grid gap-12 lg:mt-28 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <ParallaxImage
                src={IMG.brand}
                alt="Zakiora Events"
                className="aspect-[4/5] w-full max-w-[520px]"
                amount={16}
              />
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-6 flex items-center justify-between">
                <span className="font-sans text-[9px] tracking-[0.36em] text-ivory/35">
                  ZAKIORA EVENTS
                </span>
                <span className="font-sans text-[9px] tracking-[0.36em] text-gold/60">
                  35+ YEARS
                </span>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col justify-center lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <WordScroll text={INTRO} />
            </motion.div>
            <Reveal delay={0.2}>
              <div className="hairline mt-12" />
              <p className="mt-8 font-sans text-[10px] uppercase tracking-[0.4em] text-gold/70 sm:text-[11px]">
                Your Vision. Our Expertise. Memories That Last Forever.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
