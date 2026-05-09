require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const mongoose = require('mongoose');
const Project = require('./models/Project');

const updates = [
  { title: 'MyWatchedList', githubLink: 'https://my-watched-lists.vercel.app/' },
  { title: 'ClinicConnect', githubLink: 'https://clinicconnect.vercel.app/' }
  ,{
    title: 'Attendance Management System',
    newTitle: 'Password Cracking Simulator',
    description: 'Application designed to visually explain and simulate password hashing, salting, and brute-force cracking.',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Recharts', 'Node.js', 'Express', 'Crypto', 'Worker Threads'],
    githubLink: 'https://github.com/Sanu-S-10/password-cracking-simulator-.git'
  }
];

const run = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio');
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    for (const u of updates) {
      const updateFields = { githubLink: u.githubLink };
      if (u.newTitle) updateFields.title = u.newTitle;
      if (u.description) updateFields.description = u.description;
      if (u.technologies) updateFields.technologies = u.technologies;

      const res = await Project.findOneAndUpdate({ title: u.title }, { $set: updateFields }, { new: true });
      if (res) console.log(`Updated ${u.title} -> ${u.githubLink}`);
      else console.log(`No project found with title ${u.title}`);
    }

    process.exit(0);
  } catch (err) {
    console.error('Error updating projects:', err);
    process.exit(1);
  }
};

run();
