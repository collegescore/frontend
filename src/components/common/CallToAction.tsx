"use client";

import React from "react";
import { Box, Container, Typography } from "@mui/material";
import AddReviewButton from "./AddReviewButton";

const CTASection = () => {
  return (
    <Container
      component="section"
      id="cta-section"
      sx={{
        bgcolor: "primary.main",
        color: "white",
        textAlign: "center",
        width: "100%",
      }}
    >
      <Typography
        variant="h2"
        component="h2"
        sx={{
          fontWeight: 800,
          mb: 2,
          fontSize: { xs: "2.25rem", sm: "3rem", md: "3.75rem" },
          lineHeight: 1.2,
        }}
      >
        Share your experience
      </Typography>

      <Typography
        //styled like h6, but semantically a paragraph for screen readers
        variant="h6"
        component="p"
        sx={{
          mb: 4,
          opacity: 0.9,
          fontWeight: 400,
          maxWidth: "600px",
          mx: "auto",
          lineHeight: 1.6,
        }}
      >
        Help prospective students make informed decisions by sharing your
        experience.
      </Typography>

      <AddReviewButton text="Rate your school" color="secondary" />
    </Container>
  );
};

export default CTASection;
