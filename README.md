# Ace Lane Logistics — Website

Static HTML/CSS/JS site for Ace Lane Logistics, ready to deploy on Netlify with form submissions routed to a Microsoft 365 inbox.

---

## Project structure

```
.
├── index.html              # Home
├── about.html              # About Us
├── services.html           # Services (8 detailed cards)
├── industries.html         # Industries (numbered list 01–06)
├── contact.html            # Standalone "Talk to a specialist" page
├── privacy-policy.html     # Freight-brokerage privacy policy
├── cookie-policy.html      # Cookie policy + table of cookies in use
├── css/
│   ├── tokens.css          # Your design tokens (untouched)
│   └── styles.css          # All component, layout, and responsive styles
├── js/
│   └── main.js             # Nav, accordion, form, cookie banner
├── img/                    # Drop your image assets here (see "Images" below)
│   ├── brand/
│   ├── icons/              # Empty — UI icons are inline SVG
│   └── associations/       # (TIA / ABPL — currently referenced from /img/)
├── netlify.toml            # Build, headers, cache, friendly URLs
└── README.md               # This file
```

Every page loads `css/tokens.css`, `css/styles.css`, and `js/main.js` — no styles or scripts are inlined in the HTML. Update one file, all pages get the change.

---

## Deploying to Netlify

### Option A — Drag & drop (fastest)

1. Sign in to [app.netlify.com](https://app.netlify.com).
2. Drag the project folder onto the "Sites" page.
3. Netlify gives you a live URL in ~10 seconds (e.g. `random-name.netlify.app`).

### Option B — Connect to Git (recommended for ongoing edits)

1. Push the project to a GitHub / GitLab / Bitbucket repository.
2. In Netlify: **Add new site → Import an existing project → choose your repo**.
3. Build settings: leave **Build command** empty, set **Publish directory** to `.` (already configured in `netlify.toml`).
4. Deploy.

### Custom domain

After the first deploy: **Domain settings → Add custom domain → acelanelogistics.com** (or whatever your domain is). Netlify walks you through the DNS steps. SSL is automatic and free.

---

## Form submissions → Microsoft 365 email

The "Talk to a specialist" form uses **Netlify Forms**. It works out of the box, and Netlify forwards every submission to whichever email you configure — including a Microsoft 365 / Outlook inbox.

### Steps

1. Deploy the site once (drag & drop or Git). On the first deploy, Netlify scans the HTML, detects the form, and registers it.
2. In the Netlify dashboard: **Site → Forms**. You should see a form named **`contact`** with submissions starting to come in.
3. Open the form → **Settings & usage → Form notifications → Add notification → Email notification**.
4. Enter your Microsoft 365 address (e.g. `sales@acelanelogistics.com`). Save.
5. Send a test submission from the live site. Check the inbox. If it lands in spam the first time, mark it as "Not junk" so future ones come straight through.

### Notes

- The form submits via `fetch` (AJAX) with a friendly success message — no page reload.
- A honeypot field is included to filter bots. Netlify also offers Akismet/reCAPTCHA in **Form settings** if you start seeing spam.
- The form lives on Home, About, Services, Industries, and Contact. Submissions from all of them land in the same inbox (they share the form name `contact`).

---

## Images — what to drop where

Reference all images at `img/<filename>` from the project root. Image filenames follow the original folder export.

### Root of `/img/`

```
ace-lane-hero.png                         # Home hero background (truck)
about-us-ace-lane-team.jpg                # (optional, not currently used)
services-hero.png                         # Services page hero
industries-hero.png                       # Industries page hero

services-acelane-full-truckload.png
services-acelane-less-than-truckload.png
services-acelane-flatbed.png
services-acelane-temperature-controlled.png
services-acelane-warehousing.png
services-acelane-expedited.png
services-acelane-drayage.png
services-acelane-heavy-haul.png

industries-ace-lane-construction.jpg
industries-ace-lane-food-and-beverage.jpg
industries-ace-lane-gameshow.jpg          # used for "Tradeshow" row
industries-ace-lane-manufacturing.jpg
industries-ace-lane-gaming.jpg
industries-ace-lane-forwarding.jpg

partner-rafael-oliveira-ace-lane.png
partner-geovana-oliveira-ace-lane.png
partner-danny-lopez-ace-lane.png
partner-natalia-queiroz-ace-lane.png

associations-ace-lane-tia.png
associations-ace-lane-abpl.svg
```

### `/img/brand/`

```
ace-lane-logo-white.svg     # Header + footer logo
ace-lane-logo.svg           # (alt color version, not currently used)
ace-lane-favicon.png        # Browser tab favicon
ace-lane-arrow.png          # Decorative arrow (Talk to us, About hero)
ace-lane-arrow-negative.png # Decorative arrow (negative variant)
acelane-icon-positive.png   # (optional)
```

### Performance tip

Compress the images before uploading. Hero PNGs around 5 MB will hurt your scores — run them through [TinyPNG](https://tinypng.com) or convert to WebP/AVIF if you want to optimize further.

---

## What you should review before going live

The site is functional out of the box, but a few items are placeholders or assumptions you should confirm:

1. **Privacy Policy — Section 13.** Replace the bracketed `[Street Address]` and `[ZIP]` with your registered Atlanta business address. Add your MC and DOT numbers to Section 2 if you want them displayed publicly. Have your legal counsel review the full document before publishing.
2. **Cookie Policy — Section 4.** If you add Google Analytics, Meta Pixel, GTM, LinkedIn Insight, or any marketing scripts later, update the cookie table and consider deploying a consent-management platform.
3. **Privacy contact email.** The policy uses `privacy@acelanelogistics.com`. Either create that mailbox/alias or replace it in `privacy-policy.html` and `cookie-policy.html`.
4. **TIA / ABPL links.** Currently `https://www.tianet.org` and `https://abpl.com.br`. Verify those are the correct association URLs you want to point to.
5. **Phone number.** `+1 (404) 921-832` is what was in the design — looks like it might be missing a digit (US numbers are typically 10 digits, this one has 9). Double-check before launch.
6. **The Ace Standard accordion — steps 02–05.** The Figma only showed the expanded panel for **01. Quoting**. Steps 02–05 currently reuse their summary text in the expanded panel. When you're ready, just replace the `<p class="step-summary">` inside each `<div class="step-panel-content">` in `index.html` with the full content (two columns + bottom line) following the same pattern as step 01.
7. **Copyright year.** `© Copyright <span data-current-year>2026</span>` — the year auto-updates each January via `js/main.js`. Nothing to do.

---

## Local preview

No build step. Just serve the folder:

```bash
# Python (any OS with Python 3)
python3 -m http.server 8000

# Node
npx serve .

# Or just open index.html in a browser — most things work,
# but the form's AJAX submit will only succeed once deployed to Netlify.
```

---

## Editing tips

- **Change a color, font size, or spacing globally** → edit `css/tokens.css`. Every page picks it up.
- **Adjust a component** (e.g. the accordion, services cards) → `css/styles.css`. Sections are clearly labeled.
- **Swap copy** → it's plain HTML. Find the page, edit the text, save, redeploy.
- **Add a new service card** to the Home grid → copy any `<a class="service-tile">` block in `index.html`. To add it to the Services page, copy any `<article class="service-card">` block in `services.html` — the styles auto-flow.
- **Mobile menu** opens at ≤1024px. Customize the breakpoint in `css/styles.css` (search for `@media (max-width: 1024px)`).

---

## Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari — last 2 versions). The accordion uses CSS `grid-template-rows: 0fr → 1fr` for smooth height animation, supported in Chrome 117+, Safari 16+, Firefox 124+. Older browsers will still toggle open/closed; they'll just snap instead of animating.

---

## Questions / tweaks

Most edits are one-liner CSS or text changes. If something needs more than that, the structure is intentionally simple: each page is a self-contained HTML file, all the logic lives in one CSS file and one JS file, and there's no build pipeline standing in the way.
