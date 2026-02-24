# LASIGE Project Site Template

Single-page website template for LASIGE research projects. Built with [Astro 5](https://astro.build/) and [Tailwind CSS 4](https://tailwindcss.com/).

## Quick Start

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # generates dist/
```

## How to Customize

Everything you need to edit is at the project root — no need to touch `src/`.

### 1. Project settings (`site-config.yaml`)

Edit this file to configure:

- **Project name, tagline and description** (`project`)
- **Colors** (`colors`) — all values are CSS colors (hex, rgb, hsl)
- **Navigation logo** (`navigation.logo`)
- **Hero banner** (`hero`) — title, subtitle, logo, background image, CTA button, optional secondary CTA
- **Deliverables section** (`deliverables`) — title, position, layout (`grid` or `timeline`)
- **Gallery section** (`gallery`) — title, position, style (`grid` or `carousel`)
- **Team section** (`team`) — title, position
- **Funding section** (`funding`) — title, position
- **Stats counters** (`stats`) — animated number counters with optional prefix/suffix
- **Recruitment section** (`recruitment`) — inline form for study participant sign-ups
- **Presentation mode** (`presentation`) — per-section timing for the P key slideshow
- **Open Graph image** (`og`) — custom background color and logo for social previews
- **Section ordering** (`sectionOrder`) — centralised ordering of all sections
- **Footer** (`footer`) — institution logo, contact email, social links, copyright

### 2. Content sections (`content/sections/`)

Each `.md` file in this folder becomes a section on the page, **automatically**.

Create a new file (e.g. `publications.md`):

```markdown
---
title: "Publications"
navLabel: "Publications"    # label in the navbar (optional, defaults to title)
order: 30                   # position on the page (lower = higher)
background: "surface"       # "surface" (grey) or "default" (white)
---

Your content here, with full **Markdown** support.
```

### 3. Deliverables (`content/deliverables/`)

Each `.md` file = one deliverable. Create a file per deliverable (e.g. `d1-1.md`):

```markdown
---
title: "D1.1 — Project Report"
type: "report"              # publication | software | dataset | report | other
date: "2025-06"             # optional delivery date
url: "https://example.com"  # optional link (clicking the card opens this URL)
image: "/images/d1-1.png"   # optional thumbnail image
order: 1
---

Optional longer description — shown in a popup when the card is clicked (only if no `url` is set).
```

Available types: `publication`, `software`, `dataset`, `report`, `other`.

**Layouts** — set `deliverables.layout` in `site-config.yaml`:

| Value | Description |
|-------|-------------|
| `grid` (default) | Responsive card grid with lightbox popups |
| `timeline` | Horizontal scrollable timeline, alternating cards above/below the axis |

The Deliverables section only appears if there are files in `content/deliverables/`.

### 4. Gallery (`public/images/gallery/`)

Place images (`.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.avif`) in `public/images/gallery/` and they will appear **automatically**.

**Styles** — set `gallery.style` in `site-config.yaml`:

| Value | Description |
|-------|-------------|
| `carousel` (default) | Full-width fade carousel with autoplay and prev/next buttons |
| `grid` | Responsive image grid; clicking any image opens a full-screen lightbox with keyboard navigation |

The Gallery section only appears if there are images in the folder. Remove all images to hide it.

### 5. Team members (`content/team/`)

Each `.md` file = one team member. Create a file per person (e.g. `jane-doe.md`):

```markdown
---
name: "Jane Doe"
role: "Principal Investigator"
photo: "/images/team/jane.jpg"
institution: "LASIGE, FCUL"
order: 1
links:
  email: "jane@example.com"
  website: "https://example.com"
  orcid: "https://orcid.org/0000-0000-0000-0000"
  scholar: "https://scholar.google.com/citations?user=XXXXXX"
---
```

The Team section only appears if there are files in `content/team/`.

### 6. Funders (`content/funders/`)

Each `.md` file = one funder. Create a file per entity (e.g. `fct.md`):

```markdown
---
name: "FCT"
logo: "/images/funders/fct.png"
url: "https://www.fct.pt"
grant: "PTDC/XXX/XXX/2024"
order: 1
---
```

The Funding section only appears if there are files in `content/funders/`.

### 7. Stats counters

Add animated number counters to your site by enabling the `stats` block in `site-config.yaml`:

```yaml
stats:
  title: "By the Numbers"   # optional section heading
  order: 25
  items:
    - value: 12
      label: "Researchers"
    - value: 5
      label: "Publications"
    - value: 3
      label: "Years"
      suffix: "+"
    - value: 100
      label: "Funded"
      prefix: "€"
      suffix: "k"
```

Counters animate with an ease-out curve when they scroll into view. Respects `prefers-reduced-motion`.

### 8. Recruitment section

Add a participant sign-up form directly on the page:

```yaml
recruitment:
  title: "Participate in Our Study"
  description: "We are looking for participants..."
  order: 85
  endpoint: "https://formspree.io/f/YOUR_FORM_ID"
  successMessage: "Thank you! We'll be in touch."
  fields:
    - name: "name"
      label: "Name"
      type: "text"
      required: true
    - name: "email"
      label: "Email"
      type: "email"
      required: true
    - name: "availability"
      label: "Availability"
      type: "textarea"
      required: false
```

Supported field types: `text`, `email`, `number`, `tel`, `textarea`.

Add a secondary hero button that links to this section:

```yaml
hero:
  secondaryCta:
    label: "Join Our Study"
    href: "#recruitment"
```

### 9. Presentation mode (P key)

Press **P** on any page to enter a fullscreen auto-advancing slideshow of all sections.

- **Arrow keys** — navigate manually while in presentation mode
- **Escape** — exit presentation mode
- Press **P** again to exit

Configure per-section timing in `site-config.yaml`:

```yaml
presentation:
  defaultInterval: 10       # seconds per section (default: 5)
  intervals:
    hero: 5
    about: 15
    deliverables: 20
    gallery: 10
```

The section id matches the `id` attribute of the `<section>` element (filename without `.md` for content sections, or the built-in names: `hero`, `deliverables`, `gallery`, `stats`, `team`, `funding`, `recruitment`).

### 10. Open Graph image

A `/og-image.png` (1200×630 px) is generated at build time for social sharing previews. Customize it in `site-config.yaml`:

```yaml
og:
  bgColor: "#1a5276"        # defaults to colors.primary
  logo: "/images/logo.png"  # optional logo overlaid on the image
```

The image automatically uses your project name, tagline, and accent color stripe.

### 11. Section ordering (`sectionOrder`)

Control the order of **all** sections from a single place in `site-config.yaml`:

```yaml
sectionOrder:
  - about
  - objectives
  - stats
  - deliverables
  - gallery
  - recruitment
  - team
  - funding
```

Built-in section ids: `hero`, `deliverables`, `gallery`, `stats`, `team`, `funding`, `recruitment`. Content sections use the filename without `.md`.

### 12. Contact form (`contact`)

A floating button opens a contact popup. Configure it in `site-config.yaml`:

```yaml
contact:
  title: "Contact Us"
  endpoint: "https://formspree.io/f/YOUR_FORM_ID"
  buttonLabel: "Contact"
  successMessage: "Thank you! We'll get back to you soon."
```

The form submits to [Formspree](https://formspree.io) (or any compatible service). Remove or comment out the `contact` block to disable it entirely.

### 13. Images (`public/images/`)

Place all images in `public/images/` and reference them by path:

```
public/images/
  logo.png              # navigation logo
  project-logo.png      # hero section logo
  hero-bg.jpg           # hero background (optional)
  lasige-logo.png       # footer institution logo
  team/                 # team member photos
  funders/              # funder logos
  gallery/              # gallery images (auto-detected)
```

### 14. Colors

Edit the `colors` block in `site-config.yaml`:

```yaml
colors:
  primary: "#1a5276"      # navbar, headings, buttons
  secondary: "#2980b9"    # secondary accents
  accent: "#e74c3c"       # CTA buttons, highlights, links
  background: "#ffffff"   # page background
  surface: "#f8f9fa"      # alternating section backgrounds
  text: "#1f2937"         # body text
  textLight: "#6b7280"    # muted/secondary text
```

## Multilingual support

Duplicate content into language-specific subfolders:

```
content/
  en/
    sections/about.md
    team/jane.md
  pt/
    sections/about.md
    team/jane.md
```

Add the language to `site-config.yaml` under `i18n` with translated labels and section config overrides.

## Project Structure

```
site-config.yaml         # Central configuration
content/
  en/                    # English content
    sections/            # Markdown sections (auto-added to page)
    deliverables/        # Deliverables (one .md per item)
    team/                # Team members (one .md per person)
    funders/             # Funders (one .md per entity)
  pt/                    # Portuguese content (optional)
src/                     # Source code (no need to touch)
public/
  images/                # All project images
    gallery/             # Gallery images (auto-detected)
```

## Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Build to `./dist/` |
| `npm run preview` | Preview build locally |

## Keyboard shortcuts

| Key | Action |
|-----|--------|
| `P` | Toggle fullscreen presentation mode |
| `↑` / `↓` | Jump between sections (when not in presentation mode) |
| `←` / `→` | Navigate sections in presentation mode |
| `Escape` | Exit presentation mode |
