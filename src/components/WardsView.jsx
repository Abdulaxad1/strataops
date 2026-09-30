import React, { useState } from 'react';
import {
  BedDouble,
  Plus,
  UserCheck,
  UserMinus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Clock,
  X,
  Check,
  ShieldAlert
} from 'lucide-react';

export const WardsView = ({
  wards = [],
  patients = [],
  doctors = [],
  onCreateWard,
  onAdmitPatient,
  onDischargePatient,
  onDeleteWard,
  searchTerm = ''
}) => {
  const [isAddWardOpen, setIsAddWardOpen] = useState(false);
  const [isAdmitOpen, setIsAdmitOpen] = useState(false);
  const [selectedWardForAdmit, setSelectedWardForAdmit] = useState(null);
  const [deletingWardId, setDeletingWardId] = useState(null);
  const [admitError, setAdmitError] = useState('');

  // New Ward Form
  const [roomNumber, setRoomNumber] = useState('Palata 205');
  const [floor, setFloor] = useState(2);
  const [wardType, setWardType] = useState('Standart');
  const [totalBeds, setTotalBeds] = useState(2);
  const [dailyRate, setDailyRate] = useState(180000);
  const [amenitiesStr, setAmenitiesStr] = useState('Konditsioner, Wi-Fi, Dush, Televizor');

  // Admit Form
  const [patientId, setPatientId] = useState('');
  const [attendingDoctor, setAttendingDoctor] = useState('');
  const [diagnosis, setDiagnosis] = useState('');

  const handleOpenAdmit = (ward) => {
    setSelectedWardForAdmit(ward);
    setAdmitError('');
    setPatientId(patients[0]?.id || '');
    setAttendingDoctor(doctors[0]?.name || 'Navbatchi shifokor');
    setDiagnosis('Rejali statsionar davolanish');
    setIsAdmitOpen(true);
  };

  const handleAdmitSubmit = async (e) => {
    e.preventDefault();
    if (!selectedWardForAdmit) return;
    const p = patients.find(pat => pat.id === patientId);
    if (!p) {
      setAdmitError('Iltimos bemorni tanlang');
      return;
    }

    setAdmitError('');
    await onAdmitPatient(selectedWardForAdmit.id, {
      patientId: p.id,
      patientName: p.fullName,
      attendingDoctor: attendingDoctor || 'Navbatchi shifokor',
      diagnosis: diagnosis || 'Statsionar kuzatuv'
    });

    setIsAdmitOpen(false);
  };

  const handleAddWardSubmit = async (e) => {
    e.preventDefault();
    await onCreateWard({
      roomNumber,
      floor: Number(floor),
      wardType,
      totalBeds: Number(totalBeds),
      dailyRate: Number(dailyRate),
      amenities: amenitiesStr.split(',').map(s => s.trim()).filter(Boolean)
    });

    setIsAddWardOpen(false);
  };

  const filteredWards = wards.filter(w => {
    return (
      !searchTerm ||
      w.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.wardType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.patients.some(p => p.patientName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BedDouble className="w-6 h-6 text-teal-400" />
            Statsionar Palatalar & Yotoq O'rinlari
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Klinika statsionar bo'limidagi xonalar, bemorlarni yotqizish va chiqarish monitoringi
          </p>
        </div>

        <button
          onClick={() => setIsAddWardOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-500 active:scale-95 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-teal-900/30 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi Palata Qo'shish</span>
        </button>
      </div>

      {/* Ward Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredWards.map((w) => {
          const isFull = w.occupiedBeds >= w.totalBeds;
          const availableBeds = Math.max(0, w.totalBeds - w.occupiedBeds);

          return (
            <div
              key={w.id}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/40 transition-all shadow-md flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between pb-3 border-b border-slate-800/80">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-lg">{w.roomNumber}</h3>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 font-semibold">
                        {w.wardType}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {w.floor}-qavat • Kunlik stavka: <strong className="text-emerald-400">{w.dailyRate?.toLocaleString()} so'm/kun</strong>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      isFull
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {w.occupiedBeds} / {w.totalBeds} band
                    </span>
                  </div>
                </div>

                {/* Amenities pills */}
                {w.amenities && w.amenities.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {w.amenities.map((am, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60">
                        {am}
                      </span>
                    ))}
                  </div>
                )}

                {/* Admitted Patients List */}
                <div className="mt-4 space-y-2">
                  <div className="text-xs font-semibold text-slate-400">Yotgan bemorlar:</div>

                  {w.patients && w.patients.length > 0 ? (
                    w.patients.map((p, idx) => (
                      <div
                        key={p.patientId || idx}
                        className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/90 flex items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="font-semibold text-white flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center text-[10px] font-bold">
                              #{p.bedNumber}
                            </span>
                            <span>{p.patientName}</span>
                          </div>
                          <div className="text-[11px] text-slate-400 mt-1">
                            Shifokor: {p.attendingDoctor} • Yotqizilgan: {p.admittedDate}
                          </div>
                          {p.diagnosis && (
                            <div className="text-[11px] text-slate-400 italic mt-0.5">
                              Tashxis: {p.diagnosis}
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => onDischargePatient(w.id, p.patientId)}
                          className="flex items-center gap-1 px-2.5 py-1.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 rounded-lg text-xs font-medium transition cursor-pointer"
                          title="Bemor statsionardan chiqarilsin"
                        >
                          <UserMinus className="w-3.5 h-3.5" />
                          <span>Chiqarish</span>
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 bg-slate-950/40 rounded-xl border border-dashed border-slate-800 text-xs text-slate-500 text-center">
                      Hozirda barcha {w.totalBeds} ta o'rin bo'sh
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                {!isFull ? (
                  <button
                    onClick={() => handleOpenAdmit(w)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-xl text-xs font-semibold transition cursor-pointer"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Bemor Yotqizish ({availableBeds} ta bo'sh)</span>
                  </button>
                ) : (
                  <span className="text-xs text-rose-400 font-semibold">
                    Palata to'liq band
                  </span>
                )}

                <button
                  onClick={() => setDeletingWardId(w.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition cursor-pointer"
                  title="Palatani o'chirish"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Delete Ward Confirmation Modal */}
      {deletingWardId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <ShieldAlert className="w-6 h-6" />
              <h3 className="font-bold text-white text-base">Palatani o'chirish</h3>
            </div>
            <p className="text-xs text-slate-300">
              Ushbu statsionar palatani va unga tegishli o'rinlar hisobini o'chirmoqchimisiz?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeletingWardId(null)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer"
              >
                Bekor qilish
              </button>
              <button
                onClick={async () => {
                  await onDeleteWard(deletingWardId);
                  setDeletingWardId(null);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition cursor-pointer"
              >
                Ha, o'chirilsin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admit Patient Modal */}
      {isAdmitOpen && selectedWardForAdmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-teal-400" />
                Bemorni Palataga Yotqizish ({selectedWardForAdmit.roomNumber})
              </h3>
              <button onClick={() => setIsAdmitOpen(false)} className="text-slate-400 hover:text-white p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdmitSubmit} className="p-6 space-y-4">
              {admitError && (
                <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                  <span>{admitError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Yotqiziladigan bemor *
                </label>
                <select
                  required
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="">-- Bemor tanlang --</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.fullName} ({p.phone})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Davolovchi shifokor
                </label>
                <select
                  value={attendingDoctor}
                  onChange={(e) => setAttendingDoctor(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                >
                  {doctors.map(d => (
                    <option key={d.id} value={d.name}>{d.name} ({d.specialty})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Yotqizish tashxisi / ko'rsatma
                </label>
                <input
                  type="text"
                  placeholder="Klinik tashxis yoki reja..."
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAdmitOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Statsionarga Qabul Qilish</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Ward Modal */}
      {isAddWardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <BedDouble className="w-5 h-5 text-teal-400" />
                Yangi Statsionar Palata Qo'shish
              </h3>
              <button onClick={() => setIsAddWardOpen(false)} className="text-slate-400 hover:text-white p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddWardSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Palata / Xona raqami *
                  </label>
                  <input
                    type="text"
                    required
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Qavat (Etaj)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={floor}
                    onChange={(e) => setFloor(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Palata toifasi
                  </label>
                  <select
                    value={wardType}
                    onChange={(e) => setWardType(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="Standart">Standart</option>
                    <option value="VIP / Lyuks">VIP / Lyuks</option>
                    <option value="Reanimatsiya / ITB">Reanimatsiya / ITB</option>
                    <option value="Pediatriya">Pediatriya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Yotoq o'rinlari soni *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="8"
                    value={totalBeds}
                    onChange={(e) => setTotalBeds(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Kunlik turar joy narxi (so'm/kun) *
                </label>
                <input
                  type="number"
                  step="10000"
                  value={dailyRate}
                  onChange={(e) => setDailyRate(Number(e.target.value))}
                  className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Qulayliklar (vergul bilan ajrating)
                </label>
                <input
                  type="text"
                  value={amenitiesStr}
                  onChange={(e) => setAmenitiesStr(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddWardOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow-md transition cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Palatani Saqlash</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
