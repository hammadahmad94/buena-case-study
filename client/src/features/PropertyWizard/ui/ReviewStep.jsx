import React from 'react';
import { Box, Typography } from '@mui/material';

export default function ReviewStep({ data }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Extracted Data Preview</Typography>
      <pre style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px', overflowX: 'auto' }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </Box>
  );
}
