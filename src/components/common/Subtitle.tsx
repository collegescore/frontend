import { Typography, TypographyProps } from "@mui/material";

const Subtitle = ({ children, sx, ...props }: TypographyProps) => {
  return (
    <Typography
      variant="h6"
      component="p"
      {...props}
      sx={{
        mb: 4,
        fontWeight: 500,
        maxWidth: "600px",
        mx: "auto",
        lineHeight: 1.6,
        color: "grayscale.main", // Default color, can be overridden via props
        ...sx, // Allows style override if needed
      }}
    >
      {children}
    </Typography>
  );
};

export default Subtitle;
