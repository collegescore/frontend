"use client";

import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import AddReviewButton from './AddReviewButton';

const CTASection = () => {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: { xs: 8, md: 12 }, // Increased padding for a more "hero" feel
        textAlign: 'center',
        width: '100%',
      }}
    >
      <Container maxWidth="md">
        <Typography 
          variant="h2" 
          component="h2" 
          sx={{ 
            fontWeight: 800, 
            mb: 2,
            fontSize: { xs: '2.25rem', sm: '3rem', md: '3.75rem' },
            lineHeight: 1.2
          }}
        >
          Share your experience
        </Typography>

        <Typography 
          variant="h6" 
          component="p"
          sx={{ 
            mb: 5, 
            opacity: 0.9, 
            fontWeight: 400,
            maxWidth: '600px',
            mx: 'auto',
            lineHeight: 1.6
          }}
        >
          Help prospective students make informed decisions by sharing your experience.
        </Typography>

        <AddReviewButton 
          text="Rate your school"
          sx={{ 
            bgcolor: 'white', 
            color: 'primary.main',
            px: 6, // Extra wide padding for a high-importance button
            py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 700,
            borderRadius: '8px',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              transform: 'translateY(-2px)', // Subtle lift effect
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        />
      </Container>
    </Box>
  );
};

export default CTASection;