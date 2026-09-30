import React, { useState } from 'react';
import {
  HeartPulse,
  Users,
  CalendarClock,
  FileText,
  Pill,
  FlaskConical,
  Wallet,
  ShieldCheck,
  ArrowRight,
  Stethoscope,
  Bed,
  Sparkles,
  Check,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Send,
  Menu,
  X,
} from 'lucide-react';

const NAV_LINKS = [
  { id: 'imkoniyatlar', label: 'Imkoniyatlar' },
  { id: 'xizmatlar', label: "Bo'limlar" },
  { id: 'narxlar', label: 'Narxlar' },
  { id: 'aloqa', label: 'Aloqa' },
];

const FEATURES = [
  { icon: Users, title: 'Bemorlar bazasi', desc: "Har bir bemorning to'liq kartasi, murojaat tarixi va aloqa ma'lumotlari bitta joyda saqlanadi." },
  { icon: CalendarClock, title: 'Qabul va navbat', desc: 'Shifokorlarga real vaqtda yozilish, xonalar bo\u2018yicha jonli navbat tablosi bilan.' },
  { icon: FileText, title: 'Tibbiy karta (EHR)', desc: 'Tashxis, davolash tarixi va shifokor yozuvlari qog\u2018ozsiz, raqamli shaklda.' },
  { icon: Pill, title: 'Elektron retsept', desc: "Dorilarni to'g'ridan-to'g'ri tizimda tayinlash, dozani va muddatni kuzatish." },
  { icon: FlaskConical, title: 'Laboratoriya', desc: 'Tahlil buyurtmalari va natijalarini bir joyda qabul qilish va bemorga yetkazish.' },
  { icon: Wallet, title: 'Kassa va moliya', desc: "To'lovlar, cheklar va kunlik/oylik moliyaviy hisobotlar avtomatik shakllanadi." },
];

const DEPARTMENTS = [
  { icon: Stethoscope, name: 'Kardiologiya' },
  { icon: Sparkles, name: 'Stomatologiya' },
  { icon: FlaskConical, name: 'Laboratoriya' },
  { icon: Bed, name: 'Statsionar palatalar' },
  { icon: Wallet, name: 'Kassa va to\u2018lov' },
  { icon: Pill, name: 'Dorixona ombori' },
];

const STEPS = [
  { n: '1', title: "Ro'yxatdan o'tish", desc: 'Bemor resepshinda yoki o\u2018zi onlayn ro\u2018yxatdan o\u2018tadi.' },
  { n: '2', title: 'Navbatga yozilish', desc: 'Kerakli shifokor va vaqt tanlanadi, jonli tabloda ko\u2018rinadi.' },
  { n: '3', title: 'Shifokor ko\u2018rigi', desc: 'Tashxis va davolash rejasi tibbiy kartaga yoziladi.' },
  { n: '4', title: 'Retsept va tahlil', desc: 'Kerak bo\u2018lsa dori tayinlanadi yoki laboratoriyaga yuboriladi.' },
  { n: '5', title: "To'lov", desc: 'Xizmatlar kassa orqali chek bilan rasmiylashtiriladi.' },
];

const ROLES = [
  { badge: 'ADMIN', color: 'text-orange-300 bg-orange-500/10 border-orange-500/20', title: 'Administrator', desc: 'Klinikani to\u2018liq nazorat qiladi: xodimlar, moliya, hisobotlar.' },
  { badge: 'XODIM', color: 'text-blue-300 bg-blue-500/10 border-blue-500/20', title: 'Shifokor / xodim', desc: "Bemorlarni ko'radi, davolaydi, retsept va tahlil yozadi." },
  { badge: 'BEMOR', color: 'text-teal-300 bg-teal-500/10 border-teal-500/20', title: 'Bemor', desc: "O'z navbati, retsepti va tahlil natijasini kuzatadi." },
];

const PLANS = [
  {
    name: 'Boshlang\u2018ich',
    price: '590 000',
    period: "so'm / oy",
    desc: '1\u20133 shifokorli kichik klinika uchun',
    features: ['Bemorlar va qabul jadvali', 'Kassa va cheklar', '3 tagacha xodim', 'Email orqali yordam'],
    highlight: false,
  },
  {
    name: 'Standart',
    price: '1 490 000',
    period: "so'm / oy",
    desc: "O'rta klinika, to'liq funksional",
    features: ['Boshlang\u2018ich rejadagi hammasi', 'Laboratoriya va dorixona', 'Elektron retsept', 'SMS bildirishnoma', '10 tagacha xodim', 'Ustuvor yordam'],
    highlight: true,
  },
  {
    name: 'Biznes',
    price: 'Individual',
    period: 'filiallar soniga qarab',
    desc: "Ko'p filialli klinika tarmog'i uchun",
    features: ['Standart rejadagi hammasi', "Cheksiz xodim va filial", 'API integratsiya', 'Shaxsiy menejer'],
    highlight: false,
  },
];

const FAQS = [
  { q: 'Bemorlarning ma\u2018lumotlari xavfsizmi?', a: "Ha. Ma'lumotlar shifrlangan holda saqlanadi, har bir xodim faqat o'z vazifasiga tegishli bo'limlarni ko'radi." },
  { q: 'Bir vaqtning o\u2018zida nechta xodim foydalana oladi?', a: "Tarifga qarab cheklanadi, lekin tizimning o'zi bir vaqtda ko'plab foydalanuvchini qo'llab-quvvatlaydi." },
  { q: 'Bemorlar ilovadan qanday foydalanadi?', a: "Bemor o'zi ro'yxatdan o'tib, shaxsiy kabinetda navbati, retsepti va tahlil natijalarini kuzatadi." },
  { q: "Sinab ko'rish imkoniyati bormi?", a: "Ha, 'Boshlang'ich' reja bilan tizimni bir necha kun bepul sinab ko'rish mumkin." },
];

const NavBar = ({ onGoLogin, onGoRegister }) => {
  const [open, setOpen] = useState(false);
  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#070b14]/90 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
            <HeartPulse className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg">ShifoMed ERP</span>
        </div>

        <nav className="hidden md:flex items-center gap-7 text-sm text-slate-300">
          {NAV_LINKS.map((l) => (
            <button key={l.id} onClick={() => scrollTo(l.id)} className="hover:text-teal-400 transition-colors cursor-pointer">
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button onClick={onGoLogin} className="px-4 py-2 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-900 transition-colors cursor-pointer">
            Kirish
          </button>
          <button onClick={onGoRegister} className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-sm font-semibold transition-colors cursor-pointer">
            Ro'yxatdan o'tish
          </button>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-slate-300">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-800/80 px-6 py-4 space-y-3 bg-[#070b14]">
          {NAV_LINKS.map((l) => (
            <button key={l.id} onClick={() => scrollTo(l.id)} className="block w-full text-left text-sm text-slate-300 py-1">
              {l.label}
            </button>
          ))}
          <div className="flex gap-2 pt-2">
            <button onClick={onGoLogin} className="flex-1 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm">Kirish</button>
            <button onClick={onGoRegister} className="flex-1 px-4 py-2 rounded-xl bg-teal-600 text-sm font-semibold">Ro'yxat</button>
          </div>
        </div>
      )}
    </header>
  );
};

const DashboardMock = () => (
  <div className="relative h-full min-h-[320px] flex items-center justify-center">
    <div className="w-full max-w-sm rounded-2xl bg-[#0a0f1d] border border-slate-800 p-5 shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-slate-400">Bugungi holat</span>
        <span className="flex items-center gap-1.5 text-[11px] text-emerald-400"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Jonli</span>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
          <div className="text-[11px] text-slate-500 mb-1">Qabullar</div>
          <div className="text-xl font-bold text-slate-100">18</div>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
          <div className="text-[11px] text-slate-500 mb-1">Kassa</div>
          <div className="text-xl font-bold text-slate-100">2.4M</div>
        </div>
      </div>
      <div className="space-y-2">
        {[['Alisher Karimov', 'Kardiolog \u00b7 09:30'], ['Dilnoza Yusupova', 'Stomatolog \u00b7 10:15']].map(([n, s]) => (
          <div key={n} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/50">
            <div className="w-7 h-7 rounded-full bg-teal-500/15 text-teal-400 flex items-center justify-center text-[11px] font-semibold">{n[0]}</div>
            <div className="min-w-0">
              <div className="text-xs font-medium text-slate-200 truncate">{n}</div>
              <div className="text-[10px] text-slate-500 truncate">{s}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="absolute -bottom-4 -left-4 w-40 rounded-xl bg-[#0a0f1d] border border-teal-500/30 p-3 shadow-xl hidden sm:block">
      <div className="flex items-center gap-2 text-teal-400 text-[11px] font-semibold mb-1">
        <Check className="w-3.5 h-3.5" /> Yangi bemor
      </div>
      <div className="text-[11px] text-slate-400">Ro'yxatga qo'shildi</div>
    </div>
  </div>
);

export const LandingPage = ({ onGoLogin, onGoRegister }) => {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100">
      <NavBar onGoLogin={onGoLogin} onGoRegister={onGoRegister} />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-14 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-medium mb-6">
            <ShieldCheck className="w-3.5 h-3.5" /> Xususiy klinika va statsionar boshqaruv tizimi
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-5">
            Klinikangizni bitta tizimda boshqaring.
            <br />
            <span className="text-slate-400 font-medium text-3xl sm:text-4xl">Qog'ozsiz, tezroq, aniqroq.</span>
          </h1>
          <p className="text-slate-400 max-w-md mb-8 text-[15px] leading-relaxed">
            Bemorlar, navbat, tibbiy kartalar, retseptlar, laboratoriya va kassa &mdash; barchasi bitta joyda,
            real vaqt rejimida ishlaydi.
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <button onClick={onGoRegister} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 font-semibold text-sm cursor-pointer transition-colors">
              Bemor sifatida ro'yxatdan o'tish <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={onGoLogin} className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-teal-500/60 font-semibold text-sm cursor-pointer transition-colors">
              Akkauntim bor, kirish
            </button>
          </div>
          <div className="flex items-center gap-8 text-sm">
            {[['6+', 'Bo\u2018lim'], ['42+', 'API endpoint'], ["3", 'Foydalanuvchi roli']].map(([num, label]) => (
              <div key={label}>
                <div className="text-xl font-bold text-slate-100">{num}</div>
                <div className="text-slate-500 text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <DashboardMock />
      </section>

      {/* Features */}
      <section id="imkoniyatlar" className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-800/60">
        <div className="mb-10 max-w-lg">
          <h2 className="text-2xl font-bold mb-2">Klinika ishini yengillashtiradigan imkoniyatlar</h2>
          <p className="text-slate-400 text-sm">Har bir modul kundalik ishni tezlashtirish uchun mo'ljallangan.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-5 rounded-2xl bg-[#0a0f1d] border border-slate-800/80 hover:border-slate-700 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-3">
                <Icon className="w-4.5 h-4.5" />
              </div>
              <div className="font-semibold text-sm mb-1">{title}</div>
              <div className="text-slate-400 text-[13px] leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Departments */}
      <section id="xizmatlar" className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-800/60">
        <div className="mb-10 max-w-lg">
          <h2 className="text-2xl font-bold mb-2">Klinikangizning har bir bo'limi uchun</h2>
          <p className="text-slate-400 text-sm">Bitta tizim &mdash; barcha yo'nalishlar bir joyda boshqariladi.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {DEPARTMENTS.map(({ icon: Icon, name }) => (
            <div key={name} className="p-4 rounded-2xl bg-[#0a0f1d] border border-slate-800/80 text-center">
              <div className="w-9 h-9 mx-auto rounded-xl bg-slate-900 text-teal-400 flex items-center justify-center mb-2.5">
                <Icon className="w-4.5 h-4.5" />
              </div>
              <div className="text-xs font-medium text-slate-300">{name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works - a genuine sequence, numbering is justified */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-800/60">
        <div className="mb-10 max-w-lg">
          <h2 className="text-2xl font-bold mb-2">Bemorning klinikadagi yo'li</h2>
          <p className="text-slate-400 text-sm">Kelishdan chiqishgacha bo'lgan har bir qadam tizimda qayd etiladi.</p>
        </div>
        <div className="grid sm:grid-cols-5 gap-4">
          {STEPS.map((s, i) => (
            <div key={s.n} className="relative p-4 rounded-2xl bg-[#0a0f1d] border border-slate-800/80">
              <div className="w-7 h-7 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center mb-3">{s.n}</div>
              <div className="text-sm font-semibold mb-1">{s.title}</div>
              <div className="text-slate-400 text-[12px] leading-relaxed">{s.desc}</div>
              {i < STEPS.length - 1 && <div className="hidden sm:block absolute top-8 -right-2 w-4 h-px bg-slate-700" />}
            </div>
          ))}
        </div>
      </section>

      {/* Roles */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-800/60">
        <h2 className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">
          Uchta rol, har biriga mos huquq
        </h2>
        <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {ROLES.map((r) => (
            <div key={r.badge} className="p-5 rounded-2xl bg-[#0a0f1d] border border-slate-800/80 text-center">
              <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full border mb-3 ${r.color}`}>{r.badge}</span>
              <div className="font-semibold text-sm mb-1">{r.title}</div>
              <div className="text-slate-400 text-[13px]">{r.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="narxlar" className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-800/60">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold mb-2">Klinikangiz hajmiga mos reja</h2>
          <p className="text-slate-400 text-sm">Narxlar namuna sifatida ko'rsatilgan, o'zingizga moslab o'zgartirasiz.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto items-start">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`p-6 rounded-2xl border ${p.highlight ? 'bg-teal-600/10 border-teal-500/40' : 'bg-[#0a0f1d] border-slate-800/80'}`}
            >
              {p.highlight && <div className="text-[10px] font-bold text-teal-300 uppercase tracking-wider mb-2">Tavsiya etiladi</div>}
              <div className="font-semibold text-base mb-1">{p.name}</div>
              <div className="text-slate-400 text-xs mb-4">{p.desc}</div>
              <div className="mb-5">
                <span className="text-2xl font-bold">{p.price}</span>
                <span className="text-slate-500 text-xs ml-1">{p.period}</span>
              </div>
              <ul className="space-y-2 mb-6">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[13px] text-slate-300">
                    <Check className="w-3.5 h-3.5 text-teal-400 mt-0.5 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={onGoRegister}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-colors ${p.highlight ? 'bg-teal-600 hover:bg-teal-500' : 'bg-slate-900 border border-slate-700 hover:border-teal-500/60'}`}
              >
                Boshlash
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-slate-800/60">
        <h2 className="text-2xl font-bold mb-8 text-center">Ko'p so'raladigan savollar</h2>
        <div className="space-y-2">
          {FAQS.map((f, i) => (
            <div key={f.q} className="rounded-2xl bg-[#0a0f1d] border border-slate-800/80 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium cursor-pointer"
              >
                {f.q}
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && <div className="px-5 pb-4 text-slate-400 text-[13px] leading-relaxed">{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="rounded-3xl bg-gradient-to-r from-teal-600/20 to-emerald-600/10 border border-teal-500/20 p-10 text-center">
          <h2 className="text-2xl font-bold mb-3">Klinikangizni bugun raqamlashtiring</h2>
          <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
            Ro'yxatdan o'tish bir necha daqiqa vaqt oladi, o'rnatish talab qilinmaydi.
          </p>
          <button onClick={onGoRegister} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 font-semibold text-sm cursor-pointer transition-colors">
            Bepul boshlash <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="aloqa" className="border-t border-slate-800/80 bg-[#050810]">
        <div className="max-w-6xl mx-auto px-6 pt-14 pb-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-1.5 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400">
                  <HeartPulse className="w-4 h-4" />
                </div>
                <span className="font-bold text-sm">ShifoMed ERP</span>
              </div>
              <p className="text-slate-500 text-[13px] leading-relaxed mb-4 max-w-[220px]">
                Xususiy klinika va statsionarlar uchun yagona boshqaruv tizimi.
              </p>
              <div className="flex items-center gap-2">
                {[Instagram, Facebook, Send].map((Icon, i) => (
                  <a key={i} href="#" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-teal-400 hover:border-teal-500/40 transition-colors">
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-300 mb-3">Tizim</div>
              <ul className="space-y-2 text-[13px] text-slate-500">
                {NAV_LINKS.map((l) => (
                  <li key={l.id}>
                    <a href={`#${l.id}`} className="hover:text-teal-400 transition-colors">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-300 mb-3">Yordam</div>
              <ul className="space-y-2 text-[13px] text-slate-500">
                <li><a href="#" className="hover:text-teal-400 transition-colors">Qo'llab-quvvatlash</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Foydalanish shartlari</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Maxfiylik siyosati</a></li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-300 mb-3">Aloqa</div>
              <ul className="space-y-2.5 text-[13px] text-slate-500">
                <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> +998 71 200-00-00</li>
                <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> info@shifomed.uz</li>
                <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Toshkent shahri</li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-slate-600">
            <span>&copy; {new Date().getFullYear()} ShifoMed ERP &mdash; o'quv loyihasi</span>
            <div className="flex items-center gap-4">
              <button onClick={onGoLogin} className="hover:text-teal-400 transition-colors">Kirish</button>
              <button onClick={onGoRegister} className="hover:text-teal-400 transition-colors">Ro'yxatdan o'tish</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
