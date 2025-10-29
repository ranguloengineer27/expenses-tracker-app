# Expenses Tracker Server

Express server for the expenses tracker application built with TypeScript.

## Setup

1. Navigate to the server directory:

   ```bash
   cd src/server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` - Start server in development mode with hot reload
- `npm start` - Start the compiled server
- `npm run build` - Compile TypeScript to JavaScript
- `npm run type-check` - Check TypeScript types without emitting files

## Endpoints

- `GET /api/health` - Health check endpoint that returns server status

The server runs on port 3001 by default.
