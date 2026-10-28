# Production release checklist

Prepared on 28 October 2026. Development and deployment branch: `portfolio-redesign`. Leave `pro` unchanged.

- Review `docs/release-cleanup.json` and the Git diff. Removed legacy source has a checksum-verified local backup; unrelated IDE changes remain untouched.
- Run lint, typecheck, format checks and the production build. Preview the generated `out/` output and run responsive browser checks against it.
- Commit the prepared source, lockfile, public assets and `.github/workflows/deploy.yml` on `portfolio-redesign`, excluding unrelated IDE changes. Do not commit `.local-archive`, node_modules, .next, out, QA screenshots or credentials.
- Push `portfolio-redesign` directly and review the validation, build and deployment jobs. No pull request or merge is required.
- Set Pages source to GitHub Actions and retain the existing custom domain `ammarhabib.me`. Check the github-pages environment allows deployment from `portfolio-redesign`.
- The workflow deploys only `portfolio-redesign` on push or manual runs. No personal access token is needed by the workflow.
- Verify HTTPS, navigation, all project screenshots, CV download, testimonials, old project URLs, metadata and mobile layouts after publication.
- Retain the previous production revision for rollback. Never force-push or rewrite history.

## Content reference

TechMate progression, Conovo and Technology Wisdom dates, and Lahore, Pakistan locations were confirmed by Ammar. The supplied `Ammar_Habib_Senior_Frontend_Developer.pdf` is the current download, preserved byte-for-byte. Older PDFs remain archived.

Historical source discrepancies remain in the migration and QA documents as reference. Their earlier statements about keeping legacy folders or an inactive workflow were true at the time and are superseded by this release preparation and the current README. Rehza, Chefpost and TTB still need case-study details and screenshots before they can be added as projects. Unverified performance percentages and audience counts remain omitted.
