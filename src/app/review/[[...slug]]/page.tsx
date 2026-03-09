"use client";

import { useEffect, useState, use, useRef } from "react";
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
import { submitReview } from "@/lib/api";
import { scrollToTop } from "@/lib/utils";
import { Alert } from "@mui/material";
import { supabase } from "@/lib/supabaseClient";
import AuthForm from "@/components/common/AuthForm";
import { Session } from "@supabase/supabase-js";
import { isValidEmail } from "@/lib/emailValidation";

interface ReviewPageProps {
  params: Promise<{ slug?: string[] }>;
}

function ReviewPage({ params }: ReviewPageProps) {
  // consts for authentication/user session
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authError, setAuthError] = useState("");
  /////////////////////////////////////////////////

  const resolvedParams = use(params);
  const schoolSlug = resolvedParams.slug?.[0];
  const router = useRouter();
  const [announcement, setAnnouncement] = useState<string>("");
  const [error, setError] = useState<string>("");
  // UI state used to disable submit button while request is in flight
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Synchronous lock to block duplicate submit events before React re-renders
  const submitLockRef = useRef(false);
  //Store answers to questions
  const [answers, setAnswers] = useState<Answer>(() => {
    const initialAnswers: Answer = {};

    const schoolQuestion = reviewQuestions.find(
      (q) => q.type === "school-select",
    );

    if (schoolSlug && schoolQuestion) {
      initialAnswers[schoolQuestion.id] = schoolSlug;
    }

    return initialAnswers;
  });

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

  useEffect(() => {
    // 1. Check if the user is already logged in when the page loads
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2. Listen for "Sign In" events
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    // --- email validation block ---
    if (!isValidEmail(email)) {
      setAuthError(
        "Please enter a valid email address (e.g., name@address.com)",
      );
      return; // Stop the function here so we don't call Supabase
    }
    // ---------------------------------

    setIsLoggingIn(true);

    // 1. Try to Sign In
    const { data, error: signInError } = await supabase.auth.signInWithPassword(
      {
        email,
        password,
      },
    );

    // 2. If user not found, try to Sign Up
    if (signInError) {
      if (signInError.message === "Invalid login credentials") {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) setAuthError(signUpError.message);
      } else {
        setAuthError(signInError.message);
      }
    }

    setIsLoggingIn(false);
  };

  // Handle cancel action
  const handleCancel = () => {
    router.back();
  };
  // Handle answer changes
  const handleAnswerChange = (
    questionId: string,
    value: string | number | boolean | Date | null | string[],
  ) => {
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
      scrollToTop();
    }
  };
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      scrollToTop();
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Guard against rapid double-clicks / repeated Enter presses
    if (submitLockRef.current) {
      return;
    }

    submitLockRef.current = true;
    setIsSubmitting(true);
    setAnnouncement("Submitting review, please wait.");
    setError(""); // Clear previous errors

    try {
      await submitReview(answers);
      //Redirect to thank you page
      router.push("/thank-you");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to submit review. Please try again.";
      setError(errorMessage);
      console.error("Error submitting review:", error);
      // Allow a new attempt after a failed request
      submitLockRef.current = false;
      setIsSubmitting(false);
    }
  };

  // 1. Show a loader while checking the session
  if (loading) {
    return (
      <Box sx={{ p: 5, color: "white", textAlign: "center" }}>Loading...</Box>
    );
  }

  // 2. If NO session, show the Login Gate
  if (!session) {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh", color: "white", p: 4 }}
      >
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <Typography
            component="h1"
            variant="h3"
            fontWeight="bold"
            color="primary.main"
            sx={{ mb: 2 }}
          >
            Sign in to share your experience.
          </Typography>
          <Typography
            component="p"
            variant="h6"
            color="grayscale.main"
            sx={{ mb: 4, opacity: 0.9 }}
          >
            Your review will be kept anonymous! We only ask for your email to
            prevent spam and ensure authentic reviews.
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <AuthForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              onSubmit={handleLogin}
              loading={isLoggingIn}
              buttonText={
                isLoggingIn ? "Authenticating..." : "Enter the Survey"
              }
            />
          </Box>

          {authError && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {authError}
            </Alert>
          )}

          <Button
            onClick={() => router.back()}
            variant="contained"
            color="secondary"
            sx={{ mt: 4 }}
          >
            ← Back
          </Button>
        </Container>
      </Stack>
    );
  }

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit}
      spacing={2}
      alignItems="center"
      bgcolor="primary.main"
      sx={{ py: 6, overflow: "hidden", width: "100%" }}
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
          sx={{
            bgcolor: "white",
            borderRadius: 4,
            pt: 3,
            px: { xs: 1.5, sm: 3 },
          }}
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
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        )}
      </Stack>

      {/* Visible error message (announced by screen readers) */}
      {error && (
        <Alert severity="error" sx={{ mx: 2, mb: 2 }} aria-live="assertive">
          <Typography variant="body2">{error}</Typography>
        </Alert>
      )}
    </Stack>
  );
}

export default ReviewPage;
