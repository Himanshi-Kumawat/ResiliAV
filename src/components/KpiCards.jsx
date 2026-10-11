import React from 'react';
import { Car, ShieldCheck, ShieldAlert, AlertTriangle, Crosshair, ArrowUp } from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export default function KpiCards() {
  const { metrics } = useSimulation();

  const isThreat = metrics.securityHealth === 'Threat Detected';
  const isFailSafe = metrics.failSafeEngaged;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Vehicle Status (Ice Cyan) */}
      <div className="glass-panel glass-panel-cyan rounded-2xl p-4 flex items-center gap-4 transition-all hover:border-cyan-500/40">
        <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.15)]">
          <Car className="w-6 h-6" />
        </div>
        <div>
          <div className="text-xs text-slate-400 font-medium">Vehicle Status</div>
          <div className="text-lg font-bold text-white flex items-center gap-2">
            <span>{metrics.vehicleStatus}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="text-[11px] text-cyan-300/80 font-mono">
            {metrics.autonomousMode}
          </div>
        </div>
      </div>

      {/* 2. Security Health (Emerald / Hazard Red) */}
      <div className={`glass-panel rounded-2xl p-4 flex items-center gap-4 transition-all duration-300 ${
        isThreat
          ? 'glass-panel-amber border-rose-500/80 shadow-[0_0_25px_rgba(244,63,94,0.35)] bg-rose-950/30'
          : isFailSafe
          ? 'glass-panel-amber border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
          : 'glass-panel-emerald hover:border-emerald-500/40'
      }`}>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
          isThreat
            ? 'bg-rose-500/25 text-rose-300 border-rose-500/50 animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.4)]'
            : isFailSafe
            ? 'bg-amber-500/25 text-amber-300 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
            : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
        }`}>
          {isThreat ? (
            <ShieldAlert className="w-6 h-6 text-rose-400" />
          ) : (
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          )}
        </div>
        <div>
          <div className="text-xs text-slate-400 font-medium">Security Health</div>
          <div className={`text-lg font-bold transition-colors ${
            isThreat
              ? 'text-rose-400 glow-danger'
              : isFailSafe
              ? 'text-amber-400'
              : 'text-emerald-400'
          }`}>
            {metrics.securityHealth}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            {isThreat
              ? 'Active CAN frame attack!'
              : isFailSafe
              ? 'ASIL-D Limp-Home Active'
              : 'No active threats'}
          </div>
        </div>
      </div>

      {/* 3. Total Attacks Detected (Amber / Warning Gold) */}
      <div className="glass-panel glass-panel-amber rounded-2xl p-4 flex items-center gap-4 transition-all hover:border-amber-500/40">
        <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.15)]">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="text-xs text-slate-400 font-medium">Total Attacks Detected</div>
          <div className="text-lg font-bold text-white flex items-center justify-between">
            <span className="font-mono">{metrics.totalAttacksDetected}</span>
            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-0.5">
              <ArrowUp className="w-3 h-3" /> 2
            </span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono">Last 24 hours</div>
        </div>
      </div>

      {/* 4. Detection Accuracy (Cyber Purple) */}
      <div className="glass-panel glass-panel-purple rounded-2xl p-4 flex items-center gap-4 transition-all hover:border-purple-500/40">
        <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.15)]">
          <Crosshair className="w-6 h-6" />
        </div>
        <div>
          <div className="text-xs text-slate-400 font-medium">Detection Accuracy</div>
          <div className="text-lg font-bold text-white font-mono">
            {metrics.detectionAccuracy}%
          </div>
          <div className="text-[11px] text-purple-300/90 font-mono font-medium">
            Hybrid Model (ACH-IDS)
          </div>
        </div>
      </div>
    </div>
  );
}
