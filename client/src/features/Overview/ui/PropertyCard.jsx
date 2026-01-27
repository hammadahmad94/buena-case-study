import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';

export default function PropertyCard({ property }) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
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
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {property.type}
          </Typography>
          <Typography variant="body2">
            {property.buildings ? `${property.buildings.length} Buildings` : 'View Details'}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
