"use client";

import {
  Stack,
  Box,
  Typography,
  Container,
  Button,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReviewQuestion from "@/components/review/Question";
import { Answer } from "@/types/review_qa";
import { useRouter } from "next/navigation";
import { reviewQuestions } from "@/lib/reviewQuestions";

function ReviewPage() {
  const router = useRouter();

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const reviewData: Answer = {};

    // Convert FormData to object
    formData.forEach((value, key) => {
      reviewData[key] = value.toString();
    });

    console.log("Review data to submit:", reviewData);

    // TODO: Send to backend
    // try {
    //     const response = await fetch('BACKEND_URL/api/reviews', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(reviewData)
    //     });
    //     if (response.ok) {
    //         // Handle success (e.g., redirect or show success message)
    //     }
    // } catch (error) {
    //     console.error('Error submitting review:', error);
    // }
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit}
      spacing={2}
      alignItems="center"
      bgcolor="primary.main"
      sx={{ py: 6 }}
    >
      <Container
        maxWidth="lg"
        sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}
      >
        <IconButton
          onClick={handleCancel}
          aria-label="Go back to previous page"
          sx={{
            color: "white",
            "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Container>

      {reviewQuestions.map((question) => (
        <Container
          key={question.id}
          maxWidth="lg"
          sx={{ bgcolor: "white", borderRadius: 4, pt: 3 }}
        >
          <ReviewQuestion question={question} />
        </Container>
      ))}
      <Button
        variant="contained"
        color="secondary"
        sx={{ pt: 2 }}
        type="submit"
      >
        Submit Review
      </Button>
    </Stack>
  );
}

export default ReviewPage;
