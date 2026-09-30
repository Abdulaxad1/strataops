import React, { useState } from 'react';
import {
  ClipboardList,
  Clock,
  User,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  Building2,
  Calendar,
  CreditCard,
  Pill,
  Stethoscope,
  FlaskConical,
  RefreshCw
} from 'lucide-react';

export const PracticeLogView = ({ logs = [], onNavigate }) => {
  const [selectedModule, setSelectedModule] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getModuleIcon = (moduleName) => {
    switch (moduleName) {
      case 'Bemorlar':
        return <User className="w-4 h-4 text-emerald-400" />;
      case 'Qabullar':
        return <Calendar className="w-4 h-4 text-teal-400" />;
      case 'Kassa':
        return <CreditCard className="w-4 h-4 text-cyan-400" />;
      case 'Dorixona':
        return <Pill className="w-4 h-4 text-amber-400" />;
      case 'Shifokorlar':
        return <Stethoscope className="w-4 h-4 text-indigo-400" />;
      case 'Laboratoriya':
        return <FlaskConical className="w-4 h-4 text-purple-400" />;
      default:
        return <ClipboardList className="w-4 h-4 text-teal-400" />;
    }
  };

  const filteredLogs = logs.filter((log) => {
    const matchesModule = selectedModule === 'all' || log.module === selectedModule;
    const matchesSearch =
      !searchTerm ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.module.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesModule && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <ClipboardList className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Klinika Amaliyot Jurnali (Audit & Xavfsizlik Logi)
              </h2>
              <p className="text-xs text-slate-400">
                Xodimlar tomonidan amalga oshirilgan barcha klinik va moliyaviy operatsiyalar xronologiyasi
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
            Jami yozuvlar: <strong className="text-teal-300 font-mono">{filteredLogs.length}</strong> ta
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center gap-3 p-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl">
        <div className="flex-1 min-w-[220px] relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Amallar, xodim yoki modul bo'yicha qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Bo'lim:</span>
          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 text-xs focus:outline-none"
          >
            <option value="all">Barcha bo'limlar</option>
            <option value="Bemorlar">Bemorlar bazasi</option>
            <option value="Qabullar">Qabullar & Navbat</option>
            <option value="Kassa">Kassa & Moliya</option>
            <option value="Laboratoriya">Laboratoriya</option>
            <option value="Retseptlar">Elektron Retseptlar</option>
            <option value="Statsionar">Statsionar Palatalar</option>
            <option value="Dorixona">Dorixona Ombori</option>
            <option value="Tizim">Tizim hodisalari</option>
          </select>
        </div>
      </div>

      {/* Audit Log Timeline / Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="divide-y divide-slate-800/80">
          {filteredLogs.length === 0 ? (
            <div className="py-16 text-center text-slate-400 text-sm">
              Amaliyot jurnali bo'yicha ma'lumotlar topilmadi.
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 hover:bg-slate-800/40 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {getModuleIcon(log.module)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-white text-sm">
                        {log.module}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-teal-500/10 text-teal-300 border border-teal-500/20">
                        {log.action}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {log.description}
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center text-right pl-12 sm:pl-0">
                  <span className="text-xs font-medium text-slate-200 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    {log.user}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {new Date(log.timestamp).toLocaleString('uz-UZ', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};
