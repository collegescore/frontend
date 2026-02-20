import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit Review - College Score",
  description:
    "Share your college experience and help current and prospective students to stay informed and make decisions about accessibility, disability support, and campus life.",
};

export default function ReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
