"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
  Grid,
  Stack,
} from "@mui/material";
import NextLink from "next/link";

const Footer = () => {
  return (
    <Box component="footer" bgcolor="grayscale.dark" py={{ xs: 8, md: 10 }}>
      <Container sx={{ color: "white" }}>
        <Grid container spacing={4}>
          {/* Column 1: Logo/Branding */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
              College Score
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Real reviews from real students. <br />
            </Typography>
          </Grid>

          {/* Column 2: Quick Links */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="subtitle1"
              id="footer-links"
              sx={{ fontWeight: 700, mb: 2 }}
            >
              Quick Links
            </Typography>

            <nav aria-labelledby="footer-links">
              <Stack spacing={1}>
                <MuiLink
                  component={NextLink}
                  href="/"
                  color="inherit"
                  underline="hover"
                >
                  Home
                </MuiLink>
                <MuiLink
                  component={NextLink}
                  href="/search"
                  color="inherit"
                  underline="hover"
                >
                  Search Schools
                </MuiLink>
                <MuiLink
                  component={NextLink}
                  href="/about"
                  color="inherit"
                  underline="hover"
                >
                  About Us
                </MuiLink>
                <MuiLink
                  component={NextLink}
                  href="/review"
                  color="inherit"
                  underline="hover"
                >
                  Write a Review
                </MuiLink>
              </Stack>
            </nav>
          </Grid>

          {/* Column 3: CREATE Acknowledgment */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Acknowledgment
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, lineHeight: 1.6 }}>
              We are proud to be part of <strong>CREATE</strong>, the Center for
              Research and Education on Accessible Technology and Experiences.
              As such, our mission is to make education accessible and to make
              the world accessible through education.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
