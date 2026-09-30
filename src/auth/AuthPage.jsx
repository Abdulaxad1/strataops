import React, { useState } from 'react';
import { HeartPulse, LogIn, UserPlus, ArrowLeft } from 'lucide-react';
import { useAuth } from './AuthContext.jsx';

const inputCls = 'w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-teal-500';

export const AuthPage = ({ initialMode = 'login', onBack }) => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState({ fullName: '', phone: '', username: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      if (mode === 'login') await login({ username: form.username, password: form.password });
      else await register(form);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 mb-4 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Bosh sahifaga qaytish
          </button>
        )}
        <div className="flex items-center gap-3 justify-center mb-6">
          <div className="p-3 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400"><HeartPulse className="w-7 h-7" /></div>
          <div>
            <div className="text-2xl font-bold text-slate-100">ShifoMed ERP</div>
            <div className="text-xs text-slate-400">Xususiy klinika boshqaruv tizimi</div>
          </div>
        </div>

        <form onSubmit={submit} className="p-6 rounded-2xl bg-[#0a0f1d] border border-slate-800 space-y-3.5">
          <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-900">
            {[['login', 'Kirish', LogIn], ['register', "Ro'yxatdan o'tish", UserPlus]].map(([id, label, Icon]) => (
              <button key={id} type="button" onClick={() => { setMode(id); setError(''); }}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${mode === id ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}>
                <Icon className="w-4 h-4" />{label}
              </button>
            ))}
          </div>

          {mode === 'register' && (
            <>
              <input className={inputCls} placeholder="F.I.SH (to'liq ism)" value={form.fullName} onChange={set('fullName')} required />
              <input className={inputCls} placeholder="Telefon: +998 90 123-45-67" value={form.phone} onChange={set('phone')} />
            </>
          )}
          <input className={inputCls} placeholder="Login" autoComplete="username" value={form.username} onChange={set('username')} required />
          <input className={inputCls} type="password" placeholder="Parol" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} value={form.password} onChange={set('password')} required />

          {error && <div className="text-sm text-rose-300 bg-rose-500/10 border border-rose-500/30 rounded-xl px-3 py-2">{error}</div>}

          <button disabled={busy} className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold text-sm cursor-pointer disabled:opacity-60">
            {busy ? 'Kuting...' : mode === 'login' ? 'Kirish' : "Bemor sifatida ro'yxatdan o'tish"}
          </button>
          {mode === 'register' && <p className="text-xs text-slate-500">Ro'yxatdan o'tish faqat bemorlar uchun. Xodim akkauntini administrator beradi.</p>}
        </form>
      </div>
    </div>
  );
};
