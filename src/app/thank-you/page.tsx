import { Container, Typography, Stack } from "@mui/material";
import Section from "@/components/common/Section";
import Paragraph from "@/components/common/Paragraph";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EmailSubscription from "@/components/common/EmailSubscription";

export default function ThankYouPage() {
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

            <EmailSubscription />
          </Stack>
        </Container>
      </Section>
    </>
  );
}
