import { Box } from "@mui/material";
import { StarRatingLabelBox } from "./StarRatingLabelBox";
import { Ratings } from "@/types/ratings";

const RatingsSection = (props: { ratings: Ratings }) => {
  const { ratings } = props;
  return (
    <Box
      sx={{
        bgcolor: "grayscale.light", // Light gray background for the ratings section
        borderRadius: 3, // Rounded corners for the gray box
        p: 2, // Padding inside the gray box
        my: 2, // Margin top/bottom to separate from header/footer
      }}
    >
      <Box
        component="dl"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1,
          m: 0,
        }}
      >
        {/* Accessibility Rating */}
        <StarRatingLabelBox
          rating={ratings.a11y_overall || 0}
          label="Accessibility"
        />

        {/* Safety Rating*/}
        <StarRatingLabelBox
          rating={ratings.safety_overall || 0}
          label="Safety"
        />

        {/* Inclusivity Rating */}
        <StarRatingLabelBox
          rating={ratings.inclusivity_overall || 0}
          label="Inclusivity"
        />
      </Box>
    </Box>
  );
};
export default RatingsSection;
