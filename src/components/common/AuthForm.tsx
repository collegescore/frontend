import { useEffect, useRef } from "react";
import { Box, Stack, TextField, Typography } from "@mui/material";
import EmailInputBar from "./EmailInputBar";
import BasicButton from "./BasicButton";

interface AuthFormProps {
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  buttonText: string;
}

export default function AuthForm({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  loading,
  buttonText,
}: AuthFormProps) {
  // lock to prevent duplicate submit clicks before React re-renders the 'disabled' state
  const submitLockRef = useRef(false);
  useEffect(() => {
    if (!loading) {
      submitLockRef.current = false;
    }
  }, [loading]); // Only run this when the 'loading' state changes

  const internalOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (submitLockRef.current || loading) {
      return;
    }

    submitLockRef.current = true;
    onSubmit(e);
  };

  return (
    <Box
      component="form"
      onSubmit={internalOnSubmit}
      sx={{ width: "100%", maxWidth: 400 }}
    >
      <Stack spacing={2.5}>
        <EmailInputBar
          variant="field"
          email={email}
          setEmail={setEmail}
          textFieldBg="white"
          loading={loading}
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          disabled={loading}
          sx={{ bgcolor: "white", borderRadius: 1 }}
        />
        <BasicButton
          text={buttonText}
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ py: 1.5, fontWeight: "bold", fontSize: "1rem" }}
        />
        <Typography
          variant="caption"
          sx={{ color: "grayscale.main", textAlign: "center" }}
        >
          Don&apos;t have an account? One will instantly be created when you
          submit this form!
        </Typography>
      </Stack>
    </Box>
  );
}
