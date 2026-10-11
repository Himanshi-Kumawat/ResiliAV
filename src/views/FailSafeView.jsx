import React from 'react';
import { 
  ShieldCheck, 
  Gauge, 
  Lock, 
  Volume2, 
  AlertTriangle, 
  CheckCircle, 
  Sliders, 
  Zap, 
  ArrowRight,
  ShieldAlert,
  Play
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export default function FailSafeView() {
  const { metrics, activeAttack, soundEnabled, setSoundEnabled } = useSimulation();

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#1B2943]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight">ISO 26262 ASIL-D Closed-Loop Fail-Safe Actuation</h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase font-semibold">
              Safety Integrity Level D
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Bridging cyber threat detection with physical mechanical actuators for deterministic Minimum Risk States (MRS).
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <div className={`px-3 py-1.5 rounded-xl border ${
            metrics.failSafeEngaged
              ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 font-bold animate-pulse'
              : 'bg-[#090F1B] border-slate-800 text-slate-300'
          }`}>
            Actuator Status: <strong>{metrics.failSafeEngaged ? 'ASIL-D LIMP-HOME ENGAGED' : 'STANDBY (MONITORING)'}</strong>
          </div>
        </div>
      </div>

      {/* 3 Physical Actuators Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Actuator 1: Dynamic Speed Governor */}
        <div className={`glass-panel glass-panel-amber rounded-2xl p-5 flex flex-col justify-between transition-all ${
          metrics.failSafeEngaged ? 'shadow-[0_0_20px_rgba(245,158,11,0.25)] border-amber-500/60' : ''
        }`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Gauge className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                metrics.failSafeEngaged
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}>
                {metrics.failSafeEngaged ? 'LOCKED (50 KM/H)' : 'CRUISING'}
              </span>
            </div>

            <h3 className="text-sm font-bold text-white">Dynamic Speed Governor Lock</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              When cyber threats are confirmed on the CAN backbone, the Vehicle Control Unit (VCU) clamps electronic throttle authority, capping velocity to <strong className="text-amber-400">50 km/h</strong>.
            </p>

            {/* Throttle Clamping Graphic */}
            <div className="my-4 p-3 rounded-xl bg-[#060A12] border border-slate-800 text-xs font-mono space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Maximum Allowed Speed:</span>
                <span className="text-amber-400 font-bold">50.0 km/h</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Throttle Valve Angle:</span>
                <span className="text-white font-bold">{metrics.failSafeEngaged ? '14° (Capped)' : '42° (Open)'}</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Mechanical Clamp:</span>
            <strong className={metrics.failSafeEngaged ? 'text-amber-400' : 'text-slate-400'}>
              {metrics.failSafeEngaged ? 'ACTIVE SOLENOID' : 'DISENGAGED'}
            </strong>
          </div>
        </div>

        {/* Actuator 2: Seatbelt Pre-Tensioner */}
        <div className={`glass-panel glass-panel-amber rounded-2xl p-5 flex flex-col justify-between transition-all ${
          metrics.seatbeltLocked ? 'shadow-[0_0_20px_rgba(244,63,94,0.25)] border-rose-500/60' : ''
        }`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                <Lock className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                metrics.seatbeltLocked
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}>
                {metrics.seatbeltLocked ? 'PRE-TENSIONED' : 'NORMAL'}
              </span>
            </div>

            <h3 className="text-sm font-bold text-white">Electromechanical Seatbelt Interlock</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Adversary attacks on arbitration ID <code className="text-cyan-300 font-mono">0x02B0</code> attempt to falsify unbuckled flags. ResiliAV overrides the bus to mechanically lock seatbelt tensioners.
            </p>

            <div className="my-4 p-3 rounded-xl bg-[#060A12] border border-slate-800 text-xs font-mono space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Tensioner Solenoid:</span>
                <span className={metrics.seatbeltLocked ? 'text-rose-400 font-bold' : 'text-slate-300'}>
                  {metrics.seatbeltLocked ? 'LOCKED (140 N)' : 'NOMINAL (10 N)'}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Buckle Status:</span>
                <span className="text-emerald-400 font-bold">PHYSICAL VERIFIED</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Passenger Restraint:</span>
            <strong className={metrics.seatbeltLocked ? 'text-rose-400' : 'text-slate-400'}>
              {metrics.seatbeltLocked ? 'INTERLOCKED' : 'READY'}
            </strong>
          </div>
        </div>

        {/* Actuator 3: In-Cabin Telematics Voice Warning */}
        <div className="glass-panel glass-panel-amber rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Volume2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold">
                AUDIO ADVISORY
              </span>
            </div>

            <h3 className="text-sm font-bold text-white">In-Cabin Audio Telematics Synthesizer</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Dispatches emergency synthetic audio announcements directly to vehicle cabin speakers via browser Web Speech API:
            </p>

            {/* Audio Waveform Equalizer Display */}
            <div className="my-4 p-3 rounded-xl bg-[#060A12] border border-slate-800 flex items-center justify-between">
              <div className="flex items-end gap-1 h-6">
                <span className={`w-1 rounded-full bg-cyan-400 ${metrics.failSafeEngaged ? 'eq-bar-1' : 'h-1'}`} />
                <span className={`w-1 rounded-full bg-cyan-400 ${metrics.failSafeEngaged ? 'eq-bar-2' : 'h-2'}`} />
                <span className={`w-1 rounded-full bg-cyan-400 ${metrics.failSafeEngaged ? 'eq-bar-3' : 'h-1'}`} />
                <span className={`w-1 rounded-full bg-cyan-400 ${metrics.failSafeEngaged ? 'eq-bar-4' : 'h-3'}`} />
                <span className={`w-1 rounded-full bg-cyan-400 ${metrics.failSafeEngaged ? 'eq-bar-5' : 'h-2'}`} />
              </div>
              <span className="text-[11px] font-mono text-cyan-300">
                {metrics.failSafeEngaged ? 'TRANSMITTING WARNING' : 'STANDBY'}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Speech Output:</span>
            <strong className="text-cyan-400">{soundEnabled ? 'ENABLED' : 'MUTED'}</strong>
          </div>
        </div>
      </div>

      {/* ISO 26262 Limp-Home Deceleration Comparison Matrix */}
      <div className="glass-panel glass-panel-amber rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Automotive Functional Safety: Controlled Limp-Home vs Abrupt Full Stops</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#060A12] border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-sm flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> Traditional Abrupt Stop (Catastrophic Collision Risk)
            </div>
            <p className="text-slate-400 leading-relaxed">
              When standard intrusion systems detect anomalous frames, forcing immediate emergency friction brakes at 100 km/h on a multi-lane highway causes severe rear-end pileups from following vehicles and initiates fatal tire skid spinouts.
            </p>
            <div className="text-rose-400 font-mono text-[11px]">
              &bull; High Kinetic Energy &bull; Loss of Steering Traction &bull; Multi-Vehicle Pileups
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#060A12] border border-emerald-500/40 space-y-2 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <div className="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" /> ResiliAV Deterministic 50 km/h Limp-Home (ISO 26262 ASIL-D)
            </div>
            <p className="text-slate-400 leading-relaxed">
              ResiliAV deterministically caps velocity to 50 km/h Limp-Home crawl. This slashes collision kinetic energy by over 75% while preserving power steering torque and lateral stability, allowing autonomous lane navigation to guide the vehicle safely to the shoulder lane.
            </p>
            <div className="text-emerald-400 font-mono text-[11px]">
              &bull; 75% Kinetic Energy Reduced &bull; Steering Authority Maintained &bull; Safe Shoulder Pull-Over
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
