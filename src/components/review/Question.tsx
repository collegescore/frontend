import {
  FormControl,
  FormGroup,
  FormControlLabel,
  FormLabel,
  FormHelperText,
  Typography,
  Stack,
} from "@mui/material";
import { Rating, Radio, RadioGroup, TextField, Checkbox} from "@mui/material";
import { Question } from "@/types/review_qa";
import { error } from "console";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface ReviewQuestionProps {
  question: Question;
}

function ReviewQuestion({ question }: ReviewQuestionProps) {
  const renderInput = (question: Question) => {
    switch (question.type) {
      case "star-rating":
        return (
          <Rating
            name={question.id}
            id={question.id}
            aria-labelledby={`${question.id}-label`}
          />
        );
      case "yes-no":
        return (
          <RadioGroup
            row
            aria-labelledby={`${question.id}-label`}
            name={question.id}
            id={question.id}
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
              />
              <DatePicker
                label="End Year"
                name={`${question.id}-end`}
                views={["year"]}
                format="YYYY"
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
          />
        );
      case "multiple-choice":
        return(
            <FormGroup>
                {question.options.map((option, index) => (
                    <FormControlLabel
                        key={index}
                        control={<Checkbox name={`${question.id}-option-${index}`} />}
                        label={option}
                    />
                ))}
            </FormGroup>
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
      <FormLabel component="legend" id={`${question.id}-label`}>
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
