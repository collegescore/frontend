import Section from "../common/Section";
import { Container, Box, Typography, Divider } from "@mui/material";
import { ComponentProps } from "react";


interface AboutSectionProps extends ComponentProps<typeof Section> {
    heading: string;
}

export default function AboutSection({ id, heading, ...props }: AboutSectionProps) {
  return (
    <Section id={id} {...props}>
        <Container component="article">
          <Box id={`${id}-header`} sx={{ mb: 4 }}>
            <Typography variant="h2" sx={{ mb: 2 }}>
              {heading}
            </Typography>
            <Divider sx={{ bgcolor: "primary.main", height: "4px" }} />
          </Box>
          <Box id={`${id}-content`}>
            {props.children}
          </Box>
      </Container>
    </Section>
  );
}