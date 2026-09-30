import React, { useState, useEffect } from 'react';
import { Printer, X, HeartPulse, Copy, Check, QrCode } from 'lucide-react';

export const PrintDocModal = ({ type, data, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!data) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const el = document.getElementById('printable-sheet');
    if (el) {
      navigator.clipboard.writeText(el.innerText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Modal Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-teal-400" />
            <h3 className="font-semibold text-white text-base">
              {type === 'prescription' && 'Elektron Retsept Blankasi'}
              {type === 'invoice' && 'Kassa Cheki & To\'lov Hujjati'}
              {type === 'lab' && 'Laboratoriya Tahlil Natijalari'}
              {type === 'record' && 'Tibbiy Ko\'rik Xulosasi (Epicrisis)'}
              {type === 'ticket' && 'Navbat Kuponi (Elektron Chipta)'}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Nusxalandi' : 'Matnni nusxalash'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold shadow-md transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Chop etish (Print)</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Sheet */}
        <div className="p-6 overflow-y-auto bg-slate-950 flex justify-center">
          <div className="bg-white text-slate-900 w-full max-w-2xl p-8 rounded-xl shadow-lg border border-slate-200 text-sm font-sans" id="printable-sheet">
            
            {/* Clinic Document Header */}
            <div className="border-b-2 border-slate-900 pb-4 mb-6 flex justify-between items-start">
              <div>
                <div className="text-xl font-bold tracking-tight text-teal-900 uppercase flex items-center gap-2">
                  <HeartPulse className="w-6 h-6 text-teal-700" />
                  "SHIFOMED" XUSUSIY TIBBIYOT MARKAZI
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  Toshkent sh., Yunusobod t., Amir Temur shox ko'chasi 108 | Tel: +998 (71) 200-00-55
                </div>
                <div className="text-[11px] text-slate-500">
                  Litsenziya № TT-88219 O'zR Sog'liqni Saqlash Vazirligi tomonidan berilgan
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono font-semibold text-slate-500">Hujjat ID:</div>
                <div className="text-sm font-mono font-bold text-slate-800">
                  {data.id || data.receiptNumber || (data.queueNumber ? `#${data.queueNumber}` : 'DOC')}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Sana: {new Date().toLocaleDateString('uz-UZ')}</div>
              </div>
            </div>

            {/* Queue Ticket Printout */}
            {type === 'ticket' && (
              <div className="space-y-6 text-center max-w-md mx-auto py-4">
                <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  ELEKTRON NAVBAT CHIPTASI
                </div>

                <div className="py-6 px-4 bg-slate-50 rounded-2xl border-2 border-dashed border-teal-600 space-y-2">
                  <div className="text-xs text-slate-500 font-semibold uppercase">Sizning navbat raqamingiz:</div>
                  <div className="text-6xl font-black text-teal-800 tracking-tight">
                    #{data.queueNumber}
                  </div>
                  <div className="text-sm font-mono font-bold text-slate-700">
                    Vaqt: {data.timeSlot} • Sana: {data.date}
                  </div>
                </div>

                <div className="text-left bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-500">Bemor:</span>
                    <strong className="text-slate-900">{data.patientName}</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-500">Shifokor:</span>
                    <strong className="text-teal-900">{data.doctorName}</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-500">Mutaxassislik:</span>
                    <strong className="text-slate-700">{data.department}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Qabul xonasi:</span>
                    <strong className="text-emerald-800 text-sm font-bold">{data.room}</strong>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-slate-500 space-y-1">
                  <div>* Iltimos, belgilangan xona oldida navbatingizni kuting.</div>
                  <div>* Monitor ekranida raqamingiz chaqiriladi.</div>
                </div>
              </div>
            )}

            {/* Prescription Content */}
            {type === 'prescription' && (
              <div className="space-y-4">
                <div className="text-center font-bold text-base uppercase tracking-wider text-slate-900 underline decoration-teal-600 decoration-2 underline-offset-4">
                  SHIFOKOR RETSEPTI № {data.id}
                </div>

                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded border border-slate-200 text-xs">
                  <div><strong>Bemor:</strong> {data.patientName}</div>
                  <div><strong>Yoshi:</strong> {data.patientAge || '—'} yosh</div>
                  <div><strong>Shifokor:</strong> {data.doctorName}</div>
                  <div><strong>Mutaxassisligi:</strong> {data.specialty}</div>
                  <div className="col-span-2"><strong>Dastlabki tashxis:</strong> {data.diagnosis}</div>
                </div>

                <div className="pt-2">
                  <div className="font-bold text-xs uppercase tracking-wider text-teal-900 mb-2">
                    Tayinlangan dori-darmonlar (Rp.):
                  </div>
                  <div className="divide-y divide-slate-200 border border-slate-200 rounded">
                    {data.medications && data.medications.map((m, idx) => (
                      <div key={m.id || idx} className="p-3 bg-white">
                        <div className="font-bold text-sm text-slate-900 flex justify-between">
                          <span>{idx + 1}. {m.medicineName}</span>
                          <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                            {m.dosage}
                          </span>
                        </div>
                        <div className="text-xs text-slate-700 mt-1">
                          <strong>Qabul tartibi:</strong> {m.frequency} — ({m.durationDays} kun)
                        </div>
                        {m.instruction && (
                          <div className="text-xs text-slate-500 italic mt-0.5">
                            Tavsiya: {m.instruction}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {data.notes && (
                  <div className="text-xs text-slate-600 bg-amber-50 p-2.5 rounded border border-amber-200">
                    <strong>Qo'shimcha eslatma:</strong> {data.notes}
                  </div>
                )}

                <div className="pt-8 flex justify-between items-end text-xs">
                  <div>
                    <div>Amal qilish muddati: <strong>{data.validDays} kun</strong></div>
                    <div className="text-slate-400 mt-1">Faqat dorixonalar uchun</div>
                  </div>
                  <div className="text-center">
                    <div className="w-32 border-b border-slate-900 mb-1"></div>
                    <div className="font-semibold">{data.doctorName}</div>
                    <div className="text-[11px] text-slate-500">Shifokor imzosi va muhri</div>
                  </div>
                </div>
              </div>
            )}

            {/* Invoice Content */}
            {type === 'invoice' && (
              <div className="space-y-4">
                <div className="text-center font-bold text-base uppercase tracking-wider text-slate-900">
                  KASSA CHEKI VA TO'LOV KVITANSIYASI
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded border border-slate-200">
                  <div><strong>Chek raqami:</strong> {data.receiptNumber}</div>
                  <div><strong>To'lov sanasi:</strong> {data.date}</div>
                  <div><strong>Bemor:</strong> {data.patientName}</div>
                  <div><strong>Kassir:</strong> {data.cashierName}</div>
                  <div><strong>To'lov turi:</strong> {data.paymentMethod}</div>
                  <div>
                    <strong>Holati:</strong>{' '}
                    <span className={data.paymentStatus === 'paid' ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'}>
                      {data.paymentStatus === 'paid' ? 'TO\'LANGAN' : 'QISMAN TO\'LANGAN'}
                    </span>
                  </div>
                </div>

                <table className="w-full text-xs border border-slate-200 mt-3">
                  <thead className="bg-slate-100 border-b border-slate-200">
                    <tr>
                      <th className="p-2 text-left">№</th>
                      <th className="p-2 text-left">Xizmat nomi</th>
                      <th className="p-2 text-center">Soni</th>
                      <th className="p-2 text-right">Narxi</th>
                      <th className="p-2 text-right">Jami</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {data.items && data.items.map((it, idx) => (
                      <tr key={it.id || idx}>
                        <td className="p-2 text-slate-500">{idx + 1}</td>
                        <td className="p-2 font-medium">{it.description}</td>
                        <td className="p-2 text-center">{it.quantity}</td>
                        <td className="p-2 text-right">{it.unitPrice?.toLocaleString()} so'm</td>
                        <td className="p-2 text-right font-semibold">{it.amount?.toLocaleString()} so'm</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="pt-2 flex flex-col items-end gap-1 text-xs border-t border-slate-200">
                  <div className="flex justify-between w-56">
                    <span>Oraliq summa:</span>
                    <span>{data.subtotal?.toLocaleString()} so'm</span>
                  </div>
                  {data.discount > 0 && (
                    <div className="flex justify-between w-56 text-rose-700">
                      <span>Chegirma:</span>
                      <span>- {data.discount?.toLocaleString()} so'm</span>
                    </div>
                  )}
                  <div className="flex justify-between w-56 font-bold text-sm text-slate-900 border-t border-slate-300 pt-1">
                    <span>Jami to'lov:</span>
                    <span className="text-teal-900">{data.total?.toLocaleString()} so'm</span>
                  </div>
                  <div className="flex justify-between w-56 text-emerald-700 font-semibold">
                    <span>Qabul qilingan:</span>
                    <span>{data.paidAmount?.toLocaleString()} so'm</span>
                  </div>
                </div>

                <div className="pt-6 flex justify-between items-center text-xs text-slate-500 border-t border-dashed border-slate-300">
                  <div>Fiskal modul: FM-9812-7801-UZ</div>
                  <div>Xaridingiz uchun tashakkur! Salomat bo'ling!</div>
                </div>
              </div>
            )}

            {/* Lab Result Content */}
            {type === 'lab' && (
              <div className="space-y-4">
                <div className="text-center font-bold text-base uppercase tracking-wider text-slate-900 underline decoration-teal-600">
                  LABORATORIYA DIAGNOSTIKA TAHLIL XULOSASI
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded border border-slate-200">
                  <div><strong>Bemor:</strong> {data.patientName}</div>
                  <div><strong>Tahlil turi:</strong> {data.testName}</div>
                  <div><strong>Yo'llovchi shifokor:</strong> {data.orderedByDoctorName}</div>
                  <div><strong>Topshirilgan sana:</strong> {data.orderDate}</div>
                  <div><strong>Kategoriya:</strong> {data.category}</div>
                  <div><strong>Xulosa sanasi:</strong> {data.resultDate || 'Tayyorlandi'}</div>
                </div>

                <div className="pt-2">
                  <table className="w-full text-xs border border-slate-200">
                    <thead className="bg-slate-100 border-b border-slate-200">
                      <tr>
                        <th className="p-2 text-left">Ko'rsatkich (Parametr)</th>
                        <th className="p-2 text-center">Natija</th>
                        <th className="p-2 text-center">Birligi</th>
                        <th className="p-2 text-center">Me'yor</th>
                        <th className="p-2 text-center">Holat</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {data.results && data.results.length > 0 ? (
                        data.results.map((res, idx) => (
                          <tr key={idx} className={res.isAbnormal ? 'bg-rose-50/60' : ''}>
                            <td className="p-2 font-medium">{res.parameter}</td>
                            <td className={`p-2 text-center font-bold ${res.isAbnormal ? 'text-rose-700' : 'text-slate-900'}`}>
                              {res.value}
                            </td>
                            <td className="p-2 text-center text-slate-600">{res.unit}</td>
                            <td className="p-2 text-center text-slate-600">{res.referenceRange}</td>
                            <td className="p-2 text-center">
                              {res.isAbnormal ? (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                                  Oshgan/Pasaygan
                                </span>
                              ) : (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-100 text-emerald-800">
                                  Me'yorda
                                </span>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="p-4 text-center text-slate-500">
                            Natijalar kiritilmoqda...
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {data.doctorConclusion && (
                  <div className="text-xs bg-slate-50 p-3 rounded border border-slate-200">
                    <strong>Shifokor-laborant xulosasi:</strong> {data.doctorConclusion}
                  </div>
                )}

                <div className="pt-8 flex justify-between items-end text-xs">
                  <div>Laborant: <strong>{data.laboratoryTech || 'Navbatchi laborant'}</strong></div>
                  <div className="text-center">
                    <div className="w-32 border-b border-slate-900 mb-1"></div>
                    <div className="text-[11px] text-slate-500">Laboratoriya muhri va imzosi</div>
                  </div>
                </div>
              </div>
            )}

            {/* Medical Record Epicrisis */}
            {type === 'record' && (
              <div className="space-y-4">
                <div className="text-center font-bold text-base uppercase tracking-wider text-slate-900">
                  AMBULATOR TIBBIY KO'RIK KARTASI (EPICRISIS)
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded border border-slate-200">
                  <div><strong>Bemor:</strong> {data.patientName}</div>
                  <div><strong>Qabul sanasi:</strong> {data.visitDate}</div>
                  <div><strong>Shifokor:</strong> {data.doctorName}</div>
                  <div><strong>Mutaxassisligi:</strong> {data.doctorSpecialty}</div>
                </div>

                {data.vitals && (
                  <div className="flex gap-4 p-2.5 bg-teal-50/70 border border-teal-200 rounded text-xs">
                    <div>Qon bosimi: <strong>{data.vitals.bloodPressure}</strong></div>
                    <div>Puls: <strong>{data.vitals.heartRate} ur/daq</strong></div>
                    <div>Harorat: <strong>{data.vitals.temperature} °C</strong></div>
                    <div>Vazn: <strong>{data.vitals.weight} kg</strong></div>
                  </div>
                )}

                <div className="space-y-2 text-xs">
                  <div>
                    <strong className="text-slate-900">Shikoyatlari:</strong>
                    <p className="text-slate-700 mt-0.5">{data.complaints}</p>
                  </div>
                  <div>
                    <strong className="text-slate-900">Kasallik tarixi (Anamnez):</strong>
                    <p className="text-slate-700 mt-0.5">{data.anamnesis}</p>
                  </div>
                  <div className="p-2.5 bg-slate-100 rounded border border-slate-300">
                    <strong className="text-slate-900 text-sm">Asosiy Tashxis:</strong>
                    <p className="text-slate-900 font-bold mt-1 text-sm">{data.diagnosis}</p>
                  </div>
                  <div>
                    <strong className="text-slate-900">Davolash rejimi va tayinlovlar:</strong>
                    <p className="text-slate-700 mt-0.5">{data.treatmentPlan}</p>
                  </div>
                  <div>
                    <strong className="text-slate-900">Tavsiyalar:</strong>
                    <p className="text-slate-700 mt-0.5">{data.recommendations}</p>
                  </div>
                </div>

                <div className="pt-8 flex justify-end text-xs">
                  <div className="text-center">
                    <div className="w-36 border-b border-slate-900 mb-1"></div>
                    <div className="font-semibold">{data.doctorName}</div>
                    <div className="text-[11px] text-slate-500">Shifokor imzosi va shaxsiy muhri</div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
