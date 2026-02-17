import Section from "../common/Section";
import { Container, Typography, Box } from "@mui/material";
import Subtitle from "../common/Subtitle";
import {UniversitySearch} from "../common/UniversitySearch";

const SearchHero = () => {

  return (
    <Section bgcolor="grayscale.light" id="title-section">
        <Typography variant="h2" component="h1" sx={{ mb: 2 }}>
          Search Colleges
        </Typography>

        {/* Left align subtitle and remove horizontal centering */}
        <Subtitle sx={{ mx: 0, mb: 1}}> 
            Find universities that support your unique identity and needs.
        </Subtitle>
        <UniversitySearch/>
    </Section>
  );
};

export default SearchHero;
