// Checked 28 October 2026 against the saved project references and public sites.
// See docs/project-link-http-audit.json and project-link-browser-audit.json.
// Availability does not mean the current site still matches the archived design.
export const verifiedLinks: Record<string, string> = {
  alfanar: "https://www.alfanarrestaurant.com/",
  "alqen-email":
    "https://ammar-habib.github.io/email-templates/alqen-email/welcome-email.html",
  "betten-ritter-email":
    "https://ammar-habib.github.io/email-templates/betten-ritter/index.html",
  bouwman: "https://ammar-habib.github.io/bouwman/",
  bugbyte: "https://ammar-habib.github.io/bugbyte-landing-page/",
  dicta: "https://dicta.org.il/",
  engineeringsupplies: "https://ammar-habib.github.io/esco/",
  exosecure: "https://exosecure.com/",
  fantaztech: "https://fantaztech.com/",
  greenectus: "https://www.greenectus.com/",
  hoppingin:
    "https://ammar-habib.github.io/daycare-web-app/daycare-app-final/login-signup/login.html",
  "mobilitybusiness-email":
    "https://ammar-habib.github.io/email-templates/mobility-business/day1.html",
  "noisymay-email": "https://www.noisymay.com/",
  "portfolio-1": "https://shipm8.com/",
  relevic: "https://www.relevic.com/",
  roserevenue: "https://roserevenue.com/",
  "sharp-brains": "https://sharpbrains.co.uk/",
  shipm8: "https://shipm8.com/",
  solelinks: "https://solelinks.com/",
  techmatetech: "https://techmatetech.com/",
};

export function getProjectLinkLabel(slug: string): string {
  if (slug === "noisymay-email") return "Visit client website";
  if (verifiedLinks[slug]?.startsWith("https://ammar-habib.github.io/"))
    return "View live demo";
  return "Visit website";
}
// Preserve failed original URLs in the project records, but do not offer them as live links.
export const unavailableProjectUrls = new Set([
  "https://www.crucialappconcepts.com/",
  "https://www.churchbase.com/",
  "https://dev.greenectus.com/",
  "https://play.google.com/store/apps/details?id=com.app.shoutoutapp",
  "https://www.termmate.com/",
]);
