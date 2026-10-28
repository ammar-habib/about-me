# Source audit and migration inventory

Audit date: 28 October 2026. Source: local repository; live homepage reviewed separately.

## Architecture
One HTML document with hash navigation and AJAX project fragments. jQuery 2.1.3, Bootstrap, Owl Carousel, Shuffle, Masonry, Magnific Popup, custom scrollbars, Modernizr, tilt and validation scripts. No package manager or component architecture. Apache .htaccess rules do not apply on GitHub Pages.

## Complete root page and URL map

| Source | Destination | Content |
|---|---|---|
| index.html | / | Homepage, about, resume, portfolio, contact |
| alfanar.html | /projects/alfanar/ | Al Fanar Restaurant |
| alqen-email.html | /projects/alqen-email/ | Alqen |
| b2b.html | /projects/b2b/ | B2B Leading Page |
| betten-ritter-email.html | /projects/betten-ritter-email/ | Betten Ritter |
| bouwman.html | /projects/bouwman/ | Bouwman Occasions |
| bugbyte.html | /projects/bugbyte/ | BugByte Studios |
| cac.html | /projects/cac/ | Crucial App Concepts |
| churchbase.html | /projects/churchbase/ | Church Base |
| dicta.html | /projects/dicta/ | Dicta |
| engineeringsupplies.html | /projects/engineeringsupplies/ | Engineering supplies |
| eshipsol.html | /projects/eshipsol/ | EshipSol |
| exosecure.html | /projects/exosecure/ | Exosecure |
| fantaztech.html | /projects/fantaztech/ | FanTazTech |
| greenectus.html | /projects/greenectus/ | Greenectus |
| h2u.html | /projects/h2u/ | Happy to you |
| hoppingin.html | /projects/hoppingin/ | Hoppingin |
| leonpublicis.html | /projects/leonpublicis/ | Leon Publicis |
| mash-network.html | /projects/mash-network/ | Mash Network |
| mobilityBusiness-email.html | /projects/mobilitybusiness-email/ | Mobility Business |
| noisymay-email.html | /projects/noisymay-email/ | Noisy May |
| pngp.html | /projects/pngp/ | PNGP |
| portfolio-1.html | /projects/portfolio-1/ | Shipm8 |
| property-360-app.html | /projects/property-360-app/ | Property 360 |
| property-360.html | /projects/property-360/ | Property 360 |
| relevic.html | /projects/relevic/ | Relevic |
| roserevenue.html | /projects/roserevenue/ | Rose Revenue |
| sharp-brains.html | /projects/sharp-brains/ | Sharp Brains |
| shipm8.html | /projects/shipm8/ | Shipm8 |
| shout-out.html | /projects/shout-out/ | Shoutout |
| solelinks.html | /projects/solelinks/ | Solelinks |
| techmatetech.html | /projects/techmatetech/ | Techmatetech |
| termmate.html | /projects/termmate/ | TermMate |

All 32 root project fragments become statically generated case studies. Old .html URLs have canonical-linked meta-refresh fallback pages (not HTTP 301s). Original source files remain untouched for historical reference. Root index.html is replaced only in the generated export. Legacy hash navigation is handled by a small client mapping.

## Asset inventory

See asset-inventory.json for every image, font, CSS, JS and auxiliary demo file, byte sizes and exact duplicates. All source images are preserved under public/images; original CV and favicons copied without modification. Legacy fonts and plugins are retained at repository root but are not loaded by Next.js. No unsupported client logos or testimonials added.

## Content plan

Project descriptions, source technology tags and screenshots retained in typed data. Source tags describe the project stack; they do not establish backend ownership. Responsibilities only appear where source supplies them. Missing challenges, implementation detail and results are explicitly identified in case studies. Rehza, Chefpost and TTB are absent from source and are not invented. Source external destinations remain in project records; do not label them verified live without checking.

Employment: TechMateTech LLC (May 2018–Current in source), Conovo Technologies (Aug 2016–April 2018), Technology Wisdom (June–July 2016). Ammar confirmed the progression on 28 October 2026: Frontend Developer (May 2018–May 2020), then Senior Frontend Developer / Team Lead (June 2020–Present). The UI uses these confirmed entries. Education, certification and awards retained on About/Experience. Source percentage achievements remain in original HTML and require evidence before republication.

## Technical issues

Legacy image alt text is often empty; icon-only controls lack names; AJAX fragments do not provide independent metadata; old fixed layouts and custom scrollbars impair keyboard/mobile use; third-party plugins and redundant font downloads increase payload. Some downloaded .html font files are error pages rather than fonts. Source local missing references are listed in source-link-issues.json. Exact duplicates are recorded in the asset inventory. External availability requires separate checks.

## SEO and architecture

App Router server components render static pages. Client islands handle navigation, project filters and restrained Motion interactions. Routes: /, /about/, /projects/, /projects/[slug]/, /experience/, /contact/. Unique metadata, canonical links, Open Graph, Person JSON-LD, robots and generated sitemap. Root-domain asset paths. No API routes, database, server actions or runtime redirects. output: export; trailingSlash: true; images unoptimized.

## Release safety

Only portfolio-redesign may be edited. Existing IDE changes preserved. No push, merge, domain changes or publication. Deployment template remains outside .github/workflows until approval; restricted to pro even after activation.

## CV cross-check

The original two-page PDF was extracted read-only. It differs from the website in several fields:

| Item | Website | CV |
|---|---|---|
| Conovo period | Aug 2016–Apr 2018 | Aug 2016–Mar 2018 |
| Technology Wisdom period | Jun–Jul 2016 | Jan–Jun 2016 |
| Technology Wisdom role | Data Entry Specialist | Data Entry Operator / Data Analyst |
| Employee of Year | 2020–2021 | 2021–2022 |
| Years in summary | historical site summary | 7+ (user brief explicitly updates to 8+) |

The source discrepancies above are retained as historical audit evidence. Ammar subsequently confirmed Conovo Technologies — Frontend Developer (August 2016–March 2018) and Technology Wisdom — Data Entry Specialist (January 2016–August 2016) on 28 October 2026. The shared timelines use those confirmed dates; the employment-date and role-title confirmation notice is resolved. The original CV stays unchanged and downloadable. CV mentions team leadership and backend interactions; the redesign follows the user's narrower frontend positioning and does not add backend ownership. RadioBase appears only in the CV, with no project page or screenshot; retain that mention in the CV rather than fabricate a case study. CV phone: +92 335 6164660, location Lahore, Punjab; contact page preserves these details. Languages recorded in CV: English and Urdu.

## Additional audit findings

Missing source previews for B2B, Leon Publicis, Crucial App Concepts and the earlier Shipm8 record were matched to existing archive assets by project name. No generated screenshots replace project evidence. Categories were refined from project descriptions: Hoppingin is a web application; Ionic-based apps are mobile projects. WordPress classification follows actual source tags. Greenectus and PNGP contribution copy was condensed without repeating unverified screen-count or delivery-time claims.

The repository remote configuration contains an embedded credential. No network Git operation was performed, and the credential is not reproduced in this report. Rotate the credential and use a credential manager before future pushes; the existing remote configuration was left untouched.

## Verified external links

On 28 October 2026, Dicta (https://dicta.org.il/) and Relevic (https://www.relevic.com/) returned reachable project sites. Those two records receive visit links, without claiming that their current designs match the archived screenshots. Church Base and Greenectus could not be verified through the web tool and remain historical references. Current availability of every other archive destination is unverified.

The installed Next.js static export documentation was reviewed as well as https://nextjs.org/docs/app/guides/static-exports. An actual production export validates framework compatibility.

An additional EshipSol image reference pointed to an existing directory rather than an image file. It was corrected to the matching archived shipping website screenshot. The export verifier now checks that image URLs resolve to files, and browser QA decodes every image.

## Final inventory coverage

The full asset inventory contains 198 original files, including root icons, the original PDF, favicon_io, all images, fonts, styles, scripts, and demo/preview resources. There are 21 exact duplicate copies. Nine auxiliary resources have .html suffixes: eight are downloaded error documents and one is a WOFF2 font stored under an .html extension. They are inventoried separately in auxiliary-html-inventory.json and are not treated as portfolio pages. legacy-source-review.json records the review of every original CSS and JS resource.

## Windows static export compatibility

The Lighthouse browser log exposed a 404 for a Next.js RSC prefetch payload. The locally generated payload was nested under `__next.projects/`, while the client requested a flat dotted filename. This matches the [documented upstream Windows export issue](https://github.com/vercel/next.js/issues/85374). `scripts/prepare-export.mjs` adds byte-identical static filename aliases after export and before verification. It leaves Linux CI output intact and needs no server rewrite, database, or redirect support. The browser harness checks console errors as well as uncaught exceptions so regressions surface in QA.

## Homepage metadata review

The original homepage title and canonical domain were audited. The older description claimed USA-based services and 7+ years, while contact details locate Ammar in Lahore, Pakistan. The redesign follows the verified contact location and the user's updated 8+ years positioning. The old viewport disabled zoom with maximum-scale=1; the new viewport permits zoom. Both active social profiles are preserved; commented-out social placeholders are not promoted. The historical analytics tag remains in the original source and is not loaded by the redesign. Employer structured data was omitted during the initial migration; the subsequently confirmed TechMate progression is now shown in the timelines. Person identity and verified social URLs are retained.

## Testimonials migration — 28 October 2026

All ten published testimonials were migrated from the original index.html and checked against the live portfolio at https://ammarhabib.me/. The typed records in src/data/testimonials.ts retain the original quote text, author, affiliation, photo path and source reference. Only whitespace was normalized; original punctuation and capitalization are retained. Existing client affiliations and country labels are preserved as supplied, rather than inferring extra roles or organizations.

Home features Claire Johnson, Christopher Kimmes and Mike loiselle. About displays all ten records. Both pages use the same static server-rendered component before the final contact CTA, with semantic blockquotes/figcaptions, decorative lazy-loaded 46px author photos and responsive editorial columns. No review ratings, verification badges, review structured data, carousel or new dependency was introduced. Source placeholder links were not carried over as clickable author/company links. Existing published feedback is the provenance; no independent review-platform verification is implied.

## Testimonial presentation update

The later request for a moving testimonial slider supersedes the initial static-grid presentation above. Source text, names, affiliations, photos and references are unchanged. Home still selects the same three records, while About includes all ten. The carousel uses native scroll snapping plus the existing Motion dependency for a progress indicator, with explicit pause/navigation controls and reduced-motion support. No independent verification, star rating or review metadata was added.
