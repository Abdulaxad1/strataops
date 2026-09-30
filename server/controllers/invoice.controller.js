import { InvoiceModel } from '../models/invoice.model.js';
import { handle, ok, created, notFound } from '../utils/http.js';

export const InvoiceController = {
  list: handle((_req, res) => {
    const data = InvoiceModel.findAll();
    ok(res, { data, total: data.length });
  }, "Ro'yxatni olishda xatolik"),

  create: handle((req, res) => {
    const data = InvoiceModel.create(req.body);
    created(res, data, "To'lov hujjati shakllantirildi");
  }, "Qo'shishda xatolik"),

  update: handle((req, res) => {
    const data = InvoiceModel.update(req.params.id, req.body);
    if (!data) return notFound(res, 'Hisob-faktura topilmadi');
    ok(res, { data, message: "To'lov yangilandi" });
  }, 'Tahrirlashda xatolik'),

  remove: handle((req, res) => {
    if (!InvoiceModel.remove(req.params.id)) return notFound(res, 'Hisob-faktura topilmadi');
    ok(res, { message: "To'lov hujjati o'chirildi" });
  }),
};
