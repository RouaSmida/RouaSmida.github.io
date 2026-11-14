# rouasmida.github.io

[![CI/CD](https://github.com/RouaSmida/RouaSmida.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/RouaSmida/RouaSmida.github.io/actions/workflows/ci.yml)

Personal portfolio of Roua Smida — IT student building toward Cloud & DevOps engineering.
Plain HTML, CSS and JavaScript: no framework and no build step.

## Site structure

```
.
├── index.html               # The whole site (hero, about, experience, projects, skills, education, contact)
├── 404.html                 # Not-found page
├── assets/
│   ├── css/style.css        # Theme tokens (light/dark) and layout
│   ├── js/main.js           # Theme toggle, active nav link, footer year
│   ├── og-image.png         # Link preview image (Open Graph)
│   └── Roua_Smida_CV.pdf    # CV served by the "Download CV" buttons (upload manually)
├── robots.txt
├── sitemap.xml
├── .htmlvalidate.json       # HTML validation rules
├── lychee.toml              # Link checker settings and exclusions
└── .github/workflows/ci.yml # CI/CD pipeline
```

## Pipeline

One workflow, [`.github/workflows/ci.yml`](.github/workflows/ci.yml):

```
push / pull request
        │
        ▼
┌──────────────────────────┐
│ validate                 │
│  • html-validate         │
│  • lychee (link check)   │
└────────────┬─────────────┘
             │ only on push to main
             ▼
┌──────────────────────────┐
│ deploy                   │
│  • configure-pages       │
│  • upload-pages-artifact │
│  • deploy-pages          │
└────────────┬─────────────┘
             ▼
   https://rouasmida.github.io
```

A failed validation blocks the deployment. Only `index.html`, `404.html`, `robots.txt`, `sitemap.xml` and `assets/` are published.

**One-time setup:** in the repository, go to **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**.

## Updating content

Everything is in `index.html`; each section is a `<section id="…">` block.

| To change | Edit |
| --- | --- |
| Hero text, buttons, status panel | `<section class="hero">` |
| An experience entry | an `<li class="entry">` inside `#experience` |
| A project | an `<li class="card">` inside `#projects` (replace the `https://github.com/RouaSmida/TODO` link) |
| Skills | the two `<ul class="tags">` lists inside `#skills` |
| Colours | the tokens at the top of `assets/css/style.css` (light and dark sets) |
| CV | replace `assets/Roua_Smida_CV.pdf` (keep the file name) |

After replacing the placeholders, remove the matching exclusions in `lychee.toml` so those links are checked too, and update `<lastmod>` in `sitemap.xml`.

To preview locally, serve the folder with any static server, for example:

```bash
python3 -m http.server 8000
```
