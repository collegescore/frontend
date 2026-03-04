"use client";

import { useState } from "react";
import { Typography } from "@mui/material";
import { addEmail } from "@/lib/api";
import EmailInputBar from "./EmailInputBar";

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
        error instanceof Error ? error.message : "Failed to add email.";
      setError(errorMessage);
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
    </>
  );
}
