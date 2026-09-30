import { InventoryModel } from '../models/inventory.model.js';
import { handle, ok, created, notFound } from '../utils/http.js';

export const InventoryController = {
  list: handle((_req, res) => {
    const data = InventoryModel.findAll();
    ok(res, { data, total: data.length });
  }, "Ro'yxatni olishda xatolik"),

  create: handle((req, res) => {
    const data = InventoryModel.create(req.body);
    created(res, data, "Preparat omborga qo'shildi");
  }, "Qo'shishda xatolik"),

  update: handle((req, res) => {
    const data = InventoryModel.update(req.params.id, req.body);
    if (!data) return notFound(res, 'Preparat topilmadi');
    ok(res, { data, message: "Ombor ma'lumoti yangilandi" });
  }, 'Tahrirlashda xatolik'),

  remove: handle((req, res) => {
    if (!InventoryModel.remove(req.params.id)) return notFound(res, 'Preparat topilmadi');
    ok(res, { message: "Preparat o'chirildi" });
  }),
};
