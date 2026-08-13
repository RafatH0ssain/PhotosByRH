import Gallery from "@/components/Gallery";

const images = [
  "/Personal Event(s)/Personal (2).webp", "/Personal Event(s)/Personal (3).webp",
  "/Personal Event(s)/Personal (4).webp", "/Personal Event(s)/Personal (5).webp",
  "/Personal Event(s)/Personal (1).webp", "/Personal Event(s)/Personal (6).webp",
  "/Personal Event(s)/Personal (7).webp", "/Personal Event(s)/Personal (8).webp",
  "/Personal Event(s)/Personal (9).webp", "/Personal Event(s)/Personal (10).webp",
  "/Personal Event(s)/Personal (11).webp","/Personal Event(s)/Personal (12).webp",
];

export default function PersonalGallery() {
  return (
    <Gallery
      number="07"
      title="Personal"
      blurb="Documenting life's important milestones — from graduations to candid portraits. Authentic, natural photos that preserve the moment exactly as it happens."
      images={images}
      altPrefix="Personal"
    />
  );
}
