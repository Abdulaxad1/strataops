import React, { useState } from 'react';
import {
  Stethoscope,
  Plus,
  Star,
  Phone,
  Clock,
  DoorOpen,
  Edit2,
  Trash2,
  CalendarPlus,
  ToggleLeft,
  ToggleRight,
  Check,
  X,
  ShieldAlert
} from 'lucide-react';

export const DoctorsView = ({
  doctors = [],
  onAddDoctor,
  onUpdateDoctor,
  onDeleteDoctor,
  onScheduleForDoctor,
  searchTerm = ''
}) => {
  const [filterSpecialty, setFilterSpecialty] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [formError, setFormError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    specialty: 'Kardiolog',
    qualification: 'Oliy toifali shifokor',
    experienceYears: 10,
    phone: '+998 ',
    email: '',
    room: 'Xona 101',
    workHours: '08:30 - 16:00',
    consultationFee: 150000,
    avatar: '',
    status: 'active'
  });

  const handleOpenAdd = () => {
    setEditingDoctor(null);
    setFormError('');
    setFormData({
      name: '',
      specialty: 'Kardiolog',
      qualification: 'Oliy toifali shifokor',
      experienceYears: 10,
      phone: '+998 90 ',
      email: 'doctor@shifomed.uz',
      room: 'Xona 201',
      workHours: '09:00 - 16:00',
      consultationFee: 150000,
      avatar: '/src/assets/images/doctor_surgeon_avatar_1790262450169.jpg',
      status: 'active'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (doc) => {
    setEditingDoctor(doc);
    setFormError('');
    setFormData({
      name: doc.name,
      specialty: doc.specialty,
      qualification: doc.qualification,
      experienceYears: doc.experienceYears,
      phone: doc.phone,
      email: doc.email,
      room: doc.room,
      workHours: doc.workHours,
      consultationFee: doc.consultationFee,
      avatar: doc.avatar,
      status: doc.status
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError('Iltimos shifokor ism-sharifini kiriting');
      return;
    }
    if (!formData.room.trim()) {
      setFormError('Iltimos qabul xonasini kiriting');
      return;
    }

    setFormError('');
    if (editingDoctor) {
      await onUpdateDoctor(editingDoctor.id, formData);
    } else {
      await onAddDoctor(formData);
    }
    setIsModalOpen(false);
  };

  const handleToggleStatus = async (doc) => {
    const nextStatus = doc.status === 'active' ? 'on_leave' : 'active';
    await onUpdateDoctor(doc.id, { status: nextStatus });
  };

  const filteredDoctors = doctors.filter((d) => {
    const matchesSearch =
      !searchTerm ||
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.phone.includes(searchTerm);

    const matchesSpecialty = filterSpecialty === 'all' || d.specialty === filterSpecialty;

    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-teal-400" />
            Shifokorlar & Tibbiy Mutaxassislar
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Klinikamizning yetakchi shifokorlari, ularning qabul xonalari va konsultatsiya tariflari
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-500 active:scale-95 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-teal-900/30 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi Shifokor Qo'shish</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between p-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Mutaxassislik bo'yicha:</span>
          <select
            value={filterSpecialty}
            onChange={(e) => setFilterSpecialty(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 text-xs focus:outline-none"
          >
            <option value="all">Barcha sohalar</option>
            <option value="Kardiolog">Kardiolog</option>
            <option value="Umumiy jarroh">Umumiy jarroh</option>
            <option value="Nevropatolog">Nevropatolog</option>
            <option value="Pediatr">Pediatr</option>
            <option value="Terapevt">Terapevt</option>
            <option value="UZI / Rentgenolog">UZI / Rentgenolog</option>
          </select>
        </div>

        <div className="text-xs text-slate-400">
          Jami: <span className="text-white font-semibold">{filteredDoctors.length}</span> nafar shifokor
        </div>
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-slate-900/80 border border-slate-800 hover:border-teal-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all shadow-md group relative overflow-hidden"
          >
            <div>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-800 border-2 border-teal-500/40 flex-shrink-0 shadow-md">
                  <img
                    src={doc.avatar || '/src/assets/images/doctor_surgeon_avatar_1790262450169.jpg'}
                    alt={doc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = '/src/assets/images/doctor_surgeon_avatar_1790262450169.jpg';
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-400">
                      {doc.specialty}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{doc.rating || 4.9}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-white text-base leading-snug mt-0.5 truncate" title={doc.name}>
                    {doc.name}
                  </h3>

                  <div className="text-xs text-slate-400 truncate mt-0.5">
                    {doc.qualification}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                  <div className="text-slate-400 text-[11px]">Tajriba:</div>
                  <div className="font-semibold text-white">{doc.experienceYears} yil staj</div>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                  <div className="text-slate-400 text-[11px]">Qabul narxi:</div>
                  <div className="font-semibold text-emerald-400">{doc.consultationFee?.toLocaleString()} so'm</div>
                </div>
              </div>

              <div className="mt-3 space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <DoorOpen className="w-3.5 h-3.5 text-slate-400" />
                  <span>Xona: <strong className="text-white">{doc.room}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Ish vaqti: <strong className="text-slate-200">{doc.workHours}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{doc.phone}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <button
                onClick={() => handleToggleStatus(doc)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition cursor-pointer flex items-center gap-1 ${
                  doc.status === 'active'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30'
                }`}
                title="Holatni o'zgartirish (Faol / Ta'tilda)"
              >
                <span className={`w-2 h-2 rounded-full ${doc.status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                <span>{doc.status === 'active' ? 'Qabul ochiq' : 'Ta\'tilda'}</span>
              </button>

              <div className="flex items-center gap-1.5">
                {onScheduleForDoctor && (
                  <button
                    onClick={() => onScheduleForDoctor(doc)}
                    className="p-1.5 rounded-lg bg-teal-500/10 text-teal-300 hover:bg-teal-500 hover:text-slate-950 transition cursor-pointer"
                    title="Shifokorga qabul yozish"
                  >
                    <CalendarPlus className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => handleOpenEdit(doc)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition cursor-pointer"
                  title="Tahrirlash"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeletingId(doc.id)}
                  className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:text-white hover:bg-rose-500 transition cursor-pointer"
                  title="O'chirish"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <ShieldAlert className="w-6 h-6" />
              <h3 className="font-bold text-white text-base">Shifokorni o'chirish</h3>
            </div>
            <p className="text-xs text-slate-300">
              Ushbu shifokorni xodimlar ro'yxatidan butunlay o'chirmoqchimisiz?
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
                  await onDeleteDoctor(deletingId);
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

      {/* Add / Edit Doctor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-teal-400" />
                {editingDoctor ? 'Shifokor ma\'lumotlarini tahrirlash' : 'Yangi Shifokor Kiritish'}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Shifokorning to'liq F.I.SH *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Dr. Qodirov Jahongir Anvarovich"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Mutaxassisligi *
                  </label>
                  <select
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="Kardiolog">Kardiolog</option>
                    <option value="Umumiy jarroh">Umumiy jarroh</option>
                    <option value="Nevropatolog">Nevropatolog</option>
                    <option value="Pediatr">Pediatr</option>
                    <option value="Terapevt">Terapevt</option>
                    <option value="UZI / Rentgenolog">UZI / Rentgenolog</option>
                    <option value="Oftalmolog">Oftalmolog</option>
                    <option value="Stomatolog">Stomatolog</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Malaka / Ilmiy darajasi
                  </label>
                  <input
                    type="text"
                    placeholder="Oliy toifali shifokor, t.f.n"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Qabul xonasi (Kabinet) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Xona 204"
                    value={formData.room}
                    onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Ish tajribasi (Yil)
                  </label>
                  <input
                    type="number"
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Ish vaqti grafigi
                  </label>
                  <input
                    type="text"
                    placeholder="09:00 - 17:00"
                    value={formData.workHours}
                    onChange={(e) => setFormData({ ...formData, workHours: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Konsultatsiya to'lovi (so'm)
                  </label>
                  <input
                    type="number"
                    step="10000"
                    value={formData.consultationFee}
                    onChange={(e) => setFormData({ ...formData, consultationFee: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Telefon raqami
                  </label>
                  <input
                    type="text"
                    placeholder="+998 90 123-45-67"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Holati
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="active">Qabul ochiq (Faol)</option>
                    <option value="on_leave">Ta'tilda</option>
                  </select>
                </div>
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
                  <span>{editingDoctor ? 'O\'zgarishlarni saqlash' : 'Shifokorni qo\'shish'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
