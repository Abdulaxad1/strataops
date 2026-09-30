import { clinicDB } from '../db.js';

/** Patient ma'lumotlar qatlami (bazaga murojaat faqat shu yerda) */
export const PatientModel = {
  findAll: () => clinicDB.getPatients(),
  findById: (id) => clinicDB.getPatientById(id),
  create: (data) => clinicDB.createPatient(data),
  update: (id, data) => clinicDB.updatePatient(id, data),
  remove: (id) => clinicDB.deletePatient(id),
};
