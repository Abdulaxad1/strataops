import React, { useState } from 'react';
import {
  BadgeDollarSign,
  Plus,
  Clock,
  Edit2,
  Trash2,
  Check,
  X,
  Search,
  Activity,
  ShieldAlert
} from 'lucide-react';

export const ServicesView = ({
  services = [],
  onCreateService,
  onUpdateService,
  onDeleteService,
  searchTerm = ''
}) => {
  const [filterCategory, setFilterCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [formError, setFormError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    category: 'Konsultatsiya',
    price: 150000,
    durationMinutes: 30,
    description: '',
    isActive: true
  });

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormError('');
    setFormData({
      name: '',
      category: 'Konsultatsiya',
      price: 150000,
      durationMinutes: 30,
      description: 'Mutaxassis ko\'rigi va tavsiyalar',
      isActive: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (srv) => {
    setEditingService(srv);
    setFormError('');
    setFormData({ ...srv });
    setIsModalOpen(true);
  };

  const handleToggleActive = async (srv) => {
    await onUpdateService(srv.id, { isActive: !srv.isActive });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError('Iltimos xizmat nomini kiriting');
      return;
    }
    if (formData.price <= 0) {
      setFormError('Iltimos xizmat narxini to\'g\'ri kiriting');
      return;
    }

    setFormError('');
    if (editingService) {
      await onUpdateService(editingService.id, formData);
    } else {
      await onCreateService(formData);
    }
    setIsModalOpen(false);
  };

  const filteredServices = services.filter((s) => {
    const matchesSearch =
      !searchTerm ||
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.code && s.code.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCat = filterCategory === 'all' || s.category === filterCategory;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BadgeDollarSign className="w-6 h-6 text-teal-400" />
            Tibbiy Xizmatlar & Narxnoma (Preyskurant)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Klinikamizda ko'rsatiladigan barcha tibbiy xizmatlar, davomiyligi va rasmiy tariflari
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-500 active:scale-95 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-teal-900/30 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi Xizmat Qo'shish</span>
        </button>
      </div>

      {/* Filter toolbar */}
      <div className="flex items-center justify-between p-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Kategoriya:</span>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 text-xs focus:outline-none"
          >
            <option value="all">Barchasi</option>
            <option value="Konsultatsiya">Konsultatsiya</option>
            <option value="Diagnostika">Diagnostika (UZI, EKG, Lab)</option>
            <option value="Muolaja">Muolaja va muolajalar</option>
            <option value="Jarrohlik">Jarrohlik</option>
            <option value="Stomatologiya">Stomatologiya</option>
          </select>
        </div>

        <div className="text-xs text-slate-400">
          Jami: <span className="text-white font-semibold">{filteredServices.length}</span> ta xizmat
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredServices.map((srv) => (
          <div
            key={srv.id}
            className={`p-5 rounded-2xl border transition-all shadow-md flex flex-col justify-between ${
              srv.isActive
                ? 'bg-slate-900/80 border-slate-800 hover:border-teal-500/40'
                : 'bg-slate-900/40 border-slate-800/60 opacity-60'
            }`}
          >
            <div>
              <div className="flex items-start justify-between pb-3 border-b border-slate-800/80">
                <span className="font-mono text-xs font-bold text-teal-400">{srv.code || 'SRV'}</span>
                <button
                  onClick={() => handleToggleActive(srv)}
                  className={`text-[11px] px-2 py-0.5 rounded-full font-medium transition cursor-pointer border ${
                    srv.isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                  title="Xizmat faolligini o'zgartirish"
                >
                  {srv.isActive ? 'Faol tarif' : 'Nofaol'}
                </button>
              </div>

              <h3 className="font-bold text-white text-base mt-2">{srv.name}</h3>
              <div className="text-[11px] text-teal-400 font-medium mt-0.5">{srv.category}</div>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{srv.description}</p>

              <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-800/60">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{srv.durationMinutes} daqiqa</span>
                </div>

                <div className="text-base font-bold text-emerald-400">
                  {srv.price?.toLocaleString()} <span className="text-xs font-normal text-slate-400">so'm</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-end gap-1.5">
              <button
                onClick={() => handleOpenEdit(srv)}
                className="p-1.5 text-slate-300 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 transition cursor-pointer"
                title="Tahrirlash"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeletingId(srv.id)}
                className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition cursor-pointer"
                title="O'chirish"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Service Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <ShieldAlert className="w-6 h-6" />
              <h3 className="font-bold text-white text-base">Xizmatni o'chirish</h3>
            </div>
            <p className="text-xs text-slate-300">
              Ushbu xizmatni klinika preyskurantidan o'chirmoqchimisiz?
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
                  await onDeleteService(deletingId);
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

      {/* Add / Edit Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
              <h3 className="font-bold text-white text-base">
                {editingService ? 'Xizmat tarifini yangilash' : 'Preyskurantga yangi xizmat qo\'shish'}
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
                  Xizmat nomi *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Qorin bo'shlig'i a'zolari UZI tekshiruvi"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Kategoriya
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="Konsultatsiya">Konsultatsiya</option>
                    <option value="Diagnostika">Diagnostika</option>
                    <option value="Muolaja">Muolaja</option>
                    <option value="Jarrohlik">Jarrohlik</option>
                    <option value="Stomatologiya">Stomatologiya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Davomiyligi (daqiqa)
                  </label>
                  <input
                    type="number"
                    value={formData.durationMinutes}
                    onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Xizmat narxi (so'm) *
                </label>
                <input
                  type="number"
                  step="5000"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Tavsif
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                  <span>{editingService ? 'O\'zgarishlarni saqlash' : 'Preyskurantga kiritish'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
