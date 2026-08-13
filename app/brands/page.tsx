import Gallery from "@/components/Gallery";

const images = [
  "/Brand(s)/Brands (1).webp", "/Brand(s)/Brands (2).webp", "/Brand(s)/Brands (3).webp",
  "/Brand(s)/Brands (4).webp", "/Brand(s)/Brands (5).webp", "/Brand(s)/Brands (6).webp",
  "/Brand(s)/Brands (7).webp", "/Brand(s)/Brands (8).webp", "/Brand(s)/Brands (9).webp",
];

export default function BrandsGallery() {
  return (
    <Gallery
      number="05"
      title="Brands"
      blurb="Helping businesses tell their visual story. Clean, compelling images that showcase products, services, and identity to connect with an audience."
      images={images}
      altPrefix="Brand image"
    />
  );
}
