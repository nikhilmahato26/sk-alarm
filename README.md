# SK Fire Protection website

Single-page marketing site for SK Fire Protection, Ludhiana. Built with React 19, Vite, TypeScript, Tailwind CSS v4, Motion (Framer Motion), Lucide, React Router, React Hook Form + Zod and React Helmet Async.

```bash
npm install
npm run dev      # local development
npm run build    # type-check and production build to dist/
npm run preview  # serve the production build
```

## Editing business details

All contact details live in `src/config/business.ts`: phone, WhatsApp number, email, address, GSTIN, owners and services. Change them there and every section, the footer, the enquiry messages and the structured data update together.

Service copy, scope lists and images are in `src/data/services.ts`.

## Items to confirm with the business

- **Email.** `director@skfireprotection.online` is the only email shown, used for every mailto link and the enquiry fallback.
- **WhatsApp.** Every WhatsApp button and the enquiry form send to 96463-96707 (`919646396707`). Calls still go to 98152-62757.
- **Logo.** No logo file was supplied, so a temporary "SK FIRE PROTECTION" wordmark is used (`src/components/ui/Logo.tsx`). Put the real logo in `src/assets/logo/`, import it in `business.ts` and set `logoSrc`. Also replace `public/favicon.svg`.
- **Domain.** Set `siteUrl` once the live domain is known (enables canonical and Open Graph URLs).
- **Company profile facts.** The 10+ years of field work, 12+ completed projects, 2023 main-contractor registration, GSTIN, owner roles and phone numbers, electrical contracting scope and the 4-step project process come from the company profile PDF. The profile's "100% code compliance" claim was left out on purpose: the site does not make compliance guarantees.

## How enquiries work

There is no backend. The enquiry form validates input, builds a WhatsApp message and opens `wa.me` in a new tab. Nothing is stored. The confirmation screen also offers email (with the message pre-filled) and phone as fallbacks.

## Our Work gallery

The "Our work on site" section shows real SK Fire Protection site photos. Originals are in `src/assets/site/` (WhatsApp exports). Optimised copies live in `src/assets/work/` as `work-NN.webp` (full size, used in the photo viewer) and `work-NN-thumb.webp` (grid). Alt text and filter category for each photo are in `src/data/work.ts`. To add a photo, export both sizes with the next number and add a line to that file.

## Owner photos

Each owner in `business.ts` accepts an optional `photo`. Put the portrait in `src/assets/team/`, import it in `business.ts` and set `photo` on that person; the Contact section then shows it instead of the placeholder icon.

## Images

Apart from the Our Work gallery, the photographs are CC0 (public domain dedication) from the WordPress Photo Directory and Wikimedia Commons. They are generic illustrations, not SK Fire Protection projects, and the footer says so.

| File | Source |
| --- | --- |
| hero-hydrant-portrait.webp | https://pd.w.org/2024/11/854672f125ca2c6a8.19630609-2048x1542.jpg (cropped) |
| hydrant-hose-reel.webp | https://pd.w.org/2025/08/20368a2e0ad345295.04009273-1536x2048.jpg |
| hydrant-hose-cabinet.webp | https://pd.w.org/2025/09/66168ba9c1387e091.04072572-1536x2048.jpeg |
| sprinkler-head.webp | https://commons.wikimedia.org/wiki/File:Fusable_link_sprinkler_head.jpg |
| sprinkler-ceiling.webp | https://commons.wikimedia.org/wiki/File:Stretched_ceiling_with_fire_sprinklers_(01).jpg |
| alarm-call-point.webp | https://pd.w.org/2025/09/77168db8cb6bf2465.28877282-2048x1536.jpg |
| alarm-control-panel.webp | https://commons.wikimedia.org/wiki/File:Prodex_Firescape_Fire_alarm_panel_made_by_Hedengren_security.jpg |
| smoke-detector.webp | https://commons.wikimedia.org/wiki/File:Smoke_detector_IP_212-06_(foto05).jpg |
| corridor-smoke-detector.webp | https://pd.w.org/2026/01/7676960c53b2d48a4.32419434-1536x2048.jpg |
| maintenance-extinguisher.webp | https://pd.w.org/2026/05/5086a1b201fe3c6e2.57431845-1536x2048.jpg |
| maintenance-cabinet.webp | https://pd.w.org/2023/04/491644ef0094a25a4.30511959-1536x2048.jpg |

Replace them with real SK Fire Protection site photos when available, keeping the same file names.
