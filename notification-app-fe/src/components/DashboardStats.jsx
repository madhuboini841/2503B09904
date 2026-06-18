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
          borderRadius: 3, 
          height: '100%',
          boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: '0 12px 24px rgba(0,0,0,0.1)'
          }
        }}
      >
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
          <Box sx={{ backgroundColor: `${color}15`, p: 2, borderRadius: '50%', mb: 2, display: 'flex' }}>
            <Icon sx={{ color: color, fontSize: 36 }} />
          </Box>
          <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 600, letterSpacing: 1 }}>
            {title}
          </Typography>
          <Typography variant="h3" sx={{ color: '#2c3e50', fontWeight: 800, mt: 0.5 }}>
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
