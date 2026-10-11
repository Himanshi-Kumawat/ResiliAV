import React from 'react';
import { Network, Shield, AlertTriangle, Cpu, Radio, Zap } from 'lucide-react';

export default function ArchitectureView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Cyber-Physical System Architecture</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Real-time telemetry sniffing, dual-stage hybrid detection, and closed-loop ISO 26262 fail-safe actuation topology.
        </p>
      </div>

      {/* Interactive System Block Diagram (Fig. 1 Replica) */}
      <div className="bg-[#0E1726] border border-[#1A2942] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Network className="w-4 h-4 text-cyan-400" />
            <span>Fig. 1: ResiliAV End-to-End Cyber-Physical Pipeline</span>
          </h3>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
            ISO 11898 CAN Backbone
          </span>
        </div>

        {/* CAV Boundary Container */}
        <div className="border border-dashed border-cyan-500/40 rounded-xl p-5 bg-[#070B14]/70 space-y-5">
          <div className="text-[11px] font-mono uppercase text-cyan-400 tracking-wider font-semibold">
            &bull; Connected Autonomous Vehicle (CAV) Boundary
          </div>

          {/* Top Row: ECUs & Gateways */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-[#0E1726] border border-slate-700">
              <div className="text-xs font-bold text-white">Perception Sensors</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Camera, LiDAR, Radar</div>
            </div>
            <div className="p-3 rounded-xl bg-[#0E1726] border border-slate-700">
              <div className="text-xs font-bold text-white">Telematics Gateway</div>
              <div className="text-[10px] text-slate-400 mt-0.5">GPS / Cellular / V2X</div>
            </div>
            <div className="p-3 rounded-xl bg-[#0E1726] border border-slate-700">
              <div className="text-xs font-bold text-white">Powertrain ECU</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Engine & Throttle</div>
            </div>
            <div className="p-3 rounded-xl bg-[#0E1726] border border-slate-700">
              <div className="text-xs font-bold text-white">Chassis & Safety</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Brakes & Seatbelt</div>
            </div>
          </div>

          {/* Central Blue High-Speed CAN Bus Bar */}
          <div className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-900/60 via-cyan-900/60 to-blue-900/60 border border-cyan-500/40 text-center font-mono text-xs font-bold text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            IN-VEHICLE CONTROLLER AREA NETWORK (CAN-BUS BACKBONE - ISO 11898)
          </div>

          {/* Bottom Row: Threat vs Detection Engine vs Closed-Loop Actuator */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Attacker Ingress */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs mb-1">
                <AlertTriangle className="w-4 h-4" /> Adversary Ingress
              </div>
              <p className="text-[11px] text-slate-300">
                DoS Flooding, Fuzzy injection, or speed spoofing injected via OBD-II port or wireless cellular telematics.
              </p>
            </div>

            {/* ResiliAV Engine */}
            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/50 shadow-[0_0_12px_rgba(0,240,255,0.15)]">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs mb-1">
                <Shield className="w-4 h-4" /> ResiliAV Detection Engine
              </div>
              <p className="text-[11px] text-slate-300">
                Stage 1 fast gatekeeper (&lt;0.5 ms) cascades to Stage 2 1D-CNN Self-Attention (&lt;1.2 ms) to classify CAN frames.
              </p>
            </div>

            {/* Closed-Loop Actuator */}
            <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-500/40">
              <div className="flex items-center gap-2 text-teal-300 font-bold text-xs mb-1">
                <Zap className="w-4 h-4" /> Closed-Loop Fail-Safe Actuator
              </div>
              <p className="text-[11px] text-slate-300">
                Enforces 50 km/h speed governor lock, secures passenger seatbelt pre-tensioner, and broadcasts audio alarm.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Compliance Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#0E1726] border border-[#1A2942] rounded-2xl p-5">
          <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            ISO/SAE 21434: Cybersecurity Engineering
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Satisfies Threat Analysis and Risk Assessment (TARA) mandates by actively identifying and neutralizing unauthorized CAN bus injection before safety-critical ECUs execute fraudulent commands.
          </p>
        </div>

        <div className="bg-[#0E1726] border border-[#1A2942] rounded-2xl p-5">
          <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-400" />
            ISO 26262 ASIL-D: Functional Safety Compliance
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Governs deterministic transitions into a Minimum Risk State (MRS). By capping velocity at 50 km/h rather than initiating dangerous abrupt emergency stops on highways, ResiliAV provides a controlled Limp-Home deceleration profile.
          </p>
        </div>
      </div>
    </div>
  );
}
