import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <AppBar position="static" sx={{ mb: 4, backgroundColor: '#2C3E50' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Notifier Pro
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">
            All Alerts
          </Button>
          <Button color="inherit" component={Link} to="/priority">
            Top Priority
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
