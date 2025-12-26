# Quick Start Guide - HR Attrition Analytics

## 🎯 5-Minute Setup

### Windows Users

1. **Double-click**: `START_APP.bat`
2. **Wait**: Setup completes automatically (~30 seconds)
3. **Enjoy**: App opens on `http://localhost:3000`

That's it! The app will:
- Set up Python virtual environment
- Install all dependencies
- Start the backend API (port 8000)
- Start the frontend (port 3000)
- Open in your browser

### macOS/Linux Users

```bash
chmod +x start_app.sh
./start_app.sh
```

---

## 📊 Using the App

### Step 1: Upload Data
- Drag & drop your CSV/XLSX file (employee data)
- Or click "Browse Files"
- See data preview and validation

### Step 2: Explore
- View workforce demographics
- Toggle between charts: Attrition, Age, Department, Role, Income
- Review summary statistics

### Step 3: Run Predictions
- Click "Run Predictions"
- See attrition risk for each employee
- Review risk distribution

### Step 4: Analyze Risks
- See color-coded risk levels: 🟢 Low, 🟠 Medium, 🔴 High
- Filter by department or risk level
- Search for specific employees

### Step 5: Review Details
- Click any employee row
- See personalized risk explanation
- Get HR-specific recommendations

---

## 📋 Data Requirements

Your CSV/XLSX must have these columns:

**Required Numeric**: Age, MonthlyIncome, YearsAtCompany, YearsInCurrentRole, TotalWorkingYears, TrainingTimesLastYear, PercentSalaryHike, DistanceFromHome, NumCompaniesWorked, YearsSinceLastPromotion

**Required Categorical**: Department, JobRole, OverTime, Gender, MaritalStatus, BusinessTravel, EducationField

**Optional**: EmployeeNumber, Attrition (for comparison)

---

## 🆘 Troubleshooting

**Windows - "START_APP.bat won't run"**
- Right-click → Run as Administrator

**"Can't connect to http://localhost:8000"**
- Backend is starting. Wait 5-10 seconds
- If still failing, manually start backend:
  ```
  cd backend
  python main.py
  ```

**"npm not found"**
- Install Node.js from nodejs.org (includes npm)

**"python not found"**
- Install Python 3.8+ from python.org

**File upload fails**
- Check column names match exactly (case-sensitive)
- Ensure CSV has no extra headers
- Try .xlsx format instead

---

## 📞 Support

1. Check `README.md` for full documentation
2. Review `TESTING.md` for troubleshooting
3. Check browser console (F12) for error messages
4. Verify backend logs in terminal

---

## 🚀 What's Next?

1. **Upload your data** - Use the provided CSV or your own data
2. **Explore insights** - Understand your workforce
3. **Identify risks** - Find at-risk employees
4. **Take action** - Use recommendations for retention

The model identifies **High Risk** employees who likely need intervention within the next 90 days.

---

## 💡 Pro Tips

- ✅ Run quarterly to track trends
- ✅ Use filters to focus on specific teams
- ✅ Check "High Risk" employees first for quick wins
- ✅ Export predictions for HR discussions
- ✅ Data stays on your computer (100% private)

---

**Version**: 1.0.0 | **Date**: December 2024
