import { Paper, Typography, Button, CircularProgress, Alert, Box } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function PdfUpload({ onUpload, loading, error }) {
  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <Paper 
        variant="outlined" 
        sx={{ 
            p: 3, 
            height: '100%', 
            backgroundColor: '#fafafa',
            borderStyle: 'dashed',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
        }}
    >
        <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
        <Typography variant="subtitle1" fontWeight="bold">
            Autofill with AI
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
            Upload your "Teilungserklärung" PDF to automatically extract property details.
        </Typography>
        
        {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} />
                <Typography variant="caption">Extracting data...</Typography>
            </Box>
        ) : (
            <Button variant="contained" size="small" component="label">
                Select PDF
                <input type="file" hidden accept="application/pdf" onChange={handleFileInput} />
            </Button>
        )}

        {error && (
            <Alert severity="error" sx={{ mt: 2, width: '100%', fontSize: '0.75rem' }}>
                {error}
            </Alert>
        )}
    </Paper>
  );
}
