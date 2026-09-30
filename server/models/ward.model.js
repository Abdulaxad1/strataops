import { clinicDB } from '../db.js';

/** Ward ma'lumotlar qatlami (bazaga murojaat faqat shu yerda) */
export const WardModel = {
  findAll: () => clinicDB.getWards(),
  create: (data) => clinicDB.createWard(data),
  update: (id, data) => clinicDB.updateWard(id, data),
  remove: (id) => clinicDB.deleteWard(id),
  admit: (id, patient) => clinicDB.admitPatientToWard(id, patient),
  discharge: (id, patientId) => clinicDB.dischargePatientFromWard(id, patientId),
};
