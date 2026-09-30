import React, { useState, useEffect } from 'react';
import {
  Monitor,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  X,
  Clock,
  HeartPulse,
  DoorOpen,
  UserCheck,
  Building2,
  BellRing
} from 'lucide-react';

export const QueueTvModal = ({ appointments = [], doctors = [], onClose }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Digital clock update
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Web Audio Chime Sound (D5 -> A5 Hospital chime)
  const playQueueChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.18); // A5
      
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch (e) {
      console.warn('Audio chime warning:', e);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  // Filter today's appointments
  const today = new Date().toISOString().split('T')[0];
  const todayApps = appointments.filter(a => a.date === today);

  const inProgressList = todayApps.filter(a => a.status === 'in_progress');
  const waitingList = todayApps.filter(a => a.status === 'pending');

  return (
    <div className="fixed inset-0 z-50 bg-[#040812] text-white flex flex-col font-sans select-none overflow-hidden">
      
      {/* TV Header Bar */}
      <header className="px-6 py-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border-2 border-teal-400 flex items-center justify-center text-teal-400 shadow-lg shadow-teal-500/20">
            <HeartPulse className="w-7 h-7 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight uppercase bg-gradient-to-r from-white via-teal-100 to-teal-400 bg-clip-text text-transparent">
                "ShifoMed" Tibbiyot Markazi
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Jonli Tablo
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Kutish zali monitori va navbatdagi bemorlar ko'rsatkichi
            </p>
          </div>
        </div>

        {/* Clock & Controls */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-2xl font-black font-mono tracking-wider text-teal-300">
              {currentTime.toLocaleTimeString('uz-UZ')}
            </div>
            <div className="text-xs text-slate-400">
              {currentTime.toLocaleDateString('uz-UZ', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>

          <div className="flex items-center gap-2 pl-4 border-l border-slate-800">
            <button
              onClick={playQueueChime}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-teal-400 border border-slate-700 transition cursor-pointer"
              title="Qo'ng'iroq chalish (Chime test)"
            >
              <BellRing className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2.5 rounded-xl border transition cursor-pointer ${
                soundEnabled
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-slate-900 text-slate-500 border-slate-800'
              }`}
              title={soundEnabled ? 'Ovoz yoqilgan' : 'Ovoz o\'chirilgan'}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition cursor-pointer"
              title="To'liq ekran rejimi"
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 border border-rose-500/30 transition cursor-pointer"
              title="Yopish (Chiqish)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Split Grid (Calling Now vs Waiting Queue) */}
      <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
        
        {/* Left: Calling Now / In Progress (7 cols) */}
        <div className="lg:col-span-7 flex flex-col rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950 border-2 border-emerald-500/40 p-6 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full bg-emerald-400 animate-ping" />
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-emerald-400">
                Hozir Qabulda (Kiring)
              </h2>
            </div>
            <span className="text-sm font-bold text-slate-400">
              {inProgressList.length} ta kabinet faol
            </span>
          </div>

          <div className="flex-1 overflow-y-auto mt-4 space-y-3">
            {inProgressList.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-2 py-12">
                <DoorOpen className="w-16 h-16 text-slate-700" />
                <p className="text-lg font-semibold">Hozirda qabulga chaqirilgan bemorlar yo'q</p>
                <p className="text-xs text-slate-600">Shifokor qabulni boshlashi bilan raqam ekranda yonadi</p>
              </div>
            ) : (
              inProgressList.map((app) => (
                <div
                  key={app.id}
                  className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-950 border-2 border-emerald-500/50 flex items-center justify-between shadow-lg ring-1 ring-emerald-500/30 animate-pulse"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-emerald-500 text-slate-950 font-black text-4xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                      #{app.queueNumber}
                    </div>
                    <div>
                      <div className="text-2xl font-black text-white tracking-tight">
                        {app.patientName}
                      </div>
                      <div className="text-sm text-teal-300 font-semibold mt-1">
                        Shifokor: {app.doctorName} ({app.department})
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-slate-400 uppercase font-semibold">Kabinet</div>
                    <div className="text-3xl font-black text-emerald-400 font-mono">
                      {app.room}
                    </div>
                    <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      QABULDA
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Waiting Queue (5 cols) */}
        <div className="lg:col-span-5 flex flex-col rounded-3xl bg-slate-900/80 border border-slate-800 p-6 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold uppercase tracking-wider text-amber-300">
                Navbatda Kutilmoqda
              </h2>
            </div>
            <span className="text-xs font-mono font-bold bg-amber-500/10 text-amber-300 px-2.5 py-1 rounded-full border border-amber-500/20">
              {waitingList.length} kishi
            </span>
          </div>

          <div className="flex-1 overflow-y-auto mt-4 space-y-2.5">
            {waitingList.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 py-12">
                <UserCheck className="w-12 h-12 text-slate-700 mb-2" />
                <p className="text-sm">Barcha bemorlar qabul qilib bo'lingan</p>
              </div>
            ) : (
              waitingList.map((app) => (
                <div
                  key={app.id}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 text-teal-300 font-black text-base flex items-center justify-center border border-slate-700">
                      #{app.queueNumber}
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">
                        {app.patientName}
                      </div>
                      <div className="text-xs text-slate-400">
                        {app.doctorName} • {app.room}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-mono font-semibold text-amber-300">
                      {app.timeSlot}
                    </div>
                    <span className="text-[10px] text-slate-500">Kutilmoqda</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Footer Ticker / Announcements Bar */}
      <footer className="px-6 py-3 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-bold uppercase tracking-wider text-[10px] flex-shrink-0">
            E'lon:
          </span>
          <div className="truncate text-slate-300 font-medium">
            Hurmatli bemorlar, navbatingiz kelganda belgilangan xonaga kiring. Ma'lumot va to'lovlar uchun kassa yoki registratsiyaga murojaat qiling: +998 (71) 200-00-55.
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0 font-mono text-[11px] text-slate-400">
          <span>SHIFOMED TV TABLO v2.4</span>
        </div>
      </footer>

    </div>
  );
};
