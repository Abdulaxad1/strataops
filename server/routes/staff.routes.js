import { Router } from 'express';
import { StaffController as c } from '../controllers/staff.controller.js';
import { validateCreate, validateUpdate } from '../validations/staff.validation.js';

export const staffRoutes = Router();

/**
 * @swagger
 * /staff:
 *   get:
 *     tags: [Xodimlar (HR)]
 *     summary: Xodimlar (HR) ro'yxatini olish
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
 * /staff/{id}:
 *   get:
 *     tags: [Xodimlar (HR)]
 *     summary: Bitta xodim yozuvini ID bo'yicha olish
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

/**
 * @swagger
 * /staff:
 *   post:
 *     tags: [Xodimlar (HR)]
 *     summary: Yangi xodimlar (hr) yozuvi qo'shish
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"fullName": "Dilnoza Yusupova", "position": "Hamshira", "department": "Statsionar", "salary": 5500000}
 *     responses:
 *       201: { description: Yaratildi }
 *       400: { description: "Validatsiya xatosi (majburiy maydon yo'q)" }
 */

/**
 * @swagger
 * /staff/{id}:
 *   put:
 *     tags: [Xodimlar (HR)]
 *     summary: Xodimlar (HR) yozuvini tahrirlash
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
 * /staff/{id}:
 *   delete:
 *     tags: [Xodimlar (HR)]
 *     summary: Xodimlar (HR) yozuvini o'chirish
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

staffRoutes.get('/', c.list);
staffRoutes.get('/:id', c.getOne);
staffRoutes.post('/', validateCreate, c.create);
staffRoutes.put('/:id', validateUpdate, c.update);
staffRoutes.delete('/:id', c.remove);
