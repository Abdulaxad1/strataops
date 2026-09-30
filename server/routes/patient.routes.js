import { Router } from 'express';
import { PatientController as c } from '../controllers/patient.controller.js';
import { validateCreate, validateUpdate } from '../validations/patient.validation.js';

export const patientRoutes = Router();

/**
 * @swagger
 * /patients:
 *   get:
 *     tags: [Bemorlar]
 *     summary: Bemorlar ro'yxatini olish
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
 * /patients/{id}:
 *   get:
 *     tags: [Bemorlar]
 *     summary: Bitta bemor yozuvini ID bo'yicha olish
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
 * /patients:
 *   post:
 *     tags: [Bemorlar]
 *     summary: Yangi bemorlar yozuvi qo'shish
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"fullName": "Alisher Karimov", "phone": "+998901234567", "birthDate": "1990-05-12", "gender": "Erkak", "bloodGroup": "A+"}
 *     responses:
 *       201: { description: Yaratildi }
 *       400: { description: "Validatsiya xatosi (majburiy maydon yo'q)" }
 */

/**
 * @swagger
 * /patients/{id}:
 *   put:
 *     tags: [Bemorlar]
 *     summary: Bemorlar yozuvini tahrirlash
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
 * /patients/{id}:
 *   delete:
 *     tags: [Bemorlar]
 *     summary: Bemorlar yozuvini o'chirish
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

patientRoutes.get('/', c.list);
patientRoutes.get('/:id', c.getOne);
patientRoutes.post('/', validateCreate, c.create);
patientRoutes.put('/:id', validateUpdate, c.update);
patientRoutes.delete('/:id', c.remove);
