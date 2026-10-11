import React from 'react';
import { SimulationProvider, useSimulation } from './context/SimulationContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LoginPage from './components/LoginPage';
import DashboardView from './views/DashboardView';
import MonitoringView from './views/MonitoringView';
import IntrusionDetectionView from './views/IntrusionDetectionView';
import FailSafeView from './views/FailSafeView';
import AnalyticsView from './views/AnalyticsView';
import ArchitectureView from './views/ArchitectureView';

function MainContent() {
  const { activeTab } = useSimulation();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'monitoring':
        return <MonitoringView />;
      case 'intrusion':
        return <IntrusionDetectionView />;
      case 'failsafe':
        return <FailSafeView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'architecture':
        return <ArchitectureView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <main className="flex-1 bg-[#060A12] overflow-y-auto overflow-x-hidden p-2.5 sm:p-5 md:p-6 scroll-smooth w-full max-w-full min-w-0">
      <div className="max-w-7xl mx-auto w-full min-w-0">
        {renderActiveView()}
      </div>
    </main>
  );
}

function AppShell() {
  const { isAuthenticated } = useSimulation();

  // If user is not logged in, show the futuristic Login Gateway
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Once authenticated, show the Full Working Dashboard
  return (
    <div className="min-h-screen bg-[#060A12] flex flex-col text-slate-100 font-sans w-full max-w-full overflow-x-hidden relative">
      <Header />
      <div className="flex-1 flex overflow-hidden relative w-full max-w-full min-w-0">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <SimulationProvider>
      <AppShell />
    </SimulationProvider>
  );
}
