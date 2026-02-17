import { Container, Typography } from "@mui/material";
import Section from "@/components/common/Section";
import Paragraph from "@/components/common/Paragraph";
import CTASection from "@/components/common/CallToAction";

export default function PrivacyPage() {
  return (
    <>
      <Section id="hero">
        <Container>
          <Typography variant="h1" textAlign="center">
            Privacy Policy
          </Typography>
        </Container>
      </Section>

      <Section id="what-we-ask">
        <Container>
          <Typography variant="h2" textAlign="center">
            What We Ask (and Why)
          </Typography>
          <Paragraph>
            College Score uses short rating scales and written responses to
            capture patterns and nuance.
          </Paragraph>
          <Paragraph>Ratings help surface trends across schools.</Paragraph>
          <Paragraph>
            Written responses help explain why those ratings exist.
          </Paragraph>
          <Paragraph>
            Curious about the exact questions we ask? Rate your school and find
            out!
          </Paragraph>
        </Container>
      </Section>

      <Section id="privacy">
        <Container>
          <Typography variant="h2" textAlign="center">
            Privacy, Anonymity, and Trust
          </Typography>
          <Paragraph>Your privacy matters.</Paragraph>
          <Paragraph>
            Reviews are submitted voluntarily and anonymously.
          </Paragraph>
          <Paragraph>
            We do not collect names, email, or contact information unless you
            share them.
          </Paragraph>
          <Paragraph>
            You can choose whether your self-reported identities appear
            publicly.
          </Paragraph>
          <Paragraph>
            Identity filters are optional and can be opted out of.
          </Paragraph>
          <Paragraph>
            Written responses are shown as submitted, so we encourage reviewers
            to avoid sharing identifying details they are not comfortable making
            public.
          </Paragraph>
          <Paragraph sx={{ mb: 0 }}>
            Because College Score is an open-source project, aggregated data may
            be used for research. However, personal identifiers are never
            released, and data is aggregated to reduce re-identification risk.
            Research shows that this helps, but you should also be thoughtful
            about what you share because no security system is perfect.
          </Paragraph>
        </Container>
      </Section>

      <CTASection />
    </>
  );
}
