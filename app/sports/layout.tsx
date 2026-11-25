import { pageMetadata } from "../site";

export const metadata = pageMetadata(
  "Sports",
  "Freezing high-energy action and split-second moments. Focused on intensity, teamwork, and the raw emotion of the game.",
  "/sports",
);

export default function SportsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
