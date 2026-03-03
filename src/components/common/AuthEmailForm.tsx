"use client";

import { Stack, TextField, Typography, Box } from "@mui/material";
import BasicButton from "./BasicButton";

interface AuthEmailFormProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export default function AuthEmailForm({
  email,
  setEmail,
  onSubmit,
  loading,
}: AuthEmailFormProps) {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ width: "100%", maxWidth: 500, mt: 2 }}
    >
      <Stack direction="row" spacing={0}>
        <TextField
          type="email"
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          placeholder="your.email@example.com"
          sx={{
            bgcolor: "white",
            borderTopLeftRadius: 1,
            borderBottomLeftRadius: 1,
            "& .MuiOutlinedInput-root": {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            },
          }}
        />
        <BasicButton
          text={loading ? "Sending..." : "Sign In"}
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            whiteSpace: "nowrap",
            minWidth: "fit-content",
            px: 4,
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
        We'll send a magic link to your inbox. No password required!
      </Typography>
    </Box>
  );
}
