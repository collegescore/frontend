"use client";

import React from "react";
import { Container, Box, Typography } from "@mui/material";
import { UniversitySearch } from "@/components/common/UniversitySearch";
import SearchHero from "@/components/search/Hero";

export default function SearchPage() {
  return (
    <Container id="search-page" sx={{ mt: 4, mb: 8 }}>
      <SearchHero />
    </Container>
  );
}
