import { clinicDB } from '../db.js';

/** Inventory ma'lumotlar qatlami (bazaga murojaat faqat shu yerda) */
export const InventoryModel = {
  findAll: () => clinicDB.getInventory(),
  create: (data) => clinicDB.createInventoryItem(data),
  update: (id, data) => clinicDB.updateInventoryItem(id, data),
  remove: (id) => clinicDB.deleteInventoryItem(id),
};
