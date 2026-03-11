/*Review entry type definition, can be expanded as needed to include more fields such as review text, date, etc.*/
import { Ratings } from "./ratings";
export interface ReviewEntry {
  id: string;
  review_date: string;
  identities?: string[]; // e.g. ["wheelchair user", "LGBTQ+"]
  share_accommodations_text?: string;
  share_positive_text?: string;
  share_challenges_text?: string;
  share_groups_text?: string;
  ratings: Ratings;
}

/**Fetch reviews for a specific college by slug and possible filters */
export interface ReviewParams {
  page: number;
  limit: number;
  sort?: string; //potential future param
}