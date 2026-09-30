import { validate, nonEmptyBody } from './validate.js';

export const validateCreate = validate(
  (b) => Boolean(b.fullName && b.position && b.department && b.salary !== undefined),
  "Xodim ismi, lavozimi, bo'limi va oyligi kiritilsin",
);

export const validateUpdate = nonEmptyBody;
