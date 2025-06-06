// controllers/loginController.js
import User from '../models/User.js';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT secret not configured' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
export const signup = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User exists' });
    const user = new User({ email, password, username });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error("Signup Error:", err); // <-- ADICIONE ISSO
    res.status(500).json({ message: 'Error creating user' });
  }
};