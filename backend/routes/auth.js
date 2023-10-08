const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const config = require("../config/config.js");



const SECRET_KEY = 'super-secret-key'

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});





router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const tokenPayload = {
      userId: user._id,
      username: user.username, // Include the username in the payload
    
    };

    const token = jwt.sign(tokenPayload, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' });
  }
});



// Middleware to check if a user is authenticated
async function isAuthenticated(req, res, next) {
  // Get the token from the request header
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Token missing or invalid' });
  }

  const token = authorizationHeader.slice(7);

  // Verify the token
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    // If the token is valid, you can access the decoded data
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  });
}
// Example Express route for fetching user data
router.get('/user', isAuthenticated, (req, res) => {
  // Check if the user is authenticated (already done by isAuthenticated middleware)
  // Retrieve user data based on the authenticated user (e.g., from a database)
  // In this case, we'll send the username as a JSON response
  const userData = {
    username: req.user.username,
    // Add other user data fields as needed
  };
  
  // Log the username to the console
//  console.log('Username:', userData.username);

  // Send the user data (username) as a JSON response
  res.status(200).json(userData);
});









// Logout (if needed, just destroy the token on the client side)
// Add a logout route or implement token invalidation logic as required

module.exports = router;
