import { Router } from 'express';
import { SystemController as c } from '../controllers/system.controller.js';
import { requireAdmin } from '../middleware/auth.middleware.js';

export const systemRoutes = Router();

/**
 * @swagger
 * /stats:
 *   get:
 *     tags: [Tizim]
 *     summary: Klinika bo'yicha umumiy statistika
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Muvaffaqiyatli }
 */
systemRoutes.get('/stats', c.stats);

/**
 * @swagger
 * /logs:
 *   get:
 *     tags: [Tizim]
 *     summary: Amaliyot jurnali (audit)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Muvaffaqiyatli }
 */
systemRoutes.get('/logs', c.logs);

/**
 * @swagger
 * /seed:
 *   post:
 *     tags: [Tizim]
 *     summary: Bazani namunaviy holatga qaytarish (faqat admin)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Muvaffaqiyatli }
 *       403: { description: "Faqat administrator uchun" }
 */
systemRoutes.post('/seed', requireAdmin, c.seed); // bazani tiklash - faqat admin
