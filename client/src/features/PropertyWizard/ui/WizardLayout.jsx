import { Container, Paper, Typography, Stepper, Step, StepLabel, Box, Button } from '@mui/material';

const steps = ['General Info', 'Buildings', 'Units', 'Review'];

export default function WizardLayout({ 
  activeStep, 
  handleBack, 
  handleNext, 
  children, 
  onNavigateBack,
  finalActionLabel = 'Save'
}) {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Button variant="text" onClick={onNavigateBack} sx={{ mb: 2 }}>
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

        <Box mb={4} minHeight={300}>
          {children}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1, display: activeStep === 0 ? 'none' : 'block' }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button onClick={handleNext} variant="contained">
            {activeStep === steps.length - 1 ? finalActionLabel : 'Next'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
