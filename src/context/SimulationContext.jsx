import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_METRICS, INITIAL_ALERTS, INITIAL_EVENTS } from '../data/mockData';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const SimulationContext = createContext(null);

// Default Pre-Registered Official Accounts (Batch 2024-2027, Passing Out in 2027)
const DEFAULT_REGISTERED_USERS = [
  {
    name: 'Himanshi Kumawat',
    email: 'Himanshi.24bcan0421@jecrcu.edu.in',
    password: 'ResiliAV@2027',
    alternatePassword: 'ResiliAV@2026',
    degree: 'BCA (Final Year - 2027)',
    institution: 'JECRC University, Jaipur',
    role: 'Lead Developer & Researcher',
    clearance: 'ISO 26262 ASIL-D Certified'
  }
];

export const SimulationProvider = ({ children }) => {
  const [metrics, setMetrics] = useState(INITIAL_METRICS);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [activeAttack, setActiveAttack] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeTab, setActiveTabState] = useState('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Responsive Mobile Drawer & Desktop Collapsible Sidebar States
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleMobileSidebar = () => setIsMobileSidebarOpen(prev => !prev);
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);
  const toggleSidebarCollapse = () => setIsSidebarCollapsed(prev => !prev);

  const setActiveTab = (tab) => {
    setActiveTabState(tab);
    setIsMobileSidebarOpen(false); // Auto-close drawer on navigation
  };

  // Persistent User Session
  const [user, setUser] = useState(() => {
    try {
      const savedSession = localStorage.getItem('resiliav_user_session');
      if (savedSession) {
        return JSON.parse(savedSession);
      }
    } catch {}
    return DEFAULT_REGISTERED_USERS[0];
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('resiliav_authenticated') === 'true';
  });

  // Get Registered Accounts Database
  const getRegisteredUsers = () => {
    try {
      const data = localStorage.getItem('resiliav_registered_users');
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Synchronize default researcher profile with 2027 batch credentials
          const synchronized = parsed.map(u => {
            if (u.email && u.email.toLowerCase() === 'himanshi.24bcan0421@jecrcu.edu.in') {
              return {
                ...u,
                password: 'ResiliAV@2027',
                alternatePassword: 'ResiliAV@2026',
                degree: 'BCA (Final Year - 2027)'
              };
            }
            return u;
          });
          localStorage.setItem('resiliav_registered_users', JSON.stringify(synchronized));
          return synchronized;
        }
      }
    } catch {}
    localStorage.setItem('resiliav_registered_users', JSON.stringify(DEFAULT_REGISTERED_USERS));
    return DEFAULT_REGISTERED_USERS;
  };

  // Real Authentication: Credential Validation (Without instant state switch)
  const validateLoginCredentials = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase();

    // 1. Supabase Live Mode (if configured in .env)
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: password
        });
        if (error) {
          return { success: false, error: error.message };
        }
        const loggedUser = {
          name: data.user?.user_metadata?.full_name || 'Himanshi Kumawat',
          email: data.user?.email || cleanEmail,
          degree: 'BCA (Final Year)',
          institution: 'JECRC University, Jaipur',
          role: 'Lead Developer & Researcher',
          clearance: 'ISO 26262 ASIL-D Certified'
        };
        return { success: true, user: loggedUser, isSupabase: true };
      } catch (err) {
        return { success: false, error: err.message };
      }
    }

    // 2. Persistent Registered Accounts Database Mode
    const registeredUsers = getRegisteredUsers();
    const existingAccount = registeredUsers.find(
      u => u.email.trim().toLowerCase() === cleanEmail
    );

    if (!existingAccount) {
      return {
        success: false,
        error: `No account found with "${email}". Please Sign Up / Register first to create your account.`
      };
    }

    const isPasswordValid = 
      existingAccount.password === password || 
      existingAccount.alternatePassword === password ||
      (cleanEmail === 'himanshi.24bcan0421@jecrcu.edu.in' && (password === 'ResiliAV@2027' || password === 'ResiliAV@2026'));

    if (!isPasswordValid) {
      return {
        success: false,
        error: 'Incorrect passkey! Please verify your password and try again.'
      };
    }

    return { success: true, user: existingAccount, isSupabase: false };
  };

  // Real Authentication: Sign Up Validation (Without instant state switch)
  const validateSignupCredentials = async ({ fullName, email, password, department }) => {
    const cleanEmail = email.trim().toLowerCase();

    // 1. Supabase Live Mode
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password: password,
          options: {
            data: {
              full_name: fullName,
              department: department
            }
          }
        });
        if (error) {
          return { success: false, error: error.message };
        }
        const newUser = {
          name: fullName,
          email: cleanEmail,
          degree: 'BCA (Final Year)',
          institution: department || 'JECRC University, Jaipur',
          role: 'Lead Developer & Researcher',
          clearance: 'ISO 26262 ASIL-D Certified'
        };
        return { success: true, user: newUser, isSupabase: true };
      } catch (err) {
        return { success: false, error: err.message };
      }
    }

    // 2. Persistent Registered Accounts Database Mode
    const registeredUsers = getRegisteredUsers();
    const emailExists = registeredUsers.some(
      u => u.email.trim().toLowerCase() === cleanEmail
    );

    if (emailExists) {
      return {
        success: false,
        error: `An account with "${email}" already exists! Please Sign In instead.`
      };
    }

    if (password.length < 6) {
      return {
        success: false,
        error: 'Security passkey must be at least 6 characters long.'
      };
    }

    const newUser = {
      name: fullName.trim(),
      email: cleanEmail,
      password: password,
      degree: 'BCA (Final Year)',
      institution: department || 'JECRC University, Jaipur',
      role: 'Lead Developer & Researcher',
      clearance: 'ISO 26262 ASIL-D Certified'
    };

    return { success: true, user: newUser, isSupabase: false };
  };

  // Commit and activate authenticated session after security verification completes
  const completeLoginSession = (loggedUser) => {
    setUser(loggedUser);
    setIsAuthenticated(true);
    localStorage.setItem('resiliav_authenticated', 'true');
    localStorage.setItem('resiliav_user_session', JSON.stringify(loggedUser));
  };

  const completeSignupSession = (newUser, isSupabase = false) => {
    if (!isSupabase) {
      const registeredUsers = getRegisteredUsers();
      const updatedUsers = [...registeredUsers, newUser];
      localStorage.setItem('resiliav_registered_users', JSON.stringify(updatedUsers));
    }
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('resiliav_authenticated', 'true');
    localStorage.setItem('resiliav_user_session', JSON.stringify(newUser));
  };

  // Direct login helper (fallback)
  const login = async (email, password) => {
    const res = await validateLoginCredentials(email, password);
    if (res.success) {
      completeLoginSession(res.user);
    }
    return res;
  };

  // Direct signup helper (fallback)
  const signup = async (data) => {
    const res = await validateSignupCredentials(data);
    if (res.success) {
      completeSignupSession(res.user, res.isSupabase);
    }
    return res;
  };

  // Logout Handler
  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch {}
    }
    localStorage.removeItem('resiliav_authenticated');
    localStorage.removeItem('resiliav_user_session');
    setIsAuthenticated(false);
  };

  // Clock ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Subtle telemetry jitter
  useEffect(() => {
    const jitter = setInterval(() => {
      if (!activeAttack && !metrics.failSafeEngaged && isAuthenticated) {
        setMetrics(prev => ({
          ...prev,
          speed: Math.min(65, Math.max(59, prev.speed + (Math.random() > 0.5 ? 0.3 : -0.3))),
          canBusTraffic: Math.round(1248 + (Math.random() * 24 - 12)),
          temperature: Math.round(36 + (Math.random() > 0.7 ? 0.2 : -0.1)),
        }));
      }
    }, 1200);
    return () => clearInterval(jitter);
  }, [activeAttack, metrics.failSafeEngaged, isAuthenticated]);

  // Voice speech announcement
  const speakVoiceAlert = (text) => {
    if (!soundEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 0.95;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis not supported or failed:", e);
    }
  };

  // Inject attack simulation
  const injectAttack = (attackType) => {
    setActiveAttack(attackType);
    
    let attackName = 'CAN Injection';
    let canId = '0x0000';
    let alertMsg = 'Abnormal frame pattern detected';
    let voiceMsg = 'Warning! Malicious CAN injection detected. Engaging ISO 26262 ASIL-D fail-safe. Speed hard-locked to 50 kilometers per hour.';

    if (attackType === 'DOS') {
      attackName = 'DoS Flooding (0x0000)';
      canId = '0x0000';
      alertMsg = 'High-frequency line-rate bus flood detected (<0.5ms delta-t)';
      voiceMsg = 'Warning! Denial of Service bus flood detected on CAN backbone. Line-rate gatekeeper engaged. Speed clamped to 50 km per hour.';
    } else if (attackType === 'SPEED_SPOOF') {
      attackName = 'Speed Spoofing (0x0153)';
      canId = '0x0153';
      alertMsg = 'Arbitration ID 0x0153 payload tampered (>120 km/h anomaly)';
      voiceMsg = 'Alert! Speed sensor telemetry spoofing detected. Throttle overridden. Limp-home speed ceiling locked at 50 kilometers per hour.';
    } else if (attackType === 'SEATBELT_SPOOF') {
      attackName = 'Seatbelt Sensor Spoofing (0x02B0)';
      canId = '0x02B0';
      alertMsg = 'Falsified buckle switch flags detected in 8-byte payload';
      voiceMsg = 'Warning! Seatbelt switch spoofing detected. Multi-head attention isolated payload anomaly. Engaging electromechanical pre-tensioner lock.';
    } else if (attackType === 'FUZZING') {
      attackName = 'Fuzzy CAN Flood';
      canId = '0x0316';
      alertMsg = 'High-entropy randomized arbitration frames detected';
      voiceMsg = 'Warning! High entropy fuzzing attack detected. Dropping malicious frames at central gateway.';
    }

    setMetrics(prev => ({
      ...prev,
      securityHealth: 'Threat Detected',
      totalAttacksDetected: prev.totalAttacksDetected + 1,
      activeStep: 1,
      canBusTraffic: attackType === 'DOS' ? 4890 : 1850
    }));

    speakVoiceAlert(voiceMsg);

    let currentSpeed = metrics.speed;
    const speedInterval = setInterval(() => {
      currentSpeed -= 1.5;
      if (currentSpeed <= 50) {
        currentSpeed = 50;
        clearInterval(speedInterval);
      }
      setMetrics(prev => ({
        ...prev,
        speed: Math.round(currentSpeed * 10) / 10
      }));
    }, 80);

    setTimeout(() => {
      setMetrics(prev => ({ ...prev, activeStep: 2 }));
    }, 700);

    setTimeout(() => {
      setMetrics(prev => ({
        ...prev,
        activeStep: 3,
        failSafeEngaged: true,
        seatbeltLocked: true,
        securityHealth: 'Fail-Safe Engaged'
      }));
    }, 1400);

    setTimeout(() => {
      setMetrics(prev => ({
        ...prev,
        activeStep: 4,
        securityHealth: 'Mitigated'
      }));
    }, 2200);

    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const newEvent = {
      id: `evt-${Date.now()}`,
      time: timeStr,
      type: attackName,
      source: attackType === 'SPEED_SPOOF' || attackType === 'SEATBELT_SPOOF' ? 'Sensor Bus' : 'OBD-II / Gateway',
      severity: 'High',
      status: 'Mitigated'
    };

    setEvents(prev => [newEvent, ...prev.slice(0, 5)]);

    const newAlert = {
      id: `alt-${Date.now()}`,
      title: attackName,
      description: alertMsg,
      severity: 'High',
      time: `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`,
      canId: canId
    };

    setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
  };

  const resetSimulation = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setActiveAttack(null);
    setMetrics(prev => ({
      ...prev,
      securityHealth: 'Normal',
      speed: 62,
      canBusTraffic: 1248,
      activeStep: 1,
      seatbeltLocked: false,
      failSafeEngaged: false
    }));
  };

  return (
    <SimulationContext.Provider
      value={{
        metrics,
        alerts,
        events,
        activeAttack,
        soundEnabled,
        setSoundEnabled,
        activeTab,
        setActiveTab,
        currentTime,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen,
        toggleMobileSidebar,
        closeMobileSidebar,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        toggleSidebarCollapse,
        injectAttack,
        resetSimulation,
        isAuthenticated,
        user,
        validateLoginCredentials,
        validateSignupCredentials,
        completeLoginSession,
        completeSignupSession,
        login,
        signup,
        logout
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => useContext(SimulationContext);
