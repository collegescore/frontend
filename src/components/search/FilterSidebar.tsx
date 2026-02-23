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
      sx={{ p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}
      elevation={0}
    >
      <Typography id="filter-title" variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
        Filters
      </Typography>
      
      <Box component="form" noValidate>
        {/* State Filter with Search/Type functionality */}
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
          // A11y: ensures screen readers treat this as a combobox
          aria-label="Filter by state abbreviation"
        />

        <Divider sx={{ my: 3 }} />

        {/* Binary / Feature Filters */}
        <Box component="fieldset" sx={{ border: 'none', p: 0, m: 0, mb: 3 }}>
          <Typography component="legend" variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Campus Features
          </Typography>
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Disability Cultural Center"
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Score Filter */}
        <Box component="fieldset" sx={{ border: 'none', p: 0, m: 0 }}>
          <Typography component="legend" variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Min. Accessibility Score
          </Typography>
          <Slider
            defaultValue={0}
            step={0.5}
            marks
            min={0}
            max={5}
            valueLabelDisplay="auto"
            aria-label="Minimum accessibility score"
          />
        </Box>
      </Box>
    </Paper>
  );
}