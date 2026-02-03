import React, { useState } from 'react';
import { Autocomplete, TextField, Box, Typography } from '@mui/material';

// Define the shape of your university data
interface University {
  id: string;
  name: string;
  location: string;
}

// v0 Hardcoded List
const APPROVED_COLLEGES: University[] = [
  { id: '1', name: 'University of Washington', location: 'Seattle, WA' },
  { id: '2', name: 'Stanford University', location: 'Stanford, CA' },
  { id: '3', name: 'MIT', location: 'Cambridge, MA' },
  { id: '4', name: 'Georgia Institute of Technology', location: 'Atlanta, GA' },
  // Add your other v0 schools here
];

export const UniversitySearch = () => {
  const [value, setValue] = useState<University | null>(null);

  return (
    <Box sx={{ width: 400, margin: '2rem auto' }}>
      <Typography variant="h6" gutterBottom>
        Find your University
      </Typography>
      
      <Autocomplete
        options={APPROVED_COLLEGES}
        // Tells MUI which property to display in the list
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
            label="Search Schools" 
            placeholder="e.g. University of..." 
          />
        )}
        // Custom rendering for the dropdown items (optional)
        renderOption={(props, option) => (
          <Box component="li" {...props} key={option.id}>
            <Box>
              <Typography variant="body1">{option.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {option.location}
              </Typography>
            </Box>
          </Box>
        )}
      />
    </Box>
  );
};