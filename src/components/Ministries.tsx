import { ministries } from "../data/site";

export default function Ministries() {
  return (
    <section id="services" className="bg-charcoal py-24 sm:py-36">
      <div className="container-site">
        <div className="mb-16 sm:mb-20">
          <p className="label-gold reveal mb-6">Ministry</p>
          <h2 className="display-title reveal text-cream [&_em]:text-gold-lt" style={{ transitionDelay: "100ms" }}>
            Rooted in <em>Purpose,</em>
            <br />
            Growing in Grace
          </h2>
        </div>

        <div className="grid gap-0.5 md:grid-cols-3">
          {ministries.map((m, i) => (
            <article
              key={m.title}
              className="reveal group relative overflow-hidden border-t border-gold/10 bg-white/[0.025] px-10 py-14 transition-colors duration-500 hover:bg-gold/[0.04]"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span
                aria-hidden
                className="absolute top-5 right-6 font-display text-7xl leading-none font-light text-gold/[0.06] transition-colors duration-500 group-hover:text-gold/15"
              >
                {m.n}
              </span>
              <span aria-hidden className="mb-8 grid size-12 place-items-center border border-gold/25 text-xl transition-colors duration-500 group-hover:border-gold group-hover:bg-gold/10">
                {m.icon}
              </span>
              <h3 className="mb-4 font-display text-2xl font-normal text-cream">{m.title}</h3>
              <p className="text-[0.82rem] leading-[1.95] font-light tracking-[0.04em] text-cream/60">{m.text}</p>
              <span aria-hidden className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
