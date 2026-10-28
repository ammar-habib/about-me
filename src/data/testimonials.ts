export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  affiliation: string;
  photo: string;
  sourceUrl: string;
};

export const featuredTestimonialIds = [
  "claire-johnson",
  "christopher-kimmes",
  "mike-loiselle",
] as const;

export const testimonials: Testimonial[] = [
  {
    id: "claire-johnson",
    quote:
      '"It was a pleasure working with Ammar.He helped me with the coding on my website!.I would highly recommend."',
    author: "Claire Johnson",
    affiliation: "Coastal Real Of The Florida keys",
    photo: "/images/testimonials/clarie.jpg",
    sourceUrl: "https://ammarhabib.me/",
  },
  {
    id: "christopher-kimmes",
    quote:
      '"His knowledge of coding and creating exactly what I had requested - he will be a success. I would definitely work with him on any future projects that I have."',
    author: "Christopher Kimmes",
    affiliation: "Greenectus",
    photo: "/images/testimonials/kriss.jpeg",
    sourceUrl: "https://ammarhabib.me/",
  },
  {
    id: "dgonor",
    quote:
      '"Absolutely amazing service and exceptional talent! His response time was amazing . I would highly recommend Ammar!"',
    author: "Dgonor",
    affiliation: "USA",
    photo: "/images/testimonials/dgonor.jpeg",
    sourceUrl: "https://ammarhabib.me/",
  },
  {
    id: "teddy",
    quote:
      '"Ammar was very responsive and easy to work with. He understood what we wanted and delivered before the deadline. "',
    author: "Teddy",
    affiliation: "Integrate8 USA",
    photo: "/images/testimonials/testimonial_photo_3.jpg",
    sourceUrl: "https://ammarhabib.me/",
  },
  {
    id: "zoran-juric",
    quote:
      '"The seller was fast and delivered quality work according to the latest standards. "',
    author: "Zoran Juric",
    affiliation: "Serbia",
    photo: "/images/testimonials/zoranjuric.webp",
    sourceUrl: "https://ammarhabib.me/",
  },
  {
    id: "stephen-gatheru",
    quote:
      '"I will definitely hire him again.He delivered quality work and on time.I highly recommend him. "',
    author: "Stephen Gatheru",
    affiliation: "Kenya",
    photo: "/images/testimonials/stephengatheru.jpg",
    sourceUrl: "https://ammarhabib.me/",
  },
  {
    id: "appsuiteco",
    quote:
      '"The seller has done a good job, we liked his work and the delivery was fast. Thank you. "',
    author: "Appsuiteco",
    affiliation: "Bangladesh",
    photo: "/images/testimonials/appsuiteco.webp",
    sourceUrl: "https://ammarhabib.me/",
  },
  {
    id: "lisa-onkes",
    quote: '"Amazing! Exactly like we wanted! Can highly recommend! 10/10 "',
    author: "Lisa Onkes",
    affiliation: "Thesquareware Germany",
    photo: "/images/testimonials/lisa-onkes.webp",
    sourceUrl: "https://ammarhabib.me/",
  },
  {
    id: "carlos-agudelo",
    quote:
      '"Really good work, I had a bit of pushback on the delivery but after getting aligned he did the right output. "',
    author: "Carlos Agudelo",
    affiliation: "Colombia",
    photo: "/images/testimonials/carlosagudelov.webp",
    sourceUrl: "https://ammarhabib.me/",
  },
  {
    id: "mike-loiselle",
    quote:
      '"This seller has been my go-to seller for all things related to HTML and CSS. Reliable and fast. Also communicates well."',
    author: "Mike loiselle",
    affiliation: "Canada",
    photo: "/images/testimonials/mikeloiselle.webp",
    sourceUrl: "https://ammarhabib.me/",
  },
];
