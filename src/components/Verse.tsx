import { verse } from "../data/site";

export default function Verse() {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-28 text-center sm:py-32">
      <span aria-hidden className="pointer-events-none absolute -top-28 -left-12 font-display text-[28rem] leading-none font-light text-gold/[0.04] sm:text-[40rem]">
        &ldquo;
      </span>
      <blockquote className="reveal relative mx-auto max-w-3xl">
        <p className="mb-8 font-display text-[clamp(1.7rem,3.5vw,3rem)] leading-normal font-light text-cream italic">&ldquo;{verse.text}&rdquo;</p>
        <cite className="text-[0.66rem] tracking-[0.35em] text-gold not-italic uppercase">{verse.ref}</cite>
      </blockquote>
    </section>
  );
}
