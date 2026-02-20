"use client";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Link as MuiLink,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import NextLink from "next/link";
import AddReviewButton from "../common/AddReviewButton";
import { FEATURE_FLAGS } from "@/config/flag";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");

  // List of navigation links
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Search", href: "/search" },
    { name: "About", href: "/about" },
  ].filter((link) => {
    // If the link is 'Search' and search is NOT enabled, hide it
    if (link.name === "Search" && !FEATURE_FLAGS.isSearchEnabled) {
      return false;
    }
    return true;
  });

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      component="header"
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider", // Uses the standard MUI divider color, a subtle gray
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* Logo which also functions as Home Link */}
          <Typography
            variant="h6"
            component="div"
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

          {/* Navigation Link Section - Desktop */}
          <Box
            component="nav"
            sx={{
              display: { xs: "none", md: "flex" },
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
                    color: "grayscale.dark", // changes to darker gray on hover/click
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
            <AddReviewButton
              text="Add Review"
              color="primary"
              ariaLabel="Add Review"
            />
          </Box>

          {/* Hamburger Menu - Mobile */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              onClick={handleMobileMenuToggle}
              aria-label="Open navigation menu"
              sx={{
                color: "grayscale.dark",
                "&:focus-visible": {
                  outline: "2px solid",
                  outlineColor: "primary.main",
                  outlineOffset: "4px",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="top"
        open={mobileMenuOpen}
        onClose={handleMobileMenuClose}
        sx={{
          "& .MuiDrawer-paper": {
            marginTop: "56px", // Below the header
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Menu
          </Typography>
          <IconButton
            onClick={handleMobileMenuClose}
            aria-label="Close navigation menu"
            sx={{
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: "4px",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navLinks.map((link) => (
            <ListItem key={link.name} disablePadding>
              <ListItemButton
                component={NextLink}
                href={link.href}
                onClick={handleMobileMenuClose}
                sx={{
                  color: "grayscale.main",
                  fontWeight: 525,
                  "&:focus-visible": {
                    outline: "2px solid",
                    outlineColor: "primary.main",
                    outlineOffset: "4px",
                  },
                }}
              >
                {link.name}
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleMobileMenuClose}
              component={NextLink}
              href="/review"
              sx={{
                color: "primary.main",
                fontWeight: 600,
                "&:focus-visible": {
                  outline: "2px solid",
                  outlineColor: "primary.main",
                  outlineOffset: "4px",
                },
              }}
            >
              Add Review
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;
