import React from "react";

export default function CollegeSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div>
      <h1>College: {params.slug}</h1>
      <p>This page is under construction.</p>
    </div>
  );
}
