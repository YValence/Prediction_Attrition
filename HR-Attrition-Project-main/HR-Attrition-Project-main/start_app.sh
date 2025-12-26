#!/bin/bash

# HR Attrition Analytics - Startup Script for macOS/Linux

echo ""
echo "===================================="
echo "HR Attrition Analytics - Startup"
echo "===================================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 not found. Please install Python 3.8+ from python.org"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js not found. Please install Node.js 16+ from nodejs.org"
    exit 1
fi

echo "[1/4] Python and Node.js detected ✓"
echo ""

# Setup Backend
echo "[2/4] Starting Backend Setup..."
cd backend

if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

source venv/bin/activate
pip install -q -r requirements.txt
echo "Backend dependencies installed ✓"
echo ""

# Start Backend in background
echo "[3/4] Starting FastAPI Backend Server..."
python main.py &
BACKEND_PID=$!
echo "Backend running on http://localhost:8000 (PID: $BACKEND_PID)"
sleep 3
echo ""

# Setup Frontend
echo "[4/4] Starting Frontend Setup..."
cd ../frontend

if [ ! -d "node_modules" ]; then
    echo "Installing Node packages..."
    npm install -q
fi

echo "Frontend dependencies installed ✓"
echo ""

# Start Frontend
echo "===================================="
echo "✓ Application Starting"
echo "===================================="
echo ""
echo "Frontend will open automatically on http://localhost:3000"
echo "Backend API: http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop the application."
echo ""

npm run dev

# Cleanup on exit
trap "kill $BACKEND_PID" EXIT

wait
