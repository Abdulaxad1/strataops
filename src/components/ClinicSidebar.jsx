import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  CalendarClock,
  Stethoscope,
  FileHeart,
  FileSignature,
  FlaskConical,
  Receipt,
  BedDouble,
  Pill,
  BadgeDollarSign,
  FileCode2,
  ActivitySquare,
  ClipboardList,
  Monitor,
  TrendingUp,
  Smile,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronDown,
  LogOut
} from 'lucide-react';
import { useAuth } from '../auth/AuthContext.jsx';

export const ClinicSidebar = ({
  currentTab,
  onTabChange,
  stats,
  onOpenQueueTv
}) => {
  const { user, logout } = useAuth();
  // Yon panel holati (yig'ilgan / ochiq) brauzerda saqlanadi
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem('sidebarCollapsed') === '1';
    } catch {
      return false;
    }
  });

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('sidebarCollapsed', next ? '1' : '0');
      } catch {
        /* localStorage mavjud emas — e'tiborsiz qoldiramiz */
      }
      return next;
    });
  };

  // Har bir bo'lim (guruh) alohida ochilib-yopiladi, holati saqlanadi
  const [closedGroups, setClosedGroups] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('sidebarClosedGroups') || '[]');
    } catch {
      return [];
    }
  });

  const toggleGroup = (idx) => {
    setClosedGroups((prev) => {
      const next = prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx];
      try {
        localStorage.setItem('sidebarClosedGroups', JSON.stringify(next));
      } catch {
        /* e'tiborsiz qoldiramiz */
      }
      return next;
    });
  };

  const mainGroups = [
    {
      title: 'Asosiy Boshqaruv',
      items: [
        { id: 'dashboard', label: 'Boshqaruv Paneli', icon: LayoutDashboard },
        { id: 'patients', label: 'Bemorlar Bazasi', icon: Users, count: stats?.totalPatients },
        { id: 'appointments', label: 'Qabullar & Navbat', icon: CalendarClock, count: stats?.todayAppointments, badgeColor: 'bg-teal-500/20 text-teal-300' },
        { id: 'queue-tv', label: 'Jonli TV Tablo (Monitor)', icon: Monitor, badgeColor: 'bg-purple-500/20 text-purple-300', isAction: true },
        { id: 'doctors', label: 'Shifokorlar', icon: Stethoscope, count: stats?.activeDoctors }
      ]
    },
    {
      title: 'Tibbiy Bo\'limlar',
      items: [
        { id: 'records', label: 'Tibbiy Kartalar (EHR)', icon: FileHeart },
        { id: 'prescriptions', label: 'Retseptlar', icon: FileSignature },
        { id: 'dental', label: 'Stomatologiya (32 Tish)', icon: Smile, badgeColor: 'bg-teal-500/10 text-teal-300' },
        { id: 'lab-tests', label: 'Laboratoriya', icon: FlaskConical, count: stats?.completedTestsToday ? `${stats.completedTestsToday}` : undefined },
        { id: 'wards', label: 'Statsionar Palatalar', icon: BedDouble, count: stats ? `${stats.occupiedBeds}/${stats.totalBeds}` : undefined }
      ]
    },
    {
      title: 'Moliya & Ombor',
      items: [
        { id: 'billing', label: 'Kassa & Moliya', icon: Receipt },
        { id: 'analytics', label: 'Moliyaviy Analitika', icon: TrendingUp, badgeColor: 'bg-emerald-500/20 text-emerald-300' },
        { id: 'pharmacy', label: 'Dorixona Ombori', icon: Pill, count: stats?.lowStockItemsCount ? `! ${stats.lowStockItemsCount}` : undefined, badgeColor: 'bg-amber-500/20 text-amber-300' },
        { id: 'services', label: 'Xizmatlar & Tariflar', icon: BadgeDollarSign }
      ]
    },
    {
      title: 'Xabarlar & Nazorat',
      items: [
        { id: 'notifications', label: 'SMS & Telegram Markazi', icon: MessageSquare, badgeColor: 'bg-blue-500/20 text-blue-300' },
        { id: 'logs', label: 'Amaliyot Jurnali (Audit)', icon: ClipboardList, badgeColor: 'bg-cyan-500/20 text-cyan-300' },
        { id: 'standalone', label: 'Yagona Fayl / Eksport', icon: FileCode2, badgeColor: 'bg-emerald-500/20 text-emerald-300' }
      ]
    }
  ];

  const hiddenForStaff = ['logs', 'standalone'];
  const groups = mainGroups.map((g) => ({
    ...g,
    items: user?.role === 'admin' ? g.items : g.items.filter((i) => !hiddenForStaff.includes(i.id))
  }));

  const handleClickItem = (item) => {
    if (item.id === 'queue-tv' && onOpenQueueTv) {
      onOpenQueueTv();
    } else {
      onTabChange(item.id);
    }
  };

  return (
    <aside
      className={`w-full ${collapsed ? 'lg:w-[72px]' : 'lg:w-64'} bg-[#0a0f1d] border-r border-slate-800/80 flex flex-col flex-shrink-0 transition-[width] duration-200`}
    >
      {/* Ochish / yopish tugmasi */}
      <div className={`flex items-center px-3 pt-3 ${collapsed ? 'lg:justify-center' : 'justify-between'}`}>
        {!collapsed && <span className="text-xs font-semibold text-slate-400 pl-1">Menyu</span>}
        {collapsed && <span className="text-xs font-semibold text-slate-400 pl-1 lg:hidden">Menyu</span>}
        <button
          type="button"
          onClick={toggleCollapsed}
          aria-label={collapsed ? 'Menyuni ochish' : 'Menyuni yig\'ish'}
          aria-expanded={!collapsed}
          title={collapsed ? 'Menyuni ochish' : 'Menyuni yig\'ish'}
          className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/70 transition-colors cursor-pointer"
        >
          {collapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>

      <div className={`p-3 space-y-4 flex-1 overflow-y-auto ${collapsed ? 'hidden lg:block' : ''}`}>
        {groups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            {collapsed ? (
              gIdx > 0 && <div className="mx-2 border-t border-slate-800/80" />
            ) : (
              <button
                type="button"
                onClick={() => toggleGroup(gIdx)}
                aria-expanded={!closedGroups.includes(gIdx)}
                className="w-full flex items-center justify-between px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-slate-300 hover:bg-slate-800/40 transition-colors cursor-pointer"
              >
                <span>{group.title}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${closedGroups.includes(gIdx) ? '-rotate-90' : ''}`}
                />
              </button>
            )}

            {(collapsed || !closedGroups.includes(gIdx) ? group.items : []).map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleClickItem(item)}
                  title={collapsed ? item.label : undefined}
                  aria-label={item.label}
                  className={`relative w-full flex items-center ${collapsed ? 'lg:justify-center' : ''} justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all text-left cursor-pointer group ${
                    isActive
                      ? 'bg-gradient-to-r from-teal-600/30 to-emerald-600/20 text-teal-300 border border-teal-500/40 shadow-sm shadow-teal-500/10 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`${collapsed ? 'lg:w-5 lg:h-5' : ''} w-4 h-4 flex-shrink-0 transition-colors ${isActive ? 'text-teal-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                    <span className={`truncate ${collapsed ? 'lg:hidden' : ''}`}>{item.label}</span>
                  </div>

                  {collapsed && (item.count !== undefined || item.badgeColor) && (
                    <span className="hidden lg:block absolute top-1.5 right-2 w-2 h-2 rounded-full bg-teal-400" />
                  )}

                  {item.count !== undefined ? (
                    <span className={`${collapsed ? 'lg:hidden' : ''} text-[10px] px-1.5 py-0.5 rounded-md font-mono font-medium tracking-tight ${item.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                      {item.count}
                    </span>
                  ) : item.badgeColor ? (
                    <span className={`${collapsed ? 'lg:hidden' : ''} text-[9px] px-1.5 py-0.5 rounded-md font-medium tracking-tight ${item.badgeColor}`}>
                      {item.isAction ? 'TV' : 'Yangi'}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Joriy foydalanuvchi va chiqish */}
      <div className={`mx-2.5 mt-1 flex items-center gap-2 ${collapsed ? 'lg:flex-col' : ''}`}>
        <div className={`flex-1 min-w-0 text-xs ${collapsed ? 'lg:hidden' : ''}`}>
          <div className="font-semibold text-slate-200 truncate">{user?.fullName}</div>
          <div className="text-[10px] text-slate-500">{user?.role === 'admin' ? 'Administrator' : 'Xodim'}</div>
        </div>
        <button
          type="button"
          onClick={logout}
          title="Tizimdan chiqish"
          aria-label="Tizimdan chiqish"
          className="p-2 rounded-lg text-slate-400 hover:text-rose-300 hover:bg-slate-800/70 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>

      {/* Hospital System Info Card at Bottom */}
      <div className={`${collapsed ? 'hidden lg:block lg:p-2' : ''} p-3.5 m-2.5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800/80`}>
        <div className={`flex items-center gap-2.5 ${collapsed ? 'lg:justify-center' : ''}`}>
          <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20" title={collapsed ? 'ShifoMed v2.4 PRO' : undefined}>
            <ActivitySquare className="w-4 h-4" />
          </div>
          <div className={collapsed ? 'lg:hidden' : ''}>
            <div className="text-xs font-semibold text-slate-200">ShifoMed v2.4 PRO</div>
            <div className="text-[10px] text-slate-400">Yagona Boshqaruv Paneli</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
