import { pageMetadata } from "../site";

export const metadata = pageMetadata(
  "Personal",
  "Documenting life's important milestones — from graduations to candid portraits. Authentic, natural photos that preserve the moment.",
  "/personal",
);

export default function PersonalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
