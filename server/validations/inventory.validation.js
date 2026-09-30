import { validate, nonEmptyBody } from './validate.js';

export const validateCreate = validate(
  (b) => Boolean(b.name && b.category && b.stockQuantity !== undefined && b.unitCost && b.salePrice),
  "Preparat nomi, toifasi, soni va narxlari to'liq kiritilsin",
);

export const validateUpdate = nonEmptyBody;
