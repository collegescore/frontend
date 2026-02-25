"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { searchColleges } from "@/lib/api"; // Updated import
import FilterSidebar from "@/components/search/FilterSidebar";

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Parse URL params into an object
  const getFiltersFromURL = useCallback(() => {
    // If searchParams is null, fall back to an empty string or default behavior
    const params = searchParams;

    return {
      sort_by: params?.get("sort_by") || "a11y_high_low",
      state: params?.get("state") || "",
      // We check for the explicit string "true" from the URL
      has_cultural_center: params?.get("has_cultural_center") === "true",
      min_safety: Number(params?.get("min_safety")) || 0,
      min_inclusivity: Number(params?.get("min_inclusivity")) || 0,
    };
  }, [searchParams]);

  const loadData = useCallback(async () => {
    if (!FEATURE_FLAGS.isSearchEnabled) return;
    setLoading(true);
    try {
      const filters = getFiltersFromURL();
      const data = await searchColleges(filters);
      setColleges(data);
    } catch (err) {
      setError("We're having trouble loading the colleges right now.");
    } finally {
      setLoading(false);
    }
  }, [getFiltersFromURL]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleApplyFilters = (newFilters: any) => {
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value.toString());
    });
    router.push(`/search?${params.toString()}`);
  };

  if (!FEATURE_FLAGS.isSearchEnabled) return <NotFound />;

  return (
    <Container id="search-page" sx={{ mt: 4, mb: 8 }}>
      <SearchHero />
      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <FilterSidebar
            currentFilters={getFiltersFromURL()}
            onApply={handleApplyFilters}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 9 }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error" textAlign="center">
              {error}
            </Typography>
          ) : (
            <Grid
              container
              spacing={3}
              component="ul"
              sx={{ listStyle: "none", p: 0 }}
            >
              {colleges.map((college) => (
                <Grid
                  key={college.slug}
                  size={{ xs: 12, sm: 6, lg: 4 }}
                  component="li"
                >
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
