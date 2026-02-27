import { Box, Typography, Card } from "@mui/material";

type SummaryCardProps = {
  title: string;
  content: string;
};

const SummaryCard = ({ title, content }: SummaryCardProps) => {
  return (
    <Card
        variant="outlined"
      sx={{
        borderRadius: 2,
        padding: "16px",
        marginBottom: "16px",
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1">{content}</Typography>
    </Card>
  );
};

export default SummaryCard;