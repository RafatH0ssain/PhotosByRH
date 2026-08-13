import Gallery from "@/components/Gallery";

import images from "./images";

export default function PetsGallery() {
  return (
    <Gallery
      number="04"
      title="Pets"
      blurb="Pets are family. Capturing the unique personalities, playful energy, and quirky moments of your furry companions in a natural, stress-free environment."
      images={images}
      altPrefix="Pet portrait"
    />
  );
}
