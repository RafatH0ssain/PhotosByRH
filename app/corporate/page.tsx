import Gallery from "@/components/Gallery";

import images from "./images";

export default function CorporateGallery() {
  return (
    <Gallery
      title="Corporate"
      blurb="Professional photography for events, headshots, and company culture. Polished, high-quality images that reflect the professionalism and energy of your team."
      images={images}
      altPrefix="Corporate"
    />
  );
}
