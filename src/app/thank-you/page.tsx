"use client";

import { Container, Typography, Stack, TextField, Box } from "@mui/material";
import Section from "@/components/common/Section";
import Paragraph from "@/components/common/Paragraph";
import BasicButton from "@/components/common/BasicButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useState } from "react";

export default function ThankYouPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send email to backend
    console.log("Email submitted:", email);
    setSubmitted(true);
  };

  return (
    <>
      <Section id="thank-you">
        <Container maxWidth="md">
          <Stack alignItems="center" spacing={4}>
            <CheckCircleOutlineIcon
              sx={{ fontSize: 80, color: "primary.main" }}
              aria-hidden="true"
            />
            <Typography variant="h1" textAlign="center">
              Thank You!
            </Typography>
            <Paragraph sx={{ textAlign: "center", mb: 0 }} role="status" aria-live="polite">
              Your review has been successfully submitted. Your insights will
              help prospective students make informed decisions about their
              college experience.
            </Paragraph>
            <Paragraph sx={{ textAlign: "center" }}>
              We appreciate your support during this early data collection phase. 
              As we are currently focused on gathering responses from University of Washington students, 
              we kindly ask that you wait to share this resource with students from other schools. 
              We&apos;ll reach out when we&apos;re ready to expand!
            </Paragraph>
          </Stack>
        </Container>
      </Section>

      <Section bgcolor="primary.main" id="stay-updated">
        <Container
          sx={{
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 800,
              mb: 2,
              fontSize: { xs: "2.25rem", sm: "3rem", md: "3.75rem" },
              lineHeight: 1.2,
            }}
          >
            Stay Updated
          </Typography>

          <Typography
            variant="h6"
            component="p"
            sx={{
              mb: 4,
              opacity: 0.9,
              fontWeight: 400,
              maxWidth: "600px",
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Enter your email to receive updates on the project and be notified 
            when we need help finding more respondents.
          </Typography>

          <Box
            component="form"
            onSubmit={handleEmailSubmit}
            sx={{
              maxWidth: 500,
              mx: "auto",
            }}
          >
            <Stack spacing={2}>
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
                  bgcolor: "white",
                  borderRadius: 1,
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: "white",
                  opacity: 0.8,
                  textAlign: "left",
                  fontSize: "0.75rem",
                  px: 1,
                }}
              >
                By providing your email, you consent to receive periodic updates 
                from College Score about the project and opportunities to contribute.
              </Typography>
              <BasicButton
                text={submitted ? "Thank You!" : "Subscribe for Updates"}
                type="submit"
                variant="contained"
                color="secondary"
                disabled={submitted}
                sx={{ width: "100%" }}
              />
            </Stack>
            {submitted && (
              <Typography
                variant="body2"
                sx={{ 
                  mt: 2,
                  color: "white",
                  fontWeight: 600,
                }}
                role="status"
              >
                Thanks for subscribing! We&apos;ll keep you posted.
              </Typography>
            )}
          </Box>
        </Container>
      </Section>
    </>
  );
}
