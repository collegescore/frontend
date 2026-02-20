import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Button,
} from "@mui/material";
import Link from "next/link";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";

interface College {
  slug: string;
  name: string;
  city: string;
  state: string; // this is the state abbreviation (e.g., "CA" for California)
  a11y_overall: number;
  safety_overall: number;
  inclusivity_overall: number;
  num_reviews: number;
}

const CollegeCard = ({ college }: { college: College }) => {
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
            variant="h6"
            component="h3"
            sx={{ fontWeight: 800, color: "text.primary", mb: 0.5 }}
          >
            {college.name}
          </Typography>
          <Typography
            variant="body1"
            component="h4"
            color="text.secondary"
            sx={{ fontWeight: 500 }}
          >
            {college.city}, {college.state}
          </Typography>
        </header>

        <Divider sx={{ my: 2 }} aria-hidden="true" />

        {/* Semantic Ratings Section */}
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
              <StarRateRoundedIcon
                sx={{ fontSize: "1.2rem", color: "primary.main", mr: 0.2,
                     stroke: 'currentColor',
                     strokeWidth: 2, // Increase this number to make it even puffier
                     strokeLinecap: 'round',
                     strokeLinejoin: 'round',
                     paintOrder: 'stroke'}}
              />
              <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1 }}>
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
              <StarRateRoundedIcon
                sx={{ fontSize: "1.2rem", color: "primary.main", mr: 0.2,
                     stroke: 'currentColor',
                     strokeWidth: 2, // Increase this number to make it even puffier
                     strokeLinecap: 'round',
                     strokeLinejoin: 'round',
                     paintOrder: 'stroke'}}
              />
              <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1 }}>
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
              <StarRateRoundedIcon
                sx={{ fontSize: "1.2rem", color: "primary.main", mr: 0.2,
                     stroke: 'currentColor',
                     strokeWidth: 2, // Increase this number to make it even puffier
                     strokeLinecap: 'round',
                     strokeLinejoin: 'round',
                     paintOrder: 'stroke'}}
              />
              <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1 }}>
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
          <Typography
            variant="caption"
            sx={{ fontWeight: 600, color: "text.secondary" }}
          >
            {college.num_reviews} reviews
          </Typography>

          <Link href={`/colleges/${college.slug}`} passHref legacyBehavior>
            <Button
              size="small"
              variant="outlined"
              sx={{
                fontWeight: 700,
                borderRadius: 2,
                textTransform: "none",
              }}
            >
              View School
            </Button>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CollegeCard;
