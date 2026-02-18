"use client";

import React from "react";
import { Container, Box, Typography } from "@mui/material";
import { UniversitySearch } from "@/components/common/UniversitySearch";
import NotFound from "../not-found";

export default function SearchPage() {
  const isSearchEnabled = process.env.NEXT_PUBLIC_SHOW_SEARCH_PAGE === 'true';
  // If the flag is false, show a NotFound page instead of the search UI
  if (!isSearchEnabled) {
    return NotFound;
  };

  return (
    <Container id="search-page" sx={{ mt: 4, mb: 8 }}>
      <UniversitySearch />
    </Container>
  );
}
