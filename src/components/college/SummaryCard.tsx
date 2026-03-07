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
      <Typography
        variant="subtitle1"
        component="h3"
        gutterBottom
        sx={{ fontWeight: 600 }}
      >
        {title}
      </Typography>
      <Typography variant="body2" mb={1}>
        {content}
      </Typography>
      <Box
        component="ul"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mt: 2,
          listStyle: "none",
          padding: 0,
          margin: 0,
          marginTop: 2,
        }}
      >
        <Chip label="Thing 1" color="primary" variant="square" component="li" />
        <Chip label="Thing 2" color="primary" variant="square" component="li" />
        <Chip label="Thing 3" color="primary" variant="square" component="li" />
      </Box>
    </Card>
  );
};

export default SummaryCard;
