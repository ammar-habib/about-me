import Link from "next/link";
import { verifiedLinks, getProjectLinkLabel } from "@/data/verified-links";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <article className={`project-card project-${index % 4}`}>
      <Link
        className="project-image"
        href={`/projects/${project.slug}/`}
        aria-label={`${String(index + 1).padStart(2, "0")} / ${project.category} — View ${project.title} case study`}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} interface and responsive screen layouts`}
            width={1000}
            height={750}
            loading="lazy"
          />
        ) : (
          <div className="missing-image">
            {project.title}
            <small>ARCHIVED PROJECT · PREVIEW UNAVAILABLE</small>
          </div>
        )}
        <span className="project-view">
          <ArrowUpRight size={22} />
        </span>
        <span className="project-image-label">
          {String(index + 1).padStart(2, "0")} / {project.category}
        </span>
      </Link>
      <div className="project-info">
        <div>
          <span className="eyebrow">{project.category}</span>
          <h3>
            <Link href={`/projects/${project.slug}/`}>{project.title}</Link>
          </h3>
        </div>
        <ArrowUpRight size={23} />
      </div>
      <p className="project-summary">{project.overview}</p>
      <p className="project-role">
        Role · Frontend UI implementation
        {project.responsibilities.length
          ? ""
          : " · contribution details to confirm"}
      </p>
      <div className="tags">
        {project.stack
          .filter((t) => !/PHP|MySQL|Laravel|CodeIgniter|Vue/i.test(t))
          .slice(0, 4)
          .map((t) => (
            <span key={t}>{t}</span>
          ))}
      </div>
      {verifiedLinks[project.slug] && (
        <a
          className="text-link"
          href={verifiedLinks[project.slug]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${getProjectLinkLabel(project.slug)}: ${project.title}`}
        >
          {getProjectLinkLabel(project.slug)} <ArrowUpRight size={14} />
        </a>
      )}
    </article>
  );
}
