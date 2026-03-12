"use client";

import React, {
  useEffect,
  useState,
  useCallback,
  Suspense,
  useRef,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Grid,
  Pagination,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import NotFound from "../not-found";
import { FEATURE_FLAGS } from "@/config/flag";
import SearchHero from "@/components/search/Hero";
import CollegeCard from "@/components/common/CollegeCard";
import { College } from "@/types/college";
import { SearchFilters } from "@/types/search_filters";
import { filterColleges, getFilteredCollegesCount } from "@/lib/api";
import FilterSidebar from "@/components/search/FilterSidebar";
import ScreenReaderAnnouncement from "@/components/common/ScreenReaderAnnouncement";

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = useTheme();
  const isLowerBreakpoint = useMediaQuery(theme.breakpoints.down("md"));
  const searchQueryKey = searchParams.toString(); //used to signial filter change to setPage
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [listLoading, setListLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [liveAnnouncement, setLiveAnnouncement] = useState("");
  const hasLoadedOnceRef = useRef(false);
  const PAGE_SIZE = isLowerBreakpoint ? 6 : 12;

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
    if (hasLoadedOnceRef.current) {
      setListLoading(true);
      setLiveAnnouncement(`Loading colleges page ${page}`);
    } else {
      setLoading(true);
    }
    try {
      const filters = getFiltersFromURL(); //which colleges match
      const listParams = { ...filters, page, limit: PAGE_SIZE }; //which slice of matching colleges to return now
      // pass the filters to the filterColleges route
      const data = await filterColleges(listParams);
      const totalCount = await getFilteredCollegesCount(filters); //will always be >=0
      // the colleges to display are the result of the query with filters
      setColleges(data);
      // compute total pages based on the number of colleges and page size
      setTotalPages(Math.max(1, Math.ceil(totalCount / PAGE_SIZE)));
      setLiveAnnouncement(
        `Page ${page} loaded. Showing ${data.length} colleges.`,
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "We're having trouble loading the colleges right now.";
      setError(errorMessage);
      setLiveAnnouncement(errorMessage);
    } finally {
      setLoading(false);
      setListLoading(false);
      hasLoadedOnceRef.current = true;
    }
  }, [getFiltersFromURL, page, PAGE_SIZE]);

  useEffect(() => {
    // check if search is enabled before trying to load data (find the colleges to display)
    if (!FEATURE_FLAGS.isSearchEnabled) return;
    loadData();
  }, [loadData]);

  useEffect(() => {
    setPage(1);
  }, [searchQueryKey, PAGE_SIZE]);

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
      <Grid container spacing={4} alignItems="start">
        {/* Left Side: Filter Sidebar */}
        <Grid
          size={{ xs: 12, md: 3 }}
          sx={{
            position: { xs: "static", md: "sticky" }, //sticky only for desktop
            top: { md: 80 },
            alignSelf: "start",
          }}
        >
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
            <>
              <Box aria-busy={listLoading}>
                {listLoading ? ( //only show loading for the list, not the entire page when moving pages
                  <Box
                    sx={{ display: "flex", justifyContent: "center", py: 8 }}
                  >
                    <CircularProgress color="primary" />
                  </Box>
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
                  </Grid>
                )}
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
                <Pagination
                  aria-label="Colleges pagination"
                  count={totalPages}
                  page={page}
                  color="primary"
                  disabled={listLoading}
                  onChange={(_, value) => setPage(value)}
                />
              </Box>
              <ScreenReaderAnnouncement message={liveAnnouncement} />
            </>
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
