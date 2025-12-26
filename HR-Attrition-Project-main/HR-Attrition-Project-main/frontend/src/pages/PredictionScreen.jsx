import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const PredictionScreen = ({ fileData, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [predictions, setPredictions] = useState(null);

  const runPredictions = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Prediction failed');
      }

      const data = await response.json();
      setPredictions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (predictions) {
      onSuccess(predictions);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', py: 8 }}>
        <CircularProgress sx={{ mb: 2 }} />
        <Typography>Running attrition predictions...</Typography>
      </Box>
    );
  }

  if (!predictions) {
    return (
      <Box sx={{ py: 4 }}>
        <Card sx={{ boxShadow: 3, borderRadius: 2, mb: 4, bgcolor: '#f9f7ff' }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#667eea' }}>
              Ready to Predict Attrition
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: '#666' }}>
              Click below to run the ML model on your employee data. This will identify employees at risk of leaving.
            </Typography>
            <Button
              onClick={runPredictions}
              variant="contained"
              size="large"
              sx={{
                bgcolor: '#667eea',
                '&:hover': { bgcolor: '#764ba2' },
                textTransform: 'none',
                fontSize: '16px',
                px: 4,
                py: 1.5,
              }}
            >
              Run Predictions
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  const { summary, predictions: predArray } = predictions;
  const riskData = [
    { name: 'Low Risk', value: summary.low_risk, color: '#10b981' },
    { name: 'Medium Risk', value: summary.medium_risk, color: '#f97316' },
    { name: 'High Risk', value: summary.high_risk, color: '#ef4444' },
  ];

  const riskChartData = [
    { name: 'Low\n(<30%)', value: summary.low_risk },
    { name: 'Medium\n(30-60%)', value: summary.medium_risk },
    { name: 'High\n(>60%)', value: summary.high_risk },
  ];

  return (
    <Box sx={{ py: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 2, borderRadius: 2, height: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 140 }}>
              <Typography color="textSecondary" gutterBottom>
                Total Employees
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#667eea' }}>
                {summary.total_employees}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 2, borderRadius: 2, height: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 140 }}>
              <Typography color="textSecondary" gutterBottom>
                High Risk
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ef4444' }}>
                {summary.high_risk}
              </Typography>
              <Typography variant="caption" sx={{ color: '#999' }}>
                {((summary.high_risk / summary.total_employees) * 100).toFixed(1)}% of workforce
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 2, borderRadius: 2, height: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 140 }}>
              <Typography color="textSecondary" gutterBottom>
                Medium Risk
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#f97316' }}>
                {summary.medium_risk}
              </Typography>
              <Typography variant="caption" sx={{ color: '#999' }}>
                {((summary.medium_risk / summary.total_employees) * 100).toFixed(1)}% of workforce
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 2, borderRadius: 2, height: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 140 }}>
              <Typography color="textSecondary" gutterBottom>
                Avg Risk Level
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#667eea' }}>
                {summary.average_attrition_probability.toFixed(1)}%
              </Typography>
              <Typography variant="caption" sx={{ color: '#999' }}>
                Average probability across workforce
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Pie Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Risk Distribution (Donut)
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', height: 300 }}>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={riskData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {riskData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Risk Levels Breakdown
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={riskChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#667eea" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Summary Box */}
      <Card sx={{ boxShadow: 2, borderRadius: 2, mb: 4, bgcolor: '#f9f7ff' }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#667eea' }}>
            📊 Summary
          </Typography>
          <Typography variant="body1" sx={{ mb: 1, color: '#666' }}>
            The model identified <strong>{summary.high_risk} high-risk employees</strong> who are likely to leave within the next period.
          </Typography>
          <Typography variant="body1" sx={{ mb: 1, color: '#666' }}>
            Additionally, <strong>{summary.medium_risk} employees</strong> show moderate attrition risk and should be monitored.
          </Typography>
          <Typography variant="body2" sx={{ color: '#999', mt: 2 }}>
            Next: Review the detailed risk analysis and employee profiles to take preventive action.
          </Typography>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
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
          View Risk Analysis
        </Button>
      </Box>
    </Box>
  );
};

export default PredictionScreen;
