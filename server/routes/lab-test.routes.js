import { Router } from 'express';
import { LabTestController as c } from '../controllers/lab-test.controller.js';
import { validateCreate, validateUpdate } from '../validations/lab-test.validation.js';

export const labTestRoutes = Router();

/**
 * @swagger
 * /lab-tests:
 *   get:
 *     tags: [Tahlillar]
 *     summary: Tahlillar ro'yxatini olish
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
 * /lab-tests:
 *   post:
 *     tags: [Tahlillar]
 *     summary: Yangi tahlillar yozuvi qo'shish
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"patientId": "PAT-1001", "testName": "Umumiy qon tahlili", "category": "Qon tahlili"}
 *     responses:
 *       201: { description: Yaratildi }
 *       400: { description: "Validatsiya xatosi (majburiy maydon yo'q)" }
 */

/**
 * @swagger
 * /lab-tests/{id}:
 *   put:
 *     tags: [Tahlillar]
 *     summary: Tahlillar yozuvini tahrirlash
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
 * /lab-tests/{id}:
 *   delete:
 *     tags: [Tahlillar]
 *     summary: Tahlillar yozuvini o'chirish
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

labTestRoutes.get('/', c.list);
labTestRoutes.post('/', validateCreate, c.create);
labTestRoutes.put('/:id', validateUpdate, c.update);
labTestRoutes.delete('/:id', c.remove);
