"use client";

import { use, useState, useEffect } from "react";
import ReviewCard from "@/components/college/ReviewCard";
import {
  Box,
  Container,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import { ReviewEntry } from "@/types/review_entry";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { College } from "@/types/college";
import CollegeCard from "@/components/common/CollegeCard";
import { FEATURE_FLAGS } from "@/config/flag";
import NotFound from "@/app/not-found";
import SummaryCard from "@/components/college/SummaryCard";
import { getCollegeReviews, getCollege } from "@/lib/api";
import { loadData } from "@/lib/utils";

export default function CollegeSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<ReviewEntry[]>([]);
  const [college, setCollege] = useState<College | null>(null);

  //load colleges info from the backend
  useEffect(() => {
    if (!FEATURE_FLAGS.isCollegePageBackendEnabled) return;
    loadData(
      () => getCollege(slug),
      setCollege,
      setError,
      setLoading,
      "Failed to load college information.",
    )();
  }, [slug]);

  //load the reviews from the backend
  useEffect(() => {
    if (!FEATURE_FLAGS.isCollegePageBackendEnabled) return;
    loadData(
      () => getCollegeReviews(slug),
      setReviews,
      setError,
      setLoading,
      "Failed to load college reviews.",
    )();
  }, [slug]);

  // if the search flag is disabled, show the not found screen.
  if (!FEATURE_FLAGS.isSearchEnabled) {
    return <NotFound />;
  }

  return (
    <>
      {loading ? (
        //While data is loading show loading symbol
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : error || !college ? (
        //Error or college not found
        <Typography color="error" textAlign="center">
          {error || "College not found."}
        </Typography>
      ) : (
        //Data loaded successfully
        <Container id="{slug}-page" sx={{ mt: 4, mb: 9 }}>
          {/**Hero version of the college card from the search page */}
          <CollegeCard variant="hero" college={college} />

          <Grid container spacing={3} py={4} alignItems="start">
            {/* Left Side: Summary Cards (NOT YET IMPLEMENTED, JUST UI PLACEHOLDER) */}
            {/*Stick summary cards to the top of the page so they are always visible as you scroll through reviews*/}
            {FEATURE_FLAGS.isReviewSummariesEnabled && ( //hide until feature flag is enabled
              <Grid
                size={{ xs: 12, md: 3 }}
                sx={{
                  position: { xs: "static", md: "sticky" }, //sticky only for desktop
                  top: { md: 80 },
                }}
              >
                <aside id="response-summaries">
                  <SummaryCard
                    title="Accommodations"
                    content="filler content"
                  />
                  <SummaryCard title="Inclusivity" content="filler content" />
                  <SummaryCard title="Safety" content="filler content" />
                </aside>
              </Grid>
            )}
            {/* Right Side: Reviews Grid */}
            <Grid
              size={{
                xs: 12,
                md: FEATURE_FLAGS.isReviewSummariesEnabled ? 9 : 12, //Take up full width if summary cards not enabled
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 4,
                }}
              >
                <Typography
                  id="reviews-header"
                  variant="h4"
                  component="h2"
                  sx={{ fontWeight: 800 }}
                >
                  Student Reviews ({reviews.length})
                </Typography>
                {FEATURE_FLAGS.isReviewSortEnabled && ( //hide until feature flag is enabled
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <FilterAltOutlinedIcon fontSize="small" />
                    {/* TODO: Add functionality for filter and sort via dropdown */}
                  </Box>
                )}
              </Box>
              <Box
                aria-labelledby="reviews-header"
                component="ul"
                sx={{
                  listStyle: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {/*Get reviews from backend as list items */}
                {reviews.map((review, index) => (
                  <Box component="li" key={review.id}>
                    <ReviewCard review={review} reviewNumber={index + 1} />
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
}
