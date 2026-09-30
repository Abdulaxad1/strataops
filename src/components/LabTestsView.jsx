import React, { useState } from 'react';
import {
  FlaskConical,
  Plus,
  Printer,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Search,
  Trash2,
  Edit3,
  X,
  Check,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export const LabTestsView = ({
  labTests = [],
  patients = [],
  doctors = [],
  onCreateTest,
  onUpdateTest,
  onDeleteTest,
  onPrintTest,
  searchTerm = ''
}) => {
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [formError, setFormError] = useState('');

  // New Test Order Form State
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [testName, setTestName] = useState('Umumiy qon tahlili (UQT)');
  const [category, setCategory] = useState('Qon tahlili');
  const [price, setPrice] = useState(65000);

  // Results Edit State
  const [resultsModalOpen, setResultsModalOpen] = useState(false);
  const [activeTestForResults, setActiveTestForResults] = useState(null);
  const [resultsList, setResultsList] = useState([]);
  const [conclusion, setConclusion] = useState('');
  const [techName, setTechName] = useState('Laborant N. Akbarova');

  const handleOpenAdd = () => {
    setFormError('');
    setPatientId(patients[0]?.id || '');
    setDoctorId(doctors[0]?.id || '');
    setTestName('Umumiy qon tahlili (UQT)');
    setCategory('Qon tahlili');
    setPrice(65000);
    setIsModalOpen(true);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const p = patients.find(pat => pat.id === patientId);
    const d = doctors.find(doc => doc.id === doctorId);
    if (!p) {
      setFormError('Iltimos bemorni tanlang');
      return;
    }
    if (!d) {
      setFormError('Iltimos yo\'llovchi shifokorni tanlang');
      return;
    }
    if (!testName.trim()) {
      setFormError('Iltimos tahlil nomini kiriting');
      return;
    }

    setFormError('');
    await onCreateTest({
      patientId: p.id,
      patientName: p.fullName,
      testName,
      category,
      orderedByDoctorId: d.id,
      orderedByDoctorName: d.name,
      orderDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      price: Number(price),
      results: [],
      doctorConclusion: ''
    });

    setIsModalOpen(false);
  };

  const handleOpenResults = (test) => {
    setActiveTestForResults(test);
    setResultsList(
      test.results && test.results.length > 0
        ? [...test.results]
        : [
            { parameter: 'Gemoglobin (Hb)', value: '142', unit: 'g/l', referenceRange: '130 - 165', isAbnormal: false },
            { parameter: 'Eritrotsitlar (RBC)', value: '4.6', unit: '10^12/l', referenceRange: '4.0 - 5.5', isAbnormal: false },
            { parameter: 'Leykotsitlar (WBC)', value: '8.1', unit: '10^9/l', referenceRange: '4.0 - 9.0', isAbnormal: false },
            { parameter: 'ECHT (SOE)', value: '12', unit: 'mm/soat', referenceRange: '2 - 15', isAbnormal: false }
          ]
    );
    setConclusion(test.doctorConclusion || 'Barcha laboratoriya ko\'rsatkichlari fiziologik me\'yorda.');
    setTechName(test.laboratoryTech || 'Laborant N. Akbarova');
    setResultsModalOpen(true);
  };

  const handleSaveResults = async (e) => {
    e.preventDefault();
    if (!activeTestForResults) return;

    await onUpdateTest(activeTestForResults.id, {
      results: resultsList,
      doctorConclusion: conclusion,
      laboratoryTech: techName,
      status: 'completed',
      resultDate: new Date().toISOString().split('T')[0]
    });

    setResultsModalOpen(false);
  };

  const handleAddResultRow = () => {
    setResultsList([
      ...resultsList,
      { parameter: '', value: '', unit: '', referenceRange: '', isAbnormal: false }
    ]);
  };

  const handleRemoveResultRow = (index) => {
    setResultsList(resultsList.filter((_, i) => i !== index));
  };

  const handleResultChange = (index, field, value) => {
    const updated = [...resultsList];
    updated[index] = { ...updated[index], [field]: value };
    setResultsList(updated);
  };

  const handleAutoFillNormal = () => {
    setResultsList([
      { parameter: 'Gemoglobin (Hb)', value: '138', unit: 'g/l', referenceRange: '130 - 165', isAbnormal: false },
      { parameter: 'Eritrotsitlar (RBC)', value: '4.5', unit: '10^12/l', referenceRange: '4.0 - 5.5', isAbnormal: false },
      { parameter: 'Leykotsitlar (WBC)', value: '7.2', unit: '10^9/l', referenceRange: '4.0 - 9.0', isAbnormal: false },
      { parameter: 'Trombotsitlar (PLT)', value: '250', unit: '10^9/l', referenceRange: '180 - 320', isAbnormal: false },
      { parameter: 'ECHT (SOE)', value: '10', unit: 'mm/soat', referenceRange: '2 - 15', isAbnormal: false }
    ]);
    setConclusion('Ko\'rsatkichlar me\'yorda. Patologiya aniqlanmadi.');
  };

  const filteredTests = labTests.filter((t) => {
    const matchesSearch =
      !searchTerm ||
      t.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCat = filterCategory === 'all' || t.category === filterCategory;
    const matchesStat = filterStatus === 'all' || t.status === filterStatus;

    return matchesSearch && matchesCat && matchesStat;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FlaskConical className="w-6 h-6 text-teal-400" />
            Klinik Laboratoriya & Diagnostika
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Qon, biokimyo, siydik va instrumental tekshiruvlar buyurtmasi hamda laboratoriya natijalari
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-500 active:scale-95 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-teal-900/30 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi Tahlil Buyurtmasi</span>
        </button>
      </div>

      {/* Filter toolbar */}
      <div className="flex flex-wrap items-center gap-3 p-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Kategoriya:</span>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 text-xs focus:outline-none"
          >
            <option value="all">Barchasi</option>
            <option value="Qon tahlili">Qon tahlillari</option>
            <option value="Biokimyo">Biokimyo</option>
            <option value="Siydik tahlili">Siydik tahlili</option>
            <option value="Gormonlar">Gormonlar</option>
            <option value="Instrumental (UZI/Rentgen)">Instrumental (UZI/Rentgen)</option>
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
            <option value="completed">Tayyor (Xulosa berilgan)</option>
            <option value="processing">Jarayonda</option>
            <option value="pending">Kutilmoqda</option>
          </select>
        </div>

        <div className="ml-auto text-xs text-slate-400">
          Jami: <span className="text-white font-semibold">{filteredTests.length}</span> ta tahlil
        </div>
      </div>

      {/* Lab Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTests.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-400 bg-slate-900/50 rounded-2xl border border-slate-800">
            Laboratoriya tahlillari topilmadi.
          </div>
        ) : (
          filteredTests.map((test) => (
            <div
              key={test.id}
              className={`p-5 rounded-2xl border transition-all shadow-md flex flex-col justify-between ${
                test.status === 'completed'
                  ? 'bg-slate-900/80 border-slate-800 hover:border-teal-500/40'
                  : 'bg-slate-900/90 border-amber-500/30'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between pb-3 border-b border-slate-800/80">
                  <div>
                    <span className="font-mono text-xs font-bold text-teal-400">{test.id}</span>
                    <span className="text-[11px] block font-semibold text-slate-400 mt-0.5">{test.category}</span>
                    <h3 className="font-bold text-white text-base mt-1">{test.testName}</h3>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                    test.status === 'completed'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : test.status === 'processing'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {test.status === 'completed' && 'Tayyor'}
                    {test.status === 'processing' && 'Jarayonda'}
                    {test.status === 'pending' && 'Kutilmoqda'}
                  </span>
                </div>

                {/* Patient & Doctor */}
                <div className="mt-3 space-y-1.5 text-xs text-slate-300">
                  <div>
                    <span className="text-slate-400">Bemor: </span>
                    <strong className="text-white">{test.patientName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Yo'llovchi shifokor: </span>
                    <span>{test.orderedByDoctorName}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 pt-1">
                    <span>Sana: <span className="text-slate-300">{test.orderDate}</span></span>
                    <span className="font-semibold text-emerald-400">{test.price?.toLocaleString()} so'm</span>
                  </div>
                </div>

                {/* Result snippet or status */}
                <div className="mt-3 p-3 bg-slate-950/70 rounded-xl border border-slate-800/80 text-xs">
                  {test.status === 'completed' && test.results?.length > 0 ? (
                    <div>
                      <div className="text-slate-400 text-[11px] flex justify-between">
                        <span>Aniqlangan ko'rsatkichlar:</span>
                        <span className="text-teal-400 font-bold">{test.results.length} ta parametr</span>
                      </div>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {test.results.slice(0, 3).map((res, i) => (
                          <span
                            key={i}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                              res.isAbnormal
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {res.parameter}: {res.value} {res.unit}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-amber-400/90 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 animate-spin" />
                      <span>Natijalar kiritilishi kutilmoqda</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenResults(test)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-teal-300 rounded-xl text-xs font-semibold transition cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Natijalarni kiritish</span>
                  </button>

                  {test.status === 'completed' && (
                    <button
                      onClick={() => onPrintTest(test)}
                      className="p-1.5 text-teal-300 hover:text-white rounded-lg bg-teal-500/10 hover:bg-teal-500/30 transition cursor-pointer"
                      title="Natijalarni chop etish"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <button
                  onClick={() => setDeletingId(test.id)}
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
              <h3 className="font-bold text-white text-base">Tahlilni o'chirish</h3>
            </div>
            <p className="text-xs text-slate-300">
              Ushbu laboratoriya buyurtmasi va uning natijalarini butunlay o'chirmoqchimisiz?
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
                  await onDeleteTest(deletingId);
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

      {/* Add New Test Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-teal-400" />
                Yangi Laboratoriya Tahlili Buyurtma Qilish
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
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
                  Yo'llovchi shifokor *
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

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Tahlil kategoriyasi
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="Qon tahlili">Qon tahlillari</option>
                  <option value="Biokimyo">Biokimyoviy tahlil</option>
                  <option value="Siydik tahlili">Siydik tahlillari</option>
                  <option value="Gormonlar">Gormonlar & Immunologiya</option>
                  <option value="Instrumental (UZI/Rentgen)">Instrumental (UZI/Rentgen)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Tahlil nomi *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Umumiy qon tahlili (UQT) 24 parametr"
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Tahlil narxi (so'm)
                </label>
                <input
                  type="number"
                  step="5000"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
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
                  <span>Buyurtmani Rasmiylashtirish</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Enter Lab Results Modal */}
      {resultsModalOpen && activeTestForResults && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
              <div>
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-teal-400" />
                  Tahlil Natijalarini Kiritish: {activeTestForResults.testName}
                </h3>
                <div className="text-xs text-slate-400 mt-0.5">
                  Bemor: <span className="text-teal-300 font-semibold">{activeTestForResults.patientName}</span>
                </div>
              </div>
              <button onClick={() => setResultsModalOpen(false)} className="text-slate-400 hover:text-white p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveResults} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-teal-400">
                  Parametrlar va aniqlangan qiymatlar:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAutoFillNormal}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 rounded-lg hover:bg-emerald-600/30 transition cursor-pointer"
                    title="Standart me'yoriy qiymatlarni to'ldirish"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Me'yoriy shablon</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleAddResultRow}
                    className="flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 font-semibold cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Qator qo'shish</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {resultsList.map((res, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 items-center p-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs">
                    <div className="col-span-4">
                      <input
                        type="text"
                        placeholder="Ko'rsatkich nomi"
                        value={res.parameter}
                        onChange={(e) => handleResultChange(idx, 'parameter', e.target.value)}
                        className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="text"
                        placeholder="Natija"
                        value={res.value}
                        onChange={(e) => handleResultChange(idx, 'value', e.target.value)}
                        className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white font-bold"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="text"
                        placeholder="Birligi"
                        value={res.unit}
                        onChange={(e) => handleResultChange(idx, 'unit', e.target.value)}
                        className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-300"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="text"
                        placeholder="Me'yor"
                        value={res.referenceRange}
                        onChange={(e) => handleResultChange(idx, 'referenceRange', e.target.value)}
                        className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-400"
                      />
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                      <label className="flex items-center gap-1 text-[10px] text-rose-400 cursor-pointer" title="Me'yordan chetga chiqqan">
                        <input
                          type="checkbox"
                          checked={res.isAbnormal}
                          onChange={(e) => handleResultChange(idx, 'isAbnormal', e.target.checked)}
                          className="rounded border-slate-700 text-rose-500 focus:ring-0"
                        />
                        <span>Oshgan</span>
                      </label>
                    </div>
                    <div className="col-span-1 text-right">
                      <button
                        type="button"
                        onClick={() => handleRemoveResultRow(idx)}
                        className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                        title="Qatorni o'chirish"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Laborant / Shifokor xulosasi
                </label>
                <textarea
                  rows={2}
                  value={conclusion}
                  onChange={(e) => setConclusion(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  placeholder="Klinik laborator xulosa..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Ijrochi laborant F.I.SH
                </label>
                <input
                  type="text"
                  value={techName}
                  onChange={(e) => setTechName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setResultsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Xulosani Tasdiqlash va Chop Etish</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
