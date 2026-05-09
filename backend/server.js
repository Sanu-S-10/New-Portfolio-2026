require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import models
const Project = require('./models/Project');
const Contact = require('./models/Contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Seed initial data if projects collection is empty
    seedData();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Function to seed initial project data
const seedData = async () => {
  try {
    const count = await Project.countDocuments();
    if (count === 0) {
      console.log('No projects found. Seeding initial data...');
      const sampleProjects = [
        {
          title: 'MyWatchedList',
          description: 'A full-stack web application for tracking and managing your watched movies, TV series, anime, and animations. Keep track of what you\'ve watched, rate your favorites, and explore new content with integrated TMDB data.',
          technologies: ['React', 'Vite', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'CSS3', 'GitHub'],
          githubLink: 'https://my-watched-lists.vercel.app/'
        },
        {
          title: 'ClinicConnect',
          description: 'A simple clinic management application used to manage patient appointments, doctor schedules, and medical records efficiently.',
          technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'CSS'],
          githubLink: 'https://clinicconnect.vercel.app/'
        },
        {
          title: 'Password Cracking Simulator',
          description: 'Application designed to visually explain and simulate password hashing, salting, and brute-force cracking.',
          technologies: ['React', 'Vite', 'Tailwind CSS', 'Recharts', 'Node.js', 'Express', 'Crypto', 'Worker Threads'],
          githubLink: 'https://github.com/Sanu-S-10/password-cracking-simulator-.git'
        },
        {
          title: 'Simple E-commerce Website',
          description: 'A basic e-commerce front-end layout with a product catalog and a functional shopping cart.',
          technologies: ['HTML', 'CSS', 'JavaScript'],
          githubLink: 'https://github.com/sanus/simple-ecommerce'
        }
      ];
      await Project.insertMany(sampleProjects);
      console.log('Initial projects seeded successfully!');
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

// API Routes

// GET /api/projects - Fetch all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Unable to fetch projects' });
  }
});

// POST /api/contact - Submit a contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please provide name, email, and message' });
    }

    const newContact = await Contact.create({
      name,
      email,
      message
    });

    res.status(201).json({ message: 'Message sent successfully!', contact: newContact });
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Unable to send message' });
  }
});

// Start the server
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
