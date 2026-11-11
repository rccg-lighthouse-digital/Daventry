import type { ReactNode } from "react";
import { MapPin, Clock, Mail, Phone } from "lucide-react";
import { church, directionsUrl, mapEmbedUrl, serviceTimes } from "../data/site";

function Detail({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <span className="mt-0.5 grid size-8 shrink-0 place-items-center border border-gold/25 text-gold">{icon}</span>
      <div>
        <p className="mb-1.5 text-[0.65rem] tracking-[0.25em] text-gold uppercase">{label}</p>
        <div className="text-[0.85rem] leading-[1.9] font-light tracking-[0.04em] text-cream/80">{children}</div>
      </div>
    </div>
  );
}

export default function Location() {
  return (
    <section id="locations" className="bg-ink py-24 sm:py-36">
      <div className="container-site">
        <div className="mb-14 sm:mb-18">
          <p className="label-gold reveal mb-6">Find Us</p>
          <h2 className="display-title reveal text-cream [&_em]:text-gold-lt">
            Our <em>Location</em>
          </h2>
        </div>

        <div className="reveal grid overflow-hidden border border-gold/10 lg:grid-cols-2">
          <div className="flex flex-col justify-center border-b border-gold/10 bg-white/[0.025] px-7 py-12 sm:px-14 sm:py-16 lg:border-r lg:border-b-0">
            <span className="mb-9 inline-flex self-start bg-gold px-[18px] py-1.5 text-[0.62rem] tracking-[0.3em] text-charcoal uppercase">📍 Daventry</span>
            <h3 className="mb-8 font-display text-[2.6rem] leading-[1.1] font-light text-cream">
              RCCG Lighthouse
              <br />
              Daventry
            </h3>
            <div className="space-y-5">
              <Detail icon={<MapPin className="size-3.5" />} label="Address">
                <address className="not-italic">
                  {church.addressLines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
              </Detail>
              <Detail icon={<Clock className="size-3.5" />} label="Service Times">
                {serviceTimes.map((s) => (
                  <span key={s.name} className="block">
                    {s.name}
                    {s.day !== "Sunday" ? ` (${s.day.slice(0, 3)})` : ""} — {s.time}
                  </span>
                ))}
              </Detail>
              <Detail icon={<Mail className="size-3.5" />} label="Contact">
                <a href={`mailto:${church.email}`} className="break-all hover:text-gold-lt">
                  {church.email}
                </a>
                {church.phone && (
                  <a href={`tel:${church.phone.replace(/\s/g, "")}`} className="mt-1 flex items-center gap-2 hover:text-gold-lt">
                    <Phone className="size-3" /> {church.phone}
                  </a>
                )}
              </Detail>
            </div>
            <a
              href={directionsUrl()}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center gap-2.5 self-start border-b border-gold pb-1 text-[0.66rem] tracking-[0.25em] text-gold uppercase transition-all hover:gap-4 hover:text-gold-lt"
            >
              Get Directions <span aria-hidden>→</span>
            </a>
          </div>

          <div className="relative min-h-[360px] bg-charcoal">
            {/* Map tinted to sit with the dark palette; full colour on hover */}
            <iframe
              title="Map showing RCCG Lighthouse Daventry"
              src={mapEmbedUrl()}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full border-0 [filter:grayscale(1)_invert(0.92)_contrast(0.9)_sepia(0.25)] transition-[filter] duration-500 hover:[filter:none]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
