# ForinApps — Tailwind + Framer Motion + React Router

A multi-page React clone of the codebudee.com layout, rebranded as **ForinApps**
and rebuilt with:

- **Tailwind CSS** for all styling (orange theme, no plain CSS files)
- **Framer Motion** for scroll-reveal, stagger, tab, and page-load animations
- **React Router v6** for real client-side navigation across separate pages
- **lucide-react** for icons

No copied brand assets — the original site's real company logos and portfolio
photos are trademarked/copyrighted, so those are replaced with text badges and
gradient placeholder cards. Everything else (layout, structure, copy, sections,
UI) mirrors the original.

## Pages / Routing

| Route                      | Page                                   |
|-----------------------------|-----------------------------------------|
| `/`                          | Home — hero, trusted-by, services, portfolio preview, process, why-us, FAQ, CTA |
| `/services/:slug`            | Service detail (mobile-app-development, web-app-development, website-development) |
| `/our-work`                  | Full portfolio grid with category filter |
| `/about-us`                  | Stats, values, why-choose-us, process |
| `/blogs`                     | Blog listing grid |
| `/blogs/:slug`                | Individual blog post |
| `/contact-us`                | Contact form (client-side demo, wire to your backend) |
| `*`                           | 404 page |

Routing lives in `src/App.jsx`. Page transitions use `AnimatePresence` keyed
by `location.pathname`, and `src/components/ScrollToTop.jsx` resets scroll
position on every route change (React Router doesn't do this by default).

## Folder structure

```
forinapps/
├── index.html
├── tailwind.config.js       # orange color scale, fonts, shadows, marquee keyframes
├── postcss.config.js
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx              # BrowserRouter mount
    ├── App.jsx                # <Routes> definitions + page transitions
    ├── index.css              # @tailwind directives + a few reusable utility classes
    ├── layouts/
    │   └── MainLayout.jsx      # Navbar + <Outlet /> + Footer, shared across all pages
    ├── data/                   # content lives here, not hardcoded in components
    │   ├── services.js
    │   ├── portfolio.js
    │   ├── process.js
    │   ├── faqs.js
    │   └── blogs.js
    ├── lib/
    │   └── motion.js             # ALL Framer Motion variants defined once (fadeUp, staggerItem, etc.) — every component imports from here instead of redefining animation objects inline
    ├── components/
    │   ├── ui/                    # small, generic, reused-everywhere primitives
    │   │   ├── Logo.jsx            # the ONE place the brand mark is defined — Navbar + Footer both import this
    │   │   ├── Button.jsx          # the ONE button component — owns the shared hover animation (lift + icon slide) for every CTA on the site
    │   │   └── SectionHeading.jsx  # the "eyebrow + big title + optional paragraph" pattern repeated on every section
    │   ├── Navbar.jsx           # router-aware mega menu + mobile drawer
    │   ├── Footer.jsx
    │   ├── Hero.jsx              # real autoplaying <video> showreel, not a static thumbnail
    │   ├── TrustedBy.jsx        # CSS marquee (Tailwind keyframes)
    │   ├── ServicesGrid.jsx
    │   ├── HomePortfolio.jsx    # large centered "Our Portfolio" text overlaid on the image grid, matching codebudee.com
    │   ├── PortfolioGrid.jsx     # reused on Home + Our Work page — real images (Picsum), lazy-loaded
    │   ├── ProcessSteps.jsx      # animated tab switcher
    │   ├── WhyChooseUs.jsx
    │   ├── FaqAccordion.jsx
    │   ├── CTA.jsx
    │   ├── PageHero.jsx          # shared banner for every inner page
    │   ├── FadeIn.jsx            # scroll-reveal wrapper, reads variants from lib/motion.js
    │   ├── Stagger.jsx           # stagger-children wrapper, reads variants from lib/motion.js
    │   └── ScrollToTop.jsx
    └── pages/
        ├── Home.jsx
        ├── ServiceDetail.jsx
        ├── OurWork.jsx
        ├── AboutUs.jsx
        ├── Blogs.jsx
        ├── BlogDetail.jsx
        ├── ContactUs.jsx
        └── NotFound.jsx
```

## Run it

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Theme

Every color, font, radius, and shadow used lives in `tailwind.config.js` under
`theme.extend`. Change `colors.primary` there to re-theme the whole site
instantly — every component reads from `primary-50` → `primary-900`, never a
hardcoded hex.

Fonts: **Plus Jakarta Sans** (display/headings) + **Inter** (body), loaded via
Google Fonts in `index.html`.

## Animation approach

- `FadeIn` — fade + slide up on scroll into view, used for section intros
- `Stagger` / `staggerItem` — staggers a list of cards/features in one after another
- `ProcessSteps` and `ContactUs` form use `AnimatePresence` for tab/step and
  success-state transitions
- Page-to-page navigation fades via `AnimatePresence` in `App.jsx`
- `prefers-reduced-motion` is respected globally in `index.css`

## Notes

- **Logo**: defined once in `src/components/ui/Logo.jsx` (currently a Picsum
  placeholder image). Swap the `src` there — or drop your real logo file into
  `public/` and point `src` at it — and it updates everywhere (Navbar, Footer)
  since both import the same component.
- **Images**: portfolio, blog, and service images use [Picsum](https://picsum.photos)
  (`https://picsum.photos/seed/<name>/<w>/<h>`) — free, license-free placeholder
  photos, seeded so each project/post always gets the same image on reload.
  Swap any `image` / `heroImage` field in `src/data/*.js` for your own asset
  URL or a local import whenever you have real photography.
- **Hero video**: a real `<video autoPlay loop muted playsInline>` element
  (a public-domain sample clip as a stand-in) — swap `src` in `Hero.jsx` for
  your own exported showreel `.mp4`.
- The contact form is a front-end demo (`handleSubmit` in `ContactUs.jsx`) —
  connect it to a real endpoint (Formspree, Resend, your own API) to actually
  send messages.
- Blog posts use placeholder body copy — swap `BlogDetail.jsx`'s content
  source for your CMS or Markdown pipeline when ready.
