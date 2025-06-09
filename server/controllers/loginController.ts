import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email or password invalids' });
    }
    console.log('Senha salva no banco:', user.password);
    console.log('Senha enviada no login:', password);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email or password invalids' });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user: { id: user._id, email: user.email, username: user.username } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const signup = async (req: Request, res: Response) => {
  console.log('📥 Requisição recebida para signup');

  const { username, email, password } = req.body;

  console.log('Dados recebidos:', { username, email, password });

  if (!email || !password) {
    console.log('❌ Email ou senha ausentes');
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('⚠️ Usuário já existe');
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    console.log('✅ Usuário criado com sucesso:', user.email);
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('🔥 Erro no signup:', error);
    return res.status(500).json({ error: 'Signup failed' });
  }
};

