import { Card, CardContent, CardMedia, Typography, Grid, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function PropertyCard({ property }) {
  const navigate = useNavigate();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardActionArea onClick={() => navigate(`/property/${property.id}`)}>
          <CardMedia
            component="img"
            height="200"
            image={`https://picsum.photos/seed/${property.id}/300/200`}
            alt="Property Image"
          />
          <CardContent>
            <Typography variant="h6" component="div">
              {property.name}
            </Typography>
            <Typography variant="caption" display="block" color="text.secondary" gutterBottom>
              ID: {property.id}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {property.type}
            </Typography>
            <Typography variant="body2">
              {property.buildings ? `${property.buildings.length} Buildings` : 'View Details'}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
