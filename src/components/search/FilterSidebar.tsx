import React from "react";
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
} from "@mui/material";
import US_STATES from "@/lib/usStatesList";

export default function FilterSidebar() {
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
        {/* Sort By Filter */}
        <Box>
          <Typography
            component="legend"
            variant="subtitle2"
            sx={{ mb: 1, fontWeight: 600 }}
          >
            Sort By
          </Typography>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="sort-by-label">Sort By</InputLabel>
            <Select
              labelId="sort-by-label"
              id="sort-by-select"
              label="Sort By"
              defaultValue="a11y_high_low"
            >
              <MenuItem value="a11y_high_low">
                Accessibility High to Low
              </MenuItem>
              <MenuItem value="alphabetical">Name: A to Z</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* State Filter with Search/Type functionality */}
        <Box>
          <Typography
            component="legend"
            variant="subtitle2"
            sx={{ mb: 1, fontWeight: 600 }}
          >
            State
          </Typography>
          <Autocomplete
            id="state-search-select"
            options={US_STATES}
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
        </Box>

        {/* Binary / Feature Filters */}
        <Box component="fieldset" sx={{ border: "none", p: 0, m: 0, mb: 3 }}>
          <Typography
            component="legend"
            variant="subtitle2"
            sx={{ mb: 1, fontWeight: 600 }}
          >
            Campus Features
          </Typography>
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Disability Cultural Center"
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Score Filter */}
        <Box component="fieldset" sx={{ border: "none", p: 0, m: 0 }}>
          <Typography
            component="legend"
            variant="subtitle2"
            sx={{ mb: 1, fontWeight: 600 }}
          >
            Min. Safety Score
          </Typography>
          <Slider
            defaultValue={0}
            step={0.5}
            marks
            min={0}
            max={5}
            valueLabelDisplay="auto"
            aria-label="Minimum safety score"
          />
        </Box>
        <Box component="fieldset" sx={{ border: "none", p: 0, m: 0 }}>
          <Typography
            component="legend"
            variant="subtitle2"
            sx={{ mb: 1, fontWeight: 600 }}
          >
            Min. Inclusivity Score
          </Typography>
          <Slider
            defaultValue={0}
            step={0.5}
            marks
            min={0}
            max={5}
            valueLabelDisplay="auto"
            aria-label="Minimum inclusivity score"
          />
        </Box>
      </Box>
    </Paper>
  );
}
