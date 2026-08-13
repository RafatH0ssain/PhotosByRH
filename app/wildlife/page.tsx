import Gallery from "@/components/Gallery";

const images = [
  "/Wildlife/Wildlife (1).webp",  "/Wildlife/Wildlife (2).webp",  "/Wildlife/Wildlife (3).webp",
  "/Wildlife/Wildlife (4).webp",  "/Wildlife/Wildlife (5).webp",  "/Wildlife/Wildlife (6).webp",
  "/Wildlife/Wildlife (7).webp",  "/Wildlife/Wildlife (8).webp",  "/Wildlife/Wildlife (9).webp",
  "/Wildlife/Wildlife (10).webp", "/Wildlife/Wildlife (11).webp", "/Wildlife/Wildlife (12).webp",
  "/Wildlife/Wildlife (13).webp", "/Wildlife/Wildlife (14).webp", "/Wildlife/Wildlife (15).webp",
  "/Wildlife/Wildlife (16).webp", "/Wildlife/Wildlife (17).webp", "/Wildlife/Wildlife (18).webp",
];

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
