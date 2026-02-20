import React from "react";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import BasicButton from "./BasicButton";
import { College } from "@/types/college";

const CollegeCard = (props: { college: College }) => {
  const { college } = props;

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
        <header>
          <Typography
            variant="h4"
            component="h3"
            sx={{ fontWeight: 800, color: "text.primary", mb: 0.5 }}
          >
            {college.name}
          </Typography>
          <Typography
            variant="body2"
            component="h4"
            color="text.secondary"
            sx={{ fontWeight: 550 }}
          >
            {college.city}, {college.state}
          </Typography>
        </header>

        {/* Ratings Section where we show the college's overall scores for a11y, safety, and inclusivity */}
        <Box
          sx={{
            bgcolor: "grey.100", // Light gray background for the ratings section
            borderRadius: 3, // Rounded corners for the gray box
            p: 2, // Padding inside the gray box
            my: 2, // Margin top/bottom to separate from header/footer
          }}
        >
          <Box
            component="dl"
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 1,
              m: 0,
            }}
          >
            {/* Accessibility Block */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="dd"
                sx={{
                  m: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center", // This centers the icon+text group
                  color: "text.primary",
                }}
              >
                <StarRateRoundedIcon sx={{ color: "primary.main" }} />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 800, lineHeight: 1 }}
                >
                  {college.a11y_overall}
                </Typography>
              </Box>
              <Typography
                component="dt"
                variant="caption"
                sx={{ color: "text.secondary" }}
              >
                Accessibility
              </Typography>
            </Box>

            {/* Safety Block */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="dd"
                sx={{
                  m: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "text.primary",
                }}
              >
                <StarRateRoundedIcon sx={{ color: "primary.main" }} />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 800, lineHeight: 1 }}
                >
                  {college.safety_overall}
                </Typography>
              </Box>
              <Typography
                component="dt"
                variant="caption"
                sx={{ color: "text.secondary" }}
              >
                Safety
              </Typography>
            </Box>

            {/* Inclusivity Block */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="dd"
                sx={{
                  m: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "text.primary",
                }}
              >
                <StarRateRoundedIcon sx={{ color: "primary.main" }} />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 800, lineHeight: 1 }}
                >
                  {college.inclusivity_overall}
                </Typography>
              </Box>
              <Typography
                component="dt"
                variant="caption"
                sx={{ color: "text.secondary" }}
              >
                Inclusivity
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* footer which contains the total number of reviews for this college 
        and a button to go to the specific college page. */}
        <Box
          component="footer"
          sx={{
            mt: "auto",
            pt: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {college.num_reviews} reviews
          </Typography>

          <BasicButton
            text="See More"
            href={`/colleges/${college.slug}`}
            // make BasicButton smaller than usual for the card.
            sx={{ fontSize: "0.875rem", px: 2, py: 0.5 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CollegeCard;
