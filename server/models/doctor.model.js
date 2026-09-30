import { clinicDB } from '../db.js';

/** Doctor ma'lumotlar qatlami (bazaga murojaat faqat shu yerda) */
export const DoctorModel = {
  findAll: () => clinicDB.getDoctors(),
  findById: (id) => clinicDB.getDoctorById(id),
  create: (data) => clinicDB.createDoctor(data),
  update: (id, data) => clinicDB.updateDoctor(id, data),
  remove: (id) => clinicDB.deleteDoctor(id),
};
