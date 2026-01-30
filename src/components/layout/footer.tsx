"use client";

import React from "react";
import Grid from "@mui/material/Grid";
import { Box, Container, Typography, Link as MuiLink } from "@mui/material";
import NextLink from "next/link";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: "grayscale.dark", color: "white", py: 6, mt: "auto" }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Column 1: College Score logo and brief blurb */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              College Score
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Empowering students through transparent, community-driven college
              reviews.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Quick Links
            </Typography>
            <Box
              component="nav"
              sx={{ display: "flex", flexDirection: "column", gap: 1 }}
            >
              {["Home", "Search", "About", "Add Review"].map((item) => (
                <MuiLink
                  key={item}
                  component={NextLink}
                  href={
                    item === "Home"
                      ? "/"
                      : `/${item.toLowerCase().replace(" ", "-")}`
                  }
                  underline="hover"
                  sx={{
                    color: "white",
                    opacity: 0.8,
                    "&:hover": { opacity: 1 },
                  }}
                >
                  {item}
                </MuiLink>
              ))}
            </Box>
          </Grid>

          {/* Column 3: Research & Affiliation acknowledgement */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Research & Affiliation
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, lineHeight: 1.6 }}>
              College Score is a research initiative made possible by the
              <strong> CREATE </strong> lab. We focus on educational equity and
              data transparency in higher education.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
