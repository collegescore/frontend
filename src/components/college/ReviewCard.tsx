import React from "react";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { ReviewEntry } from "@/types/review_entry";

const ReviewCard = (props: { review: ReviewEntry }) => {
  const { review } = props;
  return (
    <Card
      component="article"
    >

    </Card>

  );
};

export default ReviewCard;