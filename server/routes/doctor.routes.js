import { Router } from 'express';
import { DoctorController as c } from '../controllers/doctor.controller.js';
import { validateCreate, validateUpdate } from '../validations/doctor.validation.js';

export const doctorRoutes = Router();

/**
 * @swagger
 * /doctors:
 *   get:
 *     tags: [Shifokorlar]
 *     summary: Shifokorlar ro'yxatini olish
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
 * /doctors:
 *   post:
 *     tags: [Shifokorlar]
 *     summary: Yangi shifokorlar yozuvi qo'shish
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"name": "Dr. Ziyoda Rahmonova", "specialty": "Kardiolog", "phone": "+998901112233", "room": "204"}
 *     responses:
 *       201: { description: Yaratildi }
 *       400: { description: "Validatsiya xatosi (majburiy maydon yo'q)" }
 */

/**
 * @swagger
 * /doctors/{id}:
 *   put:
 *     tags: [Shifokorlar]
 *     summary: Shifokorlar yozuvini tahrirlash
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
 * /doctors/{id}:
 *   delete:
 *     tags: [Shifokorlar]
 *     summary: Shifokorlar yozuvini o'chirish
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

doctorRoutes.get('/', c.list);
doctorRoutes.post('/', validateCreate, c.create);
doctorRoutes.put('/:id', validateUpdate, c.update);
doctorRoutes.delete('/:id', c.remove);
