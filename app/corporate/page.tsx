import Gallery from "@/components/Gallery";

const images = [
  "/Corporate Event(s)/Corporate (1).webp", "/Corporate Event(s)/Corporate (2).webp",
  "/Corporate Event(s)/Corporate (3).webp", "/Corporate Event(s)/Corporate (4).webp",
  "/Corporate Event(s)/Corporate (5).webp", "/Corporate Event(s)/Corporate (6).webp",
  "/Corporate Event(s)/Corporate (7).webp", "/Corporate Event(s)/Corporate (8).webp",
  "/Corporate Event(s)/Corporate (9).webp",
];

export default function CorporateGallery() {
  return (
    <Gallery
      number="06"
      title="Corporate"
      blurb="Professional photography for events, headshots, and company culture. Polished, high-quality images that reflect the professionalism and energy of your team."
      images={images}
      altPrefix="Corporate"
    />
  );
}
