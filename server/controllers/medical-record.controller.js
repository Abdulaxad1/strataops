import { MedicalRecordModel } from '../models/medical-record.model.js';
import { handle, ok, created, notFound } from '../utils/http.js';

export const MedicalRecordController = {
  list: handle((_req, res) => {
    const data = MedicalRecordModel.findAll();
    ok(res, { data, total: data.length });
  }, "Ro'yxatni olishda xatolik"),

  create: handle((req, res) => {
    const data = MedicalRecordModel.create(req.body);
    created(res, data, 'Tibbiy karta yozuvi saqlandi');
  }, "Qo'shishda xatolik"),

  update: handle((req, res) => {
    const data = MedicalRecordModel.update(req.params.id, req.body);
    if (!data) return notFound(res, 'Tibbiy karta topilmadi');
    ok(res, { data, message: 'Tibbiy karta yangilandi' });
  }, 'Tahrirlashda xatolik'),

  remove: handle((req, res) => {
    if (!MedicalRecordModel.remove(req.params.id)) return notFound(res, 'Tibbiy karta topilmadi');
    ok(res, { message: "Tibbiy yozuv o'chirildi" });
  }),
};
