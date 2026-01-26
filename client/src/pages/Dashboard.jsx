import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Properties
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/create')}>
          Create New Property
        </Button>
      </Box>
      <Typography variant="body1" color="text.secondary">
        No properties found.
      </Typography>
    </Container>
  );
}
