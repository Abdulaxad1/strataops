import React, { useState, useEffect } from 'react';
import {
  CalendarClock,
  Plus,
  Clock,
  PlayCircle,
  CheckCircle2,
  Trash2,
  Printer,
  X,
  Check,
  ShieldAlert,
  Calendar,
  User,
  Stethoscope
} from 'lucide-react';

export const AppointmentsView = ({
  appointments = [],
  doctors = [],
  patients = [],
  onCreateAppointment,
  onUpdateStatus,
  onDeleteAppointment,
  onPrintTicket,
  searchTerm = '',
  preselectedPatient = null,
  preselectedDoctor = null,
  triggerAddModal = false
}) => {
  const [selectedDoctorId, setSelectedDoctorId] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [formError, setFormError] = useState('');

  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '09:30',
    type: 'consultation',
    complaint: ''
  });

  useEffect(() => {
    if (triggerAddModal || preselectedPatient || preselectedDoctor) {
      handleOpenAdd(preselectedPatient?.id, preselectedDoctor?.id);
    }
  }, [triggerAddModal, preselectedPatient, preselectedDoctor]);

  const handleOpenAdd = (pId, dId) => {
    setFormError('');
    setFormData({
      patientId: pId || patients[0]?.id || '',
      doctorId: dId || doctors[0]?.id || '',
      date: selectedDate || new Date().toISOString().split('T')[0],
      timeSlot: '10:00',
      type: 'consultation',
      complaint: ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const patient = patients.find(p => p.id === formData.patientId);
    const doctor = doctors.find(d => d.id === formData.doctorId);

    if (!patient) {
      setFormError('Iltimos bemorni tanlang');
      return;
    }
    if (!doctor) {
      setFormError('Iltimos qabul qiluvchi shifokorni tanlang');
      return;
    }

    setFormError('');
    await onCreateAppointment({
      patientId: patient.id,
      patientName: patient.fullName,
      patientPhone: patient.phone,
      doctorId: doctor.id,
      doctorName: doctor.name,
      department: doctor.specialty,
      date: formData.date,
      timeSlot: formData.timeSlot,
      type: formData.type,
      status: 'pending',
      complaint: formData.complaint || 'Dastlabki shifokor ko\'rigi',
      room: doctor.room
    });

    setIsModalOpen(false);
  };

  const filteredAppointments = appointments.filter((a) => {
    const matchesSearch =
      !searchTerm ||
      a.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.patientPhone.includes(searchTerm);

    const matchesDoctor = selectedDoctorId === 'all' || a.doctorId === selectedDoctorId;
    const matchesStatus = selectedStatus === 'all' || a.status === selectedStatus;
    const matchesDate = !selectedDate || a.date === selectedDate;

    return matchesSearch && matchesDoctor && matchesStatus && matchesDate;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CalendarClock className="w-6 h-6 text-teal-400" />
            Qabullar & Jonli Navbat Tizimi
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Kunlik shifokorlar grafigi, elektron navbat kuponlari va bemorlar qabuli holati
          </p>
        </div>

        <button
          onClick={() => handleOpenAdd()}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-500 active:scale-95 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-teal-900/30 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi Qabulga Yozish</span>
        </button>
      </div>

      {/* Control Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 p-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Sana:</span>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 text-xs focus:outline-none"
          />
          <button
            onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
            className="px-2 py-1 text-[11px] font-semibold bg-teal-500/20 text-teal-300 rounded border border-teal-500/30 hover:bg-teal-500/30 transition cursor-pointer"
          >
            Bugun
          </button>
          {selectedDate && (
            <button
              onClick={() => setSelectedDate('')}
              className="text-[11px] text-slate-400 hover:text-white"
              title="Barcha sanalarni ko'rsatish"
            >
              Barchasi
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Shifokor:</span>
          <select
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 text-xs focus:outline-none max-w-[200px] truncate"
          >
            <option value="all">Barcha shifokorlar</option>
            {doctors.map(d => (
              <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Holati:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 text-xs focus:outline-none"
          >
            <option value="all">Barchasi</option>
            <option value="pending">Kutilmoqda (Navbatda)</option>
            <option value="in_progress">Qabulda (Hozir)</option>
            <option value="completed">Yakunlandi</option>
            <option value="cancelled">Bekor qilindi</option>
          </select>
        </div>

        <div className="ml-auto text-xs text-slate-400">
          Rejada: <span className="text-white font-semibold">{filteredAppointments.length}</span> ta qabul
        </div>
      </div>

      {/* Queue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAppointments.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-400 bg-slate-900/50 rounded-2xl border border-slate-800">
            Tanlangan parametrlar bo'yicha qabullar mavjud emas. Yangi qabul qo'shishingiz mumkin.
          </div>
        ) : (
          filteredAppointments.map((app) => (
            <div
              key={app.id}
              className={`p-5 rounded-2xl border transition-all shadow-md relative overflow-hidden flex flex-col justify-between ${
                app.status === 'in_progress'
                  ? 'bg-gradient-to-b from-teal-950/60 to-slate-900 border-teal-500/50 ring-1 ring-teal-500/30'
                  : app.status === 'completed'
                  ? 'bg-slate-900/40 border-slate-800/80 opacity-80'
                  : app.status === 'cancelled'
                  ? 'bg-slate-900/30 border-rose-900/30 opacity-70'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400 font-bold flex items-center justify-center text-sm">
                      #{app.queueNumber}
                    </span>
                    <span className="text-xs font-mono font-semibold text-slate-200 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {app.timeSlot}
                    </span>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                    app.status === 'in_progress'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : app.status === 'completed'
                      ? 'bg-slate-800 text-slate-400'
                      : app.status === 'cancelled'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {app.status === 'in_progress' && 'Hozir qabulda'}
                    {app.status === 'pending' && 'Kutilmoqda'}
                    {app.status === 'completed' && 'Yakunlangan'}
                    {app.status === 'cancelled' && 'Bekor'}
                  </span>
                </div>

                <div className="mt-3 space-y-2">
                  <div>
                    <div className="text-xs text-slate-400">Bemor:</div>
                    <div className="font-semibold text-white text-sm">{app.patientName}</div>
                    <div className="text-xs text-slate-400">{app.patientPhone}</div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/60">
                    <div className="text-xs text-slate-400">Shifokor:</div>
                    <div className="text-sm font-medium text-teal-300">{app.doctorName}</div>
                    <div className="text-xs text-slate-400 flex items-center gap-2">
                      <span>{app.department}</span>
                      <span>•</span>
                      <span className="text-slate-300 font-semibold">{app.room}</span>
                    </div>
                  </div>

                  {app.complaint && (
                    <div className="text-xs text-slate-300 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                      <span className="text-slate-400">Shikoyat: </span>
                      {app.complaint}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {app.status === 'pending' && (
                    <button
                      onClick={() => onUpdateStatus(app.id, 'in_progress')}
                      className="flex items-center gap-1 px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition cursor-pointer"
                    >
                      <PlayCircle className="w-3.5 h-3.5" />
                      <span>Boshlash</span>
                    </button>
                  )}

                  {app.status === 'in_progress' && (
                    <button
                      onClick={() => onUpdateStatus(app.id, 'completed')}
                      className="flex items-center gap-1 px-2.5 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold transition cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Yakunlash</span>
                    </button>
                  )}

                  {app.status !== 'cancelled' && app.status !== 'completed' && (
                    <button
                      onClick={() => onUpdateStatus(app.id, 'cancelled')}
                      className="px-2 py-1.5 text-xs text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition cursor-pointer"
                      title="Qabulni bekor qilish"
                    >
                      Bekor
                    </button>
                  )}

                  {/* Print Queue Ticket Button */}
                  {onPrintTicket && (
                    <button
                      onClick={() => onPrintTicket(app)}
                      className="flex items-center gap-1 p-1.5 text-teal-300 hover:text-white rounded-lg bg-teal-500/10 hover:bg-teal-500/30 transition cursor-pointer text-xs"
                      title="Navbat kuponini chop etish"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Kupon</span>
                    </button>
                  )}
                </div>

                <button
                  onClick={() => setDeletingId(app.id)}
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
              <h3 className="font-bold text-white text-base">Qabulni o'chirish</h3>
            </div>
            <p className="text-xs text-slate-300">
              Ushbu qabul yozuvini va navbat kuponini o'chirib tashlamoqchimisiz?
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
                  await onDeleteAppointment(deletingId);
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

      {/* New Appointment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <CalendarClock className="w-5 h-5 text-teal-400" />
                Yangi Qabulga Yozish (Elektron Navbat)
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {formError && (
                <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

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
                    <option key={p.id} value={p.id}>{p.fullName} ({p.phone})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Shifokorni tanlang *
                </label>
                <select
                  required
                  value={formData.doctorId}
                  onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="">-- Shifokor tanlang --</option>
                  {doctors.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.name} — {d.specialty} ({d.room})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Qabul sanasi *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Vaqt oralig'i *
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="08:30">08:30</option>
                    <option value="09:00">09:00</option>
                    <option value="09:30">09:30</option>
                    <option value="10:00">10:00</option>
                    <option value="10:30">10:30</option>
                    <option value="11:00">11:00</option>
                    <option value="11:30">11:30</option>
                    <option value="14:00">14:00</option>
                    <option value="14:30">14:30</option>
                    <option value="15:00">15:00</option>
                    <option value="15:30">15:30</option>
                    <option value="16:00">16:00</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Qabul turi
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="consultation">Birlamchi konsultatsiya</option>
                  <option value="followup">Qayta ko'rik (nazorat)</option>
                  <option value="procedure">Muolaja / Bandaj</option>
                  <option value="emergency">Shoshilinch ko'rik</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Dastlabki shikoyat / sabab
                </label>
                <input
                  type="text"
                  placeholder="Masalan: Yurak sohasida sanchiq, holsizlik..."
                  value={formData.complaint}
                  onChange={(e) => setFormData({ ...formData, complaint: e.target.value })}
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
                  <span>Qabulga Yozish va Kupon Berish</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
