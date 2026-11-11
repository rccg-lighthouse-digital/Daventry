import { useState, type FormEvent } from "react";
import { MapPin, Clock, Mail } from "lucide-react";
import { church } from "../data/site";

// Free form backend (https://web3forms.com). Put the access key in .env as
// VITE_WEB3FORMS_KEY. Without a key the form opens an email instead, so nothing is lost.
// (The old Squarespace form only *pretended* to send: it changed the button text and
// discarded the message.)
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

type Status = "idle" | "sending" | "sent" | "error";

function Field({ id, label, type = "text", required = false, full = false, textarea = false }: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  full?: boolean;
  textarea?: boolean;
}) {
  const base =
    "peer w-full border-0 border-b border-gold/20 bg-transparent px-0 pt-6 pb-2.5 text-[0.9rem] font-light text-cream outline-none transition-colors placeholder:text-transparent focus:border-gold";
  return (
    <div className={`relative ${full ? "sm:col-span-2" : ""}`}>
      {textarea ? (
        <textarea id={id} name={id} rows={5} required={required} placeholder=" " className={`${base} resize-y`} />
      ) : (
        <input id={id} name={id} type={type} required={required} placeholder=" " autoComplete={id === "email" ? "email" : id === "phone" ? "tel" : id === "fname" ? "given-name" : id === "lname" ? "family-name" : "off"} className={base} />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-1 left-0 text-[0.6rem] tracking-[0.25em] text-gold uppercase transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-[0.7rem] peer-placeholder-shown:text-muted peer-focus:top-1 peer-focus:text-[0.6rem] peer-focus:text-gold"
      >
        {label}
      </label>
    </div>
  );
}

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (d.botcheck) return; // honeypot

    const name = `${d.fname ?? ""} ${d.lname ?? ""}`.trim();

    if (!WEB3FORMS_KEY) {
      const body = `${d.message}\n\nFrom: ${name}\nEmail: ${d.email}\nPhone: ${d.phone || "(not given)"}`;
      window.location.href = `mailto:${church.email}?subject=${encodeURIComponent(d.subject || "Website enquiry")}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Website: ${d.subject || "Enquiry"}`,
          from_name: "Lighthouse Daventry website",
          name,
          email: d.email,
          phone: d.phone,
          message: d.message,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="bg-charcoal py-24 sm:py-36">
      <div className="container-site grid gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
        <div className="reveal">
          <p className="label-gold mb-6">Reach Out</p>
          <h2 className="display-title mb-8 text-cream [&_em]:text-gold-lt">
            Get <em>In Touch</em>
            <br />
            With Us
          </h2>
          <p className="mb-12 max-w-md text-[0.85rem] leading-[2] font-light tracking-[0.05em] text-cream/60">
            Whether you have a question, need prayer, or simply want to know more about our community — we would love to hear from you. No inquiry is too
            small. You are always welcome here.
          </p>
          <ul className="space-y-6">
            {[
              { icon: <MapPin className="size-4" />, label: "Location", value: church.shortLocation },
              { icon: <Clock className="size-4" />, label: "Service Times", value: "Sunday 10:00 AM · Tue 7PM · Thu 8PM" },
              { icon: <Mail className="size-4" />, label: "Email", value: church.email, href: `mailto:${church.email}` },
            ].map((c) => (
              <li key={c.label} className="flex items-start gap-4">
                <span className="grid size-10 shrink-0 place-items-center border border-gold/25 text-gold">{c.icon}</span>
                <div>
                  <p className="mb-1 text-[0.62rem] tracking-[0.25em] text-gold uppercase">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className="text-[0.85rem] font-light break-all text-cream/80 hover:text-gold-lt">
                      {c.value}
                    </a>
                  ) : (
                    <p className="text-[0.85rem] font-light text-cream/80">{c.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal" style={{ transitionDelay: "150ms" }}>
          {status === "sent" ? (
            <div className="flex h-full flex-col justify-center border border-gold/15 bg-white/[0.02] p-10">
              <p className="label-gold mb-6">Message Sent ✓</p>
              <h3 className="mb-4 font-display text-4xl font-light text-cream">Thank you for reaching out.</h3>
              <p className="text-[0.85rem] font-light text-muted">We will get back to you as soon as we can.</p>
              <button type="button" onClick={() => setStatus("idle")} className="mt-8 self-start border-b border-gold pb-1 text-[0.66rem] tracking-[0.25em] text-gold uppercase">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              <Field id="fname" label="First Name" required />
              <Field id="lname" label="Last Name" />
              <Field id="email" label="Email Address" type="email" required />
              <Field id="phone" label="Phone (optional)" type="tel" />
              <Field id="subject" label="Subject" full />
              <Field id="message" label="Your Message" textarea required full />
              <label className="hidden" aria-hidden>
                Leave this empty
                <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" />
              </label>
              <div className="sm:col-span-2">
                {status === "error" && (
                  <p role="alert" className="mb-5 border border-red-400/30 bg-red-900/20 px-4 py-3 text-sm text-red-200">
                    Sorry, your message could not be sent. Please try again or email {church.email}.
                  </p>
                )}
                <button type="submit" disabled={status === "sending"} className="btn-gold w-full disabled:opacity-60 sm:w-auto">
                  {status === "sending" ? "Sending…" : "Send Message →"}
                </button>
                <p className="mt-5 text-[0.7rem] font-light text-muted">
                  We only use your details to reply to you. See the{" "}
                  <a href={church.privacyUrl} target="_blank" rel="noreferrer" className="text-gold underline underline-offset-2">
                    Lighthouse Family privacy policy
                  </a>
                  .
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
