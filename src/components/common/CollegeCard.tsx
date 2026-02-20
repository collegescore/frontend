import React from "react";
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Divider, 
  Button 
} from "@mui/material";
import Link from "next/link";

interface College {
  slug: string;
  name: string;
  city: string;
  state: string; // this is the state abbreviation (e.g., "CA" for California)
  a11y_overall: number;
  safety_overall: number;
  inclusivity_overall: number;
  num_reviews: number;
}

const CollegeCard = ({ college }: { college: College }) => {
  return (
    <Card 
      component="article" 
      sx={{ 
        width: '100%', 
        borderRadius: 4, 
        overflow: 'hidden',
        boxShadow: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': { 
          boxShadow: 6,
          transform: 'translateY(-4px)' // Subtle lift effect
        } 
      }}
    >
      {/* Visual Accent */}
      <Box 
        role="presentation"
        sx={{ height: 64, bgcolor: 'primary.main' }} 
      />

      <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <header>
          <Typography 
            variant="h6" 
            component="h3" 
            sx={{ fontWeight: 800, color: 'text.primary', mb: 0.5 }}
          >
            {college.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            {college.city}, {college.state}
          </Typography>
        </header>

        <Divider sx={{ my: 2 }} aria-hidden="true" />

        {/* Semantic Ratings Section */}
        <Box 
          component="dl" 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: 1,
            textAlign: 'center',
            m: 0 
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography component="dt" variant="caption" sx={{ fontWeight: 700, color: 'text.disabled', textTransform: 'uppercase' }}>
              Access
            </Typography>
            <Typography component="dd" variant="h6" sx={{ fontWeight: 800, color: 'primary.main', m: 0 }}>
              {college.a11y_overall}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography component="dt" variant="caption" sx={{ fontWeight: 700, color: 'text.disabled', textTransform: 'uppercase' }}>
              Safety
            </Typography>
            <Typography component="dd" variant="h6" sx={{ fontWeight: 800, color: 'success.main', m: 0 }}>
              {college.safety_overall}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography component="dt" variant="caption" sx={{ fontWeight: 700, color: 'text.disabled', textTransform: 'uppercase' }}>
              Incl.
            </Typography>
            <Typography component="dd" variant="h6" sx={{ fontWeight: 800, color: 'secondary.main', m: 0 }}>
              {college.inclusivity_overall}
            </Typography>
          </Box>
        </Box>

        <Box 
          component="footer" 
          sx={{ 
            mt: 'auto', 
            pt: 3, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
            {college.num_reviews} reviews
          </Typography>
          
          <Link href={`/colleges/${college.slug}`} passHref legacyBehavior>
            <Button 
              size="small" 
              variant="outlined" 
              sx={{ 
                fontWeight: 700, 
                borderRadius: 2,
                textTransform: 'none'
              }}
            >
              View School
            </Button>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CollegeCard;