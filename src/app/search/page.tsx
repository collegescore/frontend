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
          id: "1",
          name: "Example University",
          city: "Example City",
          state: "EX",
          accessibility: 4.2,
          safety: 3.8,
          inclusivity: 4.5,
          reviewCount: 128,
      }} />
    </Container>
  );
}
