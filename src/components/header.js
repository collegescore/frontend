import React, { useState } from 'react';
import {
  AppBar, Box, Toolbar, IconButton, Typography, Container, Button, Drawer,
  List, ListItem, ListItemButton, ListItemText,} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const navLinks = [
  { title: 'Home', path: '/' },
  { title: 'About', path: '/about' },
  { title: 'Search', path: '/search' },
];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 700 }}>
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
          {/* Mobile "Add Review" Button */}
           <ListItem disablePadding>
              <ListItemButton component="a" href="/review" sx={{ textAlign: 'center' }}>
                <ListItemText primary="Add a Review" primaryTypographyProps={{ color: 'primary', fontWeight: 600 }} />
              </ListItemButton>
            </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <AppBar position="static" color="transparent" elevation={0} component="header">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          {/* --- DESKTOP TITLE --- */}
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 800,
              color: 'grayscale.dark', // Ensure this color exists in your theme
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
                    backgroundColor: 'transparent'
                  }
                }}
              >
                {item.title}
              </Button>
            ))}
            
            <Button 
              variant="contained" 
              color="primary"
              href="/review"
              sx={{ ml: 2 }}
            >
              Add a Review
            </Button>
          </Box>

          {/* --- MOBILE MENU ICON --- */}
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
              fontWeight: 700,
              color: 'primary.main',
              textDecoration: 'none',
            }}
          >
            CollegeScore
          </Typography>
        </Toolbar>
      </Container>

      {/* --- DRAWER (Popup Menu) --- */}
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