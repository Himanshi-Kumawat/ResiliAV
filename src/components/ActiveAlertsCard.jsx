import React from 'react';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export default function ActiveAlertsCard() {
  const { alerts, setActiveTab } = useSimulation();

  const getSeverityBadge = (sev) => {
    switch (sev) {
      case 'High':
        return {
          dot: 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]',
          badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold'
        };
      case 'Medium':
        return {
          dot: 'bg-amber-500',
          badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30 font-semibold'
        };
      case 'Low':
      default:
        return {
          dot: 'bg-teal-400',
          badge: 'bg-teal-500/20 text-teal-300 border-teal-500/30'
        };
    }
  };

  return (
    <div className="glass-panel glass-panel-amber rounded-2xl p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-white tracking-wide">Active Alerts</h3>
        <button
          onClick={() => setActiveTab('intrusion')}
          className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors group font-medium"
        >
          <span>View All</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Alert Items List */}
      <div className="space-y-3 overflow-y-auto max-h-64 pr-1">
        {alerts.slice(0, 5).map((alert) => {
          const style = getSeverityBadge(alert.severity);
          return (
            <div
              key={alert.id}
              className="flex items-start justify-between p-2.5 rounded-xl bg-[#090F1B]/80 border border-[#1B2943] hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start gap-2.5">
                <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${style.dot}`} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-200">
                      {alert.title}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${style.badge}`}>
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {alert.description}
                  </p>
                </div>
              </div>
              <div className="text-[11px] font-mono text-slate-400 flex-shrink-0 ml-2">
                {alert.time}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
