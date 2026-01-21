import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { Theme } from '@mui/material/styles';
import InterWoff2 from './fonts/Inter-VariableFont_wght.woff2';
import {CSSProperties} from 'react';

// Augment the palette to include a grayscale color
declare module '@mui/material/styles' {
  interface Palette {
    grayscale: Palette['primary'];
  }

  interface PaletteOptions {
    grayscale?: PaletteOptions['primary'];
  }
}

// Initial theme creation
let theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#29527A",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
});

// Common styles for headings to avoid repetition
const headingStyles: CSSProperties = {
  fontWeight: 700,
  textTransform: "capitalize",
};

// Extend the initial theme with more color customizations
// Benifit: This way we can easily use theme.palette values in our customizations
theme = createTheme(theme, {
  palette: {
    secondary: {
      main: "#ffffff",
      dark:"#e6e6e6",
      contrastText: theme.palette.primary.main,
    },
    grayscale: theme.palette.augmentColor({
      color:{
        main: "#666666",
        light: "#ffffff",
        dark: "#1a1a1a",
      },
      name: 'grayscale',
    })
  }
});

//Extend the initial theme with typography and component customizations
theme = createTheme(theme, {
  typography: {
    h1: headingStyles,
    h2: headingStyles,
    h3: headingStyles,
    h4: headingStyles,
    body1: {
      color: theme.palette.grayscale.main
    },
    button: {
      textTransform: "none",
      fontSize: "1rem",
      fontWeight: 600,
    },
  },
  components:{
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-display: swap;
          font-weight: 100 900;
          src: url(${InterWoff2}) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2202, U+2206, U+220F, U+2211, U+2212, U+2215, U+FEFF, U+FFFD;
        }
      `,
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
      styleOverrides:{
        root:{
          paddingInline: "2rem",
          paddingBlock: "0.75rem",
          borderRadius: "8px",
          transition: "background-color 0.4s ease",
        },
        outlined:{
          borderWidth: "1.5px",
        },
      },
    },
  },
});

const finalTheme: Theme = responsiveFontSizes(theme);

export default finalTheme;
