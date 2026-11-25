import { pageMetadata } from "../site";

export const metadata = pageMetadata(
  "Film",
  "Embracing the traditional analog process. Black-and-white film hand-developed at home — raw, timeless, and tactile.",
  "/film",
);

export default function FilmLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
