import { useState } from 'react';
import { Container, Typography, Button, Stepper, Step, StepLabel, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { uploadPdf } from './api';
import UploadStep from './ui/UploadStep';
import ReviewStep from './ui/ReviewStep';
import SuccessStep from './ui/SuccessStep';

const steps = ['Upload PDF', 'Review Data', 'Success'];

export default function PropertyWizard() {
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

  const onUpload = async (file) => {
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
    switch (step) {
      case 0:
        return <UploadStep onUpload={onUpload} loading={loading} error={error} />;
      case 1:
        return <ReviewStep data={extractedData} />;
      case 2:
        return <SuccessStep />;
      default:
        return <Typography>Unknown step</Typography>;
    }
  };

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
            disabled={activeStep === 0 || activeStep === steps.length - 1}
            onClick={handleBack}
            sx={{ mr: 1, display: activeStep === 0 ? 'none' : 'block' }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />

          {activeStep !== 0 && activeStep !== steps.length - 1 && (
            <Button onClick={handleNext}>
              {activeStep === steps.length - 2 ? 'Save' : 'Next'}
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
