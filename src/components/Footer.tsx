import { church, serviceTimes, social } from "../data/site";
import { img } from "../lib/img";

const explore = [
  { href: "#about", label: "About Us" },
  { href: "#beliefs", label: "Our Beliefs" },
  { href: "#services", label: "Ministries" },
  { href: "#reels", label: "Photos" },
  { href: "#locations", label: "Location" },
];

const connect = [
  { href: "#locations", label: "Plan a Visit" },
  { href: "#contact", label: "Prayer Requests" },
  { href: "#contact", label: "Volunteer" },
  { href: church.giveUrl || "#give", label: "Give Online" },
  { href: church.parentSite, label: "Lighthouse Family" },
];

const linkCls = "text-[0.78rem] font-light tracking-[0.06em] text-cream/55 transition-colors hover:text-gold-lt";

export default function Footer() {
  return (
    <footer className="border-t border-gold/10 bg-charcoal">
      <div className="container-site grid gap-12 py-20 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <a href="#" className="inline-flex items-center gap-3.5">
            <img src={img("logo.webp", 200)} alt="" className="size-10 object-contain" />
            <span className="font-display text-[1.05rem] tracking-[0.18em] text-cream uppercase">{church.name}</span>
          </a>
          <p className="mt-6 max-w-xs text-[0.8rem] leading-[1.9] font-light tracking-[0.04em] text-cream/55">
            A community of believers committed to the Word of God, the work of the Holy Spirit, and the love of our neighbour.
          </p>
        </div>

        <div>
          <h4 className="mb-6 text-[0.62rem] tracking-[0.35em] text-gold uppercase">Explore</h4>
          <ul className="space-y-3">
            {explore.map((l) => (
              <li key={l.label}>
                <a href={l.href} className={linkCls}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-6 text-[0.62rem] tracking-[0.35em] text-gold uppercase">Connect</h4>
          <ul className="space-y-3">
            {connect.map((l) => (
              <li key={l.label}>
                <a href={l.href} className={linkCls} {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-6 text-[0.62rem] tracking-[0.35em] text-gold uppercase">Service Times</h4>
          <ul className="space-y-3 text-[0.78rem] font-light tracking-[0.06em] text-cream/55">
            {serviceTimes.map((s) => (
              <li key={s.name}>
                {s.day} {s.time}
                <span className="block text-[0.7rem] text-cream/40">{s.name}</span>
              </li>
            ))}
            <li>
              <a href="#locations" className={linkCls}>
                NN11 4GL, Daventry
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gold/10">
        <div className="container-site flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.66rem] tracking-[0.12em] text-cream/45">
            © {new Date().getFullYear()} {church.name} · Part of the Redeemed Christian Church of God · Registered Charity ({church.charityNumber})
          </p>
          {social.length > 0 && (
            <ul className="flex gap-2">
              {social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid size-9 place-items-center border border-gold/20 text-xs text-muted transition hover:border-gold hover:text-gold"
                  >
                    {s.short}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}
