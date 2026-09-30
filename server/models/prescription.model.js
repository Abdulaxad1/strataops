import { clinicDB } from '../db.js';

/** Prescription ma'lumotlar qatlami (bazaga murojaat faqat shu yerda) */
export const PrescriptionModel = {
  findAll: () => clinicDB.getPrescriptions(),
  create: (data) => clinicDB.createPrescription(data),
  update: (id, data) => clinicDB.updatePrescription(id, data),
  remove: (id) => clinicDB.deletePrescription(id),
};
