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
import Section from "@/components/common/Section";

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
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const PAGE_SIZE = 6; //Number of reviews shown per page

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
  
  // once college loads, compute total pages
  useEffect(() => {
    if (!college) return;
    setTotalPages(Math.ceil(college.num_reviews / PAGE_SIZE));//Round up to nearest whole number
  }, [college]);

  //load the reviews from the backend
  useEffect(() => {
    if (!FEATURE_FLAGS.isCollegePageBackendEnabled) return;
    loadData(
      () => getCollegeReviews(slug, { page, limit: PAGE_SIZE }),
      setReviews,
      setError,
      setLoading,
      "Failed to load college reviews.",
    )();
  }, [slug, page]);

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
      ) : !college ? (
        //College not found
        <NotFound />
        
      ): (
        //Data loaded successfully
        <Container id="{slug}-page" sx={{ mt: 4, mb: 9 }}>
          {/**Hero version of the college card from the search page **/}
          <CollegeCard variant="hero" college={college} />

          {college.num_reviews === 0 ? (
          <Section>
            <Typography textAlign="center">
              No reviews available. If you are a student at this institution, consider submitting a review!
            </Typography>
          </Section>
          ) : error ? (
            // Only reach here if college exists AND has reviews BUT the reviews fetch failed
            <Section>
              <Typography color="error" textAlign="center">{error}</Typography>
            </Section>
          ) : (
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
          )}
        </Container>
      )}
    </>
  );
}
