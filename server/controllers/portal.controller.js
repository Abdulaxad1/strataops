import { PatientModel } from '../models/patient.model.js';
import { AppointmentModel } from '../models/appointment.model.js';
import { PrescriptionModel } from '../models/prescription.model.js';
import { LabTestModel } from '../models/lab-test.model.js';
import { InvoiceModel } from '../models/invoice.model.js';
import { ok } from '../utils/http.js';

// Bemor portali: faqat o'ziga tegishli ma'lumotlar
export const PortalController = {
  get(req, res) {
    const id = req.user.patientId;
    const mine = (list) => list.filter((x) => x.patientId === id);
    ok(res, {
      data: {
        patient: PatientModel.findById(id),
        appointments: mine(AppointmentModel.findAll()),
        prescriptions: mine(PrescriptionModel.findAll()),
        labTests: mine(LabTestModel.findAll()),
        invoices: mine(InvoiceModel.findAll()),
      },
    });
  },
};
