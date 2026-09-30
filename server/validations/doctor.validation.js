import { validate, nonEmptyBody } from './validate.js';

export const validateCreate = validate(
  (b) => Boolean(b.name && b.specialty && b.phone && b.room),
  'Shifokor ismi, mutaxassisligi, telefoni va xonasi kiritilishi shart',
);

export const validateUpdate = nonEmptyBody;
