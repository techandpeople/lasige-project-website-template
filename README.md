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

### 1. Project settings (`site.yaml`)

Edit this file to configure:

- **Project name, tagline and description** (`project`)
- **Colors** (`colors`) — all values are CSS colors (hex, rgb, hsl)
- **Navigation logo** (`navigation.logo`)
- **Hero banner** (`hero`) — title, subtitle, logo, background image, CTA button
- **Deliverables section title and position** (`deliverables`) — optional
- **Gallery section title and position** (`gallery`) — optional
- **Team section title and position** (`team`) — optional
- **Funding section title and description** (`funding`) — optional
- **Section ordering** (`sectionOrder`) — optional, centralised ordering
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
url: "https://example.com"  # optional link
order: 1
---
```

The Deliverables section only appears if there are files in `content/deliverables/`. Delete all files to hide it.

Available types: `publication`, `software`, `dataset`, `report`, `other`.

### 4. Gallery (`public/images/gallery/`)

Place images (`.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.avif`) in `public/images/gallery/` and they will appear **automatically** in a slideshow with navigation arrows and autoplay.

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

The Team section only appears if there are files in `content/team/`. Delete all files to hide it.

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

The Funding section only appears if there are files in `content/funders/`. Delete all files to hide it.

### 7. Section ordering (`sectionOrder`)

Control the order of **all** sections from a single place in `site.yaml`:

```yaml
sectionOrder:
  about: 10
  objectives: 20
  deliverables: 30
  gallery: 80
  team: 90
  funding: 95
```

The key is the section id (filename without `.md` extension, or the built-in name: `deliverables`, `gallery`, `team`, `funding`). Lower values appear first. This overrides the `order` field in individual section frontmatter and section configs.

### 8. Contact form (`contact`)

A floating button opens a contact popup. Configure it in `site.yaml`:

```yaml
contact:
  title: "Contact Us"
  endpoint: "https://formspree.io/f/YOUR_FORM_ID"
  buttonLabel: "Contact"
  successMessage: "Thank you! We'll get back to you soon."
```

The form submits to [Formspree](https://formspree.io) (or any compatible service). Remove or comment out the `contact` block to disable it entirely.

### 9. Images (`public/images/`)

Place all images in `public/images/` and reference them by path:

```
public/images/
  logo.png              # navigation logo
  project-logo.png      # hero section logo
  hero-bg.jpg           # hero background (optional)
  lasige-logo.png       # footer institution logo
  team/                 # team member photos
  funders/              # funder logos
```

### 10. Colors

Edit the `colors` block in `site.yaml`:

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

## Project Structure

```
site.yaml                # Central configuration
content/
  sections/              # Markdown sections (auto-added to page)
    about.md
    objectives.md
  deliverables/          # Deliverables (one .md per item)
    example.md
  team/                  # Team members (one .md per person)
    pi.md
  funders/               # Funders (one .md per entity)
    funder.md
src/                     # Source code (no need to touch)
public/
  images/                # All project images
    gallery/             # Gallery images (auto-detected slideshow)
```

## Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Build to `./dist/` |
| `npm run preview` | Preview build locally |
