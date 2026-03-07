/**
 * Feature Flags for the application.
 */
export const FEATURE_FLAGS = {
  isSearchEnabled: process.env.NEXT_PUBLIC_SHOW_SEARCH_PAGE === "true",
  isCollegePageBackendEnabled:
    process.env.NEXT_PUBLIC_COLLEGE_PAGE_BACKEND === "true",
  isReviewSortEnabled: process.env.NEXT_PUBLIC_REVIEW_SORT === "true",
  isReviewSummariesEnabled: process.env.NEXT_PUBLIC_SHOW_SUMMARIES === "true",
  // more flags can be added here in the future as needed
} as const;
