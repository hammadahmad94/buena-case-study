import { Paper, Typography, Grid } from '@mui/material';

export default function PropertyDetailsReview({ details }) {
  return (
    <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Property Details</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <Typography variant="caption" color="text.secondary">Name</Typography>
          <Typography variant="body1">{details.name || 'N/A'}</Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="caption" color="text.secondary">Type</Typography>
          <Typography variant="body1">{details.type}</Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="caption" color="text.secondary">Manager</Typography>
          <Typography variant="body1">{details.managerId || 'Not assigned'}</Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="caption" color="text.secondary">Accountant</Typography>
          <Typography variant="body1">{details.accountantId || 'Not assigned'}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
