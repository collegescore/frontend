import React from "react";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import { ReviewEntry } from "@/types/review_entry";
import RatingsSection from "../common/RatingsSection";


const ReviewCard = (props: { review: ReviewEntry }) => {
  const { review } = props;
  return (
    <Card
      component="article"
      sx={{
        width: "100%",
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-4px)", // Subtle lift effect
        },
      }}
    >
        {/* Visual Accent */}
      <Box role="presentation" sx={{ height: 64, bgcolor: "primary.main" }} />

      <CardContent
        sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        {/* header section with the college name and location (city, state abbreviation) */}
        <header>
          <Typography
            variant="h5"
            component="h3"
            sx={{ fontWeight: 800, color: "text.primary", mb: 0.5 }}
          >Review Name Filler
          </Typography>
          <Typography
            variant="body2"
            component="p"
            color="text.secondary"
            sx={{ fontWeight: 550 }}
          >
            {review.review_date}
          </Typography>
        </header>

        {/* Ratings Section where we show the college's overall scores for a11y, safety, and inclusivity */}
        <RatingsSection ratings={review.ratings || {}} />

      </CardContent>

    </Card>

  );
};

export default ReviewCard;