"use client";

import React from 'react';
import BasicButton from './Button';
import { SxProps, Theme } from '@mui/material/styles';

interface AddReviewButtonProps {
  // Can choose text and color
  text?: string;
  color?: "primary" | "secondary" | "inherit" | "success" | "error" | "info" | "warning";
  ariaLabel?: string;
  sx?: SxProps<Theme>;
}

/**
 * Specialized component that extends BasicButton but ALWAYS points to /add-review.
 * Text and color can be customized, but the href is fixed.
 */
const AddReviewButton = ({ 
  text = "Add Review", 
  color = "primary", 
  ariaLabel, 
  sx 
}: AddReviewButtonProps) => {
  return (
    <BasicButton
      text={text}
      color={color}
      // always goes to /add-review
      href="/add-review"
      ariaLabel={ariaLabel || "Add a new college review"}
      sx={sx}
    />
  );
};

export default AddReviewButton;