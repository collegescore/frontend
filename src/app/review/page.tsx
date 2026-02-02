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
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ReviewQuestion from "@/components/review/Question";
import { Answer } from "@/types/review_qa";
import { useRouter } from "next/navigation";
import { reviewQuestions } from "@/lib/reviewQuestions";

function ReviewPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answer>({});
  const [currentStep, setCurrentStep] = useState(0);

  const STEPS = ["Demographics","Rating", "Written"];

  const handleCancel = () => {
    router.back();
  };

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  // Filter questions based on conditional logic AND current step
  const visibleQuestions = reviewQuestions.filter(question => {
    // First check if question belongs to current step category
    if (question.category !== STEPS[currentStep]) {
      return false;
    }

    // Then check conditional logic
    const parentQuestion = reviewQuestions.find(
      q => q.type === 'yes-no' && 
           q.conditional && 
           q.followUpQuestionId === question.id  // Parent's followUpQuestionId points to this question
    );
    
    if (parentQuestion) {
      return answers[parentQuestion.id] === 'yes';
    }
    
    return true;
  });

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
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
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}
      >
        <IconButton
          onClick={handleCancel}
          aria-label="Close and cancel review form"
          sx={{
            color: "white",
            "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
          }}
        >
          <CloseIcon />
        </IconButton>
        
        {/* Progress indicator */}
        <Box sx={{ color: "white", textAlign: "center", flex: 1 }}>
          <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
            Step {currentStep + 1} of {STEPS.length}
          </Typography>
        </Box>
        
        {/* Spacer for alignment */}
        <Box sx={{ width: 48 }} />
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
      
      {/* Navigation buttons */}
      <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
        {currentStep > 0 && (
          <IconButton
            onClick={handlePrevious}
            aria-label="Previous step"
            sx={{
              color: "white",
              bgcolor: "rgba(255, 255, 255, 0.1)",
              "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        
        {currentStep < STEPS.length - 1 ? (
          <IconButton
            onClick={handleNext}
            aria-label="Next step"
            sx={{
              color: "white",
              bgcolor: "rgba(255, 255, 255, 0.1)",
              "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
            }}
          >
            <ArrowForwardIcon />
          </IconButton>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            type="submit"
          >
            Submit Review
          </Button>
        )}
      </Stack>
    </Stack>
  );
}

export default ReviewPage;
