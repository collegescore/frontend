import React, { useState } from 'react';
import { Autocomplete, TextField, Box, Typography } from '@mui/material';
import { College } from '../../types/college';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

// Hardcoded List of Approved Colleges for v0
const V0_COLLEGES: College[] = [
  { id: 377555, slug: 'university-of-washington-bothell-campus-bothell-wa', name: 'University of Washington-Bothell Campus', city: 'Bothell', state: 'WA' },
  { id: 236948, slug: 'university-of-washington-seattle-campus-seattle-wa', name: 'University of Washington-Seattle Campus', city: 'Seattle', state: 'WA' },
  { id: 377564, slug: 'university-of-washington-tacoma-campus-tacoma-wa', name: 'University of Washington-Tacoma Campus', city: 'Tacoma', state: 'WA' },
  { id: 211943, slug: 'emerson-college-boston-ma', name: 'Emerson College', city: 'Boston', state: 'MA' },
];

export const UniversitySearch = () => {
  const [value, setValue] = useState<College | null>(null);

  return (
    <Box sx={{ width: 400, margin: '2rem auto' }}>
      
      <Autocomplete
        options={V0_COLLEGES}
        // Displays the college name field (as opposed to slug or id etc) in the dropdown
        getOptionLabel={(option) => option.name}
        
        // Custom filter to allow search by name, city, or state
        filterOptions={(options, { inputValue }) => {
          // change input to lowercase and trim whitespace for better matching
          const query = inputValue.toLowerCase().trim();
          return options.filter((college) => 
            // check if query matches name, city, or state stored in database (in lowercase for matching)
            college.name.toLowerCase().includes(query) ||
            college.city.toLowerCase().includes(query) ||
            college.state.toLowerCase().includes(query)
          );
        }}

        // Ensures the component handles the "Selected" state correctly
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          if (newValue) {
            console.log(`Selected: ${newValue.name} (ID: ${newValue.id})`);
          }
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
                    <SearchIcon color="action" />
                </InputAdornment>
                ),
            }}
          />
        )}
      />
    </Box>
  );
};