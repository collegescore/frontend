import React from "react";
import ReviewCard from "@/components/college/ReviewCard";
import { Box, Container, Grid, Typography, Select, FormControl, InputLabel, MenuItem, Button } from "@mui/material";
import { Ratings } from "@/types/ratings";
import { ReviewEntry } from "@/types/review_entry";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { College } from "@/types/college";
import CollegeCard from "@/components/common/CollegeCard";
import FilterSidebar from "@/components/search/FilterSidebar";
import { FEATURE_FLAGS } from "@/config/flag";
import NotFound from "@/app/not-found";
import SummaryCard from "@/components/college/SummaryCard";

export default function CollegeSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  // if the search flag is disabled, show the not found screen.
  if (!FEATURE_FLAGS.isSearchEnabled) {
      return <NotFound />;
  }

  return (
    <div>
      <h1>College: {params.slug}</h1>
      <p>This page is under construction.</p>
  
    

    {/*Individual Review Cards */}
    <Container id="{slug}-page" sx={{ mt: 4, mb: 9 }}>
     
     {/*School landing*/}

      <CollegeCard variant="hero" college={{
        id: 1,
        slug: "example-university",
        name: "Example University",
        city: "Example City",
        state: "EX",
        ratings: {
          a11y_overall: 4,
          safety_overall: 5,
          inclusivity_overall: 4
        },
        num_reviews: 123
      }} />

      <Grid container spacing={3} py={4}>
        {/* Left Side: Summary Cards */}
        <Grid size={{ xs: 12, md: 3 }}>
          <aside id="response-summaries">
            <SummaryCard title="Accommodations" content="filler content"/>
            <SummaryCard title="Inclusivity" content="filler content"/>
            <SummaryCard title="Safety" content="filler content"/>
          </aside>
        </Grid>

        {/* Right Side: Reviews Grid */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 800}}>
              Student Reviews
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <FilterAltOutlinedIcon />
              <Button variant="outlined" disabled={true} size="medium">Filter & Sort</Button> {/* Replace with functional select in the future */}
            </Box>
            {/* Sorting Dropdown - functionality to be implemented in the future */}
          </Box>
          <ReviewCard review={{
            review_date: "2024-06-26",
            identity_chips: ["wheelchair user", "LGBTQ+"],
            share_accommodations_text: "The college provides excellent accommodations for students with disabilities.",
            share_positive_text: "The campus is very inclusive and welcoming.",
            share_challenges_text: "Navigating some older buildings can be challenging.",
            share_community_groups_text: "There are several active student organizations focused on accessibility and LGBTQ+ issues.",
            ratings: {
              a11y_overall: 4,
              safety_overall: 5,
              inclusivity_overall: 5
            }
          }} />
        </Grid>
      
      </Grid>
    </Container>
    </div>
  );
}
