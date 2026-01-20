
import {Stack, Box, Typography, Button, Container } from "@mui/material";

function App() {
  return (
    <>
    <header>Header!</header>{/* change this to be a proper AppBar with responsive menu later */}
    <main> 
      {/*replace this with routes later */}
      <Container component="section">
        <Stack alignItems={"center"} gap={2}>
            <Typography variant="h1" color="primary" textTransform="uppercase">
              H1
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
              typography button
            </Typography>
            <Typography variant="caption" color="primary">
              caption
            </Typography>
            <Typography variant="overline" color="primary">
              overline
            </Typography>
          <Box bgcolor="primary.main" p={2} >
          <Button variant="outlined" color="secondary">
            Outlined Secondary
          </Button>
          </Box>
          <Button variant="outlined" color="primary">
            Outlined Primary
          </Button>
          <Button variant="contained" color="primary">
            Contained Primary
          </Button>
          <Box bgcolor="primary.main" p={2} >
          <Button variant="contained" color="secondary">
            Contained Secondary
          </Button>
          </Box>
        </Stack>
      </Container>
    </main>
    <footer>Footer!</footer>{/* change this to be a proper footer later */}
    </>
  );
}

export default App;
