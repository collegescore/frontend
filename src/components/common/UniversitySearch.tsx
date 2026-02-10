import React, { useState } from "react";
import { Autocomplete, TextField, Box, Typography } from "@mui/material";
import { College } from "../../types/college";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { V0_COLLEGES } from "@/lib/V0Colleges";



interface UniversitySearchProps {
  onSelect?: (college: College | null) => void;
  // width of search bar is adjustable, parent component can decide how wide the search bar should be.
  width?: string | number;
  // allow for a default value to be passed in, for example in the review form if the user has already 
  // selected a college from the search page and we want to pre-fill the search bar with their selected 
  // college. This should be a College object or null (if no college is selected) rather than just a 
  // string slug, so that the search bar can display the college name properly instead of just showing the slug.
  value?: College | null;
}

// Search bar has default width of 400px, can be overridden via props
export const UniversitySearch = ({
  onSelect,
  width = "100%",
  value: controlledValue = null,
}: UniversitySearchProps) => {


  return (
    <Box sx={{ width: width, maxWidth: 800, margin: "2rem auto" }}>
      <Autocomplete
        options={V0_COLLEGES}
        // Displays the college name field (as opposed to slug or id etc) in the dropdown
        getOptionLabel={(option) => option.name}
        value={controlledValue}
        onChange={(event, newValue) => {
          // 5. Just notify the parent. The parent updates its 'answers' state,
          // which flows back down into the 'value' prop.
          if (onSelect) {
            onSelect(newValue);
          }
        }}

        // This ensures MUI can compare the object from the URL vs the list
        isOptionEqualToValue={(option, value) => option.slug === value?.slug}
        // a11y custom rendering of each option in the dropdown for better screen reader support
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <li key={option.id} {...optionProps}>
              <Box>
                <Typography variant="body1">{option.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {option.city}, {option.state}
                </Typography>
              </Box>
            </li>
          );
        }}
        // Custom filter to allow search by name, city, or state
        filterOptions={(options, { inputValue }) => {
          // change input to lowercase and trim whitespace for better matching
          const query = inputValue.toLowerCase().trim();
          return options.filter(
            (college) =>
              // check if query matches name, city, or state stored in database (in lowercase for matching)
              college.name.toLowerCase().includes(query) ||
              college.city.toLowerCase().includes(query) ||
              college.state.toLowerCase().includes(query),
          );
        }}
        
        // The search logic (default is starts-with/contains)
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search by school name or location"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                // this is for the magnifying glass search icon
                <InputAdornment position="start">
                  <SearchIcon color="action" aria-hidden="true" />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </Box>
  );
};
