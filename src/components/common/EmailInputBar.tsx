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
  captionText,
  loading = false,
  buttonColor = "primary",
  maxWidth = 600,
  textFieldBg = "transparent",
}: EmailInputBarProps) {
  // Logic based on variant
  const isField = variant === "field";

  return (
    <Box
      component={onSubmit ? "form" : "div"}
      onSubmit={onSubmit}
      sx={{
        width: "100%",
        maxWidth: isField ? "100%" : maxWidth,
        mt: isField ? 0 : 2,
      }}
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

        {variant === "subscription" && (
          <BasicButton
            text={buttonText}
            type="submit"
            variant="contained"
            color={buttonColor}
            disabled={loading}
            sx={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              whiteSpace: "nowrap",
              minWidth: "fit-content",
              px: 4,
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
