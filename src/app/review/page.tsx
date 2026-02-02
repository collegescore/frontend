"use client";

import { useState } from "react";
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
  const [answers, setAnswers] = useState<Answer>({});

  const handleCancel = () => {
    router.back();
  };

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  // Filter questions based on conditional logic
  const visibleQuestions = reviewQuestions.filter(question => {
    // Check if this is a follow-up question by finding its parent
    const parentQuestion = reviewQuestions.find(
      q => q.type === 'yes-no' && 
           q.conditional && 
           q.followUpQuestionId === question.id  // Parent's followUpQuestionId points to this question
    );
    
    // If this question has a parent, only show it if parent was answered "yes"
    if (parentQuestion) {
      return answers[parentQuestion.id] === 'yes';
    }
    
    // Show all non-follow-up questions by default
    return true;
  });

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

      {visibleQuestions.map((question) => (
        <Container
          key={question.id}
          maxWidth="lg"
          sx={{ bgcolor: "white", borderRadius: 4, pt: 3 }}
        >
          <ReviewQuestion 
            question={question} 
            onChange={handleAnswerChange}
          />
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
