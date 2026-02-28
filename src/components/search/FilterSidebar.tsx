"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Slider,
  Divider,
  Paper,
  Autocomplete,
  TextField,
  Stack,
} from "@mui/material";
import BasicButton from "../common/BasicButton";
import US_STATES from "@/lib/usStatesList";
import { SearchFilters } from "@/types/search_filters";

const DEFAULT_FILTERS: SearchFilters = {
  sort_by: "a11y_high_low",
  state: "",
  has_disability_cultural_center: false,
  min_safety: 0,
  min_inclusivity: 0,
};

interface FilterSidebarProps {
  currentFilters: SearchFilters;
  onApply: (filters: SearchFilters) => void;
}

export default function FilterSidebar({
  currentFilters,
  onApply,
}: FilterSidebarProps) {
  /**
   * We use 'pendingFilters' as a local staging state.
   * This allows the user to make multiple changes (e.g., sliding two sliders
   * and picking a state) without triggering a backend API call on every click.
   * The changes are only "committed" to the parent component when they click 'Apply'.
   */
  const [pendingFilters, setPendingFilters] = useState(currentFilters);

  // Sync internal pendingFilters if URL changes (e.g. browser back button)
  useEffect(() => {
    setPendingFilters(currentFilters);
  }, [currentFilters]);

  const handleChange = (
    field: keyof SearchFilters,
    value: string | number | boolean | null,
  ) => {
    setPendingFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Paper
      component="aside"
      role="search"
      aria-labelledby="filter-title"
      sx={{
        p: 3,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
      }}
      elevation={0}
    >
      <Typography
        id="filter-title"
        variant="h6"
        sx={{ mb: 2, fontWeight: 700 }}
      >
        Filters
      </Typography>

      <Box component="form" noValidate>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="sort-by-label">Sort By</InputLabel>
          <Select
            labelId="sort-by-label"
            id="sort-by-select"
            label="Sort By"
            value={pendingFilters.sort_by}
            onChange={(e) => handleChange("sort_by", e.target.value)}
          >
            <MenuItem value="a11y_high_low">Accessibility High to Low</MenuItem>
            <MenuItem value="alphabetical">Name: A to Z</MenuItem>
          </Select>
        </FormControl>

        <Autocomplete
          id="state-search-select"
          options={US_STATES}
          value={pendingFilters.state || null}
          onChange={(_, val) => handleChange("state", val)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="State"
              placeholder="Search state (e.g. CA)"
            />
          )}
          sx={{ mb: 3 }}
          aria-label="Filter by state abbreviation"
        />
        <Typography
          component="legend"
          variant="subtitle2"
          sx={{ mb: 1, fontWeight: 600 }}
        >
          Campus Features
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={pendingFilters.has_disability_cultural_center}
              onChange={(e) =>
                handleChange("has_disability_cultural_center", e.target.checked)
              }
            />
          }
          label="Disability Cultural Center"
        />

        <Divider sx={{ my: 3 }} />

        <Typography
          component="legend"
          variant="subtitle2"
          sx={{ mb: 1, fontWeight: 600 }}
        >
          Minimum Scores
        </Typography>

        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Min. Safety Score
        </Typography>
        <Slider
          value={pendingFilters.min_safety}
          step={0.5}
          min={0}
          max={5}
          marks
          valueLabelDisplay="auto"
          aria-label="Minimum safety score"
          onChange={(_, val) => handleChange("min_safety", val)}
        />

        <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
          Min. Inclusivity Score
        </Typography>
        <Slider
          value={pendingFilters.min_inclusivity}
          step={0.5}
          min={0}
          max={5}
          marks
          valueLabelDisplay="auto"
          aria-label="Minimum inclusivity score"
          onChange={(_, val) => handleChange("min_inclusivity", val)}
        />

        <Stack spacing={2} sx={{ mt: 4 }}>
          <BasicButton
            text="Apply Filters"
            onClick={() => onApply(pendingFilters)}
          />
          <BasicButton
            text="Clear All"
            color="secondary"
            onClick={() => onApply(DEFAULT_FILTERS)}
          />
        </Stack>
      </Box>
    </Paper>
  );
}
