import React, { useEffect, useState } from 'react';
import { 
  Container, Typography, Grid, Card, CardContent, 
  CircularProgress, Alert, Chip, Box
} from '@mui/material';
import { retrieveNotifications } from '../services/notificationService';

const priorityMap = {
  'Placement': 3,
  'Result': 2,
  'Event': 1
};

const PriorityPage = () => {
  const [topAlerts, setTopAlerts] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchAndSort = async () => {
      try {
        setLoadingStatus(true);
        const data = await retrieveNotifications();
        
        // Sort logic: Priority descending, then Date descending (recency)
        const sortedData = [...data].sort((a, b) => {
          const pA = priorityMap[a.type] || 0;
          const pB = priorityMap[b.type] || 0;
          
          if (pA !== pB) {
            return pB - pA; // Higher priority first
          }
          // If priority is same, sort by date
          return new Date(b.date) - new Date(a.date);
        });

        // Top 10
        setTopAlerts(sortedData.slice(0, 10));
      } catch (err) {
        setErrorMsg('Failed to fetch priority alerts.');
      } finally {
        setLoadingStatus(false);
      }
    };
    fetchAndSort();
  }, []);

  if (loadingStatus) return <Container sx={{ textAlign: 'center', mt: 10 }}><CircularProgress /></Container>;
  if (errorMsg) return <Container sx={{ mt: 5 }}><Alert severity="error">{errorMsg}</Alert></Container>;

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#e74c3c' }}>
        High Priority Alerts (Top 10)
      </Typography>
      <Grid container spacing={3} mt={1}>
        {topAlerts.map((item, index) => (
          <Grid item xs={12} key={item.id || index}>
            <Card elevation={2} sx={{ borderLeft: `6px solid ${item.type === 'Placement' ? '#2ecc71' : item.type === 'Result' ? '#f39c12' : '#3498db'}` }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="h6" component="div">
                    {item.title}
                  </Typography>
                  <Chip 
                    label={item.type || 'General'} 
                    size="small" 
                    sx={{ fontWeight: 'bold' }}
                    color={
                      item.type === 'Placement' ? 'success' : 
                      item.type === 'Result' ? 'warning' : 'default'
                    }
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {item.message}
                </Typography>
                <Typography variant="caption" color="text.disabled">
                  Received on: {new Date(item.date).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {topAlerts.length === 0 && (
          <Typography variant="body1" sx={{ ml: 3, mt: 2 }}>No high priority alerts available.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default PriorityPage;
