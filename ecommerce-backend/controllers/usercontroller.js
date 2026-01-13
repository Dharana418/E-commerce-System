import usermodel from '../models/usermodel.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

// Generate JWT Token   


// Register a new user
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
    const userExists = await usermodel.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
    const user = await usermodel.create({ username: name, email, password });
    if (user) {
      res.status(201).json({"message": "User registered successfully", userId: user._id });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
});

// Login user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
    const user = await usermodel
        .findOne({ email, password })
        .select('-cartdata -createdAt -updatedAt -__v');
    if (user) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
      res.json({ token, user });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
});
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
};
