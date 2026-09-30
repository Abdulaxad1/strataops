import React, { useState } from 'react';
import {
  HeartPulse,
  Users,
  CalendarCheck,
  Stethoscope,
  Receipt,
  Pill,
  Search,
  Check,
  DollarSign
} from 'lucide-react';

export default function ShifoMedSingleFileApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  const [patients, setPatients] = useState([
    { id: 'PAT-1001', fullName: 'Alisher Rustamovich Karimov', phone: '+998 90 123-45-67', bloodGroup: 'A+', address: 'Toshkent sh., Yunusobod', status: 'active' },
    { id: 'PAT-1002', fullName: 'Nilufar Baxtiyorovna Saidova', phone: '+998 93 555-12-34', bloodGroup: 'O+', address: 'Toshkent sh., Qorasuv', status: 'inpatient' },
    { id: 'PAT-1003', fullName: 'Jasur Shavkatovich Mirzayev', phone: '+998 97 780-33-22', bloodGroup: 'B+', address: 'Toshkent vil., Zangiota', status: 'active' }
  ]);

  const [doctors, setDoctors] = useState([
    { id: 'DOC-201', name: 'Dr. Jahongir Qodirov', specialty: 'Umumiy jarroh', room: 'Xona 305', fee: 200000, phone: '+998 90 911-22-33' },
    { id: 'DOC-202', name: 'Dr. Ziyoda Rahmonova', specialty: 'Kardiolog', room: 'Xona 204', fee: 180000, phone: '+998 93 322-44-55' },
    { id: 'DOC-203', name: 'Dr. Botir Yo\'ldoshev', specialty: 'Nevropatolog', room: 'Xona 210', fee: 170000, phone: '+998 97 101-20-30' }
  ]);

  const [appointments, setAppointments] = useState([
    { id: 'APP-301', queueNumber: 1, patientName: 'Alisher Karimov', doctorName: 'Dr. Ziyoda Rahmonova', time: '09:30', room: 'Xona 204', status: 'in_progress' },
    { id: 'APP-302', queueNumber: 2, patientName: 'Jasur Mirzayev', doctorName: 'Dr. Ziyoda Rahmonova', time: '10:15', room: 'Xona 204', status: 'pending' }
  ]);

  const [invoices, setInvoices] = useState([
    { id: 'INV-901', receiptNumber: 'CHK-0901', patientName: 'Alisher Karimov', total: 280000, method: 'Uzcard', status: 'paid', date: '2026-09-24' },
    { id: 'INV-902', receiptNumber: 'CHK-0902', patientName: 'Jasur Mirzayev', total: 290000, method: 'Payme', status: 'paid', date: '2026-09-24' }
  ]);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans flex flex-col antialiased">
      <header className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <HeartPulse className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-white">ShifoMed ERP</h1>
            <p className="text-xs text-slate-400">Tibbiyot Markazi Boshqaruv Tizimi (Standalone JSX)</p>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row">
        <aside className="w-full md:w-64 p-4 bg-slate-900/60 border-r border-slate-800 space-y-1">
          {[
            { id: 'dashboard', label: 'Boshqaruv Paneli', icon: HeartPulse },
            { id: 'patients', label: 'Bemorlar Bazasi', icon: Users, count: patients.length },
            { id: 'appointments', label: 'Qabullar & Navbat', icon: CalendarCheck, count: appointments.length },
            { id: 'doctors', label: 'Shifokorlar', icon: Stethoscope, count: doctors.length },
            { id: 'billing', label: 'Kassa & Moliya', icon: Receipt }
          ].map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                  active ? 'bg-teal-600/30 text-teal-300 border border-teal-500/40' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-300">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">Bugungi Klinika Holati</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-400">Jami Bemorlar</div>
                  <div className="text-3xl font-bold text-teal-400 mt-2">{patients.length}</div>
                </div>
                <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-400">Bugungi Qabullar</div>
                  <div className="text-3xl font-bold text-emerald-400 mt-2">{appointments.length}</div>
                </div>
                <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-400">Bugungi Kassa Tushumi</div>
                  <div className="text-3xl font-bold text-white mt-2">570,000 so'm</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'patients' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Bemorlar Bazasi</h2>
              <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 p-3">
                    <tr>
                      <th className="p-3">F.I.SH</th>
                      <th className="p-3">Telefon</th>
                      <th className="p-3">Qon guruhi</th>
                      <th className="p-3">Manzil</th>
                      <th className="p-3">Holati</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {patients.map(p => (
                      <tr key={p.id}>
                        <td className="p-3 font-semibold text-white">{p.fullName}</td>
                        <td className="p-3">{p.phone}</td>
                        <td className="p-3 font-bold text-rose-400">{p.bloodGroup}</td>
                        <td className="p-3 text-slate-400">{p.address}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 text-[11px] font-semibold">
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Kassa & Cheklar</h2>
              <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 p-3">
                    <tr>
                      <th className="p-3">Chek №</th>
                      <th className="p-3">Bemor</th>
                      <th className="p-3">Summa</th>
                      <th className="p-3">To'lov turi</th>
                      <th className="p-3">Holati</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {invoices.map(inv => (
                      <tr key={inv.id}>
                        <td className="p-3 font-mono text-teal-400">{inv.receiptNumber}</td>
                        <td className="p-3 text-white font-medium">{inv.patientName}</td>
                        <td className="p-3 font-bold text-emerald-400">{inv.total.toLocaleString()} so'm</td>
                        <td className="p-3">{inv.method}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold">
                            {inv.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
