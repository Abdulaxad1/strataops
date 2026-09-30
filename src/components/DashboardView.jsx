import React from 'react';
import {
  Users,
  CalendarCheck,
  CreditCard,
  BedDouble,
  Pill,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Activity,
  AlertTriangle,
  FileSignature,
  ClipboardList,
  FlaskConical,
  Stethoscope,
  ChevronRight
} from 'lucide-react';

export const DashboardView = ({
  stats,
  appointments = [],
  patients = [],
  invoices = [],
  onNavigate,
  onQuickAction
}) => {
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(a => a.date === today);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Welcome Banner - Clean & Focused */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-900/60 via-slate-900 to-emerald-950/60 border border-teal-500/30 p-6 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Jonli tizim faol
              </span>
              <span className="text-xs text-slate-400">
                {new Date().toLocaleDateString('uz-UZ', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">
              "ShifoMed" Boshqaruv Markazi
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Bemorlar qabuli, shifokorlar navbati, kassa tushumlari va statsionar palatalar real vaqt rejimida.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onQuickAction('new_appointment')}
              className="flex items-center gap-2 px-4 py-2.5 bg-teal-500 hover:bg-teal-400 active:scale-95 text-slate-950 font-semibold rounded-xl text-xs sm:text-sm transition shadow-lg shadow-teal-500/20 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>+ Qabulga Yozish</span>
            </button>
            <button
              onClick={() => onQuickAction('new_patient')}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl text-xs sm:text-sm border border-slate-700 transition cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>+ Yangi Bemor</span>
            </button>
          </div>
        </div>
      </div>

      {/* Urgent Alert Banner (If low stock or alert) */}
      {stats?.lowStockItemsCount && stats.lowStockItemsCount > 0 ? (
        <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>
              <strong>Ombor ogohlantirishi:</strong> {stats.lowStockItemsCount} ta dori vositasi minimal zaxiradan kam qolgan.
            </span>
          </div>
          <button
            onClick={() => onNavigate('pharmacy')}
            className="text-amber-300 hover:text-white font-semibold underline flex items-center gap-1 cursor-pointer flex-shrink-0"
          >
            Omborga o'tish <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : null}

      {/* 4 Essential KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Bemorlar */}
        <div
          onClick={() => onNavigate('patients')}
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/50 transition-all shadow-md group cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Jami Bemorlar</span>
            <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 group-hover:bg-teal-500 group-hover:text-slate-950 transition">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-bold text-white">{stats?.totalPatients || 0}</span>
            <span className="text-xs text-emerald-400 font-medium flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> Faol
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
            <span>Ambulator kartalar</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-400 transition" />
          </div>
        </div>

        {/* KPI 2: Bugungi Qabullar & Navbat */}
        <div
          onClick={() => onNavigate('appointments')}
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition-all shadow-md group cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Bugungi Qabullar</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-bold text-white">{stats?.todayAppointments || 0}</span>
            <span className="text-xs text-amber-300 font-medium px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
              {stats?.queueWaiting || 0} navbatda
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
            <span>Jonli navbat jadvali</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition" />
          </div>
        </div>

        {/* KPI 3: Bugungi Kassa Tushumi */}
        <div
          onClick={() => onNavigate('billing')}
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all shadow-md group cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Bugungi Kassa</span>
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-bold text-white">
              {(stats?.todayRevenue || 0).toLocaleString()} <span className="text-xs font-normal text-slate-400">so'm</span>
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
            <span>Fiskal to'lovlar</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition" />
          </div>
        </div>

        {/* KPI 4: Palatalar bandligi */}
        <div
          onClick={() => onNavigate('wards')}
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 transition-all shadow-md group cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Statsionar Palatalar</span>
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-slate-950 transition">
              <BedDouble className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-bold text-white">
              {stats?.occupiedBeds || 0} <span className="text-base text-slate-400">/ {stats?.totalBeds || 0}</span>
            </span>
            <span className="text-xs text-indigo-400 font-medium">
              {stats ? Math.round((stats.occupiedBeds / (stats.totalBeds || 1)) * 100) : 0}% band
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
            <span>Yotqizilgan bemorlar</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 transition" />
          </div>
        </div>

      </div>

      {/* Main Single-Panel Work Area: Essential Live Queue */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-teal-400" />
            <div>
              <h3 className="font-bold text-white text-base">Jonli Qabullar & Navbat Markazi (Bugun)</h3>
              <p className="text-xs text-slate-400">Shifokor xonalari bo'yicha chaqirilayotgan bemorlar ro'yxati</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('appointments')}
            className="text-xs text-teal-400 hover:text-teal-300 flex items-center gap-1 font-medium transition cursor-pointer"
          >
            Barcha qabullar ({todayAppointments.length}) <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-800/80">
          {todayAppointments.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-sm">
              Bugungi kunga qabullar hali rejalashtirilmagan. "+ Qabulga Yozish" tugmasini bosing.
            </div>
          ) : (
            todayAppointments.map((app) => (
              <div key={app.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-teal-400 text-sm">
                    #{app.queueNumber}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-white">{app.patientName}</div>
                    <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                      <span className="text-teal-400 font-medium">{app.doctorName}</span>
                      <span>•</span>
                      <span className="text-slate-300">{app.room}</span>
                      <span>•</span>
                      <span className="font-mono text-slate-400">{app.timeSlot}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                    app.status === 'in_progress'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : app.status === 'completed'
                      ? 'bg-slate-800 text-slate-400'
                      : app.status === 'pending'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {app.status === 'in_progress' && 'Hozir qabulda'}
                    {app.status === 'pending' && 'Kutilmoqda'}
                    {app.status === 'completed' && 'Yakunlandi'}
                    {app.status === 'cancelled' && 'Bekor'}
                  </span>

                  <button
                    onClick={() => onNavigate('appointments')}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
                    title="Qabul tafsilotlari"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Department Access Grid */}
      <div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">
          Klinika Bo'limlariga Tezkor O'tish
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <button
            onClick={() => onNavigate('prescriptions')}
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 text-left transition group cursor-pointer"
          >
            <FileSignature className="w-5 h-5 text-teal-400 group-hover:scale-110 transition" />
            <div className="mt-2 text-sm font-semibold text-white">Elektron Retsept</div>
            <div className="text-xs text-slate-400">Dori tayinlash</div>
          </button>

          <button
            onClick={() => onNavigate('lab-tests')}
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 text-left transition group cursor-pointer"
          >
            <FlaskConical className="w-5 h-5 text-teal-400 group-hover:scale-110 transition" />
            <div className="mt-2 text-sm font-semibold text-white">Laboratoriya</div>
            <div className="text-xs text-slate-400">Tahlil natijalari</div>
          </button>

          <button
            onClick={() => onNavigate('billing')}
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 text-left transition group cursor-pointer"
          >
            <CreditCard className="w-5 h-5 text-teal-400 group-hover:scale-110 transition" />
            <div className="mt-2 text-sm font-semibold text-white">Kassa & To'lov</div>
            <div className="text-xs text-slate-400">Chek chiqarish</div>
          </button>

          <button
            onClick={() => onNavigate('pharmacy')}
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 text-left transition group cursor-pointer"
          >
            <Pill className="w-5 h-5 text-teal-400 group-hover:scale-110 transition" />
            <div className="mt-2 text-sm font-semibold text-white">Dorixona Ombor</div>
            <div className="text-xs text-slate-400">Qoldiqlar nazorati</div>
          </button>

          <button
            onClick={() => onNavigate('logs')}
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 text-left transition group cursor-pointer"
          >
            <ClipboardList className="w-5 h-5 text-teal-400 group-hover:scale-110 transition" />
            <div className="mt-2 text-sm font-semibold text-white">Amaliyot Jurnali</div>
            <div className="text-xs text-slate-400">Xodimlar auditi</div>
          </button>
        </div>
      </div>

    </div>
  );
};
