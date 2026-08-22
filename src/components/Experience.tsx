import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EXPERIENCES } from "../lib/data";
import { MaskWords } from "./common";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const calc = () => {
      const section = ref.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const visibleWidth = section.clientWidth;
      const totalWidth = track.scrollWidth;
      const extra = totalWidth - visibleWidth + 120;
      setShift(Math.max(0, extra));
    };

    calc();
    window.addEventListener("resize", calc);
    const id = setTimeout(calc, 800);
    return () => {
      window.removeEventListener("resize", calc);
      clearTimeout(id);
    };
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -shift]);

  return null;
}
