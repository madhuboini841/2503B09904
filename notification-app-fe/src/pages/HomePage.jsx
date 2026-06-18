import React, { useEffect, useState, useMemo } from 'react';
import { 
  Container, Typography, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, 
  Alert, Chip, Box, Skeleton, Tooltip, Grid
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { retrieveNotifications } from '../services/notificationService';
import { useViewedStatus } from '../hooks/useViewedStatus';
import DashboardStats from '../components/DashboardStats';
import FilterToolbar from '../components/FilterToolbar';

const HomePage = () => {
  const [alertsData, setAlertsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  
  // Filtering states
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const { isViewed, markAsViewed } = useViewedStatus();

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await retrieveNotifications();
        setAlertsData(data);
      } catch (err) {
        setFetchError('Unable to load notifications. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredData = useMemo(() => {
    return alertsData.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || item.type === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [alertsData, searchTerm, categoryFilter]);

  const handleRowClick = (id) => {
    markAsViewed(id);
  };

  const currentDate = new Date().toLocaleDateString(undefined, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <Container maxWidth="xl" sx={{ py: 4, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box display="flex" alignItems="center" gap={3}>
          <Box sx={{ backgroundColor: '#1976d210', p: 1.5, borderRadius: 3, display: 'flex' }}>
            <NotificationsIcon color="primary" sx={{ fontSize: 44 }} />
          </Box>
          <Box>
            <Typography variant="h3" fontWeight={700} color="#1e293b" sx={{ letterSpacing: '-0.5px' }}>
              Alert Dashboard
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 0.5, fontWeight: 500 }}>
              Monitor and track all organizational broadcasts in real-time.
            </Typography>
          </Box>
        </Box>
        <Box sx={{ textAlign: 'right', px: 2, py: 1 }}>
          <Typography variant="body2" color="text.secondary" fontWeight="600">
            {currentDate}
          </Typography>
        </Box>
      </Box>

      {isLoading ? (
        <Box sx={{ mb: 6 }}>
          <Grid container spacing={3}>
            {[1, 2, 3, 4].map(i => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Skeleton variant="rounded" height={160} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <DashboardStats data={alertsData} />
      )}

      <FilterToolbar 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
        categoryFilter={categoryFilter} 
        onCategoryChange={setCategoryFilter} 
      />

      {fetchError && (
        <Alert severity="error" variant="standard" sx={{ mb: 4, borderRadius: 2 }}>
          {fetchError}
        </Alert>
      )}

      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', flexGrow: 1, maxHeight: 700, border: '1px solid #e2e8f0' }}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="notifications table" size="medium">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: '#475569', backgroundColor: '#f8fafc', py: 2, borderBottom: '2px solid #e2e8f0' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#475569', backgroundColor: '#f8fafc', py: 2, borderBottom: '2px solid #e2e8f0' }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#475569', backgroundColor: '#f8fafc', py: 2, borderBottom: '2px solid #e2e8f0' }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#475569', backgroundColor: '#f8fafc', py: 2, borderBottom: '2px solid #e2e8f0' }}>Details</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#475569', backgroundColor: '#f8fafc', py: 2, borderBottom: '2px solid #e2e8f0' }}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              // Skeleton rows for loading state
              Array.from(new Array(5)).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton variant="circular" width={40} height={24} /></TableCell>
                  <TableCell><Skeleton variant="rounded" width={80} height={24} /></TableCell>
                  <TableCell><Skeleton variant="text" width="80%" /></TableCell>
                  <TableCell><Skeleton variant="text" width="100%" /></TableCell>
                  <TableCell><Skeleton variant="text" width={100} /></TableCell>
                </TableRow>
              ))
            ) : filteredData.length > 0 ? (
              filteredData.map((alertItem, index) => {
                const viewed = isViewed(alertItem.id);
                return (
                  <Tooltip title={viewed ? "" : "Click to mark as viewed"} placement="top-start" key={alertItem.id}>
                    <TableRow 
                      hover 
                      onClick={() => handleRowClick(alertItem.id)}
                      tabIndex={0}
                      onKeyDown={(e) => { if(e.key === 'Enter') handleRowClick(alertItem.id) }}
                      sx={{ 
                        cursor: 'pointer',
                        backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8fafc',
                        opacity: viewed ? 0.85 : 1,
                        transition: 'background-color 0.2s ease',
                        '&:hover': { backgroundColor: '#f1f5f9 !important' }
                      }}
                    >
                      <TableCell>
                        {viewed ? (
                          <Chip label="VIEWED" size="small" sx={{ bgcolor: '#f1f5f9', color: '#64748b', fontWeight: 600, fontSize: '0.7rem', letterSpacing: 0.5 }} />
                        ) : (
                          <Chip label="NEW" size="small" sx={{ bgcolor: '#e0e7ff', color: '#4338ca', fontWeight: 700, fontSize: '0.7rem', letterSpacing: 0.5 }} />
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={alertItem.type || 'General'} 
                          sx={{
                            fontWeight: 600,
                            bgcolor: alertItem.type === 'Placement' ? '#dcfce7' : alertItem.type === 'Result' ? '#fef3c7' : '#e0f2fe',
                            color: alertItem.type === 'Placement' ? '#166534' : alertItem.type === 'Result' ? '#92400e' : '#075985',
                          }}
                          size="small"
                        />
                      </TableCell>
                      <TableCell sx={{ fontWeight: viewed ? 400 : 600 }}>{alertItem.title}</TableCell>
                      <TableCell sx={{ color: viewed ? 'text.secondary' : 'text.primary' }}>
                        {alertItem.message}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap', color: 'text.secondary' }}>
                        {new Date(alertItem.date).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  </Tooltip>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No notifications found.
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Try changing filters or search keywords.
                  </Typography>
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
