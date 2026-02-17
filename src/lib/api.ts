/*All functions that call FastAPI backend */
import type { Answer } from "@/types/review_qa";
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

/**Columns that should be treated as arrays */
const ARRAY_FIELDS = new Set([
  "lgbtq_identity",
  "poc_identity",
  "disability_identity",
]);

/**Convert answers to a format suitable for backend submission */
const normalizeAnswers = (answers: Answer) =>
  Object.fromEntries(
    Object.entries(answers).map(([key, value]) => {
      if (value instanceof Date) {
        //convert dates to ISO string
        return [key, value.toISOString()];
      }

      if (ARRAY_FIELDS.has(key) && typeof value === "string") {
        return [key, [value]];
      }

      return [key, value];
    }),
  );

export const submitReview = async (answers: Answer) => {
  const response = await fetch(`${API_BASE_URL}/v0/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers: normalizeAnswers(answers) }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to submit review");
  }

  return response.json();
};

export const addEmail = async (email: string) => {
  const response = await fetch(`${API_BASE_URL}/v0/emails`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to add email");
  }

  return response.json();
};
