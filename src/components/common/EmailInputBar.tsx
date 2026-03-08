"use client";

import { Stack, TextField, Typography, Box } from "@mui/material";
import BasicButton from "./BasicButton";

interface EmailInputBarProps {
  email: string;
  setEmail: (val: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  variant?: "subscription" | "field"; // Added variant prop so email bar can look different in different contexts
  buttonText?: string;
  captionText?: string;
  loading?: boolean;
  buttonColor?:
    | "primary"
    | "secondary"
    | "grayscale"
    | "error"
    | "info"
    | "success"
    | "warning";
  maxWidth?: number;
  textFieldBg?: string;
}

export default function EmailInputBar({
  email,
  setEmail,
  onSubmit,
  variant = "subscription", // Default to subscription
  buttonText = "Submit",
  buttonColor = "primary",
  captionText,
  loading = false,
  maxWidth = 600,
  textFieldBg = "transparent",
}: EmailInputBarProps) {
  // Logic based on variant
  const isField = variant === "field";

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        width: "100%",
        maxWidth: isField ? "100%" : maxWidth,
        mt: isField ? 0 : 2,
      }}
      id={isField ? "email-field-form" : "email-subscription-form"}
      aria-label={
        isField ? "Email field" : "Stay up to date with College Score"
      }
    >
      <Stack direction="row" spacing={0}>
        <TextField
          type="email"
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          disabled={loading}
          placeholder="your.email@example.com"
          sx={{
            bgcolor: textFieldBg,
            "& .MuiOutlinedInput-root": {
              // Only square the right side if we are in subscription mode
              borderTopRightRadius: isField ? 1 : 0,
              borderBottomRightRadius: isField ? 1 : 0,
            },
          }}
        />

        {/* Only show button if in subscription mode, otherwise this component is just a styled email field without a button */}
        {variant === "subscription" && (
          <BasicButton
            text={buttonText}
            type="submit"
            variant="contained"
            color={buttonColor} // Use the color prop passed from parent, defaulting to primary
            disabled={loading}
            sx={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              whiteSpace: "nowrap",
              minWidth: "fit-content",
            }}
          />
        )}
      </Stack>

      {captionText && (
        <Typography
          variant="caption"
          sx={{
            color: "grayscale.main",
            display: "block",
            textAlign: "left",
            fontSize: "0.75rem",
            mt: 1,
            px: 1,
          }}
        >
          {captionText}
        </Typography>
      )}
    </Box>
  );
}
