import React, { useState, useEffect } from 'react'
import { Layout } from './components/Layout'
import { PageView } from './types'
import { Dashboard } from './pages/Dashboard'
import { Governance } from './pages/Governance'
import { Swap } from './pages/Swap'
import { Profile } from './pages/Profile'
import { ContractExplorer } from './pages/ContractExplorer'
import { Missions } from './pages/Missions'
import { Treasury } from './pages/Treasury'
import { LandingPage } from './pages/LandingPage'
import { Documentation } from './pages/Documentation'
import { Telemetry } from './pages/Telemetry'
import { Oracle } from './pages/Oracle'
import { Bridge } from './pages/Bridge'
import { Security } from './pages/Security'
import { Sentinel } from './pages/Sentinel'
import { Virgo } from './pages/Virgo'
import { Market } from './pages/Market'
import { FleetEngineering } from './pages/FleetEngineering'
import { CookieConsent } from './components/CookieConsent'

export default function App() {
  const [showLanding, setShowLanding] = useState(() => {
    const saved = localStorage.getItem('aoxc_show_landing')
    return saved !== null ? JSON.parse(saved) : true
  })

  const [currentPage, setCurrentPage] = useState<PageView>(() => {
    const saved = localStorage.getItem('aoxc_current_page')
    return (saved as PageView) || PageView.DASHBOARD
  })

  useEffect(() => {
    localStorage.setItem('aoxc_current_page', currentPage)
  }, [currentPage])

  useEffect(() => {
    localStorage.setItem('aoxc_show_landing', JSON.stringify(showLanding))
  }, [showLanding])

  const handleEnter = () => {
    setShowLanding(false)
  }

  const renderContent = () => {
    switch (currentPage) {
      case PageView.DASHBOARD:
        return <Dashboard setPage={setCurrentPage} />
      case PageView.CONTRACTS:
        return <ContractExplorer />
      case PageView.GOVERNANCE:
        return <Governance />
      case PageView.SWAP:
        return <Swap setPage={setCurrentPage} />
      case PageView.BRIDGE:
        return <Bridge />
      case PageView.SECURITY:
        return <Security />
      case PageView.SENTINEL:
        return <Sentinel />
      case PageView.VIRGO:
        return <Virgo />
      case PageView.PROFILE:
        return <Profile />
      case PageView.TREASURY:
        return <Treasury />
      case PageView.MISSIONS:
        return <Missions />
      case PageView.DOCS:
        return <Documentation />
      case PageView.TELEMETRY:
        return <Telemetry />
      case PageView.ORACLE:
        return <Oracle />
      case PageView.MARKET:
        return <Market />
      case PageView.FLEET_ENGINEERING:
        return <FleetEngineering />
      default:
        return <Dashboard setPage={setCurrentPage} />
    }
  }

  return (
    <>
      {showLanding ? (
        <LandingPage onEnter={handleEnter} />
      ) : (
        <Layout currentPage={currentPage} setPage={setCurrentPage}>
          {renderContent()}
        </Layout>
      )}
      <CookieConsent />
    </>
  )
}
