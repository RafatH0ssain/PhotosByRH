import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Film",
};

export default function FilmLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
