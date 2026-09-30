import { Router } from 'express';
import { ServiceController as c } from '../controllers/service.controller.js';
import { validateCreate, validateUpdate } from '../validations/service.validation.js';

export const serviceRoutes = Router();

/**
 * @swagger
 * /services:
 *   get:
 *     tags: [Xizmatlar]
 *     summary: Xizmatlar ro'yxatini olish
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli
 *       401:
 *         description: Tizimga kirilmagan
 */

/**
 * @swagger
 * /services:
 *   post:
 *     tags: [Xizmatlar]
 *     summary: Yangi xizmatlar yozuvi qo'shish
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"name": "Umumiy qon tahlili", "category": "Laboratoriya", "price": 45000}
 *     responses:
 *       201: { description: Yaratildi }
 *       400: { description: "Validatsiya xatosi (majburiy maydon yo'q)" }
 */

/**
 * @swagger
 * /services/{id}:
 *   put:
 *     tags: [Xizmatlar]
 *     summary: Xizmatlar yozuvini tahrirlash
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: { "notes": "yangilanadigan maydon(lar)" }
 *     responses:
 *       200: { description: Muvaffaqiyatli }
 *       400: { description: "Validatsiya xatosi" }
 *       404: { description: Topilmadi }
 */

/**
 * @swagger
 * /services/{id}:
 *   delete:
 *     tags: [Xizmatlar]
 *     summary: Xizmatlar yozuvini o'chirish
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Muvaffaqiyatli }
 *       404: { description: Topilmadi }
 */

serviceRoutes.get('/', c.list);
serviceRoutes.post('/', validateCreate, c.create);
serviceRoutes.put('/:id', validateUpdate, c.update);
serviceRoutes.delete('/:id', c.remove);
