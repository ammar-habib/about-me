import type { Metadata } from "next";
import { site } from "@/data/site";
export function metadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | Ammar Habib`,
      description,
      url: site.url + path,
      type: "website",
      images: [{ url: "/social-card.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/social-card.png"],
    },
  };
}
