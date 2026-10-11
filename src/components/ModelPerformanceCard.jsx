import React from 'react';
import { ArrowRight } from 'lucide-react';
import { MODEL_PERFORMANCE_METRICS } from '../data/mockData';
import { useSimulation } from '../context/SimulationContext';

export default function ModelPerformanceCard() {
  const { setActiveTab } = useSimulation();
  const m = MODEL_PERFORMANCE_METRICS;

  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (circumference * m.accuracy) / 100;

  return (
    <div className="glass-panel glass-panel-purple rounded-2xl p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-white tracking-wide">
          Model Performance
        </h3>
        <button
          onClick={() => setActiveTab('analytics')}
          className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors group font-medium"
        >
          <span>View Details</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Accuracy Gauge & Key Metrics */}
      <div className="flex items-center justify-between gap-4 py-1">
        {/* Circular Gauge */}
        <div className="relative w-24 h-24 flex items-center justify-center flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background Track */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="#132035"
              strokeWidth="7"
              fill="transparent"
            />
            {/* Animated Teal Progress Ring */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="#14B8A6"
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={progressOffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 drop-shadow-[0_0_8px_rgba(20,184,166,0.6)]"
            />
          </svg>
          {/* Inner Text */}
          <div className="absolute text-center">
            <span className="text-base font-bold font-mono text-white block leading-tight">
              {m.accuracy}%
            </span>
            <span className="text-[10px] text-slate-400">Accuracy</span>
          </div>
        </div>

        {/* Metrics List */}
        <div className="space-y-1.5 flex-1 pr-2 font-mono">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-sans">Precision</span>
            <span className="font-semibold text-slate-200">{m.precision}%</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-sans">Recall</span>
            <span className="font-semibold text-slate-200">{m.recall}%</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-sans">F1 Score</span>
            <span className="font-semibold text-purple-300">{m.f1Score}%</span>
          </div>
        </div>
      </div>

      {/* Confusion Matrix Grid */}
      <div className="mt-2 pt-2 border-t border-slate-800">
        <div className="text-[11px] font-medium text-slate-400 mb-2">
          Confusion Matrix (Test Split)
        </div>
        <div className="grid grid-cols-3 gap-1.5 text-center text-xs font-mono">
          <div></div>
          <div className="text-[10px] text-slate-400 pb-0.5">Normal</div>
          <div className="text-[10px] text-slate-400 pb-0.5">Attack</div>

          <div className="text-left text-[11px] text-slate-400 font-sans flex items-center">Normal</div>
          <div className="py-1.5 rounded bg-teal-600/30 text-teal-300 font-semibold border border-teal-500/40">
            {m.confusionMatrix.normal.normal}
          </div>
          <div className="py-1.5 rounded bg-[#090F1B] text-slate-400 border border-slate-800">
            {m.confusionMatrix.normal.attack}
          </div>

          <div className="text-left text-[11px] text-slate-400 font-sans flex items-center">Attack</div>
          <div className="py-1.5 rounded bg-[#090F1B] text-slate-400 border border-slate-800">
            {m.confusionMatrix.attack.normal}
          </div>
          <div className="py-1.5 rounded bg-teal-600/30 text-teal-300 font-semibold border border-teal-500/40">
            {m.confusionMatrix.attack.attack}
          </div>
        </div>
      </div>
    </div>
  );
}
