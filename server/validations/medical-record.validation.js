import { validate, nonEmptyBody } from './validate.js';

export const validateCreate = validate(
  (b) => Boolean(b.patientId && b.doctorId && b.diagnosis),
  'Bemor, shifokor va tashxis kiritilishi shart',
);

export const validateUpdate = nonEmptyBody;
