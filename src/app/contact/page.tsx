import { ArrowUpRight, Mail, Download } from "lucide-react";
import { site } from "@/data/site";
import { PageIntro } from "@/components/shared";
import { metadata } from "@/lib/metadata";
export const generateMetadata = () =>
  metadata(
    "Contact",
    "Contact Ammar Habib for remote frontend engineering opportunities, web interface development, and digital collaborations.",
    "/contact/",
  );
export default function Contact() {
  return (
    <>
      <PageIntro
        eyebrow="04 / GET IN TOUCH"
        title="A good conversation."
        accent="A great place to start."
        description="Have an interface to build, a product to improve, or a frontend role in mind? I’d like to hear about it."
      />
      <section className="shell contact-page">
        <div className="email-panel">
          <span className="eyebrow">
            <Mail size={16} /> SAY HELLO
          </span>
          <a href={`mailto:${site.email}`} className="email-link">
            ammar.habib.mughal
            <br />
            <span>@gmail.com</span>
            <ArrowUpRight />
          </a>
          <p>
            Email is the most direct way to reach me. Share a little about your
            project, team, or opportunity.
          </p>
          <p>Lahore, Punjab, Pakistan · English &amp; Urdu</p>
          <a className="text-link" href="tel:+923356164660">
            +92 335 6164660 ↗
          </a>
        </div>
        <div className="contact-links">
          <a href={site.linkedin} target="_blank" rel="noreferrer">
            <span>
              <small>LET’S CONNECT</small>LinkedIn
            </span>
            <ArrowUpRight />
          </a>
          <a href={site.github} target="_blank" rel="noreferrer">
            <span>
              <small>EXPLORE THE CODE</small>GitHub
            </span>
            <ArrowUpRight />
          </a>
          <a href={site.resume} download>
            <span>
              <small>THE FULL PICTURE</small>Download CV
            </span>
            <Download />
          </a>
        </div>
      </section>
    </>
  );
}
