import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  Chip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const EmployeeDetailScreen = ({ employee, onBack }) => {
  if (!employee) {
    return (
      <Box sx={{ py: 4 }}>
        <Button onClick={onBack} startIcon={<ArrowBackIcon />} sx={{ mb: 3 }}>
          Back
        </Button>
        <Typography>No employee selected</Typography>
      </Box>
    );
  }

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

  const getRiskExplanation = (riskLevel) => {
    switch (riskLevel) {
      case 'High':
        return 'This employee shows elevated attrition risk based on multiple factors including tenure, workload patterns, and compensation. HR should prioritize engagement and retention conversations.';
      case 'Medium':
        return 'This employee shows moderate attrition risk. Monitoring and periodic engagement checks are recommended to identify any underlying concerns.';
      case 'Low':
        return 'This employee shows low attrition risk based on current data. Continue regular engagement practices to maintain satisfaction.';
      default:
        return 'Unable to determine risk level.';
    }
  };

  const getRecommendations = (riskLevel) => {
    const baseRecs = [
      '📋 Schedule a check-in meeting',
      '💼 Review career development opportunities',
      '📊 Assess compensation and benefits alignment',
    ];

    if (riskLevel === 'High') {
      return [
        '🚨 Urgent: Priority engagement meeting',
        '💰 Conduct compensation review',
        '📈 Discuss career advancement plans',
        '⏰ Implement flexible work arrangements if applicable',
        '🎯 Regular monitoring over next 3 months',
      ];
    } else if (riskLevel === 'Medium') {
      return [
        '📞 Schedule periodic check-ins',
        '🎓 Offer professional development',
        '🤝 Strengthen team relationships',
        '📅 Quarterly satisfaction reviews',
      ];
    } else {
      return [
        '✅ Maintain current engagement level',
        '🎉 Recognition programs',
        '📚 Continue development opportunities',
      ];
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      {/* Back Button */}
      <Button onClick={onBack} startIcon={<ArrowBackIcon />} sx={{ mb: 3, textTransform: 'none' }}>
        Back to Risk Table
      </Button>

      {/* Employee Header Card */}
      <Card sx={{ boxShadow: 3, borderRadius: 2, mb: 4, bgcolor: '#f9f7ff', borderLeft: `4px solid ${getRiskColor(employee.risk_level)}` }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333', mb: 1 }}>
                Employee ID: {employee.employee_id}
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 1 }}>
                <strong>Department:</strong> {employee.department} | <strong>Role:</strong> {employee.job_role}
              </Typography>
              <Typography variant="body2" sx={{ color: '#999' }}>
                <strong>Age:</strong> {employee.age} | <strong>Tenure:</strong> {employee.years_at_company} years | <strong>Income:</strong> ${employee.monthly_income?.toLocaleString() || 'N/A'}/month
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: { sm: 'right' } }}>
              <Chip
                label={employee.risk_level}
                size="medium"
                sx={{
                  bgcolor: getRiskBgColor(employee.risk_level),
                  color: getRiskColor(employee.risk_level),
                  fontWeight: 'bold',
                  fontSize: '16px',
                  padding: '20px 10px',
                  border: `2px solid ${getRiskColor(employee.risk_level)}`,
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                Attrition Risk Assessment
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: '500', color: '#666' }}>
                    Attrition Probability
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: getRiskColor(employee.risk_level) }}>
                    {employee.attrition_probability.toFixed(1)}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={employee.attrition_probability}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: '#e5e7eb',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: getRiskColor(employee.risk_level),
                    },
                  }}
                />
              </Box>

              <Box sx={{ p: 2, bgcolor: getRiskBgColor(employee.risk_level), borderRadius: 1, border: `1px solid ${getRiskColor(employee.risk_level)}` }}>
                <Typography variant="body2" sx={{ color: '#333', lineHeight: 1.6 }}>
                  {getRiskExplanation(employee.risk_level)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Risk Distribution */}
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                Risk Classification
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: '#ef4444',
                      mr: 2,
                    }}
                  />
                  <Typography variant="body2">
                    <strong>High Risk:</strong> 60%+ probability
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: '#f97316',
                      mr: 2,
                    }}
                  />
                  <Typography variant="body2">
                    <strong>Medium Risk:</strong> 30-60% probability
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: '#10b981',
                      mr: 2,
                    }}
                  />
                  <Typography variant="body2">
                    <strong>Low Risk:</strong> &lt;30% probability
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ p: 2, bgcolor: '#f3f4f6', borderRadius: 1 }}>
                <Typography variant="caption" sx={{ color: '#666' }}>
                  This employee is currently classified as <strong>{employee.risk_level} Risk</strong> and requires {employee.risk_level === 'High' ? 'immediate' : employee.risk_level === 'Medium' ? 'regular' : 'routine'} attention.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Risk Factors */}
      {employee.risk_factors && employee.risk_factors.length > 0 && (
        <Card sx={{ boxShadow: 2, borderRadius: 2, mb: 4, bgcolor: getRiskBgColor(employee.risk_level) }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
              Key Risk Factors
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {employee.risk_factors.map((factor, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      bgcolor: getRiskColor(employee.risk_level),
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      flexShrink: 0,
                      mt: 0.5,
                    }}
                  >
                    {idx + 1}
                  </Box>
                  <Typography variant="body2" sx={{ color: '#333', pt: 0.5 }}>
                    {factor}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      <Card sx={{ boxShadow: 2, borderRadius: 2, mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
            HR Action Recommendations
          </Typography>

          <Grid container spacing={2}>
            {getRecommendations(employee.risk_level).map((rec, idx) => (
              <Grid item xs={12} sm={6} key={idx}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: '#f9f7ff',
                    borderRadius: 1,
                    border: '1px solid #e9d5ff',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                  }}
                >
                  <Typography sx={{ fontSize: '20px', mt: 0.5 }}>
                    {rec.split(' ')[0]}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    {rec.split(' ').slice(1).join(' ')}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Summary Box */}
      <Card sx={{ boxShadow: 2, borderRadius: 2, mb: 4, bgcolor: '#fef3c7', borderLeft: '4px solid #f59e0b' }}>
        <CardContent>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: '#92400e' }}>
            💡 Key Insight
          </Typography>
          <Typography variant="body2" sx={{ color: '#78350f' }}>
            This employee's profile suggests {employee.risk_level.toLowerCase()} attrition risk. Proactive engagement and addressing key workplace factors can significantly improve retention likelihood. HR should follow up within the next 2 weeks to ensure satisfaction and address any concerns.
          </Typography>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button onClick={onBack} variant="contained" sx={{ bgcolor: '#667eea', '&:hover': { bgcolor: '#764ba2' }, textTransform: 'none', fontSize: '16px' }}>
          Back to Table
        </Button>
      </Box>
    </Box>
  );
};

export default EmployeeDetailScreen;
