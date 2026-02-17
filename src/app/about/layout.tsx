import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - College Score",
  description: "Learn about College Score's mission to provide authentic student experiences about accessibility, disability support, and inclusion at colleges.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
