import React from "react";
import { Card, CardContent, Typography, Box, Divider, Chip } from "@mui/material";
import { ReviewEntry } from "@/types/review_entry";
import RatingsSection from "../common/RatingsSection";
import ShareText from "./ShareText";


const ReviewCard = (props: { review: ReviewEntry }) => {
  const { review } = props;
  return (
    <Card
      component="article"
      variant="outlined"
      sx={{
        width: "100%",
        borderRadius: 2,
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >

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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Chip label="Identity" color="primary" />
            <Typography
                variant="body2"
                component="p"
                color="text.secondary"
                sx={{ fontWeight: 550 }}
            >
                {review.review_date}
            </Typography>
          </Box>
          
        </header>

        {/* Ratings Section where we show the college's overall scores for a11y, safety, and inclusivity */}
        <RatingsSection ratings={review.ratings || {}} />

        <Divider sx={{ my: 2 }} />

        {/* Review Text Sections: Only show up if there is text to display */}
        {review.share_accommodations_text && (
        <ShareText sectionName="Accommodations" text={review.share_accommodations_text} />
        )}
        {review.share_positive_text && (
        <ShareText sectionName="Positive Experiences" text={review.share_positive_text} />
        )}
        {review.share_challenges_text && (
        <ShareText sectionName="Challenges" text={review.share_challenges_text} />
        )}

      </CardContent>

    </Card>

  );
};

export default ReviewCard;