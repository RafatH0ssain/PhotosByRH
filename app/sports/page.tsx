import Gallery from "@/components/Gallery";

import images from "./images";

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
