import { PrescriptionModel } from '../models/prescription.model.js';
import { handle, ok, created, notFound } from '../utils/http.js';

export const PrescriptionController = {
  list: handle((_req, res) => {
    const data = PrescriptionModel.findAll();
    ok(res, { data, total: data.length });
  }, "Ro'yxatni olishda xatolik"),

  create: handle((req, res) => {
    const data = PrescriptionModel.create(req.body);
    created(res, data, 'Elektron retsept shakllantirildi');
  }, "Qo'shishda xatolik"),

  update: handle((req, res) => {
    const data = PrescriptionModel.update(req.params.id, req.body);
    if (!data) return notFound(res, 'Retsept topilmadi');
    ok(res, { data, message: 'Retsept yangilandi' });
  }, 'Tahrirlashda xatolik'),

  remove: handle((req, res) => {
    if (!PrescriptionModel.remove(req.params.id)) return notFound(res, 'Retsept topilmadi');
    ok(res, { message: "Retsept o'chirildi" });
  }),
};
