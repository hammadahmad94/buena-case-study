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
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    if (editingBuilding) {
      setFormData({
        street: editingBuilding.street,
        number: editingBuilding.number,
        zip: editingBuilding.zip,
        city: editingBuilding.city,
        country: editingBuilding.country || '',
        description: editingBuilding.description || ''
      });
    } else {
      setFormData({ street: '', number: '', zip: '', city: '', country: '', description: '' });
    }
    setShowErrors(false);
  }, [editingBuilding, open]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
      return formData.street.trim() && formData.number.trim() && formData.zip.trim() && formData.city.trim();
  };

  const handleSubmit = () => {
    if (!validate()) {
        setShowErrors(true);
        return;
    }
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editingBuilding ? 'Edit Building' : 'Add New Building'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={8}>
            <TextField
              required
              fullWidth
              label="Street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              error={showErrors && !formData.street.trim()}
              helperText={showErrors && !formData.street.trim() ? "Required" : ""}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              fullWidth
              label="Number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              error={showErrors && !formData.number.trim()}
              helperText={showErrors && !formData.number.trim() ? "Required" : ""}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              fullWidth
              label="Zip Code"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              error={showErrors && !formData.zip.trim()}
              helperText={showErrors && !formData.zip.trim() ? "Required" : ""}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              required
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              error={showErrors && !formData.city.trim()}
              helperText={showErrors && !formData.city.trim() ? "Required" : ""}
            />
        </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="e.g. Germany"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description / Other Details"
              name="description"
              value={formData.description}
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
