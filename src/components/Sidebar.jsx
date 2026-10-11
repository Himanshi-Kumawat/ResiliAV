import React from 'react';
import {
  LayoutDashboard,
  Car,
  ShieldAlert,
  ShieldCheck,
  BarChart3,
  Network,
  X,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export default function Sidebar() {
  const { 
    activeTab, 
    setActiveTab,
    isMobileSidebarOpen,
    closeMobileSidebar,
    isSidebarCollapsed,
    toggleSidebarCollapse,
    logout,
    user
  } = useSimulation();

  // Navigation Items
  const navItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard,
      color: 'text-cyan-400',
      activeBg: 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.18)]',
      dot: 'bg-cyan-400'
    },
    { 
      id: 'monitoring', 
      label: 'Vehicle Monitoring', 
      icon: Car,
      color: 'text-sky-400',
      activeBg: 'bg-sky-500/15 border-sky-500/40 text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.18)]',
      dot: 'bg-sky-400'
    },
    { 
      id: 'intrusion', 
      label: 'Intrusion Detection', 
      icon: ShieldAlert,
      color: 'text-purple-400',
      activeBg: 'bg-purple-500/15 border-purple-500/40 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.18)]',
      dot: 'bg-purple-400'
    },
    { 
      id: 'failsafe', 
      label: 'Fail-Safe & Response', 
      icon: ShieldCheck,
      color: 'text-amber-400',
      activeBg: 'bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.18)]',
      dot: 'bg-amber-400'
    },
    { 
      id: 'analytics', 
      label: 'Model Analytics', 
      icon: BarChart3,
      color: 'text-emerald-400',
      activeBg: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.18)]',
      dot: 'bg-emerald-400'
    },
    { 
      id: 'architecture', 
      label: 'Architecture', 
      icon: Network,
      color: 'text-blue-400',
      activeBg: 'bg-blue-500/15 border-blue-500/40 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.18)]',
      dot: 'bg-blue-400'
    }
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileSidebarOpen && (
        <div 
          onClick={closeMobileSidebar}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 animate-fadeIn"
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar (Off-canvas drawer on mobile, static collapsible on desktop) */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 bg-[#080D1A] border-r border-[#1B2943] flex flex-col justify-between select-none
          transition-all duration-300 ease-in-out
          ${isMobileSidebarOpen ? 'translate-x-0 shadow-[0_0_60px_rgba(0,0,0,0.9)]' : '-translate-x-full pointer-events-none md:pointer-events-auto'}
          md:static md:translate-x-0 md:shadow-none
          ${isSidebarCollapsed ? 'md:w-20' : 'w-72 md:w-64'}
        `}
      >
        {/* Top Nav Header & Items */}
        <div className="p-3 sm:p-3.5 space-y-1.5 flex-1 overflow-y-auto">
          
          {/* Mobile Drawer Header with Close Button */}
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#1B2943] md:hidden">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase text-white tracking-wider">
                ResiliAV Modules
              </span>
            </div>
            <button 
              onClick={closeMobileSidebar}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors focus:outline-none"
              aria-label="Close navigation drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between px-2.5 py-1 text-[10px] uppercase font-mono font-bold tracking-wider text-slate-500">
            {!isSidebarCollapsed ? (
              <>
                <span>Command Modules</span>
                <button
                  onClick={toggleSidebarCollapse}
                  className="p-1 rounded text-slate-500 hover:text-cyan-400 hover:bg-[#111C32] transition-colors"
                  title="Minimize Sidebar"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <div className="w-full flex justify-center py-1">
                <button
                  onClick={toggleSidebarCollapse}
                  className="p-1.5 rounded-lg bg-[#0E1528] text-slate-400 hover:text-cyan-400 hover:bg-[#111C32] transition-colors"
                  title="Expand Sidebar"
                >
                  <ChevronRight className="w-4 h-4 text-cyan-400" />
                </button>
              </div>
            )}
          </div>

          {/* Nav Items List */}
          <nav className="space-y-1.5 pt-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    closeMobileSidebar();
                  }}
                  title={item.label}
                  className={`w-full flex items-center ${
                    isSidebarCollapsed ? 'md:justify-center md:px-2 md:py-3' : 'justify-between px-3.5 py-2.5'
                  } rounded-xl text-sm font-medium transition-all duration-200 border ${
                    isActive
                      ? item.activeBg + ' font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#111C32] border-transparent'
                  }`}
                >
                  <div className={`flex items-center ${isSidebarCollapsed ? 'md:gap-0' : 'gap-3'}`}>
                    <Icon className={`w-4 h-4 transition-transform duration-200 ${
                      isActive ? 'scale-110 ' + item.color : 'text-slate-400'
                    }`} />
                    <span className={isSidebarCollapsed ? 'md:hidden' : 'inline'}>
                      {item.label}
                    </span>
                  </div>
                  
                  {isActive && !isSidebarCollapsed && (
                    <span className={`w-1.5 h-1.5 rounded-full ${item.dot} animate-pulse md:inline`} />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer / Specs */}
        <div className="p-3 sm:p-3.5 border-t border-[#1B2943] space-y-2.5">
          {!isSidebarCollapsed ? (
            <>
              {/* Quick Specs Box */}
              <div className="p-3 rounded-xl bg-[#060A12] border border-slate-800 text-[11px] font-mono space-y-1 text-slate-400">
                <div className="flex justify-between">
                  <span>CAN Rate:</span>
                  <span className="text-cyan-400 font-semibold">1.0 Mbps</span>
                </div>
                <div className="flex justify-between">
                  <span>ISO Spec:</span>
                  <span className="text-amber-400 font-semibold">26262 ASIL-D</span>
                </div>
                <div className="flex justify-between">
                  <span>Inference:</span>
                  <span className="text-emerald-400 font-semibold">1.48 ms</span>
                </div>
              </div>

              {/* Mobile Direct Logout Button */}
              <button
                onClick={() => {
                  closeMobileSidebar();
                  logout();
                }}
                className="w-full md:hidden py-2.5 px-3 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 flex items-center justify-center gap-2 text-xs font-semibold transition-colors active:scale-98"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span>Sign Out of Terminal</span>
              </button>

              {/* Minimize Sidebar Button (Desktop) / Status */}
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>ResiliAV Cockpit</span>
                <button
                  onClick={toggleSidebarCollapse}
                  className="hidden md:inline-flex items-center gap-1 text-[10px] text-cyan-400/80 hover:text-cyan-300 hover:underline"
                >
                  <span>Minimize</span>
                  <ChevronLeft className="w-3 h-3" />
                </button>
              </div>
            </>
          ) : (
            <div className="hidden md:flex flex-col items-center gap-2 py-1">
              <button
                onClick={toggleSidebarCollapse}
                className="w-9 h-9 rounded-xl bg-[#060A12] border border-slate-800 flex items-center justify-center text-cyan-400 hover:border-cyan-500/50 hover:bg-[#111C32] transition-colors"
                title="Expand Sidebar"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="text-[9px] font-mono text-cyan-400 font-bold uppercase">
                ASIL-D
              </span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
