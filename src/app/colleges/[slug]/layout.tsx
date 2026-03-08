import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCollege } from "@/lib/api";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  try {
    const college = await getCollege(slug);

    if (!college) {
      console.error(`College not found for slug: ${slug}`);
      notFound();
    }
    const collegeName = college.name;

    return {
      title: `${collegeName} - College Score`,
      description: `Read authentic student reviews and experiences about ${collegeName}. Learn about accessibility, disability support, and campus inclusion.`,
    };
  } catch (error) {
    console.error(
      `Error fetching college for slug ${slug}:`,
      error instanceof Error ? error.message : "Unknown error",
    );
    notFound();
  }
}

export default function CollegeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
