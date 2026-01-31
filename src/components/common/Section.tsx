"use client";

import React from "react";
import { Box, Container, SxProps, Theme } from "@mui/material";

interface SectionProps {
  children: React.ReactNode;
  bgcolor?: string; // e.g. "primary.main" or "grayscale.light"
  id?: string;
  sx?: SxProps<Theme>;
}

const Section = ({
  children,
  bgcolor = "transparent",
  id,
  sx,
}: SectionProps) => {
  return (
    <Box
      component="section"
      id={id}
      sx={{
        bgcolor: bgcolor,
        py: { xs: 8, md: 10 },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default Section;
