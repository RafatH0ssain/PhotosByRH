import Gallery from "@/components/Gallery";

import images from "./images";

export default function WildlifeGallery() {
  return (
    <Gallery
      number="01"
      title="Wildlife"
      blurb="Capturing the raw beauty and unpredictability of nature. From quiet details to fast-moving action — bringing the wilderness into sharp focus. My personal favourite."
      images={images}
      altPrefix="Wildlife"
    />
  );
}
