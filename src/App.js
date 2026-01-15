import { Box, Typography, Button } from "@mui/material";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Typography variant="h1" color="primary">
        H1 long 
      </Typography>
      <Typography variant="h2" color="primary">
        H2
      </Typography>
      <Typography variant="h3" color="primary">
        H3
      </Typography>
      <Typography variant="h4" color="primary">
        H4
      </Typography>
      <Typography variant="h5" color="primary">
        H5
      </Typography>
      <Typography variant="h6" color="primary">
        H6
      </Typography>
      <Typography variant="subtitle1" color="primary">
        subtitle1
      </Typography>
      <Typography variant="subtitle2" color="primary">
        subtitle2
      </Typography>
      <Typography variant="body1" color="primary">
        body1
      </Typography>
      <Typography variant="body2" color="primary">
        body2
      </Typography>
      <Typography variant="button" color="primary">
        button
      </Typography>
      <Typography variant="caption" color="primary">
        caption
      </Typography>
      <Typography variant="overline" color="primary">
        overline
      </Typography>
      <Button variant="contained" color="primary">
        Click Me
      </Button>
    </Box>
  );
}

export default App;
