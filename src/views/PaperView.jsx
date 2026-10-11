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
