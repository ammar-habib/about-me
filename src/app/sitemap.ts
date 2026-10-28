import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "about/",
    "projects/",
    "experience/",
    "contact/",
    ...projects.map((p) => `projects/${p.slug}/`),
  ].map((p) => ({
    url: site.url + "/" + p,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
}
