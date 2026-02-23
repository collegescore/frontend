"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
import NotFound from "../not-found";
import { FEATURE_FLAGS } from "@/config/flag";
import SearchHero from "@/components/search/Hero";
import CollegeCard from "@/components/common/CollegeCard";
import { College } from "@/types/college";
import { getTopA11yColleges } from "@/lib/api";
import FilterSidebar from "@/components/search/FilterSidebar";

export default function SearchPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // check if search is enabled before trying to load data
    if (!FEATURE_FLAGS.isSearchEnabled) return;

    const loadData = async () => {
      try {
        const data = await getTopA11yColleges();
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

  // if the search flag is disabled, show the not found screen.
  if (!FEATURE_FLAGS.isSearchEnabled) {
    return <NotFound />;
  }

  return (
    <Container id="search-page" sx={{ mt: 4, mb: 8 }}>
      <SearchHero />
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {/* Left Side: Filter Sidebar */}
        <Grid size={{ xs: 12, md: 3 }}>
          <FilterSidebar />
        </Grid>

        {/* Right Side: Results Grid */}
        <Grid size={{ xs: 12, md: 9 }}>
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
                <Grid key={college.slug} size={{ xs: 12, sm: 6, lg: 4 }}>
                  <CollegeCard college={college} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
