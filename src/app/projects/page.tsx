import { PageIntro, ContactCTA } from "@/components/shared";
import { ProjectGallery } from "@/components/project-gallery";
import { metadata } from "@/lib/metadata";
export const generateMetadata = () =>
  metadata(
    "Projects",
    "Explore Ammar Habib’s complete frontend portfolio: websites, mobile applications, WordPress, and responsive email templates.",
    "/projects/",
  );
export default function Projects() {
  return (
    <>
      <PageIntro
        eyebrow="02 / THE PORTFOLIO"
        title="Different challenges."
        accent="The same attention to craft."
        description="A collection of websites, application interfaces, and email experiences. Real projects, preserved from my frontend portfolio."
      />
      <ProjectGallery />
      <ContactCTA />
    </>
  );
}
