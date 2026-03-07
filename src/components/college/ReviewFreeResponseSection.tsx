import { Box, Typography } from "@mui/material";

type ReviewFreeResponseSectionProps = {
  sectionName: string;
  text: string;
};

const ReviewFreeResponseSection = ({ sectionName, text }: ReviewFreeResponseSectionProps) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
        {sectionName}:
      </Typography>
      <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>
        {text}
      </Typography>
    </Box>
  );
};

export default ReviewFreeResponseSection;
