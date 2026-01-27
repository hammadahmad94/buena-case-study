import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Paper, 
  Grid, 
  Divider,
  CircularProgress,
  Alert,
  Chip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getPropertyById } from '../Overview/api';
import BuildingsReview from '../PropertyWizard/ui/review/BuildingsReview';
import UnitsReview from '../PropertyWizard/ui/review/UnitsReview';

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getPropertyById(id);
        setProperty(data);
      } catch (err) {
        console.error("Failed to fetch property details", err);
        setError("Failed to load property details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetails();
    }
  }, [id]);

  if (loading) {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
            <CircularProgress />
        </Box>
    );
  }

  if (error || !property) {
    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Alert severity="error">{error || "Property not found"}</Alert>
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mt: 2 }}>
                Back to Dashboard
            </Button>
        </Container>
    );
  }

  // Flatten units from buildings for the UnitsReview component
  const allUnits = property.buildings.flatMap(b => b.units.map(u => ({ ...u, buildingId: b.id })));

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mb: 2 }}>
        Back to Dashboard
      </Button>

      {/* Property Header */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>{property.name}</Typography>
                <Typography variant="subtitle1" color="text.secondary">ID: {property.id}</Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: 'right' }}>
                 <Chip 
                    label={property.type === 'WEG' ? 'Condominium (WEG)' : 'Rental (MV)'} 
                    color="primary" 
                    sx={{ fontWeight: 'bold' }}
                 />
            </Grid>
        </Grid>
        
        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">Managed By</Typography>
                <Typography variant="body1">{property.managerId || 'Not Assigned'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">Accountant</Typography>
                <Typography variant="body1">{property.accountantId || 'Not Assigned'}</Typography>
            </Grid>
        </Grid>
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Structure</Typography>
      
      {/* Reusing existing Review components for read-only view */}
      <Box sx={{ mb: 3 }}>
        <BuildingsReview buildings={property.buildings} />
      </Box>

      <Box>
        <UnitsReview units={allUnits} buildings={property.buildings} />
      </Box>

    </Container>
  );
}
