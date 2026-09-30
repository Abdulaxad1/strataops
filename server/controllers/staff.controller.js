import { StaffModel } from '../models/staff.model.js';
import { handle, ok, created, notFound } from '../utils/http.js';

export const StaffController = {
  list: handle((_req, res) => {
    const data = StaffModel.findAll();
    ok(res, { data, total: data.length });
  }, "Ro'yxatni olishda xatolik"),

  getOne: handle((req, res) => {
    const data = StaffModel.findById(req.params.id);
    if (!data) return notFound(res, 'Xodim topilmadi');
    ok(res, { data });
  }),

  create: handle((req, res) => {
    const data = StaffModel.create(req.body);
    created(res, data, "Xodim qo'shildi");
  }, "Qo'shishda xatolik"),

  update: handle((req, res) => {
    const data = StaffModel.update(req.params.id, req.body);
    if (!data) return notFound(res, 'Xodim topilmadi');
    ok(res, { data, message: 'Xodim yangilandi' });
  }, 'Tahrirlashda xatolik'),

  remove: handle((req, res) => {
    if (!StaffModel.remove(req.params.id)) return notFound(res, 'Xodim topilmadi');
    ok(res, { message: "Xodim bo'shatildi" });
  }),
};
