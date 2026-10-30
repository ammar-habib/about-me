# Social preview and favicon

Updated 30 October 2026. The shared social image is a 1200 × 630 lossless PNG (approximately 453 KB), composed from the existing professional portrait and local Space Grotesk/Inter fonts. No face, hair, expression, clothing or portrait pixels were retouched; the original WebP remains unchanged. The portrait is proportionally scaled and cropped at its lower edge inside a navy frame, with the full head visible.

The design uses #0B0F14, #111820 and #59D5E8, a subtle grid/orbit, large name/headline, role, technology tags and domain. Small auxiliary labels are decorative; the name, role, headline and portrait remain readable in a 600 × 315 preview.

## Reproduce

With dependencies and Google Chrome installed, run `npm run assets:brand`. The generator reads `scripts/assets/social-card.html`, embeds local font files and the unchanged portrait, waits for fonts/images, and renders the PNG with Playwright. Source files stay outside public/. Production builds deploy the committed PNG and do not need Chrome or regeneration. No external design service or new dependency is used.

The same script derives antialiased white-mark coverage from `scripts/assets/favicon-source.png` (the original orange Apple icon), composites it onto opaque #0B0F14 and exports an ICO containing 16/32/48px PNG frames, a 32px PNG and a 180px Apple icon. The original “A” shape is preserved without orange fringes. The old, inconsistent public SVG social card is removed; the HTML template is now the editable source.

Open Graph, Twitter and explicit icon links use `?v=20261030`. Metadata includes the social image dimensions and descriptive Open Graph alt text. This changes asset URLs for refreshed fetches; platforms may retain previews for existing shared posts until they re-scrape the page.

## Verification

Visually review public/social-card.png, qa-results/social-card-600.png and qa-results/favicon-sizes.png after generation. Export verification checks the versioned Open Graph/Twitter/icon metadata across all content routes, PNG dimensions/signatures and ICO frame sizes, in addition to existing route and asset checks. Release from portfolio-redesign through the existing workflow; preserve pro, DNS and unrelated working-tree edits.
