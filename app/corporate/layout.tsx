import { pageMetadata } from "../site";

export const metadata = pageMetadata(
  "Corporate",
  "Professional photography for events, headshots, and company culture. Polished, high-quality images that reflect your team.",
  "/corporate",
);

export default function CorporateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
