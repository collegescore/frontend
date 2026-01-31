import { Typography, TypographyProps } from "@mui/material";

export default function Paragraph(props: TypographyProps) {
  return (
    <Typography
      variant="body1"
      color="grayscale.main"
      gutterBottom
      sx={{ mb: 2 }}
      {...props}
    />
  );
}
