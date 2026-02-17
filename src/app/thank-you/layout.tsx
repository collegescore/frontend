import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You - College Score",
  description:
    "Thank you for submitting your college review. Your insights help prospective students make informed decisions.",
};

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
