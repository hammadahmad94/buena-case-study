import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  IconButton,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

export default function BuildingList({ buildings, onEdit, onDelete, onAdd }) {
  if (buildings.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary" align="center" py={5}>
        No buildings added yet. Click "Add Building" to start.
        <br />
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={onAdd}
          sx={{ mt: 2 }}
        >
          Add Building
        </Button>
      </Typography>
    );
  }

  return (
    <Grid container spacing={2}>
      {buildings.map((building) => (
        <Grid item xs={12} key={building.id}>
          <Card variant="outlined">
            <CardContent sx={{ pb: 1 }}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {building.street} {building.number}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {building.zip} {building.city}
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton onClick={() => onEdit(building)} size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDelete(building.id)} size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
