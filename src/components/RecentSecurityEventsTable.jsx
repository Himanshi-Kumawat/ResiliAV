import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export default function RecentSecurityEventsTable() {
  const { events, setActiveTab } = useSimulation();

  const getSeverityPill = (sev) => {
    switch (sev) {
      case 'High':
        return 'bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold';
      case 'Medium':
        return 'bg-amber-500/20 text-amber-300 border border-amber-500/30';
      case 'Low':
      default:
        return 'bg-teal-500/20 text-teal-300 border border-teal-500/30';
    }
  };

  const getStatusPill = (status) => {
    switch (status) {
      case 'Mitigated':
        return 'bg-teal-500/20 text-teal-300 border border-teal-500/30 font-semibold';
      case 'Blocked':
        return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold';
      case 'Detected':
        return 'bg-sky-500/20 text-sky-300 border border-sky-500/30';
      case 'Logged':
        return 'bg-slate-700/40 text-slate-300 border border-slate-600/40';
      default:
        return 'text-slate-400';
    }
  };

  return (
    <div className="glass-panel glass-panel-blue rounded-2xl p-4 sm:p-5 flex flex-col justify-between w-full max-w-full min-w-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-white tracking-wide">
          Recent Security Events
        </h3>
        <button
          onClick={() => setActiveTab('failsafe')}
          className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors group font-medium"
        >
          <span>View All</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full max-w-full scrollbar-thin">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-slate-400 border-b border-[#1B2943] pb-2 font-mono">
              <th className="pb-2.5 font-normal">Time</th>
              <th className="pb-2.5 font-normal">Type</th>
              <th className="pb-2.5 font-normal">Source</th>
              <th className="pb-2.5 font-normal">Severity</th>
              <th className="pb-2.5 font-normal text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1B2943]/60 font-mono">
            {events.slice(0, 5).map((evt) => (
              <tr key={evt.id} className="hover:bg-[#111C32]/50 transition-colors">
                <td className="py-2.5 text-slate-300">{evt.time}</td>
                <td className="py-2.5 font-sans font-medium text-slate-200">{evt.type}</td>
                <td className="py-2.5 text-slate-400">{evt.source}</td>
                <td className="py-2.5">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${getSeverityPill(evt.severity)}`}>
                    {evt.severity}
                  </span>
                </td>
                <td className="py-2.5 text-right">
                  {evt.status === '—' ? (
                    <span className="text-slate-500">—</span>
                  ) : (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${getStatusPill(evt.status)}`}>
                      {evt.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
