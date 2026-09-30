import React, { useEffect, useState } from 'react';
import { HeartPulse, LogOut, CalendarClock, FileSignature, FlaskConical, Receipt } from 'lucide-react';
import { authApi } from '../services/api.js';
import { useAuth } from './AuthContext.jsx';

const Section = ({ icon: Icon, title, empty, children, count }) => (
  <section className="p-5 rounded-2xl bg-[#0a0f1d] border border-slate-800">
    <h2 className="flex items-center gap-2 font-semibold text-slate-100 mb-3"><Icon className="w-4 h-4 text-teal-400" />{title}<span className="text-xs text-slate-500">({count})</span></h2>
    {count ? <div className="divide-y divide-slate-800/80">{children}</div> : <p className="text-sm text-slate-500">{empty}</p>}
  </section>
);
const Row = ({ main, sub, right }) => (
  <div className="py-2.5 flex items-start justify-between gap-3 text-sm">
    <div><div className="text-slate-200">{main}</div><div className="text-xs text-slate-500">{sub}</div></div>
    <div className="text-xs text-slate-300 text-right whitespace-nowrap">{right}</div>
  </div>
);

export const PatientPortal = () => {
  const { user, logout } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => { authApi.portal().then(setData).catch((e) => setError(e.message)); }, []);

  const p = data?.patient;
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100">
      <header className="flex items-center justify-between px-4 lg:px-8 py-3 border-b border-slate-800 bg-[#0a0f1d]">
        <div className="flex items-center gap-2.5"><HeartPulse className="w-6 h-6 text-teal-400" /><span className="font-bold">ShifoMed</span><span className="text-xs text-slate-400 hidden sm:inline">Bemor kabineti</span></div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-slate-300">{user.fullName}</span>
          <button onClick={logout} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 cursor-pointer"><LogOut className="w-4 h-4" />Chiqish</button>
        </div>
      </header>
      <main className="max-w-3xl mx-auto p-4 lg:p-8 space-y-4">
        {error && <div className="text-rose-300">{error}</div>}
        {!data && !error && <div className="text-slate-400">Yuklanmoqda...</div>}
        {data && (
          <>
            {p && (
              <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-950/60 to-[#0a0f1d] border border-teal-500/20">
                <div className="text-lg font-semibold">{p.fullName}</div>
                <div className="text-sm text-slate-400 mt-1">Karta: {p.id} · Tel: {p.phone || '—'} · Qon guruhi: {p.bloodGroup}</div>
              </div>
            )}
            <Section icon={CalendarClock} title="Qabullarim" count={data.appointments.length} empty="Hozircha qabul yo'q.">
              {data.appointments.map((a) => <Row key={a.id} main={`${a.doctorName} — ${a.department}`} sub={`${a.date} · ${a.timeSlot} · ${a.room}`} right={a.status} />)}
            </Section>
            <Section icon={FileSignature} title="Retseptlarim" count={data.prescriptions.length} empty="Retsept yo'q.">
              {data.prescriptions.map((r) => <Row key={r.id} main={r.diagnosis} sub={r.medications.map((m) => m.medicineName).join(', ')} right={r.issueDate} />)}
            </Section>
            <Section icon={FlaskConical} title="Tahlillarim" count={data.labTests.length} empty="Tahlil yo'q.">
              {data.labTests.map((t) => <Row key={t.id} main={t.testName} sub={t.category} right={t.status} />)}
            </Section>
            <Section icon={Receipt} title="To'lovlarim" count={data.invoices.length} empty="To'lov yo'q.">
              {data.invoices.map((i) => <Row key={i.id} main={`Chek ${i.receiptNumber}`} sub={i.date} right={`${i.total.toLocaleString()} so'm`} />)}
            </Section>
          </>
        )}
      </main>
    </div>
  );
};
