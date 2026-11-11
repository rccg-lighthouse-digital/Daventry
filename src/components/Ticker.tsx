import { tickerItems } from "../data/site";

/** Gold strip with the weekly times scrolling past. */
export default function Ticker() {
  const row = [...tickerItems, ...tickerItems];
  return (
    <div className="overflow-hidden bg-gold" aria-label={tickerItems.join(". ")}>
      <div className="flex w-max animate-ticker py-[18px]" aria-hidden>
        {[...row, ...row].map((t, i) => (
          <span key={i} className="flex items-center gap-8 pr-8 text-[0.68rem] tracking-[0.3em] whitespace-nowrap text-charcoal uppercase">
            {t}
            <span className="size-1 rotate-45 bg-charcoal/50" />
          </span>
        ))}
      </div>
    </div>
  );
}
