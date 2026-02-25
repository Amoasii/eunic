# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static bilingual (RU/RO) website for **Eunic Invest** — renovation company in Moldova.
Pure HTML/CSS/JS, no build tools or frameworks. Hosted on GitHub Pages at **eunic.md**.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`:
- Dark theme → root (`eunic.md/`)
- Light theme → `/light` (`eunic.md/light`)
- Bold theme → `/bold` (`eunic.md/bold`)
- Minimal theme → `/minimal` (`eunic.md/minimal`)
- Images copied to `_site/images/`, paths fixed via `sed` (dark only — light/bold/minimal use `../images/` which resolves correctly from subdirs)
- CNAME set to `eunic.md`

## Architecture

```
sites/
├── dark/    # Dark theme (default, deployed to root)
├── light/   # Light theme (deployed to /light)
├── bold/    # Bold theme (deployed to /bold) — Electric Indigo + Acid Lime, mobile-first
├── minimal/ # Minimal theme (deployed to /minimal) — Warm editorial, Teal + serif
└── images/  # Shared images (hero-bg.jpg, about.jpg, collage/collage-1..18.jpg)
```

Each theme has `index.html`, `style.css`, `script.js` — same bilingual content, different UX/UI.

### Bilingual system

All translatable text uses paired spans:
```html
<span class="ru">Русский</span><span class="ro">Română</span>
```

CSS toggles visibility:
```css
html.lang-ru .ro { display: none; }
html.lang-ro .ru { display: none; }
```

HTML attributes (alt, aria-label, title) use `data-ru-*` / `data-ro-*` and are updated by JS.
Language preference persisted in `localStorage`. Default: Russian.

### CSS variables

Dark: `--bg: #020617`, `--text: #fff`
Light: `--bg: #ffffff`, `--text: #0f172a`
Bold: `--bg: #0a0a0a`, `--primary: #475569` (slate), `--accent: #94a3b8` (light slate)
Minimal: `--bg: #faf9f6` (warm off-white), `--primary: #0d9488` (teal), `--surface: #f5f0eb`
Dark/Light shared: `--primary: #f97316`, fonts Montserrat + Open Sans.
Bold: fonts Space Grotesk (headings) + Inter (body).
Minimal: fonts DM Serif Display (headings, serif) + DM Sans (body).

Responsive breakpoints: 640px, 768px, 1024px.

### JavaScript (script.js)

Dark/Light themes share the same JS logic:
1. **Language switcher** — `setLang(lang)` toggles classes, updates meta/title/attributes
2. **Scroll reveal** — IntersectionObserver on `.reveal` elements
3. **Sticky header** — adds `.scrolled` class after 50px scroll
4. **Mobile menu** — hamburger toggle with ARIA
5. **Carousel** — drag/swipe portfolio gallery with dots and prev/next buttons

Bold theme JS differs:
- No carousel — uses masonry grid + fullscreen **lightbox** (prev/next, keyboard, touch swipe)
- **Fullscreen mobile menu overlay** (not dropdown)
- **Hero line-by-line reveal** animation
- **Cursor glow** on service cards (desktop only)
- Enhanced scroll reveal with CSS `--delay` stagger

Minimal theme JS differs:
- No sticky header, hamburger, carousel, lightbox, or cursor glow
- **Side dot nav** (desktop) + **bottom tab bar** (mobile) — scroll-linked via IntersectionObserver
- **Accordion** for services (single-open, `grid-template-rows` animation)
- **Slideshow** with fade transitions, counter, thumbnail strip, swipe, keyboard
- **Contact tabs** (`role="tablist"`) toggling info/map panels
- Scroll reveal via `clip-path: inset()`

### Key gotcha

`.hero-title span { color: var(--primary); }` colors ALL spans orange. Language spans inside hero title need `style="color:inherit"` to override.

## When editing content

Changes must be applied to **all four** theme files: `sites/dark/index.html`, `sites/light/index.html`, `sites/bold/index.html`, and `sites/minimal/index.html`. Each theme has different HTML structures (bold has masonry portfolio instead of carousel, fullscreen mobile menu, split hero layout, minimal bar footer; minimal has accordion services, slideshow portfolio, tabbed contacts, side-dot/bottom-tab nav, single-line footer).
