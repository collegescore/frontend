import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCollegeName } from "@/lib/api";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const collegeName = await getCollegeName(params.slug);

    if (!collegeName) {
      console.error(`College not found for slug: ${params.slug}`);
      notFound();
    }

    return {
      title: `${collegeName} - College Score`,
      description: `Read authentic student reviews and experiences about ${collegeName}. Learn about accessibility, disability support, and campus inclusion.`,
    };
  } catch (error) {
    console.error(
      `Error fetching college for slug ${params.slug}:`,
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
