import { validate, nonEmptyBody } from './validate.js';

export const validateCreate = validate(
  (b) => Boolean(b.fullName && b.phone && b.birthDate && b.gender && b.bloodGroup),
  "Barcha majburiy maydonlarni to'ldiring (F.I.SH, telefon, tug'ilgan sana, jinsi, qon guruhi)",
);

export const validateUpdate = nonEmptyBody;
