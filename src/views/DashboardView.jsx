import React from 'react';
import KpiCards from '../components/KpiCards';
import VehicleTelemetryCard from '../components/VehicleTelemetryCard';
import TrafficChart from '../components/TrafficChart';
import ActiveAlertsCard from '../components/ActiveAlertsCard';
import RecentSecurityEventsTable from '../components/RecentSecurityEventsTable';
import ResponseModeStepper from '../components/ResponseModeStepper';
import ModelPerformanceCard from '../components/ModelPerformanceCard';
import AttackControlPanel from '../components/AttackControlPanel';

export default function DashboardView() {
  return (
    <div className="space-y-4 sm:space-y-5 w-full max-w-full min-w-0 overflow-hidden">
      {/* Title & Overview */}
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">System Overview</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Real-time monitoring and security status of connected autonomous vehicle.
        </p>
      </div>

      {/* Interactive Threat Injection & Closed-Loop Actuator Bar */}
      <AttackControlPanel />

      {/* 4 Top KPI Cards */}
      <KpiCards />

      {/* Middle Row: Vehicle Telemetry + Traffic Chart + Active Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <VehicleTelemetryCard />
        <TrafficChart />
        <ActiveAlertsCard />
      </div>

      {/* Bottom Row: Recent Security Events + Response & Protection Mode + Model Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <RecentSecurityEventsTable />
        <ResponseModeStepper />
        <ModelPerformanceCard />
      </div>
    </div>
  );
}
