/**
 * Yagona javob formati: { success, data?, message?, error? }
 */
export const ok = (res, body = {}) => res.json({ success: true, ...body });
export const created = (res, data, message) => res.status(201).json({ success: true, data, message });
export const badRequest = (res, error) => res.status(400).json({ success: false, error });
export const notFound = (res, error) => res.status(404).json({ success: false, error });

// Controller ichidagi kutilmagan xatolarni ushlaydi
export const handle =
  (fn, fallback = 'Server xatosi', status = 500) =>
  (req, res, next) => {
    try {
      return fn(req, res, next);
    } catch (error) {
      res.status(status).json({ success: false, error: error.message || fallback });
    }
  };
