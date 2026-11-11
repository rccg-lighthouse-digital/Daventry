import { church } from "../data/site";

/** The gold "next step" band. Nav "Give Online" scrolls here unless church.giveUrl is set. */
export default function NextStep() {
  return (
    <section id="give" className="bg-gold py-24 text-charcoal sm:py-28">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
        <div className="reveal">
          <h2 className="display-title mb-4 text-charcoal">
            Ready to Take Your
            <br />
            <em>Next Step of Faith?</em>
          </h2>
          <p className="max-w-2xl text-[0.88rem] leading-[1.9] font-light tracking-[0.06em] text-charcoal/70">
            Whether you are ready to give your life to Christ, join a ministry, or simply come and see — we would love to meet you. Your journey starts
            with a single step through our doors.
          </p>
        </div>
        <div className="reveal flex flex-wrap gap-4" style={{ transitionDelay: "200ms" }}>
          <a href="#locations" className="btn-dark">
            Plan Your Visit <span aria-hidden>→</span>
          </a>
          {church.giveUrl && (
            <a href={church.giveUrl} target="_blank" rel="noreferrer" className="btn-base border border-charcoal/40 px-12 py-5 font-light text-charcoal hover:bg-charcoal/5">
              Give Online
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
