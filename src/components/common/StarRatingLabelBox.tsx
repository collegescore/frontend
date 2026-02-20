import { Box, Typography } from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";

interface StarRatingLabelBoxProps {
  rating: number;
  label: string;
}
export const StarRatingLabelBox = ({
  rating,
  label,
}: StarRatingLabelBoxProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        component="dd"
        sx={{
          m: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // This centers the icon+text group
          color: "text.primary",
        }}
      >
        <StarRateRoundedIcon sx={{ color: "primary.main" }} />
        <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1 }}>
          {rating}
        </Typography>
      </Box>
      <Typography
        component="dt"
        variant="caption"
        sx={{ color: "text.secondary" }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default StarRatingLabelBox;
