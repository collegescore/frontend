"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
import { UniversitySearch } from "@/components/common/UniversitySearch";
import NotFound from "../not-found";
import { FEATURE_FLAGS } from "@/config/flag";
import SearchHero from "@/components/search/Hero";
import CollegeCard from "@/components/common/CollegeCard";
import { College } from "@/types/college";
import { getTopColleges } from "@/lib/api";

export default function SearchPage() {
  // If the flag is false, show a NotFound page instead of the search UI
  if (!FEATURE_FLAGS.isSearchEnabled) {
    return <NotFound />;
  }

  // othewise, default to show the top 9 colleges with highest a11y scores.
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getTopColleges();
        setColleges(data);
      } catch (err) {
        setError("We're having trouble loading the colleges right now.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <Container id="search-page" sx={{ mt: 4, mb: 8 }}>
      <SearchHero />
      <Box sx={{ mt: 6 }}>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : error ? (
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {colleges.map((college) => (
              <Grid key={college.slug} size={{ xs: 12, sm: 6, md: 4 }}>
                <CollegeCard college={college} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}
