import { Router } from 'express';
import { AuthController as c } from '../controllers/auth.controller.js';
import { validateLogin, validateRegister } from '../validations/auth.validation.js';
import { requireAuth } from '../middleware/auth.middleware.js';

export const authRoutes = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Autentifikatsiya]
 *     summary: Tizimga kirish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: { "username": "admin", "password": "admin123" }
 *     responses:
 *       200:
 *         description: token va foydalanuvchi ma'lumoti qaytadi
 *       400: { description: "Login va parol kiritilishi shart" }
 *       401: { description: "Login yoki parol noto'g'ri" }
 */
authRoutes.post('/login', validateLogin, c.login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Autentifikatsiya]
 *     summary: Yangi bemor sifatida ro'yxatdan o'tish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: { "fullName": "Test Bemorov", "phone": "+998901112233", "username": "testpatient", "password": "parol123" }
 *     responses:
 *       201: { description: Yaratildi }
 *       400: { description: "Validatsiya xatosi" }
 *       409: { description: "Bu login band" }
 */
authRoutes.post('/register', validateRegister, c.register);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     tags: [Autentifikatsiya]
 *     summary: Joriy foydalanuvchi ma'lumotini olish
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Muvaffaqiyatli }
 *       401: { description: "Tizimga kirilmagan" }
 */
authRoutes.get('/me', requireAuth, c.me);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags: [Autentifikatsiya]
 *     summary: Tizimdan chiqish
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Muvaffaqiyatli }
 *       401: { description: "Tizimga kirilmagan" }
 */
authRoutes.post('/logout', requireAuth, c.logout);
