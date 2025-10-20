#!/bin/bash

# Start script for the React frontend
# This script installs dependencies and starts the development server

echo "Starting Crypto Prices Frontend..."
echo "Frontend will be available at: http://localhost:3000"
echo "Make sure the backend is running on port 8000"
echo "Press Ctrl+C to stop the server"
echo ""

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  yarn install
  echo ""
fi

# Start the development server
yarn dev

