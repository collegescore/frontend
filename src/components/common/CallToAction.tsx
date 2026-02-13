"use client";

import React from "react";
import { Container, Typography } from "@mui/material";
import AddReviewButton from "./AddReviewButton";
import Section from "./Section";
import Subtitle from "./Subtitle";

const CTASection = () => {
  return (
    <Section bgcolor="primary.main" id="cta-section">
      <Container
        sx={{
          color: "white",
          textAlign: "center",
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

        <Subtitle sx={{ color: "white" }}>
          Help prospective and current students make informed decisions by sharing your
          experience.
        </Subtitle>

        <AddReviewButton text="Rate your school" color="secondary" />
      </Container>
    </Section>
  );
};

export default CTASection;
