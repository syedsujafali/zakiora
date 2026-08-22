import { useEffect, useState } from "react";
import { useIsDesktop } from "./common";

/** Lightweight CSS 3D "metallic sculpture" — nested champagne-gold rings
 *  that rotate slowly and tilt subtly toward the pointer. */
export default function Sculpture({ className = "" }: { className?: string }) {
  const desktop = useIsDesktop();
  const [t, setT] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!desktop) return;
    const on = (e: MouseEvent) => {
      setT({
        x: (e.clientY / window.innerHeight - 0.5) * -24,
        y: (e.clientX / window.innerWidth - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", on);
    return () => window.removeEventListener("mousemove", on);
  }, [desktop]);

  const rings = [
    { s: 100, rx: 0, ry: 0, dur: "46s", o: 0.55 },
    { s: 82, rx: 68, ry: 12, dur: "34s", o: 0.4 },
    { s: 64, rx: 20, ry: 72, dur: "58s", o: 0.5 },
    { s: 46, rx: 48, ry: 40, dur: "26s", o: 0.35 },
  ];

  return (
    <div
      className={"pointer-events-none select-none " + className}
      style={{ perspective: "1000px" }}
      aria-hidden
    >
      <div
        className="relative h-full w-full transition-transform duration-[1200ms] ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${t.x}deg) rotateY(${t.y}deg)`,
        }}
      >
        {rings.map((r, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{
              width: `${r.s}%`,
              height: `${r.s}%`,
              marginLeft: `-${r.s / 2}%`,
              marginTop: `-${r.s / 2}%`,
              transformStyle: "preserve-3d",
              animation: `spin3d ${r.dur} linear infinite ${i % 2 ? "reverse" : ""}`,
            }}
          >
            <div
              className="h-full w-full rounded-full"
              style={{
                border: "1px solid transparent",
                borderTopColor: `rgba(226,207,174,${r.o})`,
                borderLeftColor: `rgba(194,161,92,${r.o * 0.7})`,
                borderBottomColor: `rgba(141,111,52,${r.o * 0.45})`,
                boxShadow: `0 0 40px rgba(194,161,92,${r.o * 0.18})`,
                transform: `rotateX(${r.rx}deg) rotateY(${r.ry}deg)`,
              }}
            />
          </div>
        ))}
        <div
          className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, #fff6e2 0%, #c2a15c 45%, transparent 72%)",
            boxShadow: "0 0 60px 14px rgba(194,161,92,0.28)",
          }}
        />
      </div>
      <style>{`@keyframes spin3d { from { transform: rotateZ(0deg); } to { transform: rotateZ(360deg); } }`}</style>
    </div>
  );
}
