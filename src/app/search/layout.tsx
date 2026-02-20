import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Colleges - College Score",
  description:
    "Search and discover colleges. Find reviews and student experiences related to accessibility, disability support, and campus inclusion.",
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
