import { addEmail } from "@/lib/api";
import { useState } from "react";
import EmailInputBar from "./EmailInputBar";
import { Typography } from "@mui/material";

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
  const [error, setError] = useState("");

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await addEmail(email);
      setEmail("");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add email.");
    }
  };

  return (
    <>
      <EmailInputBar
        email={email}
        setEmail={setEmail}
        onSubmit={handleEmailSubmit}
        buttonText="Keep Me Updated"
        buttonColor={buttonColor}
        loading={submitted}
        captionText="By providing your email, you consent to receive periodic updates from College Score about the project and opportunities to contribute."
      />
      {submitted && (
        <Typography color="success.main" sx={{ mt: 2 }}>
          Thanks for subscribing!
        </Typography>
      )}
      {error && (
        <Typography color="error.main" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </>
  );
}
