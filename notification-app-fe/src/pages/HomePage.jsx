import React, { useEffect, useState } from 'react';
import { 
  Container, Typography, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, CircularProgress, 
  Alert, Chip 
} from '@mui/material';
import { retrieveNotifications } from '../services/notificationService';

const HomePage = () => {
  const [alertsData, setAlertsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await retrieveNotifications();
        setAlertsData(data);
      } catch (err) {
        setFetchError('Unable to load data at this time.');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  if (isLoading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (fetchError) {
    return (
      <Container sx={{ mt: 5 }}>
        <Alert severity="error">{fetchError}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#34495e' }}>
        System Alerts
      </Typography>
      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f6fa' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Details</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alertsData.map((alertItem) => (
              <TableRow key={alertItem.id} hover>
                <TableCell>{alertItem.id}</TableCell>
                <TableCell>
                  <Chip 
                    label={alertItem.type || 'General'} 
                    color={
                      alertItem.type === 'Placement' ? 'success' : 
                      alertItem.type === 'Result' ? 'warning' : 'primary'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{alertItem.title}</TableCell>
                <TableCell>{alertItem.message}</TableCell>
                <TableCell>{new Date(alertItem.date).toLocaleString()}</TableCell>
              </TableRow>
            ))}
            {alertsData.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                  No alerts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default HomePage;
