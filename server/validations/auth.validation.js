import { validate } from './validate.js';

export const validateLogin = validate((b) => Boolean(b.username && b.password), 'Login va parolni kiriting');

export const validateRegister = (req, res, next) => {
  const { fullName = '', username = '', password = '' } = req.body || {};
  const fail = (error) => res.status(400).json({ success: false, error });
  if (fullName.trim().length < 3) return fail("F.I.SH ni to'liq kiriting");
  if (!/^[a-z0-9_.]{3,}$/.test(username.trim().toLowerCase())) {
    return fail("Login kamida 3 ta lotin harf/raqam bo'lishi kerak");
  }
  if (password.length < 6) return fail("Parol kamida 6 belgi bo'lsin");
  next();
};
