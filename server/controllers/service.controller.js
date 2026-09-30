import { ServiceModel } from '../models/service.model.js';
import { handle, ok, created, notFound } from '../utils/http.js';

export const ServiceController = {
  list: handle((_req, res) => {
    const data = ServiceModel.findAll();
    ok(res, { data, total: data.length });
  }, "Ro'yxatni olishda xatolik"),

  create: handle((req, res) => {
    const data = ServiceModel.create(req.body);
    created(res, data, 'Yangi xizmat kiritildi');
  }, "Qo'shishda xatolik"),

  update: handle((req, res) => {
    const data = ServiceModel.update(req.params.id, req.body);
    if (!data) return notFound(res, 'Xizmat topilmadi');
    ok(res, { data, message: 'Xizmat narxi yangilandi' });
  }, 'Tahrirlashda xatolik'),

  remove: handle((req, res) => {
    if (!ServiceModel.remove(req.params.id)) return notFound(res, 'Xizmat topilmadi');
    ok(res, { message: "Xizmat o'chirildi" });
  }),
};
