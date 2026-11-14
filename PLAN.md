# Plan

Personal portfolio for Roua Smida, served from GitHub Pages via GitHub Actions.

## Constraints
- Plain HTML/CSS/JS, no framework, no build step, system fonts only.
- Light/dark theme (system preference + toggle), responsive, accessible, fast.
- No invented metrics; project links are `https://github.com/RouaSmida/TODO` placeholders.

## Files
| Path | Purpose |
| --- | --- |
| `index.html` | Single page: hero, about, experience (iMaxeam case study + inline SVG diagram), projects, skills, education, contact |
| `404.html` | Not-found page |
| `assets/css/style.css` | Theme tokens and layout |
| `assets/js/main.js` | Theme toggle, active nav link, footer year |
| `assets/og-image.png` | Open Graph preview image |
| `assets/Roua_Smida_CV.pdf` | CV, uploaded manually |
| `sitemap.xml`, `robots.txt` | SEO |
| `.github/workflows/ci.yml` | Validate HTML, check links (lychee), deploy to Pages on `main` |
| `.htmlvalidate.json`, `lychee.toml` | Check configuration |
| `README.md` | Structure, pipeline, how to update content |

## Pipeline
`push` / `pull_request` → validate (html-validate + lychee) → on `main` only: configure-pages → upload-pages-artifact → deploy-pages.
