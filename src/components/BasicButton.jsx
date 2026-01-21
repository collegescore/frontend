import React from 'react';
import { Button } from '@mui/material';

/**
 * Reusable "Add Review" Button Component
 * Accepts 'sx' props so we can style margins differently for mobile vs desktop
 **/
const BasicButton = ({ text, color, sx = {} }) => (
  <Button 
    variant="contained" 
    color={color || "primary"} 
    href="/review"
    sx={{ fontWeight: 600, ...sx }} // Merge default styles with passed styles
  >
    {text || "Basic Button"}
  </Button>
);

export default BasicButton;