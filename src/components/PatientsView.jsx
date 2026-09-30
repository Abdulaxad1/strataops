import React, { useState, useEffect } from 'react';
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  Phone,
  Heart,
  FileHeart,
  CalendarPlus,
  X,
  Check,
  ShieldAlert,
  Search,
  Activity,
  FileSpreadsheet,
  UserCheck
} from 'lucide-react';

export const PatientsView = ({
  patients = [],
  onAddPatient,
  onUpdatePatient,
  onDeletePatient,
  onOpenRecord,
  onScheduleAppointment,
  onView360,
  searchTerm = '',
  triggerAddModal = false
}) => {
  const [filterBlood, setFilterBlood] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [formError, setFormError] = useState('');

  const handleExportCsv = () => {
    const headers = ['ID', 'F.I.SH', 'Telefon', 'Tugilgan Sana', 'Jinsi', 'Qon Guruhi', 'Pasport', 'Manzil', 'Holati'];
    const rows = patients.map(p => [
      p.id,
      `"${p.fullName}"`,
      p.phone,
      p.birthDate,
      p.gender,
      p.bloodGroup,
      p.passport || '',
      `"${p.address || ''}"`,
      p.status
    ]);
    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Bemorlar_Royxati_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    gender: 'Erkak',
    phone: '+998 ',
    passport: '',
    bloodGroup: 'A+',
    address: '',
    allergies: '',
    chronicDiseases: '',
    status: 'active',
    notes: '',
    emergencyContact: ''
  });

  useEffect(() => {
    if (triggerAddModal) {
      handleOpenAdd();
    }
  }, [triggerAddModal]);

  const handleOpenAdd = () => {
    setEditingPatient(null);
    setFormError('');
    setFormData({
      fullName: '',
      birthDate: '1995-01-01',
      gender: 'Erkak',
      phone: '+998 ',
      passport: '',
      bloodGroup: 'A+',
      address: 'Toshkent sh., ',
      allergies: 'Yo\'q',
      chronicDiseases: 'Yo\'q',
      status: 'active',
      notes: '',
      emergencyContact: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (patient) => {
    setEditingPatient(patient);
    setFormError('');
    setFormData({
      fullName: patient.fullName,
      birthDate: patient.birthDate,
      gender: patient.gender,
      phone: patient.phone,
      passport: patient.passport || '',
      bloodGroup: patient.bloodGroup,
      address: patient.address,
      allergies: patient.allergies || '',
      chronicDiseases: patient.chronicDiseases || '',
      status: patient.status,
      notes: patient.notes || '',
      emergencyContact: patient.emergencyContact || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setFormError('Iltimos bemorning to\'liq F.I.SH kiriting');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 9) {
      setFormError('Iltimos to\'liq telefon raqamini kiriting');
      return;
    }
    if (!formData.birthDate) {
      setFormError('Iltimos tug\'ilgan sanani tanlang');
      return;
    }

    setFormError('');
    if (editingPatient) {
      await onUpdatePatient(editingPatient.id, formData);
    } else {
      await onAddPatient(formData);
    }
    setIsModalOpen(false);
  };

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      !searchTerm ||
      p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.includes(searchTerm) ||
      (p.passport && p.passport.toLowerCase().includes(searchTerm.toLowerCase())) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBlood = filterBlood === 'all' || p.bloodGroup === filterBlood;
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;

    return matchesSearch && matchesBlood && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-teal-400" />
            Bemorlar Bazasi (Ambulator Kartalar)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Klinikada ro'yxatdan o'tgan barcha fuqarolar, ularning anamnezi va shaxsiy kartasi
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCsv}
            className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer"
            title="Barcha bemorlar ro'yxatini Excel/CSV ga saqlash"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Excel Eksport</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-emerald-900/30 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Yangi Bemor Qo'shish</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center gap-3 p-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Qon guruhi:</span>
          <select
            value={filterBlood}
            onChange={(e) => setFilterBlood(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 text-xs focus:outline-none"
          >
            <option value="all">Barchasi</option>
            <option value="A+">A (II) Rh+</option>
            <option value="A-">A (II) Rh-</option>
            <option value="B+">B (III) Rh+</option>
            <option value="B-">B (III) Rh-</option>
            <option value="AB+">AB (IV) Rh+</option>
            <option value="AB-">AB (IV) Rh-</option>
            <option value="O+">O (I) Rh+</option>
            <option value="O-">O (I) Rh-</option>
          </select>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Holati:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 text-xs focus:outline-none"
          >
            <option value="all">Barcha holatlar</option>
            <option value="active">Ambulator (Faol)</option>
            <option value="inpatient">Statsionarda yotibdi</option>
            <option value="discharged">Chiqarilgan</option>
            <option value="consultation">Bir martalik ko'rik</option>
          </select>
        </div>

        <div className="ml-auto text-xs text-slate-400">
          Topildi: <span className="text-white font-semibold">{filteredPatients.length}</span> ta bemor
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase text-[11px] tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Bemor ID & F.I.SH</th>
                <th className="py-3 px-4">Telefon & Manzil</th>
                <th className="py-3 px-4">Qon guruhi</th>
                <th className="py-3 px-4">Allergiya / Surunkali</th>
                <th className="py-3 px-4">Holati</th>
                <th className="py-3 px-4 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    Bemorlar topilmadi. Qidiruv so'zini tekshiring yoki yangi bemor qo'shing.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white text-sm">{p.fullName}</div>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                        <span className="font-mono text-teal-400 font-semibold">{p.id}</span>
                        <span>•</span>
                        <span>{p.gender}</span>
                        <span>•</span>
                        <span>{p.birthDate}</span>
                        {p.passport && (
                          <>
                            <span>•</span>
                            <span className="font-mono">{p.passport}</span>
                          </>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 text-slate-200">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{p.phone}</span>
                      </div>
                      <div className="text-xs text-slate-400 truncate max-w-xs mt-0.5" title={p.address}>
                        {p.address}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-500/10 text-rose-300 border border-rose-500/20">
                        <Heart className="w-3 h-3 text-rose-400 fill-rose-400/30" />
                        {p.bloodGroup}
                      </span>
                    </td>

                    <td className="py-3 px-4 max-w-xs">
                      {p.allergies && p.allergies !== 'Yo\'q' ? (
                        <div className="text-rose-400 text-xs font-medium truncate" title={p.allergies}>
                          ⚠ Allergiya: {p.allergies}
                        </div>
                      ) : (
                        <div className="text-slate-400 text-xs">Allergiya yo'q</div>
                      )}
                      {p.chronicDiseases && p.chronicDiseases !== 'Yo\'q' && (
                        <div className="text-amber-400/90 text-xs truncate mt-0.5" title={p.chronicDiseases}>
                          Surunkali: {p.chronicDiseases}
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold inline-block ${
                        p.status === 'inpatient'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : p.status === 'active'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : p.status === 'discharged'
                          ? 'bg-slate-800 text-slate-400'
                          : 'bg-teal-500/20 text-teal-300'
                      }`}>
                        {p.status === 'inpatient' && 'Statsionarda'}
                        {p.status === 'active' && 'Faol'}
                        {p.status === 'discharged' && 'Chiqarilgan'}
                        {p.status === 'consultation' && 'Bir martalik'}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {onView360 && (
                          <button
                            onClick={() => onView360(p)}
                            title="Bemorning 360° to'liq dosyesi va tarixi"
                            className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500 hover:text-slate-950 transition cursor-pointer"
                          >
                            <UserCheck className="w-4 h-4" />
                          </button>
                        )}
                        {onScheduleAppointment && (
                          <button
                            onClick={() => onScheduleAppointment(p)}
                            title="Qabulga yozish"
                            className="p-1.5 rounded-lg bg-teal-500/10 text-teal-300 hover:bg-teal-500 hover:text-slate-950 transition cursor-pointer"
                          >
                            <CalendarPlus className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => onOpenRecord(p)}
                          title="Tibbiy karta ochish"
                          className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500 hover:text-white transition cursor-pointer"
                        >
                          <FileHeart className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(p)}
                          title="Tahrirlash"
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingId(p.id)}
                          title="O'chirish"
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <ShieldAlert className="w-6 h-6" />
              <h3 className="font-bold text-white text-base">Bemorni o'chirish</h3>
            </div>
            <p className="text-xs text-slate-300">
              Haqiqatan ham ushbu bemorni ma'lumotlar bazasidan butunlay o'chirmoqchimisiz? Ushbu amal ortga qaytarilmaydi.
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
                  await onDeletePatient(deletingId);
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

      {/* Add / Edit Patient Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Users className="w-5 h-5 text-teal-400" />
                {editingPatient ? 'Bemor ma\'lumotlarini tahrirlash' : 'Yangi bemorni ro\'yxatga olish'}
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
                    Bemorning F.I.SH *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Karimov Alisher Rustamovich"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Tug'ilgan sana *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Jinsi *
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="Erkak">Erkak</option>
                    <option value="Ayol">Ayol</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Telefon raqami *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+998 90 123-45-67"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Pasport seriya / JSHSHIR
                  </label>
                  <input
                    type="text"
                    placeholder="AB 1234567"
                    value={formData.passport}
                    onChange={(e) => setFormData({ ...formData, passport: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Qon guruhi (Rh) *
                  </label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="A+">A (II) Rh+</option>
                    <option value="A-">A (II) Rh-</option>
                    <option value="B+">B (III) Rh+</option>
                    <option value="B-">B (III) Rh-</option>
                    <option value="AB+">AB (IV) Rh+</option>
                    <option value="AB-">AB (IV) Rh-</option>
                    <option value="O+">O (I) Rh+</option>
                    <option value="O-">O (I) Rh-</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Klinikadagi holati
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="active">Ambulator (Faol)</option>
                    <option value="inpatient">Statsionarda</option>
                    <option value="consultation">Bir martalik</option>
                    <option value="discharged">Tugatilgan</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Yashash manzili
                  </label>
                  <input
                    type="text"
                    placeholder="Toshkent sh., Yunusobod tumani..."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Allergiya
                  </label>
                  <input
                    type="text"
                    placeholder="Penitsillin, Novokain..."
                    value={formData.allergies}
                    onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Surunkali kasalliklar
                  </label>
                  <input
                    type="text"
                    placeholder="Gipertoniya, Qandli diabet..."
                    value={formData.chronicDiseases}
                    onChange={(e) => setFormData({ ...formData, chronicDiseases: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
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
                  <span>{editingPatient ? 'O\'zgarishlarni saqlash' : 'Bemor sifatida ro\'yxatga olish'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
