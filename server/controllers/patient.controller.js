import { PatientModel } from '../models/patient.model.js';
import { handle, ok, created, notFound } from '../utils/http.js';

export const PatientController = {
  list: handle((_req, res) => {
    const data = PatientModel.findAll();
    ok(res, { data, total: data.length });
  }, "Bemorlar ro'yxatini olishda xatolik yuz berdi"),

  getOne: handle((req, res) => {
    const data = PatientModel.findById(req.params.id);
    if (!data) return notFound(res, 'Bemor topilmadi');
    ok(res, { data });
  }),

  create: handle((req, res) => {
    const data = PatientModel.create(req.body);
    created(res, data, "Bemor muvaffaqiyatli ro'yxatga olindi");
  }, "Bemor qo'shishda xatolik"),

  update: handle((req, res) => {
    const data = PatientModel.update(req.params.id, req.body);
    if (!data) return notFound(res, 'Bemor topilmadi');
    ok(res, { data, message: "Bemor ma'lumotlari yangilandi" });
  }, 'Tahrirlashda xatolik'),

  remove: handle((req, res) => {
    if (!PatientModel.remove(req.params.id)) return notFound(res, 'Bemor topilmadi');
    ok(res, { message: "Bemor muvaffaqiyatli o'chirildi" });
  }),
};
