import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: '#ffffff', borderTop: '1px solid #e0e0e0' }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © 2026 Notifier Pro
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Built with React and Material UI
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
