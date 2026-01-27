import { useState } from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { uploadPdf } from './api';
import GeneralInfoStep from './ui/GeneralInfoStep';
import ReviewStep from './ui/ReviewStep';
import SuccessStep from './ui/SuccessStep';
import WizardLayout from './ui/WizardLayout';

const steps = ['General Info', 'Buildings', 'Units', 'Review'];

export default function PropertyWizard() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Central State for the wizard
  const [propertyDetails, setPropertyDetails] = useState({
    name: '',
    type: 'WEG',
    managerId: '',
    accountantId: '',
  });
  const [buildings, setBuildings] = useState([]); 
  const [units, setUnits] = useState([]);      

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const updatePropertyDetails = (updates) => {
    setPropertyDetails(prev => ({ ...prev, ...updates }));
  };

  const onUpload = async (file) => {
    setLoading(true);
    setError(null);
    try {
      const extractedData = await uploadPdf(file);
      
      if (extractedData) {
         if (extractedData.name) updatePropertyDetails({ name: extractedData.name });
         // TODO: Map buildings and units once we see the real API structure
      }
      // We do NOT auto-advance; the user sees the form fill up.
      
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
        return (
            <GeneralInfoStep 
                data={propertyDetails} 
                updateData={updatePropertyDetails}
                onUpload={onUpload}
                loading={loading}
                error={error}
            />
        );
      case 1:
        return <Typography>Buildings Step </Typography>;
      case 2:
        return <Typography>Units Step </Typography>;
      case 3:
        return <ReviewStep data={{ propertyDetails, buildings, units }} />;
      default:
        return <Typography>Unknown step</Typography>;
    }
  };

  return (
    <WizardLayout
        activeStep={activeStep}
        handleBack={handleBack}
        handleNext={handleNext}
        onNavigateBack={() => navigate('/')}
    >
        {activeStep === steps.length ? <SuccessStep /> : getStepContent(activeStep)}
    </WizardLayout>
  );
}
