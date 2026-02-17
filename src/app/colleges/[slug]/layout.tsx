import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // Slug format: name-city-state, remove last 2 parts to get name
  const parts = params.slug.split('-');
  const nameParts = parts.slice(0, -2);
  const collegeName = nameParts.map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  return {
    title: `${collegeName} - College Score`,
    description: `Read authentic student reviews and experiences about ${collegeName}. Learn about accessibility, disability support, and campus inclusion.`,
  };
}

export default function CollegeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
