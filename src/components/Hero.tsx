import { church, heroImage } from "../data/site";
import { img } from "../lib/img";

const lines = [
  { left: "15%", height: "40%", delay: "0s", dur: "10s" },
  { left: "30%", height: "60%", delay: "2s", dur: "14s" },
  { left: "52%", height: "35%", delay: "5s", dur: "11s" },
  { left: "70%", height: "55%", delay: "1s", dur: "13s" },
  { left: "86%", height: "45%", delay: "7s", dur: "12s" },
];

export default function Hero() {
  return (
    <section id="home" className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-24 text-center">
      {/* Worship photo, faded into the charcoal background */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <img src={img(heroImage, 2400)} alt="" fetchPriority="high" className="size-full animate-drift object-cover object-[center_30%] opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/20 to-charcoal" />
      </div>
      {/* Soft gold glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 animate-breathe bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(201,168,76,.10)_0%,transparent_70%)]"
      />
      {/* Falling light lines */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        {lines.map((l) => (
          <span
            key={l.left}
            className="absolute top-0 w-px animate-line-fall bg-gradient-to-b from-transparent via-gold/20 to-transparent opacity-0"
            style={{ left: l.left, height: l.height, animationDelay: l.delay, animationDuration: l.dur }}
          />
        ))}
      </div>

      <p
        className="mb-10 flex animate-fade-up items-center gap-4 text-[0.62rem] tracking-[0.45em] text-gold uppercase [animation-delay:200ms] before:hidden before:h-px before:w-10 before:bg-gold/50 after:hidden after:h-px after:w-10 after:bg-gold/50 sm:before:block sm:after:block"
      >
        Welcome to {church.name}
      </p>
      <h1 className="mb-8 animate-fade-up font-display text-[clamp(3.4rem,8vw,7rem)] leading-[1.05] font-light text-cream [animation-delay:400ms]">
        Where God&apos;s
        <em className="block text-gold-lt italic">Light Shines</em>
      </h1>
      <p className="mb-14 animate-fade-up text-[0.8rem] tracking-[0.2em] text-cream/70 uppercase [animation-delay:600ms]">
        You are the Light of the world — Matthew 5:14
      </p>
      <div className="flex animate-fade-up flex-wrap justify-center gap-4 [animation-delay:800ms]">
        <a href="#locations" className="btn-gold">
          Plan Your Visit <span aria-hidden>→</span>
        </a>
        <a href="#contact" className="btn-outline">
          Get in Touch
        </a>
      </div>

      <a href="#about" className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[0.55rem] tracking-[0.4em] text-muted uppercase">
        <span className="block h-12 w-px animate-scroll-pulse bg-gradient-to-b from-gold to-transparent" />
        Scroll
      </a>
    </section>
  );
}
