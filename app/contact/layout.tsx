import { pageMetadata } from "../site";

export const metadata = pageMetadata(
  "Contact",
  "Get in touch with Rafat Hossain for photography bookings, quotes, or inquiries.",
  "/contact",
);

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
