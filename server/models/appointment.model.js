import { clinicDB } from '../db.js';

/** Appointment ma'lumotlar qatlami (bazaga murojaat faqat shu yerda) */
export const AppointmentModel = {
  findAll: () => clinicDB.getAppointments(),
  create: (data) => clinicDB.createAppointment(data),
  update: (id, data) => clinicDB.updateAppointment(id, data),
  remove: (id) => clinicDB.deleteAppointment(id),
};
