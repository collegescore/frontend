import {
  FormControl,
  FormGroup,
  FormControlLabel,
  FormLabel,
  FormHelperText,
  Typography,
  Stack,
} from "@mui/material";
import { Rating, Radio, RadioGroup, TextField, Checkbox } from "@mui/material";
import { Question } from "@/types/review_qa";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { UniversitySearch } from "../common/UniversitySearch";

interface ReviewQuestionProps {
  question: Question;
  onChange?: (
    questionId: string,
    value: string | number | boolean | Date | null,
  ) => void;
  value?: string | number | boolean | Date | null;
}

function ReviewQuestion({ question, onChange, value }: ReviewQuestionProps) {
  const renderInput = (question: Question) => {
    switch (question.type) {
      case "star-rating":
        return (
          <Rating
            name={question.id}
            id={question.id}
            aria-labelledby={`${question.id}-label`}
            value={typeof value === "number" ? value : null}
            onChange={(e, newValue) => onChange?.(question.id, newValue)}
          />
        );
      case "yes-no":
        const hasFollowUp =
          question.type === "yes-no" &&
          question.conditional &&
          question.followUpQuestionId;
        return (
          <RadioGroup
            row
            aria-labelledby={`${question.id}-label`}
            name={question.id}
            id={question.id}
            value={value || ""}
            onChange={(e) => onChange?.(question.id, e.target.value)}
            aria-controls={
              hasFollowUp ? question.followUpQuestionId : undefined
            }
          >
            <FormControlLabel
              value="yes"
              control={<Radio id={`${question.id}-yes`} />}
              label="Yes"
            />
            <FormControlLabel
              value="no"
              control={<Radio id={`${question.id}-no`} />}
              label="No"
            />
          </RadioGroup>
        );
      case "date-range":
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack direction="row" spacing={2}>
              <DatePicker
                label="Start Year"
                name={`${question.id}-start`}
                views={["year"]}
                format="YYYY"
                onChange={(newValue) =>
                  onChange?.(`${question.id}-start`, newValue?.year() ?? null)
                }
              />
              <DatePicker
                label="End Year"
                name={`${question.id}-end`}
                views={["year"]}
                format="YYYY"
                onChange={(newValue) =>
                  onChange?.(`${question.id}-end`, newValue?.year() ?? null)
                }
              />
            </Stack>
          </LocalizationProvider>
        );
      case "text":
        return (
          <TextField
            name={question.id}
            id={question.id}
            aria-labelledby={`${question.id}-label`}
            multiline
            maxRows={4}
            fullWidth
            value={value || ""}
            onChange={(e) => onChange?.(question.id, e.target.value)}
          />
        );
      case "multiple-choice":
        return (
          <FormGroup>
            {question.options.map((option, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    name={`${question.id}-option-${index}`}
                    onChange={(e) => {
                      // Get current selections or empty array
                      const currentSelections = onChange ? [] : [];
                      // Update selections based on checked state
                      onChange?.(question.id, e.target.checked ? option : null);
                    }}
                  />
                }
                label={option}
              />
            ))}
          </FormGroup>
        );
      case "school-select":
        return (
          <UniversitySearch //TODO: fix value handling after the branch is merged
            onSelect={(college) =>
              onChange?.(question.id, college?.slug ?? null)
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <FormControl
      component="fieldset"
      required={question.required}
      sx={{ py: 4 }}
      fullWidth
    >
      <FormLabel
        component="legend"
        id={`${question.id}-label`}
        sx={{ whiteSpace: "pre-line" }}
      >
        {question.question}
      </FormLabel>
      {question.helpText && (
        <FormHelperText>{question.helpText}</FormHelperText>
      )}
      {renderInput(question)}
    </FormControl>
  );
}

export default ReviewQuestion;
