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
            <Paragraph
              sx={{ textAlign: "center", mb: 0 }}
              role="status"
              aria-live="polite"
            >
              Your review has been successfully submitted. Your insights will
              help prospective students make informed decisions about their
              college experience.
            </Paragraph>
            <Paragraph sx={{ textAlign: "center" }}>
              We appreciate your support during this early data collection
              phase. As we are currently focused on gathering responses from
              University of Washington students, we kindly ask that you wait to
              share this resource with students from other schools. We&apos;ll
              reach out when we&apos;re ready to expand!
            </Paragraph>

            <Box
              component="form"
              onSubmit={handleEmailSubmit}
              sx={{
                width: "100%",
                maxWidth: 600,
                mt: 2,
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
                By providing your email, you consent to receive periodic updates
                from College Score about the project and opportunities to
                contribute.
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
            </Box>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
