import React from "react";
import { Button, ButtonProps } from "@mui/material";
import Link from "next/link";
import { SxProps, Theme } from "@mui/material/styles";

/**
 * Props definition for the BasicButton
 * extend MUI's own ButtonProps to stay consistent
 */
export interface BasicButtonProps {
  text: string;
  href?: string;
  color?:
    | "primary"
    | "secondary"
    | "inherit"
    | "success"
    | "error"
    | "info"
    | "warning";
  sx?: SxProps<Theme>;
  ariaLabel?: string;
  onClick?: () => void;
  variant?: ButtonProps["variant"];
}

const BasicButton = ({
  text,
  color = "primary",
  href,
  sx = {},
  ariaLabel,
  onClick,
  variant = "contained", //button variant defaults to 'contained' if not specified
}: BasicButtonProps) => {
  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      // Use aria-label if provided, otherwise fallback to button text
      aria-label={ariaLabel || text}
      // Next.js Link Integration
      component={href ? Link : "button"}
      href={href ?? ""}
      // Styling
      sx={{
        fontWeight: 600,
        textTransform: "none", // Better for readability/a11y than all-caps
        ...sx,
      }}
    >
      {text}
    </Button>
  );
};

export default BasicButton;
