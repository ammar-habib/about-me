import { Testimonials } from "@/components/testimonials";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, ArrowRight, Download } from "lucide-react";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { ProjectCard } from "@/components/projects";
import { Reveal } from "@/components/reveal";
import {
  SectionLabel,
  Expertise,
  Timeline,
  ContactCTA,
} from "@/components/shared";
import { metadata } from "@/lib/metadata";
export const generateMetadata = () =>
  metadata(
    "Senior Frontend Developer",
    "Ammar Habib — 8+ years building responsive, performant, and carefully crafted web interfaces. Explore selected frontend work and experience.",
    "/",
  );
export default function Home() {
  return (
    <>
      <section className="hero shell">
        <div className="hero-top">
          <span className="eyebrow">
            <span className="status-dot" /> HELLO, I’M AMMAR HABIB
          </span>
          <span className="hero-location">
            FRONTEND UI ENGINEER
            <br />
            BASED IN PAKISTAN · WORKING WORLDWIDE
          </span>
        </div>
        <Reveal className="hero-title">
          <h1>
            Engineering digital
            <br />
            experiences that
            <br />
            <em>
              stand out<span>.</span>
            </em>
          </h1>
          <span className="hero-asterisk" aria-hidden="true">
            ✳
          </span>
        </Reveal>
        <div className="hero-bottom">
          <div>
            <p>
              Senior Frontend Developer with 8+ years of experience building
              responsive, performant, and beautifully crafted web interfaces.
            </p>
            <div className="hero-actions">
              <Link href="/projects/" className="button primary">
                Explore my work <ArrowUpRight size={18} />
              </Link>
              <a href={site.resume} download className="button secondary">
                Download resume <Download size={16} />
              </a>
            </div>
          </div>
          <div className="hero-aside">
            <span className="mono">BUILT WITH INTENTION.</span>
            <span className="mono muted">DESIGNED FOR PEOPLE.</span>
            <Link href="/contact/" className="text-link">
              Let’s connect <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
        <div className="hero-foot">
          <span>
            React <i /> Next.js <i /> TypeScript <i /> Modern UI engineering
          </span>
          <a href="#selected-work" aria-label="Scroll to explore selected work">
            SCROLL TO EXPLORE <ArrowDown size={15} />
          </a>
        </div>
      </section>
      <section className="about-preview section shell">
        <SectionLabel number="01">THE PERSON BEHIND THE PIXELS</SectionLabel>
        <div className="about-grid">
          <div className="experience-stat">
            8<span>+</span>
            <small>
              YEARS OF CRAFT
              <br />& CONTINUOUS LEARNING
            </small>
          </div>
          <div>
            <h2>
              I build interfaces where
              <br />
              design meets <em>engineering.</em>
            </h2>
            <p>
              Good interfaces feel effortless. Getting them there takes care:
              translating designs faithfully, making layouts work on every
              screen, and keeping the experience fast and accessible.
            </p>
            <p>
              I bring that attention to frontend development, working closely
              with designers and engineering teams from the first screen to the
              final detail.
            </p>
            <Link className="text-link" href="/about/">
              A little more about me <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <section id="selected-work" className="section shell work-section">
        <div className="section-heading">
          <div>
            <SectionLabel number="02">SELECTED WORK</SectionLabel>
            <h2>
              Thoughtful work.
              <br />
              <em>Considered execution.</em>
            </h2>
          </div>
          <Link href="/projects/" className="text-link">
            All projects <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="project-grid selected">
          {projects
            .filter((p) => p.featured)
            .sort(
              (a, b) =>
                ["dicta", "exosecure", "relevic", "solelinks"].indexOf(a.slug) -
                ["dicta", "exosecure", "relevic", "solelinks"].indexOf(b.slug),
            )
            .map((p, i) => (
              <Reveal key={p.slug}>
                <ProjectCard project={p} index={i} />
              </Reveal>
            ))}
        </div>
        <Link className="all-work" href="/projects/">
          There’s more where that came from.{" "}
          <span>
            Explore all {projects.length} projects <ArrowRight size={18} />
          </span>
        </Link>
      </section>
      <Expertise />
      <section className="section shell">
        <SectionLabel number="04">THE JOURNEY</SectionLabel>
        <div className="section-heading">
          <h2>
            Experience built through
            <br />
            <em>real-world products.</em>
          </h2>
          <span className="section-note">
            A foundation in frontend.
            <br />A focus on the details.
          </span>
        </div>
        <Timeline compact />
      </section>
      <section className="section philosophy">
        <div className="shell">
          <SectionLabel number="05">HOW I WORK</SectionLabel>
          <h2>
            Thoughtful design.
            <br />
            <em>Reliable engineering.</em>
          </h2>
          <div className="principles">
            {[
              [
                "01",
                "Every pixel has a purpose.",
                "Faithful design implementation, balanced layouts, and details that make the interface feel considered.",
              ],
              [
                "02",
                "Built for the real world.",
                "Responsive, accessible experiences that work across devices, connection speeds, and ways of interacting.",
              ],
              [
                "03",
                "Good code goes further.",
                "Clear components, maintainable styles, and collaborative delivery that make future improvements easier.",
              ],
            ].map(([n, t, d]) => (
              <div key={n}>
                <span className="index">{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Testimonials featured />
      <ContactCTA />
    </>
  );
}
