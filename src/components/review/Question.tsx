import { FormControl, FormControlLabel, FormLabel, FormHelperText, Typography } from "@mui/material";
import {Rating, Radio, RadioGroup, TextField} from "@mui/material";
import { Question } from "@/types/review_qa";
import { error } from "console";

interface ReviewQuestionProps {
    question: Question;
}

function ReviewQuestion({ question}: ReviewQuestionProps) {
    const renderInput = (question: Question) => {
        switch(question.type) {
            case "star-rating":
                return <Rating id={question.id} aria-labelledby={`${question.id}-label`} />;
            case "yes-no":
                return <RadioGroup row aria-labelledby={`${question.id}-label`} id={question.id}>
                            <FormControlLabel value="yes" control={<Radio id={`${question.id}-yes`} />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio id={`${question.id}-no`} />} label="No" />
                        </RadioGroup>
            //case "date-range":
                //return <DatePicker/>;
            case "text":
                return <TextField id={question.id} aria-labelledby={`${question.id}-label`} multiline maxRows={4} fullWidth />;
            default:
                return null;
        }
    };    

    return (
            <FormControl component="fieldset" required={question.required} sx={{ py: 4 }} fullWidth>
                <FormLabel component="legend" id={`${question.id}-label`}>
                    {question.question}
                </FormLabel>
                {question.helpText && <FormHelperText>{question.helpText}</FormHelperText>}
                {renderInput(question)} 
            </FormControl>
    );
}

export default ReviewQuestion;