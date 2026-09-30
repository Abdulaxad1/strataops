import { validate, nonEmptyBody } from './validate.js';

export const validateCreate = validate(
  (b) => Boolean(b.name && b.category && b.price !== undefined),
  'Xizmat nomi, toifasi va narxi kiritilsin',
);

export const validateUpdate = nonEmptyBody;
