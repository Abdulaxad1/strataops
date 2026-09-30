import { clinicDB } from '../db.js';

/** Invoice ma'lumotlar qatlami (bazaga murojaat faqat shu yerda) */
export const InvoiceModel = {
  findAll: () => clinicDB.getInvoices(),
  create: (data) => clinicDB.createInvoice(data),
  update: (id, data) => clinicDB.updateInvoice(id, data),
  remove: (id) => clinicDB.deleteInvoice(id),
};
