import React, { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Container, Button, Drawer, 
    List, ListItem, ListItemButton, ListItemText, } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BasicButton from './BasicButton';

// Navigation links (simple data array used for both desktop and mobile nav)
const navLinks = [
  { title: 'Home', path: '/' },
  { title: 'About', path: '/about' },
  //Search page not implemented for V0
  //{ title: 'Search', path: '/search' },
];

// Header Component
function Header() {
  // State to manage whether the mobile drawer is open or closed
  // Only used for small screens: clicking the MenuIcon toggles this.
  const [mobileOpen, setMobileOpen] = useState(false);

  // Toggle handler for the mobile drawer.
  // Called by the hamburger IconButton and the Drawer onClose.
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Drawer content for mobile view
  const drawerContent = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
       {/* App title shown in the drawer */}
      <Typography
        variant="h6"
        sx={{ my: 2, fontWeight: 800, color: 'primary.main' }}
      >
        CollegeScore
      </Typography>
      {/* Navigation list (re-uses navLinks array) */}
      <Box component="nav">
        <List>
          {navLinks.map((item) => (
            <ListItem key={item.title} disablePadding>
              <ListItemButton component="a" href={item.path} sx={{ textAlign: 'center' }}>
                <ListItemText 
                  primary={item.title} 
                  primaryTypographyProps={{ 
                    fontWeight: 600, 
                    color: 'grayscale.main',
                  }}/>
              </ListItemButton>
            </ListItem>
          ))}
          
          {/* Mobile Button - Centered with margin top */}
          <ListItem sx={{ justifyContent: 'center', mt: 2 }}>
            <BasicButton text="Add Review" color="primary" />
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <AppBar position="static" color="transparent" elevation={0} component="header">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          {/* --- DESKTOP TITLE --- 
              Visible only on medium screens and up.
              The `display: { xs: 'none', md: 'flex' }` controls this using MUI breakpoints.
              By default `md` corresponds to >= 900px. 
          */}
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 800,
              color: 'grayscale.dark',
              textDecoration: 'none',
              flexGrow: 1,
            }}
          >
            CollegeScore
          </Typography>

          {/* --- DESKTOP NAV --- */}
          <Box component="nav" sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {navLinks.map((item) => (
              <Button
                key={item.title}
                href={item.path}
                sx={{
                  fontWeight: 600,
                  color: 'grayscale.main',
                  '&:hover': {
                    color: 'grayscale.dark',
                    backgroundColor: 'transparent',
                  },
                }}
              >
                {item.title}
              </Button>
            ))}
            
            {/* Desktop Button - Added left margin to separate from links */}
            <BasicButton text="Add Review" color="primary" sx={{ ml: 2 }} />
          </Box>

          {/* --- MOBILE MENU ICON --- 
              Visible only on small screens.
              Clicking this toggles `mobileOpen` which controls the Drawer. 
          */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              onClick={handleDrawerToggle}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* --- MOBILE TITLE (Centered) --- */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 800,
              color: 'grayscale.dark',
              textDecoration: 'none',
            }}
          >
            CollegeScore
          </Typography>
        </Toolbar>
      </Container>

      {/* --- DRAWER (Popup Menu) --- 
          Temporary drawer used for mobile navigation.
          It is only shown on xs..sm screens because of `display: { xs: 'block', md: 'none' }`.
          The `open` prop is controlled by `mobileOpen`. 
      */}
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
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