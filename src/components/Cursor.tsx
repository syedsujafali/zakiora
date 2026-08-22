import { useEffect, useRef } from "react";
import { useIsDesktop } from "./common";

export default function Cursor() {
  const desktop = useIsDesktop();
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!desktop) return;

    document.documentElement.classList.add("cursor-none-desktop");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const glow = { ...target };
    const ring = { ...target };
    const dot = { ...target };
    let raf = 0;

    const move = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const setInteractiveState = (active: boolean) => {
      document.body.classList.toggle("cursor-active", active);
    };

    const onPointerOver = (event: PointerEvent) => {
      const targetEl = event.target as Element | null;
      const interactive = targetEl?.closest(
        "a, button, input, textarea, select, label, [data-cursor='hover']"
      );
      if (interactive) setInteractiveState(true);
    };

    const onPointerOut = (event: PointerEvent) => {
      const targetEl = event.target as Element | null;
      const interactive = targetEl?.closest(
        "a, button, input, textarea, select, label, [data-cursor='hover']"
      );
      if (interactive) setInteractiveState(false);
    };

    const loop = () => {
      glow.x += (target.x - glow.x) * 0.06;
      glow.y += (target.y - glow.y) * 0.06;
      ring.x += (target.x - ring.x) * 0.18;
      ring.y += (target.y - ring.y) * 0.18;
      dot.x += (target.x - dot.x) * 0.32;
      dot.y += (target.y - dot.y) * 0.32;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glow.x}px, ${glow.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`;
      }

      raf = requestAnimationFrame(loop);
    };

    loop();
    window.addEventListener("mousemove", move);
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);

    return () => {
      document.documentElement.classList.remove("cursor-none-desktop");
      document.body.classList.remove("cursor-active");
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
    };
  }, [desktop]);

  if (!desktop) return null;

  return (
    <>
      <div ref={glowRef} className="cursor-glow" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}
