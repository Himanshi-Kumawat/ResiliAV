import React, { useState, useEffect } from 'react';
import { useSimulation } from '../context/SimulationContext';

export default function TrafficChart() {
  const { activeAttack } = useSimulation();

  const timeLabels = ['12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
  
  const [normalPoints, setNormalPoints] = useState([85, 110, 155, 95, 125, 140]);
  const [suspiciousPoints, setSuspiciousPoints] = useState([12, 28, 42, 18, 32, 22]);

  useEffect(() => {
    if (activeAttack) {
      setSuspiciousPoints([15, 30, 45, 35, 95, 168]);
      setNormalPoints([85, 110, 140, 80, 70, 60]);
    } else {
      setSuspiciousPoints([12, 28, 42, 18, 32, 22]);
      setNormalPoints([85, 110, 155, 95, 125, 140]);
    }
  }, [activeAttack]);

  const chartWidth = 460;
  const chartHeight = 170;
  const maxVal = 200;

  const getCoordinates = (points) => {
    const step = (chartWidth - 50) / (points.length - 1);
    return points.map((p, idx) => {
      const x = 35 + idx * step;
      const y = chartHeight - (p / maxVal) * (chartHeight - 30);
      return { x, y, val: p };
    });
  };

  const normalCoords = getCoordinates(normalPoints);
  const suspiciousCoords = getCoordinates(suspiciousPoints);

  const createPath = (coords) => {
    return coords.reduce((acc, curr, idx) => {
      return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
    }, '');
  };

  return (
    <div className="glass-panel glass-panel-blue rounded-2xl p-4 sm:p-5 flex flex-col justify-between w-full max-w-full min-w-0 overflow-hidden">
      {/* Header with Title & Legend */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-white tracking-wide">
          Traffic & Threat Overview
        </h3>
        <div className="flex items-center gap-3 sm:gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span>Normal</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span>Suspicious</span>
          </div>
        </div>
      </div>

      {/* SVG Line Graph */}
      <div className="relative w-full h-56 pt-2 select-none overflow-hidden">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight + 25}`} className="w-full h-full overflow-hidden">
          {/* Horizontal Grid lines and Y-axis labels */}
          {[0, 50, 100, 150, 200].map((val) => {
            const y = chartHeight - (val / maxVal) * (chartHeight - 30);
            return (
              <g key={val}>
                <line
                  x1="30"
                  y1={y}
                  x2={chartWidth - 10}
                  y2={y}
                  stroke="#1B2943"
                  strokeWidth="1"
                  strokeDasharray={val === 0 ? "none" : "3 3"}
                />
                <text
                  x="5"
                  y={y + 4}
                  fill="#64748B"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Normal Traffic Line (Cyan) */}
          <path
            d={createPath(normalCoords)}
            fill="none"
            stroke="#00F0FF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-700 drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]"
          />

          {normalCoords.map((pt, i) => (
            <circle
              key={`n-${i}`}
              cx={pt.x}
              cy={pt.y}
              r="3.5"
              fill="#00F0FF"
              stroke="#090F1B"
              strokeWidth="2"
              className="transition-all duration-700"
            />
          ))}

          {/* Suspicious Anomaly Line (Red/Coral) */}
          <path
            d={createPath(suspiciousCoords)}
            fill="none"
            stroke="#FF3366"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-700 drop-shadow-[0_0_8px_rgba(255,51,102,0.5)]"
          />

          {suspiciousCoords.map((pt, i) => (
            <circle
              key={`s-${i}`}
              cx={pt.x}
              cy={pt.y}
              r="3.5"
              fill="#FF3366"
              stroke="#090F1B"
              strokeWidth="2"
              className="transition-all duration-700"
            />
          ))}

          {/* X-axis Time Labels */}
          {timeLabels.map((time, idx) => {
            const step = (chartWidth - 50) / (timeLabels.length - 1);
            const x = 35 + idx * step;
            return (
              <text
                key={time}
                x={x}
                y={chartHeight + 18}
                textAnchor="middle"
                fill="#64748B"
                fontSize="10"
                fontFamily="monospace"
              >
                {time}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
