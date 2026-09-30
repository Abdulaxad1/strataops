import React, { useState } from 'react';
import {
  Users,
  X,
  Phone,
  Heart,
  Calendar,
  FileHeart,
  FileSignature,
  FlaskConical,
  Receipt,
  Printer,
  CalendarPlus,
  Send,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Pill,
  Activity,
  CreditCard,
  MessageSquare
} from 'lucide-react';

export const Patient360Modal = ({
  patient,
  records = [],
  appointments = [],
  prescriptions = [],
  labTests = [],
  invoices = [],
  onClose,
  onScheduleAppointment,
  onPrintRecord,
  onPrintPrescription,
  onPrintTest,
  onPrintInvoice,
  onSendSms
}) => {
  const [activeTab, setActiveTab] = useState('summary');
  const [smsText, setSmsText] = useState('Hurmatli bemor, "ShifoMed" klinikasida sizning ko\'rigingiz rejalashtirildi. Salomat bo\'ling!');
  const [smsSent, setSmsSent] = useState(false);

  if (!patient) return null;

  // Filter records specifically for this patient
  const patientRecords = records.filter(r => r.patientId === patient.id || r.patientName === patient.fullName);
  const patientAppointments = appointments.filter(a => a.patientId === patient.id || a.patientName === patient.fullName);
  const patientPrescriptions = prescriptions.filter(p => p.patientId === patient.id || p.patientName === patient.fullName);
  const patientLabTests = labTests.filter(t => t.patientId === patient.id || t.patientName === patient.fullName);
  const patientInvoices = invoices.filter(i => i.patientId === patient.id || i.patientName === patient.fullName);

  const totalSpent = patientInvoices.reduce((sum, inv) => sum + (Number(inv.total) || 0), 0);

  const handleSendQuickSms = (e) => {
    e.preventDefault();
    if (onSendSms) {
      onSendSms(patient.phone, smsText, patient.fullName);
    }
    setSmsSent(true);
    setTimeout(() => setSmsSent(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Top Header Card */}
        <div className="p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950/60 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-teal-500/20 border-2 border-teal-400/50 flex items-center justify-center text-teal-300 font-bold text-xl shadow-lg">
              {patient.fullName.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  {patient.fullName}
                </h2>
                <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-300 border border-teal-500/20">
                  {patient.id}
                </span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                  patient.status === 'inpatient'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {patient.status === 'inpatient' ? 'Statsionarda' : 'Ambulator'}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 flex-wrap">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-teal-400" />
                  <strong className="text-slate-200">{patient.phone}</strong>
                </span>
                <span>•</span>
                <span>Tug'ilgan sana: <strong className="text-slate-200">{patient.birthDate}</strong></span>
                <span>•</span>
                <span className="inline-flex items-center gap-1 text-rose-400 font-bold">
                  <Heart className="w-3.5 h-3.5 fill-rose-500/30" />
                  {patient.bloodGroup}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            {onScheduleAppointment && (
              <button
                onClick={() => {
                  onClose();
                  onScheduleAppointment(patient);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-semibold shadow-md transition cursor-pointer"
              >
                <CalendarPlus className="w-4 h-4" />
                <span>Qabulga Yozish</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 border-b border-slate-800 bg-slate-950/40 overflow-x-auto text-xs py-2">
          {[
            { id: 'summary', label: 'Umumiy Ma\'lumot', count: null },
            { id: 'records', label: 'Tashxislar (EHR)', count: patientRecords.length },
            { id: 'appointments', label: 'Qabullar & Navbat', count: patientAppointments.length },
            { id: 'prescriptions', label: 'Retseptlar', count: patientPrescriptions.length },
            { id: 'labs', label: 'Laboratoriya', count: patientLabTests.length },
            { id: 'billing', label: 'Moliya & Cheklar', count: patientInvoices.length },
            { id: 'sms', label: 'SMS Yuborish', count: null }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 rounded-xl font-medium transition cursor-pointer flex items-center gap-1.5 flex-shrink-0 ${
                activeTab === tab.id
                  ? 'bg-teal-600/20 text-teal-300 border border-teal-500/30 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 font-mono text-slate-300">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* 1. Summary Tab */}
          {activeTab === 'summary' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="text-xs text-slate-400">Jami ko'riklar</div>
                  <div className="text-2xl font-bold text-teal-300">{patientRecords.length} ta</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="text-xs text-slate-400">Yozilgan retseptlar</div>
                  <div className="text-2xl font-bold text-emerald-300">{patientPrescriptions.length} ta</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="text-xs text-slate-400">Kassaga to'langan</div>
                  <div className="text-2xl font-bold text-white">{totalSpent.toLocaleString()} so'm</div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3 text-xs">
                <h3 className="font-bold text-white text-sm">Shaxsiy & Tibbiy Karta Tafsilotlari</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400">Yashash manzili: </span>
                    <strong className="text-slate-200">{patient.address || 'Kiritilmagan'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Pasport / JSHSHIR: </span>
                    <strong className="text-slate-200 font-mono">{patient.passport || 'Kiritilmagan'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Jinsi: </span>
                    <strong className="text-slate-200">{patient.gender}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Favqulodda aloqa: </span>
                    <strong className="text-slate-200">{patient.emergencyContact || 'Kiritilmagan'}</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
                    <div className="font-semibold text-rose-300">Allergik anomaliyalar:</div>
                    <p className="text-slate-300 mt-1">{patient.allergies || 'Allergiya aniqlanmagan'}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <div className="font-semibold text-amber-300">Surunkali kasalliklar:</div>
                    <p className="text-slate-300 mt-1">{patient.chronicDiseases || 'Yo\'q'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. Records Tab */}
          {activeTab === 'records' && (
            <div className="space-y-3">
              {patientRecords.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  Ushbu bemor uchun hali ambulator ko'rik yozilmagan.
                </div>
              ) : (
                patientRecords.map(rec => (
                  <div key={rec.id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-mono text-teal-400 font-bold">{rec.id}</span>
                        <div className="text-slate-400 mt-0.5">Shifokor: <strong className="text-white">{rec.doctorName}</strong> ({rec.doctorSpecialty})</div>
                      </div>
                      <span className="text-slate-400 font-mono">{rec.visitDate}</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/20">
                      <span className="text-teal-400 font-bold">Tashxis: </span>
                      <strong className="text-white">{rec.diagnosis}</strong>
                    </div>

                    <p className="text-slate-300"><strong>Davolash rejasi:</strong> {rec.treatmentPlan}</p>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => onPrintRecord && onPrintRecord(rec)}
                        className="flex items-center gap-1 text-teal-300 hover:text-white text-xs font-semibold cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" /> Chop etish (Epicrisis)
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* 3. Appointments Tab */}
          {activeTab === 'appointments' && (
            <div className="space-y-2.5">
              {patientAppointments.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  Qabullar tarixi mavjud emas.
                </div>
              ) : (
                patientAppointments.map(app => (
                  <div key={app.id} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between items-center text-xs">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 font-bold flex items-center justify-center">
                        #{app.queueNumber}
                      </span>
                      <div>
                        <div className="font-semibold text-white">{app.doctorName} ({app.department})</div>
                        <div className="text-slate-400">{app.date} • {app.timeSlot} • {app.room}</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-slate-300">
                      {app.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}

          {/* 4. Prescriptions Tab */}
          {activeTab === 'prescriptions' && (
            <div className="space-y-3">
              {patientPrescriptions.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  Ushbu bemorga elektron retsept yozilmagan.
                </div>
              ) : (
                patientPrescriptions.map(rx => (
                  <div key={rx.id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="font-mono text-teal-400 font-bold">{rx.id}</span>
                      <span className="text-slate-400">{rx.issueDate}</span>
                    </div>
                    <div className="text-slate-300">Shifokor: {rx.doctorName} | Tashxis: {rx.diagnosis}</div>
                    
                    <div className="divide-y divide-slate-800 bg-slate-900 rounded-xl p-2">
                      {rx.medications?.map((m, i) => (
                        <div key={i} className="py-1.5 flex justify-between">
                          <span className="font-medium text-white">{m.medicineName}</span>
                          <span className="text-teal-300">{m.dosage} ({m.frequency})</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => onPrintPrescription && onPrintPrescription(rx)}
                        className="flex items-center gap-1 text-teal-300 hover:text-white text-xs font-semibold cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" /> Retseptni chop etish
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* 5. Labs Tab */}
          {activeTab === 'labs' && (
            <div className="space-y-3">
              {patientLabTests.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  Laboratoriya tahlillari topilmadi.
                </div>
              ) : (
                patientLabTests.map(test => (
                  <div key={test.id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="font-bold text-white text-sm">{test.testName}</span>
                      <span className="font-mono text-teal-400">{test.orderDate}</span>
                    </div>
                    <div className="text-slate-400">{test.category} • Shifokor: {test.orderedByDoctorName}</div>
                    
                    {test.results && test.results.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {test.results.map((r, i) => (
                          <span key={i} className={`px-2 py-0.5 rounded text-[11px] ${r.isAbnormal ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-slate-800 text-slate-300'}`}>
                            {r.parameter}: {r.value} {r.unit}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => onPrintTest && onPrintTest(test)}
                        className="flex items-center gap-1 text-teal-300 hover:text-white text-xs font-semibold cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" /> Tahlil xulosasini chop etish
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* 6. Billing Tab */}
          {activeTab === 'billing' && (
            <div className="space-y-2.5">
              {patientInvoices.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  To'lov hisoblari mavjud emas.
                </div>
              ) : (
                patientInvoices.map(inv => (
                  <div key={inv.id} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between items-center text-xs">
                    <div>
                      <div className="font-mono text-teal-400 font-bold">{inv.receiptNumber}</div>
                      <div className="text-slate-400">{inv.date} • {inv.paymentMethod}</div>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <div>
                        <div className="font-bold text-white text-sm">{inv.total?.toLocaleString()} so'm</div>
                        <div className="text-[10px] text-emerald-400 font-semibold">{inv.paymentStatus}</div>
                      </div>
                      <button
                        onClick={() => onPrintInvoice && onPrintInvoice(inv)}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-teal-300 rounded-lg cursor-pointer"
                        title="Chekni chop etish"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* 7. Quick SMS Sender Tab */}
          {activeTab === 'sms' && (
            <form onSubmit={handleSendQuickSms} className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-teal-400" />
                  Bemorga SMS / Telegram Xabarnoma Yuborish
                </h3>
                <span className="text-slate-400 font-mono">Qabul qiluvchi: {patient.phone}</span>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Xabar matni:</label>
                <textarea
                  rows={4}
                  required
                  value={smsText}
                  onChange={(e) => setSmsText(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-400">
                  Belgilar soni: {smsText.length} ta (1 ta SMS)
                </span>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold transition cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{smsSent ? 'Yuborildi!' : 'SMS Yuborish'}</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
