import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Button, Paper, Container, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchProperties } from '../api';

const columns = [
  { field: 'name', headerName: 'Property Name', flex: 1, minWidth: 200 },
  { 
    field: 'type', 
    headerName: 'Type', 
    width: 120,
    renderCell: (params) => (
      <Chip 
        label={params.value} 
        color={params.value === 'WEG' ? 'primary' : 'success'} 
        variant="outlined" 
        size="small"
      />
    )
  },
  { 
    field: 'buildingsCount', 
    headerName: 'Buildings', 
    width: 100, 
    valueGetter: (params, row) => row.buildings?.length || 0 
  },
  { 
    field: 'updatedAt', 
    headerName: 'Last Updated', 
    width: 200,
    valueFormatter: (params) => new Date(params.value).toLocaleString()
  },
];

export const Dashboard = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties()
      .then(data => {
        setRows(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch properties', err);
        setLoading(false);
      });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Box>
                <Typography variant="h4" gutterBottom fontWeight="bold">
                Properties
                </Typography>
                <Typography variant="body1" color="text.secondary">
                Manage your real estate portfolio
                </Typography>
            </Box>
            <Button 
                variant="contained" 
                size="large"
                onClick={() => navigate('/create')}
            >
                + Add Property
            </Button>
        </Box>

        <Paper sx={{ height: 500, width: '100%', p: 0, overflow: 'hidden' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                loading={loading}
                initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Paper>
    </Container>
  );
};
