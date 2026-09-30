import { validate, nonEmptyBody } from './validate.js';

export const validateCreate = validate(
  (b) => Boolean(b.patientId && b.testName && b.category),
  'Bemor, tahlil nomi va toifasi majburiy',
);

export const validateUpdate = nonEmptyBody;
