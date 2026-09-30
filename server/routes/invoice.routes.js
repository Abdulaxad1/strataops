import { Router } from 'express';
import { InvoiceController as c } from '../controllers/invoice.controller.js';
import { validateCreate, validateUpdate } from '../validations/invoice.validation.js';

export const invoiceRoutes = Router();

/**
 * @swagger
 * /invoices:
 *   get:
 *     tags: [Kassa]
 *     summary: Kassa ro'yxatini olish
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
 * /invoices:
 *   post:
 *     tags: [Kassa]
 *     summary: Yangi kassa yozuvi qo'shish
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"patientId": "PAT-1001", "items": [{"name": "Kardiolog qabuli", "price": 150000}], "total": 150000}
 *     responses:
 *       201: { description: Yaratildi }
 *       400: { description: "Validatsiya xatosi (majburiy maydon yo'q)" }
 */

/**
 * @swagger
 * /invoices/{id}:
 *   put:
 *     tags: [Kassa]
 *     summary: Kassa yozuvini tahrirlash
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
 * /invoices/{id}:
 *   delete:
 *     tags: [Kassa]
 *     summary: Kassa yozuvini o'chirish
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

invoiceRoutes.get('/', c.list);
invoiceRoutes.post('/', validateCreate, c.create);
invoiceRoutes.put('/:id', validateUpdate, c.update);
invoiceRoutes.delete('/:id', c.remove);
