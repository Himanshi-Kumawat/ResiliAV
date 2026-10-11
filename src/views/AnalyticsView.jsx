import React, { useState } from 'react';
import { TABLE_I_DATA, TABLE_II_DATA, TABLE_III_DATA } from '../data/mockData';
import { BarChart3, Award, FileSpreadsheet, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

export default function AnalyticsView() {
  const [activeTab, setActiveTab] = useState('table3'); // 'table3' | 'table2' | 'table1'

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#1B2943]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight">Model Analytics & Empirical Benchmarks</h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase font-semibold">
              IEEE Evaluated Data
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Rigorous experimental verification on 60,000 CAN frames calibrated to the Korea University HCRLab standard.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-[#090F1B] border border-emerald-500/30 text-emerald-300">
            F1-Score: <strong>99.79%</strong>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-[#090F1B] border border-slate-800 text-slate-300">
            False Alarm Rate: <strong>0.021%</strong>
          </div>
        </div>
      </div>

      {/* Top 4 Performance Cards with Emerald Glow */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel glass-panel-emerald rounded-2xl p-4 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <div className="text-xs text-slate-400 font-medium">Overall Accuracy</div>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">99.78%</div>
          <div className="text-[11px] text-slate-500 mt-0.5">60,000 Automotive Frames</div>
        </div>
        <div className="glass-panel glass-panel-emerald rounded-2xl p-4">
          <div className="text-xs text-slate-400 font-medium">Precision (Macro)</div>
          <div className="text-2xl font-bold font-mono text-white mt-1">99.80%</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Minimal Misclassification</div>
        </div>
        <div className="glass-panel glass-panel-emerald rounded-2xl p-4">
          <div className="text-xs text-slate-400 font-medium">False Positive Rate (FPR)</div>
          <div className="text-2xl font-bold font-mono text-emerald-300 mt-1">0.021%</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Near-Zero Nuisance Alarms</div>
        </div>
        <div className="glass-panel glass-panel-emerald rounded-2xl p-4">
          <div className="text-xs text-slate-400 font-medium">Mean End-to-End Latency</div>
          <div className="text-2xl font-bold font-mono text-cyan-300 mt-1">1.48 ms</div>
          <div className="text-[11px] text-slate-500 mt-0.5">CAN 10 ms Deadline Verified</div>
        </div>
      </div>

      {/* Comparative Model Bar Visualizer (RF vs 1D-CNN vs XGBoost vs ResiliAV) */}
      <div className="glass-panel glass-panel-emerald rounded-2xl p-5 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>Comparative Multi-Model Accuracy Benchmark</span>
        </h3>

        <div className="space-y-3">
          {TABLE_II_DATA.map((row) => {
            const accVal = parseFloat(row.acc);
            return (
              <div key={row.model} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className={`font-sans font-medium ${row.highlighted ? 'text-emerald-300 font-bold' : 'text-slate-300'}`}>
                    {row.model}
                  </span>
                  <span className={`font-bold ${row.highlighted ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {row.acc} &bull; {row.latency}
                  </span>
                </div>
                <div className="h-3 w-full bg-[#060A12] rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      row.highlighted
                        ? 'bg-gradient-to-r from-emerald-500 to-cyan-400 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                        : 'bg-slate-700'
                    }`}
                    style={{ width: `${(accVal - 97) * 33.3}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Table Navigation Selector Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab('table3')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
            activeTab === 'table3'
              ? 'bg-emerald-500 text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
              : 'bg-[#090F1B] text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Table III: Confusion Matrix (12,000 Packets)
        </button>
        <button
          onClick={() => setActiveTab('table2')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
            activeTab === 'table2'
              ? 'bg-emerald-500 text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
              : 'bg-[#090F1B] text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Table II: Multi-Model Benchmark
        </button>
        <button
          onClick={() => setActiveTab('table1')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
            activeTab === 'table1'
              ? 'bg-emerald-500 text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
              : 'bg-[#090F1B] text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Table I: Architectural Comparison
        </button>
      </div>

      {/* Selected Table Render */}
      {activeTab === 'table3' && (
        <div className="glass-panel glass-panel-emerald rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">
              Table III: Detailed Multi-Class Confusion Matrix (12,000 Test Frames)
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800 pb-2">
                  <th className="pb-2.5 font-sans font-normal">Ground Truth Class</th>
                  <th className="pb-2.5 text-center font-normal">Normal</th>
                  <th className="pb-2.5 text-center font-normal">DoS</th>
                  <th className="pb-2.5 text-center font-normal">Fuzzy</th>
                  <th className="pb-2.5 text-center font-normal">Spoof-Speed</th>
                  <th className="pb-2.5 text-center font-normal">Spoof-Belt</th>
                  <th className="pb-2.5 text-center font-normal">Precision</th>
                  <th className="pb-2.5 text-center font-normal">Recall</th>
                  <th className="pb-2.5 text-right font-normal">F1-Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {TABLE_III_DATA.map((row) => (
                  <tr key={row.groundTruth} className="hover:bg-[#111C32] text-slate-300">
                    <td className="py-2.5 font-sans font-medium text-white">{row.groundTruth}</td>
                    <td className="py-2.5 text-center font-bold text-emerald-400 bg-emerald-500/10 rounded">{row.normal}</td>
                    <td className="py-2.5 text-center font-bold text-slate-300">{row.dos}</td>
                    <td className="py-2.5 text-center font-bold text-slate-300">{row.fuzzy}</td>
                    <td className="py-2.5 text-center font-bold text-slate-300">{row.speed}</td>
                    <td className="py-2.5 text-center font-bold text-slate-300">{row.belt}</td>
                    <td className="py-2.5 text-center text-emerald-300 font-semibold">{row.prec}</td>
                    <td className="py-2.5 text-center text-emerald-300 font-semibold">{row.rec}</td>
                    <td className="py-2.5 text-right text-emerald-400 font-bold">{row.f1}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'table2' && (
        <div className="glass-panel glass-panel-emerald rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">
              Table II: Multi-Model Comparative Performance Benchmark
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800 font-mono pb-2">
                  <th className="pb-2.5 font-normal">Model Architecture</th>
                  <th className="pb-2.5 font-normal">Accuracy (%)</th>
                  <th className="pb-2.5 font-normal">Precision (%)</th>
                  <th className="pb-2.5 font-normal">Recall (%)</th>
                  <th className="pb-2.5 font-normal">F1-Score (%)</th>
                  <th className="pb-2.5 font-normal">FPR (%)</th>
                  <th className="pb-2.5 font-normal text-right">Inference Latency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-mono">
                {TABLE_II_DATA.map((row) => (
                  <tr
                    key={row.model}
                    className={`transition-colors ${
                      row.highlighted ? 'bg-emerald-500/15 text-emerald-300 font-bold border-l-2 border-emerald-400' : 'text-slate-300 hover:bg-[#111C32]'
                    }`}
                  >
                    <td className="py-2.5 pl-2 font-sans font-medium">{row.model}</td>
                    <td className="py-2.5">{row.acc}</td>
                    <td className="py-2.5">{row.prec}</td>
                    <td className="py-2.5">{row.rec}</td>
                    <td className="py-2.5">{row.f1}</td>
                    <td className="py-2.5 text-emerald-400">{row.fpr}</td>
                    <td className="py-2.5 text-right font-bold">{row.latency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'table1' && (
        <div className="glass-panel glass-panel-emerald rounded-2xl p-5">
          <h3 className="text-sm font-bold text-white mb-3">
            Table I: Architectural Comparison with SOTA Literature
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800 pb-2">
                  <th className="pb-2.5 font-normal">Evaluation Dimension</th>
                  <th className="pb-2.5 font-normal">Prior SOTA Literature</th>
                  <th className="pb-2.5 font-normal text-right">ResiliAV (Proposed)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {TABLE_I_DATA.map((row) => (
                  <tr key={row.dimension} className="hover:bg-[#111C32] text-slate-300">
                    <td className="py-2 font-medium text-slate-200">{row.dimension}</td>
                    <td className="py-2 text-slate-400">{row.prior}</td>
                    <td className="py-2 text-right font-semibold text-emerald-400">{row.proposed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
