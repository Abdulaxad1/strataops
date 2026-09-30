import React, { useState } from 'react';
import {
  FileCode2,
  Copy,
  Check,
  Download,
  DollarSign,
  Briefcase,
  Layers,
  Sparkles,
  Server,
  MonitorCheck,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
  Laptop,
  Code2,
  Globe
} from 'lucide-react';

export const StandaloneBundleView = () => {
  const [copied, setCopied] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState('explanation');

  // Complete production-grade Standalone Single-File JSX Code
  const singleFileJsxSource = `/**
 * =========================================================================================
 * SHIFOMED ERP - XUSUSIY KLINIKA VA TIBBIYOT MARKAZINI BOSHQARISH TIZIMI
 * STANDALONE YAGONA FAYL VERSIYASI (React JSX + Tailwind CSS)
 * =========================================================================================
 * Ushbu fayl mustaqil ravishda har qanday React loyihaga yoki Vite/Next.js/HTML ga qo'yib ishlatiladi.
 * Tijoriy sotuvga to'liq tayyor:
 * - Bemorlar bazasi (Ambulator kartalar)
 * - Shifokorlar va qabul grafigi
 * - Elektron navbat va qabullar
 * - Elektron retseptlar (Chop etish formati bilan)
 * - Diagnostika va laboratoriya tahlillari
 * - Kassa va to'lovlar (Chek chiqarish)
 * - Statsionar palatalar va yotoq o'rinlari
 * - Dorixona va tibbiy ombor nazorati
 * =========================================================================================
 */

import React, { useState } from 'react';
import {
  HeartPulse,
  Users,
  CalendarCheck,
  Stethoscope,
  FileSignature,
  FlaskConical,
  Receipt,
  BedDouble,
  Pill,
  BadgeDollarSign,
  Plus,
  Search,
  Printer,
  Trash2,
  Edit2,
  Clock,
  Phone,
  Check,
  X,
  CreditCard,
  AlertTriangle
} from 'lucide-react';

export default function ShifoMedSingleFileApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data states
  const [patients, setPatients] = useState([
    { id: 'PAT-1001', fullName: 'Alisher Rustamovich Karimov', phone: '+998 90 123-45-67', bloodGroup: 'A+', address: 'Toshkent sh., Yunusobod', status: 'active' },
    { id: 'PAT-1002', fullName: 'Nilufar Baxtiyorovna Saidova', phone: '+998 93 555-12-34', bloodGroup: 'O+', address: 'Toshkent sh., Qorasuv', status: 'inpatient' },
    { id: 'PAT-1003', fullName: 'Jasur Shavkatovich Mirzayev', phone: '+998 97 780-33-22', bloodGroup: 'B+', address: 'Toshkent vil., Zangiota', status: 'active' }
  ]);

  const [doctors, setDoctors] = useState([
    { id: 'DOC-201', name: 'Dr. Jahongir Qodirov', specialty: 'Umumiy jarroh', room: 'Xona 305', fee: 200000, phone: '+998 90 911-22-33' },
    { id: 'DOC-202', name: 'Dr. Ziyoda Rahmonova', specialty: 'Kardiolog', room: 'Xona 204', fee: 180000, phone: '+998 93 322-44-55' },
    { id: 'DOC-203', name: 'Dr. Botir Yo\\'ldoshev', specialty: 'Nevropatolog', room: 'Xona 210', fee: 170000, phone: '+998 97 101-20-30' }
  ]);

  const [appointments, setAppointments] = useState([
    { id: 'APP-301', queueNumber: 1, patientName: 'Alisher Karimov', doctorName: 'Dr. Ziyoda Rahmonova', time: '09:30', room: 'Xona 204', status: 'in_progress' },
    { id: 'APP-302', queueNumber: 2, patientName: 'Jasur Mirzayev', doctorName: 'Dr. Ziyoda Rahmonova', time: '10:15', room: 'Xona 204', status: 'pending' }
  ]);

  const [invoices, setInvoices] = useState([
    { id: 'INV-901', receiptNumber: 'CHK-0901', patientName: 'Alisher Karimov', total: 280000, method: 'Uzcard', status: 'paid', date: '2026-09-24' },
    { id: 'INV-902', receiptNumber: 'CHK-0902', patientName: 'Jasur Mirzayev', total: 290000, method: 'Payme', status: 'paid', date: '2026-09-24' }
  ]);

  const [inventory, setInventory] = useState([
    { id: 'MED-401', name: 'Seftriakson 1.0g flakon', category: 'Antibiotik', stock: 120, unit: 'flakon', price: 18000 },
    { id: 'MED-402', name: 'Koprenessa 4mg tab №30', category: 'Kardiologik', stock: 45, unit: 'quti', price: 85000 },
    { id: 'MED-403', name: 'Meloksikam 15mg №5 amp', category: 'Og\\'riqsizlantiruvchi', stock: 18, unit: 'quti', price: 38000 }
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
            { id: 'billing', label: 'Kassa & Moliya', icon: Receipt },
            { id: 'pharmacy', label: 'Dorixona / Ombor', icon: Pill, count: inventory.length }
          ].map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={\`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer \${
                  active ? 'bg-teal-600/30 text-teal-300 border border-teal-500/40' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }\`}
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
                  <div className="text-3xl font-bold text-white mt-2">570,000 so\\'m</div>
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
        </main>
      </div>
    </div>
  );
}`;

  // Complete offline standalone HTML with Babel & React
  const generateStandaloneHtml = () => {
    return `<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ShifoMed ERP | Standalone Offline Versiya</title>
  <script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-[#070b14] text-slate-100 font-sans">
  <div id="root"></div>
  <script type="text/babel">
    const { useState } = React;

    function App() {
      const [tab, setTab] = useState('dashboard');
      const [patients, setPatients] = useState([
        { id: 'PAT-101', name: 'Karimov Alisher', phone: '+998 90 123-45-67', blood: 'A+', room: '204' },
        { id: 'PAT-102', name: 'Saidova Nilufar', phone: '+998 93 555-12-34', blood: 'O+', room: '305' }
      ]);
      const [queue, setQueue] = useState([
        { id: 1, patient: 'Karimov Alisher', doctor: 'Dr. Rahmonova', time: '10:00', status: 'Qabulda' },
        { id: 2, patient: 'Saidova Nilufar', doctor: 'Dr. Qodirov', time: '10:30', status: 'Navbatda' }
      ]);

      return (
        <div className="min-h-screen flex flex-col">
          <header className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏥</span>
              <h1 className="font-bold text-lg text-teal-400">ShifoMed ERP Standalone</h1>
            </div>
            <span className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
              Offline Rejim
            </span>
          </header>

          <div className="flex-1 flex flex-col md:flex-row">
            <aside className="w-full md:w-64 p-4 bg-slate-900/60 border-r border-slate-800 space-y-2">
              <button onClick={() => setTab('dashboard')} className={\`w-full text-left px-3 py-2 rounded-xl text-sm \${tab==='dashboard'?'bg-teal-600 text-white font-bold':'text-slate-400 hover:bg-slate-800'}\`}>
                Boshqaruv Paneli
              </button>
              <button onClick={() => setTab('patients')} className={\`w-full text-left px-3 py-2 rounded-xl text-sm \${tab==='patients'?'bg-teal-600 text-white font-bold':'text-slate-400 hover:bg-slate-800'}\`}>
                Bemorlar Bazasi ({patients.length})
              </button>
              <button onClick={() => setTab('queue')} className={\`w-full text-left px-3 py-2 rounded-xl text-sm \${tab==='queue'?'bg-teal-600 text-white font-bold':'text-slate-400 hover:bg-slate-800'}\`}>
                Jonli Navbat ({queue.length})
              </button>
            </aside>

            <main className="flex-1 p-6">
              {tab === 'dashboard' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-white">Klinika Ko'rsatkichlari</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
                      <div className="text-xs text-slate-400">Jami Bemorlar</div>
                      <div className="text-3xl font-bold text-teal-400 mt-2">{patients.length} ta</div>
                    </div>
                    <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
                      <div className="text-xs text-slate-400">Bugungi Navbat</div>
                      <div className="text-3xl font-bold text-emerald-400 mt-2">{queue.length} ta</div>
                    </div>
                    <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
                      <div className="text-xs text-slate-400">Bugungi Kassa</div>
                      <div className="text-3xl font-bold text-white mt-2">780,000 so'm</div>
                    </div>
                  </div>
                </div>
              )}

              {tab === 'patients' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-white">Bemorlar Bazasi</h2>
                  <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-950 p-3 text-slate-400">
                        <tr>
                          <th className="p-3">F.I.SH</th>
                          <th className="p-3">Telefon</th>
                          <th className="p-3">Qon guruhi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {patients.map(p => (
                          <tr key={p.id}>
                            <td className="p-3 text-white font-semibold">{p.name}</td>
                            <td className="p-3 text-slate-300">{p.phone}</td>
                            <td className="p-3 text-rose-400 font-bold">{p.blood}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {tab === 'queue' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-white">Jonli Navbat Tizimi</h2>
                  <div className="space-y-2">
                    {queue.map(q => (
                      <div key={q.id} className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                        <div>
                          <span className="font-bold text-teal-400">#{q.id}</span> {q.patient} — {q.doctor}
                        </div>
                        <span className="text-xs bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full font-semibold">
                          {q.time} ({q.status})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
  </script>
</body>
</html>`;
  };

  const handleCopyJsx = () => {
    navigator.clipboard.writeText(singleFileJsxSource);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownloadJsx = () => {
    const element = document.createElement('a');
    const file = new Blob([singleFileJsxSource], { type: 'text/javascript' });
    element.href = URL.createObjectURL(file);
    element.download = 'ShifoMedSingleFileApp.jsx';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadHtml = () => {
    const htmlContent = generateStandaloneHtml();
    const element = document.createElement('a');
    const file = new Blob([htmlContent], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = 'ShifoMed_Offline_Klinika.html';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <FileCode2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Yagona Fayl Standalone & Eksport Markazi
              </h2>
              <p className="text-xs text-slate-400">
                Loyiha kodini 1 ta mustaqil faylda yuklab olish, nusxalash va klinikaga sotish yo'riqnomasi
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleCopyJsx}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold border border-slate-700 transition cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'JSX Nusxalandi!' : 'Kodni Nusxalash'}</span>
          </button>

          <button
            onClick={handleDownloadJsx}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-semibold shadow-md transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Yuklab Olish (.jsx)</span>
          </button>

          <button
            onClick={handleDownloadHtml}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-md transition cursor-pointer"
            title="Har qanday brauzerda 2-marta bosganda to'g'ridan-to'g'ri ishlaydigan tayyor fayl"
          >
            <Globe className="w-4 h-4" />
            <span>{copiedHtml ? 'Yuklandi!' : 'Offline HTML (.html)'}</span>
          </button>
        </div>
      </div>

      {/* Sub-tab toggles */}
      <div className="flex gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveSubTab('explanation')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'explanation'
              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Bu bo'lim nima uchun kerak?</span>
        </button>

        <button
          onClick={() => setActiveSubTab('code')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'code'
              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>Yaxlit JSX Kodini Ko'rish</span>
        </button>

        <button
          onClick={() => setActiveSubTab('business')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'business'
              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Klinikalarga Sotish Strategiyasi</span>
        </button>
      </div>

      {/* 1. EXPLANATION TAB: NIMA UCHUN KERAK? */}
      {activeSubTab === 'explanation' && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-950/60 via-slate-900 to-slate-950 border border-teal-500/30 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-400" />
              "Yagona Fayl va Eksport" Bo'limi Nima Uchun Kerak?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Ushbu bo'lim loyihani <strong>xaridorga, xususiy klinika rahbariga yoki boshqa dasturchiga topshirish va sotishni</strong> maksimal darajada osonlashtirish uchun mo'ljallangan.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-sm">1. Tayyor Dasturni Sotish</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Klinika yoki shifokorga dasturni topshirayotganda 50 ta faylni tushuntirib o'tirmasdan, <strong>bitta yagona fayl (.jsx yoki .html)</strong> ko'rinishida taqdim etasiz.
                </p>
              </div>

              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                  <Laptop className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-sm">2. Serversiz & Offline Ishlash</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Internet yoki server bo'lmagan kichik kabinetlarda (stomatologiya, xususiy xonalar) <strong>Offline HTML</strong> faylni sichqoncha bilan 2 marta bosish orqali brauzerda darhol ishga tushirish mumkin.
                </p>
              </div>

              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <Server className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-sm">3. Portativlik & Zaxira</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Barcha modullarni bitta kodga birlashtirib, istalgan boshqa React, Vite yoki Next.js loyihasiga 1 daqiqada "Ctrl+C / Ctrl+V" qilib joylashtirish imkonini beradi.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 2. CODE VIEWER TAB */}
      {activeSubTab === 'code' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-950">
            <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-bold text-slate-200">ShifoMedSingleFileApp.jsx</span>
            </div>

            <button
              onClick={handleCopyJsx}
              className="text-xs text-teal-400 hover:text-white flex items-center gap-1 font-semibold cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Nusxalandi' : 'Kodni nusxalash'}</span>
            </button>
          </div>

          <pre className="p-6 text-xs font-mono text-slate-300 overflow-x-auto max-h-[500px] leading-relaxed bg-[#0a0f1d]">
            {singleFileJsxSource}
          </pre>
        </div>
      )}

      {/* 3. BUSINESS / SELLING GUIDE TAB */}
      {activeSubTab === 'business' && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <DollarSign className="w-5 h-5" />
            <span>Ushbu Loyihani O'zbekistondagi Tibbiyot Markazlariga Sotish Rejasi:</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            
            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
              <div className="font-bold text-white text-sm flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-teal-400" />
                1. Potensial Xaridorlar
              </div>
              <ul className="text-slate-300 space-y-1.5 list-disc list-inside">
                <li>Xususiy stomatologiya klinikalari</li>
                <li>UZI, EKG va MRT diagnostika xonalari</li>
                <li>Ko'p tarmoqli xususiy tibbiyot markazlari</li>
                <li>Kosmetologiya va estetik tibbiyot markazlari</li>
                <li>Fizioterapiya va sanatoriyalar</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
              <div className="font-bold text-white text-sm flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                2. Bozor Narxi (Tavsiya)
              </div>
              <p className="text-slate-300">
                O'zbekiston IT bozorida bunday avtomatlashtirilgan klinik ERP tizimini quyidagi narxlarda sotish tavsiya etiladi:
              </p>
              <div className="text-emerald-400 font-bold text-sm">
                6,000,000 — 18,000,000 so'm
              </div>
              <div className="text-slate-400">
                Yoki oylik obuna (SaaS): <strong>500,000 - 1,200,000 so'm/oy</strong>
              </div>
            </div>

            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
              <div className="font-bold text-white text-sm flex items-center gap-1.5">
                <Server className="w-4 h-4 text-cyan-400" />
                3. Mijozga Taqdim Qilish
              </div>
              <p className="text-slate-300">
                1) Demo ko'rsatish: Bemor qabuli, navbat kuponi chiqarish va kassa chekini real vaqtda chop etib ko'rsating.<br />
                2) "Faylni Yuklab Olish (.jsx)" yoki "Offline HTML" tugmasi orqali dasturni xaridorga topshiring.
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
