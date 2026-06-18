import React, { useMemo } from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import WorkIcon from '@mui/icons-material/Work';
import AssessmentIcon from '@mui/icons-material/Assessment';
import EventIcon from '@mui/icons-material/Event';

const DashboardStats = ({ data }) => {
  const stats = useMemo(() => {
    let placement = 0, result = 0, event = 0;
    data.forEach((item) => {
      if (item.type === 'Placement') placement++;
      else if (item.type === 'Result') result++;
      else if (item.type === 'Event') event++;
    });
    return {
      total: data.length,
      placement,
      result,
      event,
    };
  }, [data]);

  const StatCard = ({ title, value, color, Icon }) => (
    <Grid item xs={12} sm={6} md={3}>
      <Card 
        elevation={0} 
        sx={{ 
          borderTop: `4px solid ${color}`, 
          borderRadius: 2, 
          height: '100%',
          boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.08)'
          }
        }}
      >
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2, px: 2 }}>
          <Box sx={{ backgroundColor: `${color}15`, p: 1, borderRadius: '50%', mb: 1, display: 'flex' }}>
            <Icon sx={{ color: color, fontSize: 24 }} />
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, letterSpacing: 0.5 }}>
            {title}
          </Typography>
          <Typography variant="h5" sx={{ color: '#2c3e50', fontWeight: 700, mt: 0 }}>
            {value}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Box sx={{ mb: 5 }}>
      <Grid container spacing={4}>
        <StatCard title="Total Alerts" value={stats.total} color="#34495e" Icon={NotificationsActiveIcon} />
        <StatCard title="Placements" value={stats.placement} color="#2ecc71" Icon={WorkIcon} />
        <StatCard title="Results" value={stats.result} color="#f39c12" Icon={AssessmentIcon} />
        <StatCard title="Events" value={stats.event} color="#3498db" Icon={EventIcon} />
      </Grid>
    </Box>
  );
};

export default DashboardStats;
