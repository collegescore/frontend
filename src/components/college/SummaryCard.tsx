import { Box, Typography, Card, Chip } from "@mui/material";

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
      <Typography variant="subtitle1" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography variant="body2">{content}</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Chip label="Thing 1" color="primary" />
        <Chip label="Thing 2" color="primary"/>
      </Box>
    </Card>
  );
};

export default SummaryCard;