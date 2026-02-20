"use client";

import React from "react";
import { Container, Box, Typography } from "@mui/material";
import { UniversitySearch } from "@/components/common/UniversitySearch";
import SearchHero from "@/components/search/Hero";
import CollegeCard from "@/components/common/CollegeCard";

export default function SearchPage() {
  return (
    <Container id="search-page" sx={{ mt: 4, mb: 8 }}>
      <SearchHero />
      <CollegeCard college={{
          slug: "example-university-example-city-ex",
          name: "Example University",
          city: "Example City",
          state: "EX",
          a11y_overall: 4.2,
          safety_overall: 3.8,
          inclusivity_overall: 4.5,
          num_reviews: 128,
      }} />
    </Container>
  );
}
