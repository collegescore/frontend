import Section from "../common/Section";
import { Container, Typography, Box } from "@mui/material";
import { UniversitySearch } from "../common/UniversitySearch";
import AddReviewButton from "../common/AddReviewButton";
import Subtitle from "../common/Subtitle";
import { useState } from "react";
import { College } from "@/types/college";

const HeroSection = () => {
  //track if user has selected a college from the search bar
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);

  return (
    <Section bgcolor="grayscale.light" id="hero-section">
      <Container
        sx={{
          color: "black",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontWeight: 800,
            mb: 2,
            fontSize: { xs: "2.25rem", sm: "3rem", md: "3.75rem" },
            lineHeight: 1.2,
          }}
        >
          Find{" "}
          <Box component="span" sx={{ color: "primary.main" }}>
            YOUR
          </Box>{" "}
          Fit
        </Typography>
        <Subtitle>
          20% of College Students are disabled, but 100% of schools fail to
          disclose up-to-date accessibility data. College Score is working to
          change that.
        </Subtitle>
        <UniversitySearch onSelect={(college) => setSelectedCollege(college)} width="80%"/>
        <AddReviewButton
          text="Add Your Review"
          color="primary"
          schoolSlug={selectedCollege?.slug || undefined}
        />
      </Container>
    </Section>
  );
};

export default HeroSection;
