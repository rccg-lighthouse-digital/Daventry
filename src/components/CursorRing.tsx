import { useEffect, useRef } from "react";

/**
 * The gold ring that trails the pointer on desktop, from the original site.
 * Unlike the original, the normal cursor stays visible (hiding it hurts usability),
 * and nothing renders on touch screens or for people who prefer reduced motion.
 */
export default function CursorRing() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm || !ring.current || !dot.current) return;

    let mx = -100,
      my = -100,
      rx = -100,
      ry = -100,
      raf = 0;
    const r = ring.current;
    const d = dot.current;
    r.style.display = d.style.display = "block";

    const move = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      d.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      const t = e.target as HTMLElement;
      r.dataset.hover = t.closest("a, button, input, textarea, [role='tab']") ? "1" : "0";
    };
    const tick = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      r.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[90] hidden size-11 rounded-full border border-gold/40 transition-[width,height,border-color] duration-300 data-[hover=1]:size-14 data-[hover=1]:border-gold-lt"
      />
      <div ref={dot} aria-hidden className="pointer-events-none fixed top-0 left-0 z-[91] hidden size-1.5 rounded-full bg-gold" />
    </>
  );
}
