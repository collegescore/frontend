import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit Review - College Score",
  description:
    "Share your college experience and help prospective students make informed decisions about accessibility, disability support, and campus life.",
};

export default function ReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
