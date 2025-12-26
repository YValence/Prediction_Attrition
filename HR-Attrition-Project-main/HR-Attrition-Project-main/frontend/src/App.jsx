import React, { useState } from 'react';
import { Box, Container, Stepper, Step, StepLabel, AppBar, Toolbar, Typography } from '@mui/material';
import UploadScreen from './pages/UploadScreen';
import ExploreScreen from './pages/ExploreScreen';
import PredictionScreen from './pages/PredictionScreen';
import RiskTableScreen from './pages/RiskTableScreen';
import EmployeeDetailScreen from './pages/EmployeeDetailScreen';

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [exploreData, setExploreData] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const steps = [
    'Upload Data',
    'Explore',
    'Predictions',
    'Risk Analysis',
  ];

  const handleUploadSuccess = (data) => {
    setFileData(data);
    setUploadedFile(data);
    setActiveStep(1);
  };

  const handleExploreSuccess = (data) => {
    setExploreData(data);
    setActiveStep(2);
  };

  const handlePredictionSuccess = (data) => {
    setPredictions(data);
    setActiveStep(3);
  };

  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveStep((prev) => Math.min(steps.length - 1, prev + 1));
  };

  const resetApp = () => {
    setActiveStep(0);
    setUploadedFile(null);
    setFileData(null);
    setExploreData(null);
    setPredictions(null);
    setSelectedEmployee(null);
  };

  const renderContent = () => {
    switch (activeStep) {
      case 0:
        return <UploadScreen onSuccess={handleUploadSuccess} />;
      case 1:
        return <ExploreScreen fileData={fileData} onSuccess={handleExploreSuccess} />;
      case 2:
        return <PredictionScreen fileData={fileData} onSuccess={handlePredictionSuccess} />;
      case 3:
        return (
          <RiskTableScreen
            predictions={predictions}
            onSelectEmployee={handleSelectEmployee}
            onShowDetail={() => setActiveStep(4)}
          />
        );
      case 4:
        return <EmployeeDetailScreen employee={selectedEmployee} onBack={() => setActiveStep(3)} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      {/* Header */}
      <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            HR Attrition Analytics
          </Typography>
          {activeStep > 0 && (
            <button
              onClick={resetApp}
              style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              New Analysis
            </button>
          )}
        </Toolbar>
      </AppBar>

      {/* Progress Stepper */}
      {activeStep < 4 && (
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Stepper activeStep={activeStep} sx={{ bgcolor: 'white', p: 2, borderRadius: 1 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Container>
      )}

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ flex: 1, py: 3 }}>
        {renderContent()}
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: 'white', py: 2, textAlign: 'center', borderTop: '1px solid #eee' }}>
        <Typography variant="caption" sx={{ color: '#999' }}>
          HR Attrition Prediction System | All data processed locally
        </Typography>
      </Box>
    </Box>
  );
}

export default App;
