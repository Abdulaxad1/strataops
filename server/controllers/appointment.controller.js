import { AppointmentModel } from '../models/appointment.model.js';
import { handle, ok, created, notFound } from '../utils/http.js';

export const AppointmentController = {
  list: handle((_req, res) => {
    const data = AppointmentModel.findAll();
    ok(res, { data, total: data.length });
  }, "Ro'yxatni olishda xatolik"),

  create: handle((req, res) => {
    const data = AppointmentModel.create(req.body);
    created(res, data, 'Qabulga yozildi');
  }, "Qo'shishda xatolik"),

  update: handle((req, res) => {
    const data = AppointmentModel.update(req.params.id, req.body);
    if (!data) return notFound(res, 'Qabul topilmadi');
    ok(res, { data, message: 'Qabul yangilandi' });
  }, 'Tahrirlashda xatolik'),

  remove: handle((req, res) => {
    if (!AppointmentModel.remove(req.params.id)) return notFound(res, 'Qabul topilmadi');
    ok(res, { message: 'Qabul bekor qilindi' });
  }),
};
