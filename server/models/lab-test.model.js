import { clinicDB } from '../db.js';

/** LabTest ma'lumotlar qatlami (bazaga murojaat faqat shu yerda) */
export const LabTestModel = {
  findAll: () => clinicDB.getLabTests(),
  create: (data) => clinicDB.createLabTest(data),
  update: (id, data) => clinicDB.updateLabTest(id, data),
  remove: (id) => clinicDB.deleteLabTest(id),
};
