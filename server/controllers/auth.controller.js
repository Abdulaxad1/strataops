import { UserModel } from '../models/user.model.js';
import { PatientModel } from '../models/patient.model.js';
import { startSession, endSession } from '../services/session.service.js';
import { ok } from '../utils/http.js';

const sessionPayload = (user) => ({ token: startSession(user.id), user: UserModel.toPublic(user) });

export const AuthController = {
  login(req, res) {
    const { username = '', password = '' } = req.body;
    const user = UserModel.findByUsername(username.trim().toLowerCase());
    if (!user || !UserModel.verifyPassword(user, password)) {
      return res.status(401).json({ success: false, error: "Login yoki parol noto'g'ri" });
    }
    ok(res, { data: sessionPayload(user) });
  },

  // Ro'yxatdan o'tish faqat bemorlar uchun; xodim akkauntlarini administrator yaratadi
  register(req, res) {
    const { fullName, phone = '', username, password } = req.body;
    const login = username.trim().toLowerCase();
    if (UserModel.exists(login)) {
      return res.status(409).json({ success: false, error: 'Bu login band, boshqasini tanlang' });
    }
    const patient = PatientModel.create({
      fullName: fullName.trim(),
      phone: phone.trim(),
      birthDate: '',
      gender: 'Erkak',
      passport: '',
      bloodGroup: 'A+',
      address: '',
      status: 'active',
    });
    const user = UserModel.create({
      username: login,
      password,
      fullName: fullName.trim(),
      role: 'patient',
      patientId: patient.id,
    });
    res.status(201).json({ success: true, data: sessionPayload(user) });
  },

  me: (req, res) => ok(res, { data: UserModel.toPublic(req.user) }),

  logout(req, res) {
    endSession(req.token);
    ok(res, { data: true });
  },
};
