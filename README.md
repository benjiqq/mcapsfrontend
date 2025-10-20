# Crypto Prices Frontend

A React app that displays cryptocurrency prices and allows chat-based queries.

## Features

- Display top 100 crypto prices in a table
- Real-time price updates with refresh button
- Adjustable limit for number of coins displayed
- Chat interface to ask questions about the data
- Clean, responsive UI

## Setup

1. Install dependencies:
```bash
yarn install
```

2. Start the development server:
```bash
yarn dev
# or
./start.sh
```

The app will be available at http://localhost:3000

## Requirements

- Node.js 16+
- Yarn package manager
- Backend API running on port 8000

## API Endpoints

The app connects to these backend endpoints:
- `GET /snapshots?limit=1` - Get latest snapshot
- `GET /snapshots/{id}/prices?limit={n}` - Get price data
- `POST /chat?message={msg}&vs_currency={vs}` - Chat queries

## Development

The app uses:
- React 18
- Vite for fast development and building
- CSS Modules for styling
- Fetch API for backend communication

Vite proxy configuration automatically forwards API calls to localhost:8000.
