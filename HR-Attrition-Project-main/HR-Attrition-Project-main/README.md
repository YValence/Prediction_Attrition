# HR Attrition Analytics & Prediction System

A professional, locally-hosted web application for HR managers to upload employee data, explore workforce insights, and identify at-risk employees using machine learning predictions.

## 🎯 Features

- **File Upload**: Drag-and-drop CSV/XLSX employee data
- **Data Exploration**: Interactive visualizations of workforce demographics
- **Attrition Predictions**: ML-powered risk identification (High/Medium/Low)
- **Risk Dashboard**: KPIs and risk distribution charts
- **Employee Risk Table**: Filterable, searchable employee risk analysis
- **Individual Profiles**: Detailed risk insights and HR recommendations
- **Local Processing**: No cloud, no data leaving your machine

## 🏗️ Architecture

```
HR Attrition Project/
├── backend/
│   ├── main.py              # FastAPI server
│   ├── requirements.txt      # Python dependencies
│   ├── best_attrition_model.pkl    # Trained ML model
│   └── preprocessor.pkl     # Data preprocessing pipeline
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main React app
│   │   ├── main.jsx         # Entry point
│   │   ├── main.css         # Global styles
│   │   ├── pages/           # Page components
│   │   │   ├── UploadScreen.jsx
│   │   │   ├── ExploreScreen.jsx
│   │   │   ├── PredictionScreen.jsx
│   │   │   ├── RiskTableScreen.jsx
│   │   │   └── EmployeeDetailScreen.jsx
│   │   └── components/      # Reusable components
│   ├── package.json         # Node dependencies
│   ├── vite.config.js       # Vite config
│   └── index.html           # Entry HTML
├── WA_Fn-UseC_-HR-Employee-Attrition.csv  # Training data
└── Attrition_Correct.ipynb  # Model notebook
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- pip and npm

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python main.py
```

Server runs on `http://localhost:8000`

Health check: `http://localhost:8000/health`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

App opens on `http://localhost:3000`

## 📊 Workflow

1. **Upload** → Drag/drop CSV or XLSX file
2. **Explore** → View workforce demographics with interactive charts
3. **Predict** → Run ML model to identify attrition risk
4. **Analyze** → Review risk dashboard and KPIs
5. **Detail** → Click any employee for personalized insights & HR recommendations

## 🔌 API Endpoints

### `POST /upload`
Upload and validate employee data file.
- **Input**: CSV or XLSX file (multipart form)
- **Output**: Column names, row count, missing values, data preview

### `GET /explore`
Get exploration data with summary statistics and chart-ready data.
- **Output**: Numerical summaries, categorical counts, chart data

### `POST /predict`
Run attrition predictions on uploaded data.
- **Output**: Per-employee predictions, probabilities, risk levels, summary stats

### `GET /summary`
Get global summary statistics.
- **Output**: Total employees, averages, department/role counts

### `GET /health`
Health check endpoint.
- **Output**: Server status, model availability

## 🎨 UI/UX Design

- **Color Scheme**:
  - 🟢 Green: Low Risk (<30%)
  - 🟠 Orange: Medium Risk (30-60%)
  - 🔴 Red: High Risk (>60%)
  - 🟣 Purple: Brand primary (#667eea)

- **Material UI** for professional corporate design
- **Recharts** for interactive, responsive visualizations
- **Responsive**: Works on desktop, tablet, mobile

## 📋 Required Data Columns

The uploaded file must contain:

### Numerical
- Age, DistanceFromHome, MonthlyIncome, NumCompaniesWorked
- PercentSalaryHike, TotalWorkingYears, TrainingTimesLastYear
- YearsAtCompany, YearsInCurrentRole, YearsSinceLastPromotion

### Categorical
- BusinessTravel, Department, EducationField, Gender, JobRole
- MaritalStatus, OverTime

Optional:
- EmployeeNumber (displayed as ID)
- Attrition (for comparison analysis)

## 🔬 Model Details

- **Type**: Binary classifier (Logistic Regression)
- **Training Data**: 1,470 employees
- **Features**: 24 (10 numerical, 7 categorical)
- **Output**: 
  - Prediction: Yes/No
  - Probability: 0-100%
  - Risk Level: High/Medium/Low

## 📁 File Size Limits

- Recommended: <10K employees (CSV/XLSX)
- Processing time: <2 seconds for 1K employees

## 🛡️ Security & Privacy

- ✅ All processing happens locally
- ✅ No data uploaded to cloud
- ✅ No authentication required (local use)
- ✅ No database storage
- ✅ Session-based data (cleared on page refresh)

## 🔧 Customization

### Change ML Model
Replace `best_attrition_model.pkl` and `preprocessor.pkl` in the backend folder.

### Modify Risk Thresholds
In `frontend/src/pages/PredictionScreen.jsx`, update risk level boundaries:
```javascript
if (prob < 0.25) risk = "Low";
else if (prob < 0.55) risk = "Medium";
else risk = "High";
```

### Styling
- Material UI theme: `frontend/src/App.jsx`
- Global CSS: `frontend/src/main.css`

## 🐛 Troubleshooting

**Backend fails to start**
- Ensure Python 3.8+ installed
- Check model files exist in backend folder
- Run: `pip install -r requirements.txt --upgrade`

**Frontend doesn't connect to API**
- Verify backend running on port 8000
- Check browser console for CORS errors
- Ensure `localhost:8000` is accessible

**Predictions fail**
- Verify data columns match required schema
- Check CSV/XLSX format (no extra headers)
- Ensure no special characters in file name

## 📈 Performance

- Upload: <500ms for 1K employees
- Exploration: <100ms
- Prediction: <1s for 1K employees
- UI render: Instant (React optimized)

## 📝 Notes for HR Managers

- **High Risk** employees need urgent attention within 2 weeks
- **Medium Risk** employees should be monitored quarterly
- **Low Risk** employees are stable but maintain engagement
- Run predictions quarterly to track changes
- Use filters to focus on specific departments/roles

## 🚀 Deployment (Optional)

To deploy this as an internal tool:

**Backend**:
```bash
# On Ubuntu/Linux
gunicorn -w 4 -b 0.0.0.0:8000 "main:app" --worker-class uvicorn.workers.UvicornWorker
```

**Frontend**:
```bash
npm run build
# Serve dist/ folder via nginx or Python HTTP server
python -m http.server --directory dist 8080
```

## 📄 License

Internal HR Tool - Confidential

## ✉️ Support

For issues or questions, contact the Data Analytics team.
