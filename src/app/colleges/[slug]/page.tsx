"use client";

import { use, useState, useEffect, useRef } from "react";
import ReviewCard from "@/components/college/ReviewCard";
import {
  Box,
  Container,
  Grid,
  Typography,
  CircularProgress,
  Pagination,
} from "@mui/material";
import { ReviewEntry } from "@/types/review_entry";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { College } from "@/types/college";
import CollegeCard from "@/components/common/CollegeCard";
import { FEATURE_FLAGS } from "@/config/flag";
import NotFound from "@/app/not-found";
import SummaryCard from "@/components/college/SummaryCard";
import { getCollegeReviews, getCollege } from "@/lib/api";
import { loadData, scrollToElement } from "@/lib/utils";
import Section from "@/components/common/Section";
import ScreenReaderAnnouncement from "@/components/common/ScreenReaderAnnouncement";

export default function CollegeSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [error, setError] = useState<string>("");
  const [collegeLoading, setCollegeLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviews, setReviews] = useState<ReviewEntry[]>([]);
  const [college, setCollege] = useState<College | null>(null);
  const [page, setPage] = useState<number>(1);
  const [liveAnnouncement, setLiveAnnouncement] = useState("");
  const hasMountedRef = useRef(false);
  const PAGE_SIZE = 4; //Number of reviews shown per page
  const totalPages = college
    ? Math.max(1, Math.ceil(college.num_reviews / PAGE_SIZE))
    : 1;

  //load colleges info from the backend
  useEffect(() => {
    if (!FEATURE_FLAGS.isCollegePageBackendEnabled) return;
    const loadCollege = async () => {
      setCollegeLoading(true);
      const result = await loadData(
        () => getCollege(slug),
        "Failed to load college information.",
      );

      if (result.error) {
        setError(result.error);
      } else if (result.data) {
        setCollege(result.data);
      }

      setCollegeLoading(false);
    };

    loadCollege();
  }, [slug]);

  //load the reviews from the backend
  useEffect(() => {
    if (!FEATURE_FLAGS.isCollegePageBackendEnabled) return;
    const loadReviews = async () => {
      setReviewsLoading(true);
      try {
        const data = await getCollegeReviews(slug, { page, limit: PAGE_SIZE });
        setReviews(data);
        setError("");
        // Announces when the new reviews page has finished loading
        setLiveAnnouncement(
          `Page ${page} loaded. Showing ${data.length} reviews.`,
        );
      } catch {
        setError("Failed to load college reviews.");
      } finally {
        setReviewsLoading(false);
      }
    };

    loadReviews();
  }, [slug, page]);

  /** Scroll to top when page changes */
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    requestAnimationFrame(() => {
      scrollToElement("reviews-header");
    });
  }, [page]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    // Announces that a new reviews page is loading
    setLiveAnnouncement(`Loading reviews page ${value}`);
    setPage(value);
  };

  // if the search flag is disabled, show the not found screen.
  if (!FEATURE_FLAGS.isSearchEnabled) {
    return <NotFound />;
  }

  return (
    <>
      {collegeLoading ? (
        //While data is loading show loading symbol
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : !college ? (
        //College not found
        <NotFound />
      ) : (
        //Data loaded successfully
        <Container id="{slug}-page" sx={{ mt: 4, mb: 9 }}>
          {/**Hero version of the college card from the search page **/}
          <CollegeCard variant="hero" college={college} />

          {college.num_reviews === 0 ? (
            <Section>
              <Typography textAlign="center">
                No reviews available. If you are a student at this institution,
                consider submitting a review!
              </Typography>
            </Section>
          ) : error ? (
            // Only reach here if college exists AND has reviews BUT the reviews fetch failed
            <Section>
              <Typography color="error" textAlign="center" role="alert">
                {error}
              </Typography>
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
                    Student Reviews ({college.num_reviews})
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
                  aria-busy={reviewsLoading}
                  sx={{
                    listStyle: "none",
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  {/*Get reviews from backend as list items */}
                  {reviewsLoading ? (
                    <Box
                      sx={{ display: "flex", justifyContent: "center", py: 4 }}
                    >
                      <CircularProgress color="primary" />
                    </Box>
                  ) : (
                    reviews.map((review, index) => (
                      <Box component="li" key={review.id}>
                        <ReviewCard
                          review={review}
                          reviewNumber={(page - 1) * PAGE_SIZE + index + 1}
                        />
                        {/* Ensures the review number is correctly calculated based on the current page and index
                          page 1: reviews 1-4, page 2: reviews 5-8, etc. */}
                      </Box>
                    ))
                  )}
                </Box>
                <Pagination
                  aria-label="Reviews pagination"
                  count={totalPages}
                  page={page}
                  color="primary"
                  sx={{ py: 3, justifySelf: "center" }}
                  onChange={handlePageChange}
                />

                {/* Announces pagination status updates (loading and loaded page summaries) */}
                <ScreenReaderAnnouncement message={liveAnnouncement} />
              </Grid>
            </Grid>
          )}
        </Container>
      )}
    </>
  );
}
