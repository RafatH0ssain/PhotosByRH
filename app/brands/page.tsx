import Gallery from "@/components/Gallery";

import images from "./images";

export default function BrandsGallery() {
  return (
    <Gallery
      title="Brands"
      blurb="Helping businesses tell their visual story. Clean, compelling images that showcase products, services, and identity to connect with an audience."
      images={images}
      altPrefix="Brand image"
    />
  );
}
