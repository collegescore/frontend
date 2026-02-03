import React, { useState } from 'react';
import { Autocomplete, TextField, Box, Typography } from '@mui/material';
import { College } from '../../types/college';

// Hardcoded List of Approved Colleges for v0
const V0_COLLEGES: College[] = [
  { id: 377555, slug: 'university-of-washington-bothell-campus-bothell-wa', name: 'University of Washington-Bothell Campus', city: 'Bothell', state: 'WA' },
  { id: 236948, slug: 'university-of-washington-seattle-campus-seattle-wa', name: 'University of Washington-Seattle Campus', city: 'Seattle', state: 'WA' },
  { id: 377564, slug: 'university-of-washington-tacoma-campus-tacoma-wa', name: 'University of Washington-Tacoma Campus', city: 'Tacoma', state: 'WA' },
];

export const UniversitySearch = () => {
  const [value, setValue] = useState<College | null>(null);

  return (
    <Box sx={{ width: 400, margin: '2rem auto' }}>
      
      <Autocomplete
        options={V0_COLLEGES}
        // Displays the college name in the dropdown
        getOptionLabel={(option) => option.name}
        // Ensures the component handles the "Selected" state correctly
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          if (newValue) {
            console.log(`Selected: ${newValue.name} (ID: ${newValue.id})`);
            // Here is where you'd navigate to the review page
          }
        }}
        // The search logic (default is starts-with/contains)
        renderInput={(params) => (
          <TextField 
            {...params} 
            label="Search Colleges" 
            placeholder="e.g. University of..." 
          />
        )}
      />
    </Box>
  );
};