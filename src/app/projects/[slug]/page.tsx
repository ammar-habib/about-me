import { notFound } from "next/navigation";
import Link from "next/link";
import {
  verifiedLinks,
  getProjectLinkLabel,
  unavailableProjectUrls,
} from "@/data/verified-links";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/projects";
import { ContactCTA, SectionLabel } from "@/components/shared";
import { metadata } from "@/lib/metadata";
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return p
    ? metadata(
        p.title,
        (p.title + " — " + p.overview).slice(0, 160),
        `/projects/${slug}/`,
      )
    : {};
}
export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <>
      <section className="shell case-intro">
        <Link href="/projects/" className="text-link">
          ← Back to all projects
        </Link>
        <div className="eyebrow">{p.category} / PROJECT ARCHIVE</div>
        <h1>
          {p.title}
          <span>.</span>
        </h1>
        {verifiedLinks[p.slug] && (
          <a
            href={verifiedLinks[p.slug]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            {getProjectLinkLabel(p.slug)} ↗
          </a>
        )}
        <div className="case-meta">
          <div>
            <small>CONTRIBUTION</small>
            <span>Frontend UI implementation</span>
          </div>
          <div>
            <small>PROJECT TYPE</small>
            <span>{p.category}</span>
          </div>
          <div>
            <small>PROJECT STACK</small>
            <span>
              {p.stack.slice(0, 4).join(" · ") || "Not recorded in source"}
            </span>
          </div>
        </div>
      </section>
      {p.image && (
        <div className="shell case-hero">
          <img
            src={p.image}
            width={1400}
            height={1000}
            alt={`${p.title} project overview showing interface designs`}
          />
        </div>
      )}
      <section className="shell section case-content">
        <SectionLabel number="01">PROJECT NOTES</SectionLabel>
        <div>
          <h2>
            The overview<span>.</span>
          </h2>
          <p>{p.overview}</p>
          <h3>My responsibilities</h3>
          {p.responsibilities.length ? (
            p.responsibilities.map((r, i) => <p key={i}>{r}</p>)
          ) : (
            <p>
              Frontend portfolio work. The original project page does not
              separately document personal responsibilities; detailed
              contribution scope needs confirmation.
            </p>
          )}
          <h3>Technology & implementation</h3>
          <div className="tags">
            {p.stack.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <p className="source-note">
            Technology tags are preserved from the original project record and
            describe the project stack. They do not imply ownership of backend
            development.
          </p>
          <h3>Challenge & approach</h3>
          <p>
            {p.responsibilities.length
              ? "The source records design-to-interface implementation. Further technical decisions and project-specific challenges have not been documented."
              : "Project-specific challenges and implementation decisions were not documented in the original source."}
          </p>
          <h3>Results</h3>
          <p>
            The archived visuals document the interface work. No independently
            verified business outcomes are available for this case study.
          </p>
          {p.sourceUrls.length > 0 && (
            <>
              <h3>Original project references</h3>
              <p className="source-note">
                Destinations preserved from the original portfolio; current
                availability and ownership may have changed.
              </p>
              <ul className="references">
                {p.sourceUrls.map((url, i) => (
                  <li key={i}>
                    {unavailableProjectUrls.has(url) ? (
                      <span className="muted">
                        Archived project reference (unavailable)
                      </span>
                    ) : (
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        {url.includes("dropbox")
                          ? "Design reference"
                          : `Project reference ${i + 1}`}{" "}
                        ↗
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
      {p.screenshots.length > 1 && (
        <section className="shell case-screenshots">
          <h2>Interface details</h2>
          {p.screenshots.slice(1).map((s, i) => (
            <img
              src={s}
              key={s}
              width={1200}
              height={900}
              loading="lazy"
              alt={`${p.title} additional interface view ${i + 1}`}
            />
          ))}
        </section>
      )}
      <section className="section shell">
        <SectionLabel number="02">KEEP EXPLORING</SectionLabel>
        <h2>
          More from <em>the archive.</em>
        </h2>
        <div className="project-grid">
          {projects
            .filter((q) => q.slug !== slug && q.category === p.category)
            .slice(0, 2)
            .map((q, i) => (
              <ProjectCard key={q.slug} project={q} index={i} />
            ))}
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
