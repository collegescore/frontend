import React from "react";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import BasicButton from "./BasicButton";
import { College } from "@/types/college";
import RatingsSection from "./RatingsSection";
import AddReviewButton from "./AddReviewButton";
import { Add } from "@mui/icons-material";

type CollegeCardProps = {
  college: College;
  variant?: "card" | "hero";
  showHover?: boolean;
};

/**College Card component can have varients for cards or make the card into a hero for the college page */
const CollegeCard = (props: CollegeCardProps) => {
  const { college, variant = "card", showHover = variant === "card" } = props;
  //make component card varient by default and only show hover effect if it's a card.

  return (
    <Card
      component={variant === "hero" ? "section" : "article"}
      sx={{
        width: "100%",
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: 2,
        height: variant === "card" ? "100%" : "auto",
        display: "flex",
        flexDirection: "column",
        ...(showHover && { //only apply hover effect if showHover is true
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            boxShadow: 6,
            transform: "translateY(-4px)", // Subtle lift effect
          },
        }),
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
            component={variant === "hero" ? "h1" : "h3"}
            sx={{ fontWeight: 800, color: "text.primary", mb: 0.5 }}
          >
            {college.name}
          </Typography>
          <Typography
            variant="body2"
            component="p"
            color="text.secondary"
            sx={{ fontWeight: 550 }}
          >
            {college.city}, {college.state}
          </Typography>
        </header>

        {/* Ratings Section where we show the college's overall scores for a11y, safety, and inclusivity */}
        <RatingsSection ratings={college.ratings || {}} />

        {/* footer which contains the total number of reviews for this college 
        and a button to go to the specific college page.*/}
        <Box
          component={variant === "hero" ? "div" : "footer"}
          sx={{
            mt: variant === "card" ? "auto" : 0,
            pt: 3,
            display: "flex",
            justifyContent: variant === "hero" ? "flex-start" : "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          {variant === "card" && (
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {college.num_reviews} reviews
            </Typography>
          )}

          {variant === "card" ? (
            <BasicButton
              text="See More"
              href={`/colleges/${college.slug}`}
              sx={{ fontSize: "0.875rem", px: 2, py: 0.5 }}
            />
          ) : ( //For the hero varianent 
            <>
              <AddReviewButton schoolSlug={college.slug} />
              <BasicButton
                text="CeDaR"
                href="/colleges/${college.slug}"
                disabled={true} // Disable the button for now since the college page isn't built out yet
              />
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CollegeCard;
