import { Question } from "@/types/review_qa";

/**
 * Review form questions
 * These questions are displayed in the review form for users to answer
 */
export const reviewQuestions: Question[] = [
  {
    id: "q1",
    category: "Demographics",
    type: "yes-no",
    question: "Do or Did you attend this institution?",
    required: true,
  },
  {
    id: "q2",
    category: "Demographics",
    type: "date-range",
    question: "What years did you attend this institution?",
    helpText: "If you are currently attending, select your start year and the year you expect to graduate.",
    required: true,
  },
  {
    id: "q3",
    category: "Demographics",
    type: "yes-no",
    question: "Do you identify as LGBTQ+?",
    required: true,
    conditional: true,
    followUpQuestionId: "q4",
  },
  {
    id: "q4",
    category: "Demographics",
    type: "multiple-choice",
    question: "How do you identify within the LGBTQ+ community?",
    options: ["Lesbian", "Gay", "Bisexual", 
      "Transgender", "Queer", "Questioning","Intersex", 
      "Asexual", "Aromantic", "Pansexual", "Other"],
  },
  {
    id: "q5",
    category: "Demographics",
    type: "yes-no",
    question: "Do you identify as a person of color (POC)?",
    required: true,
    conditional: true,
    followUpQuestionId: "q6",
  },
  {
    id: "q6",
    category: "Demographics",
    type: "multiple-choice",
    question: "How do you identify as a person of color (POC)?",
    options: ["Black or African American", "Hispanic or Latino", "Asian", "Native American or Alaska Native", "Native Hawaiian or Other Pacific Islander", "Middle Eastern or North African", "Other"],
  },
  {
    id: "q7",
    category: "Demographics",
    type: "yes-no",
    question: "Have you used accessibility services at this institution?",
    helpText: "Accessibility services may use of an assistive technology, extended test time, note taking assistance, accessible housing, etc.",
    required: true,
  },
  {
    id: "q8",
    category: "Demographics",
    type: "multiple-choice",
    question: "Which if any of the following disabilities do you identify with?",
    options: ["Visual Impairment", "Hearing Impairment", "Mobility Impairment", "Chronic Health Condition", "Learning Disability", "Mental Health Condition", "Neurodivergent Condition (e.g., Autism, ADHD)", "Other"],
  },
  //Rating Questions
  {
    id: "q9",
    category: "Rating",
    type: "star-rating",
    question: "On a scale of 1-5 how safe do you feel on campus and the surrounding area as a person with your identities?",
    helpText: "1 being not safe at all, 5 being incredibly safe."
  },
  {
    id: "q10",
    category: "Rating",
    type: "star-rating",
    question: "On a scale of 1-5 how inclusive to your identities are your peers",
    helpText: "1 being not inclusive at all, 5 being incredibly inclusive."
  },
  {
    id: "q11",
    category: "Rating",
    type: "star-rating",
    question: "On a scale of 1-5 how inclusive to your identities is your institution (such as staff and faculty)",
    helpText: "1 being not supportive at all, 5 being incredibly supportive."
  },
  {
    id: "q12",
    category: "Rating",
    type: "star-rating",
    question: "On a scale of 1-5 how rarely do you hear ableist/derogatory language from students?",
    helpText: "1 being frequently, 5 being never."
  },
  {
    id: "q13",
    category: "Rating",
    type: "star-rating",
    question: "On a scale of 1-5 how rarely do you hear ableist/derogatory language from staff?",
    helpText: "1 being frequently, 5 being never."
  },
  {
    id: "q14",
    category: "Rating",
    type: "star-rating",
    question: "On a scale of 1-5 how accessible is your campus infrastructure?",
    helpText: "1 being not accessible at all, 5 being incredibly accessible."
  },
  {
    id: "q15",
    category: "Rating",
    type: "star-rating",
    question: "On a scale of 1–5, how easy is it for students to find and participate in disability communities and spaces on or near campus?",
    helpText: "1 being not accessible at all, 5 being very accessible and welcoming."
  },
  {
    id: "q16",
    category: "Rating",
    type: "star-rating",
    question: "On a scale of 1-5 how reliable are your accommodations provided by DRS/faculty",
    helpText: "1 being not reliable at all, 5 being incredibly reliable."
  },
  //Write-in Questions
  {
    id: "q17",
    category: "Written",
    type: "text",
    question: "If you are comfortable with having this information included in your public response, please share what accommodations you use and what your experience getting those accommodations met has been?",
    multiline: true,
    placeholder: "Enter your response here..."
  },
  {
    id: "q18",
    category: "Written",
    type: "text",
    question: "Did you feel welcome and supported? Please share 1-3 ways your identity has shaped your experience at this school.",
    multiline: true,
    placeholder: "Enter your response here..."
  },
  {
    id: "q19",
    category: "Written",
    type: "text",
    question: "Please share 1-3 challenges you have experienced related to your identity, particularly as part of one or more underrepresented groups?",
    multiline: true,
    placeholder: "Enter your response here..."
  },
  {
    id: "q20",
    category: "Written",
    type: "text",
    question: "Are there any meaningful community groups or classes you would like to share with prospective students?",
    multiline: true,
    placeholder: "Enter your response here..."
  }
  /*{
    id: "q1",
    type: "star-rating",
    question: "How satisfied are you with our service?",
    required: true,
  },
  {
    id: "q2",
    type: "yes-no",
    question: "Would you recommend our service to others?",
    required: true,
  },
  {
    id: "q3",
    type: "date-range",
    question: "Select the date range for your experience",
    required: true,
  },
  {
    id: "q4",
    type: "text",
    question: "Please provide any additional comments",
    multiline: true,
    maxLength: 500,
    placeholder: "Enter your comments here...",
  },*/
];
