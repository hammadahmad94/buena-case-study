import { Box, Typography, Button } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default function UnitsStep({ units, setUnits, buildings }) {
  
  const handleProcessRowUpdate = (newRow) => {
    const updatedUnits = units.map((row) => (row.id === newRow.id ? newRow : row));
    setUnits(updatedUnits);
    return newRow;
  };

  const handleDeleteClick = (id) => () => {
    const remainingUnits = units.filter((row) => row.id !== id);
    // Auto-renumber
    const reorderedUnits = remainingUnits.map((u, index) => ({
        ...u,
        number: index + 1
    }));
    setUnits(reorderedUnits);
  };

  const handleAddUnit = () => {
    const defaultBuildingId = buildings.length > 0 ? buildings[0].id : '';
    const newUnit = {
      id: Date.now(),
      type: 'Apartment',
      number: units.length + 1, // Auto-increment
      buildingId: defaultBuildingId,
      floor: 0,
      entrance: '',
      rooms: 1,
      size: 0,
      constructionYear: new Date().getFullYear(),
      coOwnershipShare: 0,
    };
    setUnits([...units, newUnit]);
  };

  const buildingOptions = buildings.map(b => ({
    value: b.id,
    label: `${b.street} ${b.number}`
  }));

  const columns = [
    { field: 'number', headerName: 'Unit #', width: 90, type: 'number', editable: false }, // Read-only index
    { 
      field: 'type', 
      headerName: 'Type *', 
      width: 130, 
      editable: true, 
      type: 'singleSelect',
      valueOptions: ['Apartment', 'Office', 'Commercial', 'Parking', 'Other']
    },
    {
      field: 'buildingId',
      headerName: 'Building *',
      width: 200,
      editable: true,
      type: 'singleSelect',
      valueOptions: buildingOptions,
    },
    { field: 'floor', headerName: 'Floor *', type: 'number', width: 80, editable: true },
    { field: 'entrance', headerName: 'Entrance', width: 100, editable: true },
    { field: 'rooms', headerName: 'Rooms', type: 'number', width: 80, editable: true },
    { field: 'size', headerName: 'Size (qm)', type: 'number', width: 100, editable: true },
    { field: 'constructionYear', headerName: 'Year', type: 'number', width: 90, editable: true },
    { field: 'coOwnershipShare', headerName: 'Share (1/1000)', type: 'number', width: 130, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 80,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box sx={{ height: 500, width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Units</Typography>
        <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddUnit}>
          Add Unit
        </Button>
      </Box>
      
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <DataGrid
            rows={units}
            columns={columns}
            editMode="row"
            processRowUpdate={handleProcessRowUpdate}
            onProcessRowUpdateError={(error) => console.error(error)}
            slots={{ toolbar: GridToolbar }}
            disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}
