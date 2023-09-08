
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors module
const dotenv=require('dotenv');
const app = express();
dotenv.config();
// Set up middleware
app.use(bodyParser.json());


const allowedOrigins = [
  'http://localhost:3000/*', // Replace with your extension's origin
  // ... other origins you want to allow
];

// Configure CORS options
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// Use cors middleware with specific configuration
app.use(cors(corsOptions));

// Connect to MongoDB using mongoose
const MONGO_URL=process.env.MONGODB_URL;
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Create a Mongoose schema for LinkedIn profiles
const linkedInProfileSchema = new mongoose.Schema({
  name: String,
  location: String,
  about: String,
  bio: String,
  followerCount: Number,
  connectionCount: Number,
  bioLine: String
});

// Create a Mongoose model
const LinkedInProfile = mongoose.model('LinkedInProfile', linkedInProfileSchema);

// Define a POST route to save LinkedIn profile data
app.post('/api/linkedin-profiles', async (req, res) => {
  try {
    const profileData = req.body;
    const newProfile = new LinkedInProfile(profileData);
    await newProfile.save();
    console.log('Profile data saved successfully:', newProfile);
    res.json({ message: 'Profile data saved successfully' });
  } catch (error) {
    console.error('Error saving profile data:', error);
    res.status(500).json({ error: 'An error occurred while saving profile data' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
