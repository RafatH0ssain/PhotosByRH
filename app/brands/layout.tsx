import { pageMetadata } from "../site";

export const metadata = pageMetadata(
  "Brands",
  "Helping businesses tell their visual story. Clean, compelling images that showcase products, services, and identity.",
  "/brands",
);

export default function BrandsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
