import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 2, px: 2, mt: 'auto', backgroundColor: '#ffffff', borderTop: '1px solid #f0f0f0' }}>
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <Typography variant="caption" color="text.secondary" fontWeight={500}>
          © 2026 Notifier Pro
        </Typography>
        <Typography variant="caption" color="text.secondary" fontWeight={500}>
          Built with React and Material UI
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
