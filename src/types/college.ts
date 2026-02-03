/*
College type definition, can be expanded as needed to include scores, urls, etc.
*/

export interface College {
  id: number;
  slug: string;
  name: string;
  city: string;
  state: string;
}
