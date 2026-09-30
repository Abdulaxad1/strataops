import { clinicDB } from '../db.js';

export const SystemModel = {
  getStats: () => clinicDB.getClinicStats(),
  getLogs: () => clinicDB.getLogs(),
  resetToSample: () => clinicDB.resetToSampleData(),
};
