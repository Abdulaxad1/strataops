import { validate, nonEmptyBody } from './validate.js';

export const validateCreate = validate(
  (b) => Boolean(b.patientId && Array.isArray(b.items) && b.items.length > 0 && b.total !== undefined),
  "Bemor va xizmatlar ro'yxati kiritilishi lozim",
);

export const validateUpdate = nonEmptyBody;
