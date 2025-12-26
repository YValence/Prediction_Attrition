import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const UploadScreen = ({ onSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedData, setUploadedData] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const ext = selectedFile.name.split('.').pop().toLowerCase();
      if (!['csv', 'xlsx'].includes(ext)) {
        setError('Please upload a CSV or XLSX file');
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Upload failed');
      }

      const data = await response.json();
      setUploadedData(data);
      onSuccess(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setError(null);
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
            Upload Employee Data
          </Typography>

          <Typography variant="body1" sx={{ mb: 4, color: '#666' }}>
            Upload a CSV or Excel file with your employee data. The file must contain all required columns for prediction.
          </Typography>

          {/* Drag and Drop Area */}
          <Box
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            sx={{
              border: '2px dashed #667eea',
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
              bgcolor: '#f9f7ff',
              cursor: 'pointer',
              mb: 3,
              transition: 'all 0.3s',
              '&:hover': {
                bgcolor: '#f3f0ff',
                borderColor: '#764ba2',
              },
            }}
          >
            <CloudUploadIcon sx={{ fontSize: 64, color: '#667eea', mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
              {file ? file.name : 'Drag & drop your file here'}
            </Typography>
            <Typography variant="body2" sx={{ color: '#999', mb: 2 }}>
              or click below to browse
            </Typography>

            <input
              type="file"
              accept=".csv,.xlsx"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="file-input"
            />
            <label htmlFor="file-input">
              <Button
                variant="contained"
                component="span"
                sx={{
                  bgcolor: '#667eea',
                  '&:hover': { bgcolor: '#764ba2' },
                  textTransform: 'none',
                  fontSize: '16px',
                }}
              >
                Browse Files
              </Button>
            </label>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Upload Button */}
          <Button
            onClick={handleUpload}
            disabled={!file || loading}
            variant="contained"
            size="large"
            sx={{
              bgcolor: '#667eea',
              '&:hover': { bgcolor: '#764ba2' },
              py: 1.5,
              mb: 4,
              textTransform: 'none',
              fontSize: '16px',
              width: '100%',
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ mr: 1, color: 'white' }} /> : ''}
            {loading ? 'Processing...' : 'Analyze Data'}
          </Button>

          {/* Upload Result Preview */}
          {uploadedData && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                ✓ Data Successfully Loaded
              </Typography>
              <Alert severity="success" sx={{ mb: 3 }}>
                {uploadedData.rows} employees | {uploadedData.columns.length} data points
              </Alert>

              {/* Data Preview Table */}
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 'bold' }}>
                Data Preview (First 5 Rows)
              </Typography>
              <TableContainer component={Paper} sx={{ maxHeight: 300, overflow: 'auto' }}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                      {uploadedData.columns.slice(0, 10).map((col) => (
                        <TableCell key={col} sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>
                          {col}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {uploadedData.preview.map((row, idx) => (
                      <TableRow key={idx} sx={{ '&:nth-of-type(even)': { bgcolor: '#fafafa' } }}>
                        {uploadedData.columns.slice(0, 10).map((col) => (
                          <TableCell key={`${idx}-${col}`} sx={{ fontSize: '12px' }}>
                            {String(row[col]).substring(0, 20)}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Missing Values Alert */}
              {Object.values(uploadedData.missing_values).some((v) => v > 0) && (
                <Alert severity="warning" sx={{ mt: 3 }}>
                  Some columns have missing values. These will be handled during analysis.
                </Alert>
              )}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default UploadScreen;
