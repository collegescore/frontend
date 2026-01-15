import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import InterWoff2 from './fonts/Inter-VariableFont_wght.woff2'

const theme = createTheme({
  palette: {
    primary: {
      main: "#29527A",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1:{
      fontWeight: 700,
      textTransform: "capitalize",
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
          src: local('Inter'), local('Inter-Regular'), url(${InterWoff2}) format('woff2');
        }
      `,
    },
  },
});

export default responsiveFontSizes(theme);
