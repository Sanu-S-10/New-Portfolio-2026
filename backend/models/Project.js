const mongoose = require('mongoose');

// Define the Project schema
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  technologies: {
    type: [String],
    required: true
  },
  githubLink: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Project', projectSchema);
