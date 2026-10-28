# Ammar Habib — portfolio

Next.js, React and TypeScript portfolio, exported as a static website for GitHub Pages. Production URL: https://ammarhabib.me.

## Run locally

Use Node.js 24 LTS (also specified in `.nvmrc`).

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

## Production checks

```sh
npm run lint
npm run typecheck
npm run format:check
npm run build
```

The build creates `out/`, prepares Windows-compatible static navigation payloads, and verifies all 37 content routes, 32 old project URLs, images, metadata, sitemap and CV links. Deploy only the generated `out/` directory. No Node server, database, paid hosting or environment secrets are required in production.

To preview the production export while the development server remains running, use PowerShell:

```powershell
$env:PORT = '3001'
npm run preview
```

In another terminal:

```powershell
$env:TEST_BASE_URL = 'http://127.0.0.1:3001'
npm run test:browser
npm run test:testimonials
```

Browser tests require installed Google Chrome. Results are saved in ignored `qa-results/`.

## GitHub Pages deployment

The workflow at `.github/workflows/deploy.yml` builds and deploys directly from `portfolio-redesign`, on pushes or manual runs selecting that branch. Other branches cannot deploy through this workflow. No pull request or merge into `pro` is required.

1. Use the existing public repository `ammar-habib/about-me` for free GitHub Pages hosting.
2. In **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.
3. Keep the custom domain **ammarhabib.me** configured. `public/CNAME` preserves it in the export. Retain the existing DNS records and HTTPS setting.
4. Allow `portfolio-redesign` in the `github-pages` environment deployment branch rules. Retain unrelated environment protections.
5. Commit the prepared files on `portfolio-redesign` and push that branch. Review deletions before committing; keep unrelated `.idea/` and `*.iml` changes out of the commit.
6. Monitor the workflow's validation, build and deployment jobs. The deployment job reports the published URL.
7. Check the live homepage, project links, mobile menu, About portrait, testimonials and CV download.

This configuration uses root-relative asset paths for the existing custom domain. A project URL such as `username.github.io/repository/` would require a separate base-path migration; do not remove the custom domain and expect that subdirectory URL to work unchanged.

The release process publishes only `portfolio-redesign` and leaves `pro` unchanged. See [GitHub's workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Project structure

- `src/app/`: pages, case-study routes, layout, styles and sitemap.
- `src/components/`: shared UI, project gallery and accessible testimonial slider.
- `src/data/`: project content, verified links, experience and testimonials.
- `public/`: website images, current and archived CVs, icons, CNAME and old `.html` compatibility pages.
- `scripts/`: static export preparation, verification, local preview and QA.
- `docs/`: historical migration evidence, source discrepancies and QA records.

Edit content in `src/data/`. Old one-time migration scripts and unused legacy source folders were removed; they must not regenerate or overwrite the reviewed content. Cleanup details are in `docs/release-cleanup.json` and `docs/unused-public-assets.json`. Unused public images and earlier portrait versions are backed up in `.local-archive/unused-public-assets.zip`. A checksum-verified backup of removed sources, including the original supplied portrait, is retained locally in `.local-archive/legacy-before-release.zip`; it is ignored by Git and is not published. Existing Git history also retains previously committed legacy files.

The optimized portrait, all project screenshots, all ten original client testimonials and the supplied PDF CV are preserved. Original `.html` project addresses continue to resolve through the public compatibility pages.
