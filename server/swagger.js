/**
 * ShifoMed ERP - OpenAPI (Swagger) konfiguratsiyasi
 *
 * Bu fayl endi endpointlar haqida hech narsa bilmaydi - u faqat umumiy
 * sarlavha (info) va xavfsizlik sxemasini (bearerAuth) belgilaydi.
 * Har bir endpointning hujjati aynan o'sha endpoint yozilgan joyda -
 * routes/*.routes.js fayllaridagi "@swagger" izohlarida yashaydi.
 * swagger-jsdoc o'sha fayllarni skanerlab, spetsifikatsiyani yig'adi.
 */
import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ShifoMed ERP API',
      version: '1.0.0',
      description:
        "Xususiy klinika boshqaruv tizimi uchun REST API. Avval /auth/login orqali token oling, so'ng yuqori o'ngdagi \"Authorize\" tugmasi bilan tokenni kiriting (faqat token qiymatini yozing, \"Bearer\" so'zisiz).",
    },
    servers: [{ url: '/api', description: 'Joriy server' }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', description: "Login qilingandan so'ng olingan token" },
      },
    },
  },
  // Har bir route faylidagi @swagger izohlari shu yerdan skanerlanadi
  apis: ['./server/routes/*.routes.js', './server/routes/index.js'],
});
