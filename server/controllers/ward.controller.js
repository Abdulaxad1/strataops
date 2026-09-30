import { WardModel } from '../models/ward.model.js';
import { handle, ok, created, notFound, badRequest } from '../utils/http.js';

export const WardController = {
  list: handle((_req, res) => {
    const data = WardModel.findAll();
    ok(res, { data, total: data.length });
  }, "Ro'yxatni olishda xatolik"),

  create: handle((req, res) => {
    const data = WardModel.create(req.body);
    created(res, data, 'Yangi palata kiritildi');
  }, "Qo'shishda xatolik"),

  update: handle((req, res) => {
    const data = WardModel.update(req.params.id, req.body);
    if (!data) return notFound(res, 'Palata topilmadi');
    ok(res, { data, message: 'Palata yangilandi' });
  }, 'Tahrirlashda xatolik'),

  remove: handle((req, res) => {
    if (!WardModel.remove(req.params.id)) return notFound(res, 'Palata topilmadi');
    ok(res, { message: "Palata o'chirildi" });
  }),

  admit: handle(
    (req, res) => {
      const { patientId, patientName, attendingDoctor, diagnosis } = req.body;
      const ward = WardModel.admit(req.params.id, {
        patientId,
        patientName,
        attendingDoctor: attendingDoctor || 'Navbatchi shifokor',
        diagnosis: diagnosis || 'Statsionar davolanish',
      });
      if (!ward) return notFound(res, 'Palata topilmadi');
      ok(res, { data: ward, message: 'Bemor palataga yotqizildi' });
    },
    'Yotqizishda xatolik',
    400,
  ),

  discharge: handle(
    (req, res) => {
      const ward = WardModel.discharge(req.params.id, req.body.patientId);
      if (!ward) return notFound(res, 'Palata yoki bemor topilmadi');
      ok(res, { data: ward, message: 'Bemor statsionardan chiqarildi' });
    },
    'Chiqarishda xatolik',
    400,
  ),
};
