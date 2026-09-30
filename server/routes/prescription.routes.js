import { Router } from 'express';
import { PrescriptionController as c } from '../controllers/prescription.controller.js';
import { validateCreate, validateUpdate } from '../validations/prescription.validation.js';

export const prescriptionRoutes = Router();

/**
 * @swagger
 * /prescriptions:
 *   get:
 *     tags: [Retseptlar]
 *     summary: Retseptlar ro'yxatini olish
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
 * /prescriptions:
 *   post:
 *     tags: [Retseptlar]
 *     summary: Yangi retseptlar yozuvi qo'shish
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"patientId": "PAT-1001", "doctorId": "DOC-1", "medications": [{"name": "Kardiomagnil", "dosage": "75mg"}]}
 *     responses:
 *       201: { description: Yaratildi }
 *       400: { description: "Validatsiya xatosi (majburiy maydon yo'q)" }
 */

/**
 * @swagger
 * /prescriptions/{id}:
 *   put:
 *     tags: [Retseptlar]
 *     summary: Retseptlar yozuvini tahrirlash
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
 * /prescriptions/{id}:
 *   delete:
 *     tags: [Retseptlar]
 *     summary: Retseptlar yozuvini o'chirish
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

prescriptionRoutes.get('/', c.list);
prescriptionRoutes.post('/', validateCreate, c.create);
prescriptionRoutes.put('/:id', validateUpdate, c.update);
prescriptionRoutes.delete('/:id', c.remove);
