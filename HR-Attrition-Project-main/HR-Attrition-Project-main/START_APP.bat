@echo off
REM HR Attrition Analytics - Startup Script for Windows

echo.
echo ====================================
echo HR Attrition Analytics - Startup
echo ====================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python not found. Please install Python 3.8+ from python.org
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js not found. Please install Node.js 16+ from nodejs.org
    pause
    exit /b 1
)

echo [1/4] Python and Node.js detected ✓
echo.

REM Setup Backend
echo [2/4] Starting Backend Setup...
cd backend
if not exist venv (
    echo Creating Python virtual environment...
    python -m venv venv
)

call venv\Scripts\activate.bat
pip install -q -r requirements.txt
echo Backend dependencies installed ✓
echo.

REM Start Backend in new terminal
echo [3/4] Starting FastAPI Backend Server...
start cmd /k "cd backend && venv\Scripts\activate.bat && python main.py"
echo Backend running on http://localhost:8000
timeout /t 3 /nobreak
echo.

REM Setup Frontend
echo [4/4] Starting Frontend Setup...
cd ..\frontend
if not exist node_modules (
    echo Installing Node packages...
    call npm install -q
)
echo Frontend dependencies installed ✓
echo.

REM Start Frontend
echo ====================================
echo ✓ Application Starting
echo ====================================
echo.
echo Frontend will open automatically on http://localhost:3000
echo Backend API: http://localhost:8000
echo.
echo Close the terminal windows to stop the application.
echo.

call npm run dev

pause
