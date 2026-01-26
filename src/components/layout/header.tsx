"use client";
import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import Link from 'next/link';
import BasicButton from '../common/button';

const Header = () => {
  // List of navigation links
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Search', href: '/search' },
    { name: 'About', href: '/about' },
  ];

  return (
    <AppBar 
      position="sticky" 
      color="inherit" 
      elevation={1} 
      component="header" // Accessibility landmark
    >

      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo / Home Link */}
          <Typography
            variant="h6"      // Visual size (Small)
            component="h1"    // Semantic level (A11y Top Level)
            sx={{
              fontWeight: 600,
              textDecoration: 'none',
              color: 'grayscale.dark',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              CollegeScore
            </Link>
          </Typography>

          {/* Navigation Items */}
          <Box component="nav" sx={{ display: 'flex', gap: 2 }}>
            <BasicButton text="Add Review" href="/add-review" />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;