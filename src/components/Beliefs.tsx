import { beliefs, roman } from "../data/site";

export default function Beliefs() {
  return (
    <section id="beliefs" className="bg-charcoal py-24 sm:py-36">
      <div className="container-site">
        <div className="mb-16 max-w-xl sm:mb-20">
          <p className="label-gold reveal mb-6">What We Believe</p>
          <h2 className="display-title reveal mb-5 text-cream [&_em]:text-gold-lt">
            Our <em>Core</em> Beliefs
          </h2>
          <p className="reveal text-[0.82rem] leading-[2] font-light tracking-[0.06em] text-cream/60">
            The foundational truths of Scripture that define who we are, how we live, and what we proclaim as the Redeemed Christian Church of God.
          </p>
        </div>

        <ol className="grid gap-0.5 md:grid-cols-2">
          {beliefs.map((b, i) => (
            <li
              key={b.title}
              className="reveal group relative bg-white/[0.02] px-8 py-10 transition-colors duration-500 hover:bg-gold/[0.04] sm:px-11 sm:py-12"
              style={{ transitionDelay: `${(i % 2) * 100}ms` }}
            >
              <span aria-hidden className="absolute top-6 right-8 font-display text-sm tracking-[0.3em] text-gold/40">
                {roman[i]}
              </span>
              <div className="mb-4 flex items-center gap-4">
                <span aria-hidden className="grid size-9 shrink-0 place-items-center border border-gold/25 text-gold transition-colors group-hover:border-gold">
                  {b.icon}
                </span>
                <h3 className="font-display text-[1.45rem] font-normal text-cream">{b.title}</h3>
              </div>
              <p className="text-[0.82rem] leading-[1.95] font-light tracking-[0.04em] text-cream/60">{b.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
