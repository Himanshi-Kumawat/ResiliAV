import React, { useState, useRef, useEffect } from 'react';
import { 
  Shield, 
  ShieldAlert, 
  Volume2, 
  VolumeX, 
  User, 
  LogOut, 
  ChevronDown, 
  CheckCircle, 
  KeyRound, 
  ShieldCheck,
  Building2,
  GraduationCap,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export default function Header() {
  const { 
    metrics, 
    currentTime, 
    soundEnabled, 
    setSoundEnabled, 
    user, 
    logout, 
    setActiveTab,
    isMobileSidebarOpen,
    toggleMobileSidebar,
    isSidebarCollapsed,
    toggleSidebarCollapse
  } = useSimulation();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, []);

  const formattedTime = currentTime.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }) + ' ' + currentTime.toTimeString().split(' ')[0];

  const isUnderThreat = metrics.securityHealth === 'Threat Detected';
  const isFailSafe = metrics.failSafeEngaged;

  const handleLogoClick = () => {
    setActiveTab('dashboard');
    const mainEl = document.querySelector('main');
    if (mainEl) {
      mainEl.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 h-16 bg-[#080D1A]/95 backdrop-blur-xl border-b border-[#1A2942] px-2.5 sm:px-6 flex items-center justify-between select-none shadow-lg w-full">
      {/* Left Section: Mobile Drawer Toggle / Desktop Collapse Toggle + Brand */}
      <div className="flex items-center gap-1.5 sm:gap-3.5 min-w-0">
        {/* Mobile Hamburger Drawer Button */}
        <button
          onClick={toggleMobileSidebar}
          className="md:hidden p-1.5 sm:p-2 rounded-xl bg-[#0E1528] border border-[#1E2D4A] text-slate-300 hover:text-white hover:border-cyan-500/50 transition-colors focus:outline-none flex-shrink-0"
          aria-label="Toggle navigation drawer"
          title={isMobileSidebarOpen ? "Close Menu" : "Open Menu"}
        >
          {isMobileSidebarOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Desktop Sidebar Collapse Toggle Button */}
        <button
          onClick={toggleSidebarCollapse}
          className="hidden md:flex items-center justify-center p-2 rounded-xl bg-[#0E1528] border border-[#1E2D4A] text-slate-400 hover:text-cyan-300 hover:border-cyan-500/50 transition-all focus:outline-none flex-shrink-0"
          title={isSidebarCollapsed ? "Expand Sidebar" : "Minimize Sidebar"}
        >
          {isSidebarCollapsed ? (
            <PanelLeftOpen className="w-4 h-4 text-cyan-400" />
          ) : (
            <PanelLeftClose className="w-4 h-4" />
          )}
        </button>

        {/* Brand & Subtitle (Clickable to scroll to top) */}
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-2 sm:gap-3 text-left group focus:outline-none transition-transform active:scale-98 min-w-0"
          title="Go to Top of Dashboard"
        >
          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
            isUnderThreat
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.3)] animate-pulse'
              : 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-[0_0_12px_rgba(0,240,255,0.2)] group-hover:border-cyan-400'
          }`}>
            {isUnderThreat ? <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400" /> : <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="text-base sm:text-xl font-bold tracking-tight text-white flex items-center gap-1.5 group-hover:text-cyan-300 transition-colors truncate">
                ResiliAV
              </h1>
              <span className="text-[8px] sm:text-[10px] font-mono uppercase px-1.5 sm:px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold flex-shrink-0">
                ASIL-D
              </span>
            </div>
            <p className="text-xs text-slate-400 tracking-wide group-hover:text-slate-300 transition-colors hidden lg:block truncate">
              Adaptive Closed-Loop Hybrid Intrusion Detection & Automated Fail-Safe Actuation
            </p>
          </div>
        </button>
      </div>

      {/* Right Controls & Telemetry Time */}
      <div className="flex items-center gap-1.5 sm:gap-4 text-sm flex-shrink-0">
        {/* System Online / Threat Detected Badge */}
        <div className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium border transition-all duration-300 ${
          isUnderThreat
            ? 'bg-rose-500/10 text-rose-400 border-rose-500/30 shadow-[0_0_10px_rgba(244,63,94,0.2)]'
            : isFailSafe
            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
        }`}>
          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
            isUnderThreat
              ? 'bg-rose-400 animate-ping'
              : isFailSafe
              ? 'bg-amber-400'
              : 'bg-emerald-400 animate-pulse'
          }`} />
          <span className="font-mono whitespace-nowrap">
            {isUnderThreat ? (
              <>Threat<span className="hidden xs:inline"> Detected</span></>
            ) : isFailSafe ? (
              <>Fail-Safe<span className="hidden xs:inline"> Engaged</span></>
            ) : (
              <><span className="hidden xs:inline">System </span>Online</>
            )}
          </span>
        </div>

        {/* Real-time Clock */}
        <div className="hidden lg:block text-slate-300 font-mono text-xs tracking-wider bg-[#060A12] px-3 py-1.5 rounded-lg border border-[#1A2942]">
          {formattedTime}
        </div>

        {/* Audio Advisory Voice Toggle */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          title={soundEnabled ? 'Telematics Audio Voice Active (Click to Mute)' : 'Telematics Audio Muted (Click to Unmute)'}
          className={`p-1.5 sm:p-2 rounded-lg border transition-colors flex-shrink-0 ${
            soundEnabled
              ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20'
              : 'bg-slate-800/50 border-slate-700 text-slate-500 hover:text-slate-300'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Author / Operator Badge with Dropdown & Logout */}
        <div className="relative flex-shrink-0" ref={profileMenuRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-1.5 sm:gap-2.5 sm:pl-3 sm:border-l sm:border-[#1A2942] hover:opacity-90 transition-opacity focus:outline-none"
            aria-label="User Profile"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-sky-400 p-[1.5px] shadow-[0_0_10px_rgba(0,240,255,0.3)]">
              <div className="w-full h-full rounded-full bg-[#080D1A] flex items-center justify-center text-cyan-300 font-bold text-[11px] sm:text-xs">
                HK
              </div>
            </div>
            <div className="hidden md:block text-left">
              <div className="text-xs font-semibold text-slate-200 flex items-center gap-1">
                <span>{user.name}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
              <div className="text-[10px] text-cyan-400 font-mono truncate max-w-[130px]">
                JECRC University
              </div>
            </div>
          </button>

          {/* Profile Dropdown Popup Menu */}
          {isProfileOpen && (
            <>
              {/* Mobile dimming backdrop for popup */}
              <div 
                className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 sm:hidden"
                onClick={() => setIsProfileOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-[calc(100vw-24px)] max-w-xs sm:w-80 rounded-2xl bg-[#090F1B]/95 border border-[#1B2943] shadow-[0_10px_50px_rgba(0,0,0,0.95)] backdrop-blur-2xl p-4 space-y-3 z-50 animate-fadeIn">
                {/* User Identity Info */}
                <div className="flex items-center gap-3 pb-3 border-b border-[#1A2942]">
                  <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm flex-shrink-0">
                    HK
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-white truncate">{user.name}</div>
                    <div className="text-[11px] text-cyan-300 font-mono truncate">{user.email}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5 font-semibold truncate">
                      {user.role}
                    </div>
                  </div>
                </div>

                {/* Academic Info */}
                <div className="p-3 rounded-xl bg-[#060A12] border border-slate-800 text-xs font-mono space-y-1.5">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-500 flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-cyan-400" /> Degree:
                    </span>
                    <span className="text-white font-bold">{user.degree || 'BCA (Final Year)'}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-amber-400" /> Institution:
                    </span>
                    <span className="text-amber-300 font-semibold truncate max-w-[140px] sm:max-w-[150px]">
                      {user.institution || 'JECRC University, Jaipur'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-500">Security Clearance:</span>
                    <span className="text-emerald-400 font-bold">ASIL-D Level 4</span>
                  </div>
                </div>

                {/* Action Buttons: Sign Out / Logout */}
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    logout();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 hover:text-white border border-rose-500/40 hover:border-rose-400 font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-98 shadow-sm"
                >
                  <LogOut className="w-4 h-4 text-rose-400" />
                  <span>Sign Out of Terminal</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
