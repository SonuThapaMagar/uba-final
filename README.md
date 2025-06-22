# Font Display Project

A full-stack application for displaying and managing fonts.

## Project Structure

- `frontend/` - React + Vite frontend application
- `backend/` - Express + TypeORM backend API

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with your database configuration:
   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=font_project
   ```

4. Make sure you have MySQL running and create the database:
   ```sql
   CREATE DATABASE font_project;
   ```

5. Start the backend server:
   ```bash
   npm start
   ```

The backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:5173`

## Fixed Issues

- ✅ Added favicon.svg to prevent 404 errors
- ✅ Fixed CSS import path in index.html
- ✅ Added CORS support to backend
- ✅ Improved database connection error handling
- ✅ Added default environment variables

## Technologies Used

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Express, TypeScript, TypeORM, MySQL 