# Wanaemi Watson — Interactive Portfolio

This is a small, static, interactive portfolio site you can deploy as a static web app (GitHub Pages, Azure Static Web Apps, Netlify, Vercel).

Quick start (open locally):

PowerShell / Command Prompt:

```bash
# Option 1: open directly
start index.html

# Option 2: serve with Python (recommended for routing-free static serve)
python -m http.server 8000
# then open http://localhost:8000
```

Deployment:

- GitHub Pages: push this repo and enable Pages from main branch root.
- Azure Static Web Apps: create a new static web app in the Azure Portal and point it to the repo root.
- Netlify / Vercel: drag & drop the folder or connect repo, build step not required.

Files added:

- [index.html](index.html) — main page
- [styles.css](styles.css) — styling and theme
- [script.js](script.js) — interactive behaviour (background, proximity lighting, modal)
- [README.md](README.md) — this file

Next steps I can help with:

- Add projects pages and code samples
- Create a deploy workflow (GitHub Actions) to publish automatically
- Replace placeholder certifications with verified credentials and badges
