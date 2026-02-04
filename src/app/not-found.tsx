import { Container, Typography, Stack } from "@mui/material";
import Section from "@/components/common/Section";
import Paragraph from "@/components/common/Paragraph";
import BasicButton from "@/components/common/BasicButton";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | College Score",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <main>
      <Section id="not-found">
        <Container maxWidth="md">
          <Stack alignItems="center" spacing={4}>
            <ErrorOutlineIcon
              sx={{ fontSize: 80, color: "error.main" }}
              aria-hidden="true"
            />
            <Typography variant="h1" textAlign="center">
              404: Page Not Found
            </Typography>
            <Paragraph sx={{ textAlign: "center" }}>
              Sorry, we couldn&apos;t find the page you&apos;re looking for. The
              page may have been moved, deleted, or the URL may be incorrect.
            </Paragraph>
          </Stack>
        </Container>
      </Section>
    </main>
  );
}
