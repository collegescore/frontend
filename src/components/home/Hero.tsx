import Section from "../common/Section";
import { Container, Typography, Box } from "@mui/material";
import { UniversitySearch } from "../common/UniversitySearch";
import AddReviewButton from "../common/AddReviewButton";

const HeroSection = () => {
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
        <Typography
          variant="h6"
          component="p"
          sx={{
            mb: 4,
            opacity: 0.9,
            fontWeight: 500,
            maxWidth: "600px",
            mx: "auto",
            lineHeight: 1.6,
            color: "grayscale.main",
          }}
        >
          20% of College Students are disabled, but 100% of schools fail to
          disclose how well they meet accessibility needs. College Score is
          working to change that.
        </Typography>
        <UniversitySearch/>
        <AddReviewButton text="Add Your Review" color="primary"/>
      </Container>
    </Section>
  );
};

export default HeroSection;
