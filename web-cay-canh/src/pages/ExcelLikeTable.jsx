import React, { useState } from 'react';
import { Box, Container, Typography, Grid, TextField, Button, Paper, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const ExcelLikeTable = () => {
  const [rows, setRows] = useState([
    { col1: '', col2: '', col3: '', col4: '' },
    { col1: '', col2: '', col3: '', col4: '' },
    { col1: '', col2: '', col3: '', col4: '' },
  ]);
  
  const [isTableVisible, setIsTableVisible] = useState(false); 

  const handleInputChange = (rowIndex, column, value) => {
    const newRows = [...rows];
    newRows[rowIndex][column] = value;
    setRows(newRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { col1: '', col2: '', col3: '', col4: '' }]);
  };

  const handleRemoveRow = (rowIndex) => {
    setRows(rows.filter((_, index) => index !== rowIndex));
  };

  return (
    <Container maxWidth="lg" sx={{ my: 5 }}>
      <Paper elevation={12} sx={{ padding: 3, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Bảng Dữ Liệu 
        </Typography>

        {/* Button to toggle table visibility */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => setIsTableVisible(!isTableVisible)}
          >
            {isTableVisible ? 'Ẩn Bảng' : 'Hiển Thị Bảng Excel'}
          </Button>
        </Box>

        {/* Excel-like Table */}
        {isTableVisible && (
          <Paper elevation={12} sx={{ padding: 3, borderRadius: 3 }}>
            <Grid container spacing={2} sx={{ mb: 2, fontWeight: 'bold', backgroundColor: '#f5f5f5', borderRadius: 1 }}>
              <Grid item xs={3}>
                <TextField fullWidth disabled variant="outlined" value="Cột 1" sx={{ textAlign: 'center', backgroundColor: '#e0e0e0', '& .MuiInputBase-root': { borderRadius: '8px', padding: '8px' } }} />
              </Grid>
              <Grid item xs={3}>
                <TextField fullWidth disabled variant="outlined" value="Cột 2" sx={{ textAlign: 'center', backgroundColor: '#e0e0e0', '& .MuiInputBase-root': { borderRadius: '8px', padding: '8px' } }} />
              </Grid>
              <Grid item xs={3}>
                <TextField fullWidth disabled variant="outlined" value="Cột 3" sx={{ textAlign: 'center', backgroundColor: '#e0e0e0', '& .MuiInputBase-root': { borderRadius: '8px', padding: '8px' } }} />
              </Grid>
              <Grid item xs={3}>
                <TextField fullWidth disabled variant="outlined" value="Cột 4" sx={{ textAlign: 'center', backgroundColor: '#e0e0e0', '& .MuiInputBase-root': { borderRadius: '8px', padding: '8px' } }} />
              </Grid>
            </Grid>

            {/* Table Rows */}
            <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
              {rows.map((row, rowIndex) => (
                <Grid container spacing={2} key={rowIndex} sx={{ mb: 2, alignItems: 'center' }}>
                  <Grid item xs={3}>
                    <TextField fullWidth value={row.col1} onChange={(e) => handleInputChange(rowIndex, 'col1', e.target.value)} variant="outlined" sx={{ borderRadius: '8px', '& .MuiOutlinedInput-root': { padding: '8px' }, '& .MuiInputBase-root': { borderColor: '#ddd', '&:hover': { borderColor: '#1976d2' } } }} />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField fullWidth value={row.col2} onChange={(e) => handleInputChange(rowIndex, 'col2', e.target.value)} variant="outlined" sx={{ borderRadius: '8px', '& .MuiOutlinedInput-root': { padding: '8px' }, '& .MuiInputBase-root': { borderColor: '#ddd', '&:hover': { borderColor: '#1976d2' } } }} />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField fullWidth value={row.col3} onChange={(e) => handleInputChange(rowIndex, 'col3', e.target.value)} variant="outlined" sx={{ borderRadius: '8px', '& .MuiOutlinedInput-root': { padding: '8px' }, '& .MuiInputBase-root': { borderColor: '#ddd', '&:hover': { borderColor: '#1976d2' } } }} />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField fullWidth value={row.col4} onChange={(e) => handleInputChange(rowIndex, 'col4', e.target.value)} variant="outlined" sx={{ borderRadius: '8px', '& .MuiOutlinedInput-root': { padding: '8px' }, '& .MuiInputBase-root': { borderColor: '#ddd', '&:hover': { borderColor: '#1976d2' } } }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                      <IconButton onClick={() => handleRemoveRow(rowIndex)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              ))}
            </Box>

            {/* Add Row Button */}
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddRow}>
                Thêm Dòng
              </Button>
            </Box>
          </Paper>
        )}
      </Paper>
    </Container>
  );
};

export default ExcelLikeTable;
