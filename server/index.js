import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
// Note: For a real app, you would replace this URL with your actual MongoDB connection string
// mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ezy-tracker')
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// Sample User Model (would be in separate files in a real app)
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   isAdmin: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now }
// });

// const User = mongoose.model('User', userSchema);

// Mock user for demonstration
const mockUsers = [
  {
    id: '1',
    username: 'user69',
    password: '$2a$10$XJgq4c5cURXHFJFrxVpP0evvZWBCxpHvS0TrJU.lfFfYJAm.ld9GK', // hashed '1234qwer'
    isAdmin: false
  }
];

// Auth Middleware
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    // For demo, we're not validating the token, just checking if it exists
    // In a real app, you would verify the token:
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = decoded;
    
    // Mock user for demo
    req.user = { id: '1', username: 'user69', isAdmin: false };
    
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Routes

// Auth Routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user
    const user = mockUsers.find(u => u.username === username);
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Create token (in a real app, use a proper secret)
    const token = jwt.sign(
      { id: user.id, username: user.username, isAdmin: user.isAdmin },
      'secret-jwt-token',
      { expiresIn: '1d' }
    );
    
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// User Routes
app.get('/api/users/profile', authMiddleware, (req, res) => {
  // In a real app, you would fetch the user from the database
  res.json(req.user);
});

// Expense Routes
app.get('/api/expenses', authMiddleware, (req, res) => {
  // Mock data
  const expenses = [
    { id: 1, category: 'Housing', amount: 15000, date: '2025-06-01', description: 'Monthly rent', userId: '1' },
    { id: 2, category: 'Groceries', amount: 5600, date: '2025-06-03', description: 'Weekly shopping', userId: '1' },
    { id: 3, category: 'Utilities', amount: 3200, date: '2025-06-05', description: 'Electricity bill', userId: '1' },
  ];
  
  res.json(expenses);
});

app.post('/api/expenses', authMiddleware, (req, res) => {
  // In a real app, you would save to the database
  res.status(201).json({ message: 'Expense created successfully', expense: { id: 4, ...req.body, userId: req.user.id } });
});

// Income Routes
app.get('/api/income', authMiddleware, (req, res) => {
  // Mock data
  const income = [
    { id: 1, source: 'Salary', amount: 65000, date: '2025-06-01', description: 'Monthly salary', userId: '1' },
    { id: 2, source: 'Freelance', amount: 15000, date: '2025-06-10', description: 'Website project', userId: '1' },
  ];
  
  res.json(income);
});

app.post('/api/income', authMiddleware, (req, res) => {
  // In a real app, you would save to the database
  res.status(201).json({ message: 'Income created successfully', income: { id: 3, ...req.body, userId: req.user.id } });
});

// Savings Goals Routes
app.get('/api/savings-goals', authMiddleware, (req, res) => {
  // Mock data
  const goals = [
    { id: 1, name: 'Emergency Fund', targetAmount: 300000, currentAmount: 150000, deadline: '2025-12-31', userId: '1' },
    { id: 2, name: 'New Laptop', targetAmount: 90000, currentAmount: 45000, deadline: '2025-09-30', userId: '1' },
  ];
  
  res.json(goals);
});

app.post('/api/savings-goals', authMiddleware, (req, res) => {
  // In a real app, you would save to the database
  res.status(201).json({ message: 'Savings goal created successfully', goal: { id: 3, ...req.body, userId: req.user.id } });
});

// Dashboard Summary Route
app.get('/api/dashboard/summary', authMiddleware, (req, res) => {
  // Mock data
  const summary = {
    totalIncome: 65000,
    totalExpenses: 38500,
    totalSavings: 26500,
    monthlyBudget: 50000,
    budgetUtilization: 77,
  };
  
  res.json(summary);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;