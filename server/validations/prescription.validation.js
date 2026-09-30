import { validate, nonEmptyBody } from './validate.js';

export const validateCreate = validate(
  (b) => Boolean(b.patientId && b.doctorId && Array.isArray(b.medications) && b.medications.length > 0),
  "Bemor, shifokor va kamida bitta dori ko'rsatilishi zarur",
);

export const validateUpdate = nonEmptyBody;
