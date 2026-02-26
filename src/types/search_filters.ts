// This file defines the TypeScript interface for the search filters used in the college search functionality.
export interface SearchFilters {
  sort_by: string;
  state: string;
  has_disability_cultural_center: boolean;
  min_safety: number;
  min_inclusivity: number;
}