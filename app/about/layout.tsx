import { pageMetadata } from "../site";

export const metadata = pageMetadata(
  "About Me",
  "Behind the lens with Rafat Hossain — chasing good light and real emotion across wildlife, sports, pets, film, brands, and events.",
  "/about",
);

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
