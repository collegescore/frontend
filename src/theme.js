import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import InterWoff2 from './fonts/Inter-VariableFont_wght.woff2'

const headingStyles = {
  fontWeight: 700,
  textTransform: "capitalize",
};

let theme = createTheme({
  palette: {
    primary: {
      main: "#29527A",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
});

theme = createTheme(theme, {
  palette: {
    secondary: {
      main: "#ffffff",
      dark:"#e6e6e6",
      contrastText: theme.palette.primary.main,
    },
    /*Alternate to having white as secondary, we can create a custom color
      primaryContrast: { //NOTICE:If we switch to typscript this will break  until we augment the pallet https://mui.com/material-ui/customization/palette/
      main: "#FFFFFF",
      light: "#f2f2f2",
      dark:"#e6e6e6",
      contrastText: theme.palette.primary.main,
    },*/
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
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
          borderWidth: "2px",
        },
        /*Use if using custom color instead of secondary white
          outlinedPrimaryContrast:{
          color: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
          "&:hover": {
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.palette.action.hover,
          },
        },*/
      },
    },
  },
});

export default responsiveFontSizes(theme);
