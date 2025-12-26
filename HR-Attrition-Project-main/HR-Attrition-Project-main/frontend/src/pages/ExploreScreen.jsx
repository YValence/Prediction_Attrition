import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Alert,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const ExploreScreen = ({ fileData, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [exploreData, setExploreData] = useState(null);
  const [selectedChart, setSelectedChart] = useState('attrition');

  useEffect(() => {
    fetchExploreData();
  }, []);

  const fetchExploreData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/explore');
      if (!response.ok) {
        throw new Error('Failed to load exploration data');
      }
      const data = await response.json();
      setExploreData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    onSuccess(exploreData);
  };

  const COLORS = ['#10b981', '#f97316', '#ef4444', '#6366f1'];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error}
      </Alert>
    );
  }

  if (!exploreData) {
    return null;
  }

  const { charts, summary } = exploreData;

  const renderChart = () => {
    switch (selectedChart) {
      case 'attrition':
        return charts.attrition ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={charts.attrition.labels.map((label, idx) => ({
                  name: label,
                  value: charts.attrition.values[idx],
                }))}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {charts.attrition?.labels?.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : null;

      case 'age':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={charts.age_distribution.labels.map((label, idx) => ({
              name: label,
              count: charts.age_distribution.values[idx],
            }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#667eea" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'department':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={charts.department.labels.map((label, idx) => ({
                name: label,
                count: charts.department.values[idx],
              }))}
              layout="vertical"
              margin={{ left: 150 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={140} />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'job_role':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={charts.job_role.labels.slice(0, 8).map((label, idx) => ({
                name: label,
                count: charts.job_role.values[idx],
              }))}
              layout="vertical"
              margin={{ left: 120 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={110} />
              <Tooltip />
              <Bar dataKey="count" fill="#f97316" />
            </BarChart>
          </ResponsiveContainer>
        );

     

      default:
        return null;
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 2, borderRadius: 2, height: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 120 }}>
              <Typography color="textSecondary" gutterBottom>
                Total Employees
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#667eea' }}>
                {summary.total_rows}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 2, borderRadius: 2, height: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 120 }}>
              <Typography color="textSecondary" gutterBottom>
                Features
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#10b981' }}>
                {summary.total_cols}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Chart Selection */}
      <Card sx={{ boxShadow: 3, borderRadius: 2, mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
            Workforce Overview
          </Typography>

          <ToggleButtonGroup
            value={selectedChart}
            exclusive
            onChange={(e, value) => value && setSelectedChart(value)}
            sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}
          >
            <ToggleButton value="age" sx={{ textTransform: 'none' }}>
              Age Distribution
            </ToggleButton>
            <ToggleButton value="department" sx={{ textTransform: 'none' }}>
              Department
            </ToggleButton>
            <ToggleButton value="job_role" sx={{ textTransform: 'none' }}>
              Job Role
            </ToggleButton>
            <ToggleButton value="income" sx={{ textTransform: 'none' }}>
              Monthly Income
            </ToggleButton>
          </ToggleButtonGroup>

          {/* Chart Rendering */}
          <Box sx={{ width: '100%', height: 'auto', bgcolor: '#fafafa', p: 2, borderRadius: 1 }}>
            {renderChart()}
          </Box>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button variant="outlined" sx={{ textTransform: 'none', fontSize: '16px' }}>
          Download Report
        </Button>
        <Button
          onClick={handleContinue}
          variant="contained"
          sx={{
            bgcolor: '#667eea',
            '&:hover': { bgcolor: '#764ba2' },
            textTransform: 'none',
            fontSize: '16px',
          }}
        >
          Run Predictions
        </Button>
      </Box>
    </Box>
  );
};

export default ExploreScreen;
