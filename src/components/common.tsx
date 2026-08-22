import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

/* ---------------- hooks ---------------- */

export function useIsDesktop() {
  const [d, setD] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const on = () => setD(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return d;
}

export function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(mq.matches);
  }, []);
  return r;
}

/* ---------------- word / char reveal ---------------- */

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
  once = true,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-12% 0px -12% 0px" });
  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.15, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function MaskWords({
  text,
  className = "",
  wordClass = "",
  delay = 0,
  stagger = 0.055,
  as: Tag = "div",
}: {
  text: string;
  className?: string;
  wordClass?: string;
  delay?: number;
  stagger?: number;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const words = text.split(" ");
  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block align-bottom"
          style={{ paddingTop: "0.04em", paddingBottom: "0.08em", marginBottom: 0 }}
        >
          <motion.span
            className={"inline-block " + wordClass}
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{
              duration: 1.1,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* ---------------- section label ---------------- */

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <div className="flex items-center gap-4">
        <span className="h-px w-10 bg-gold/60" />
        <span className="font-sans text-[10px] tracking-[0.45em] text-gold/80 sm:text-[11px]">
          {children}
        </span>
      </div>
    </Reveal>
  );
}

/* ---------------- magnetic button ---------------- */

export function Magnetic({
  children,
  className = "",
  strength = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const desktop = useIsDesktop();

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={className}
      onMouseMove={(e) => {
        if (!desktop || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- gold button ---------------- */

export function GoldButton({
  children,
  onClick,
  href,
  variant = "solid",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "solid" | "ghost";
  className?: string;
}) {
  const base =
    "group relative inline-flex items-center justify-center overflow-hidden px-8 py-4 font-sans text-[10.5px] tracking-[0.32em] uppercase transition-colors duration-500 sm:px-10 sm:text-[11px]";
  const style =
    variant === "solid"
      ? "text-obsidian"
      : "text-ivory/85 hover:text-obsidian border border-ivory/25";
  const Comp: React.ElementType = href ? "a" : "button";
  return (
    <Magnetic className={"inline-block " + className}>
      <Comp
        href={href}
        onClick={onClick}
        data-cursor="explore"
        className={base + " " + style}
      >
        {variant === "solid" && (
          <span className="absolute inset-0 bg-gradient-to-r from-gold-deep via-champagne to-gold-deep" />
        )}
        <span className="absolute inset-0 -translate-y-full bg-champagne transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
        <span className="relative z-10 whitespace-nowrap">{children}</span>
      </Comp>
    </Magnetic>
  );
}

/* ---------------- parallax image ---------------- */

export function ParallaxImage({
  src,
  alt = "",
  className = "",
  imgClass = "",
  amount = 12,
  cursor = "view",
  onClick,
}: {
  src: string;
  alt?: string;
  className?: string;
  imgClass?: string;
  amount?: number;
  cursor?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [off, setOff] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        if (r.bottom < -200 || r.top > vh + 200) return;
        const p = (r.top + r.height / 2 - vh / 2) / vh;
        setOff(-p * amount);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [amount]);

  return (
    <div
      ref={ref}
      data-cursor={cursor}
      onClick={onClick}
      className={"relative overflow-hidden bg-coal " + className}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={"h-full w-full object-cover will-change-transform " + imgClass}
        style={{ transform: `translate3d(0, ${off}px, 0) scale(1.08)` }}
      />
    </div>
  );
}
