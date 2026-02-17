"use client";

import React from "react";
import { Container, Box, Typography } from "@mui/material";
import { UniversitySearch } from "@/components/common/UniversitySearch";
import Title from "../../components/search/Title";

export default function SearchPage() {
  return (
    <Container id="search-page" sx={{ mt: 4, mb: 8 }}>
      <Title />
      <UniversitySearch />
    </Container>
  );
}
