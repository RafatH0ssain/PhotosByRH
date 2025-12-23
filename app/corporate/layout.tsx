import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate",
};

export default function CorporateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}