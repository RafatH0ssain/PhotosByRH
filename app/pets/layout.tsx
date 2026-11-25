import { pageMetadata } from "../site";

export const metadata = pageMetadata(
  "Pets",
  "Capturing the unique personalities, playful energy, and quirky moments of furry companions in a natural, stress-free environment.",
  "/pets",
);

export default function PetsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
