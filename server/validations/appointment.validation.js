import { validate, nonEmptyBody } from './validate.js';

export const validateCreate = validate(
  (b) => Boolean(b.patientId && b.patientName && b.doctorId && b.doctorName && b.date && b.timeSlot),
  "Barcha qabul ma'lumotlarini kiriting",
);

export const validateUpdate = nonEmptyBody;
