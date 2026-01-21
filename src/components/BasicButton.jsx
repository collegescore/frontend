import React from 'react';
import { Button } from '@mui/material';

/**
 * Reusable "Add Review" Button Component
 * Accepts 'sx' props so we can style margins differently for mobile vs desktop
 **/
const BasicButton = ({ text, color, href, sx = {} }) => (
  <Button 
    variant="contained" 
    // color defaults to primary if not provided
    color={color || "primary"} 
    href={href}
    // default fontWeight of 600, can be overridden by sx prop
    sx={{ fontWeight: 600, ...sx }} 
  >
    {text || "Basic Button"}
  </Button>
);

export default BasicButton;