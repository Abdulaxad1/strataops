import React, { useState } from 'react';
import {
  Send,
  MessageSquare,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  Phone,
  Search,
  Filter,
  Trash2,
  Check,
  SendHorizontal
} from 'lucide-react';

export const NotificationCenterView = ({ patients = [], appointments = [], onSendNotification }) => {
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [phone, setPhone] = useState('');
  const [channel, setChannel] = useState('SMS');
  const [messageText, setMessageText] = useState('Hurmatli bemor, "ShifoMed" klinikasida sizning shifokor qabulingiz rejalashtirildi. Xona 204. Tel: +998 71 200-00-55');
  const [sentSuccess, setSentSuccess] = useState(false);

  // Message history state
  const [history, setHistory] = useState([
    {
      id: 'MSG-801',
      recipient: 'Alisher Karimov',
      phone: '+998 90 123-45-67',
      channel: 'SMS',
      template: 'Qabul eslatmasi',
      text: 'Hurmatli Alisher Karimov, sizning qabulingiz bugun soat 09:30 da Dr. Ziyoda Rahmonova qabulida. Xona 204.',
      status: 'delivered',
      time: 'Bugun, 08:45'
    },
    {
      id: 'MSG-802',
      recipient: 'Nilufar Saidova',
      phone: '+998 93 555-12-34',
      channel: 'Telegram',
      template: 'Tahlil tayyor',
      text: 'Hurmatli Nilufar Saidova, umumiy qon tahlili natijalaringiz tayyor. ShifoMed shaxsiy kabinetingizda ko\'rishingiz mumkin.',
      status: 'delivered',
      time: 'Bugun, 10:12'
    },
    {
      id: 'MSG-803',
      recipient: 'Jasur Mirzayev',
      phone: '+998 97 780-33-22',
      channel: 'SMS',
      template: 'Kassa cheki',
      text: 'Hurmatli Jasur Mirzayev, 290 000 so\'m to\'lov qabul qilindi. Chek № CHK-0902. ShifoMed salomatlik tilaydi!',
      status: 'delivered',
      time: 'Bugun, 11:30'
    }
  ]);

  const templates = [
    {
      title: 'Qabul eslatmasi',
      text: 'Hurmatli [BEMOR], ertaga soat [VAQT] da [SHIFOKOR] qabuliga yozilgansiz. Xona: [XONA]. Iltimos 10 daqiqa oldin keling.'
    },
    {
      title: 'Tahlil natijasi tayyor',
      text: 'Hurmatli [BEMOR], siz topshirgan laboratoriya diagnostika tahlil xulosasi tayyor bo\'ldi. ShifoMed klinikasi.'
    },
    {
      title: 'To\'lov kassa cheki',
      text: 'Hurmatli [BEMOR], ko\'rsatilgan tibbiy xizmatlar uchun to\'lovingiz muvaffaqiyatli qabul qilindi. ShifoMed ERP.'
    },
    {
      title: 'Elektron retsept tayyor',
      text: 'Hurmatli [BEMOR], davolovchi shifokoringiz tomonidan elektron dori retsepti yozildi. Dorixonaga ko\'rsatishingiz mumkin.'
    },
    {
      title: 'Rejali ko\'rikka taklif',
      text: 'Hurmatli [BEMOR], salomatligingizni nazorat qilish maqsadida navbatdagi tibbiy ko\'rikdan o\'tishingizni tavsiya etamiz.'
    }
  ];

  const handlePatientSelect = (pId) => {
    setSelectedPatientId(pId);
    const p = patients.find(pat => pat.id === pId);
    if (p) {
      setPhone(p.phone);
      setMessageText(prev => prev.replace(/\[BEMOR\]/g, p.fullName));
    }
  };

  const handleApplyTemplate = (tmpl) => {
    const p = patients.find(pat => pat.id === selectedPatientId);
    let populated = tmpl.text;
    if (p) {
      populated = populated.replace(/\[BEMOR\]/g, p.fullName);
    }
    setMessageText(populated);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!phone || !messageText) return;

    const p = patients.find(pat => pat.id === selectedPatientId);
    const newMsg = {
      id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
      recipient: p ? p.fullName : 'Bemor',
      phone,
      channel,
      template: 'Shaxsiy xabar',
      text: messageText,
      status: 'delivered',
      time: 'Hozirgina'
    };

    setHistory([newMsg, ...history]);
    if (onSendNotification) {
      onSendNotification(newMsg);
    }

    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                SMS & Telegram Xabarnomalar Markazi
              </h2>
              <p className="text-xs text-slate-400">
                Bemorlarga qabul eslatmalari, tahlil natijalari va kassa kvitansiyalarini avtomatlashtirilgan yuborish
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
            SMS Gateway: <strong className="text-emerald-400">Faol (Eskiz / PlayMobile)</strong>
          </span>
        </div>
      </div>

      {/* Main Grid: Form on Left, History on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Compose Form (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Send className="w-4 h-4 text-teal-400" />
            Yangi Xabarnoma Yozish
          </h3>

          <form onSubmit={handleSend} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-300 mb-1">
                  Bemor (Bazadan tanlash)
                </label>
                <select
                  value={selectedPatientId}
                  onChange={(e) => handlePatientSelect(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="">-- Bemorni tanlang --</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.fullName} ({p.phone})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-300 mb-1">
                  Telefon raqami *
                </label>
                <input
                  type="text"
                  required
                  placeholder="+998 90 123-45-67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">
                Yuborish kanali
              </label>
              <div className="flex gap-3">
                {['SMS', 'Telegram Bot', 'Ikkalasi ham'].map(ch => (
                  <button
                    key={ch}
                    type="button"
                    onClick={() => setChannel(ch)}
                    className={`flex-1 py-2 rounded-xl font-semibold border transition cursor-pointer ${
                      channel === ch
                        ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    }`}
                  >
                    {ch}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Templates */}
            <div>
              <label className="block font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>Tayyor klinik shablonlar:</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {templates.map((tmpl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyTemplate(tmpl)}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition cursor-pointer text-[11px]"
                  >
                    + {tmpl.title}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">
                Xabar matni *
              </label>
              <textarea
                rows={4}
                required
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-teal-500"
              />
              <div className="flex justify-between items-center text-slate-400 text-[11px] mt-1">
                <span>Belgilar: <strong>{messageText.length}</strong> ta ({Math.ceil(messageText.length / 70 || 1)} SMS)</span>
                <span>Alifbo: Lotin (Uzbek)</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-semibold rounded-xl shadow-lg shadow-emerald-900/30 transition cursor-pointer"
              >
                <SendHorizontal className="w-4 h-4" />
                <span>{sentSuccess ? 'Yuborildi!' : 'Xabarnomani Yuborish'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right: History (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-400" />
              Yuborilgan Xabarlar Tarixi
            </h3>
            <span className="text-xs text-slate-400 font-mono">{history.length} ta</span>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[460px]">
            {history.map((msg) => (
              <div
                key={msg.id}
                className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5 text-xs"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-white">{msg.recipient}</div>
                    <div className="text-slate-400 font-mono text-[11px]">{msg.phone}</div>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Yetkazildi
                    </span>
                    <div className="text-[10px] text-slate-500 mt-1">{msg.time}</div>
                  </div>
                </div>

                <p className="text-slate-300 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800/80 leading-relaxed text-[11px]">
                  {msg.text}
                </p>

                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <span className="px-1.5 py-0.5 bg-slate-800 rounded font-semibold text-teal-300">{msg.channel}</span>
                  <span>•</span>
                  <span>ID: {msg.id}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
