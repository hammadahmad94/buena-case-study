import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Typography, 
  Grid, 
  Paper 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function BuildingsReview({ buildings }) {
  return (
    <Accordion defaultExpanded sx={{ mb: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontWeight="bold">Buildings ({buildings.length})</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {buildings.length === 0 ? (
          <Typography color="text.secondary">No buildings added.</Typography>
        ) : (
          <Grid container spacing={2}>
            {buildings.map(b => (
              <Grid item xs={12} sm={6} md={4} key={b.id}>
                  <Paper variant="outlined" sx={{ p: 1, bgcolor: '#f9f9f9' }}>
                      <Typography variant="subtitle2">{b.street} {b.number}</Typography>
                      <Typography variant="caption" display="block" color="text.secondary">{b.zip} {b.city} {b.country && `, ${b.country}`}</Typography>
                      {b.description && <Typography variant="caption" display="block" sx={{ mt: 0.5, fontStyle: 'italic' }}>{b.description}</Typography>}
                  </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
