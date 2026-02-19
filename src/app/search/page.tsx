"use client";

import React from "react";
import { Container, Box, Typography } from "@mui/material";
import { UniversitySearch } from "@/components/common/UniversitySearch";
import NotFound from "../not-found";
import { FEATURE_FLAGS } from "@/config/flag";
import SearchHero from "@/components/search/Hero";

export default function SearchPage() {
  // If the flag is false, show a NotFound page instead of the search UI
  if (!FEATURE_FLAGS.isSearchEnabled) {
    return <NotFound />;
  }

  return (
    <Container id="search-page" sx={{ mt: 4, mb: 8 }}>
      <SearchHero />
    </Container>
  );
}
