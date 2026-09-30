import { Router } from 'express';
import { MedicalRecordController as c } from '../controllers/medical-record.controller.js';
import { validateCreate, validateUpdate } from '../validations/medical-record.validation.js';

export const medicalRecordRoutes = Router();

/**
 * @swagger
 * /records:
 *   get:
 *     tags: [Tibbiy kartalar]
 *     summary: Tibbiy kartalar ro'yxatini olish
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
 * /records:
 *   post:
 *     tags: [Tibbiy kartalar]
 *     summary: Yangi tibbiy kartalar yozuvi qo'shish
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"patientId": "PAT-1001", "doctorId": "DOC-1", "diagnosis": "Arterial gipertoniya II daraja"}
 *     responses:
 *       201: { description: Yaratildi }
 *       400: { description: "Validatsiya xatosi (majburiy maydon yo'q)" }
 */

/**
 * @swagger
 * /records/{id}:
 *   put:
 *     tags: [Tibbiy kartalar]
 *     summary: Tibbiy kartalar yozuvini tahrirlash
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
 * /records/{id}:
 *   delete:
 *     tags: [Tibbiy kartalar]
 *     summary: Tibbiy kartalar yozuvini o'chirish
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

medicalRecordRoutes.get('/', c.list);
medicalRecordRoutes.post('/', validateCreate, c.create);
medicalRecordRoutes.put('/:id', validateUpdate, c.update);
medicalRecordRoutes.delete('/:id', c.remove);
