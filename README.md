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
- **Team section title and position** (`team`) — optional
- **Funding section title and description** (`funding`) — optional
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

### 3. Team members (`content/team/`)

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

### 4. Funders (`content/funders/`)

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

### 5. Images (`public/images/`)

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

### 6. Colors

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
  team/                  # Team members (one .md per person)
    pi.md
  funders/               # Funders (one .md per entity)
    funder.md
public/
  images/                # All project images
src/                     # Source code (no need to touch)
```

## Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Build to `./dist/` |
| `npm run preview` | Preview build locally |
