import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Wizard() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Button variant="text" onClick={() => navigate('/')} sx={{ mb: 2 }}>
        &larr; Back to Dashboard
      </Button>
      <Typography variant="h4" gutterBottom>
        Create New Property
      </Typography>
      <Typography variant="body1">
        Wizard Steps will go here.
      </Typography>
    </Container>
  );
}
