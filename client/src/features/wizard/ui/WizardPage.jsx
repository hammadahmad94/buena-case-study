import React, { useState } from 'react';
import { Container, Typography, Button, Stepper, Step, StepLabel, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const steps = ['Upload PDF', 'Review Data', 'Success'];

export default function WizardPage() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [extractedData, setExtractedData] = useState(null);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step) => {
      switch(step) {
          case 0:
              return <Typography>Upload Step Placeholder</Typography>;
          case 1:
               return <Typography>Review Step Placeholder</Typography>;
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
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
      </Paper>
    </Container>
  );
}
