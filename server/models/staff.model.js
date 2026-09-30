import { clinicDB } from '../db.js';

/** Staff ma'lumotlar qatlami (bazaga murojaat faqat shu yerda) */
export const StaffModel = {
  findAll: () => clinicDB.getStaff(),
  findById: (id) => clinicDB.getStaffById(id),
  create: (data) => clinicDB.createStaff(data),
  update: (id, data) => clinicDB.updateStaff(id, data),
  remove: (id) => clinicDB.deleteStaff(id),
};
