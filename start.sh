#!/usr/bin/env bash
# Quick local startup script for Online Examination Portal

set -e

echo "=========================================================="
echo " Starting Online Examination Portal with Smart Proctoring "
echo "=========================================================="

# 1. Start Backend in background
echo "[1/2] Starting Spring Boot REST Backend on port 8080..."
cd server
mvn spring-boot:run > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# 2. Start Frontend in background
echo "[2/2] Starting React Vite Frontend on port 5173..."
cd client
npm run dev -- --host 0.0.0.0 --port 5173 > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Both servers initiated successfully!"
echo "👉 Frontend: http://localhost:5173"
echo "👉 Backend:  http://localhost:8080"
echo "👉 H2 DB:    http://localhost:8080/h2-console"
echo ""
echo "Press Ctrl+C to stop both servers."

trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" SIGINT SIGTERM
wait
