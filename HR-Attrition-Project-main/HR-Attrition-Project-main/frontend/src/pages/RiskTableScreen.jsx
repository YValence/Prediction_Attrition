import React, { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TextField,
  MenuItem,
  Grid,
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const RiskTableScreen = ({ predictions, onSelectEmployee, onShowDetail }) => {
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const { predictions: predArray, summary } = predictions;

  // Get unique departments
  const departments = ['All', ...new Set(predArray.map((p) => p.department))];

  // Filter data
  const filteredData = useMemo(() => {
    return predArray.filter((emp) => {
      const matchDept = departmentFilter === 'All' || emp.department === departmentFilter;
      const matchRisk = riskFilter === 'All' || emp.risk_level === riskFilter;
      const matchSearch =
        emp.employee_id.includes(searchTerm) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.job_role.toLowerCase().includes(searchTerm.toLowerCase());
      return matchDept && matchRisk && matchSearch;
    });
  }, [predArray, departmentFilter, riskFilter, searchTerm]);

  // Sort by risk probability (highest first)
  const sortedData = [...filteredData].sort((a, b) => b.attrition_probability - a.attrition_probability);

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'High':
        return '#ef4444';
      case 'Medium':
        return '#f97316';
      case 'Low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const getRiskBgColor = (riskLevel) => {
    switch (riskLevel) {
      case 'High':
        return '#fee2e2';
      case 'Medium':
        return '#ffedd5';
      case 'Low':
        return '#f0fdf4';
      default:
        return '#f3f4f6';
    }
  };

  const handleSelectEmployee = (emp) => {
    onSelectEmployee(emp);
    onShowDetail();
  };

  return (
    <Box sx={{ py: 4 }}>
      {/* Header */}
      <Card sx={{ boxShadow: 2, borderRadius: 2, mb: 4, bgcolor: '#f9f7ff' }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#667eea' }}>
            Employee Risk Analysis
          </Typography>
          <Typography variant="body2" sx={{ color: '#666' }}>
            Click on any employee to view detailed attrition insights
          </Typography>
        </CardContent>
      </Card>

      {/* Filters */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Search"
            variant="outlined"
            size="small"
            placeholder="ID, Department, Role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#667eea',
                },
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            select
            label="Department"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            variant="outlined"
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#667eea',
                },
              },
            }}
          >
            {departments.map((dept) => (
              <MenuItem key={dept} value={dept}>
                {dept}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            select
            label="Risk Level"
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            variant="outlined"
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#667eea',
                },
              },
            }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="High">High Risk</MenuItem>
            <MenuItem value="Medium">Medium Risk</MenuItem>
            <MenuItem value="Low">Low Risk</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', height: '40px' }}>
            <Typography variant="body2" sx={{ color: '#666' }}>
              <strong>{sortedData.length}</strong> of {predArray.length} employees
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Table */}
      <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2, mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Employee ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Department</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Job Role</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', color: '#333' }}>
                Age
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', color: '#333' }}>
                Tenure
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', color: '#333' }}>
                Attrition Risk
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', color: '#333' }}>
                Probability
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', color: '#333' }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.length > 0 ? (
              sortedData.map((emp, idx) => (
                <TableRow
                  key={idx}
                  sx={{
                    '&:nth-of-type(even)': { bgcolor: '#fafafa' },
                    '&:hover': { bgcolor: '#f0f0f0' },
                    cursor: 'pointer',
                  }}
                >
                  <TableCell sx={{ fontWeight: '500' }}>{emp.employee_id}</TableCell>
                  <TableCell>{emp.department}</TableCell>
                  <TableCell>{emp.job_role}</TableCell>
                  <TableCell align="right">{emp.age}</TableCell>
                  <TableCell align="right">{emp.years_at_company} years</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={emp.risk_level}
                      size="small"
                      sx={{
                        bgcolor: getRiskBgColor(emp.risk_level),
                        color: getRiskColor(emp.risk_level),
                        fontWeight: 'bold',
                        border: `2px solid ${getRiskColor(emp.risk_level)}`,
                      }}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: '500', color: getRiskColor(emp.risk_level) }}>
                    {emp.attrition_probability.toFixed(1)}%
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      onClick={() => handleSelectEmployee(emp)}
                      endIcon={<ArrowRightIcon />}
                      sx={{
                        color: '#667eea',
                        textTransform: 'none',
                        '&:hover': { bgcolor: '#f3f0ff' },
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 4, color: '#999' }}>
                  No employees match the selected filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Statistics */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Critical ({'>'}75%)
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#dc2626' }}>
                {sortedData.filter((e) => e.attrition_probability > 75).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Highest Risk
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#667eea' }}>
                {sortedData[0]?.attrition_probability.toFixed(1)}%
              </Typography>
              <Typography variant="caption" sx={{ color: '#999' }}>
                ID: {sortedData[0]?.employee_id}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Average Risk
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#f97316' }}>
                {(sortedData.reduce((sum, e) => sum + e.attrition_probability, 0) / sortedData.length).toFixed(1)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Visible Employees
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#10b981' }}>
                {sortedData.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RiskTableScreen;
