import React, { useEffect, useState, useMemo } from 'react';
import { 
  Container, Typography, Grid, Card, CardContent, 
  Alert, Chip, Box, FormControl, Select, MenuItem, InputLabel, Skeleton, Tooltip
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import AssessmentIcon from '@mui/icons-material/Assessment';
import EventIcon from '@mui/icons-material/Event';
import { retrieveNotifications } from '../services/notificationService';
import { useViewedStatus } from '../hooks/useViewedStatus';

const priorityMap = {
  'Placement': 3,
  'Result': 2,
  'Event': 1
};

const getCategoryIcon = (type) => {
  switch (type) {
    case 'Placement': return <WorkIcon fontSize="small" sx={{ color: '#2ecc71', mr: 1 }} />;
    case 'Result': return <AssessmentIcon fontSize="small" sx={{ color: '#f39c12', mr: 1 }} />;
    case 'Event': return <EventIcon fontSize="small" sx={{ color: '#3498db', mr: 1 }} />;
    default: return null;
  }
};

const PriorityPage = () => {
  const [allSortedAlerts, setAllSortedAlerts] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [displayCount, setDisplayCount] = useState(10);
  
  const { isViewed, markAsViewed } = useViewedStatus();

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

        setAllSortedAlerts(sortedData);
      } catch (err) {
        setErrorMsg('Unable to load notifications. Please try again later.');
      } finally {
        setLoadingStatus(false);
      }
    };
    fetchAndSort();
  }, []);

  const topAlerts = useMemo(() => {
    return allSortedAlerts.slice(0, displayCount);
  }, [allSortedAlerts, displayCount]);

  return (
    <Container maxWidth="md" sx={{ py: 4, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} flexWrap="wrap" gap={2}>
        <Box>
          <Typography variant="h4" fontWeight={800} color="#e74c3c" gutterBottom>
            Top Priority Alerts
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Most critical notifications requiring immediate attention.
          </Typography>
        </Box>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Show Top</InputLabel>
          <Select
            value={displayCount}
            label="Show Top"
            onChange={(e) => setDisplayCount(e.target.value)}
          >
            <MenuItem value={5}>Top 5</MenuItem>
            <MenuItem value={10}>Top 10</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {errorMsg && (
        <Alert severity="error" variant="filled" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <Grid container spacing={3}>
        {loadingStatus ? (
          // Skeleton Loaders
          Array.from(new Array(displayCount)).map((_, index) => (
            <Grid item xs={12} key={`skeleton-${index}`}>
              <Skeleton variant="rounded" height={140} />
            </Grid>
          ))
        ) : topAlerts.length > 0 ? (
          topAlerts.map((item) => {
            const viewed = isViewed(item.id);
            const borderColor = item.type === 'Placement' ? '#2ecc71' : item.type === 'Result' ? '#f39c12' : '#3498db';
            
            return (
              <Grid item xs={12} key={item.id}>
                <Tooltip title={viewed ? "" : "Click to mark as viewed"} placement="left">
                  <Card 
                    elevation={viewed ? 1 : 4} 
                    onClick={() => markAsViewed(item.id)}
                    tabIndex={0}
                    onKeyDown={(e) => { if(e.key === 'Enter') markAsViewed(item.id) }}
                    sx={{ 
                      borderLeft: `6px solid ${borderColor}`,
                      cursor: 'pointer',
                      backgroundColor: viewed ? '#fafafa' : '#ffffff',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: viewed ? 3 : 6,
                        backgroundColor: viewed ? '#f5f5f5' : '#fdfdfd'
                      }
                    }}
                  >
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1.5} flexWrap="wrap" gap={1}>
                        <Box display="flex" alignItems="center" gap={1.5}>
                          {!viewed && <Chip label="NEW" size="small" color="error" sx={{ fontWeight: 'bold' }} />}
                          <Typography variant="h6" component="div" sx={{ fontWeight: viewed ? 500 : 700 }}>
                            {item.title}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                          {getCategoryIcon(item.type)}
                          <Chip 
                            label={item.type || 'General'} 
                            size="small" 
                            variant={viewed ? 'outlined' : 'filled'}
                            sx={{ fontWeight: 'bold' }}
                            color={
                              item.type === 'Placement' ? 'success' : 
                              item.type === 'Result' ? 'warning' : 'default'
                            }
                          />
                        </Box>
                      </Box>
                      <Typography variant="body1" color={viewed ? "text.secondary" : "text.primary"} sx={{ mb: 2 }}>
                        {item.message}
                      </Typography>
                      <Typography variant="caption" color="text.disabled" fontWeight={500}>
                        Received on: {new Date(item.date).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </Typography>
                    </CardContent>
                  </Card>
                </Tooltip>
              </Grid>
            );
          })
        ) : (
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No notifications found.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try changing filters or search keywords.
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default PriorityPage;
