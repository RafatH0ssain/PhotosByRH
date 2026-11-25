import { pageMetadata } from "../site";

export const metadata = pageMetadata(
  "Wildlife",
  "Capturing the raw beauty and unpredictability of nature. From quiet details to fast-moving action — bringing the wilderness into sharp focus.",
  "/wildlife",
);

export default function WildlifeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
