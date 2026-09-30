/**
 * ShifoMed ERP - API marshrutlari (barcha /api/* shu yerdan ulanadi)
 *
 * Tuzilma:  route -> validation -> controller -> model -> db
 */
import { Router } from 'express';
import { requireAuth, requireStaff, requireAdmin } from '../middleware/auth.middleware.js';
import { PortalController } from '../controllers/portal.controller.js';

import { authRoutes } from './auth.routes.js';
import { patientRoutes } from './patient.routes.js';
import { doctorRoutes } from './doctor.routes.js';
import { appointmentRoutes } from './appointment.routes.js';
import { medicalRecordRoutes } from './medical-record.routes.js';
import { prescriptionRoutes } from './prescription.routes.js';
import { labTestRoutes } from './lab-test.routes.js';
import { invoiceRoutes } from './invoice.routes.js';
import { wardRoutes } from './ward.routes.js';
import { inventoryRoutes } from './inventory.routes.js';
import { serviceRoutes } from './service.routes.js';
import { staffRoutes } from './staff.routes.js';
import { systemRoutes } from './system.routes.js';

export const apiRouter = Router();

// Ochiq: kirish / ro'yxatdan o'tish
apiRouter.use('/auth', authRoutes);

// Quyidagilar tizimga kirishni talab qiladi
apiRouter.use(requireAuth);

/**
 * @swagger
 * /portal:
 *   get:
 *     tags: [Bemor kabineti]
 *     summary: Bemorning o'z ma'lumotlari (qabul, retsept, tahlil, to'lov)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Muvaffaqiyatli }
 *       401: { description: "Tizimga kirilmagan" }
 */
apiRouter.get('/portal', PortalController.get); // bemor kabineti

// Quyidagilar faqat xodim va administrator uchun (bemor kira olmaydi)
apiRouter.use(requireStaff);
apiRouter.use('/patients', patientRoutes);
apiRouter.use('/doctors', doctorRoutes);
apiRouter.use('/appointments', appointmentRoutes);
apiRouter.use('/records', medicalRecordRoutes);
apiRouter.use('/prescriptions', prescriptionRoutes);
apiRouter.use('/lab-tests', labTestRoutes);
apiRouter.use('/invoices', invoiceRoutes);
apiRouter.use('/wards', wardRoutes);
apiRouter.use('/inventory', inventoryRoutes);
apiRouter.use('/services', serviceRoutes);
apiRouter.use('/staff', requireAdmin, staffRoutes); // xodimlar/oyliklar - faqat admin
apiRouter.use(systemRoutes); // /stats, /logs, /seed
