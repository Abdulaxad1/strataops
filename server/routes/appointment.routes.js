import { Router } from 'express';
import { AppointmentController as c } from '../controllers/appointment.controller.js';
import { validateCreate, validateUpdate } from '../validations/appointment.validation.js';

export const appointmentRoutes = Router();

/**
 * @swagger
 * /appointments:
 *   get:
 *     tags: [Qabullar]
 *     summary: Qabullar ro'yxatini olish
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
 * /appointments:
 *   post:
 *     tags: [Qabullar]
 *     summary: Yangi qabullar yozuvi qo'shish
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"patientId": "PAT-1001", "patientName": "Alisher Karimov", "doctorId": "DOC-1", "doctorName": "Dr. Ziyoda Rahmonova", "date": "2026-10-01", "timeSlot": "10:00"}
 *     responses:
 *       201: { description: Yaratildi }
 *       400: { description: "Validatsiya xatosi (majburiy maydon yo'q)" }
 */

/**
 * @swagger
 * /appointments/{id}:
 *   put:
 *     tags: [Qabullar]
 *     summary: Qabullar yozuvini tahrirlash
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
 * /appointments/{id}:
 *   delete:
 *     tags: [Qabullar]
 *     summary: Qabullar yozuvini o'chirish
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

appointmentRoutes.get('/', c.list);
appointmentRoutes.post('/', validateCreate, c.create);
appointmentRoutes.put('/:id', validateUpdate, c.update);
appointmentRoutes.delete('/:id', c.remove);
