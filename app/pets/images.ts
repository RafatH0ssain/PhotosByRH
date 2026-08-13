/* Static imports, not string paths: Next reads each file at build time
   and supplies intrinsic dimensions plus a generated blurDataURL, so the
   grid shows a blurred preview instead of an empty box while decoding. */
import img1 from "@/public/Pets/Pets (1).webp";
import img2 from "@/public/Pets/Pets (2).webp";
import img3 from "@/public/Pets/Pets (3).webp";
import img4 from "@/public/Pets/Pets (4).webp";
import img5 from "@/public/Pets/Pets (5).webp";
import img6 from "@/public/Pets/Pets (6).webp";
import img7 from "@/public/Pets/Pets (7).webp";
import img8 from "@/public/Pets/Pets (8).webp";
import img9 from "@/public/Pets/Pets (9).webp";

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
];

export default images;
