import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { slides } from "../data/site";
import { img } from "../lib/img";

const DURATION = 4500; // ms per slide

/** Signed distance of slide i from the active one, wrapping around. */
function offset(i: number, active: number, n: number) {
  let d = (((i - active) % n) + n) % n;
  if (d > n / 2) d -= n;
  return d;
}

function slideStyle(p: number): CSSProperties {
  const ty = "translateY(-50%)";
  if (p === 0)
    return {
      transform: `translateX(0) ${ty} scale(1)`,
      filter: "none",
      opacity: 1,
      zIndex: 10,
      boxShadow: "0 28px 72px rgba(0,0,0,.65), 0 0 0 1px rgba(201,168,76,.22), 0 0 48px rgba(201,168,76,.05)",
    };
  if (Math.abs(p) === 1)
    return {
      transform: `translateX(${p * 93}%) ${ty} scale(0.81)`,
      filter: "grayscale(58%) brightness(0.44)",
      opacity: 1,
      zIndex: 5,
      cursor: "pointer",
    };
  return {
    transform: `translateX(${p > 0 ? 196 : -196}%) ${ty} scale(0.66)`,
    filter: "grayscale(100%) brightness(0.12)",
    opacity: 0,
    zIndex: 1,
    pointerEvents: "none",
  };
}

export default function Carousel() {
  const n = slides.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((dir: number) => setActive((a) => (a + dir + n) % n), [n]);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => go(1), DURATION);
    return () => clearTimeout(t);
  }, [active, paused, go]);

  return (
    <section
      id="reels"
      className="overflow-hidden bg-charcoal py-24 sm:py-32"
      aria-roledescription="carousel"
      aria-label="Photos from church"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
    >
      <div className="reveal mb-12 px-6 text-center">
        <p className="mb-5 inline-flex items-center gap-3.5 text-[10px] tracking-[0.32em] text-gold uppercase before:h-px before:w-9 before:bg-gold/40 after:h-px after:w-9 after:bg-gold/40">
          Images
        </p>
        <h2 className="text-[clamp(1.55rem,3.5vw,2.6rem)] leading-tight font-light tracking-[0.14em] text-cream uppercase">
          Reels from <span className="font-normal text-gold-lt">Church</span>
        </h2>
      </div>

      <div className="relative h-[clamp(190px,30vw,420px)]">
        {slides.map((s, i) => {
          const p = offset(i, active, n);
          return (
            <div
              key={s.image}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${n}`}
              aria-hidden={p !== 0}
              onClick={Math.abs(p) === 1 ? () => go(p) : undefined}
              className="absolute top-1/2 left-1/2 -ml-[36%] aspect-video w-[72%] overflow-hidden rounded-md transition-[transform,filter,opacity,box-shadow] duration-[820ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform sm:-ml-[23%] sm:w-[46%]"
              style={slideStyle(p)}
            >
              <img src={img(s.image, 1400)} alt={s.title} loading={Math.abs(p) <= 1 ? "eager" : "lazy"} className="size-full object-cover select-none" draggable={false} />
              <div
                className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-charcoal/95 via-charcoal/20 via-50% to-transparent p-5 transition-opacity delay-300 duration-500 ${
                  p === 0 ? "opacity-100" : "opacity-0"
                }`}
              >
                {s.tag && <p className="mb-1.5 text-[9px] tracking-[0.28em] text-gold uppercase">{s.tag}</p>}
                <h3 className="text-[clamp(0.85rem,1.65vw,1.28rem)] leading-tight font-light tracking-[0.1em] text-cream uppercase">{s.title}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-center gap-4 px-6">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="grid size-9 place-items-center rounded-full border border-gold/30 text-muted transition hover:scale-105 hover:border-gold hover:bg-gold/10 hover:text-gold"
        >
          <ChevronLeft className="size-4" />
        </button>
        <div className="flex items-center gap-2" role="tablist" aria-label="Choose photo">
          {slides.map((s, i) => (
            <button
              key={s.image}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show photo ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-1 rounded-sm transition-all duration-300 ${i === active ? "w-6 bg-gold" : "w-1 bg-muted/50 hover:bg-muted"}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next photo"
          className="grid size-9 place-items-center rounded-full border border-gold/30 text-muted transition hover:scale-105 hover:border-gold hover:bg-gold/10 hover:text-gold"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      {/* Progress bar restarts on every slide change */}
      <div className="mx-auto mt-8 h-px max-w-[1400px] overflow-hidden bg-gold/10">
        <div
          key={`${active}-${paused}`}
          className="h-full origin-left bg-gradient-to-r from-gold/30 to-gold"
          style={{ animation: paused ? "none" : `progress ${DURATION}ms linear forwards`, transform: paused ? "scaleX(0)" : undefined }}
        />
      </div>
      <style>{`@keyframes progress { from { transform: scaleX(0) } to { transform: scaleX(1) } }`}</style>
    </section>
  );
}
