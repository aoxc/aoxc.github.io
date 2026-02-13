import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { PageView } from './types';
import { Dashboard } from './pages/Dashboard';
import { Governance } from './pages/Governance';
import { Swap } from './pages/Swap';
import { Profile } from './pages/Profile';
import { ContractExplorer } from './pages/ContractExplorer';
import { Missions } from './pages/Missions';
import { Treasury } from './pages/Treasury';
import { LandingPage } from './pages/LandingPage';

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [currentPage, setCurrentPage] = useState<PageView>(PageView.DASHBOARD);

  const renderContent = () => {
    switch (currentPage) {
      case PageView.DASHBOARD:
        return <Dashboard />;
      case PageView.CONTRACTS:
        return <ContractExplorer />;
      case PageView.GOVERNANCE:
        return <Governance />;
      case PageView.SWAP:
        return <Swap />;
      case PageView.PROFILE:
        return <Profile />;
      case PageView.TREASURY:
        return <Treasury />;
      case PageView.MISSIONS:
        return <Missions />;
      default:
        return <Dashboard />;
    }
  };

  if (showLanding) {
    return <LandingPage onEnter={() => setShowLanding(false)} />;
  }

  return (
    <Layout currentPage={currentPage} setPage={setCurrentPage}>
      {renderContent()}
    </Layout>
  );
}