import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  TextField, 
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

export default function BuildingsStep({ buildings, setBuildings }) {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ street: '', number: '', zip: '', city: '' });

  const handleOpen = (building = null) => {
    if (building) {
      setEditingId(building.id);
      setFormData({ 
        street: building.street, 
        number: building.number, 
        zip: building.zip, 
        city: building.city 
      });
    } else {
      setEditingId(null);
      setFormData({ street: '', number: '', zip: '', city: '' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (editingId) {
      // Update existing
      setBuildings(prev => prev.map(b => 
        b.id === editingId ? { ...b, ...formData } : b
      ));
    } else {
      // Add new
      const newBuilding = {
        id: Date.now(), // Temporary ID
        ...formData
      };
      setBuildings(prev => [...prev, newBuilding]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setBuildings(prev => prev.filter(b => b.id !== id));
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6">Buildings</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => handleOpen()}
        >
          Add Building
        </Button>
      </Box>

      {buildings.length === 0 ? (
        <Typography variant="body1" color="text.secondary" align="center" py={5}>
          No buildings added yet. Click "Add Building" to start.
        </Typography>
      ) : (
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
                      <IconButton onClick={() => handleOpen(building)} size="small">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(building.id)} size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Edit Building' : 'Add New Building'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                label="Street"
                name="street"
                value={formData.street}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Number"
                name="number"
                value={formData.number}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Zip Code"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}
