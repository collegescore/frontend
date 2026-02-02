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
  const [answers, setAnswers] = useState<Answer>({}); //Store answers to questions
  const [announcement, setAnnouncement] = useState<string>("");

  // Step management
  const [currentStep, setCurrentStep] = useState(0);
  const STEPS = ["Demographics", "Rating", "Written"];

  // Filter questions based on conditional logic AND current step
  const visibleQuestions = reviewQuestions.filter((question) => {
    // First check if question belongs to current step category
    if (question.category !== STEPS[currentStep]) {
      return false;
    }

    // Then check conditional logic
    const parentQuestion = reviewQuestions.find(
      (q) =>
        q.type === "yes-no" &&
        q.conditional &&
        q.followUpQuestionId === question.id, // Parent's followUpQuestionId points to this question
    );

    if (parentQuestion) {
      return answers[parentQuestion.id] === "yes"; //Question is shown only if parent was answered 'yes'
    }

    return true; //Question is not conditional, show it
  });

  // Handle cancel action
  const handleCancel = () => {
    router.back();
  };
  // Handle answer changes
  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers((prev) => {
      const newAnswers = { ...prev, [questionId]: value };

      // Check if this answer triggers a conditional question
      const question = reviewQuestions.find((q) => q.id === questionId);
      if (
        question?.type === "yes-no" &&
        question.conditional &&
        question.followUpQuestionId
      ) {
        if (value === "yes") {
          const followUpQuestion = reviewQuestions.find(
            (q) => q.id === question.followUpQuestionId,
          );
          if (followUpQuestion) {
            setAnnouncement(
              `Additional question appeared: ${followUpQuestion.question}`,
            );
          }
        } else if (value === "no") {
          setAnnouncement(`Follow-up question hidden`);
        }
      }

      return newAnswers;
    });
  };

  // Navigation handlers
  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Use the answers state instead of FormData since not all questions are visible at submit time
    console.log("Review data to submit:", answers);

    // TODO: Send to backend
    // try {
    //     const response = await fetch('BACKEND_URL/api/reviews', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(answers)
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
      {/* Screen reader announcements for conditional questions */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "absolute",
          left: "-10000px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        {announcement}
      </div>

      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <IconButton
          onClick={handleCancel}
          aria-label="Close and cancel your review"
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

      {/* Render visible questions for the current step */}
      {visibleQuestions.map((question) => (
        <Container
          key={question.id}
          maxWidth="lg"
          sx={{ bgcolor: "white", borderRadius: 4, pt: 3 }}
        >
          <ReviewQuestion
            question={question}
            onChange={handleAnswerChange}
            value={answers[question.id]} //Empty or previous answer
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
          <Button variant="contained" color="secondary" type="submit">
            Submit Review
          </Button>
        )}
      </Stack>
    </Stack>
  );
}

export default ReviewPage;
