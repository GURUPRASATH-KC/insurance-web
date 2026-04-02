const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Lead = require('./models/Lead');
const User = require('./models/User');
const Purchase = require('./models/Purchase');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'healthguard_secret';

// Middleware for authentication
const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/insurance_leads';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s
    });
    console.log(`✅ Connected to MongoDB Atlas: ${conn.connection.host}`);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);

    // Provide helpful hints for common issues
    if (err.message.includes('ECONNREFUSED') || err.message.includes('querySrv')) {
      console.error('👉 TIP: This looks like a network or DNS issue. Check your internet connection and verify your IP is whitelisted in MongoDB Atlas.');
    } else if (err.message.includes('Authentication failed')) {
      console.error('👉 TIP: Invalid credentials. Double-check your MONGODB_URI password.');
    }

    // Don't exit yet, let the process live so node-mon can restart correctly
  }
};

// Monitor connection status
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB disconnected. Attempting to reconnect...');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB runtime error:', err);
});

// Start initial connection
connectDB();

// ──────────────────────────────────────────────
// AUTH ROUTES
// ──────────────────────────────────────────────

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: 'All fields are required.' });

    if (password.length < 6)
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(409).json({ message: 'Email already registered. Please login.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ userId: user._id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ message: `Welcome, ${user.name}!`, token, user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required.' });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: 'Invalid email or password.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid email or password.' });

    const token = jwt.sign({ userId: user._id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ message: `Welcome back, ${user.name}!`, token, user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// ──────────────────────────────────────────────
// LEADS ROUTE
// ──────────────────────────────────────────────
app.post('/api/leads', async (req, res) => {
  try {
    const { name, age, city, familyMembers, coverageAmount } = req.body;

    if (!name || !age || !city || !familyMembers || !coverageAmount)
      return res.status(400).json({ message: 'All fields are required' });

    const newLead = new Lead({ name, age, city, familyMembers, coverageAmount });
    await newLead.save();
    res.status(201).json({ message: 'Success! We will contact you soon.', lead: newLead });
  } catch (error) {
    console.error('Lead submission error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// ──────────────────────────────────────────────
// PURCHASES ROUTE
// ──────────────────────────────────────────────

// Save a new purchase
app.post('/api/purchases', authenticateUser, async (req, res) => {
  try {
    const { planName, insurer, price, coverage, members } = req.body;
    const userId = req.user.userId;

    if (!planName || !insurer || !price || !coverage || !members) {
      return res.status(400).json({ message: 'All plan details are required.' });
    }

    const purchase = await Purchase.create({
      userId,
      planName,
      insurer,
      price,
      coverage,
      members
    });

    res.status(201).json({ message: 'Purchase successful!', purchase });
  } catch (error) {
    console.error('Purchase error:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// Get user purchases
app.get('/api/purchases', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.userId;
    const purchases = await Purchase.find({ userId }).sort({ purchaseDate: -1 });
    res.status(200).json(purchases);
  } catch (error) {
    console.error('Fetch purchases error:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
