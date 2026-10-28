import { Testimonials } from "@/components/testimonials";
import Link from "next/link";
import {
  PageIntro,
  Expertise,
  ContactCTA,
  SectionLabel,
} from "@/components/shared";
import { education, site } from "@/data/site";
import { metadata } from "@/lib/metadata";
export const generateMetadata = () =>
  metadata(
    "About",
    "Meet Ammar Habib, a Senior Frontend Developer focused on responsive UI, design implementation, accessibility, and collaborative product delivery.",
    "/about/",
  );
export default function About() {
  return (
    <>
      <PageIntro
        eyebrow="01 / ABOUT ME"
        title="An eye for design."
        accent="A mind for engineering."
        description="I’m Ammar Habib, a Senior Frontend Developer with more than eight years of experience making digital interfaces work beautifully."
      />
      <section className="shell biography">
        <div className="portrait">
          <img
            src="/images/ammar-professional-portrait-v3.webp"
            width={1000}
            height={1500}
            alt="Professional portrait of Ammar Habib"
          />
          <span>THE PERSON BEHIND THE PIXELS</span>
        </div>
        <div>
          <SectionLabel number="01">MY APPROACH</SectionLabel>
          <h2>
            From the design file
            <br />
            to the <em>final detail.</em>
          </h2>
          <p>
            My work sits at the intersection of design and frontend development.
            I translate Figma, Sketch, and other design references into
            responsive websites, application interfaces, and email templates.
          </p>
          <p>
            My foundation is HTML, CSS, Sass, and JavaScript, alongside
            Bootstrap, WordPress, and Ionic. My modern frontend toolkit also
            includes React, Next.js, TypeScript, and Tailwind CSS.
          </p>
          <p>
            I collaborate with designers, product teams, and backend engineers
            to build interfaces that are clear, usable, and maintainable.
            Frontend implementation is my focus, with attention to performance,
            accessibility, and responsive behavior.
          </p>
          <Link className="text-link" href="/experience/">
            Explore my career journey ↗
          </Link>
          <a className="button secondary" href={site.resume} download>
            Download my CV ↗
          </a>
        </div>
      </section>
      <Expertise />
      <section className="section shell">
        <SectionLabel number="02">EDUCATION & RECOGNITION</SectionLabel>
        <h2>
          A foundation for
          <br />
          <em>lifelong learning.</em>
        </h2>
        <div className="education">
          {education.map((e) => (
            <div key={e.year}>
              <span className="mono">{e.year}</span>
              <h3>{e.title}</h3>
              <p>{e.school}</p>
              <small>{e.detail}</small>
            </div>
          ))}
        </div>
        <div className="recognition">
          <div>
            <h3>Responsive Web Design</h3>
            <p>freeCodeCamp · January 2020</p>
            <a
              className="text-link"
              href="https://www.freecodecamp.org/certification/fcc1a1c550b-1523-4098-a868-dad252352780/responsive-web-design"
              target="_blank"
              rel="noreferrer"
            >
              View source credential ↗
            </a>
          </div>
          <div>
            <h3>Employee of the Year</h3>
            <p>Techmate Technologies LLC</p>
            <small>
              Year differs between source website (2020–2021) and CV
              (2021–2022); confirmation pending.
            </small>
          </div>
          <div>
            <h3>Vice President, Executive Club</h3>
            <p>NCBA&E · 2013–2014</p>
            <small>
              University leadership recorded in the original portfolio.
            </small>
          </div>
        </div>
      </section>
      <Testimonials />
      <ContactCTA />
    </>
  );
}
