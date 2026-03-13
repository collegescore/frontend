"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Autocomplete,
  TextField,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { College } from "../../types/college";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { V0_COLLEGES } from "@/lib/V0Colleges";
import { FEATURE_FLAGS } from "@/config/flag";
import { searchColleges } from "@/lib/api";
import debounce from "lodash/debounce";

interface UniversitySearchProps {
  onSelect?: (college: College | null) => void;
  width?: string | number;
  value?: College | null;
}

export const UniversitySearch = ({
  onSelect,
  width = "100%",
  value: controlledValue = null,
}: UniversitySearchProps) => {
  const [options, setOptions] = useState<College[]>(V0_COLLEGES);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Memoized debounced search to avoid unnecessary re-renders and API calls
  const performRemoteSearch = useMemo(
    () =>
      debounce(async (query: string) => {
        setLoading(true);
        try {
          const results = await searchColleges(query);
          setOptions(results);
        } catch (error) {
          console.error("Search failed:", error);
          setOptions([]);
        } finally {
          setLoading(false);
        }
      }, 400),
    []
  );

  useEffect(() => {
    // Only search the full database if flag is enabled
    if (FEATURE_FLAGS.allowSearchAllSchools) {
      if (inputValue.trim().length > 0) {
        performRemoteSearch(inputValue);
      } else {
        // If search is cleared, show the default V0 list
        setOptions(V0_COLLEGES);
        setLoading(false);
      }
    }
  }, [inputValue, performRemoteSearch]);

  return (
    <Box sx={{ width: width, margin: "2rem auto" }}>
      <Autocomplete
        // Determine source based on flag
        options={FEATURE_FLAGS.allowSearchAllSchools ? options : V0_COLLEGES}
        loading={loading}
        value={controlledValue}
        inputValue={inputValue}
        onInputChange={(_event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onChange={(_event, newValue) => {
          if (onSelect) {
            onSelect(newValue);
          }
        }}
        getOptionLabel={(option) => option.name || ""}
        isOptionEqualToValue={(option, value) => option.slug === value?.slug}
        
        // If we are searching the backend, we disable MUI's local filter
        filterOptions={
          FEATURE_FLAGS.allowSearchAllSchools
            ? (x) => x
            : (options, { inputValue }) => {
                const query = inputValue.toLowerCase().trim();
                return options.filter(
                  (college) =>
                    college.name.toLowerCase().includes(query) ||
                    college.city.toLowerCase().includes(query) ||
                    college.state.toLowerCase().includes(query)
                );
              }
        }

        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          // Use slug as fallback for key if id isn't present
          return (
            <li key={option.id || option.slug} {...optionProps}>
              <Box>
                <Typography variant="body1">{option.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {option.city}, {option.state}
                </Typography>
              </Box>
            </li>
          );
        }}

        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search by school name or location"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" aria-hidden="true" />
                </InputAdornment>
              ),
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </Box>
  );
};