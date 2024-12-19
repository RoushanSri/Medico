import jwt from 'jsonwebtoken';
import { apiError } from '../utils/apiError.js';
import { User } from '../models/User.js';

export const auth = (req, res, next) => {
  try {
    const token =
   req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new apiError(403, "Invalid token")
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = User.findOne(decoded?.userId).select("-password")

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};