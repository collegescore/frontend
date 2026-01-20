import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const navLinks = [
  { title: 'Home', path: '/' },
  { title: 'About', path: '/about' },
  { title: 'Search', path: '/search' },
];

/**
 * Reusable "Add Review" Button Component
 * Accepts 'sx' props so we can style margins differently for mobile vs desktop
 */
const AddReviewButton = ({ sx = {} }) => (
  <Button 
    variant="contained" 
    color="primary" 
    href="/review"
    sx={{ fontWeight: 600, ...sx }} // Merge default styles with passed styles
  >
    Add a Review
  </Button>
);

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Drawer content for mobile view
  const drawerContent = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography
        variant="h6"
        sx={{ my: 2, fontWeight: 800, color: 'primary.main' }}
      >
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
          
          {/* Mobile Button - Centered with margin top */}
          <ListItem sx={{ justifyContent: 'center', mt: 2 }}>
            <AddReviewButton />
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
            <AddReviewButton sx={{ ml: 2 }} />
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
              fontWeight: 800,
              color: 'grayscale.dark',
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