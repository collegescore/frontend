/*Review entry type definition, can be expanded as needed to include more fields such as review text, date, etc.*/
import { Ratings } from "./ratings";
export interface ReviewEntry {
    review_date: string;
    identity_chips: string[]; // e.g. ["wheelchair user", "LGBTQ+"]
    share_accommodations_text: string;
    share_positive_text: string;
    share_challenges_test: string;
    share_community_groups_text: string;
    ratings: Ratings;
}