import React, { useState } from 'react';
import {
  Pill,
  Plus,
  AlertTriangle,
  Package,
  Calendar,
  DollarSign,
  Search,
  Trash2,
  Edit2,
  X,
  Check,
  ShieldAlert,
  TrendingDown,
  ArrowUp
} from 'lucide-react';

export const PharmacyView = ({
  inventory = [],
  onCreateItem,
  onUpdateItem,
  onDeleteItem,
  searchTerm = ''
}) => {
  const [filterCategory, setFilterCategory] = useState('all');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [formError, setFormError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Antibiotik',
    manufacturer: 'Nobel Pharmsanoat',
    batchNumber: 'BT-2026',
    stockQuantity: 50,
    minThreshold: 15,
    unit: 'quti',
    unitCost: 20000,
    salePrice: 30000,
    expiryDate: '2027-12-31',
    supplier: 'Grand Pharm MChJ'
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormError('');
    setFormData({
      name: '',
      category: 'Antibiotik',
      manufacturer: 'Nobel Pharmsanoat',
      batchNumber: `BT-${Math.floor(1000 + Math.random() * 9000)}`,
      stockQuantity: 50,
      minThreshold: 15,
      unit: 'quti',
      unitCost: 25000,
      salePrice: 35000,
      expiryDate: '2028-06-30',
      supplier: 'Grand Pharm MChJ'
    });
    setIsAddOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormError('');
    setFormData({ ...item });
    setIsAddOpen(true);
  };

  const handleQuickRestock = async (item, amount) => {
    const updatedQty = (item.stockQuantity || 0) + amount;
    await onUpdateItem(item.id, { stockQuantity: updatedQty });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError('Iltimos preparat nomini kiriting');
      return;
    }
    if (formData.stockQuantity < 0) {
      setFormError('Qoldiq zaxira miqdori noldan kichik bo\'lishi mumkin emas');
      return;
    }

    setFormError('');
    if (editingItem) {
      await onUpdateItem(editingItem.id, formData);
    } else {
      await onCreateItem(formData);
    }
    setIsAddOpen(false);
  };

  const filteredItems = inventory.filter((item) => {
    const matchesSearch =
      !searchTerm ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.batchNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCat = filterCategory === 'all' || item.category === filterCategory;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Pill className="w-6 h-6 text-teal-400" />
            Dorixona & Tibbiy Ombor Zaxirasi
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Dori-darmonlar va bir martalik tibbiy buyumlar qoldig'i, yaroqlilik muddatlari va partiyalari
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-500 active:scale-95 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-teal-900/30 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi Preparat Kiritish</span>
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
            <option value="Antibiotik">Antibiotik</option>
            <option value="Kardiologik">Kardiologik</option>
            <option value="Og'riqsizlantiruvchi">Og'riqsizlantiruvchi</option>
            <option value="Vitaminlar">Vitaminlar</option>
            <option value="Shprits & Sarflov">Shprits & Sarflov</option>
            <option value="Antiseptik">Antiseptik</option>
          </select>
        </div>

        <div className="text-xs text-slate-400">
          Ombordagi nomlar: <span className="text-white font-semibold">{filteredItems.length}</span> xil
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase text-[11px] tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Dori vositasi & Partiya</th>
                <th className="py-3 px-4">Kategoriya</th>
                <th className="py-3 px-4">Qoldiq Zaxira</th>
                <th className="py-3 px-4">Xarid / Sotuv narxi</th>
                <th className="py-3 px-4">Yaroqlilik muddati</th>
                <th className="py-3 px-4 text-right">Amallar & Kirim</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filteredItems.map((item) => {
                const isLow = item.stockQuantity <= item.minThreshold;
                return (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition">
                    
                    {/* Name & Batch */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">{item.name}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                        <span className="font-mono text-teal-400 font-semibold">{item.batchNumber}</span>
                        <span>•</span>
                        <span>{item.manufacturer}</span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-slate-800 text-slate-300 border border-slate-700 font-medium">
                        {item.category}
                      </span>
                    </td>

                    {/* Stock */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-sm ${isLow ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {item.stockQuantity} {item.unit}
                        </span>
                        {isLow && (
                          <span className="flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                            <AlertTriangle className="w-3 h-3" />
                            Kam qoldi!
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500">Min. chegara: {item.minThreshold} {item.unit}</div>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 text-xs">
                      <div className="text-slate-200 font-semibold">{item.salePrice?.toLocaleString()} so'm</div>
                      <div className="text-slate-500 text-[11px]">Xarid: {item.unitCost?.toLocaleString()} so'm</div>
                    </td>

                    {/* Expiry */}
                    <td className="py-3 px-4 text-xs font-mono text-slate-300">
                      {item.expiryDate}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Quick restock buttons */}
                        <button
                          onClick={() => handleQuickRestock(item, 10)}
                          className="px-2 py-1 text-[11px] font-semibold bg-teal-500/10 hover:bg-teal-500/30 text-teal-300 rounded border border-teal-500/30 transition cursor-pointer"
                          title="Zaxiraga +10 dona qo'shish"
                        >
                          +10
                        </button>
                        <button
                          onClick={() => handleQuickRestock(item, 50)}
                          className="px-2 py-1 text-[11px] font-semibold bg-teal-500/10 hover:bg-teal-500/30 text-teal-300 rounded border border-teal-500/30 transition cursor-pointer"
                          title="Zaxiraga +50 dona qo'shish"
                        >
                          +50
                        </button>

                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 text-slate-300 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 transition cursor-pointer"
                          title="Tahrirlash"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingId(item.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition cursor-pointer"
                          title="O'chirish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Item Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <ShieldAlert className="w-6 h-6" />
              <h3 className="font-bold text-white text-base">Preparatni o'chirish</h3>
            </div>
            <p className="text-xs text-slate-300">
              Ushbu dori vositasi yoki tibbiy sarflov buyumini dorixona zaxirasidan o'chirmoqchimisiz?
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
                  await onDeleteItem(deletingId);
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

      {/* Add / Edit Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
              <h3 className="font-bold text-white text-base">
                {editingItem ? 'Preparat ma\'lumotlarini yangilash' : 'Omborga yangi preparat kiritish'}
              </h3>
              <button onClick={() => setIsAddOpen(false)} className="text-slate-400 hover:text-white p-1 cursor-pointer">
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
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Dori yoki buyum nomi *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Tsefazolon 1g flakon"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Kategoriya
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="Antibiotik">Antibiotik</option>
                    <option value="Kardiologik">Kardiologik</option>
                    <option value="Og'riqsizlantiruvchi">Og'riqsizlantiruvchi</option>
                    <option value="Vitaminlar">Vitaminlar</option>
                    <option value="Shprits & Sarflov">Shprits & Sarflov</option>
                    <option value="Antiseptik">Antiseptik</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Partiya (Seriya) raqami
                  </label>
                  <input
                    type="text"
                    value={formData.batchNumber}
                    onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Qoldiq miqdori *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.stockQuantity}
                    onChange={(e) => setFormData({ ...formData, stockQuantity: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    O'lchov birligi
                  </label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="quti">quti</option>
                    <option value="dona">dona</option>
                    <option value="ampula">ampula</option>
                    <option value="flakon">flakon</option>
                    <option value="blister">blister</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Minimal ogohlantirish chegarasi
                  </label>
                  <input
                    type="number"
                    value={formData.minThreshold}
                    onChange={(e) => setFormData({ ...formData, minThreshold: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Sotish narxi (so'm) *
                  </label>
                  <input
                    type="number"
                    step="1000"
                    value={formData.salePrice}
                    onChange={(e) => setFormData({ ...formData, salePrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Xarid tannarxi (so'm)
                  </label>
                  <input
                    type="number"
                    step="1000"
                    value={formData.unitCost}
                    onChange={(e) => setFormData({ ...formData, unitCost: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Yaroqlilik muddati
                  </label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Ishlab chiqaruvchi zavod / Ta'minotchi
                  </label>
                  <input
                    type="text"
                    value={formData.manufacturer}
                    onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow-md transition cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingItem ? 'O\'zgarishlarni saqlash' : 'Omborga qabul qilish'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
