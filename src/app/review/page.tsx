import {Stack, Box, Typography, Container} from "@mui/material";
import Section from "@/components/common/Section";
import Paragraph from "@/components/common/Paragraph";
import ReviewQuestion from "@/components/review/Question";
import { Question } from "@/types/review_qa";

const questions: Question[] = [
    {
    id: 'q1',
    type: 'star-rating',
    question: 'How satisfied are you with our service?',
    required: true
    },
    {
    id: 'q2',
    type: 'yes-no',
    question: 'Would you recommend our service to others?',
    required: true
    },
    {
    id: 'q3',
    type: 'date-range',
    question: 'Select the date range for your experience',
    required: true
    },
    {
    id: 'q4',
    type: 'text',
    question: 'Please provide any additional comments',
    multiline: true,
    maxLength: 500,
    placeholder: 'Enter your comments here...'
    }
];

function ReviewPage() {
    return (

        <Stack component="form" spacing={2} alignItems="center" bgcolor="primary.main" sx={{ py: 6}}>
            {questions.map((question) => (
                    <Container 
                        key={question.id} 
                        maxWidth="lg"
                        sx={{ bgcolor: "white", borderRadius: 4, pt: 3}}>
                        <ReviewQuestion question={question} />
                    </Container>
            ))}
        </Stack>
    );
}

export default ReviewPage;