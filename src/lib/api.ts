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

/**Extract error message from a failed response */
const getErrorMessage = async (
  response: Response,
  fallbackMessage: string,
): Promise<string> => {
  // Prefer JSON error payloads from FastAPI (e.g., {"detail": "..."})
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    // Parse and use the detail field when available
    const errorData = await response.json().catch(() => null);
    return errorData?.detail || fallbackMessage;
  }

  // Fallback for plain-text error bodies
  const errorText = await response.text();
  return errorText || fallbackMessage;
};

export const submitReview = async (answers: Answer) => {
  const response = await fetch(`${API_BASE_URL}/v0/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers: normalizeAnswers(answers) }),
  });

  if (!response.ok) {
    const message = await getErrorMessage(response, "Failed to submit review");
    throw new Error(message);
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
    const message = await getErrorMessage(response, "Failed to add email");
    throw new Error(message);
  }

  return response.json();
};

/**Fetch college details by slug for dynamic metadata generation */
export const getCollege = async (slug: string) => {
  
  const response = await fetch(`${API_BASE_URL}/v0/colleges/${slug}`);

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      `Failed to fetch college details for slug: ${slug}`,
    );
    throw new Error(message);
  }

  return response.json();
};

/**Fetch reviews for a specific college by slug */
export const getCollegeReviews = async (slug: string, page: number) => {
  const response = await fetch(`${API_BASE_URL}/v0/colleges/${slug}/reviews?page=${page}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      `Failed to fetch college reviews for slug: ${slug}`,
    );
    throw new Error(message);
  }

  return response.json();
};

/** Search colleges with dynamic filters */
export const filterColleges = async (
  params: Record<string, string | number | boolean | null>,
) => {
  const query = new URLSearchParams();

  // Append params only if they have a value
  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== null &&
      value !== undefined &&
      value !== "" &&
      value !== 0 &&
      value !== false
    ) {
      query.append(key, value.toString());
    }
  });

  const response = await fetch(
    `${API_BASE_URL}/v0/colleges/filter?${query.toString()}`,
  );

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "Failed to search colleges",
    );
    throw new Error(message);
  }

  return response.json(); // Returns the array of College objects
};
