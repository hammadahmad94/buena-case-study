import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Paper 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function UnitsReview({ units, buildings }) {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontWeight="bold">Units ({units.length})</Typography>
      </AccordionSummary>
      <AccordionDetails>
          {units.length === 0 ? (
              <Typography color="text.secondary">No units added.</Typography>
          ) : (
              <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 300 }}>
                  <Table size="small" stickyHeader>
                      <TableHead>
                          <TableRow>
                              <TableCell>Unit #</TableCell>
                              <TableCell>Type</TableCell>
                              <TableCell>Building</TableCell>
                              <TableCell>Floor</TableCell>
                              <TableCell>Rooms</TableCell>
                              <TableCell>Size</TableCell>
                              <TableCell>Share</TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {units.map((u) => {
                              const building = buildings.find(b => b.id === u.buildingId);
                              return (
                                  <TableRow key={u.id}>
                                      <TableCell>{u.number}</TableCell>
                                      <TableCell>{u.type}</TableCell>
                                      <TableCell>{building ? `${building.street} ${building.number}` : 'Unknown'}</TableCell>
                                      <TableCell>{u.floor}</TableCell>
                                      <TableCell>{u.rooms}</TableCell>
                                      <TableCell>{u.size}</TableCell>
                                      <TableCell>{u.coOwnershipShare}</TableCell>
                                  </TableRow>
                              );
                          })}
                      </TableBody>
                  </Table>
              </TableContainer>
          )}
      </AccordionDetails>
    </Accordion>
  );
}
