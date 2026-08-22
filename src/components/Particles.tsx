import { useEffect, useRef } from "react";

type P = { x: number; y: number; r: number; s: number; o: number; d: number };

export default function Particles({
  density = 42,
  className = "",
  color = "194,161,92",
}: {
  density?: number;
  className?: string;
  color?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let w = 0,
      h = 0,
      raf = 0,
      running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
    let parts: P[] = [];

    const resize = () => {
      const r = cv.getBoundingClientRect();
      w = r.width;
      h = r.height;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(12, Math.round((w * h) / 26000) + density / 3);
      parts = Array.from({ length: Math.min(n, density) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.35,
        s: Math.random() * 0.22 + 0.05,
        o: Math.random() * 0.5 + 0.15,
        d: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (t: number) => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.y -= p.s;
        p.x += Math.sin(t / 3200 + p.d) * 0.18;
        if (p.y < -8) {
          p.y = h + 8;
          p.x = Math.random() * w;
        }
        const flick = 0.6 + 0.4 * Math.sin(t / 900 + p.d * 3);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${p.o * flick})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    const io = new IntersectionObserver((e) => {
      const vis = e[0]?.isIntersecting;
      if (vis && !running) {
        running = true;
        raf = requestAnimationFrame(draw);
      } else if (!vis) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(cv);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      io.disconnect();
    };
  }, [density, color]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={"pointer-events-none absolute inset-0 h-full w-full " + className}
    />
  );
}
