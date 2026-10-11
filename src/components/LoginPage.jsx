import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  User, 
  Mail, 
  ArrowRight, 
  CheckCircle, 
  Sparkles, 
  GraduationCap, 
  Calendar, 
  Camera, 
  Building2, 
  KeyRound, 
  Eye, 
  EyeOff, 
  Cpu, 
  Zap, 
  AlertCircle, 
  Loader2, 
  Terminal, 
  Radio, 
  CheckCheck
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

// Safe zero-dependency Web Audio API synthesizer for tactile cyber-security chirps
const playAuthBeep = (freq = 880, duration = 0.08) => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {}
};

// Rich, Aesthetic Velvet Amethyst Theme (Locked for Himanshi Kumawat)
const THEME = {
  id: 'roseAmethyst',
  name: '🌸 Velvet Amethyst',
  tagline: 'Royal Plum & Rose Nebula',
  isLight: false,
  bg: 'bg-gradient-to-br from-[#270E43] via-[#16072C] to-[#360B4E]',
  headerBg: 'bg-[#1A0B33]/85 border-purple-500/30',
  cardBg: 'bg-[#1C0E3B]/85 border-pink-500/30 text-white shadow-[0_20px_60px_rgba(0,0,0,0.6),_0_0_40px_rgba(217,70,239,0.2)]',
  cardInner: 'bg-[#12072A]/85 border-purple-500/20 text-purple-200',
  inputBg: 'bg-[#0F0523] border-purple-500/40 text-white placeholder-purple-400/40 focus:border-pink-400 focus:ring-pink-400',
  buttonGrad: 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-500 hover:from-purple-500 hover:via-fuchsia-500 hover:to-pink-400 text-white shadow-[0_0_30px_rgba(236,72,153,0.45)]',
  badgeGrad: 'bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-fuchsia-500/20 border-pink-500/40 text-pink-200 shadow-[0_0_15px_rgba(236,72,153,0.2)]',
  titleGrad: 'bg-gradient-to-r from-white via-pink-100 to-purple-200 bg-clip-text text-transparent',
  textColor: 'text-slate-100',
  subtextColor: 'text-purple-200/80',
  glow1: 'bg-fuchsia-600/35',
  glow2: 'bg-pink-500/30',
  glow3: 'bg-purple-600/30',
};

export default function LoginPage() {
  const { 
    validateLoginCredentials, 
    validateSignupCredentials, 
    completeLoginSession, 
    completeSignupSession 
  } = useSimulation();

  // Velvet Amethyst Locked Aesthetic
  const currentTheme = THEME;
  const isLight = false;

  const [activeMode, setActiveMode] = useState('login'); // 'login' | 'signup'
  const [showPassword, setShowPassword] = useState(false);

  // Form State - Pre-filled with Himanshi Kumawat's official credentials
  const [email, setEmail] = useState('Himanshi.24bcan0421@jecrcu.edu.in');
  const [password, setPassword] = useState('ResiliAV@2027');
  const [fullName, setFullName] = useState('Himanshi Kumawat');
  const [department, setDepartment] = useState('BCA • JECRC University, Jaipur');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Multi-step Security Authentication Sequence State
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStage, setVerificationStage] = useState(0); // 1, 2, 3, 4
  const [verificationProgress, setVerificationProgress] = useState(0); // 0 to 100
  const [targetOperator, setTargetOperator] = useState(null);
  const [authModeType, setAuthModeType] = useState('login'); // 'login' | 'signup'
  const [telemetryLogs, setTelemetryLogs] = useState([]);

  // Sequence runner for the multi-step authentication process
  const runVerificationSequence = (operatorData, mode, isSupabase = false) => {
    setTargetOperator(operatorData);
    setAuthModeType(mode);
    setIsVerifying(true);
    setVerificationStage(1);
    setVerificationProgress(22);

    const ts = () => new Date().toLocaleTimeString('en-US', { hour12: false }) + '.' + Math.floor(Math.random() * 899 + 100);

    setTelemetryLogs([
      `[${ts()}] ECU_AUTH_REQ: Operator "Himanshi Kumawat"`,
      `[${ts()}] SECURITY_GATEWAY: Mode=${mode.toUpperCase()} • Protocol=ISO 26262 ASIL-D`,
      `[${ts()}] STEP 1/4: Querying SHA-256 database digest & identity certificate...`
    ]);

    playAuthBeep(880, 0.08);

    // Stage 2: ASIL-D Validation
    setTimeout(() => {
      setVerificationStage(2);
      setVerificationProgress(52);
      playAuthBeep(1046, 0.08);
      setTelemetryLogs(prev => [
        `[${ts()}] STEP 1: VERIFIED - Cryptographic hash matched with registered credentials.`,
        `[${ts()}] STEP 2/4: Authorizing ISO 26262 ASIL-D fail-safe actuation clearance...`,
        ...prev.slice(0, 4)
      ]);
    }, 700);

    // Stage 3: ACH-IDS Neural Pipeline Sync
    setTimeout(() => {
      setVerificationStage(3);
      setVerificationProgress(78);
      playAuthBeep(1318, 0.08);
      setTelemetryLogs(prev => [
        `[${ts()}] STEP 2: CLEARED - Throttle clamp solenoid & seatbelt pretensioner authority Level-4 OK.`,
        `[${ts()}] STEP 3/4: Synchronizing ACH-IDS XGBoost (<0.5ms) + 1D-CNN pipeline to vcan0...`,
        ...prev.slice(0, 4)
      ]);
    }, 1450);

    // Stage 4: Access Granted & Handshake Complete
    setTimeout(() => {
      setVerificationStage(4);
      setVerificationProgress(100);
      playAuthBeep(1760, 0.12);
      setTelemetryLogs(prev => [
        `[${ts()}] STEP 3: SYNCHRONIZED - Line-rate CAN telematics bus (500 kbps) connected.`,
        `[${ts()}] STEP 4/4: ACCESS GRANTED - Session token 0x9F4A_AUTH_OK issued for ${operatorData.name}!`,
        ...prev.slice(0, 4)
      ]);
    }, 2200);

    // Final Transition into Dashboard
    setTimeout(() => {
      playAuthBeep(2093, 0.15);
      if (mode === 'signup') {
        completeSignupSession(operatorData, isSupabase);
      } else {
        completeLoginSession(operatorData);
      }
    }, 2850);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    const result = await validateLoginCredentials(email, password);
    setIsSubmitting(false);

    if (!result.success) {
      setErrorMessage(result.error);
    } else {
      runVerificationSequence(result.user, 'login', result.isSupabase);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    const result = await validateSignupCredentials({
      fullName,
      email,
      password,
      department
    });
    setIsSubmitting(false);

    if (!result.success) {
      setErrorMessage(result.error);
    } else {
      runVerificationSequence(result.user, 'signup', result.isSupabase);
    }
  };

  return (
    <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.textColor} flex flex-col justify-between selection:bg-pink-500 selection:text-white relative overflow-hidden transition-colors duration-700`}>
      
      {/* Aesthetic Ambient Glowing Nebulas */}
      <div className={`absolute -top-32 -left-32 w-[650px] h-[650px] ${currentTheme.glow1} rounded-full blur-[130px] pointer-events-none transition-all duration-700`} />
      <div className={`absolute top-1/4 -right-32 w-[700px] h-[700px] ${currentTheme.glow2} rounded-full blur-[150px] pointer-events-none transition-all duration-700`} />
      <div className={`absolute -bottom-32 left-1/3 w-[600px] h-[600px] ${currentTheme.glow3} rounded-full blur-[140px] pointer-events-none transition-all duration-700`} />

      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Top Navbar */}
      <header className={`h-16 border-b ${currentTheme.headerBg} backdrop-blur-2xl px-4 sm:px-8 lg:px-12 flex items-center justify-between z-20 transition-all duration-500`}>
        {/* Brand & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-pink-500 p-[1.5px] shadow-[0_0_20px_rgba(217,70,239,0.35)]">
            <div className={`w-full h-full rounded-2xl ${isLight ? 'bg-white' : 'bg-[#110A24]'} flex items-center justify-center text-pink-500`}>
              <Shield className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xl font-extrabold tracking-tight ${currentTheme.titleGrad}`}>
                ResiliAV
              </span>
              <span className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full ${currentTheme.badgeGrad} font-bold tracking-wider`}>
                AI Defense Portal
              </span>
            </div>
            <p className={`text-[10px] ${currentTheme.subtextColor} font-mono hidden sm:block`}>
              JECRC University, Jaipur &bull; Lead Researcher Terminal
            </p>
          </div>
        </div>

        {/* Right Nav Controls: Sign In / Register Tabs */}
        <div className="flex items-center gap-3">
          {/* Mode Toggle (Sign In / Register) */}
          <div className="p-1 rounded-2xl bg-[#150B2A] border border-purple-500/20 flex items-center text-xs font-medium">
            <button
              onClick={() => {
                setActiveMode('login');
                setErrorMessage('');
              }}
              className={`px-3.5 py-1.5 rounded-xl transition-all duration-300 ${
                activeMode === 'login'
                  ? isLight
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold shadow-md'
                    : 'bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 text-white font-bold shadow-[0_0_18px_rgba(217,70,239,0.45)]'
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-purple-300/80 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setActiveMode('signup');
                setErrorMessage('');
              }}
              className={`px-3.5 py-1.5 rounded-xl transition-all duration-300 ${
                activeMode === 'signup'
                  ? isLight
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold shadow-md'
                    : 'bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 text-white font-bold shadow-[0_0_18px_rgba(217,70,239,0.45)]'
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-purple-300/80 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>

        </div>
      </header>

      {/* Main Split Screen Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 flex items-center z-10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT HALF (7 Cols): Researcher Profile & Project Dossier */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Project Badge & Title */}
            <div>
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ${currentTheme.badgeGrad} text-xs font-mono mb-3`}>
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span>Cyber Security in Autonomous Vehicles & Transportation</span>
              </div>
              <h1 className={`text-3xl lg:text-4xl font-black tracking-tight leading-tight ${currentTheme.titleGrad}`}>
                ResiliAV: Adaptive Closed-Loop Cyber Defense System
              </h1>
              <p className={`text-sm ${currentTheme.subtextColor} mt-2 max-w-2xl leading-relaxed`}>
                Adaptive Closed-Loop Hybrid Intrusion Detection & Automated Fail-Safe Actuation (ACH-IDS) with line-rate CAN bus threat triage and dynamic speed governor protection.
              </p>
            </div>

            {/* Researcher Profile Card (Himanshi Kumawat - JECRC University) */}
            <div className={`p-6 rounded-3xl ${currentTheme.cardBg} backdrop-blur-2xl relative overflow-hidden group transition-all duration-500`}>
              {/* Inner Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 relative z-10">
                {/* Photo Space / Profile Avatar Container */}
                <div className="relative flex-shrink-0">
                  <div className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-pink-500 p-[2px] shadow-[0_0_25px_rgba(236,72,153,0.35)]">
                    <div className={`w-full h-full rounded-2xl ${isLight ? 'bg-pink-50' : 'bg-[#140A2B]'} flex flex-col items-center justify-center p-2 text-center relative overflow-hidden group-hover:border-pink-400 transition-colors`}>
                      <User className="w-10 h-10 text-pink-500 mb-1" />
                      <span className={`text-[10px] font-mono ${isLight ? 'text-pink-700' : 'text-pink-200'} font-semibold uppercase leading-tight`}>
                        Himanshi Kumawat
                      </span>
                      <span className={`text-[9px] ${isLight ? 'text-slate-400' : 'text-purple-300/60'} mt-0.5`}>
                        Photo Space
                      </span>
                      {/* Photo Placeholder Tag */}
                      <div className={`absolute inset-0 ${isLight ? 'bg-pink-100/95 text-pink-700' : 'bg-[#1A0A33]/90 text-pink-300'} opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-[10px] font-mono p-1 text-center`}>
                        <Camera className="w-4 h-4 mb-0.5 text-pink-500" />
                        <span>Ready For Photo</span>
                      </div>
                    </div>
                  </div>
                  <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-600 border-2 border-white text-white shadow-md">
                    <CheckCircle className="w-3.5 h-3.5 text-white" />
                  </span>
                </div>

                {/* Profile Details */}
                <div className="space-y-2.5 text-center sm:text-left flex-1">
                  <div>
                    <h3 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'} flex items-center justify-center sm:justify-start gap-2`}>
                      <span>Himanshi Kumawat</span>
                      <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full ${currentTheme.badgeGrad} font-semibold`}>
                        Lead Developer & Researcher
                      </span>
                    </h3>
                    <p className={`text-xs ${isLight ? 'text-pink-700' : 'text-purple-200/90'} font-mono mt-0.5 font-medium`}>
                      Himanshi.24bcan0421@jecrcu.edu.in
                    </p>
                  </div>

                  {/* Clean Metadata Chips (JECRC University & BCA Final Year) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
                    <div className={`flex items-center gap-2.5 p-2.5 rounded-xl ${currentTheme.cardInner}`}>
                      <GraduationCap className="w-4 h-4 text-pink-500 flex-shrink-0" />
                      <div>
                        <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-purple-300/70'} block font-mono`}>COURSE & STREAM</span>
                        <span className={`font-semibold ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>BCA (Final Year)</span>
                      </div>
                    </div>

                    <div className={`flex items-center gap-2.5 p-2.5 rounded-xl ${currentTheme.cardInner}`}>
                      <Building2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <div>
                        <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-purple-300/70'} block font-mono`}>INSTITUTION</span>
                        <span className={`font-semibold ${isLight ? 'text-slate-900' : 'text-slate-100'} truncate`}>JECRC University, Jaipur</span>
                      </div>
                    </div>

                    <div className={`flex items-center gap-2.5 p-2.5 rounded-xl ${currentTheme.cardInner}`}>
                      <Calendar className="w-4 h-4 text-violet-500 flex-shrink-0" />
                      <div>
                        <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-purple-300/70'} block font-mono`}>ACADEMIC BATCH</span>
                        <span className={`font-semibold ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>Batch 2024 – 2027</span>
                      </div>
                    </div>

                    <div className={`flex items-center gap-2.5 p-2.5 rounded-xl ${currentTheme.cardInner}`}>
                      <Sparkles className="w-4 h-4 text-fuchsia-500 flex-shrink-0" />
                      <div>
                        <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-purple-300/70'} block font-mono`}>PROJECT DOMAIN</span>
                        <span className="font-semibold text-pink-500">Vehicle Cyber Security & AI</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Innovation Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className={`p-3.5 rounded-2xl ${currentTheme.cardInner} space-y-1 backdrop-blur-xl`}>
                <div className="text-[11px] font-mono text-pink-500 font-bold flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" /> Dual-Stage Triage
                </div>
                <p className={`text-[11px] ${currentTheme.subtextColor}`}>
                  XGBoost (&lt;0.5ms) + 1D-CNN Self-Attention (&lt;1.2ms)
                </p>
              </div>

              <div className={`p-3.5 rounded-2xl ${currentTheme.cardInner} space-y-1 backdrop-blur-xl`}>
                <div className="text-[11px] font-mono text-purple-500 font-bold flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" /> Closed-Loop Actuator
                </div>
                <p className={`text-[11px] ${currentTheme.subtextColor}`}>
                  Speed clamped to 50 km/h + Seatbelt Tensioner Locked
                </p>
              </div>

              <div className={`p-3.5 rounded-2xl ${currentTheme.cardInner} space-y-1 backdrop-blur-xl`}>
                <div className="text-[11px] font-mono text-emerald-500 font-bold flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" /> 99.78% Accuracy
                </div>
                <p className={`text-[11px] ${currentTheme.subtextColor}`}>
                  Benchmarked on 60,000 CAN frames (HCRLab Korea)
                </p>
              </div>
            </div>

            <p className={`text-xs ${currentTheme.subtextColor} italic`}>
              * Secure Authentication Policy: Only registered operator accounts can access the real-time telemetry dashboard. If you don't have an account, please Register / Sign Up.
            </p>
          </div>

          {/* RIGHT HALF (5 Cols): Interactive Login / Signup Form */}
          <div className="lg:col-span-5">
            <div className={`p-7 rounded-3xl ${currentTheme.cardBg} backdrop-blur-2xl space-y-5 relative transition-all duration-500`}>
              
              {/* Card Header */}
              <div>
                <h2 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'} tracking-tight flex items-center gap-2`}>
                  <span>{activeMode === 'login' ? 'Operator Sign In' : 'Register Operator Profile'}</span>
                  <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping inline-block" />
                </h2>
                <p className={`text-xs ${currentTheme.subtextColor} mt-1`}>
                  {activeMode === 'login'
                    ? 'Enter your registered credentials to authenticate terminal session.'
                    : 'Create your operator account to be stored in the authentication database.'}
                </p>
              </div>

              {/* Error Message Alert */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-600 text-xs font-mono flex items-start gap-2.5 animate-pulse shadow-md">
                  <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* LOGIN FORM */}
              {activeMode === 'login' && (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className={`block text-[11px] font-mono uppercase ${isLight ? 'text-slate-600' : 'text-purple-200/80'} mb-1.5 font-semibold`}>
                      Registered Operator Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-pink-500">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setErrorMessage('');
                        }}
                        required
                        placeholder="Himanshi.24bcan0421@jecrcu.edu.in"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl ${currentTheme.inputBg} text-xs font-mono transition-colors`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-[11px] font-mono uppercase ${isLight ? 'text-slate-600' : 'text-purple-200/80'} mb-1.5 font-semibold`}>
                      Security Passkey
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-pink-500">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setErrorMessage('');
                        }}
                        required
                        placeholder="••••••••••••"
                        className={`w-full pl-10 pr-10 py-2.5 rounded-xl ${currentTheme.inputBg} text-xs font-mono transition-colors`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute inset-y-0 right-0 pr-3 flex items-center ${isLight ? 'text-slate-400 hover:text-pink-600' : 'text-purple-400 hover:text-pink-300'} transition-colors`}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className={`p-2.5 rounded-xl ${currentTheme.cardInner} text-[11px] font-mono`}>
                    <span className={`${isLight ? 'text-slate-500' : 'text-purple-400/70'} block`}>Default Account:</span>
                    <span className="text-pink-500 font-semibold">Himanshi.24bcan0421@jecrcu.edu.in</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs ${currentTheme.buttonGrad} flex items-center justify-center gap-2 transition-all duration-300 active:scale-98 disabled:opacity-50 mt-2`}
                  >
                    <span>{isSubmitting ? 'Verifying Account Database...' : 'Sign In to Dashboard'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* SIGNUP FORM */}
              {activeMode === 'signup' && (
                <form onSubmit={handleSignupSubmit} className="space-y-3.5">
                  <div>
                    <label className={`block text-[11px] font-mono uppercase ${isLight ? 'text-slate-600' : 'text-purple-200/80'} mb-1 font-semibold`}>
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-pink-500">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          setErrorMessage('');
                        }}
                        required
                        placeholder="Your full name"
                        className={`w-full pl-10 pr-4 py-2 rounded-xl ${currentTheme.inputBg} text-xs font-mono transition-colors`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-[11px] font-mono uppercase ${isLight ? 'text-slate-600' : 'text-purple-200/80'} mb-1 font-semibold`}>
                      Email Address (Sign Up)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-pink-500">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setErrorMessage('');
                        }}
                        required
                        placeholder="yourname@domain.com"
                        className={`w-full pl-10 pr-4 py-2 rounded-xl ${currentTheme.inputBg} text-xs font-mono transition-colors`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-[11px] font-mono uppercase ${isLight ? 'text-slate-600' : 'text-purple-200/80'} mb-1 font-semibold`}>
                      Institution / Department
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-pink-500">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={department}
                        onChange={(e) => {
                          setDepartment(e.target.value);
                          setErrorMessage('');
                        }}
                        required
                        placeholder="e.g. BCA • JECRC University, Jaipur"
                        className={`w-full pl-10 pr-4 py-2 rounded-xl ${currentTheme.inputBg} text-xs font-mono transition-colors`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-[11px] font-mono uppercase ${isLight ? 'text-slate-600' : 'text-purple-200/80'} mb-1 font-semibold`}>
                      Create Security Passkey (Min 6 chars)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-pink-500">
                        <KeyRound className="w-4 h-4" />
                      </div>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setErrorMessage('');
                        }}
                        required
                        placeholder="Create strong passkey"
                        className={`w-full pl-10 pr-4 py-2 rounded-xl ${currentTheme.inputBg} text-xs font-mono transition-colors`}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs ${currentTheme.buttonGrad} flex items-center justify-center gap-2 transition-all duration-300 active:scale-98 disabled:opacity-50 mt-2`}
                  >
                    <span>{isSubmitting ? 'Registering into Database...' : 'Register & Enter Dashboard'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* Bottom Switch Link */}
              <div className={`text-center pt-2 border-t ${isLight ? 'border-pink-200/80' : 'border-purple-900/30'} text-xs ${currentTheme.subtextColor}`}>
                {activeMode === 'login' ? (
                  <span>
                    Don't have an account yet?{' '}
                    <button
                      onClick={() => {
                        setActiveMode('signup');
                        setErrorMessage('');
                      }}
                      className="text-pink-500 font-bold hover:underline transition-colors"
                    >
                      Sign Up / Register First
                    </button>
                  </span>
                ) : (
                  <span>
                    Already registered?{' '}
                    <button
                      onClick={() => {
                        setActiveMode('login');
                        setErrorMessage('');
                      }}
                      className="text-pink-500 font-bold hover:underline transition-colors"
                    >
                      Sign In with Your Email
                    </button>
                  </span>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className={`py-4 border-t ${isLight ? 'border-pink-200/80 bg-white/60' : 'border-purple-900/30 bg-[#0A0516]/90'} px-6 text-center text-xs font-mono ${currentTheme.subtextColor} z-10 transition-colors duration-500`}>
        All Rights Reserved &copy; 2027 Himanshi Kumawat &bull; BCA Final Year &bull; JECRC University, Jaipur &bull; ResiliAV Project
      </footer>

      {/* MULTI-STAGE SECURITY VERIFICATION HUD MODAL */}
      {isVerifying && (
        <div className="fixed inset-0 z-50 bg-[#06030F]/95 backdrop-blur-2xl flex items-center justify-center p-2.5 sm:p-5 md:p-6 overflow-y-auto selection:bg-pink-500 selection:text-white animate-fadeIn">
          {/* Ambient Cyber Light Glows */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* HUD Container - Strictly Constrained within Viewport */}
          <div className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-gradient-to-b from-[#180C36] via-[#120728] to-[#0D0520] border border-pink-500/40 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 md:p-7 shadow-[0_0_90px_rgba(217,70,239,0.35)] overflow-hidden my-auto">
            
            {/* Scrollable Interior Container for Small Screens */}
            <div className="overflow-y-auto pr-1 space-y-3 sm:space-y-4 md:space-y-5 scrollbar-thin">
              {/* Top Protocol Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 sm:pb-3.5 border-b border-purple-900/50 gap-2">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500"></span>
                  </span>
                  <div>
                    <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-pink-300 block">
                      ISO 26262 ASIL-D GATEWAY AUTHENTICATION
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-purple-300/70 font-mono">
                      Real-Time Hardware Security Module (HSM) Handshake
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-mono font-bold bg-pink-500/20 text-pink-300 border border-pink-500/40 flex items-center gap-1.5 shadow-[0_0_10px_rgba(236,72,153,0.25)]">
                    <Shield className="w-3 h-3 text-pink-400" />
                    CLEARANCE LEVEL-4 ACTIVE
                  </span>
                </div>
              </div>

              {/* Center Scanner & Target Identity Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 sm:gap-5 items-center">
                {/* Radar Reticle Graphic */}
                <div className="sm:col-span-5 flex flex-col items-center justify-center">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center">
                    {/* Outer spinning dashed ring */}
                    <div className="absolute inset-0 rounded-full border border-dashed border-pink-500/50 animate-[spin_8s_linear_infinite]" />
                    {/* Inner counter-spinning dashed ring */}
                    <div className="absolute inset-1.5 rounded-full border border-purple-400/40 animate-[spin_12s_linear_infinite_reverse]" />
                    {/* Glow circle */}
                    <div className="absolute inset-3 rounded-full bg-gradient-to-tr from-pink-500/15 via-purple-500/10 to-transparent backdrop-blur-sm" />
                    
                    {/* Central Core Icon */}
                    <div className="relative z-10 flex flex-col items-center justify-center">
                      {verificationStage === 4 ? (
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.5)]">
                          <CheckCheck className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400 animate-bounce" />
                        </div>
                      ) : verificationStage === 3 ? (
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-fuchsia-500/20 border border-fuchsia-400 flex items-center justify-center shadow-[0_0_25px_rgba(217,70,239,0.5)]">
                          <Cpu className="w-6 h-6 sm:w-7 sm:h-7 text-pink-300 animate-pulse" />
                        </div>
                      ) : verificationStage === 2 ? (
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-purple-500/20 border border-purple-400 flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.5)]">
                          <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-purple-300 animate-pulse" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-pink-500/20 border border-pink-400 flex items-center justify-center shadow-[0_0_25px_rgba(236,72,153,0.4)]">
                          <KeyRound className="w-6 h-6 sm:w-7 sm:h-7 text-pink-400 animate-spin" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Live Numerical Readout */}
                  <div className="text-center mt-1.5">
                    <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white">
                      {verificationProgress}%
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono text-pink-400 block tracking-wider uppercase font-semibold">
                      {verificationStage === 4 ? 'AUTHENTICATION COMPLETE' : 'VERIFYING SECURITY TOKENS'}
                    </span>
                  </div>
                </div>

                {/* Operator Dossier Info */}
                <div className="sm:col-span-7 space-y-2">
                  <div className="p-2.5 sm:p-3 rounded-2xl bg-[#100624] border border-purple-900/60 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] sm:text-[10px] font-mono text-purple-300/70 uppercase">AUTHENTICATING OPERATOR</span>
                      <span className="text-[9px] sm:text-[10px] font-mono text-pink-400 font-bold">BATCH 2027</span>
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-pink-400" />
                        {targetOperator?.name || 'Himanshi Kumawat'}
                      </h4>
                      <p className="text-[11px] sm:text-xs font-mono text-purple-200">
                        {targetOperator?.email || 'Himanshi.24bcan0421@jecrcu.edu.in'}
                      </p>
                    </div>
                    <div className="pt-1 border-t border-purple-900/50 flex items-center justify-between text-[10px] sm:text-[11px] text-purple-300/80">
                      <span>{targetOperator?.degree || 'BCA (Final Year)'}</span>
                      <span className="text-slate-200 font-semibold truncate max-w-[150px] sm:max-w-[180px]">
                        {targetOperator?.institution || 'JECRC University, Jaipur'}
                      </span>
                    </div>
                  </div>

                  {/* Dynamic Status Banner */}
                  <div className={`p-2 sm:p-2.5 rounded-xl text-[11px] sm:text-xs font-mono flex items-center gap-2 border transition-colors ${
                    verificationStage === 4 
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' 
                      : 'bg-pink-500/15 border-pink-500/30 text-pink-300'
                  }`}>
                    {verificationStage === 4 ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>Handshake established! Launching ResiliAV Cockpit...</span>
                      </>
                    ) : (
                      <>
                        <Loader2 className="w-3.5 h-3.5 text-pink-400 animate-spin flex-shrink-0" />
                        <span>Synchronizing ECU cryptographic credentials with CAN bus...</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* 4-Step Pipeline */}
              <div className="space-y-1.5">
                {/* Step 1 */}
                <div className={`p-2 sm:p-2.5 rounded-xl border transition-all flex items-center justify-between text-[11px] sm:text-xs font-mono ${
                  verificationStage >= 2 
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                    : verificationStage === 1 
                    ? 'bg-pink-950/30 border-pink-500/50 text-pink-200 shadow-[0_0_15px_rgba(236,72,153,0.15)]'
                    : 'bg-[#0E051D] border-purple-900/50 text-purple-400/50'
                }`}>
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <span className="text-[9px] sm:text-[10px] text-purple-400/60">[01/04]</span>
                    {verificationStage >= 2 ? (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    ) : verificationStage === 1 ? (
                      <Loader2 className="w-3.5 h-3.5 text-pink-400 animate-spin flex-shrink-0" />
                    ) : (
                      <KeyRound className="w-3.5 h-3.5 text-purple-500/40 flex-shrink-0" />
                    )}
                    <div>
                      <span className="font-semibold block text-slate-200 leading-tight">SHA-256 Passkey & Identity Registry</span>
                      <span className="text-[9px] sm:text-[10px] text-purple-300/70 hidden sm:block">Verifying operator credentials against ResiliAV database</span>
                    </div>
                  </div>
                  <span className={`text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded ${
                    verificationStage >= 2 ? 'bg-emerald-500/20 text-emerald-400' : verificationStage === 1 ? 'bg-pink-500/20 text-pink-300' : 'text-purple-500/50'
                  }`}>
                    {verificationStage >= 2 ? 'VERIFIED' : verificationStage === 1 ? 'CHECKING...' : 'PENDING'}
                  </span>
                </div>

                {/* Step 2 */}
                <div className={`p-2 sm:p-2.5 rounded-xl border transition-all flex items-center justify-between text-[11px] sm:text-xs font-mono ${
                  verificationStage >= 3 
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                    : verificationStage === 2 
                    ? 'bg-pink-950/30 border-pink-500/50 text-pink-200 shadow-[0_0_15px_rgba(236,72,153,0.15)]'
                    : 'bg-[#0E051D] border-purple-900/50 text-purple-400/50'
                }`}>
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <span className="text-[9px] sm:text-[10px] text-purple-400/60">[02/04]</span>
                    {verificationStage >= 3 ? (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    ) : verificationStage === 2 ? (
                      <Loader2 className="w-3.5 h-3.5 text-pink-400 animate-spin flex-shrink-0" />
                    ) : (
                      <Shield className="w-3.5 h-3.5 text-purple-500/40 flex-shrink-0" />
                    )}
                    <div>
                      <span className="font-semibold block text-slate-200 leading-tight">ISO 26262 ASIL-D Safety Clearance</span>
                      <span className="text-[9px] sm:text-[10px] text-purple-300/70 hidden sm:block">Authorizing fail-safe actuator override privilege (50 km/h clamp)</span>
                    </div>
                  </div>
                  <span className={`text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded ${
                    verificationStage >= 3 ? 'bg-emerald-500/20 text-emerald-400' : verificationStage === 2 ? 'bg-pink-500/20 text-pink-300' : 'text-purple-500/50'
                  }`}>
                    {verificationStage >= 3 ? 'AUTHORIZED' : verificationStage === 2 ? 'VALIDATING...' : 'PENDING'}
                  </span>
                </div>

                {/* Step 3 */}
                <div className={`p-2 sm:p-2.5 rounded-xl border transition-all flex items-center justify-between text-[11px] sm:text-xs font-mono ${
                  verificationStage >= 4 
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                    : verificationStage === 3 
                    ? 'bg-pink-950/30 border-pink-500/50 text-pink-200 shadow-[0_0_15px_rgba(236,72,153,0.15)]'
                    : 'bg-[#0E051D] border-purple-900/50 text-purple-400/50'
                }`}>
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <span className="text-[9px] sm:text-[10px] text-purple-400/60">[03/04]</span>
                    {verificationStage >= 4 ? (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    ) : verificationStage === 3 ? (
                      <Cpu className="w-3.5 h-3.5 text-pink-400 animate-spin flex-shrink-0" />
                    ) : (
                      <Cpu className="w-3.5 h-3.5 text-purple-500/40 flex-shrink-0" />
                    )}
                    <div>
                      <span className="font-semibold block text-slate-200 leading-tight">ACH-IDS Dual-Stage Pipeline Sync</span>
                      <span className="text-[9px] sm:text-[10px] text-purple-300/70 hidden sm:block">Binding XGBoost (&lt;0.5ms) & 1D-CNN attention to vcan0 @ 500kbps</span>
                    </div>
                  </div>
                  <span className={`text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded ${
                    verificationStage >= 4 ? 'bg-emerald-500/20 text-emerald-400' : verificationStage === 3 ? 'bg-pink-500/20 text-pink-300' : 'text-purple-500/50'
                  }`}>
                    {verificationStage >= 4 ? 'SYNCED' : verificationStage === 3 ? 'BINDING...' : 'PENDING'}
                  </span>
                </div>

                {/* Step 4 */}
                <div className={`p-2 sm:p-2.5 rounded-xl border transition-all flex items-center justify-between text-[11px] sm:text-xs font-mono ${
                  verificationStage === 4 
                    ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                    : 'bg-[#0E051D] border-purple-900/50 text-purple-400/50'
                }`}>
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <span className="text-[9px] sm:text-[10px] text-purple-400/60">[04/04]</span>
                    {verificationStage === 4 ? (
                      <CheckCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <Radio className="w-3.5 h-3.5 text-purple-500/40 flex-shrink-0" />
                    )}
                    <div>
                      <span className="font-semibold block text-slate-200 leading-tight">Telematics Session Token & Cockpit Launch</span>
                      <span className="text-[9px] sm:text-[10px] text-purple-300/70 hidden sm:block">Session token 0x9F4A_AUTH_OK granted &bull; Transitioning to live cockpit</span>
                    </div>
                  </div>
                  <span className={`text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded ${
                    verificationStage === 4 ? 'bg-emerald-500/25 text-emerald-300' : 'text-purple-500/50'
                  }`}>
                    {verificationStage === 4 ? 'ACCESS GRANTED' : 'READY'}
                  </span>
                </div>
              </div>

              {/* Neon Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] sm:text-[10px] font-mono">
                  <span className="text-purple-300/70">CRYPTOGRAPHIC PIPELINE HANDSHAKE</span>
                  <span className="text-pink-400 font-bold">{verificationProgress}%</span>
                </div>
                <div className="h-1.5 sm:h-2 w-full bg-[#0E061E] rounded-full overflow-hidden border border-purple-900/50 p-[1px]">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-400 transition-all duration-500 ease-out shadow-[0_0_15px_rgba(236,72,153,0.5)]"
                    style={{ width: `${verificationProgress}%` }}
                  />
                </div>
              </div>

              {/* Live CAN Telematics Console Output */}
              <div className="p-2.5 sm:p-3 rounded-2xl bg-[#0A0314] border border-purple-900/50 font-mono text-[9px] sm:text-[10px] text-pink-300/80 space-y-1">
                <div className="flex items-center justify-between text-[8px] sm:text-[9px] text-purple-400/60 border-b border-purple-950 pb-1 mb-1">
                  <span className="flex items-center gap-1.5 font-bold text-pink-300">
                    <Terminal className="w-3 h-3 text-pink-400" />
                    LIVE TELEMATICS TERMINAL
                  </span>
                  <span className="text-emerald-400">CAN0: 500 KBPS • ONLINE</span>
                </div>
                <div className="h-12 sm:h-14 overflow-y-auto space-y-0.5 scrollbar-thin">
                  {telemetryLogs.map((log, idx) => (
                    <div key={idx} className={idx === 0 ? "text-pink-200 font-semibold" : "text-purple-300/60"}>
                      {log}
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer info in modal */}
              <div className="text-center pt-0.5 text-[9px] sm:text-[10px] font-mono text-purple-300/60">
                Autonomous Vehicle Cyber Defense System &bull; ResiliAV 2027 &bull; JECRC University, Jaipur
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
