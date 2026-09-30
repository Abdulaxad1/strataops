import { LabTestModel } from '../models/lab-test.model.js';
import { handle, ok, created, notFound } from '../utils/http.js';

export const LabTestController = {
  list: handle((_req, res) => {
    const data = LabTestModel.findAll();
    ok(res, { data, total: data.length });
  }, "Ro'yxatni olishda xatolik"),

  create: handle((req, res) => {
    const data = LabTestModel.create(req.body);
    created(res, data, 'Tahlil buyurtmasi qabul qilindi');
  }, "Qo'shishda xatolik"),

  update: handle((req, res) => {
    const data = LabTestModel.update(req.params.id, req.body);
    if (!data) return notFound(res, 'Tahlil topilmadi');
    ok(res, { data, message: "Tahlil ma'lumotlari yangilandi" });
  }, 'Tahrirlashda xatolik'),

  remove: handle((req, res) => {
    if (!LabTestModel.remove(req.params.id)) return notFound(res, 'Tahlil topilmadi');
    ok(res, { message: "Tahlil o'chirildi" });
  }),
};
