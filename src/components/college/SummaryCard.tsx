import { Box, Typography } from "@mui/material";

type SummaryCardProps = {
  title: string;
  content: string;
};

const SummaryCard = ({ title, content }: SummaryCardProps) => {
  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1">{content}</Typography>
    </Box>
  );
};

export default SummaryCard;