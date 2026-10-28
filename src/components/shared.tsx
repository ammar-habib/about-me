import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { site, skills, experience } from "@/data/site";
import { Reveal } from "./reveal";
export function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="section-label">
      <span>{number} /</span> {children}
    </div>
  );
}
export function ContactCTA() {
  return (
    <section className="contact-cta shell">
      <SectionLabel number="06">WHAT’S NEXT</SectionLabel>
      <div className="contact-layout">
        <h2>
          Let’s create
          <br />
          something <em>exceptional.</em>
        </h2>
        <div>
          <p>
            Open to meaningful frontend engineering opportunities,
            collaborations, and ambitious digital projects.
          </p>
          <a className="button primary" href={`mailto:${site.email}`}>
            Let’s connect <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="footer shell">
      <Link href="/" className="wordmark">
        ammar<span>.</span>
        <small>HABIB</small>
      </Link>
      <p>Thoughtful design. Reliable engineering.</p>
      <div>
        <a href={`mailto:${site.email}`}>
          Email <ArrowUpRight size={13} />
        </a>
        <a href={site.linkedin} target="_blank" rel="noreferrer">
          LinkedIn <ArrowUpRight size={13} />
        </a>
        <a href={site.github} target="_blank" rel="noreferrer">
          GitHub <ArrowUpRight size={13} />
        </a>
      </div>
      <small>© {new Date().getFullYear()} Ammar Habib</small>
    </footer>
  );
}
export function Expertise() {
  return (
    <section className="section shell">
      <SectionLabel number="03">EXPERTISE</SectionLabel>
      <h2>
        The tools behind
        <br />
        <em>the experience.</em>
      </h2>
      <div className="expertise-grid">
        {skills.map((s, i) => (
          <Reveal key={s.title} className="expertise-item">
            <span className="index">0{i + 1}</span>
            <h3>{s.title}</h3>
            <div className="tags">
              {s.items.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
export function Timeline({ compact = false }: { compact?: boolean }) {
  return (
    <div className="timeline">
      {(compact ? experience.slice(0, 3) : experience).map((e, i) => (
        <Reveal className="timeline-row" key={`${e.company}-${e.role}`}>
          <div className="timeline-date">
            <span className="index">0{i + 1}</span>
            <span>{e.period}</span>
          </div>
          <div>
            <h3>{e.role}</h3>
            <h4>
              {e.company}
              <span className="timeline-location">· {e.location}</span>
            </h4>
            <p>{e.description}</p>
            <div className="tags">
              {e.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
      {compact && (
        <Link className="text-link" href="/experience/">
          The full career journey <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}
export function PageIntro({
  eyebrow,
  title,
  accent,
  description,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
}) {
  return (
    <section className="page-intro shell">
      <span className="eyebrow">{eyebrow}</span>
      <h1>
        {title}
        <br />
        <em>{accent}</em>
      </h1>
      <p>{description}</p>
    </section>
  );
}
