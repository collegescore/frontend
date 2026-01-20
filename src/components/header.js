import React, { useState } from 'react';
import {AppBar, Box, Toolbar, IconButton, Typography, Container, Button, Drawer, List,
  ListItem, ListItemButton, ListItemText,} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; 
const navLinks = [
  { title: 'Home', path: 'home' },
  { title: 'About', path: 'about' },
  { title: 'Search', path: 'search' },
];

/**
 * A responsive, accessible header component.
 * Uses <header> and <nav> tags for semantic HTML.
 */
function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        CollegeScore
      </Typography>
      <Box component="nav">
        <List>
          {navLinks.map((item) => (
            <ListItem key={item.title} disablePadding>
              <ListItemButton component="a" href={item.path} sx={{ textAlign: 'center' }}>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    // 'component="header"' renders this as a semantic <header> tag
    <AppBar position="static" color="transparent" elevation={0} component="header">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          {/* --- LOGO --- */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 800,
              color: 'grayscale.dark',
              textDecoration: 'none',
              flexGrow: 1, // Pushes the nav links to the right
            }}
          >
            CollegeScore
          </Typography>

          {/* --- DESKTOP NAV --- */}
          {/* We use Box component="nav" for accessibility */}
          <Box component="nav" sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {navLinks.map((item) => (
              <Button
                key={item.title}
                href={item.path}
                onClick={() => console.log(`Navigating to ${item.title}`)}
                sx={{ 
                  my: 2, 
                  color: 'grayscale.main', // Using your custom theme color safely
                  display: 'block',
                  '&:hover': {
                    color: 'grayscale.dark',
                    backgroundColor: 'transparent' // optional: removes gray hover background
                  }
                }}
              >
                {item.title}
              </Button>
            ))}
            {/* Call to Action Button */}
            <Button 
              variant="contained" 
              color="primary"
              sx={{ my: 'auto', ml: 2 }}
            >
              Add a Review
            </Button>
          </Box>

          {/* --- MOBILE MENU ICON --- */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleDrawerToggle}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* --- MOBILE LOGO (Centered) --- */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'primary.main',
              textDecoration: 'none',
            }}
          >
            MY WEBSITE
          </Typography>
        </Toolbar>
      </Container>

      {/* --- MOBILE DRAWER --- */}
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>
    </AppBar>
  );
}

export default Header;