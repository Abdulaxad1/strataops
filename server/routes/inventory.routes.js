import { Router } from 'express';
import { InventoryController as c } from '../controllers/inventory.controller.js';
import { validateCreate, validateUpdate } from '../validations/inventory.validation.js';

export const inventoryRoutes = Router();

/**
 * @swagger
 * /inventory:
 *   get:
 *     tags: [Ombor]
 *     summary: Ombor ro'yxatini olish
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
 * /inventory:
 *   post:
 *     tags: [Ombor]
 *     summary: Yangi ombor yozuvi qo'shish
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"name": "Paratsetamol 500mg", "category": "Ogriqsizlantiruvchi", "stockQuantity": 200, "unitCost": 800, "salePrice": 1500}
 *     responses:
 *       201: { description: Yaratildi }
 *       400: { description: "Validatsiya xatosi (majburiy maydon yo'q)" }
 */

/**
 * @swagger
 * /inventory/{id}:
 *   put:
 *     tags: [Ombor]
 *     summary: Ombor yozuvini tahrirlash
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
 * /inventory/{id}:
 *   delete:
 *     tags: [Ombor]
 *     summary: Ombor yozuvini o'chirish
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

inventoryRoutes.get('/', c.list);
inventoryRoutes.post('/', validateCreate, c.create);
inventoryRoutes.put('/:id', validateUpdate, c.update);
inventoryRoutes.delete('/:id', c.remove);
