"use client";

import React, { useEffect, useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import { UniversitySearch } from "@/components/common/UniversitySearch";
import NotFound from "../not-found";
import { FEATURE_FLAGS } from "@/config/flag";
import SearchHero from "@/components/search/Hero";
import CollegeCard from "@/components/common/CollegeCard";
import { College } from "@/types/college";


export default function SearchPage() {
  // If the flag is false, show a NotFound page instead of the search UI
  if (!FEATURE_FLAGS.isSearchEnabled) {
    return <NotFound />;
  }

  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopColleges = async () => {
      try {
        // Points to your FastAPI v0 endpoint
        const response = await fetch("");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setColleges(data);
      } catch (error) {
        console.error("Error loading colleges:", error);
      } finally {
        setLoading(false);
      }
    };
  }, []);

  return (
    <Container id="search-page" sx={{ mt: 4, mb: 8 }}>
      <SearchHero />
    </Container>
  );
}
