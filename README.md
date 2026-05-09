# My Full-Stack Portfolio Website 🚀

Hey! This is my personal portfolio website that I built. It's a full-stack project where I connected a frontend built with HTML, CSS, and JavaScript with a Node.js backend and MongoDB database.

## Live Demo
🌐 **[Check out my live portfolio here!](https://new-portfolio-2026-blue.vercel.app/)**

## What I Used to Build This
- **Frontend**: HTML, CSS, and vanilla JavaScript (no frameworks, just pure code)
- **Backend**: Node.js with Express.js for the API
- **Database**: MongoDB to store my projects and contact messages
- **Deployment**: Vercel for the frontend, Render for the backend

## Project Structure
- `frontend/`: All my HTML, CSS, and JavaScript files for the website UI
- `backend/`: The Node.js server with API routes and MongoDB models

## How to Run This Locally

### Setting Up the Backend
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install all the packages:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder with your MongoDB connection:
   ```bash
   PORT=5000
   MONGO_URI=your_mongodb_uri_here
   ```
4. Start the server:
   ```bash
   node server.js
   ```
   It'll run on port 5000 and automatically load sample projects.

### Setting Up the Frontend
1. Open `frontend/index.html` in your browser, or
2. Use VS Code's "Live Server" extension for a better experience

