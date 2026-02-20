/*
College type definition, can be expanded as needed to include scores, urls, etc.
*/

export interface College {
  id: number;
  slug: string;
  name: string;
  city: string;
  state: string; //note that this is the state abbreviation, e.g. "CA" for California
  a11y_overall: number;
  safety_overall: number;
  inclusivity_overall: number;
  num_reviews: number;
}
