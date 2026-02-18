import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pets",
};

export default function PetsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}