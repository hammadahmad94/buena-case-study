import { Box, Typography } from '@mui/material';
import PropertyDetailsReview from './review/PropertyDetailsReview';
import BuildingsReview from './review/BuildingsReview';
import UnitsReview from './review/UnitsReview';

export default function ReviewStep({ data }) {
  const { propertyDetails, buildings, units } = data;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Review & Create</Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Please review the information below before creating the property.
      </Typography>

      <PropertyDetailsReview details={propertyDetails} />
      <BuildingsReview buildings={buildings} />
      <UnitsReview units={units} buildings={buildings} />
    </Box>
  );
}
