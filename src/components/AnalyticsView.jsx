import React, { useState } from 'react';
import {
  TrendingUp,
  CreditCard,
  DollarSign,
  Download,
  Users,
  Calendar,
  Stethoscope,
  PieChart,
  BarChart3,
  ArrowUpRight,
  Receipt,
  FileSpreadsheet,
  CheckCircle2
} from 'lucide-react';

export const AnalyticsView = ({ invoices = [], doctors = [], appointments = [], patients = [] }) => {
  const [period, setPeriod] = useState('monthly');

  // Calculations
  const totalRevenue = invoices.reduce((sum, inv) => sum + (Number(inv.total) || 0), 0);
  const avgCheck = invoices.length > 0 ? Math.round(totalRevenue / invoices.length) : 0;
  
  // Payment methods breakdown
  const paymentBreakdown = {
    'Uzcard / Humo': invoices.filter(i => i.paymentMethod?.includes('Uzcard') || i.paymentMethod?.includes('Humo')).reduce((sum, i) => sum + i.total, 0),
    'Naqd pul': invoices.filter(i => i.paymentMethod?.includes('Naqd')).reduce((sum, i) => sum + i.total, 0),
    'Payme / Click': invoices.filter(i => i.paymentMethod?.includes('Payme') || i.paymentMethod?.includes('Click')).reduce((sum, i) => sum + i.total, 0),
    'Tibbiy sug\'urta': invoices.filter(i => i.paymentMethod?.includes('sug\'urta')).reduce((sum, i) => sum + i.total, 0)
  };

  // Doctors performance and commission (e.g. 40% commission to doctor, 60% to clinic)
  const doctorStats = doctors.map(doc => {
    const docAppointments = appointments.filter(a => a.doctorId === doc.id || a.doctorName === doc.name);
    const revenue = docAppointments.length * (doc.consultationFee || 150000);
    const commission = Math.round(revenue * 0.4); // 40% doctor share
    const clinicNet = revenue - commission;

    return {
      id: doc.id,
      name: doc.name,
      specialty: doc.specialty,
      room: doc.room,
      patientsCount: docAppointments.length,
      revenue,
      commission,
      clinicNet
    };
  });

  const totalDoctorCommission = doctorStats.reduce((sum, d) => sum + d.commission, 0);
  const clinicNetProfit = totalRevenue - totalDoctorCommission;

  // Export Financial CSV Report
  const handleExportCsv = () => {
    const headers = ['Chek Raqami', 'Bemor', 'Sana', 'To\'lov Usuli', 'Jami Summa (so\'m)', 'Holati'];
    const rows = invoices.map(i => [
      i.receiptNumber,
      `"${i.patientName}"`,
      i.date,
      `"${i.paymentMethod}"`,
      i.total,
      i.paymentStatus
    ]);

    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ShifoMed_Moliya_Hisoboti_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Klinika Moliyaviy Analitikasi & Hisobotlar
              </h2>
              <p className="text-xs text-slate-400">
                Kassa tushumlari dinamikasi, to'lov turlari taqsimoti va shifokorlar gonorari
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
            {['Kunlik', 'Haftalik', 'Oylik'].map((p, idx) => (
              <button
                key={p}
                onClick={() => setPeriod(idx === 0 ? 'daily' : idx === 1 ? 'weekly' : 'monthly')}
                className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                  (period === 'daily' && idx === 0) || (period === 'weekly' && idx === 1) || (period === 'monthly' && idx === 2)
                    ? 'bg-teal-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportCsv}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-xl text-xs font-semibold shadow-md transition cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Excel / CSV Yuklab Olish</span>
          </button>
        </div>
      </div>

      {/* 4 Main Financial KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>Umumiy Kassa Tushumi</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white">
            {totalRevenue.toLocaleString()} <span className="text-xs font-normal text-slate-400">so'm</span>
          </div>
          <div className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" /> +14% o'tgan davrga nisbatan
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>O'rtacha Chek Miqdori</span>
            <Receipt className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white">
            {avgCheck.toLocaleString()} <span className="text-xs font-normal text-slate-400">so'm</span>
          </div>
          <div className="text-xs text-slate-400">
            Jami {invoices.length} ta kassa cheki
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>Shifokorlar Ulushi (40%)</span>
            <Stethoscope className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-indigo-300">
            {totalDoctorCommission.toLocaleString()} <span className="text-xs font-normal text-slate-400">so'm</span>
          </div>
          <div className="text-xs text-slate-400">
            {doctors.length} nafar shifokor uchun
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>Klinika Sof Tushumi (60%)</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-400">
            {clinicNetProfit.toLocaleString()} <span className="text-xs font-normal text-slate-400">so'm</span>
          </div>
          <div className="text-xs text-slate-400">
            Operatsion xarajatlar va foyda
          </div>
        </div>

      </div>

      {/* Payment Methods and Department Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Payment Methods Breakdown */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-teal-400" />
            To'lov Usullari Taqsimoti
          </h3>

          <div className="space-y-3">
            {Object.entries(paymentBreakdown).map(([method, amount]) => {
              const percent = totalRevenue > 0 ? Math.round((amount / totalRevenue) * 100) : 0;
              return (
                <div key={method} className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span className="font-medium">{method}</span>
                    <span className="font-bold text-white">{amount.toLocaleString()} so'm ({percent}%)</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Clinical Activity Breakdown */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-teal-400" />
            Bo'limlar Bo'yicha Faollik
          </h3>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
              <div className="text-slate-400">Konsultatsiyalar</div>
              <div className="text-lg font-bold text-teal-300">{appointments.length} ta qabul</div>
              <div className="text-[11px] text-slate-500">Barcha mutaxassislar</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
              <div className="text-slate-400">Laboratoriya Tahlillari</div>
              <div className="text-lg font-bold text-emerald-300">24 ta tahlil</div>
              <div className="text-[11px] text-slate-500">Biokimyo, UQT, UZI</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
              <div className="text-slate-400">Statsionar O'rinlari</div>
              <div className="text-lg font-bold text-indigo-300">4 ta bemor</div>
              <div className="text-[11px] text-slate-500">40% bandlik darajasi</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
              <div className="text-slate-400">Dorixona Savdosi</div>
              <div className="text-lg font-bold text-cyan-300">18 ta chek</div>
              <div className="text-[11px] text-slate-500">Retsept bo'yicha berildi</div>
            </div>
          </div>
        </div>

      </div>

      {/* Doctor Performance & Bonus Table */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-teal-400" />
            Shifokorlar Samaradorligi & Gonorar Hisob-Kitobi
          </h3>
          <span className="text-xs text-slate-400">
            Shifokor ulushi: <strong className="text-emerald-400">40%</strong> | Klinika: <strong className="text-teal-400">60%</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase text-[11px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Shifokor F.I.SH</th>
                <th className="py-3 px-4">Mutaxassislik</th>
                <th className="py-3 px-4 text-center">Bemorlar Soni</th>
                <th className="py-3 px-4 text-right">Jami Tushum</th>
                <th className="py-3 px-4 text-right">Shifokor Gonorari (40%)</th>
                <th className="py-3 px-4 text-right">Klinika Foydasi (60%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {doctorStats.map(doc => (
                <tr key={doc.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4 font-semibold text-white">
                    {doc.name}
                  </td>
                  <td className="py-3 px-4 text-slate-400">
                    {doc.specialty} ({doc.room})
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-teal-300">
                    {doc.patientsCount}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-white">
                    {doc.revenue.toLocaleString()} so'm
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-emerald-400">
                    {doc.commission.toLocaleString()} so'm
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-cyan-300">
                    {doc.clinicNet.toLocaleString()} so'm
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
