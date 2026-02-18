import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sports",
};

export default function SportsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}