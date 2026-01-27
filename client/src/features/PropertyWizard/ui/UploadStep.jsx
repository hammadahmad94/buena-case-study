import React from 'react';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';

export default function UploadStep({ onUpload, loading, error }) {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={3} py={5}>
      <Typography variant="body1">
        Please upload your "Declaration of Division" (Teilungserklärung) PDF.
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Button variant="contained" component="label" size="large">
          Upload PDF
          <input type="file" hidden accept="application/pdf" onChange={handleFileUpload} />
        </Button>
      )}

      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
}
