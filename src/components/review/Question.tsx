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
import { V0_COLLEGES } from "@/lib/V0Colleges";

interface ReviewQuestionProps {
  question: Question;
  onChange?: (
    questionId: string,
    value: string | number | boolean | Date | null | string[],
  ) => void;
  value?: string | number | boolean | Date | null | string[];
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
            aria-required={question.required}
            value={typeof value === "number" ? value : null}
            onChange={(e, newValue) => onChange?.(question.id, newValue)}
          />
        );
      case "yes-no":
        return (
          <RadioGroup
            row
            aria-required={question.required}
            aria-labelledby={`${question.id}-label`}
            name={question.id}
            id={question.id}
            value={value || ""}
            onChange={(e) => onChange?.(question.id, e.target.value)}
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
                name={`${question.id}_start`}
                views={["year"]}
                format="YYYY"
                onChange={(newValue) =>
                  onChange?.(`${question.id}_start`, newValue?.year() ?? null)
                }
              />
              <DatePicker
                label="End Year"
                name={`${question.id}_end`}
                views={["year"]}
                format="YYYY"
                onChange={(newValue) =>
                  onChange?.(`${question.id}_end`, newValue?.year() ?? null)
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
            label="Type your answer here..."
            aria-labelledby={`${question.id}-label`}
            required={question.required}
            multiline
            maxRows={4}
            fullWidth
            value={value || ""}
            onChange={(e) => onChange?.(question.id, e.target.value)}
          />
        );
      case "multiple-choice":
        const selectedOptions = Array.isArray(value) ? value : [];
        return (
          <FormGroup>
            {question.options.map((option, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    name={`${question.id}-option-${index}`}
                    checked={selectedOptions.includes(option)}
                    onChange={(e) => {
                      const nextSelections = e.target.checked
                        ? [...selectedOptions, option]
                        : selectedOptions.filter((item) => item !== option);
                      onChange?.(question.id, nextSelections);
                    }}
                  />
                }
                label={option}
              />
            ))}
          </FormGroup>
        );
      case "school-select":
        const selectedCollege =
          V0_COLLEGES.find((c) => c.slug === value) || null;
        return (
          <UniversitySearch
            value={selectedCollege}
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
