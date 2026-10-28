import { PageIntro, Timeline, ContactCTA } from "@/components/shared";
import { metadata } from "@/lib/metadata";
export const generateMetadata = () =>
  metadata(
    "Experience",
    "Ammar Habib’s professional experience in frontend development, responsive websites, mobile interfaces, and collaborative product delivery.",
    "/experience/",
  );
export default function Experience() {
  return (
    <>
      <PageIntro
        eyebrow="03 / EXPERIENCE"
        title="Built through practice."
        accent="Refined with experience."
        description="A career grounded in frontend implementation, close collaboration, and attention to how people experience the web."
      />
      <section className="shell career-section">
        <Timeline />
        <p className="source-note">
          Historical percentage claims are omitted pending supporting evidence.
        </p>
      </section>
      <ContactCTA />
    </>
  );
}
