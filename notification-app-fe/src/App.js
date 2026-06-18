import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage';
import PriorityPage from './pages/PriorityPage';

const appTheme = createTheme({
  palette: {
    background: {
      default: '#f8f9fa'
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  }
});

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/priority" element={<PriorityPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
