import { Box, Typography } from "@mui/material";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Typography variant="h1" color="primary">
        Welcome
      </Typography>
    </Box>
  );
}

export default App;
