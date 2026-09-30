import { clinicDB } from '../db.js';

/** MedicalRecord ma'lumotlar qatlami (bazaga murojaat faqat shu yerda) */
export const MedicalRecordModel = {
  findAll: () => clinicDB.getMedicalRecords(),
  create: (data) => clinicDB.createMedicalRecord(data),
  update: (id, data) => clinicDB.updateMedicalRecord(id, data),
  remove: (id) => clinicDB.deleteMedicalRecord(id),
};
