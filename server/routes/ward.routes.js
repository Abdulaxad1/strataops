import { Router } from 'express';
import { WardController as c } from '../controllers/ward.controller.js';
import { validateCreate, validateUpdate, validateAdmit, validateDischarge } from '../validations/ward.validation.js';

export const wardRoutes = Router();

/**
 * @swagger
 * /wards:
 *   get:
 *     tags: [Palatalar]
 *     summary: Palatalar ro'yxatini olish
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
 * /wards:
 *   post:
 *     tags: [Palatalar]
 *     summary: Yangi palatalar yozuvi qo'shish
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"roomNumber": "305", "totalBeds": 2, "dailyRate": 250000}
 *     responses:
 *       201: { description: Yaratildi }
 *       400: { description: "Validatsiya xatosi (majburiy maydon yo'q)" }
 */

/**
 * @swagger
 * /wards/{id}:
 *   put:
 *     tags: [Palatalar]
 *     summary: Palatalar yozuvini tahrirlash
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
 * /wards/{id}/admit:
 *   post:
 *     tags: [Palatalar]
 *     summary: Bemorni palataga yotqizish
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
 *           example: { "patientId": "PAT-1001", "patientName": "Alisher Karimov" }
 *     responses:
 *       200: { description: Muvaffaqiyatli }
 *       400: { description: "Validatsiya xatosi" }
 *       404: { description: Topilmadi }
 */

/**
 * @swagger
 * /wards/{id}/discharge:
 *   post:
 *     tags: [Palatalar]
 *     summary: Bemorni statsionardan chiqarish
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
 *           example: { "patientId": "PAT-1001" }
 *     responses:
 *       200: { description: Muvaffaqiyatli }
 *       400: { description: "Validatsiya xatosi" }
 *       404: { description: Topilmadi }
 */

/**
 * @swagger
 * /wards/{id}:
 *   delete:
 *     tags: [Palatalar]
 *     summary: Palatalar yozuvini o'chirish
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

wardRoutes.get('/', c.list);
wardRoutes.post('/', validateCreate, c.create);
wardRoutes.put('/:id', validateUpdate, c.update);
wardRoutes.post('/:id/admit', validateAdmit, c.admit);
wardRoutes.post('/:id/discharge', validateDischarge, c.discharge);
wardRoutes.delete('/:id', c.remove);
