import React, { useState, useRef, useEffect } from 'react';
import { 
  Building2, 
  Search, 
  RotateCcw, 
  Plus, 
  HeartPulse,
  UserPlus,
  Users,
  Calendar,
  Stethoscope,
  Receipt,
  X,
  ChevronRight
} from 'lucide-react';

export const ClinicHeader = ({
  stats,
  onRefresh,
  onResetSeed,
  onQuickAction,
  onGoToDashboard,
  searchTerm,
  onSearchChange,
  isLoading,
  patients = [],
  doctors = [],
  appointments = [],
  invoices = [],
  onNavigate
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Quick cross-entity search results
  const trimmedSearch = searchTerm.trim().toLowerCase();
  const matchingPatients = trimmedSearch.length >= 2
    ? patients.filter(p =>
        p.fullName.toLowerCase().includes(trimmedSearch) ||
        p.phone.includes(trimmedSearch) ||
        (p.passport && p.passport.toLowerCase().includes(trimmedSearch))
      ).slice(0, 3)
    : [];

  const matchingDoctors = trimmedSearch.length >= 2
    ? doctors.filter(d =>
        d.name.toLowerCase().includes(trimmedSearch) ||
        d.specialty.toLowerCase().includes(trimmedSearch)
      ).slice(0, 2)
    : [];

  const matchingAppointments = trimmedSearch.length >= 2
    ? appointments.filter(a =>
        a.patientName.toLowerCase().includes(trimmedSearch) ||
        a.doctorName.toLowerCase().includes(trimmedSearch)
      ).slice(0, 2)
    : [];

  const matchingInvoices = trimmedSearch.length >= 2
    ? invoices.filter(inv =>
        inv.patientName.toLowerCase().includes(trimmedSearch) ||
        inv.receiptNumber.toLowerCase().includes(trimmedSearch)
      ).slice(0, 2)
    : [];

  const hasAnyResults =
    matchingPatients.length > 0 ||
    matchingDoctors.length > 0 ||
    matchingAppointments.length > 0 ||
    matchingInvoices.length > 0;

  const handleSelectResult = (tab, term = '') => {
    onSearchChange(term);
    if (onNavigate) {
      onNavigate(tab);
    }
    setIsSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="px-4 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Brand / Logo - Returns to main general dashboard */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <button
            onClick={onGoToDashboard}
            className="flex items-center gap-3 text-left group hover:opacity-95 transition active:scale-95 cursor-pointer focus:outline-none"
            title="Boshqaruv Paneli (Eng asosiy oynaga qaytish)"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 p-0.5 shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/40 transition">
              <div className="w-full h-full bg-[#0f172a] rounded-[10px] flex items-center justify-center">
                <HeartPulse className="w-5 h-5 text-teal-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-teal-200 bg-clip-text text-transparent group-hover:text-white transition">
                  ShifoMed ERP
                </h1>
                <span className="px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30">
                  Tibbiyot Markazi
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Xususiy Klinika va Statsionar Boshqaruv Tizimi
              </p>
            </div>
          </button>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onRefresh}
              title="Yangilash"
              disabled={isLoading}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
            >
              <RotateCcw className={`w-4 h-4 ${isLoading ? 'animate-spin text-teal-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Center: Global Intelligent Clinic Search */}
        <div ref={searchRef} className="w-full md:max-w-md relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Bemor (F.I.SH, Pasport, Tel), shifokor yoki chek qidirish..."
            value={searchTerm}
            onFocus={() => setIsSearchOpen(true)}
            onChange={(e) => {
              onSearchChange(e.target.value);
              setIsSearchOpen(true);
            }}
            className="w-full pl-9 pr-8 py-2 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/50 transition"
          />
          {searchTerm && (
            <button
              onClick={() => {
                onSearchChange('');
                setIsSearchOpen(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white cursor-pointer"
              title="Qidiruvni tozalash"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Real-time search popover dropdown */}
          {isSearchOpen && trimmedSearch.length >= 2 && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 divide-y divide-slate-800">
              
              {/* Patients Results */}
              {matchingPatients.length > 0 && (
                <div className="p-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1 flex items-center gap-1.5">
                    <Users className="w-3 h-3 text-teal-400" /> Bemorlar
                  </div>
                  {matchingPatients.map(p => (
                    <button
                      key={p.id}
                      onClick={() => handleSelectResult('patients', p.fullName)}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-xs flex items-center justify-between transition cursor-pointer text-slate-200"
                    >
                      <div>
                        <div className="font-semibold text-white">{p.fullName}</div>
                        <div className="text-[11px] text-slate-400">{p.phone} • {p.bloodGroup}</div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    </button>
                  ))}
                </div>
              )}

              {/* Doctors Results */}
              {matchingDoctors.length > 0 && (
                <div className="p-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1 flex items-center gap-1.5">
                    <Stethoscope className="w-3 h-3 text-indigo-400" /> Shifokorlar
                  </div>
                  {matchingDoctors.map(d => (
                    <button
                      key={d.id}
                      onClick={() => handleSelectResult('doctors', d.name)}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-xs flex items-center justify-between transition cursor-pointer text-slate-200"
                    >
                      <div>
                        <div className="font-semibold text-white">{d.name}</div>
                        <div className="text-[11px] text-teal-400">{d.specialty} ({d.room})</div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    </button>
                  ))}
                </div>
              )}

              {/* Appointments Results */}
              {matchingAppointments.length > 0 && (
                <div className="p-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-cyan-400" /> Qabullar & Navbat
                  </div>
                  {matchingAppointments.map(a => (
                    <button
                      key={a.id}
                      onClick={() => handleSelectResult('appointments', a.patientName)}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-xs flex items-center justify-between transition cursor-pointer text-slate-200"
                    >
                      <div>
                        <div className="font-semibold text-white">{a.patientName} — Kupon #{a.queueNumber}</div>
                        <div className="text-[11px] text-slate-400">{a.doctorName} • {a.timeSlot}</div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    </button>
                  ))}
                </div>
              )}

              {/* Invoices Results */}
              {matchingInvoices.length > 0 && (
                <div className="p-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1 flex items-center gap-1.5">
                    <Receipt className="w-3 h-3 text-emerald-400" /> Kassa Cheklari
                  </div>
                  {matchingInvoices.map(inv => (
                    <button
                      key={inv.id}
                      onClick={() => handleSelectResult('billing', inv.receiptNumber)}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-xs flex items-center justify-between transition cursor-pointer text-slate-200"
                    >
                      <div>
                        <div className="font-semibold text-white">{inv.receiptNumber} — {inv.patientName}</div>
                        <div className="text-[11px] text-emerald-400">{inv.total?.toLocaleString()} so'm ({inv.paymentStatus})</div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    </button>
                  ))}
                </div>
              )}

              {!hasAnyResults && (
                <div className="p-4 text-center text-xs text-slate-400">
                  "{searchTerm}" bo'yicha mos yozuv topilmadi.
                </div>
              )}

            </div>
          )}
        </div>

        {/* Right: Quick actions & status */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={() => onQuickAction('new_patient')}
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-xl text-xs font-semibold shadow-md shadow-emerald-900/30 transition cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>+ Bemor</span>
          </button>

          <button
            onClick={() => onQuickAction('new_appointment')}
            className="flex items-center gap-1.5 px-3 py-2 bg-teal-600 hover:bg-teal-500 active:scale-95 text-white rounded-xl text-xs font-semibold shadow-md shadow-teal-900/30 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Qabul</span>
          </button>

          <button
            onClick={onResetSeed}
            title="Namunaviy bazani qayta tiklash (Demo ma'lumotlar)"
            className="flex items-center gap-1.5 px-2.5 py-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-xl text-xs border border-slate-700 transition cursor-pointer"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-teal-400' : ''}`} />
            <span className="hidden xl:inline">Baza Reset</span>
          </button>

          <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-slate-800 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-medium">Server Online</span>
          </div>
        </div>

      </div>
    </header>
  );
};
