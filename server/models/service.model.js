import { clinicDB } from '../db.js';

/** Service ma'lumotlar qatlami (bazaga murojaat faqat shu yerda) */
export const ServiceModel = {
  findAll: () => clinicDB.getServices(),
  create: (data) => clinicDB.createService(data),
  update: (id, data) => clinicDB.updateService(id, data),
  remove: (id) => clinicDB.deleteService(id),
};
