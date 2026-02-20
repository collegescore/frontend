import React from "react";
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Divider, 
  Button, 
  Link 
} from "@mui/material";

interface College {
  id: number | string;
  name: string;
  city: string;
  state: string;
  accessibility: number;
  safety: number;
  inclusivity: number;
  reviewCount: number;
}

const CollegeCard = ({ college }: { college: College }) => {
  return (
    <Card 
      component="article" 
      sx={{ 
        maxWidth: 345, 
        borderRadius: 4, // 16px
        overflow: 'hidden',
        boxShadow: 3,
        '&:hover': { boxShadow: 6 } 
      }}
    >
      {/* Top section using Theme Primary Color */}
      <Box 
        role="presentation"
        sx={{ 
          height: 80, 
          bgcolor: 'primary.main' 
        }} 
      />

      <CardContent sx={{ p: 3 }}>
        <header>
          <Typography 
            variant="h6" 
            component="h3" 
            sx={{ fontWeight: 'bold', lineHeight: 1.2 }}
          >
            {college.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span style={{ clip: 'path(0 0 0 0)', position: 'absolute', width: 1, height: 1, overflow: 'hidden' }}>
              Location: 
            </span>
            {college.city}, {college.state}
          </Typography>
        </header>

        <Divider sx={{ my: 2 }} aria-hidden="true" />

        {/* Semantic Description List for Ratings */}
        <Box 
          component="dl" 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr 1fr', 
            textAlign: 'center',
            m: 0 
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography component="dt" variant="caption" sx={{ fontWeight: 'bold', color: 'text.secondary', textTransform: 'uppercase' }}>
              Access
            </Typography>
            <Typography component="dd" variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', m: 0 }}>
              {college.accessibility}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography component="dt" variant="caption" sx={{ fontWeight: 'bold', color: 'text.secondary', textTransform: 'uppercase' }}>
              Safety
            </Typography>
            <Typography component="dd" variant="h6" sx={{ fontWeight: 'bold', color: 'success.main', m: 0 }}>
              {college.safety}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography component="dt" variant="caption" sx={{ fontWeight: 'bold', color: 'text.secondary', textTransform: 'uppercase' }}>
              Incl.
            </Typography>
            <Typography component="dd" variant="h6" sx={{ fontWeight: 'bold', color: 'secondary.main', m: 0 }}>
              {college.inclusivity}
            </Typography>
          </Box>
        </Box>

        <Box 
          component="footer" 
          sx={{ 
            mt: 3, 
            pt: 2, 
            borderTop: '1px solid', 
            borderColor: 'divider',
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 500 }}>
            {college.reviewCount} reviews
          </Typography>
          <Button 
            size="small" 
            variant="text" 
            component={Link} 
            href={`/colleges/${college.id}`}
            sx={{ fontWeight: 'bold' }}
          >
            Details →
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CollegeCard;