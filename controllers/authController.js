// import bcrypt from 'bcryptjs';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
  const { name, email, password, gender } = req.body;
  const hashedPassword = await argon2.hash(password, 10);

  try {
    const newUser = await User.create({ name, email, password: hashedPassword, gender });
    res.status(201).json({ message: 'User created successfully', newUser });
  } catch (error) {
    res.status(400).json({ error: 'User already exists' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !await argon2.verify(user.password, password)) {
    return res.status(400).json({ error: 'Account Not Found' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};

export const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany({});
    res.json({ message: 'All users deleted successfully' });
  } catch (error) {
    console.error('Error deleting all users:', error);
    res.status(500).json({ error: 'Failed to delete all users' });
  }
};
