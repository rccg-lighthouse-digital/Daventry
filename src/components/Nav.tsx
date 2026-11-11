import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { church, navLinks } from "../data/site";
import { img } from "../lib/img";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const give = church.giveUrl
    ? { href: church.giveUrl, target: "_blank", rel: "noreferrer" }
    : { href: "#give" };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "border-b border-gold/10 bg-charcoal/90 py-3.5 backdrop-blur-md" : "py-6"
      }`}
    >
      <nav className="container-site flex items-center justify-between" aria-label="Main">
        <a href="#" className="flex items-center gap-3.5" onClick={() => setOpen(false)}>
          <img src={img("logo.webp", 200)} alt="" className="size-10 object-contain" />
          <span className="font-display text-[0.95rem] tracking-[0.18em] text-cream uppercase sm:text-[1.05rem]">{church.name}</span>
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative pb-1 text-[0.68rem] tracking-[0.22em] text-cream uppercase transition-colors hover:text-gold-lt"
              >
                {l.label}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
          <li>
            <a {...give} className="inline-block bg-gold px-6 py-2.5 text-[0.65rem] tracking-[0.22em] text-charcoal uppercase transition hover:-translate-y-px hover:bg-gold-lt">
              Give Online
            </a>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid size-11 place-items-center border border-gold/30 text-cream lg:hidden"
        >
          {open ? <X className="size-5" strokeWidth={1.5} /> : <Menu className="size-5" strokeWidth={1.5} />}
        </button>
      </nav>

      <div id="mobile-menu" hidden={!open} className="h-[calc(100dvh-72px)] overflow-y-auto bg-charcoal lg:hidden">
        <ul className="container-site flex flex-col gap-1 py-10">
          {navLinks.map((l, i) => (
            <li key={l.href} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <a href={l.href} onClick={() => setOpen(false)} className="block border-b border-gold/10 py-4 font-display text-4xl font-light text-cream">
                {l.label}
              </a>
            </li>
          ))}
          <li className="mt-8">
            <a {...give} onClick={() => setOpen(false)} className="btn-gold w-full">
              Give Online
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
