import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Chip,
} from "@mui/material";
import { ReviewEntry } from "@/types/review_entry";
import RatingsSection from "../common/RatingsSection";
import ReviewFreeResponseSection from "./ReviewFreeResponseSection";

interface ReviewCardProps {
  review: ReviewEntry;
  reviewNumber?: number;
}

const ReviewCard = ({ review, reviewNumber }: ReviewCardProps) => {
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
        flexDirection: "column",
      }}
    >
      <CardContent
        sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        {/* header section with the college name and location (city, state abbreviation) */}
        <header>
          <Typography
            variant="h6"
            component="h3"
            sx={{ fontWeight: 800, color: "text.primary", mb: 0.5 }}
          >
            {`Review ${reviewNumber ?? 1}`}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            {review.identities?.map((identity) => (
              <Chip key={identity} label={identity} color="primary" />
            ))}
            <Typography
              variant="caption"
              component="p"
              color="text.secondary"
              sx={{ fontWeight: 500 }}
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
          <ReviewFreeResponseSection
            sectionName="Accommodations"
            text={review.share_accommodations_text}
          />
        )}
        {review.share_positive_text && (
          <ReviewFreeResponseSection
            sectionName="Positive Experiences"
            text={review.share_positive_text}
          />
        )}
        {review.share_challenges_text && (
          <ReviewFreeResponseSection
            sectionName="Challenges"
            text={review.share_challenges_text}
          />
        )}
        {review.share_groups_text && (
          <ReviewFreeResponseSection
            sectionName="Communities and Groups"
            text={review.share_groups_text}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
