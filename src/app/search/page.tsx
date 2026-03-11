"use client";

import React, { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Grid,
  Pagination,
} from "@mui/material";
import NotFound from "../not-found";
import { FEATURE_FLAGS } from "@/config/flag";
import SearchHero from "@/components/search/Hero";
import CollegeCard from "@/components/common/CollegeCard";
import { College } from "@/types/college";
import { SearchFilters } from "@/types/search_filters";
import { filterColleges } from "@/lib/api";
import FilterSidebar from "@/components/search/FilterSidebar";

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const PAGE_SIZE = 12;

  // Parse URL params into an object
  const getFiltersFromURL = useCallback(() => {
    // If searchParams is null, fall back to an empty string or default behavior
    const params = searchParams;

    // return the filters, fallback to default filters if not found in URL
    return {
      // default sorting is by accessibility score from high to low
      sort_by: params?.get("sort_by") || "a11y_high_low",
      state: params?.get("state") || "",
      // we only care about the value of the has_disability_cultural_center if it is true. If the box
      // is unchecked, we want to show both colleges with and without dcc, so the "false" doesn't
      // really impact filtering. It is basically true or none.
      has_disability_cultural_center:
        params?.get("has_disability_cultural_center") === "true",
      min_safety: Number(params?.get("min_safety")) || 0,
      min_inclusivity: Number(params?.get("min_inclusivity")) || 0,
    };
  }, [searchParams]);

  const loadData = useCallback(async () => {
    if (!FEATURE_FLAGS.isSearchEnabled) return;
    setLoading(true);
    try {
      const filters = getFiltersFromURL();
      // pass the filters to the filterColleges route
      const data = await filterColleges(filters);
      // the colleges to display are the result of the query with filters
      setColleges(data);
      // compute total pages based on the number of colleges and page size
      setTotalPages(Math.ceil(data.length / PAGE_SIZE));
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "We're having trouble loading the colleges right now.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [getFiltersFromURL]);

  useEffect(() => {
    // check if search is enabled before trying to load data (find the colleges to display)
    if (!FEATURE_FLAGS.isSearchEnabled) return;
    loadData();
  }, [loadData]);

  const handleApplyFilters = (newFilters: SearchFilters) => {
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value.toString());
    });
    router.push(`/search?${params.toString()}`);
  };

  // if the search flag is disabled, show the not found screen.
  if (!FEATURE_FLAGS.isSearchEnabled) return <NotFound />;

  return (
    <Container id="search-page" sx={{ mt: 4, mb: 8 }}>
      <SearchHero />
      {/* Main content area with filters on the left and the college cards 
      with the results on the right */}
      <Grid container spacing={4}>
        {/* Left Side: Filter Sidebar */}
        <Grid size={{ xs: 12, md: 3 }}>
          <FilterSidebar
            currentFilters={getFiltersFromURL()}
            onApply={handleApplyFilters}
          />
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
            <Grid
              container
              spacing={3}
              component="ul"
              aria-label="List of colleges"
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
                <Pagination
                  aria-label="Reviews pagination"
                  count={totalPages}
                  page={page}
                  color="primary"
                  sx={{ py: 2, justifySelf: "center" }}
                  onChange={(_, value) => setPage(value)}
                />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <Container sx={{ mt: 10, textAlign: "center" }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>Loading Search...</Typography>
        </Container>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
