import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    console.log('Stored password hash:', user.password);
    console.log('Password received at login:', password);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    const token = jwt.sign({ id: user._id, email: user.email, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user: { id: user._id, email: user.email, username: user.username } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const signup = async (req: Request, res: Response) => {
  console.log('📥 Signup request received');

  const { username, email, password } = req.body;

  console.log('Received data:', { username, email, password });

  if (!email || !password) {
    console.log('❌ Missing email or password');
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('⚠️ User already exists');
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    if (!token) {
      console.error('❌ Token generation failed');
      return res.status(500).json({ error: 'Token generation failed' });
    }

    console.log('✅ User successfully created:', user.email);
    return res.status(201).json({
      message: 'User created successfully',
      token,
      user: { id: user._id, email: user.email, username: user.username }
    });
  } catch (error) {
    console.error('🔥 Signup error:', error);
    return res.status(500).json({ error: 'Signup failed' });
  }
};
