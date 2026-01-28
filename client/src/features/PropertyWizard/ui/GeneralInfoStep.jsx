import React from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  MenuItem, 
  Grid
} from '@mui/material';
import PdfUpload from './PdfUpload';

export default function GeneralInfoStep({ data, updateData, onUpload, loading, error, showValidation }) {
  const handleChange = (e) => {
    updateData({ [e.target.name]: e.target.value });
  };

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Typography variant="h6" gutterBottom>Property Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Property Name"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="e.g. Sunset Heights"
                error={showValidation && !data.name.trim()}
                helperText={showValidation && !data.name.trim() ? "Property Name is required" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Management Type"
                name="type"
                value={data.type}
                onChange={handleChange}
              >
                <MenuItem value="WEG">WEG (Condominium)</MenuItem>
                <MenuItem value="MV">MV (Rental)</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Property Manager"
                name="managerName"
                value={data.managerName || ''}
                onChange={handleChange}
                placeholder="Manager Name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                  fullWidth
                  label="Accountant"
                  name="accountantName"
                  value={data.accountantName || ''}
                  onChange={handleChange}
                  placeholder="Accountant Name"
                />
            </Grid>
          </Grid>
        </Grid>

        {/* Right Side: Upload Accelerator */}
        <Grid item xs={12} md={5}>
            <PdfUpload onUpload={onUpload} loading={loading} error={error} />
        </Grid>
      </Grid>
    </Box>
  );
}

