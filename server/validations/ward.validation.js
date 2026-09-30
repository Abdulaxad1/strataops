import { validate, nonEmptyBody } from './validate.js';

export const validateCreate = validate(
  (b) => Boolean(b.roomNumber && b.totalBeds && b.dailyRate),
  "Palata raqami, o'rinlar soni va sutkalik narxini kiriting",
);

export const validateUpdate = nonEmptyBody;

export const validateAdmit = validate((b) => Boolean(b.patientId && b.patientName), 'Bemor tanlanishi zarur');
export const validateDischarge = validate((b) => Boolean(b.patientId), 'Bemor IDsi kerak');
