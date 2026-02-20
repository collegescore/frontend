"use client";

import { useState } from "react";
import { Stack, TextField, Box, Typography } from "@mui/material";
import BasicButton from "./BasicButton";
import { addEmail } from "@/lib/api";

// Keep me updated email button allows different color options chosen by parent component,
// defaults to primary unless specified.
interface EmailSubscriptionProps {
  buttonColor?:
    | "primary"
    | "secondary"
    | "grayscale"
    | "error"
    | "info"
    | "success"
    | "warning";
}

export default function EmailSubscription({
  buttonColor = "primary",
}: EmailSubscriptionProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string>("");

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await addEmail(email);
      setEmail("");
      setSubmitted(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to add email.";
      setError(errorMessage);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleEmailSubmit}
      sx={{
        width: "100%",
        maxWidth: 600,
        mt: 2,
      }}
      id="email-subscription-form"
    >
      <Stack direction="row" spacing={0}>
        <TextField
          type="email"
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          disabled={submitted}
          placeholder="your.email@example.com"
          aria-label="Email address for project updates"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            },
          }}
        />
        <BasicButton
          text="Keep Me Updated"
          type="submit"
          variant="contained"
          color={buttonColor} // Use the color prop passed from parent, defaulting to primary
          disabled={submitted}
          sx={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            whiteSpace: "nowrap",
            minWidth: "fit-content",
          }}
        />
      </Stack>
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
        By providing your email, you consent to receive periodic updates from
        College Score about the project and opportunities to contribute.
      </Typography>
      {submitted && (
        <Typography
          variant="body2"
          color="success.main"
          sx={{
            mt: 2,
            fontWeight: 600,
            textAlign: "center",
          }}
          role="status"
        >
          Thanks for subscribing! We&apos;ll keep you posted.
        </Typography>
      )}
      {error && (
        <Typography
          variant="body2"
          color="error.main"
          sx={{
            mt: 2,
            fontWeight: 600,
            textAlign: "center",
          }}
          role="alert"
        >
          {error}
        </Typography>
      )}
    </Box>
  );
}
