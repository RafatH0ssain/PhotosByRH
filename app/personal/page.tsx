import Gallery from "@/components/Gallery";

import images from "./images";

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
