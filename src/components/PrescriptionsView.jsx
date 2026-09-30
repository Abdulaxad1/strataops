import React, { useState } from 'react';
import {
  FileSignature,
  Plus,
  Printer,
  Pill,
  Trash2,
  X,
  Check,
  ShieldAlert,
  Calendar,
  CheckCircle2,
  Clock
} from 'lucide-react';

export const PrescriptionsView = ({
  prescriptions = [],
  patients = [],
  doctors = [],
  onCreatePrescription,
  onUpdatePrescription,
  onDeletePrescription,
  onPrintPrescription,
  searchTerm = ''
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [formError, setFormError] = useState('');

  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [validDays, setValidDays] = useState(30);
  const [notes, setNotes] = useState('');
  const [meds, setMeds] = useState([
    {
      id: '1',
      medicineName: 'Azitromitsin 500mg',
      dosage: '1 tabletka',
      frequency: 'Kunda 1 mahal ovqatdan oldin',
      durationDays: 3,
      instruction: 'Bir vaqtning o\'zida ichilsin'
    }
  ]);

  const handleOpenAdd = () => {
    setFormError('');
    setPatientId(patients[0]?.id || '');
    setDoctorId(doctors[0]?.id || '');
    setDiagnosis('O\'tkir respirator infeksiya / Shamollash');
    setValidDays(30);
    setNotes('');
    setMeds([
      {
        id: '1',
        medicineName: 'Azitromitsin 500mg',
        dosage: '1 tabletka',
        frequency: 'Kunda 1 mahal ovqatdan 1 soat oldin',
        durationDays: 3,
        instruction: 'Bir vaqtning o\'zida ichilsin'
      },
      {
        id: '2',
        medicineName: 'Paratsetamol 500mg',
        dosage: '1 tabletka',
        frequency: 'Harorat 38°C dan oshganda',
        durationDays: 5,
        instruction: 'Zaruratga ko\'ra'
      }
    ]);
    setIsModalOpen(true);
  };

  const handleAddMedRow = () => {
    setMeds([
      ...meds,
      {
        id: String(Date.now()),
        medicineName: '',
        dosage: '1 tabletka',
        frequency: 'Kunda 2 mahal',
        durationDays: 7,
        instruction: ''
      }
    ]);
  };

  const handleRemoveMedRow = (index) => {
    if (meds.length <= 1) return;
    setMeds(meds.filter((_, i) => i !== index));
  };

  const handleMedChange = (index, field, val) => {
    const updated = [...meds];
    updated[index] = { ...updated[index], [field]: val };
    setMeds(updated);
  };

  const handleToggleStatus = async (rx) => {
    const nextStatus = rx.status === 'active' ? 'dispensed' : 'active';
    if (onUpdatePrescription) {
      await onUpdatePrescription(rx.id, { status: nextStatus });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const p = patients.find(pat => pat.id === patientId);
    const d = doctors.find(doc => doc.id === doctorId);
    if (!p) {
      setFormError('Iltimos bemorni tanlang');
      return;
    }
    if (!d) {
      setFormError('Iltimos shifokorni tanlang');
      return;
    }
    const validMeds = meds.filter(m => m.medicineName.trim() !== '');
    if (validMeds.length === 0) {
      setFormError('Kamida bitta dori vositasi nomini kiriting');
      return;
    }

    setFormError('');
    const birthYear = p.birthDate ? parseInt(p.birthDate.split('-')[0]) : 1990;
    const patientAge = new Date().getFullYear() - birthYear;

    await onCreatePrescription({
      patientId: p.id,
      patientName: p.fullName,
      patientAge,
      doctorId: d.id,
      doctorName: d.name,
      specialty: d.specialty,
      diagnosis,
      issueDate: new Date().toISOString().split('T')[0],
      validDays: Number(validDays),
      status: 'active',
      notes,
      medications: validMeds
    });

    setIsModalOpen(false);
  };

  const filteredPrescriptions = prescriptions.filter((rx) => {
    return (
      !searchTerm ||
      rx.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rx.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rx.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rx.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileSignature className="w-6 h-6 text-teal-400" />
            Elektron Retseptlar & Tavsiyalar
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Davolovchi shifokorlar tomonidan yozilgan elektron dori retseptlari va qabul sxemalari
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-500 active:scale-95 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-teal-900/30 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi Retsept Yozish</span>
        </button>
      </div>

      {/* Prescription List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredPrescriptions.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-400 bg-slate-900/50 rounded-2xl border border-slate-800">
            Elektron retseptlar topilmadi.
          </div>
        ) : (
          filteredPrescriptions.map((rx) => (
            <div
              key={rx.id}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/40 transition-all shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between pb-3 border-b border-slate-800/80">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-teal-400">{rx.id}</span>
                      <button
                        onClick={() => handleToggleStatus(rx)}
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border transition cursor-pointer ${
                          rx.status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                        }`}
                        title="Holatni almashtirish uchun bosing"
                      >
                        {rx.status === 'active' ? '✓ Amal qilmoqda' : 'Berildi (Tugatildi)'}
                      </button>
                    </div>
                    <h3 className="font-bold text-white text-base mt-1">{rx.patientName}</h3>
                    <div className="text-xs text-slate-400">
                      Shifokor: <span className="text-slate-300 font-medium">{rx.doctorName}</span> ({rx.specialty})
                    </div>
                  </div>

                  <div className="text-right text-xs text-slate-400">
                    <div>Berilgan: <span className="font-mono text-slate-300">{rx.issueDate}</span></div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{rx.validDays} kun amal qiladi</div>
                  </div>
                </div>

                <div className="mt-3 text-xs bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                  <span className="text-slate-400">Tashxis: </span>
                  <span className="text-white font-medium">{rx.diagnosis}</span>
                </div>

                <div className="mt-3 space-y-2">
                  <div className="text-xs font-semibold text-teal-400 flex items-center gap-1.5">
                    <Pill className="w-3.5 h-3.5" />
                    <span>Tayinlangan dorilar ({rx.medications?.length || 0} ta):</span>
                  </div>

                  <div className="divide-y divide-slate-800/80 bg-slate-950/40 rounded-xl border border-slate-800/80 overflow-hidden">
                    {rx.medications && rx.medications.map((m, idx) => (
                      <div key={idx} className="p-2.5 text-xs">
                        <div className="font-semibold text-white flex justify-between">
                          <span>{idx + 1}. {m.medicineName}</span>
                          <span className="text-teal-300 font-mono">{m.dosage}</span>
                        </div>
                        <div className="text-slate-400 mt-0.5">
                          {m.frequency} • {m.durationDays} kun
                        </div>
                        {m.instruction && (
                          <div className="text-slate-500 italic mt-0.5">{m.instruction}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => onPrintPrescription(rx)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-600/20 hover:bg-teal-600/30 text-teal-300 border border-teal-500/30 rounded-xl text-xs font-semibold transition cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Retsept Blankasini Chop Etish</span>
                </button>

                <button
                  onClick={() => setDeletingId(rx.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition cursor-pointer"
                  title="O'chirish"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <ShieldAlert className="w-6 h-6" />
              <h3 className="font-bold text-white text-base">Retseptni o'chirish</h3>
            </div>
            <p className="text-xs text-slate-300">
              Ushbu elektron retseptni butunlay bekor qilmoqchimisiz?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeletingId(null)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer"
              >
                Bekor qilish
              </button>
              <button
                onClick={async () => {
                  await onDeletePrescription(deletingId);
                  setDeletingId(null);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition cursor-pointer"
              >
                Ha, o'chirilsin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Prescription Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <FileSignature className="w-5 h-5 text-teal-400" />
                Yangi Elektron Retsept Yozish
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {formError && (
                <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Bemorni tanlang *
                  </label>
                  <select
                    required
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="">-- Bemor tanlang --</option>
                    {patients.map(p => (
                      <option key={p.id} value={p.id}>{p.fullName}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Tayinlovchi shifokor *
                  </label>
                  <select
                    required
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="">-- Shifokor tanlang --</option>
                    {doctors.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Klinik Tashxis *
                  </label>
                  <input
                    type="text"
                    required
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Amal qilish (kun)
                  </label>
                  <input
                    type="number"
                    value={validDays}
                    onChange={(e) => setValidDays(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Dynamic Medicine Rows */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-teal-400">
                    Tayinlangan preparatlar ro'yxati (Rp.):
                  </span>
                  <button
                    type="button"
                    onClick={handleAddMedRow}
                    className="flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 font-semibold cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Dori qo'shish</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {meds.map((med, idx) => (
                    <div key={med.id || idx} className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-300">Dori #{idx + 1}</span>
                        {meds.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveMedRow(idx)}
                            className="text-xs text-rose-400 hover:text-rose-300 cursor-pointer"
                          >
                            O'chirish
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <input
                            type="text"
                            placeholder="Dori nomi (masalan: Amoksiklav 625mg)"
                            value={med.medicineName}
                            onChange={(e) => handleMedChange(idx, 'medicineName', e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Doza (masalan: 1 tabletka)"
                            value={med.dosage}
                            onChange={(e) => handleMedChange(idx, 'dosage', e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Qabul vaqti (Kunda 2 mahal ovqatdan so'ng)"
                            value={med.frequency}
                            onChange={(e) => handleMedChange(idx, 'frequency', e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Ko'rsatma (masalan: Ko'p suv bilan ichilsin)"
                            value={med.instruction}
                            onChange={(e) => handleMedChange(idx, 'instruction', e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Qo'shimcha tavsiya yoki parhez eslatmasi
                </label>
                <input
                  type="text"
                  placeholder="Ko'p suyuqlik ichish, og'ir jismoniy zo'riqishdan saqlanish"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow-md transition cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Retseptni Tasdiqlash va Chop Etish</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
