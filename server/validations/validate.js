/**
 * Validatsiya middleware yaratuvchi yordamchi.
 * check(body) -> true bo'lsa davom etadi, aks holda 400 qaytaradi.
 */
export const validate = (check, message) => (req, res, next) =>
  check(req.body || {}) ? next() : res.status(400).json({ success: false, error: message });

export const nonEmptyBody = validate(
  (b) => Object.keys(b).length > 0,
  'Yangilash uchun kamida bitta maydon yuborilishi kerak',
);
