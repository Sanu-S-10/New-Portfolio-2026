# Full-Stack Portfolio Website

A simple, beginner-friendly full-stack portfolio website built for a Computer Science student.

## Technologies Used
*   **Frontend**: HTML, CSS, JavaScript
*   **Backend**: Node.js, Express.js
*   **Database**: MongoDB

## Folder Structure
*   `frontend/`: Contains all HTML, CSS, and JS files for the UI.
*   `backend/`: Contains the Node.js server, API routes, and Mongoose models.

## Setup Instructions

### 1. Backend Setup
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   *Note: Update the `MONGO_URI` if you are using MongoDB Atlas, otherwise the default local URI will be used.*
4. Start the backend server:
   ```bash
   node server.js
   ```
   *The server will run on port 5000 and automatically seed sample projects to your database on the first run.*

### 2. Frontend Setup
1. The frontend consists of static files. You can open `frontend/index.html` directly in your browser.
2. For the best experience and to avoid CORS issues if testing APIs, serve it using a local server (like the "Live Server" extension in VS Code).

## Deployment

### Frontend Deployment (Netlify/Vercel)
1. Drag and drop the `frontend` folder into Netlify.
2. Update the `backendUrl` variable in `frontend/script.js` to point to your live backend API URL.

### Backend Deployment (Render/Railway)
1. Push the repository to GitHub.
2. Create a new Web Service on Render or Railway, pointing to the `backend` folder as the root directory.
3. Set the Build Command to `npm install` and Start Command to `node server.js`.
4. Add the `MONGO_URI` and `PORT` environment variables in the deployment dashboard.
