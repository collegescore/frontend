import { Container, Typography } from "@mui/material";
import Section from "@/components/common/Section";
import AboutSection from "@/components/about/AboutSection";
import Paragraph from "@/components/common/Paragraph";
import CTASection from "@/components/common/CallToAction";

export default function AboutPage() {
  return (
    <>
      <Section id="hero">
        <Container>
          <Typography variant="h1" textAlign="center">
            About College Score
          </Typography>
        </Container>
      </Section>

      <AboutSection id="mission" heading="Our Mission">
        <Paragraph>
          Choosing a college is about more than rankings, tuition, or test
          scores. For many students, it&apos;s about feeling safe, supported,
          and included.
        </Paragraph>
        <Paragraph>
          Yet information about accessibility, disability support, safety,
          cultural climate, and inclusion is often hard to find–or filtered
          through institutional promises rather than students&apos; lived
          experience.
        </Paragraph>
        <Paragraph>College Score exists to change that.</Paragraph>
        <Paragraph>
          We are a student-powered platform where current students and alumni
          share their experiences of what it was like to attend their college so
          that prospective students can make informed, confident decisions.
        </Paragraph>
        <Paragraph>
          Students are not defined by a single identity. College Score is
          intentionally intersectional, allowing students to share how
          overlapping identities–such as disability, race, gender, sexuality,
          and socioeconomic background–shape their experiences.
        </Paragraph>
        <Paragraph sx={{ mb: 0 }}>As one student told us:</Paragraph>
        <Typography
          color="grayscale.main"
          component="blockquote"
          sx={{
            pl: 4,
            borderLeft: 0,
            borderColor: "grayscale.dark",
            fontStyle: "italic",
          }}
        >
          &quot; Even though the accessibility and academics were perfect, the
          cultural fit wasn&apos;t safe.&quot;
        </Typography>
        <Paragraph>
          Those distinctions matter, and students deserve tools that reflect
          them.
        </Paragraph>
      </AboutSection>

      <AboutSection id="difference" heading="What Makes Us Different?">
        <Paragraph>
          Most college search tools rely on schools describing themselves. While
          that information is important, it shouldn&apos;t be where the story
          ends.
        </Paragraph>
        <Paragraph sx={{ mb: 0 }}>
          College Score centers student experiences.{" "}
        </Paragraph>
        <Typography
          color="grayscale.main"
          component="ul"
          sx={{ pl: 4, listStyleType: "disc" }}
        >
          <Typography component="li">
            We focus on accessibility, inclusion, and safety.
          </Typography>
          <Typography component="li">
            We recognize that students hold multiple, intersecting identities.
          </Typography>
          <Typography component="li">
            We pair numerical ratings with open, written reflections.
          </Typography>
          <Typography component="li">
            We complement–not replace–institutional data like the CeDaR
            database.
          </Typography>
        </Typography>
        <Paragraph>
          This approach reflects how students already evaluate colleges: through
          stories, shared experiences, and word-of-mouth.
        </Paragraph>
      </AboutSection>
      <CTASection />
    </>
  );
}
