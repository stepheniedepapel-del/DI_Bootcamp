import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';

// POST /register
const register = async (req, res) => {
  try {
    const { username, password, email, first_name, last_name } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Hash password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save to DB using transaction
    const userId = await userModel.createUserTransaction(
      { username, email, first_name, last_name }, 
      hashedPassword
    );

    res.status(201).json({ message: 'User registered successfully', userId });
  } catch (error) {
    // Handle duplicate username (SQLite error code for UNIQUE constraint)
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(409).json({ error: 'Username already exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Fetch hashed password from database
    const userRecord = await userModel.findPasswordByUsername(username);

    if (!userRecord) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare provided password with database hash
    const isMatch = await bcrypt.compare(password, userRecord.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.status(200).json({ message: `Login successful! Welcome ${username}.` });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /users
const getUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /users/:id
const getUserById = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// PUT /users/:id
const updateUser = async (req, res) => {
  try {
    const { email, first_name, last_name } = req.body;
    const updatedUser = await userModel.updateUser(req.params.id, { email, first_name, last_name });
    
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default {
  register,
  login,
  getUsers,
  getUserById,
  updateUser
};