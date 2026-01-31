"use client"; // Required for MUI themes in Next.js

import { createTheme, responsiveFontSizes, Theme } from "@mui/material/styles";
import { CSSProperties } from "react";

// Augment the palette
declare module "@mui/material/styles" {
  interface Palette {
    grayscale: Palette["primary"];
  }
  interface PaletteOptions {
    grayscale?: PaletteOptions["primary"];
  }
}

// 1. Initial theme creation
let theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#29527A",
    },
  },
  typography: {
    // USE THE VARIABLE HERE:
    fontFamily: "sans-serif",
  },
});

const headingStyles: CSSProperties = {
  fontWeight: 700,
  textTransform: "capitalize",
};

// 2. Extend with colors
theme = createTheme(theme, {
  palette: {
    secondary: {
      main: "#ffffff",
      dark: "#e6e6e6",
      contrastText: theme.palette.primary.main,
    },
    grayscale: theme.palette.augmentColor({
      color: {
        main: "#666666",
        light: "#ffffff",
        dark: "#1a1a1a",
      },
      name: "grayscale",
    }),
  },
});

// 3. Extend with typography & components
theme = createTheme(theme, {
  typography: {
    h1: headingStyles,
    h2: headingStyles,
    h3: headingStyles,
    h4: headingStyles,
    button: {
      textTransform: "none",
      fontSize: "1rem",
      fontWeight: 600,
    },
  },
  components: {
    // REMOVED: MuiCssBaseline styleOverrides (handled by Next.js now)
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          paddingInline: "2rem",
          paddingBlock: "0.75rem",
          borderRadius: "8px",
          transition: "background-color 0.4s ease",
        },
        outlined: {
          borderWidth: "1.5px",
        },
      },
    },
  },
});

const finalTheme: Theme = responsiveFontSizes(theme);
export default finalTheme;
