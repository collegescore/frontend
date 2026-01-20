import React from 'react';
import { Button } from '@mui/material';

/**
 * Reusable "Add Review" Button Component
 * Accepts 'sx' props so we can style margins differently for mobile vs desktop
 **/
const AddReviewButton = ({ sx = {} }) => (
  <Button 
    variant="contained" 
    color="primary" 
    href="/review"
    sx={{ fontWeight: 600, ...sx }} // Merge default styles with passed styles
  >
    Add a Review
  </Button>
);

export default AddReviewButton;