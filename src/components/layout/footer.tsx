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
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import NextLink from "next/link";
import { FEATURE_FLAGS } from "@/config/flag";

const Footer = () => {
  return (
    <Box component="footer" bgcolor="grayscale.dark" py={{ xs: 8, md: 10 }}>
      <Container sx={{ color: "white" }}>
        <Grid container spacing={4}>
          {/* Column 1: Logo/Branding and contributing link*/}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                College Score
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                Real reviews from real students. <br />
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                Join Us?
              </Typography>
              <Typography variant="body2">
                College Score is an open source project!
              </Typography>
              <Typography variant="body2">
                Learn how to contribute{" "}
                <MuiLink
                  href="https://github.com/collegescore/documentation" // TODO: replace with link to contributing md file once the overhaul branch is merged
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "common.white",
                    display: "inline-flex",
                    alignItems: "center",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  here
                  <OpenInNewIcon sx={{ fontSize: "0.9rem", ml: 0.5 }} />
                </MuiLink>
              </Typography>
            </Box>
          </Grid>

          {/* Column 2: Quick Links */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="body2"
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
                {/* Only show Search Schools if the flag is true */}
                {FEATURE_FLAGS.isSearchEnabled && (
                  <MuiLink
                    component={NextLink}
                    href="/search"
                    color="inherit"
                    underline="hover"
                  >
                    Search Schools
                  </MuiLink>
                )}
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
                <MuiLink
                  component={NextLink}
                  href="/privacy"
                  color="inherit"
                  underline="hover"
                >
                  Privacy Policy
                </MuiLink>
              </Stack>
            </nav>
          </Grid>

          {/* Column 3: CREATE Acknowledgment */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Acknowledgment
            </Typography>
            <Typography variant="body2">
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
