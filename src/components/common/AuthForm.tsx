import { Box, Stack, TextField, Typography } from "@mui/material";
import EmailInputBar from "./EmailInputBar";
import BasicButton from "./BasicButton";

interface AuthEmailFormProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

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
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ width: "100%", maxWidth: 400 }}
    >
      <Stack spacing={2.5}>
        <EmailInputBar
          variant="field"
          email={email}
          setEmail={setEmail}
          textFieldBg="white"
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
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
          sx={{ color: "grayscale.main", opacity: 0.8, textAlign: "center" }}
        >
          Don't have an account? One will instantly be created when you submit
          this form!
        </Typography>
      </Stack>
    </Box>
  );
}
