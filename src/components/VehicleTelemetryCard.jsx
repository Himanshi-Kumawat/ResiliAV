import React from 'react';
import { Gauge, Battery, Thermometer, Radio, Wifi, Lock, ShieldAlert } from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export default function VehicleTelemetryCard() {
  const { metrics, activeAttack } = useSimulation();

  const isBraking = metrics.failSafeEngaged;
  const isAttack = Boolean(activeAttack);

  return (
    <div className="glass-panel glass-panel-cyan rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between">
      {/* Card Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white tracking-wide">Vehicle Telemetry</h3>
        <div className="flex items-center gap-1.5 text-xs text-cyan-300 font-medium">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>Live Data</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Car Visual with Concentric Animated Radar Rings */}
        <div className="relative flex items-center justify-center h-64 select-none">
          {/* Radar Circles */}
          <div className="absolute w-48 h-48 rounded-full border border-cyan-500/20 radar-ring" />
          <div className="absolute w-48 h-48 rounded-full border border-cyan-500/20 radar-ring-delay-1" />
          <div className="absolute w-48 h-48 rounded-full border border-cyan-500/20 radar-ring-delay-2" />
          
          {/* Radial Grid lines */}
          <div className="absolute w-56 h-56 rounded-full border border-slate-800/80 pointer-events-none" />
          <div className="absolute w-40 h-40 rounded-full border border-slate-800/80 pointer-events-none" />
          <div className="absolute w-24 h-24 rounded-full border border-cyan-500/10 pointer-events-none" />

          {/* SVG Futuristic Autonomous Car Top-Down View */}
          <div className="relative z-10 transition-transform duration-500">
            <svg
              width="90"
              height="180"
              viewBox="0 0 100 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]"
            >
              {/* Car Body Outer Shell */}
              <path
                d="M30 15 C30 5, 70 5, 70 15 L78 50 L84 100 L84 160 L75 190 C72 195, 28 195, 25 190 L16 160 L16 100 L22 50 Z"
                fill="#0F243A"
                stroke={isAttack ? "#FF3366" : "#00F0FF"}
                strokeWidth="2.5"
              />
              
              {/* Front Windshield */}
              <path
                d="M26 55 L74 55 L68 85 L32 85 Z"
                fill="#153655"
                stroke="#00F0FF"
                strokeWidth="1.2"
              />

              {/* Panoramic Glass Roof */}
              <rect
                x="32"
                y="92"
                width="36"
                height="45"
                rx="6"
                fill="#0C2033"
                stroke="#00F0FF"
                strokeWidth="1"
              />

              {/* Rear Windshield */}
              <path
                d="M30 144 L70 144 L74 165 L26 165 Z"
                fill="#153655"
                stroke="#00F0FF"
                strokeWidth="1.2"
              />

              {/* Headlights (Glowing Cyan) */}
              <path d="M22 22 L32 20 L30 30 Z" fill="#00F0FF" className="animate-pulse" />
              <path d="M78 22 L68 20 L70 30 Z" fill="#00F0FF" className="animate-pulse" />

              {/* Rear Taillights / Brake Lights (Flash Red during fail-safe) */}
              <path
                d="M23 185 L33 188 L31 180 Z"
                fill={isBraking ? "#FF0033" : "#FF3366"}
                className={isBraking ? "animate-ping" : ""}
              />
              <path
                d="M77 185 L67 188 L69 180 Z"
                fill={isBraking ? "#FF0033" : "#FF3366"}
                className={isBraking ? "animate-ping" : ""}
              />

              {/* LiDAR / Radar Dome on Roof */}
              <circle cx="50" cy="115" r="5" fill="#00F0FF" />
              <circle cx="50" cy="115" r="8" stroke="#00F0FF" strokeWidth="1" strokeDasharray="2 2" className="animate-spin" />

              {/* Side Mirrors */}
              <path d="M16 65 L8 60 L10 72 Z" fill="#153655" stroke="#00F0FF" strokeWidth="1" />
              <path d="M84 65 L92 60 L90 72 Z" fill="#153655" stroke="#00F0FF" strokeWidth="1" />
            </svg>
          </div>

          {/* Fail-Safe Brake Badge Overlay */}
          {isBraking && (
            <div className="absolute bottom-2 z-20 px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/50 text-rose-300 text-[10px] font-mono tracking-wider flex items-center gap-1 shadow-lg backdrop-blur">
              <ShieldAlert className="w-3 h-3 text-rose-400 animate-pulse" />
              <span>BRAKE ENGAGED &bull; 50 KM/H LIMIT</span>
            </div>
          )}
        </div>

        {/* Telemetry Metrics Column */}
        <div className="space-y-3.5 pr-2">
          {/* Speed */}
          <div className="flex items-center justify-between pb-2 border-b border-[#1A2942]">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Gauge className="w-4 h-4 text-cyan-400" />
              <span>Speed</span>
            </div>
            <div className="text-right">
              <div className={`text-base font-bold font-mono transition-colors ${
                isBraking ? 'text-amber-400 font-extrabold' : 'text-white'
              }`}>
                {metrics.speed} km/h
              </div>
              {isBraking && (
                <div className="text-[10px] text-amber-400/90 font-mono">
                  [ASIL-D Limp-Home Lock]
                </div>
              )}
            </div>
          </div>

          {/* Battery Level */}
          <div className="flex items-center justify-between pb-2 border-b border-[#1A2942]">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Battery className="w-4 h-4 text-cyan-400" />
              <span>Battery Level</span>
            </div>
            <div className="text-sm font-bold text-white font-mono">
              {metrics.batteryLevel}%
            </div>
          </div>

          {/* Temperature */}
          <div className="flex items-center justify-between pb-2 border-b border-[#1A2942]">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Thermometer className="w-4 h-4 text-cyan-400" />
              <span>Temperature</span>
            </div>
            <div className="text-sm font-bold text-white font-mono">
              {metrics.temperature}°C
            </div>
          </div>

          {/* CAN Bus Traffic */}
          <div className="flex items-center justify-between pb-2 border-b border-[#1A2942]">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Radio className="w-4 h-4 text-cyan-400" />
              <span>CAN Bus Traffic</span>
            </div>
            <div className={`text-sm font-bold font-mono ${
              metrics.canBusTraffic > 2000 ? 'text-rose-400 animate-pulse' : 'text-white'
            }`}>
              {metrics.canBusTraffic.toLocaleString()} msgs/s
            </div>
          </div>

          {/* Connection */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Wifi className="w-4 h-4 text-cyan-400" />
              <span>Connection</span>
            </div>
            <div className="text-sm font-bold text-emerald-400 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{metrics.connection}</span>
            </div>
          </div>

          {/* Seatbelt Interlock Status */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Lock className="w-4 h-4 text-cyan-400" />
              <span>Seatbelt Interlock</span>
            </div>
            <div className={`text-xs font-mono font-semibold px-2 py-0.5 rounded ${
              metrics.seatbeltLocked
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'bg-slate-800 text-slate-300'
            }`}>
              {metrics.seatbeltLocked ? 'PRE-TENSIONED' : 'NORMAL'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
