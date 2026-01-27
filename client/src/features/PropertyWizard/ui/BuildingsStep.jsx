import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button,
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BuildingList from './buildings/BuildingList';
import BuildingFormDialog from './buildings/BuildingFormDialog';

export default function BuildingsStep({ buildings, setBuildings, showValidation }) {
  const [open, setOpen] = useState(false);
  const [editingBuilding, setEditingBuilding] = useState(null);

  const handleOpen = (building = null) => {
    setEditingBuilding(building);
    setOpen(true);
  };
   // ... rest of component

  const handleClose = () => {
    setOpen(false);
    setEditingBuilding(null);
  };

  const handleSave = (buildingData) => {
    if (editingBuilding) {
      // Update existing
      setBuildings(prev => prev.map(b => 
        b.id === editingBuilding.id ? { ...b, ...buildingData } : b
      ));
    } else {
      // Add new
      const newBuilding = {
        id: Date.now(), // Temporary ID
        ...buildingData
      };
      setBuildings(prev => [...prev, newBuilding]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setBuildings(prev => prev.filter(b => b.id !== id));
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6">Buildings</Typography>
        {buildings.length > 0 && (
            <Button 
                variant="contained" 
                startIcon={<AddIcon />} 
                onClick={() => handleOpen()}
            >
                Add Building
            </Button>
        )}
      </Box>

      {showValidation && buildings.length === 0 && (
          <Alert severity="error" sx={{ mb: 2 }}>At least one building is required to proceed.</Alert>
      )}

      <BuildingList 
        buildings={buildings}
        onEdit={handleOpen}
        onDelete={handleDelete}
        onAdd={() => handleOpen()}
      />

      <BuildingFormDialog
        open={open}
        onClose={handleClose}
        onSave={handleSave}
        editingBuilding={editingBuilding}
      />
    </Box>
  );
}
