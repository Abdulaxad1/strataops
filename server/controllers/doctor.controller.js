import { DoctorModel } from '../models/doctor.model.js';
import { handle, ok, created, notFound } from '../utils/http.js';

export const DoctorController = {
  list: handle((_req, res) => {
    const data = DoctorModel.findAll();
    ok(res, { data, total: data.length });
  }, "Ro'yxatni olishda xatolik"),

  create: handle((req, res) => {
    const data = DoctorModel.create(req.body);
    created(res, data, "Shifokor qo'shildi");
  }, "Qo'shishda xatolik"),

  update: handle((req, res) => {
    const data = DoctorModel.update(req.params.id, req.body);
    if (!data) return notFound(res, 'Shifokor topilmadi');
    ok(res, { data, message: 'Shifokor yangilandi' });
  }, 'Tahrirlashda xatolik'),

  remove: handle((req, res) => {
    if (!DoctorModel.remove(req.params.id)) return notFound(res, 'Shifokor topilmadi');
    ok(res, { message: "Shifokor o'chirildi" });
  }),
};
