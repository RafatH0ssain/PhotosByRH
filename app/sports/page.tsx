import Gallery from "@/components/Gallery";

const images = [
  "/Sports/Sports (1).webp", "/Sports/Sports (2).webp", "/Sports/Sports (3).webp",
  "/Sports/Sports (4).webp", "/Sports/Sports (5).webp", "/Sports/Sports (6).webp",
  "/Sports/Sports (7).webp", "/Sports/Sports (8).webp", "/Sports/Sports (9).webp",
];

export default function SportsGallery() {
  return (
    <Gallery
      number="03"
      title="Sports"
      blurb="Freezing high-energy action and split-second moments. Focused on intensity, teamwork, and the raw emotion of the game."
      images={images}
      altPrefix="Sports"
    />
  );
}
