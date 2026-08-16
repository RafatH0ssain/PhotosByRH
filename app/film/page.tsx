import Gallery from "@/components/Gallery";

import images from "./images";

export default function FilmGallery() {
  return (
    <Gallery
      title="Film"
      blurb="Embracing the traditional analog process. I primarily shoot black-and-white film and hand-develop every roll at home — raw, timeless, and tactile."
      images={images}
      altPrefix="Film photo"
    />
  );
}
