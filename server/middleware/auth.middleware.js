import { UserModel } from '../models/user.model.js';
import { getSession } from '../services/session.service.js';

const deny = (res, status, error) => res.status(status).json({ success: false, error });

// 1) Tizimga kirganligini tekshiradi
export function requireAuth(req, res, next) {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  const session = getSession(token);
  const user = session && UserModel.findById(session.userId);
  if (!user) return deny(res, 401, 'Tizimga kiring');
  req.user = user;
  req.token = token;
  next();
}

// 2) Bemorlar klinika bo'limlariga kira olmaydi (faqat o'z portali)
export const requireStaff = (req, res, next) =>
  req.user.role === 'patient' ? deny(res, 403, "Sizda bu bo'limga ruxsat yo'q") : next();

// 3) Faqat administrator
export const requireAdmin = (req, res, next) =>
  req.user.role === 'admin' ? next() : deny(res, 403, 'Faqat administrator uchun');
