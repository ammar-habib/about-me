# Verification and handoff

28 October 2026 · Windows local checkout · portfolio-redesign

## Completed

- Premium dark editorial design across Home, About, Projects, case studies, Experience, Contact, and 404.
- All 32 root project records migrated; 37 content routes statically exported.
- Original screenshots, CV, active social profiles, education, employment records, certification, and recognition retained with source conflicts labeled.
- Responsive category filters, accessible mobile disclosure navigation, keyboard focus, reduced-motion support, restrained Motion reveals, local fonts, and project visit links for checked destinations.
- Unique titles and descriptions, canonicals, Open Graph/Twitter cards, social PNG, Person structured data, sitemap and robots.
- 32 static .html compatibility pages and legacy hash URL support.
- Windows RSC filename workaround verified with 37 byte-identical payload aliases.
- Inactive GitHub Pages workflow template, local instructions, full audit inventories, and release checklist.

## Checks

| Check | Result |
|---|---|
| npm install | Completed; zero reported vulnerabilities |
| npm run dev | Homepage served HTTP 200 on temporary port 3001 |
| npm run lint | Passed |
| npm run typecheck | Passed |
| npm run build | Passed; static export plus compatibility checks |
| npm test | Passed; 37 routes, 32 aliases, 1,221 internal references, screenshots, metadata, CV, sitemap, CNAME, .nojekyll |
| npm run format:check | Passed |
| npm run test:browser | Passed; 42 page/viewport combinations |
| axe | Zero violations on six representative routes using WCAG 2 A/AA, 2.1 A/AA and 2.2 AA tags |
| Browser exceptions and console errors | None |

Viewport widths: 320, 375, 430, 768, 1024, 1440 and 1920 pixels. Routes: Home, About, Projects, Experience, Contact, Dicta case study. Every image on each tested page was decoded. All other project screenshots are also checked as files by the export verifier.

Interaction tests cover category counts and reset, mobile navigation, Escape with focus return, keyboard skip link, reduced motion, .html compatibility navigation, and both old section and project hash URLs. Desktop and mobile screenshots were visually reviewed.

## Final mobile Lighthouse

| Category | Score | Target |
|---|---:|---:|
| Performance | 90 | 90+ |
| Accessibility | 100 | 95+ |
| Best Practices | 100 | 95+ |
| SEO | 100 | 95+ |

LCP 1.5 s; CLS 0.006; total blocking time 400 ms. Lighthouse 13.6.0, simulated mobile, exported homepage served over loopback. A previous run measured 94 performance; the latest run is reported above. These are local lab measurements, not field INP or a complete manual accessibility certification.

Full raw reports and visual captures are in ignored qa-results/. A compact reproducible summary is tracked in qa-summary.json. Run npm run preview before npm run test:browser or npm run test:lighthouse.

## Review before release

Confirm the conflicting award year, resume currency, and missing archive contribution details in migration-inventory.md and release-checklist.md. Rehza, Chefpost and TTB were not present in source and were not invented. Historical references can be obsolete; only checked destinations are promoted to visit links.

The existing Git remote contains an embedded credential; rotate it and use a credential manager before future pushes. No Git authentication operation or remote configuration change was performed.

master and pro were not modified; no push, merge, domain/DNS change, Pages settings change, or deployment occurred. Existing staged and unstaged IDE changes were preserved. The production workflow remains an inert template outside .github/workflows.

## TechMate progression update — 28 October 2026

Ammar confirmed Frontend Developer (May 2018–May 2020), followed by Senior Frontend Developer / Team Lead (June 2020–Present). Shared timelines now show both roles, newest first. The homepage retains Conovo as its third entry; the full Experience timeline includes Technology Wisdom as its fourth entry. Company/role composite keys prevent duplicate React keys.

Validation: lint and TypeScript passed. Browser checks passed on Home and Experience at 375px and 1440px: exact titles/dates, three/four entries, no horizontal overflow, no browser errors or duplicate-key warnings. Timeline screenshots were visually reviewed. Original and public CV SHA-256 hashes remain 48612F880E53A91676D1FAEF1DE6A164FA7B60EA322E768597DAB32676AECB74. No PDF changes or deployment.

## Employment date corrections — 28 October 2026

Ammar confirmed Conovo Technologies — Frontend Developer: August 2016–March 2018; Technology Wisdom — Data Entry Specialist: January 2016–August 2016. Dates only were updated. Role titles, company spelling, descriptions, layout, and both TechMate entries remain unchanged. The resolved employment-date/role-title confirmation notice was removed; historical source differences remain in migration-inventory.md.

Validation: lint and TypeScript passed. Home and Experience were checked at 375px and 1440px for exact dates, retained TechMate periods, role titles, timeline entry counts and horizontal overflow; all passed with no browser errors. The mobile timeline was visually reviewed. Both original and public PDF CV hashes remain 48612F880E53A91676D1FAEF1DE6A164FA7B60EA322E768597DAB32676AECB74. Work remains on portfolio-redesign with no deployment.

## Updated downloadable CV — 28 October 2026

Ammar supplied Ammar_Habib_Senior_Frontend_Developer.pdf. The valid, unencrypted two-page PDF is now served from public/Ammar_Habib_Senior_Frontend_Developer.pdf, and the shared resume URL updates all website CV buttons. The export verifier follows that shared URL. The supplied PDF was not modified; its SHA-256 matches the copied asset: 8C0AE3535E746CF578A853005F9174A5E28D973D562E2033F8E4EEAF1EC1A3C1. Older PDF assets remain retained as archives; previous checks above refer to those historical versions.

Validation: the new PDF returns HTTP 200 with application/pdf and byte-identical content. CV links were checked on Home, About, Projects, Experience and Contact, including a successful browser download using the new filename. No deployment.

## Original testimonials — 28 October 2026

Added the reusable server-rendered In their words section before the final contact CTA: three featured records on Home (Claire Johnson, Christopher Kimmes, Mike loiselle) and all ten on About. Quotes, author names, affiliations and image paths were compared to the original index.html; only whitespace was normalized. Published feedback is sourced from the existing portfolio, without independent verification claims or review schema. Author images retain fixed 46px dimensions and lazy loading.

Validation:
- Lint, TypeScript, formatting and static-export build passed.
- Export verification passed: 37 content routes, 32 legacy page aliases, 37 Windows RSC aliases, 1,234 internal references, metadata, images, active CV, sitemap and domain files.
- Generated HTML contains exactly three testimonial figures on Home and ten on About, before their contact CTA.
- Browser checks passed at 375px, 768px and 1440px on both pages: original text/attribution, expected quote counts, photos decoded, responsive column counts, heading structure and no horizontal overflow. Home uses 1/2/3 columns at those widths; About uses 1/2/2.
- New testimonial sections returned zero axe violations using WCAG 2 A/AA, 2.1 A/AA and 2.2 AA tags; desktop browser console checks were clean. Desktop and mobile captures were visually reviewed; fixed navigation is hidden only during the tall mobile section capture to avoid screenshot overlay artifacts.

No route, public API, dependency, carousel, rating badge or review structured data was added. Work remains on portfolio-redesign; nothing was pushed or deployed. The existing development server remains available at http://localhost:3000/.

## Moving testimonial slider — 28 October 2026

At Ammar's request, the earlier static testimonial grids were replaced with an interactive carousel on Home and About. The original ten source records and three featured homepage records are unchanged. All quotes remain in the generated HTML. A small client island receives the records from the server component; no new package, route, rating or review schema was introduced.

The slider shows two cards at desktop/tablet widths and one on mobile. Native scroll snapping supports touch and horizontal scrolling; arrow controls, keyboard Left/Right/Home/End, desktop position controls and a range indicator provide explicit navigation. Styling uses navy surfaces, restrained cyan accents, rounded cards, larger typography and author photos. Automatic movement runs every six seconds while visible, reversing direction at the ends to avoid long animated jumps. Motion for React animates the progress indicator. Mouse hover and keyboard focus suspend rotation, manual navigation pauses it until Play, and reduced-motion preferences disable automatic movement while retaining instant manual controls. Timers are cleared when the page or carousel is not visible and on unmount. Touch interaction is handled separately from mouse hover so tapping Play works on mobile.

Validation: lint, TypeScript and production static export passed (37 routes, 32 legacy aliases, 37 Windows RSC aliases, 1,236 internal references). Responsive controls/content/image checks passed on Home and About at 375px, 768px and 1440px. Previous/next wrapping, position controls, keyboard navigation, horizontal scrolling, autoplay, hover pause, explicit pause/resume, offscreen pause and reduced-motion behavior passed. Native touch swipe and touch autoplay resume were also checked. The new sections returned zero axe violations; desktop/mobile screenshots were visually reviewed and browser error/hydration checks were clean. Reproducible coverage is available through npm run test:testimonials against the running local server; TEST_BASE_URL can target another local preview.

The development server is left running. All work remains on portfolio-redesign; nothing was pushed or deployed.

## Available project links — 28 October 2026

Expanded the shared visit-link registry from two to twenty projects after checking the original URLs and public destinations. Added accurate labels for seven saved demos and Noisy May's client website. Public/canonical destinations are used for Greenectus and Al Fanar. JavaScript-based Solelinks and Shipm8 sites were checked in a normal browser; no certificate validation was bypassed. Unrelated, parked, missing or unresolved destinations were not promoted, and five failed original reference URLs are now unavailable text rather than clickable links, with historical values retained in project data.

Validation: HTTP/title evidence for every promoted URL; gallery link checks on 32 cards at 375px and 1440px; case-study header/reference checks on all 32 project routes; lint and TypeScript passed. Production export passed with 37 routes, 32 compatibility pages, 37 Windows RSC aliases, 1,236 internal references and all expected assets. Details and per-project decisions are in project-links.md. No push, deployment or domain change.

## Homepage selected work update — 28 October 2026

Replaced the homepage's Greenectus selection with EXOsecure and Church Base with Solelinks. Featured flags and display ordering now produce Dicta, EXOsecure, Relevic and Solelinks. Greenectus and Church Base remain in the complete 32-project gallery and keep their original case-study routes.

Lint and TypeScript passed. Home was checked at 375px and 1440px for exact project order, case-study links, loaded images and horizontal overflow; all passed. The gallery still includes all 32 projects, including the two no longer featured. No deployment.
## GitHub Pages release preparation — 28 October 2026

Prepared `.github/workflows/deploy.yml`: development pushes and production pull requests validate; only `pro` can upload and deploy the static export. Added Node 24 selection, current official Pages actions and deployment instructions. No remote push, merge, settings changes or deployment performed.

Removed 242 obsolete legacy source files (46,943,604 bytes) and 65 unreferenced public images (30,830,129 bytes). Both groups were backed up locally and verified against SHA-256 before deletion. See release-cleanup.json and unused-public-assets.json. Required project screenshots, current portrait WebP, ten author photos, PDF downloads, CNAME and public compatibility pages remain. Unrelated IDE changes were preserved. A clean source archive is available locally at `.release/portfolio-github-ready.zip` with dependencies, Git metadata, IDE files, build outputs, backups and environment files excluded.

Validation: lint, TypeScript, formatting and final production export passed. Export verification covered 37 content routes, 32 legacy aliases, 37 Windows RSC aliases and 1,236 internal references. Project and testimonial asset paths also matched exact filename case for Linux. Workflow YAML parsed successfully and production branch guards/Pages permissions were checked locally; the remote workflow has not been executed. The actual static export on port 3001 passed 42 responsive page checks (320–1920px), six route accessibility audits with no violations, image loading, navigation, filters, keyboard, reduced motion and legacy address checks, with no browser errors. The development server remains on port 3000.
The static-export testimonial suite also passed on Home and About at 375px, 768px and 1440px: quote/photo integrity, arrows, wrapping, keyboard, pagination, horizontal scroll, autoplay, hover and explicit pause/resume, offscreen pause, reduced motion, native touch swipe, touch resume and section accessibility. No browser errors were recorded.

## Direct deployment from portfolio-redesign — 28 October 2026

Ammar authorized committing, pushing and publishing the redesign directly from `portfolio-redesign` in `ammar-habib/about-me`, without a merge into `pro`. This supersedes earlier deployment preparation instructions. Workflow push triggers and build/upload/deploy guards now permit only `portfolio-redesign`. Current README and release checklist document this release path.

Before release: lint, TypeScript, formatting, workflow YAML/branch guards, source credential-pattern scan and production export passed. The export verifies 37 content routes, 32 legacy aliases, 37 Windows RSC aliases and 1,236 internal references. Existing static-export browser and testimonial QA results are recorded above. Local Git ref `pro` and the remote baseline both point to `795bb503624974690cf7730c6a4393c20a462e6a`; release verification must confirm that remote ref remains unchanged. Publish through GitHub Actions, preserving the existing custom domain, DNS and HTTPS setting. Unrelated IDE changes, local backups and build artifacts must remain outside the release commit.
