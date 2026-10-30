import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/shared";
import { site } from "@/data/site";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Ammar Habib | Senior Frontend Developer",
    template: "%s | Ammar Habib",
  },
  description:
    "Senior Frontend Developer and Frontend UI Engineer with 8+ years of experience crafting responsive, accessible web interfaces.",
  icons: {
    icon: [
      { url: "/favicon.ico?v=20261030", sizes: "16x16 32x32 48x48" },
      {
        url: "/favicon-32x32.png?v=20261030",
        type: "image/png",
        sizes: "32x32",
      },
    ],
    apple: { url: "/apple-touch-icon.png?v=20261030", sizes: "180x180" },
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navigation />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: site.name,
              url: site.url,
              jobTitle: "Senior Frontend Developer",
              email: site.email,
              sameAs: [site.linkedin, site.github],
            }),
          }}
        />
      </body>
    </html>
  );
}
