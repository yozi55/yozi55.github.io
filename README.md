# Personal Portfolio — GitHub Pages

A responsive personal portfolio built with React, TypeScript, Tailwind CSS v4 and Framer Motion.

## 1. Personalize it

Open `src/config.ts` and edit:
- `profile.name`, `role`, `intro`, `location`, `email`
- `profile.about` and `profile.socials`
- `projects` for project titles, descriptions, tags and optional links

The sample project entries are placeholders, not claims about real work. Replace or remove them.

## 2. Run locally

Install Node.js 22 or newer, then run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## 3. Build

```bash
npm run build
```

The production website is generated in `dist/`.

## 4. Deploy with GitHub Pages

The workflow at `.github/workflows/deploy.yml` builds and deploys the site whenever you push to `main`.

1. Create a **public** GitHub repository.
2. Upload the contents of this project (including the hidden `.github` folder) to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **GitHub Actions**.
5. Open the **Actions** tab and wait for the “Deploy to GitHub Pages” workflow to finish.
6. Your site URL will appear in **Settings → Pages**.

## Notes

- `base: './'` in `vite.config.ts` supports both a project site (`username.github.io/repository/`) and a user site.
- GitHub Pages hosts static frontend files. This project does not need PHP, Python, or a database server.
- The contact link uses `mailto:`. Replace the placeholder email before publishing.
- The visual artwork is made with CSS, so no image assets are required.
