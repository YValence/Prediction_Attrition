from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import pandas as pd
import numpy as np
import joblib
import io
import json
from pathlib import Path
import openpyxl

# Global variables to store data and models
session_data = None
session_columns = None
model = None
preprocessor = None

# Feature column names (matching training)
NUMERIC_COLS = [
    'Age', 'DistanceFromHome', 'MonthlyIncome', 'NumCompaniesWorked',
    'PercentSalaryHike', 'TotalWorkingYears', 'TrainingTimesLastYear',
    'YearsAtCompany', 'YearsInCurrentRole', 'YearsSinceLastPromotion'
]

CATEGORICAL_COLS = [
    'BusinessTravel', 'Department', 'EducationField', 'Gender', 'JobRole',
    'MaritalStatus', 'OverTime'
]

HR_SUMMARY_COLS = ['EmployeeNumber', 'Age', 'Department', 'JobRole', 'MonthlyIncome']

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load models on startup, cleanup on shutdown"""
    global model, preprocessor
    # Startup
    try:
        # Get the directory of this file
        backend_dir = Path(__file__).parent
        parent_dir = backend_dir.parent
        
        # Try to find model - first in backend, then in parent
        model_path = backend_dir / "best_attrition_model.pkl"
        if not model_path.exists():
            model_path = parent_dir / "best_attrition_model.pkl"
        
        # Try to find preprocessor - first in backend, then in parent
        preprocessor_path = backend_dir / "preprocessor.pkl"
        if not preprocessor_path.exists():
            preprocessor_path = parent_dir / "preprocessor.pkl"
        
        if not model_path.exists():
            raise FileNotFoundError(f"Model not found at {model_path}")
        if not preprocessor_path.exists():
            raise FileNotFoundError(f"Preprocessor not found at {preprocessor_path}")
        
        model = joblib.load(model_path)
        preprocessor = joblib.load(preprocessor_path)
        print("✓ Model and preprocessor loaded successfully")
        print(f"  Model: {model_path}")
        print(f"  Preprocessor: {preprocessor_path}")
    except Exception as e:
        print(f"✗ Failed to load models: {e}")
        raise
    
    yield
    # Shutdown (cleanup if needed)
    print("✓ App shutting down")

app = FastAPI(title="HR Attrition Analytics API", lifespan=lifespan)

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """
    Upload CSV or XLSX file and validate structure
    Returns: column names, row count, missing values
    """
    global session_data, session_columns
    
    try:
        # Read file based on extension
        if file.filename.endswith('.csv'):
            contents = await file.read()
            df = pd.read_csv(io.BytesIO(contents))
        elif file.filename.endswith('.xlsx'):
            contents = await file.read()
            df = pd.read_excel(io.BytesIO(contents))
        else:
            raise HTTPException(status_code=400, detail="Only CSV and XLSX files supported")
        
        # Validate required columns exist
        required_cols = set(NUMERIC_COLS + CATEGORICAL_COLS)
        missing_cols = required_cols - set(df.columns)
        if missing_cols:
            raise HTTPException(
                status_code=400,
                detail=f"Missing columns: {', '.join(missing_cols)}"
            )
        
        # Store in session
        session_data = df.copy()
        session_columns = df.columns.tolist()
        
        return {
            "status": "success",
            "message": f"File uploaded: {file.filename}",
            "rows": len(df),
            "columns": session_columns,
            "shape": {"rows": len(df), "cols": len(df.columns)},
            "missing_values": df.isnull().sum().to_dict(),
            "preview": df.head(5).to_dict(orient="records")
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/explore")
def explore_data():
    """
    Return data exploration summary with charts ready
    """
    global session_data
    
    if session_data is None:
        raise HTTPException(status_code=400, detail="No file uploaded yet")
    
    df = session_data
    
    try:
        # Check for required columns
        missing_cols = [col for col in NUMERIC_COLS + CATEGORICAL_COLS if col not in df.columns]
        if missing_cols:
            raise HTTPException(status_code=400, detail=f"Missing required columns: {', '.join(missing_cols)}")
        
        # Numerical features summary
        numerical_summary = {}
        for col in NUMERIC_COLS:
            if col in df.columns:
                col_data = pd.to_numeric(df[col], errors='coerce')
                numerical_summary[col] = {
                    "mean": float(col_data.mean()),
                    "std": float(col_data.std()),
                    "min": float(col_data.min()),
                    "max": float(col_data.max()),
                    "median": float(col_data.median()),
                }
        
        # Categorical features summary
        categorical_summary = {}
        for col in CATEGORICAL_COLS:
            if col in df.columns:
                value_counts = df[col].value_counts()
                categorical_summary[col] = {
                    "unique": int(df[col].nunique()),
                    "values": {str(k): int(v) for k, v in value_counts.to_dict().items()},
                    "labels": [str(x) for x in value_counts.index],
                    "counts": [int(x) for x in value_counts.values]
                }
        
        # Age distribution
        age_bins = [0, 25, 35, 45, 55, 65]
        age_data = pd.to_numeric(df['Age'], errors='coerce')
        age_dist = pd.cut(age_data, bins=age_bins).value_counts().sort_index()
        age_labels = ['18-25', '25-35', '35-45', '45-55', '55-65']
        
        # Monthly income distribution (quartiles)
        income_data = pd.to_numeric(df['MonthlyIncome'], errors='coerce')
        income_quartiles = pd.qcut(income_data, q=4, duplicates='drop')
        income_dist = income_quartiles.value_counts().sort_index()
        # Create proper labels with ranges
        income_labels = [f"${int(interval.left):,} - ${int(interval.right):,}" for interval in income_dist.index]
        
        # Department summary
        dept_summary = df['Department'].value_counts()
        
        # Job role summary
        role_summary = df['JobRole'].value_counts()
        
        # Check if Attrition column exists (optional)
        attrition_data = None
        
        return {
            "status": "success",
            "summary": {
                "total_rows": int(len(df)),
                "total_cols": int(len(df.columns)),
                "missing_values": {str(k): int(v) for k, v in df.isnull().sum().to_dict().items()}
            },
            "numerical": numerical_summary,
            "categorical": categorical_summary,
            "charts": {
                "age_distribution": {
                    "labels": age_labels,
                    "values": [int(x) for x in age_dist.values]
                },
                "department": {
                    "labels": [str(x) for x in dept_summary.index],
                    "values": [int(x) for x in dept_summary.values]
                },
                "job_role": {
                    "labels": [str(x) for x in role_summary.index],
                    "values": [int(x) for x in role_summary.values]
                },
                "monthly_income": {
                    "labels": income_labels,
                    "values": [int(x) for x in income_dist.values]
                }
            }
        }
    except Exception as e:
        import traceback
        error_msg = f"Exploration failed: {str(e)}"
        print(f"ERROR in /explore: {error_msg}")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=error_msg)

@app.post("/predict")
def predict_attrition():
    """
    Run attrition prediction on uploaded data
    Returns per-employee predictions with risk levels
    """
    global session_data, model, preprocessor
    
    if session_data is None:
        raise HTTPException(status_code=400, detail="No file uploaded yet")
    if model is None or preprocessor is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    
    try:
        df = session_data.copy()
        
        # Extract all features except target column (Attrition)
        feature_cols = [col for col in df.columns if col != 'Attrition']
        features = df[feature_cols].copy()
        
        # Apply preprocessing
        features_preprocessed = preprocessor.transform(features)
        
        # Get predictions
        predictions = model.predict(features_preprocessed)
        probabilities = model.predict_proba(features_preprocessed)[:, 1]
        
        # Get feature names and coefficients for importance analysis
        try:
            # Get coefficients from logistic regression model
            coefficients = model.coef_[0]
            feature_names = preprocessor.get_feature_names_out()
            
            # Create importance mapping (positive = increases risk, negative = decreases risk)
            feature_importance = dict(zip(feature_names, coefficients))
            
            # Get top risk factors
            sorted_features = sorted(feature_importance.items(), key=lambda x: abs(x[1]), reverse=True)
            top_risk_factors = sorted_features[:5]  # Top 5 factors
        except:
            top_risk_factors = []
        
        # Determine risk levels
        risk_levels = []
        for prob in probabilities:
            if prob < 0.3:
                risk_levels.append("Low")
            elif prob < 0.6:
                risk_levels.append("Medium")
            else:
                risk_levels.append("High")
        
        # Feature importance explanations in HR-friendly language
        feature_explanations = {
            # Numeric features
            'Age': 'Age and career stage',
            'DistanceFromHome': 'Commute distance',
            'MonthlyIncome': 'Salary and compensation',
            'NumCompaniesWorked': 'Job history and stability',
            'PercentSalaryHike': 'Salary growth and recognition',
            'TotalWorkingYears': 'Experience level',
            'TrainingTimesLastYear': 'Development opportunities',
            'YearsAtCompany': 'Company tenure',
            'YearsInCurrentRole': 'Role tenure',
            'YearsSinceLastPromotion': 'Promotion recency',
            # Categorical features
            'BusinessTravel': 'Travel frequency',
            'Department': 'Department type',
            'EducationField': 'Educational background',
            'Gender': 'Gender demographics',
            'JobRole': 'Job type and responsibilities',
            'MaritalStatus': 'Family situation',
            'OverTime': 'Overtime requirements',
        }
        
        # Helper function to get actual feature values driving the prediction
        def get_risk_drivers(employee_idx, risk_level, employee_row):
            """Get the actual features that drove this risk prediction"""
            drivers = []
            
            # Define what indicates high risk for common attributes
            risk_indicators = {
                'YearsAtCompany': {'low': 5, 'reason': 'Recent hire with less than 5 years tenure'},
                'MonthlyIncome': {'low': 3000, 'reason': 'Below average salary (< $3000/month)'},
                'YearsInCurrentRole': {'low': 2, 'reason': 'Limited time in current role (< 2 years)'},
                'YearsSinceLastPromotion': {'high': 3, 'reason': 'No promotion in 3+ years'},
                'DistanceFromHome': {'high': 10, 'reason': 'Long commute (> 10 miles)'},
                'TrainingTimesLastYear': {'low': 2, 'reason': 'Minimal training/development (< 2 times)'},
                'OverTime': 'Yes',
                'NumCompaniesWorked': {'high': 5, 'reason': 'Frequent job changes (> 5 companies)'},
                'PercentSalaryHike': {'low': 12, 'reason': 'Below average raise (< 12%)'},
            }
            
            # Check numeric indicators
            if 'YearsAtCompany' in employee_row:
                years = int(employee_row['YearsAtCompany'])
                if years < 5:
                    drivers.append(f"Company tenure: {years} years - {risk_indicators['YearsAtCompany']['reason']}")
            
            if 'MonthlyIncome' in employee_row:
                income = float(employee_row['MonthlyIncome'])
                if income < 3000:
                    drivers.append(f"Monthly income: ${income:,.0f} - {risk_indicators['MonthlyIncome']['reason']}")
            
            if 'YearsInCurrentRole' in employee_row:
                role_years = int(employee_row['YearsInCurrentRole'])
                if role_years < 2:
                    drivers.append(f"Time in role: {role_years} years - {risk_indicators['YearsInCurrentRole']['reason']}")
            
            if 'YearsSinceLastPromotion' in employee_row:
                promo_years = int(employee_row['YearsSinceLastPromotion'])
                if promo_years >= 3:
                    drivers.append(f"Last promotion: {promo_years} years ago - {risk_indicators['YearsSinceLastPromotion']['reason']}")
            
            if 'DistanceFromHome' in employee_row:
                distance = int(employee_row['DistanceFromHome'])
                if distance > 10:
                    drivers.append(f"Commute distance: {distance} miles - {risk_indicators['DistanceFromHome']['reason']}")
            
            if 'TrainingTimesLastYear' in employee_row:
                training = int(employee_row['TrainingTimesLastYear'])
                if training < 2:
                    drivers.append(f"Training sessions: {training}/year - {risk_indicators['TrainingTimesLastYear']['reason']}")
            
            if 'OverTime' in employee_row and employee_row['OverTime'] == 'Yes':
                drivers.append(f"Overtime: Frequently working overtime - High workload stress")
            
            if 'NumCompaniesWorked' in employee_row:
                companies = int(employee_row['NumCompaniesWorked'])
                if companies > 5:
                    drivers.append(f"Previous employers: {companies} - {risk_indicators['NumCompaniesWorked']['reason']}")
            
            if 'PercentSalaryHike' in employee_row:
                hike = float(employee_row['PercentSalaryHike'])
                if hike < 12:
                    drivers.append(f"Latest raise: {hike}% - {risk_indicators['PercentSalaryHike']['reason']}")
            
            # If no specific drivers found, return generic message
            if not drivers:
                if risk_level == "High":
                    drivers.append("Overall profile indicates higher attrition risk based on combination of factors")
                elif risk_level == "Medium":
                    drivers.append("Some indicators suggest moderate attrition concern - recommend engagement check")
                else:
                    drivers.append("Employee profile shows positive retention indicators")
            
            return drivers
        
        # Prepare results
        results = []
        for idx, row in df.iterrows():
            risk_level = risk_levels[idx]
            result = {
                "index": int(idx),
                "employee_id": str(row.get('EmployeeNumber', idx)),
                "name": str(row.get('EmployeeNumber', idx)),  # Use ID as fallback
                "department": str(row.get('Department', 'Unknown')),
                "job_role": str(row.get('JobRole', 'Unknown')),
                "attrition_prediction": "Yes" if predictions[idx] == 1 else "No",
                "attrition_probability": float(probabilities[idx] * 100),
                "risk_level": risk_level,
                "age": int(row['Age']) if 'Age' in row else None,
                "monthly_income": float(row['MonthlyIncome']) if 'MonthlyIncome' in row else None,
                "years_at_company": int(row['YearsAtCompany']) if 'YearsAtCompany' in row else None,
                "risk_factors": get_risk_drivers(idx, risk_level, row)
            }
            results.append(result)
        
        # Calculate summary stats
        high_risk_count = sum(1 for r in results if r['risk_level'] == 'High')
        medium_risk_count = sum(1 for r in results if r['risk_level'] == 'Medium')
        low_risk_count = sum(1 for r in results if r['risk_level'] == 'Low')
        avg_probability = float(np.mean(probabilities) * 100)
        
        return {
            "status": "success",
            "predictions": results,
            "summary": {
                "total_employees": len(results),
                "high_risk": high_risk_count,
                "medium_risk": medium_risk_count,
                "low_risk": low_risk_count,
                "average_attrition_probability": avg_probability
            }
        }
    except Exception as e:
        import traceback
        error_msg = f"Prediction failed: {str(e)}"
        print(f"ERROR in /predict: {error_msg}")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=error_msg)

@app.get("/summary")
def get_summary():
    """
    Get global summary stats
    """
    global session_data
    
    if session_data is None:
        raise HTTPException(status_code=400, detail="No file uploaded yet")
    
    try:
        df = session_data
        
        return {
            "status": "success",
            "summary": {
                "total_employees": len(df),
                "avg_age": float(df['Age'].mean()),
                "avg_income": float(df['MonthlyIncome'].mean()),
                "avg_tenure": float(df['YearsAtCompany'].mean()),
                "departments": int(df['Department'].nunique()),
                "job_roles": int(df['JobRole'].nunique())
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "model_loaded": model is not None,
        "preprocessor_loaded": preprocessor is not None
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
