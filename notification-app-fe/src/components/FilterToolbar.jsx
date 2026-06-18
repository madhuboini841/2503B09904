import React from 'react';
import { Box, TextField, MenuItem, FormControl, InputLabel, Select, Grid, Button, InputAdornment, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const FilterToolbar = ({ searchTerm, onSearchChange, categoryFilter, onCategoryChange }) => {
  const handleClear = () => {
    onSearchChange('');
    onCategoryChange('All');
  };

  return (
    <Box sx={{ mb: 3, p: 2, backgroundColor: '#ffffff', borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={7}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Search Notifications"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryFilter}
              label="Category"
              onChange={(e) => onCategoryChange(e.target.value)}
            >
              <MenuItem value="All">All Categories</MenuItem>
              <MenuItem value="Placement">Placement</MenuItem>
              <MenuItem value="Result">Result</MenuItem>
              <MenuItem value="Event">Event</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <Tooltip title="Reset all filters">
            <Button 
              fullWidth 
              variant="outlined" 
              color="secondary" 
              onClick={handleClear}
              startIcon={<ClearIcon />}
              sx={{ height: 40 }}
            >
              Clear
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterToolbar;
