import React, { useState } from 'react';
import {
  Receipt,
  Plus,
  Printer,
  CreditCard,
  Search,
  CheckCircle2,
  Clock,
  Trash2,
  X,
  Check,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export const BillingView = ({
  invoices = [],
  patients = [],
  services = [],
  onCreateInvoice,
  onUpdateInvoice,
  onDeleteInvoice,
  onPrintInvoice,
  searchTerm = ''
}) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [formError, setFormError] = useState('');

  // New Invoice Form State
  const [patientId, setPatientId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Uzcard / Humo');
  const [paymentStatus, setPaymentStatus] = useState('paid');
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState('');
  const [cashierName, setCashierName] = useState('Gulzoda Karimova (Kassa-1)');
  const [items, setItems] = useState([
    { id: '1', description: 'Shifokor konsultatsiyasi', category: 'konsultatsiya', quantity: 1, unitPrice: 150000, amount: 150000 }
  ]);

  const handleOpenAdd = () => {
    setFormError('');
    setPatientId(patients[0]?.id || '');
    setPaymentMethod('Uzcard / Humo');
    setPaymentStatus('paid');
    setDiscount(0);
    setNotes('');
    setItems([
      { id: '1', description: 'Shifokor konsultatsiyasi', category: 'konsultatsiya', quantity: 1, unitPrice: 150000, amount: 150000 }
    ]);
    setIsModalOpen(true);
  };

  const handleAddItemRow = () => {
    setItems([
      ...items,
      {
        id: String(Date.now()),
        description: '',
        category: 'muolaja',
        quantity: 1,
        unitPrice: 50000,
        amount: 50000
      }
    ]);
  };

  const handleAddServiceToItems = (srv) => {
    setItems([
      ...items,
      {
        id: String(Date.now()),
        description: srv.name,
        category: srv.category,
        quantity: 1,
        unitPrice: srv.price,
        amount: srv.price
      }
    ]);
  };

  const handleRemoveItem = (index) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    if (field === 'quantity' || field === 'unitPrice') {
      const q = Number(updated[index].quantity) || 0;
      const p = Number(updated[index].unitPrice) || 0;
      updated[index].amount = q * p;
    }
    setItems(updated);
  };

  const subtotal = items.reduce((sum, it) => sum + (Number(it.amount) || 0), 0);
  const total = Math.max(0, subtotal - (Number(discount) || 0));

  const handleQuickPay = async (inv) => {
    if (onUpdateInvoice) {
      await onUpdateInvoice(inv.id, {
        paymentStatus: 'paid',
        paidAmount: inv.total
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const p = patients.find(pat => pat.id === patientId);
    if (!p) {
      setFormError('Iltimos bemorni tanlang');
      return;
    }
    const validItems = items.filter(it => it.description.trim() !== '');
    if (validItems.length === 0) {
      setFormError('Kamida bitta xizmat nomini kiriting');
      return;
    }

    setFormError('');
    await onCreateInvoice({
      patientId: p.id,
      patientName: p.fullName,
      date: new Date().toISOString().split('T')[0],
      items: validItems,
      subtotal,
      discount: Number(discount) || 0,
      total,
      paidAmount: paymentStatus === 'paid' ? total : paymentStatus === 'partial' ? Math.round(total / 2) : 0,
      paymentMethod,
      paymentStatus,
      cashierName,
      notes
    });

    setIsModalOpen(false);
  };

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      !searchTerm ||
      inv.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStat = filterStatus === 'all' || inv.paymentStatus === filterStatus;

    return matchesSearch && matchesStat;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Receipt className="w-6 h-6 text-teal-400" />
            Kassa & Moliya (Hisob-fakturalar)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Tibbiy xizmatlar, tahlillar va dorilar uchun to'lovlar, kassa cheklari va fiskal hisobotlar
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-emerald-900/30 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi To'lov Cheki / Hisob Ochish</span>
        </button>
      </div>

      {/* Filter toolbar */}
      <div className="flex items-center justify-between p-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>To'lov holati:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 text-xs focus:outline-none"
          >
            <option value="all">Barchasi</option>
            <option value="paid">To'langan (100%)</option>
            <option value="partial">Qisman to'langan</option>
            <option value="unpaid">To'lanmagan</option>
          </select>
        </div>

        <div className="text-xs text-slate-400">
          Hisoblar soni: <span className="text-white font-semibold">{filteredInvoices.length}</span> ta
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase text-[11px] tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Chek № & Bemor</th>
                <th className="py-3 px-4">Sana & Kassir</th>
                <th className="py-3 px-4">Xizmatlar</th>
                <th className="py-3 px-4">To'lov turi</th>
                <th className="py-3 px-4">Jami Summa</th>
                <th className="py-3 px-4">Holati</th>
                <th className="py-3 px-4 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    To'lov hisoblari topilmadi.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-800/40 transition">
                    
                    {/* Receipt & Patient */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">{inv.patientName}</div>
                      <div className="font-mono text-xs text-teal-400 font-semibold">{inv.receiptNumber}</div>
                    </td>

                    {/* Date & Cashier */}
                    <td className="py-3 px-4 text-xs">
                      <div className="text-slate-200">{inv.date}</div>
                      <div className="text-slate-400">{inv.cashierName}</div>
                    </td>

                    {/* Items count & summary */}
                    <td className="py-3 px-4 text-xs">
                      <div className="font-medium text-slate-200">{inv.items?.length || 0} ta xizmat</div>
                      <div className="text-slate-400 truncate max-w-xs" title={inv.items?.map(it => it.description).join(', ')}>
                        {inv.items?.map(it => it.description).join(', ')}
                      </div>
                    </td>

                    {/* Payment Method */}
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 border border-slate-700 font-medium text-slate-200">
                        {inv.paymentMethod}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-white text-sm">
                        {inv.total?.toLocaleString()} <span className="text-xs text-slate-400 font-normal">so'm</span>
                      </div>
                      {inv.discount > 0 && (
                        <div className="text-[11px] text-rose-400">
                          -{inv.discount.toLocaleString()} so'm chegirma
                        </div>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold inline-block ${
                        inv.paymentStatus === 'paid'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : inv.paymentStatus === 'partial'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}>
                        {inv.paymentStatus === 'paid' && 'To\'langan'}
                        {inv.paymentStatus === 'partial' && 'Qisman'}
                        {inv.paymentStatus === 'unpaid' && 'Kutilmoqda'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {inv.paymentStatus !== 'paid' && (
                          <button
                            onClick={() => handleQuickPay(inv)}
                            className="flex items-center gap-1 px-2.5 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold transition cursor-pointer"
                            title="To'lovni qabul qilish"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>To'landi</span>
                          </button>
                        )}
                        <button
                          onClick={() => onPrintInvoice(inv)}
                          className="flex items-center gap-1 px-2.5 py-1.5 bg-teal-600/20 hover:bg-teal-600/30 text-teal-300 rounded-lg text-xs font-medium transition cursor-pointer"
                          title="Kassa chekini chop etish"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Chek</span>
                        </button>
                        <button
                          onClick={() => setDeletingId(inv.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition cursor-pointer"
                          title="O'chirish"
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
              <h3 className="font-bold text-white text-base">Hisobni o'chirish</h3>
            </div>
            <p className="text-xs text-slate-300">
              Ushbu kassa to'lov hisobini o'chirmoqchimisiz? Kassa jurnali yangilanadi.
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
                  await onDeleteInvoice(deletingId);
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

      {/* Add Invoice Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Receipt className="w-5 h-5 text-teal-400" />
                Yangi Kassa Cheki & To'lov Rasmiylashtirish
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
                      <option key={p.id} value={p.id}>{p.fullName} ({p.phone})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    To'lov usuli
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="Uzcard / Humo">Uzcard / Humo (Plastik karta)</option>
                    <option value="Naqd pul">Naqd pul (Kassa)</option>
                    <option value="Payme / Click">Payme / Click (QR)</option>
                    <option value="Tibbiy sug'urta">Tibbiy sug'urta (Polis)</option>
                  </select>
                </div>
              </div>

              {/* Quick Select from Services Catalog */}
              {services && services.length > 0 && (
                <div>
                  <div className="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-teal-400" />
                    <span>Xizmatlar narxnomasidan tezkor qo'shish:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-2 bg-slate-950/60 rounded-xl border border-slate-800">
                    {services.slice(0, 8).map(s => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => handleAddServiceToItems(s)}
                        className="text-[11px] px-2 py-1 bg-slate-800 hover:bg-teal-600 text-slate-200 hover:text-white rounded-lg transition cursor-pointer border border-slate-700"
                      >
                        + {s.name} ({s.price?.toLocaleString()} so'm)
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Items List */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-teal-400">
                    To'lanadigan xizmatlar va dori vositalari:
                  </span>
                  <button
                    type="button"
                    onClick={handleAddItemRow}
                    className="flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 font-semibold cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Qator qo'shish</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {items.map((it, idx) => (
                    <div key={it.id || idx} className="grid grid-cols-12 gap-2 items-center p-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs">
                      <div className="col-span-5">
                        <input
                          type="text"
                          placeholder="Xizmat yoki dori nomi"
                          value={it.description}
                          onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                          className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          min="1"
                          placeholder="Soni"
                          value={it.quantity}
                          onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)}
                          className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-center"
                        />
                      </div>
                      <div className="col-span-3">
                        <input
                          type="number"
                          step="1000"
                          placeholder="Narxi"
                          value={it.unitPrice}
                          onChange={(e) => handleItemChange(idx, 'unitPrice', e.target.value)}
                          className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono"
                        />
                      </div>
                      <div className="col-span-2 flex items-center justify-between">
                        <span className="font-bold text-teal-300">{(it.amount || 0).toLocaleString()}</span>
                        {items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(idx)}
                            className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Discount & Totals */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Chegirma miqdori (so'm)
                  </label>
                  <input
                    type="number"
                    step="5000"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    To'lov holati
                  </label>
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="paid">To'liq to'langan (100%)</option>
                    <option value="partial">Qisman to'langan (Avans)</option>
                    <option value="unpaid">Keyinroq to'lanadi (Kutilmoqda)</option>
                  </select>
                </div>
              </div>

              {/* Summary Card */}
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex justify-between items-center text-sm">
                <div>
                  <div className="text-xs text-slate-400">Oraliq summa: {subtotal.toLocaleString()} so'm</div>
                  {discount > 0 && <div className="text-xs text-rose-400">Chegirma: -{discount.toLocaleString()} so'm</div>}
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Jami to'lov:</div>
                  <div className="text-xl font-bold text-emerald-400">{total.toLocaleString()} so'm</div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Kassa Chekini Tasdiqlash va Chiqarish</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
