import { useEffect, useState } from 'react';
import { Container, Typography, Button, Box, Grid, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getProperties } from './api';
import PropertyCard from './ui/PropertyCard';
import SkeletonGrid from './ui/SkeletonGrid';

export default function OverviewDashboard() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties();
        setProperties(data);
      } catch (err) {
        console.error("Failed to fetch properties", err);
        setError("Failed to load properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Overview Dashboard
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/create')}>
          Create New Property
        </Button>
      </Box>

      {loading && <SkeletonGrid />}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && properties.length === 0 && (
        <Typography variant="body1" color="text.secondary">
          No properties found.
        </Typography>
      )}

      <Grid container spacing={3}>
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </Grid>
    </Container>
  );
}
