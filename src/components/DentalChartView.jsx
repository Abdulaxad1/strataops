import React, { useState } from 'react';
import {
  Smile,
  Plus,
  Printer,
  Check,
  RotateCcw,
  Sparkles,
  DollarSign,
  AlertCircle,
  ShieldCheck,
  User,
  Info
} from 'lucide-react';

export const DentalChartView = ({ patients = [] }) => {
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || '');
  const [dentistNotes, setDentistNotes] = useState('Bemor tish qatorida ikkilamchi karies va tish toshlari aniqlandi. Gigiyenik tozalash va 2 ta plombani yangilash tavsiya etildi.');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // 32 Adult Teeth configuration
  // Upper arch: 18..11, 21..28
  // Lower arch: 48..41, 31..38
  const initialTeeth = [
    // Upper Right (18 - 11)
    { number: 18, name: 'Yuqori o\'ng 3-katta oziq', status: 'healthy', treatment: '' },
    { number: 17, name: 'Yuqori o\'ng 2-katta oziq', status: 'healthy', treatment: '' },
    { number: 16, name: 'Yuqori o\'ng 1-katta oziq', status: 'filling', treatment: 'Plomba' },
    { number: 15, name: 'Yuqori o\'ng 2-kichik oziq', status: 'healthy', treatment: '' },
    { number: 14, name: 'Yuqori o\'ng 1-kichik oziq', status: 'healthy', treatment: '' },
    { number: 13, name: 'Yuqori o\'ng qoziq', status: 'healthy', treatment: '' },
    { number: 12, name: 'Yuqori o\'ng yon kurak', status: 'healthy', treatment: '' },
    { number: 11, name: 'Yuqori o\'ng markaziy kurak', status: 'healthy', treatment: '' },

    // Upper Left (21 - 28)
    { number: 21, name: 'Yuqori chap markaziy kurak', status: 'healthy', treatment: '' },
    { number: 22, name: 'Yuqori chap yon kurak', status: 'healthy', treatment: '' },
    { number: 23, name: 'Yuqori chap qoziq', status: 'healthy', treatment: '' },
    { number: 24, name: 'Yuqori chap 1-kichik oziq', status: 'caries', treatment: 'Karies davolash' },
    { number: 25, name: 'Yuqori chap 2-kichik oziq', status: 'healthy', treatment: '' },
    { number: 26, name: 'Yuqori chap 1-katta oziq', status: 'crown', treatment: 'Metallokeramika toji' },
    { number: 27, name: 'Yuqori chap 2-katta oziq', status: 'healthy', treatment: '' },
    { number: 28, name: 'Yuqori chap 3-katta oziq (Aql tishi)', status: 'extracted', treatment: 'Olingan' },

    // Lower Left (38 - 31)
    { number: 38, name: 'Pastki chap 3-katta oziq', status: 'extracted', treatment: 'Olingan' },
    { number: 37, name: 'Pastki chap 2-katta oziq', status: 'healthy', treatment: '' },
    { number: 36, name: 'Pastki chap 1-katta oziq', status: 'pulpitis', treatment: 'Kanal tozalash (Endodontiya)' },
    { number: 35, name: 'Pastki chap 2-kichik oziq', status: 'healthy', treatment: '' },
    { number: 34, name: 'Pastki chap 1-kichik oziq', status: 'healthy', treatment: '' },
    { number: 33, name: 'Pastki chap qoziq', status: 'healthy', treatment: '' },
    { number: 32, name: 'Pastki chap yon kurak', status: 'healthy', treatment: '' },
    { number: 31, name: 'Pastki chap markaziy kurak', status: 'healthy', treatment: '' },

    // Lower Right (41 - 48)
    { number: 41, name: 'Pastki o\'ng markaziy kurak', status: 'healthy', treatment: '' },
    { number: 42, name: 'Pastki o\'ng yon kurak', status: 'healthy', treatment: '' },
    { number: 43, name: 'Pastki o\'ng qoziq', status: 'healthy', treatment: '' },
    { number: 44, name: 'Pastki o\'ng 1-kichik oziq', status: 'healthy', treatment: '' },
    { number: 45, name: 'Pastki o\'ng 2-kichik oziq', status: 'healthy', treatment: '' },
    { number: 46, name: 'Pastki o\'ng 1-katta oziq', status: 'implant', treatment: 'Titan implant' },
    { number: 47, name: 'Pastki o\'ng 2-katta oziq', status: 'caries', treatment: 'Karies davolash' },
    { number: 48, name: 'Pastki o\'ng 3-katta oziq', status: 'healthy', treatment: '' }
  ];

  const [teeth, setTeeth] = useState(initialTeeth);
  const [selectedTooth, setSelectedTooth] = useState(teeth[10]);

  const statusColors = {
    healthy: { label: 'Sog\'lom', bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', dot: 'bg-emerald-400', price: 0 },
    caries: { label: 'Karies', bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40', dot: 'bg-amber-400', price: 250000 },
    filling: { label: 'Plomba', bg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40', dot: 'bg-cyan-400', price: 200000 },
    pulpitis: { label: 'Pulipit (Kanal)', bg: 'bg-rose-500/20 text-rose-300 border-rose-500/40', dot: 'bg-rose-400', price: 450000 },
    crown: { label: 'Tojlangan (Koronka)', bg: 'bg-purple-500/20 text-purple-300 border-purple-500/40', dot: 'bg-purple-400', price: 800000 },
    implant: { label: 'Implant', bg: 'bg-blue-500/20 text-blue-300 border-blue-500/40', dot: 'bg-blue-400', price: 3200000 },
    extracted: { label: 'Olingan / Yo\'q', bg: 'bg-slate-800 text-slate-400 border-slate-700', dot: 'bg-slate-500', price: 0 }
  };

  const handleUpdateToothStatus = (newStatus) => {
    if (!selectedTooth) return;
    const updated = teeth.map(t => {
      if (t.number === selectedTooth.number) {
        return {
          ...t,
          status: newStatus,
          treatment: statusColors[newStatus].label
        };
      }
      return t;
    });
    setTeeth(updated);
    setSelectedTooth({
      ...selectedTooth,
      status: newStatus,
      treatment: statusColors[newStatus].label
    });
  };

  // Estimate total dental treatment cost
  const totalCost = teeth.reduce((sum, t) => sum + (statusColors[t.status]?.price || 0), 0);

  const handleSavePlan = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handlePrintDental = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Smile className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Interaktiv Stomatologik Karta (Tishlar Formulari)
              </h2>
              <p className="text-xs text-slate-400">
                32 ta tish formulasini grafik belgilash, davolash rejasi va smetasini avtomatik hisoblash
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
            className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
          >
            {patients.map(p => (
              <option key={p.id} value={p.id}>{p.fullName} ({p.phone})</option>
            ))}
          </select>

          <button
            onClick={handlePrintDental}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-teal-300 rounded-xl text-xs font-semibold border border-slate-700 transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Chop Etish</span>
          </button>
        </div>
      </div>

      {/* Main Dental Arch Grid */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
        
        {/* Status Legend Bar */}
        <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-800 text-xs">
          <span className="font-semibold text-slate-400">Holatlar bo'yicha belgi:</span>
          <div className="flex items-center gap-2 flex-wrap">
            {Object.entries(statusColors).map(([key, item]) => (
              <span key={key} className={`px-2.5 py-1 rounded-lg border text-[11px] font-medium flex items-center gap-1.5 ${item.bg}`}>
                <span className={`w-2 h-2 rounded-full ${item.dot}`} />
                <span>{item.label}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Upper Arch (18 - 11, 21 - 28) */}
        <div className="space-y-2">
          <div className="text-center text-xs font-bold uppercase tracking-wider text-teal-400">
            Yuqori Jag' (Maxilla)
          </div>

          <div className="flex justify-center items-center gap-2 flex-wrap">
            {teeth.slice(0, 16).map((t) => {
              const cfg = statusColors[t.status];
              const isSelected = selectedTooth?.number === t.number;
              return (
                <button
                  key={t.number}
                  onClick={() => setSelectedTooth(t)}
                  className={`w-11 h-14 rounded-2xl flex flex-col items-center justify-between p-1.5 border-2 transition-all cursor-pointer ${
                    isSelected ? 'ring-2 ring-teal-400 scale-105 shadow-lg' : ''
                  } ${cfg.bg}`}
                >
                  <span className="text-[10px] font-bold font-mono">{t.number}</span>
                  <div className={`w-3.5 h-3.5 rounded-full ${cfg.dot}`} />
                  <span className="text-[9px] uppercase font-bold truncate max-w-full">
                    {t.status.slice(0, 3)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-slate-800 my-2" />

        {/* Lower Arch (48 - 41, 31 - 38) */}
        <div className="space-y-2">
          <div className="flex justify-center items-center gap-2 flex-wrap">
            {teeth.slice(16, 32).map((t) => {
              const cfg = statusColors[t.status];
              const isSelected = selectedTooth?.number === t.number;
              return (
                <button
                  key={t.number}
                  onClick={() => setSelectedTooth(t)}
                  className={`w-11 h-14 rounded-2xl flex flex-col items-center justify-between p-1.5 border-2 transition-all cursor-pointer ${
                    isSelected ? 'ring-2 ring-teal-400 scale-105 shadow-lg' : ''
                  } ${cfg.bg}`}
                >
                  <span className="text-[10px] font-bold font-mono">{t.number}</span>
                  <div className={`w-3.5 h-3.5 rounded-full ${cfg.dot}`} />
                  <span className="text-[9px] uppercase font-bold truncate max-w-full">
                    {t.status.slice(0, 3)}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-center text-xs font-bold uppercase tracking-wider text-teal-400 pt-1">
            Pastki Jag' (Mandibula)
          </div>
        </div>

      </div>

      {/* Selected Tooth Action & Treatment Estimate Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Selected Tooth Status Picker (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs text-slate-400">Tanlangan tish:</span>
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mt-0.5">
                <span className="text-teal-400 font-mono">#{selectedTooth?.number}</span>
                <span>{selectedTooth?.name}</span>
              </h3>
            </div>
            <span className={`px-3 py-1 rounded-xl text-xs font-bold border ${statusColors[selectedTooth?.status || 'healthy'].bg}`}>
              {statusColors[selectedTooth?.status || 'healthy'].label}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <span className="text-slate-400 font-semibold">Holatni o'zgartirish uchun tanlang:</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.entries(statusColors).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => handleUpdateToothStatus(key)}
                  className={`p-2.5 rounded-xl border text-left font-medium transition cursor-pointer flex items-center justify-between ${
                    selectedTooth?.status === key
                      ? 'border-teal-400 bg-teal-500/20 text-white font-bold ring-1 ring-teal-400'
                      : 'border-slate-700 bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${item.dot}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.price > 0 && (
                    <span className="text-[10px] text-emerald-400 font-mono">
                      +{(item.price / 1000)}k
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Shifokor-stomatolog xulosasi va tavsiyalari:
            </label>
            <textarea
              rows={3}
              value={dentistNotes}
              onChange={(e) => setDentistNotes(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSavePlan}
              className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-500 active:scale-95 text-white text-xs font-semibold rounded-xl shadow-md transition cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{savedSuccess ? 'Saqlandi!' : 'Stomatologiya Rejasini Saqlash'}</span>
            </button>
          </div>
        </div>

        {/* Dental Treatment Estimate & Invoice Preview (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              Davolash Smetasi & Qiymati
            </h3>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              {totalCost.toLocaleString()} so'm
            </span>
          </div>

          <div className="space-y-2 overflow-y-auto max-h-[300px]">
            {teeth.filter(t => t.status !== 'healthy' && t.status !== 'extracted').length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                Barcha tishlar sog'lom holatda belgilangan.
              </div>
            ) : (
              teeth.filter(t => t.status !== 'healthy' && t.status !== 'extracted').map(t => (
                <div key={t.number} className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex justify-between items-center text-xs">
                  <div>
                    <div className="font-bold text-white">Tish #{t.number} — {statusColors[t.status].label}</div>
                    <div className="text-[11px] text-slate-400">{t.name}</div>
                  </div>
                  <span className="font-mono text-emerald-400 font-semibold">
                    {statusColors[t.status].price.toLocaleString()} so'm
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Davolanadigan tishlar:</span>
              <strong className="text-white">{teeth.filter(t => t.status !== 'healthy' && t.status !== 'extracted').length} ta</strong>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Profilaktik ko'rik:</span>
              <strong className="text-emerald-400">Bepul (Aksiya)</strong>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-sm text-white">
              <span>Jami Smeta:</span>
              <span className="text-emerald-400">{totalCost.toLocaleString()} so'm</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
