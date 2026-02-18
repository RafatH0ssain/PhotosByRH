import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wildlife",
};

export default function WildlifeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}