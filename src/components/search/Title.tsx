import Section from "../common/Section";
import { Container, Typography, Box } from "@mui/material";
import Subtitle from "../common/Subtitle";

const Title = () => {

  return (
    <Section bgcolor="grayscale.light" id="title-section">
        <Typography 
            variant="h1" 
            component="h1" 
            gutterBottom
            sx={{ fontWeight: 'bold', color: 'text.primary' }}
          >
            Search Colleges
        </Typography>
        <Subtitle>
            Find universities that support your unique identity and needs.
        </Subtitle>
    </Section>
  );
};

export default Title;
