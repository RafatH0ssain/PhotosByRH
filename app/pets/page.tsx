import Gallery from "@/components/Gallery";

const images = [
  "/Pets/Pets (1).webp", "/Pets/Pets (2).webp", "/Pets/Pets (3).webp",
  "/Pets/Pets (4).webp", "/Pets/Pets (5).webp", "/Pets/Pets (6).webp",
  "/Pets/Pets (7).webp", "/Pets/Pets (8).webp", "/Pets/Pets (9).webp",
];

export default function PetsGallery() {
  return (
    <Gallery
      number="03"
      title="Pets"
      blurb="Pets are family. Capturing the unique personalities, playful energy, and quirky moments of your furry companions in a natural, stress-free environment."
      images={images}
      altPrefix="Pet portrait"
    />
  );
}
