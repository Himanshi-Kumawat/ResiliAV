import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export default function ResponseModeStepper() {
  const { metrics } = useSimulation();

  const steps = [
    {
      num: 1,
      title: 'Detect',
      desc: 'Anomaly identified in line-rate',
      time: '14:21'
    },
    {
      num: 2,
      title: 'Analyze',
      desc: 'Hybrid model classification & triage',
      time: '14:21'
    },
    {
      num: 3,
      title: 'Respond',
      desc: 'Isolated affected component (50 km/h lock)',
      time: '14:22'
    },
    {
      num: 4,
      title: 'Verify',
      desc: 'Safety envelope confirmed stable',
      time: '14:23'
    }
  ];

  return (
    <div className="glass-panel glass-panel-emerald rounded-2xl p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
          <ShieldCheck className="w-3.5 h-3.5" />
        </div>
        <h3 className="text-sm font-semibold text-white tracking-wide">
          Response & Protection Mode
        </h3>
      </div>

      {/* Current Mode Subhead */}
      <div className="mb-4">
        <div className="text-[11px] text-slate-400 font-medium">Current Mode</div>
        <div className="text-sm font-bold text-teal-300 flex items-center gap-2">
          <span>{metrics.currentMode}</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/15 text-teal-300 border border-teal-500/30">
            ISO 26262 ASIL-D
          </span>
        </div>
      </div>

      {/* Vertical Stepper */}
      <div className="relative pl-2 space-y-4">
        {/* Connecting Vertical Line */}
        <div className="absolute left-[19px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-teal-500/80 via-teal-500/40 to-slate-800" />

        {steps.map((step) => {
          const isCompletedOrActive = metrics.activeStep >= step.num;
          return (
            <div key={step.num} className="relative flex items-center justify-between group">
              <div className="flex items-center gap-3.5">
                {/* Step Circle */}
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 z-10 ${
                  isCompletedOrActive
                    ? 'bg-teal-400 text-slate-950 shadow-[0_0_12px_rgba(20,184,166,0.8)]'
                    : 'bg-[#0E1726] text-slate-500 border border-slate-700'
                }`}>
                  {step.num}
                </div>

                {/* Step Title & Desc */}
                <div>
                  <div className={`text-xs font-semibold transition-colors ${
                    isCompletedOrActive ? 'text-white' : 'text-slate-400'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {step.desc}
                  </div>
                </div>
              </div>

              {/* Timestamp */}
              <div className="text-[11px] font-mono text-slate-400">
                {step.time}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
