import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You - College Score",
  description:
    "Your insights help current and prospective students to stay informed and make the right decisions for their unique identity",
};

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
