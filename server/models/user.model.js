import crypto from 'crypto';
import { scheduleSave } from '../persistence.js';

const hash = (password, salt) => crypto.scryptSync(password, salt, 32).toString('hex');

const makeUser = ({ password, ...rest }) => {
  const salt = crypto.randomBytes(16).toString('hex');
  return { ...rest, salt, passwordHash: hash(password, salt) };
};

// Boshlang'ich akkauntlar (ishlab chiqarishda parollarni o'zgartiring!)
const users = [
  makeUser({ id: 'USR-1', username: 'admin', password: 'admin123', fullName: 'Tizim administratori', role: 'admin' }),
  makeUser({
    id: 'USR-2',
    username: 'shifokor',
    password: 'shifokor123',
    fullName: 'Dr. Ziyoda Rahmonova',
    role: 'staff',
  }),
  makeUser({
    id: 'USR-3',
    username: 'bemor',
    password: 'bemor123',
    fullName: 'Alisher Rustamovich Karimov',
    role: 'patient',
    patientId: 'PAT-1001',
  }),
];

export const UserModel = {
  findByUsername: (username) => users.find((u) => u.username === username),
  findById: (id) => users.find((u) => u.id === id),
  exists: (username) => users.some((u) => u.username === username),

  create(data) {
    const user = makeUser({ id: `USR-${users.length + 1}`, ...data });
    users.push(user);
    scheduleSave();
    return user;
  },

  verifyPassword(user, password) {
    const a = Buffer.from(hash(password, user.salt), 'hex');
    const b = Buffer.from(user.passwordHash, 'hex');
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  },

  toPublic: (u) => ({ id: u.id, username: u.username, fullName: u.fullName, role: u.role, patientId: u.patientId }),

  // Postgres bilan saqlash uchun
  snapshot: () => users,
  restore(saved) {
    if (!Array.isArray(saved) || !saved.length) return;
    users.length = 0;
    users.push(...saved);
  },
};
