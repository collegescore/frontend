/*All functions that call FastAPI backend */

export const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export type SubmitReviewAnswers = Record<
	string,
	string | number | boolean | null | string[] | Date
>;

const ARRAY_FIELDS = new Set([
	"lgbtq_identity",
	"poc_identity",
	"disability_identity",
]);

const normalizeAnswers = (answers: SubmitReviewAnswers) =>
	Object.fromEntries(
		Object.entries(answers).map(([key, value]) => {
			if (value instanceof Date) {
				return [key, value.toISOString()];
			}

		if (ARRAY_FIELDS.has(key) && typeof value === "string") {
			return [key, [value]];
		}

		return [key, value];
		}),
	);

export const submitReview = async (answers: SubmitReviewAnswers) => {
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
