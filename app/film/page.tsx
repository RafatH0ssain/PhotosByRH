import Gallery from "@/components/Gallery";

const images = [
  "/Film/Film (1).webp",  "/Film/Film (2).webp",  "/Film/Film (3).webp",
  "/Film/Film (4).webp",  "/Film/Film (5).webp",  "/Film/Film (6).webp",
  "/Film/Film (7).webp",  "/Film/Film (8).webp",  "/Film/Film (9).webp",
  "/Film/Film (10).webp", "/Film/Film (11).webp", "/Film/Film (12).webp",
];

export default function FilmGallery() {
  return (
    <Gallery
      number="02"
      title="Film"
      blurb="Embracing the traditional analog process. I primarily shoot black-and-white film and hand-develop every roll at home — raw, timeless, and tactile."
      images={images}
      altPrefix="Film photo"
    />
  );
}
