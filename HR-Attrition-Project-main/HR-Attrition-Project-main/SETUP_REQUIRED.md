# 🔴 CRITICAL: Setup Instructions

## ⚠️ BEFORE RUNNING THE APP

### Step 1: Generate Preprocessor File

The notebook must be run to generate `preprocessor.pkl`.

**Option A: Using Jupyter (Recommended)**
```bash
cd "c:\Users\HP\Desktop\HR Attrition Project"
jupyter notebook Attrition_Correct.ipynb
```
- Run all cells (Kernel → Restart & Run All)
- Files saved: `best_attrition_model.pkl`, `preprocessor.pkl`
- Close notebook

**Option B: Using Python**
```bash
cd "c:\Users\HP\Desktop\HR Attrition Project"
python -m nbconvert --to notebook --execute Attrition_Correct.ipynb
```

### Step 2: Verify Files Exist

After running notebook, check:
```
c:\Users\HP\Desktop\HR Attrition Project\
├── best_attrition_model.pkl     ✓ (Already exists)
└── preprocessor.pkl               ← Should now exist
```

### Step 3: Ready to Deploy

Once both `.pkl` files exist:
```
Windows:  START_APP.bat
Linux:    ./start_app.sh
```

---

## 📍 File Locations

The app looks for model files in this order:
1. `backend/best_attrition_model.pkl` (preferred)
2. `../best_attrition_model.pkl` (project root)

Same for `preprocessor.pkl`

---

## 🧪 Quick Test

```bash
cd backend
python -c "import joblib; joblib.load('../best_attrition_model.pkl'); print('✓ Model loads')"
python -c "import joblib; joblib.load('../preprocessor.pkl'); print('✓ Preprocessor loads')"
```

---

## ✅ After Setup Complete

You should see in project folder:
```
✓ best_attrition_model.pkl (1-2 MB)
✓ preprocessor.pkl (100-500 KB)
```

Then run: `START_APP.bat`

---

## 🆘 If Preprocessor is Missing

This means the notebook wasn't run. The notebook code creates it:

```python
# At the end of Attrition_Correct.ipynb
joblib.dump(meilleur_model, 'best_attrition_model.pkl')
joblib.dump(prep_pipeline, 'preprocessor.pkl')
```

**Solution**: Run the notebook from start to finish.

---

**The app won't work without BOTH files. This is a one-time setup.**
