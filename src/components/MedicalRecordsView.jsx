import React, { useState } from 'react';
import {
  FileHeart,
  Plus,
  Printer,
  Trash2,
  Edit2,
  X,
  Check,
  ShieldAlert,
  Activity,
  Heart,
  Thermometer,
  Scale
} from 'lucide-react';

export const MedicalRecordsView = ({
  records = [],
  patients = [],
  doctors = [],
  onCreateRecord,
  onUpdateRecord,
  onDeleteRecord,
  onPrintRecord,
  searchTerm = ''
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [formError, setFormError] = useState('');

  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    visitDate: new Date().toISOString().split('T')[0],
    complaints: '',
    anamnesis: '',
    objectiveStatus: '',
    bloodPressure: '120/80',
    heartRate: 75,
    temperature: 36.6,
    weight: 70,
    diagnosis: '',
    treatmentPlan: '',
    recommendations: ''
  });

  const handleOpenAdd = () => {
    setEditingRecord(null);
    setFormError('');
    setFormData({
      patientId: patients[0]?.id || '',
      doctorId: doctors[0]?.id || '',
      visitDate: new Date().toISOString().split('T')[0],
      complaints: 'Bosh og\'rig\'i, umumiy holsizlik va qon bosimi ko\'tarilishi',
      anamnesis: 'Kasallik 1 haftadan buyon bezovta qilmoqda. Avval gipotenziv dorilar qabul qilmagan.',
      objectiveStatus: 'Umumiy holati qoniqarli. Puls ritmik, nafas ravon.',
      bloodPressure: '130/85',
      heartRate: 78,
      temperature: 36.6,
      weight: 74,
      diagnosis: 'Arterial gipertenziya 1-bosqich, xavf 2',
      treatmentPlan: 'Kardiologik parhez, magniy preparatlari, gipotenziv terapiya',
      recommendations: 'Tuzli ovqatlarni cheklash, har kuni qon bosimi kundaligini yuritish'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (rec) => {
    setEditingRecord(rec);
    setFormError('');
    setFormData({
      patientId: rec.patientId,
      doctorId: rec.doctorId,
      visitDate: rec.visitDate,
      complaints: rec.complaints,
      anamnesis: rec.anamnesis,
      objectiveStatus: rec.objectiveStatus || '',
      bloodPressure: rec.vitals?.bloodPressure || '120/80',
      heartRate: rec.vitals?.heartRate || 75,
      temperature: rec.vitals?.temperature || 36.6,
      weight: rec.vitals?.weight || 70,
      diagnosis: rec.diagnosis,
      treatmentPlan: rec.treatmentPlan,
      recommendations: rec.recommendations
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const p = patients.find(pat => pat.id === formData.patientId);
    const d = doctors.find(doc => doc.id === formData.doctorId);
    if (!p) {
      setFormError('Iltimos bemorni tanlang');
      return;
    }
    if (!d) {
      setFormError('Iltimos qabul qiluvchi shifokorni tanlang');
      return;
    }
    if (!formData.diagnosis.trim()) {
      setFormError('Iltimos bemorga qo\'yilgan asosiy tashxisni kiriting');
      return;
    }

    setFormError('');
    const recordPayload = {
      patientId: p.id,
      patientName: p.fullName,
      doctorId: d.id,
      doctorName: d.name,
      doctorSpecialty: d.specialty,
      visitDate: formData.visitDate,
      complaints: formData.complaints,
      anamnesis: formData.anamnesis,
      objectiveStatus: formData.objectiveStatus,
      vitals: {
        bloodPressure: formData.bloodPressure,
        heartRate: Number(formData.heartRate),
        temperature: Number(formData.temperature),
        weight: Number(formData.weight)
      },
      diagnosis: formData.diagnosis,
      treatmentPlan: formData.treatmentPlan,
      recommendations: formData.recommendations
    };

    if (editingRecord && onUpdateRecord) {
      await onUpdateRecord(editingRecord.id, recordPayload);
    } else {
      await onCreateRecord(recordPayload);
    }

    setIsModalOpen(false);
  };

  const filteredRecords = records.filter((r) => {
    return (
      !searchTerm ||
      r.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileHeart className="w-6 h-6 text-teal-400" />
            Tibbiy Kartalar & Tashxislar (Elektron EHR)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Bemorlarning ko'rik xulosalari, vital ko'rsatkichlari, tashxislari va davolash protokollari
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-500 active:scale-95 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-teal-900/30 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi Tashxis / Ko'rik Yozish</span>
        </button>
      </div>

      {/* Record Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredRecords.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-400 bg-slate-900/50 rounded-2xl border border-slate-800">
            Tibbiy ko'rik kartalari topilmadi.
          </div>
        ) : (
          filteredRecords.map((rec) => (
            <div
              key={rec.id}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/40 transition-all shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between pb-3 border-b border-slate-800/80">
                  <div>
                    <span className="font-mono text-xs text-teal-400 font-semibold">{rec.id}</span>
                    <h3 className="font-bold text-white text-base leading-snug mt-0.5">{rec.patientName}</h3>
                    <div className="text-xs text-slate-400">
                      Shifokor: <span className="text-slate-300 font-medium">{rec.doctorName}</span> ({rec.doctorSpecialty})
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono text-slate-400">{rec.visitDate}</span>
                  </div>
                </div>

                {rec.vitals && (
                  <div className="mt-3 grid grid-cols-4 gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 text-center">
                    <div>
                      <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                        <Activity className="w-3 h-3 text-teal-400" /> Bosim
                      </div>
                      <div className="text-xs font-bold text-teal-300">{rec.vitals.bloodPressure}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                        <Heart className="w-3 h-3 text-rose-400" /> Puls
                      </div>
                      <div className="text-xs font-bold text-rose-400">{rec.vitals.heartRate} bpm</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                        <Thermometer className="w-3 h-3 text-amber-400" /> Harorat
                      </div>
                      <div className="text-xs font-bold text-amber-300">{rec.vitals.temperature} °C</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                        <Scale className="w-3 h-3 text-emerald-400" /> Vazn
                      </div>
                      <div className="text-xs font-bold text-emerald-400">{rec.vitals.weight} kg</div>
                    </div>
                  </div>
                )}

                <div className="mt-3 space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium">Shikoyatlar: </span>
                    <span className="text-slate-300">{rec.complaints}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/30">
                    <div className="text-[11px] font-bold text-teal-400 uppercase tracking-wide">Tashxis:</div>
                    <div className="text-sm font-bold text-white mt-0.5">{rec.diagnosis}</div>
                  </div>

                  {rec.treatmentPlan && (
                    <div className="text-slate-300">
                      <span className="text-slate-400 font-medium">Davolash rejasi: </span>
                      {rec.treatmentPlan}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => onPrintRecord(rec)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-teal-300 rounded-xl text-xs font-medium transition cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Ko'chirma Chop Etish (Print)</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(rec)}
                    className="p-1.5 text-slate-300 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 transition cursor-pointer"
                    title="Tahrirlash"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeletingId(rec.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition cursor-pointer"
                    title="O'chirish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
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
              <h3 className="font-bold text-white text-base">Tibbiy kartani o'chirish</h3>
            </div>
            <p className="text-xs text-slate-300">
              Ushbu tibbiy ko'rik yozuvini ambulator kartadan butunlay o'chirmoqchimisiz?
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
                  await onDeleteRecord(deletingId);
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

      {/* Add / Edit Record Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <FileHeart className="w-5 h-5 text-teal-400" />
                {editingRecord ? 'Tibbiy Ko\'rikni Tahrirlash' : 'Tibbiy Ko\'rik & Tashxis Kiritish'}
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
                    value={formData.patientId}
                    onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
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
                    Qabul qilgan shifokor *
                  </label>
                  <select
                    required
                    value={formData.doctorId}
                    onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="">-- Shifokor tanlang --</option>
                    {doctors.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Ko'rik sanasi *
                </label>
                <input
                  type="date"
                  required
                  value={formData.visitDate}
                  onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              {/* Vitals */}
              <div>
                <div className="text-xs font-semibold text-teal-400 mb-2">Vital ko'rsatkichlar:</div>
                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Bosim</label>
                    <input
                      type="text"
                      placeholder="120/80"
                      value={formData.bloodPressure}
                      onChange={(e) => setFormData({ ...formData, bloodPressure: e.target.value })}
                      className="w-full px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Puls (bpm)</label>
                    <input
                      type="number"
                      value={formData.heartRate}
                      onChange={(e) => setFormData({ ...formData, heartRate: Number(e.target.value) })}
                      className="w-full px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Harorat (°C)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.temperature}
                      onChange={(e) => setFormData({ ...formData, temperature: Number(e.target.value) })}
                      className="w-full px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Vazn (kg)</label>
                    <input
                      type="number"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                      className="w-full px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Bemor shikoyatlari
                </label>
                <textarea
                  rows={2}
                  value={formData.complaints}
                  onChange={(e) => setFormData({ ...formData, complaints: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Kasallik tarixi (Anamnesis morbi)
                </label>
                <textarea
                  rows={2}
                  value={formData.anamnesis}
                  onChange={(e) => setFormData({ ...formData, anamnesis: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Klinik Tashxis *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Asosiy klinik tashxis"
                  value={formData.diagnosis}
                  onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-teal-500/50 rounded-xl text-sm text-white focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Davolash rejasi
                </label>
                <textarea
                  rows={2}
                  value={formData.treatmentPlan}
                  onChange={(e) => setFormData({ ...formData, treatmentPlan: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Tavsiyalar va rejim
                </label>
                <input
                  type="text"
                  value={formData.recommendations}
                  onChange={(e) => setFormData({ ...formData, recommendations: e.target.value })}
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
                  <span>{editingRecord ? 'O\'zgarishlarni saqlash' : 'Tashxisni saqlash'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
