import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Button
} from '@mui/material';

export default function BuildingFormDialog({ open, onClose, onSave, editingBuilding }) {
  const [formData, setFormData] = useState({ street: '', number: '', zip: '', city: '' });

  useEffect(() => {
    if (editingBuilding) {
      setFormData({
        street: editingBuilding.street,
        number: editingBuilding.number,
        zip: editingBuilding.zip,
        city: editingBuilding.city
      });
    } else {
      setFormData({ street: '', number: '', zip: '', city: '' });
    }
  }, [editingBuilding, open]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editingBuilding ? 'Edit Building' : 'Add New Building'}</DialogTitle>
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
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
