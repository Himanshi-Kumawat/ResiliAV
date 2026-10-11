import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Cpu, 
  Network, 
  Zap, 
  Binary, 
  Sliders, 
  Terminal, 
  CheckCircle2, 
  AlertTriangle,
  ChevronRight,
  Flame
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export default function IntrusionDetectionView() {
  const { metrics, activeAttack } = useSimulation();
  const [selectedByteIndex, setSelectedByteIndex] = useState(4); // Default to Byte 4 (Seatbelt/Speed)
  const [entropyThreshold, setEntropyThreshold] = useState(0.45);

  // 8 Bytes of CAN frame
  const rawPayload = [
    { idx: 0, hex: '00', bin: '00000000', label: 'Control Flag', weight: 0.04 },
    { idx: 1, hex: activeAttack === 'SPEED_SPOOF' ? 'FF' : '28', bin: activeAttack === 'SPEED_SPOOF' ? '11111111' : '00101000', label: 'Speed MSB', weight: activeAttack === 'SPEED_SPOOF' ? 0.88 : 0.05 },
    { idx: 2, hex: '00', bin: '00000000', label: 'Speed LSB', weight: 0.03 },
    { idx: 3, hex: '00', bin: '00000000', label: 'Checksum', weight: 0.02 },
    { idx: 4, hex: activeAttack === 'SEATBELT_SPOOF' ? '01' : (activeAttack === 'SPEED_SPOOF' ? 'FF' : '28'), bin: activeAttack === 'SEATBELT_SPOOF' ? '00000001' : '00101000', label: 'Seatbelt/Throttle', weight: (activeAttack === 'SEATBELT_SPOOF' || activeAttack === 'SPEED_SPOOF') ? 0.96 : 0.06 },
    { idx: 5, hex: '00', bin: '00000000', label: 'Reserved', weight: 0.02 },
    { idx: 6, hex: '00', bin: '00000000', label: 'CRC Check', weight: 0.03 },
    { idx: 7, hex: '1E', bin: '00011110', label: 'Alive Counter', weight: 0.05 },
  ];

  const selectedByte = rawPayload[selectedByteIndex];

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#1B2943]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight">ACH-IDS Deep Learning & Attention Laboratory</h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase font-semibold">
              Stage 1 + Stage 2 Architecture
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Ultra-fast XGBoost Line-Rate Triage (&lt;0.5 ms) cascaded into Spatial 1D-CNN Multi-Head Self-Attention (&lt;1.2 ms).
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-[#090F1B] border border-purple-500/30 text-purple-300">
            Target Latency: <strong>&lt; 2.0 ms</strong> (Achieved: <strong>1.48 ms</strong>)
          </div>
        </div>
      </div>

      {/* Visual Cascaded Flow Diagram (Stage 1 -> Triage -> Stage 2) */}
      <div className="glass-panel glass-panel-purple rounded-2xl p-5 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono">
          Asymmetric Cascaded Inference Pipeline
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* Step 1: Ingestion */}
          <div className="p-4 rounded-xl bg-[#090F1B] border border-slate-800 text-center space-y-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mx-auto flex items-center justify-center font-bold text-xs font-mono">
              IN
            </div>
            <div className="text-xs font-bold text-white">CAN Frame Ingress</div>
            <div className="text-[11px] text-slate-400 font-mono">Arbitration ID + 8 Bytes</div>
            <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded block">
              1,248 msgs/s line-rate
            </span>
          </div>

          {/* Step 2: Stage 1 Gatekeeper */}
          <div className="p-4 rounded-xl bg-[#090F1B] border border-purple-500/30 text-center space-y-2 relative">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 mx-auto flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-white">Stage 1: XGBoost Filter</div>
            <div className="text-[11px] text-purple-300 font-mono">Latency: &lt; 0.41 ms</div>
            <div className="text-[10px] text-slate-400">
              Evaluates Δt, ID, & Entropy H(D)
            </div>
            <div className="pt-1 text-[10px] font-mono text-emerald-400 font-semibold">
              88.4% Benign Exited
            </div>
          </div>

          {/* Step 3: Stage 2 Deep Attention Inspector */}
          <div className="p-4 rounded-xl bg-[#090F1B] border border-purple-500/50 text-center space-y-2 relative shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 text-purple-300 mx-auto flex items-center justify-center">
              <Network className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-white">Stage 2: Self-Attention</div>
            <div className="text-[11px] text-purple-300 font-mono">Latency: &lt; 1.20 ms</div>
            <div className="text-[10px] text-slate-400">
              1D-CNN + Attention Q, K, V
            </div>
            <div className="pt-1 text-[10px] font-mono text-amber-400 font-semibold">
              11.6% Boundary Packets
            </div>
          </div>

          {/* Step 4: ISO 26262 Fail-Safe Actuation */}
          <div className="p-4 rounded-xl bg-[#090F1B] border border-amber-500/40 text-center space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 mx-auto flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-white">ASIL-D Actuator Lock</div>
            <div className="text-[11px] text-amber-300 font-mono">Reaction: 1.48 ms Total</div>
            <div className="text-[10px] text-slate-400">
              Drop Frame & Limp-Home 50 km/h
            </div>
            <div className="pt-1 text-[10px] font-mono text-emerald-400 font-semibold">
              99.78% Overall Detection
            </div>
          </div>
        </div>
      </div>

      {/* Interactive 8-Byte Payload & Self-Attention Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: 8-Byte Register & Heatmap (7 cols) */}
        <div className="lg:col-span-7 glass-panel glass-panel-purple rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono">
              Payload Byte Saliency Attention Grid
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Click a byte to inspect bit-level registers
            </span>
          </div>

          {/* 8-Byte Interactive Register */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {rawPayload.map((b) => {
              const isSelected = selectedByteIndex === b.idx;
              const isHighAttention = b.weight > 0.5;
              return (
                <button
                  key={b.idx}
                  onClick={() => setSelectedByteIndex(b.idx)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    isHighAttention
                      ? 'bg-rose-500/25 border-rose-500 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.4)] animate-pulse'
                      : isSelected
                      ? 'bg-purple-500/20 border-purple-400 text-white shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                      : 'bg-[#090F1B] border-slate-800 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <div className="text-[10px] font-mono text-slate-500">Byte {b.idx}</div>
                  <div className="text-sm font-bold font-mono mt-1 text-white">0x{b.hex}</div>
                  <div className={`text-[10px] font-mono mt-1 ${isHighAttention ? 'text-rose-400 font-bold' : 'text-purple-300'}`}>
                    α: {b.weight}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bitfield Inspector for Selected Byte */}
          <div className="bg-[#060A12] p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-purple-300 font-bold">
                BITFIELD INSPECTOR &bull; BYTE {selectedByte.idx} ({selectedByte.label})
              </span>
              <span className="text-slate-400">HEX: <strong className="text-white">0x{selectedByte.hex}</strong></span>
            </div>

            {/* 8 Binary Bits */}
            <div className="grid grid-cols-8 gap-1.5 text-center font-mono">
              {selectedByte.bin.split('').map((bit, bitIdx) => {
                const isBitOne = bit === '1';
                return (
                  <div
                    key={bitIdx}
                    className={`p-2 rounded border text-xs ${
                      isBitOne
                        ? 'bg-purple-500/20 border-purple-500/50 text-purple-300 font-bold shadow-[0_0_8px_rgba(168,85,247,0.3)]'
                        : 'bg-slate-900 border-slate-800 text-slate-500'
                    }`}
                  >
                    <div className="text-[9px] text-slate-500">b{7 - bitIdx}</div>
                    <div className="text-sm font-bold mt-0.5">{bit}</div>
                  </div>
                );
              })}
            </div>

            <div className="text-[11px] text-slate-400 font-mono pt-1 flex justify-between">
              <span>Attention Weight: <strong className="text-purple-300">{selectedByte.weight}</strong></span>
              <span>Anomalous Bit Flip: <strong className={selectedByte.weight > 0.5 ? 'text-rose-400' : 'text-emerald-400'}>{selectedByte.weight > 0.5 ? 'DETECTED' : 'NONE'}</strong></span>
            </div>
          </div>
        </div>

        {/* Right: Shannon Entropy Calculator & Formulae (5 cols) */}
        <div className="lg:col-span-5 glass-panel glass-panel-purple rounded-2xl p-5 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono mb-2">
              Shannon Payload Entropy Engine
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Fuzzy injection and DoS floods disrupt expected entropy bounds. ResiliAV computes payload entropy across adjacent bytes in line-rate:
            </p>

            {/* Formula Block */}
            <div className="p-3.5 rounded-xl bg-[#060A12] border border-slate-800 font-mono text-xs text-purple-300 space-y-2">
              <div className="text-slate-500">// Eq. (1) Shannon Payload Entropy:</div>
              <div className="text-white font-bold">
                H(D) = - ∑ P(d_i) log₂(P(d_i) + ε)
              </div>
              <div className="text-slate-500 pt-1">// Eq. (4) Self-Attention Weight:</div>
              <div className="text-white font-bold">
                Attention(Q, K, V) = softmax((Q K^T) / √d_k) V
              </div>
            </div>
          </div>

          {/* Entropy Gauge & Slider */}
          <div className="bg-[#060A12] p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-300">Live Payload Entropy H(D):</span>
              <span className={`text-base font-bold ${activeAttack === 'FUZZING' ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>
                {activeAttack === 'FUZZING' ? '3.82 bits/byte' : '0.24 bits/byte'}
              </span>
            </div>

            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${activeAttack === 'FUZZING' ? 'bg-rose-500' : 'bg-emerald-400'}`}
                style={{ width: activeAttack === 'FUZZING' ? '92%' : '18%' }}
              />
            </div>

            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0.0 (Deterministic)</span>
              <span>Threshold: 0.45</span>
              <span>4.0 (Max Random)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
