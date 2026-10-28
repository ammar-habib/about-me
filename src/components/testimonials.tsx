import { featuredTestimonialIds, testimonials } from "@/data/testimonials";
import { TestimonialSlider } from "./testimonial-slider";

export function Testimonials({ featured = false }: { featured?: boolean }) {
  const entries = featured
    ? featuredTestimonialIds.map((id) =>
        testimonials.find((entry) => entry.id === id)!,
      )
    : testimonials;

  return (
    <section
      className="testimonials-section section shell"
      aria-labelledby="testimonials-heading"
    >
      <div className="testimonials-heading">
        <div>
          <span className="eyebrow">CLIENT FEEDBACK</span>
          <h2 id="testimonials-heading">
            In their <em>words.</em>
          </h2>
        </div>
        <p>
          A few words from the people
          <br />
          I’ve worked with.
        </p>
      </div>
      <TestimonialSlider entries={entries} />
    </section>
  );
}
