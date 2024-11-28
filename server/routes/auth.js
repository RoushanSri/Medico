import express from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import User from '../models/User.js';

const router = express.Router();

const loginSchema = z.object({
  userId: z.string(),
  password: z.string(),
});

router.post('/login', async (req, res) => {
  try {
    const { userId, password } = loginSchema.parse(req.body);
    
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.userId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        userId: user.userId,
        name: user.name,
        role: user.role,
        email: user.email
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;