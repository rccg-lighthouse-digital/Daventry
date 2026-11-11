# RCCG Lighthouse Daventry website

React 19 + TypeScript + Tailwind CSS v4, built with Vite and hosted on Cloudflare Workers (static assets, free plan).
Rebuilt from the expired Squarespace site for rccglighthousedaventry.co.uk. It's a single scrolling page, like the original.

## Get started

```bash
npm install
npm run dev          # http://localhost:5173
```

## Where things live

| What | Where |
|---|---|
| All content (address, email, times, ministries, beliefs, slides, give link, socials) | `src/data/site.ts` |
| Image list (name → Squarespace URL) | `src/data/images.json` |
| Colours, fonts, animations | `@theme` block in `src/index.css` |
| Page sections, in page order | `src/App.tsx` → `src/components/` |
| Cloudflare config | `wrangler.jsonc` |

## Download the images now

The Squarespace subscription has expired, so the images could disappear at any point.

```bash
npm run images                       # saves everything to public/images/
echo "VITE_LOCAL_IMAGES=true" >> .env
```

Commit `public/images/` to the repo.

## Contact form

Same setup as the parent site: add a free [Web3Forms](https://web3forms.com) key to `.env` as `VITE_WEB3FORMS_KEY`.
Without a key, the form opens the visitor's email app with the message filled in.
The old Squarespace form didn't actually send anything; it only changed the button text.

## Deploy to Cloudflare from GitHub

In the Worker's **Settings → Build**:
- **Build command:** `npm run build`
- **Deploy command:** `npx wrangler deploy`

Add `VITE_WEB3FORMS_KEY` and `VITE_LOCAL_IMAGES` under **Build → Variables and secrets** (they're baked in at build time).

## Changes from the original, and things to confirm

- **Email address.** The old site used `info@rccglighthousedaventry.org`, but the domain is `.co.uk`. Check which mailbox exists and update `church.email`.
- **Footer postcode.** The old footer said `NN11 0SG`; everywhere else says `NN11 4GL`. This build uses `NN11 4GL` throughout.
- **About photo.** The old site showed an Unsplash stock photo labelled "Pastor and First Lady". This build uses a real photo from the inaugural service instead. Add a photo of the pastors to `images.json` and point `aboutImage` at it.
- **"Give Online".** The old site had no giving link; the button just scrolled to the "Next Step" section. That still happens until you set `church.giveUrl`.
- **Social links.** The old footer icons all pointed to `#`, and the Squarespace settings still had Squarespace's own demo profiles. They're hidden until you fill in `social` in `site.ts`.
- **Dead links removed:** "Events" and "Sermons" in the footer went nowhere. "Lighthouse Family" now links to the parent site.
- **Map.** The old Leaflet map pinned Daventry town centre, not the church. This uses a Google Maps embed of the actual address, tinted to match the dark theme.
- **Cursor.** The gold trailing ring is kept on desktop, but the normal cursor is no longer hidden. It's off on touch screens and for people who prefer reduced motion.
- **Text contrast.** Body text on dark sections is slightly brighter and heavier than the original's very thin grey text, which was hard to read.
- **Typo.** The slide captions said "Inaugral"; they now say "Inaugural".
- **Privacy.** The contact form links to the Lighthouse Family privacy policy, since Daventry is part of the same charity (1126652). Confirm that's right.
