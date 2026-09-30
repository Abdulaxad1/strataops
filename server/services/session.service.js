import crypto from 'crypto';

const sessions = new Map(); // token -> { userId, expires }
const TTL = 12 * 60 * 60 * 1000; // 12 soat

export const startSession = (userId) => {
  const token = crypto.randomUUID();
  sessions.set(token, { userId, expires: Date.now() + TTL });
  return token;
};

export const getSession = (token) => {
  const s = sessions.get(token);
  if (!s || s.expires < Date.now()) {
    sessions.delete(token);
    return null;
  }
  return s;
};

export const endSession = (token) => sessions.delete(token);
