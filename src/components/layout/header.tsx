"use client";
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";
import NextLink from "next/link";
import BasicButton from "../common/button";

const Header = () => {
  // List of navigation links
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Search", href: "/search" },
    { name: "About", href: "/about" },
  ];

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      component="header" // Accessibility landmark
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider", // Uses the standard MUI divider color (very subtle)
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* Logo which also functions as Home Link */}
          <Typography
            variant="h6" // Visual size (Small)
            component="h1" // Semantic level (A11y Top Level)
            sx={{
              fontWeight: 700,
              textDecoration: "none",
              color: "grayscale.dark",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              College Score
            </Link>
          </Typography>

          {/* Navigation Section */}
          <Box
            component="nav"
            sx={{
              display: "flex",
              gap: 4,
              alignItems: "center",
            }}
          >
            {navLinks.map((link) => (
              <MuiLink
                key={link.name}
                component={NextLink}
                href={link.href}
                underline="none"
                sx={{
                  color: "grayscale.main",
                  fontWeight: 525,
                  transition: "color 0.2s ease-in-out",
                  "&:hover": {
                    color: "grayscale.dark", // changes to darker gray on click
                  },
                  "&:focus-visible": {
                    outline: "2px solid",
                    outlineColor: "primary.main",
                    outlineOffset: "4px",
                  },
                }}
              >
                {link.name}
              </MuiLink>
            ))}

            {/* Call to action button to add a review */}
            <BasicButton text="Add Review" href="/add-review" />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
