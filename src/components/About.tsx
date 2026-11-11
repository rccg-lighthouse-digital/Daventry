import { useEffect, useRef, useState } from "react";
import { aboutImage } from "../data/site";
import { img } from "../lib/img";

/** Counts up from 0 to `target` once the number scrolls into view. */
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setValue(0);
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / 1800, 1);
          setValue(Math.floor((1 - Math.pow(1 - p, 3)) * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {value}
      {value === target ? suffix : ""}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="bg-paper py-24 text-ink sm:py-36">
      <div className="container-site grid items-center gap-20 lg:grid-cols-2 lg:gap-24">
        <div className="reveal">
          <p className="label-gold mb-6 !text-gold-dk before:!bg-gold-dk">Our Story</p>
          <h2 className="display-title mb-8 text-ink [&_em]:text-gold-dk">
            The RCCG UK
            <br />
            <em>Lighthouse</em> Family
          </h2>
          <div className="space-y-5 text-[0.88rem] leading-[2.1] font-light tracking-[0.04em] text-muted">
            <p>
              Lighthouse is part of the great commission of the Redeemed Christian Church of God (RCCG). RCCG is a worldwide Church established in 1952
              by Pastor Josiah Akindayomi. The present General Overseer is Pastor E.A. Adeboye. We operate an open door policy and welcome everyone
              irrespective of race, gender, religion, sexual orientation, disability or age.
            </p>
            <p>
              Lighthouse Family exists to equip individuals for works of service and for the building up of the body of Christ — helping each person{" "}
              <strong className="font-normal text-ink">Discover, Develop</strong> and <strong className="font-normal text-ink">Deploy</strong> their
              gifts.
            </p>
          </div>
        </div>

        <div className="reveal relative h-[420px] sm:h-[520px]" style={{ transitionDelay: "200ms" }}>
          <div className="group absolute top-0 right-0 h-[90%] w-[88%] overflow-hidden bg-gradient-to-br from-[#2a2218] to-[#1a1510]">
            <img
              src={img(aboutImage.image, 1200)}
              alt={aboutImage.alt}
              loading="lazy"
              className="size-full object-cover opacity-90 mix-blend-luminosity transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(201,168,76,.18)_0%,rgba(26,24,20,.45)_60%,rgba(26,24,20,.75)_100%)]" />
          </div>
          <div aria-hidden className="absolute bottom-[30px] -left-4 h-[60%] w-[60%] border border-gold/25 sm:-left-8" />
          <div className="absolute -bottom-5 -left-2 bg-gold px-9 py-7 text-charcoal">
            <span className="block font-display text-[2.8rem] leading-none font-light">
              <CountUp target={70} suffix="+" />
            </span>
            <span className="mt-1.5 block text-[0.6rem] tracking-[0.3em] uppercase opacity-80">Years of RCCG Ministry</span>
          </div>
        </div>
      </div>
    </section>
  );
}
