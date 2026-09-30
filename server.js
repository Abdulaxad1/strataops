import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { serve as swaggerServe, setup as swaggerSetup } from 'swagger-ui-express';
import { swaggerSpec } from './server/swagger.js';
import { apiRouter } from './server/routes/index.js';
import { clinicDB } from './server/db.js';
import { UserModel } from './server/models/user.model.js';
import {
  registerStateProvider,
  loadSnapshot,
  scheduleSave,
  saveNow,
  isPersistenceEnabled,
} from './server/persistence.js';
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

registerStateProvider(() => ({
  patients: clinicDB.patients,
  doctors: clinicDB.doctors,
  appointments: clinicDB.appointments,
  records: clinicDB.records,
  prescriptions: clinicDB.prescriptions,
  labTests: clinicDB.labTests,
  invoices: clinicDB.invoices,
  wards: clinicDB.wards,
  inventory: clinicDB.inventory,
  services: clinicDB.services,
  staff: clinicDB.staff,
  logs: clinicDB.logs,
  users: UserModel.snapshot(),
}));

async function bootstrapPersistence() {
  if (!isPersistenceEnabled()) {
    console.log(
      "\u2139\uFE0F  DATABASE_URL yo'q \u2014 ma'lumotlar faqat xotirada saqlanadi (server qayta tushsa, o'chib ketadi).",
    );
    return;
  }
  const { status, data } = await loadSnapshot();
  if (status === 'loaded') {
    clinicDB.restore(data);
    UserModel.restore(data.users);
    console.log("\u2705 Ma'lumotlar Postgres'dan muvaffaqiyatli tiklandi.");
  } else if (status === 'empty') {
    const saved = await saveNow();
    console.log(
      saved
        ? "\u2705 Postgres'ga ulandi. Boshlang'ich namunaviy ma'lumotlar saqlandi."
        : "\u274C Postgres'ga yozib bo'lmadi \u2014 ma'lumotlar saqlanmaydi!",
    );
  } else {
    console.error(
      "\u274C Postgres'ga ulanib bo'lmadi. DATABASE_URL to'g'riligini tekshiring. " +
        "Mavjud ma'lumotlarni himoya qilish uchun saqlash O'CHIRILDI (server faqat xotirada ishlaydi).",
    );
  }
}

async function startServer() {
  await bootstrapPersistence();
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  // JSON request body parser
  app.use(express.json());
  // Request logger for API calls
  app.use('/api', (req, _res, next) => {
    const timestamp = new Date().toISOString().substring(11, 19);
    console.log(`[API ${timestamp}] ${req.method} ${req.originalUrl}`);
    next();
  });
  // Mount API router
  // API hujjatlari (Swagger UI) - /api-docs
  app.use('/api-docs', swaggerServe, swaggerSetup(swaggerSpec, { customSiteTitle: 'ShifoMed ERP API' }));

  app.use('/api', apiRouter);
  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() });
  });
  // Vite middleware in dev or static files in production
  const isProduction = process.env.NODE_ENV === 'production';
  if (isProduction) {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }
  app.listen(PORT, '0.0.0.0', () => {
    console.log(
      `🚀 StrataOps Server running on http://0.0.0.0:${PORT} (${isProduction ? 'production' : 'development'})`,
    );
  });
}
startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
