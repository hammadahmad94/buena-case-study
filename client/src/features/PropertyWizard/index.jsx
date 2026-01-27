import { useState } from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { uploadPdf, saveProperty } from './api';
import GeneralInfoStep from './ui/GeneralInfoStep';
import BuildingsStep from './ui/BuildingsStep';
import UnitsStep from './ui/UnitsStep';
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

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
        await handleSave();
    } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleSave = async () => {
      setLoading(true);
      setError(null);
      try {
          // Transform flat state into nested structure for API
          const payload = {
              ...propertyDetails,
              buildings: buildings.map(b => ({
                  ...b,
                  units: units.filter(u => u.buildingId === b.id)
              }))
          };
          
          await saveProperty(payload);
          setActiveStep((prev) => prev + 1); // Move to Success Step
      } catch (err) {
          console.error("Failed to save property", err);
          setError("Failed to create property. Please try again.");
      } finally {
          setLoading(false);
      }
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
         
         // Basic mapping for buildings if they exist in the extraction
         if (extractedData.buildings && Array.isArray(extractedData.buildings)) {
             const mappedBuildings = extractedData.buildings.map((b, index) => ({
                 id: Date.now() + index,
                 street: b.street || '',
                 number: b.number || '',
                 zip: b.zip || '',
                 city: b.city || ''
             }));
             setBuildings(mappedBuildings);
         }
         
         // Note: Logic for units would go here, often dependent on building mapping
      }
      
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
        return <BuildingsStep buildings={buildings} setBuildings={setBuildings} />;
      case 2:
        return <UnitsStep units={units} setUnits={setUnits} buildings={buildings} />;
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
