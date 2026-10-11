import React from 'react';
import { Flame, Gauge, Lock, Zap, RotateCcw, Volume2, ShieldCheck, AlertOctagon } from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export default function AttackControlPanel() {
  const { injectAttack, resetSimulation, activeAttack, metrics, soundEnabled } = useSimulation();

  const isAttacking = Boolean(activeAttack);

  return (
    <div className={`glass-panel rounded-2xl p-3.5 sm:p-4 transition-all duration-300 w-full max-w-full min-w-0 overflow-hidden ${
      isAttacking
        ? 'border-rose-500/60 shadow-[0_0_25px_rgba(244,63,94,0.25)] bg-rose-950/20'
        : 'border-cyan-500/40 shadow-[0_0_20px_rgba(0,240,255,0.1)]'
    }`}>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3.5 sm:gap-4 w-full min-w-0">
        {/* Left Title & Status */}
        <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 w-full min-w-0">
          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all flex-shrink-0 ${
            isAttacking
              ? 'bg-rose-500/25 text-rose-300 border border-rose-500/50 animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.4)]'
              : 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
          }`}>
            {isAttacking ? <AlertOctagon className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400" /> : <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2">
              <span className="text-xs sm:text-sm font-bold text-white leading-tight">
                Threat Injector & Actuation Lab
              </span>
              <span className={`text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-semibold whitespace-nowrap flex-shrink-0 ${
                isAttacking
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/30 animate-pulse'
                  : 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
              }`}>
                {isAttacking ? 'Threat Active' : 'Standby'}
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 leading-snug">
              Dual-Stage ML inference with ISO 26262 50 km/h deceleration fail-safe.
            </p>
          </div>
        </div>

        {/* Attack Buttons Row (2-col grid on mobile, flex on desktop) */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-2.5 w-full lg:w-auto min-w-0 pt-0.5">
          {/* DoS Flooding */}
          <button
            onClick={() => injectAttack('DOS')}
            disabled={isAttacking && activeAttack === 'DOS'}
            className="flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-xl text-[11px] sm:text-xs font-bold bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-500/40 hover:border-rose-400 transition-all active:scale-95 shadow-sm disabled:opacity-50 min-w-0"
          >
            <Flame className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
            <span className="truncate">DoS Flood</span>
            <span className="hidden sm:inline font-mono text-[10px] opacity-75">(0x0000)</span>
          </button>

          {/* Speed Spoofing */}
          <button
            onClick={() => injectAttack('SPEED_SPOOF')}
            disabled={isAttacking && activeAttack === 'SPEED_SPOOF'}
            className="flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-xl text-[11px] sm:text-xs font-bold bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 border border-amber-500/40 hover:border-amber-400 transition-all active:scale-95 shadow-sm disabled:opacity-50 min-w-0"
          >
            <Gauge className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span className="truncate">Spoof Speed</span>
            <span className="hidden sm:inline font-mono text-[10px] opacity-75">(0x0153)</span>
          </button>

          {/* Seatbelt Bypass */}
          <button
            onClick={() => injectAttack('SEATBELT_SPOOF')}
            disabled={isAttacking && activeAttack === 'SEATBELT_SPOOF'}
            className="flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-xl text-[11px] sm:text-xs font-bold bg-purple-950/60 hover:bg-purple-900/80 text-purple-300 border border-purple-500/40 hover:border-purple-400 transition-all active:scale-95 shadow-sm disabled:opacity-50 min-w-0"
          >
            <Lock className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
            <span className="truncate">Spoof Belt</span>
            <span className="hidden sm:inline font-mono text-[10px] opacity-75">(0x02B0)</span>
          </button>

          {/* Fuzzy Payload */}
          <button
            onClick={() => injectAttack('FUZZING')}
            disabled={isAttacking && activeAttack === 'FUZZING'}
            className="flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-xl text-[11px] sm:text-xs font-bold bg-indigo-950/60 hover:bg-indigo-900/80 text-indigo-300 border border-indigo-500/40 hover:border-indigo-400 transition-all active:scale-95 shadow-sm disabled:opacity-50 min-w-0"
          >
            <Zap className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
            <span className="truncate">Fuzzy Flood</span>
          </button>

          {/* Reset Normal Button - Spans full row on mobile */}
          <button
            onClick={resetSimulation}
            className="col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[11px] sm:text-xs font-bold bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/40 hover:border-emerald-400 transition-all active:scale-95 shadow-[0_0_12px_rgba(16,185,129,0.2)] min-w-0"
          >
            <RotateCcw className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span>Reset Normal</span>
          </button>
        </div>
      </div>
    </div>
  );
}
