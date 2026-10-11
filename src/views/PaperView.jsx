import React from 'react';
import { FileText, Download, ExternalLink, BookOpen, Code2, Sparkles } from 'lucide-react';

export default function PaperView() {
  const references = [
    { num: 1, text: 'K. Koscher et al., "Experimental security analysis of a modern automobile," IEEE S&P 2010.' },
    { num: 2, text: 'M. Bozdal, M. Samie, and I. Jennions, "A survey on can bus protocol: Attacks, challenges, and potential solutions," IEEE Access 2020.' },
    { num: 3, text: 'C. Miller and C. Valasek, "Remote exploitation of an unaltered passenger vehicle," Black Hat USA 2015.' },
    { num: 4, text: 'M.-J. Kang and J.-W. Kang, "A novel intrusion detection method via deep neural network for in-vehicle network values," IEEE TVT 2016.' },
    { num: 5, text: 'H. M. Song, J. Woo, and H. K. Kim, "In-vehicle network intrusion detection using deep convolutional neural network," Vehicular Communications 2020.' },
    { num: 6, text: 'S. Tariq, S. Lee, H. K. Kim, and S. S. Woo, "CAN-ADF: An anomaly detection framework for controller area networks," IEEE Access 2021.' },
    { num: 7, text: 'A. Taylor, N. Japkowicz, and S. Leblanc, "Frequency-based anomaly detection for the automotive can bus," IEEE WCCI 2017.' },
    { num: 8, text: 'F. R. Almehrezi et al., "An emerging security framework for connected autonomous vehicles," IEEE BESC 2020.' },
    { num: 9, text: 'T. Chen and C. Guestrin, "XGBoost: A scalable tree boosting system," ACM SIGKDD 2016.' },
    { num: 10, text: 'A. Vaswani et al., "Attention is all you need," NeurIPS 2017.' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">IEEE Research Publication & Artifacts</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Camera-ready IEEE Conference Paper dossier, Overleaf LaTeX source, and Google Colab machine learning pipeline.
        </p>
      </div>

      {/* Paper Header Card */}
      <div className="bg-[#0E1726] border border-[#1A2942] rounded-2xl p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#1A2942]">
          <div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
              IEEE Conference Paper Format (4 Pages)
            </span>
            <h3 className="text-lg font-bold text-white mt-1.5 leading-snug">
              ResiliAV: Adaptive Closed-Loop Hybrid Intrusion Detection and Automated Fail-Safe Actuation for Connected Autonomous Vehicles
            </h3>
            <div className="text-xs text-slate-300 mt-1">
              <strong>Himanshi Kumawat</strong> &bull; Department of Computer Applications, JECRC University &bull; <span className="font-mono text-cyan-400">Himanshi.24bcan0421@jecrcu.edu.in</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/ResiliAV_IEEE_Research_Paper_Final.pdf"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors shadow-lg"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Open PDF</span>
            </a>
            <a
              href="/ResiliAV_IEEE_Research_Paper.html"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>HTML Viewer</span>
            </a>
          </div>
        </div>

        {/* Abstract Box */}
        <div>
          <h4 className="text-xs font-bold uppercase text-slate-400 font-mono tracking-wider mb-1.5">Abstract</h4>
          <p className="text-xs text-slate-300 leading-relaxed text-justify bg-[#070B14] p-4 rounded-xl border border-slate-800">
            Connected Autonomous Vehicles (CAVs) increasingly rely on unauthenticated Controller Area Network (CAN) bus protocols and complex telematics layers, rendering them highly vulnerable to malicious frame injection, stealth sensor spoofing, and Denial-of-Service (DoS) flooding. Despite recent advances in machine learning-based Intrusion Detection Systems (IDS), prior literature exhibits two critical research gaps: (1) existing models function strictly as passive offline observers without closed-loop vehicular actuation, and (2) deep neural architectures introduce inference latencies exceeding 15 ms, violating real-time vehicular safety constraints. In this paper, we propose ResiliAV (ACH-IDS), an adaptive closed-loop cyber-physical defense framework. ResiliAV employs a dual-stage asymmetric pipeline comprising an edge-lightweight XGBoost filter for sub-millisecond (&lt;0.5 ms) line-rate packet triage, cascaded into a spatial 1D-Convolutional Neural Network with Multi-Head Self-Attention for deep payload inspection. Crucially, ResiliAV couples real-time threat inference with an automated ISO 26262 ASIL-D compliant Fail-Safe Actuator that enforces an instantaneous 50 km/h speed governor lock, secures passenger seatbelt pre-tensioner interlocks, and broadcasts auditory telematics alerts. Evaluated against 60,000 real-world calibrated CAN frames conforming to the HCRLab Car-Hacking benchmark, ResiliAV achieves an overall detection accuracy of 99.78%, a precision of 99.80%, a false positive rate of 0.021%, and an end-to-end inference latency of 1.48 ms, satisfying the 10 ms CAN bus transmission deadline.
          </p>
        </div>

        {/* Index Terms */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {['Autonomous Vehicles', 'Controller Area Network (CAN-Bus)', 'Intrusion Detection System (IDS)', 'Closed-Loop Fail-Safe Actuation', 'XGBoost', '1D-CNN', 'Self-Attention', 'ISO 26262 ASIL-D', 'Speed Governor'].map((term) => (
            <span key={term} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {term}
            </span>
          ))}
        </div>
      </div>

      {/* Artifacts Download Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Colab Notebook */}
        <div className="p-4 rounded-2xl bg-[#0E1726] border border-[#1A2942] flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Google Colab Notebook</h4>
              <span className="text-[10px] text-slate-400 font-mono">.ipynb Pipeline</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mb-3">
            Contains data loading, XGBoost training, 1D-CNN attention model, confusion matrix plotting, and speed governor actuation logic.
          </p>
          <div className="text-[11px] text-cyan-400 font-mono bg-[#070B14] p-2 rounded border border-slate-800">
            ResiliAV_ACH_IDS_Colab_Notebook.ipynb
          </div>
        </div>

        {/* Overleaf LaTeX Package */}
        <div className="p-4 rounded-2xl bg-[#0E1726] border border-[#1A2942] flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Overleaf LaTeX Package</h4>
              <span className="text-[10px] text-slate-400 font-mono">main.tex & references.bib</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mb-3">
            Fully collision-free IEEE Transactions/Conference template with Table I, Table II, Table III, and 16 citations.
          </p>
          <div className="text-[11px] text-teal-300 font-mono bg-[#070B14] p-2 rounded border border-slate-800">
            ResiliAV_Overleaf_Package.zip
          </div>
        </div>

        {/* Chat History Complete */}
        <div className="p-4 rounded-2xl bg-[#0E1726] border border-[#1A2942] flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Complete Conversation History</h4>
              <span className="text-[10px] text-slate-400 font-mono">127 Dialogue Turns</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mb-3">
            Full untruncated transcript from conversation 8f0b9402 with all architectural rationale, viva questions, and formulas.
          </p>
          <div className="text-[11px] text-cyan-400 font-mono bg-[#070B14] p-2 rounded border border-slate-800">
            CHAT_HISTORY_COMPLETE.md
          </div>
        </div>
      {/* Empirical Plots Card (Figure 2) */}
      <div className="bg-[#0E1726] border border-[#1A2942] rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#1A2942]">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Figure 2: Empirical Evaluation Plots (Accuracy vs. Latency & Velocity Profile)</span>
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Empirical validation showing 99.78% accuracy within the 10 ms CAN deadline and automated 50 km/h Limp-Home deceleration.
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold hidden sm:inline">
            IEEE Paper Fig. 2
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Plot (a): Latency vs Accuracy */}
          <div className="bg-[#070B14] border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="text-xs font-semibold text-slate-200 text-center">
              (a) Detection Accuracy vs. Inference Latency (&tau;)
            </div>
            <div className="w-full">
              <svg viewBox="0 0 450 220" className="w-full h-auto text-[10px] font-mono">
                <rect x="50" y="20" width="370" height="160" fill="#0A0F1D" stroke="#1E293B" rx="4" />
                <line x1="50" y1="60" x2="420" y2="60" stroke="#1E293B" strokeDasharray="2,2" />
                <line x1="50" y1="100" x2="420" y2="100" stroke="#1E293B" strokeDasharray="2,2" />
                <line x1="50" y1="140" x2="420" y2="140" stroke="#1E293B" strokeDasharray="2,2" />
                
                {/* 10ms deadline line */}
                <line x1="330" y1="20" x2="330" y2="180" stroke="#F43F5E" strokeWidth="2" strokeDasharray="4,3" />
                <text x="335" y="40" fill="#F43F5E" fontSize="9" fontWeight="bold">10ms CAN Deadline</text>
                
                {/* Pareto Optimal Zone */}
                <rect x="70" y="25" width="160" height="70" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="1" rx="4" />
                <text x="75" y="40" fill="#34D399" fontSize="8.5" fontWeight="bold">Pareto-Optimal Zone</text>

                {/* Y-axis labels */}
                <text x="42" y="184" fill="#64748B" fontSize="8" textAnchor="end">98.0%</text>
                <text x="42" y="144" fill="#64748B" fontSize="8" textAnchor="end">98.5%</text>
                <text x="42" y="104" fill="#64748B" fontSize="8" textAnchor="end">99.0%</text>
                <text x="42" y="64" fill="#64748B" fontSize="8" textAnchor="end">99.5%</text>
                <text x="42" y="26" fill="#64748B" fontSize="8" textAnchor="end">100.0%</text>
                
                {/* X-axis labels */}
                <text x="50" y="195" fill="#64748B" fontSize="8" textAnchor="middle">0.1ms</text>
                <text x="140" y="195" fill="#64748B" fontSize="8" textAnchor="middle">1.0ms</text>
                <text x="240" y="195" fill="#64748B" fontSize="8" textAnchor="middle">3.0ms</text>
                <text x="330" y="195" fill="#F43F5E" fontWeight="bold" fontSize="8" textAnchor="middle">10.0ms</text>
                <text x="420" y="195" fill="#64748B" fontSize="8" textAnchor="middle">20.0ms</text>

                {/* Points */}
                <rect x="216" y="166" width="7" height="7" fill="#3B82F6" />
                <text x="226" y="172" fill="#60A5FA" fontSize="8">RF (2.45ms, 98.15%)</text>

                <polygon points="248,103 244,110 252,110" fill="#A855F7" />
                <text x="256" y="109" fill="#C084FC" fontSize="8">1D-CNN (3.12ms, 98.92%)</text>

                <polygon points="105,60 109,65 105,70 101,65" fill="#F97316" />
                <text x="113" y="68" fill="#FB923C" fontSize="8">XGBoost (0.41ms, 99.42%)</text>

                <circle cx="165" cy="35" r="7" fill="#00F0FF" fillOpacity="0.25" />
                <circle cx="165" cy="35" r="4" fill="#00F0FF" />
                <text x="175" y="34" fill="#38BDF8" fontSize="9" fontWeight="bold">ResiliAV (1.48ms, 99.78%)</text>
              </svg>
            </div>
            <p className="text-[11px] text-slate-400 text-center">
              ResiliAV combines XGBoost + Attention to achieve 99.78% accuracy in just 1.48 ms (85% ahead of the 10 ms deadline).
            </p>
          </div>

          {/* Plot (b): Deceleration Curve */}
          <div className="bg-[#070B14] border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="text-xs font-semibold text-slate-200 text-center">
              (b) Closed-Loop Velocity Response (100 &rarr; 50 km/h Safe Clamp)
            </div>
            <div className="w-full">
              <svg viewBox="0 0 450 220" className="w-full h-auto text-[10px] font-mono">
                <rect x="50" y="20" width="370" height="160" fill="#0A0F1D" stroke="#1E293B" rx="4" />
                
                {/* Attack Injected Line */}
                <line x1="140" y1="20" x2="140" y2="180" stroke="#F43F5E" strokeWidth="1.5" strokeDasharray="3,3" />
                <text x="145" y="32" fill="#F43F5E" fontSize="8.5" fontWeight="bold">Attack (t = 2.0s)</text>

                {/* Detection Instant */}
                <line x1="145" y1="45" x2="145" y2="180" stroke="#00F0FF" strokeWidth="1.2" strokeDasharray="2,2" />
                <text x="150" y="58" fill="#38BDF8" fontSize="8" fontWeight="bold">Detected in 1.48ms</text>

                {/* Safe Clamp Line */}
                <line x1="50" y1="115" x2="420" y2="115" stroke="#10B981" strokeWidth="1.2" strokeDasharray="4,4" />
                <text x="310" y="110" fill="#34D399" fontSize="8" fontWeight="bold">ASIL-D 50 km/h Safe Limit</text>

                {/* Unprotected Car */}
                <line x1="50" y1="45" x2="420" y2="45" stroke="#64748B" strokeWidth="1.8" strokeDasharray="5,4" />
                <text x="260" y="40" fill="#94A3B8" fontSize="8">Without Defense (100 km/h Unchecked)</text>

                {/* ResiliAV Curve */}
                <path d="M 50,45 L 140,45 Q 180,48 220,78 T 300,115 L 420,115" fill="none" stroke="#2DD4BF" strokeWidth="3" />
                <circle cx="300" cy="115" r="4" fill="#2DD4BF" />
                <text x="220" y="135" fill="#2DD4BF" fontSize="8.5" fontWeight="bold">ResiliAV 50 km/h Clamp (82% kinetic energy cut)</text>

                {/* Y-axis labels */}
                <text x="42" y="48" fill="#64748B" fontSize="8" textAnchor="end">100</text>
                <text x="42" y="82" fill="#64748B" fontSize="8" textAnchor="end">75</text>
                <text x="42" y="118" fill="#34D399" fontSize="8" fontWeight="bold" textAnchor="end">50</text>
                <text x="42" y="150" fill="#64748B" fontSize="8" textAnchor="end">25</text>
                <text x="42" y="184" fill="#64748B" fontSize="8" textAnchor="end">0</text>

                {/* X-axis labels */}
                <text x="50" y="195" fill="#64748B" fontSize="8" textAnchor="middle">0.0s</text>
                <text x="140" y="195" fill="#F43F5E" fontWeight="bold" fontSize="8" textAnchor="middle">2.0s</text>
                <text x="230" y="195" fill="#64748B" fontSize="8" textAnchor="middle">4.0s</text>
                <text x="320" y="195" fill="#64748B" fontSize="8" textAnchor="middle">6.0s</text>
                <text x="410" y="195" fill="#64748B" fontSize="8" textAnchor="middle">8.0s</text>
              </svg>
            </div>
            <p className="text-[11px] text-slate-400 text-center">
              Speed smoothly locks from 100 km/h to 50 km/h within 3.4 seconds of attack injection, protecting passenger lives.
            </p>
          </div>
        </div>

        {/* Step-by-Step Vehicle Operation Cards (Simple English) */}
        <div className="pt-2">
          <h5 className="text-xs font-bold uppercase text-slate-400 font-mono tracking-wider mb-2">
            Step-by-Step Vehicle Operation (How the Autonomous Car Responds)
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-[#070B14] border border-emerald-500/30 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>1. Normal Driving</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                Car cruises at 100 km/h. Stage 1 XGBoost checks all packets in 0.41 ms, passing 88%+ routine messages instantly.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#070B14] border border-rose-500/30 space-y-1">
              <div className="flex items-center gap-1.5 text-rose-400 font-bold text-xs">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <span>2. Attack Injected</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                Attacker injects DoS floods, fuzzy noise, or sensor spoofing via OBD-II port or wireless telematics antenna.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#070B14] border border-cyan-500/30 space-y-1">
              <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-xs">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>3. AI Detects (1.48 ms)</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                Stage 2 Self-Attention inspects payload bits and confirms attack in 1.48 ms, well ahead of the 10 ms deadline.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#070B14] border border-amber-500/30 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>4. Safe Actuation</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                Speed clamps to 50 km/h (82% kinetic energy cut), seatbelts lock mechanically, and cabin voice advisory sounds.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* References Bibliography */}
      <div className="bg-[#0E1726] border border-[#1A2942] rounded-2xl p-5">
        <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span>Key IEEE References (Selected from 16 Bibliography Entries)</span>
        </h4>
        <div className="space-y-2 text-xs font-mono text-slate-300">
          {references.map((ref) => (
            <div key={ref.num} className="p-2 rounded-lg bg-[#070B14] border border-slate-800 flex items-start gap-2">
              <span className="text-cyan-400 font-bold flex-shrink-0">[{ref.num}]</span>
              <span>{ref.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
