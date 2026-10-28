"use client";
import { useState } from "react";
import { projects } from "@/data/projects";
import { ProjectCard } from "./projects";
export function ProjectGallery() {
  const [category, setCategory] = useState("All work");
  const categories = ["All work", ...new Set(projects.map((p) => p.category))];
  const filtered = projects.filter(
    (p) => category === "All work" || p.category === category,
  );
  return (
    <section className="shell gallery-section">
      <div
        className="filters"
        role="group"
        aria-label="Filter projects by category"
      >
        {categories.map((c) => (
          <button
            key={c}
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
          >
            {c}
            <sup>
              {c === "All work"
                ? projects.length
                : projects.filter((p) => p.category === c).length}
            </sup>
          </button>
        ))}
      </div>
      <p className="filter-count" aria-live="polite">
        {filtered.length} projects · {category}
      </p>
      <div className="project-grid">
        {filtered.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
