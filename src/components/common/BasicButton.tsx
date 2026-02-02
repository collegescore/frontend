import React from "react";
import { Button, ButtonProps } from "@mui/material";
import Link from "next/link";

/**
 * Props definition for the BasicButton
 * Extends MUI's ButtonProps while adding custom props
 */
export interface BasicButtonProps extends Omit<ButtonProps, "href"> {
  text: string;
  href?: string;
  ariaLabel?: string;
}

const BasicButton = ({
  text,
  color = "primary",
  href,
  sx = {},
  ariaLabel,
  variant = "contained", //button variant defaults to 'contained' if not specified
  ...otherProps
}: BasicButtonProps) => {
  return (
    <Button
      variant={variant}
      color={color}
      // Use aria-label if provided, otherwise fallback to button text
      aria-label={ariaLabel}
      // Next.js Link Integration
      component={href ? Link : "button"}
      href={href ?? ""}
      // Styling
      sx={{
        fontWeight: 600,
        textTransform: "none", // Better for readability/a11y than all-caps
        ...sx,
      }}
      {...otherProps}
    >
      {text}
    </Button>
  );
};

export default BasicButton;
