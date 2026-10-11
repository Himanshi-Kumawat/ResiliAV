import React, { useState } from 'react';
import { 
  Car, 
  Cpu, 
  Activity, 
  Gauge, 
  Disc, 
  Radio, 
  Sliders, 
  Compass, 
  Zap, 
  Lock, 
  ShieldCheck, 
  AlertTriangle 
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export default function MonitoringView() {
  const { metrics, activeAttack } = useSimulation();
  const [selectedEcu, setSelectedEcu] = useState('0x0153');

  const ecuNodes = [
    { 
      id: '0x0153', 
      name: 'Powertrain ECU (0x0153)', 
      role: 'Engine Throttle & Wheel Speed Telemetry', 
      status: activeAttack === 'SPEED_SPOOF' ? 'Compromised' : 'Healthy', 
      latency: '0.42 ms', 
      busLoad: '64%', 
      txRate: '100 Hz',
      lastPayload: activeAttack === 'SPEED_SPOOF' ? '00 FF 00 00 FF 00 00 00' : '00 3E 00 00 3E 00 00 1E'
    },
    { 
      id: '0x02B0', 
      name: 'Chassis & Restraints ECU (0x02B0)', 
      role: 'Seatbelt Pre-Tensioner & ABS Interlocks', 
      status: metrics.seatbeltLocked ? 'Pre-Tensioner Engaged' : (activeAttack === 'SEATBELT_SPOOF' ? 'Compromised' : 'Healthy'), 
      latency: '0.38 ms', 
      busLoad: '48%', 
      txRate: '50 Hz',
      lastPayload: metrics.seatbeltLocked ? 'FF FF 01 00 00 00 00 01' : '00 00 00 00 00 00 00 01'
    },
    { 
      id: '0x0000', 
      name: 'Telematics Gateway (0x0000)', 
      role: 'Cellular LTE, V2X & High-Priority Arbitration', 
      status: activeAttack === 'DOS' ? 'Flooded' : 'Healthy', 
      latency: activeAttack === 'DOS' ? '8.40 ms' : '0.45 ms', 
      busLoad: activeAttack === 'DOS' ? '98%' : '32%', 
      txRate: activeAttack === 'DOS' ? '2500 Hz' : '10 Hz',
      lastPayload: activeAttack === 'DOS' ? '00 00 00 00 00 00 00 00' : 'A1 B2 C3 D4 E5 F6 07 08'
    },
    { 
      id: '0x018F', 
      name: 'Steering Control ECU (0x018F)', 
      role: 'Electric Power Steering & Torque Vectoring', 
      status: 'Healthy', 
      latency: '0.31 ms', 
      busLoad: '41%', 
      txRate: '100 Hz',
      lastPayload: '02 1A 40 00 00 00 B4 00'
    },
    { 
      id: '0x0316', 
      name: 'Body Domain Controller (0x0316)', 
      role: 'Lighting, Climate & Infotainment Bus Gate', 
      status: activeAttack === 'FUZZING' ? 'Fuzz Detected' : 'Healthy', 
      latency: '0.29 ms', 
      busLoad: '22%', 
      txRate: '20 Hz',
      lastPayload: activeAttack === 'FUZZING' ? '7F 8A 1C 99 E4 02 FF AA' : '10 20 30 40 50 60 70 80'
    }
  ];

  const currentEcuData = ecuNodes.find(e => e.id === selectedEcu) || ecuNodes[0];

  // Speedometer needle angle (-120deg to 120deg for 0 to 160 km/h)
  const speedAngle = -120 + (Math.min(160, metrics.speed) / 160) * 240;

  return (
    <div className="space-y-6">
      {/* Module Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#1B2943]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight">Vehicle In-Cabin Telemetry & Digital Cockpit</h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 uppercase font-semibold">
              Live CAN Workstation
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time physical vehicle dynamics, multi-ECU diagnostics, and moving road simulation.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-[#090F1B] border border-sky-500/30 text-sky-300">
            Bus Speed: <strong>500 kbps (High-Speed CAN)</strong>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-[#090F1B] border border-slate-800 text-slate-300">
            Frame Load: <strong>{metrics.canBusTraffic} msg/s</strong>
          </div>
        </div>
      </div>

      {/* Top Cockpit Section: Animated Road & Digital Cluster */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Animated Moving Highway Simulator (5 cols) */}
        <div className="lg:col-span-5 glass-panel glass-panel-blue rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-3 z-10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400 font-mono">
              Highway Autonomous Drive Simulation
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {metrics.speed > 0 ? 'CRUISING' : 'IDLE'}
            </span>
          </div>

          {/* Road Visual Container */}
          <div className="relative h-72 w-full rounded-xl overflow-hidden bg-[#0A101D] border border-slate-800 flex items-center justify-center">
            {/* Road Asphalt */}
            <div className="absolute inset-y-0 w-44 bg-[#111827] border-x-4 border-slate-600 shadow-inner">
              {/* Scrolling Center Divider Lines */}
              <div 
                className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1.5 animated-road" 
                style={{ 
                  animationDuration: metrics.speed > 0 ? `${Math.max(0.2, 35 / metrics.speed)}s` : '0s' 
                }} 
              />
            </div>

            {/* Car Headlights Beams (Projected forward) */}
            <div className="absolute w-32 h-44 -translate-y-20 pointer-events-none opacity-40">
              <div className="w-full h-full bg-gradient-to-t from-cyan-400/40 via-cyan-300/10 to-transparent clip-path-polygon" style={{
                clipPath: 'polygon(35% 100%, 65% 100%, 100% 0, 0 0)'
              }} />
            </div>

            {/* Top-Down Car Graphic */}
            <div className="relative z-10 transition-all duration-300">
              <svg width="70" height="140" viewBox="0 0 100 200" fill="none">
                {/* Body */}
                <path
                  d="M30 15 C30 5, 70 5, 70 15 L78 50 L84 100 L84 160 L75 190 C72 195, 28 195, 25 190 L16 160 L16 100 L22 50 Z"
                  fill="#0E2338"
                  stroke={metrics.failSafeEngaged ? "#EF4444" : "#38BDF8"}
                  strokeWidth="2.5"
                />
                {/* Glass */}
                <path d="M26 55 L74 55 L68 85 L32 85 Z" fill="#1E3A5F" stroke="#38BDF8" strokeWidth="1" />
                <rect x="32" y="92" width="36" height="45" rx="6" fill="#0C2033" stroke="#38BDF8" strokeWidth="1" />
                <path d="M30 144 L70 144 L74 165 L26 165 Z" fill="#1E3A5F" stroke="#38BDF8" strokeWidth="1" />
                
                {/* Glowing Headlights */}
                <circle cx="27" cy="22" r="4" fill="#38BDF8" className="animate-pulse" />
                <circle cx="73" cy="22" r="4" fill="#38BDF8" className="animate-pulse" />
                
                {/* Tail Brake Lights */}
                <rect 
                  x="22" 
                  y="184" 
                  width="12" 
                  height="5" 
                  rx="1.5" 
                  fill={metrics.failSafeEngaged ? "#EF4444" : "#F43F5E"} 
                  className={metrics.failSafeEngaged ? "animate-ping" : ""}
                />
                <rect 
                  x="66" 
                  y="184" 
                  width="12" 
                  height="5" 
                  rx="1.5" 
                  fill={metrics.failSafeEngaged ? "#EF4444" : "#F43F5E"} 
                  className={metrics.failSafeEngaged ? "animate-ping" : ""}
                />
              </svg>
            </div>

            {/* Real-time Velocity Badge on Highway */}
            <div className="absolute top-3 left-3 bg-[#060A12]/80 backdrop-blur px-2.5 py-1 rounded-lg border border-slate-700 font-mono text-[11px] text-sky-300">
              LANE 2 &bull; AUTONOMOUS
            </div>
            
            {metrics.failSafeEngaged && (
              <div className="absolute bottom-3 inset-x-3 bg-rose-500/20 border border-rose-500/50 rounded-lg p-1.5 text-center text-xs font-mono text-rose-300 backdrop-blur animate-pulse">
                &bull; ASIL-D SPEED HARD-LOCK &bull; 50 KM/H LIMIT &bull;
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Steering Angle: <strong className="text-white">+0.4°</strong></span>
            <span>Lateral G-Force: <strong className="text-white">0.08 G</strong></span>
          </div>
        </div>

        {/* Digital Instrument Cluster (7 cols) */}
        <div className="lg:col-span-7 glass-panel glass-panel-blue rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400 font-mono">
              Digital Instrument Cluster
            </h3>
            {/* Gear Selector */}
            <div className="flex items-center gap-1 font-mono text-xs">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-500 font-bold">P</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-500 font-bold">R</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-500 font-bold">N</span>
              <span className="px-2 py-0.5 rounded bg-sky-500 text-slate-950 font-extrabold shadow-[0_0_8px_rgba(56,189,248,0.6)]">D</span>
            </div>
          </div>

          {/* Dials & Gauges Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center my-auto">
            {/* 1. Circular Speedometer Dial */}
            <div className="flex flex-col items-center">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  {/* Gauge Arc Track */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#1E293B"
                    strokeWidth="8"
                    strokeDasharray="180 80"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Active Speed Arc */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke={metrics.failSafeEngaged ? "#F59E0B" : "#38BDF8"}
                    strokeWidth="8"
                    strokeDasharray={`${(metrics.speed / 160) * 180} 300`}
                    fill="none"
                    strokeLinecap="round"
                    className="transition-all duration-300 drop-shadow-[0_0_6px_rgba(56,189,248,0.5)]"
                  />
                </svg>

                {/* Center Digital Readout */}
                <div className="absolute text-center">
                  <div className={`text-2xl font-bold font-mono ${metrics.failSafeEngaged ? 'text-amber-400' : 'text-white'}`}>
                    {metrics.speed}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono uppercase">KM/H</div>
                </div>
              </div>
              <span className="text-xs text-slate-400 mt-1 font-medium">Vehicle Speed</span>
            </div>

            {/* 2. Throttle & Brake Bars */}
            <div className="space-y-3 bg-[#0A101D] p-3.5 rounded-xl border border-slate-800">
              {/* Throttle */}
              <div>
                <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                  <span>Throttle Output</span>
                  <span className="text-sky-400 font-bold">{metrics.failSafeEngaged ? '32%' : '58%'}</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-sky-400 rounded-full transition-all duration-300"
                    style={{ width: metrics.failSafeEngaged ? '32%' : '58%' }}
                  />
                </div>
              </div>

              {/* Brake Actuator Pressure */}
              <div>
                <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                  <span>Brake Line Pressure</span>
                  <span className="text-rose-400 font-bold">{metrics.failSafeEngaged ? '68 bar' : '0 bar'}</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-rose-500 rounded-full transition-all duration-300"
                    style={{ width: metrics.failSafeEngaged ? '65%' : '0%' }}
                  />
                </div>
              </div>

              {/* Battery State */}
              <div>
                <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                  <span>Battery State</span>
                  <span className="text-emerald-400 font-bold">{metrics.batteryLevel}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${metrics.batteryLevel}%` }} />
                </div>
              </div>
            </div>

            {/* 3. Tire Pressure Monitoring System (TPMS) */}
            <div className="bg-[#0A101D] p-3.5 rounded-xl border border-slate-800 text-center space-y-2">
              <span className="text-[11px] font-mono text-slate-400 block font-semibold">TPMS SENSORS</span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-500">FL</div>
                  <div className="text-emerald-400 font-bold">32.2 PSI</div>
                </div>
                <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-500">FR</div>
                  <div className="text-emerald-400 font-bold">32.4 PSI</div>
                </div>
                <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-500">RL</div>
                  <div className="text-emerald-400 font-bold">31.8 PSI</div>
                </div>
                <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-500">RR</div>
                  <div className="text-emerald-400 font-bold">32.0 PSI</div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Trip Odometer: <strong className="text-white">1,482.6 km</strong></span>
            <span>Powertrain Status: <strong className="text-emerald-400">NOMINAL (EV)</strong></span>
          </div>
        </div>
      </div>

      {/* Multi-ECU Network Inspector Grid */}
      <div className="glass-panel glass-panel-blue rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-bold text-white">In-Vehicle Electronic Control Units (ECU Grid)</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Click an ECU to inspect arbitration packets
          </span>
        </div>

        {/* ECU Selectable Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {ecuNodes.map((ecu) => {
            const isSelected = selectedEcu === ecu.id;
            const isBad = ecu.status === 'Compromised' || ecu.status === 'Flooded';
            return (
              <button
                key={ecu.id}
                onClick={() => setSelectedEcu(ecu.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-sky-500/20 border-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.25)]'
                    : isBad
                    ? 'bg-rose-950/20 border-rose-500/40'
                    : 'bg-[#090F1B] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white font-mono">{ecu.id}</span>
                  <span className={`w-2 h-2 rounded-full ${isBad ? 'bg-rose-500 animate-ping' : 'bg-emerald-400'}`} />
                </div>
                <div className="text-[11px] font-semibold text-slate-200 truncate">{ecu.name.split(' (')[0]}</div>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">Load: {ecu.busLoad}</div>
              </button>
            );
          })}
        </div>

        {/* Selected ECU Deep Dive Details */}
        <div className="p-4 rounded-xl bg-[#060A12] border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div>
            <span className="text-slate-500 block">ARBITRATION TARGET:</span>
            <span className="text-white font-bold">{currentEcuData.name}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">{currentEcuData.role}</span>
          </div>
          <div>
            <span className="text-slate-500 block">TRANSMISSION FREQUENCY & LOAD:</span>
            <span className="text-sky-300 font-bold">{currentEcuData.txRate} ({currentEcuData.busLoad} Bus Saturation)</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Response Latency: {currentEcuData.latency}</span>
          </div>
          <div>
            <span className="text-slate-500 block">LAST 8-BYTE CAN DATA FRAME:</span>
            <span className="text-cyan-400 font-bold tracking-wider">{currentEcuData.lastPayload}</span>
            <span className={`text-[10px] block mt-0.5 font-semibold ${
              currentEcuData.status === 'Healthy' ? 'text-emerald-400' : 'text-rose-400'
            }`}>
              STATUS: {currentEcuData.status.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
