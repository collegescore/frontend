/**
 * Feature Flags for the application.
 */
export const FEATURE_FLAGS = {
  isSearchEnabled: process.env.NEXT_PUBLIC_SHOW_SEARCH_PAGE === "true",
  // more flags can be added here in the future as needed
} as const;
