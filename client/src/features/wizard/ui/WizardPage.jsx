import React, { useState } from 'react';
import { Container, Typography, Button, Stepper, Step, StepLabel, Box, Paper, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { uploadPdf } from '../api/api';

const steps = ['Upload PDF', 'Review Data', 'Success'];

export default function WizardPage() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [extractedData, setExtractedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const data = await uploadPdf(file);
      setExtractedData(data);
      handleNext();
    } catch (err) {
      console.error("Upload failed", err);
      setError("Failed to upload and extract data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStepContent = (step) => {
      switch(step) {
          case 0:
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
          case 1:
               return (
                <Box>
                    <Typography variant="h6" gutterBottom>Extracted Data Preview</Typography>
                    <pre style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px', overflowX: 'auto' }}>
                        {JSON.stringify(extractedData, null, 2)}
                    </pre>
                </Box>
               );
          case 2:
              return <Typography>Success Step Placeholder</Typography>;
          default:
              return <Typography>Unknown step</Typography>;
      }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Button variant="text" onClick={() => navigate('/')} sx={{ mb: 2 }}>
        &larr; Back to Dashboard
      </Button>
      
      <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
            Create New Property
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          <Box mb={4} minHeight={200}>
              {getStepContent(activeStep)}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

             {activeStep !== 0 && (
                <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
             )}
          </Box>
      </Paper>
    </Container>
  );
}
