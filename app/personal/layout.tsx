import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personal",
};

export default function PersonalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}