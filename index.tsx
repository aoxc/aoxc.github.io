import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { LanguageProvider } from './contexts/LanguageContext'
import { SimulationProvider } from './contexts/SimulationContext'
import { ToastProvider } from './contexts/ToastContext'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Could not find root element to mount to')
}

const root = ReactDOM.createRoot(rootElement)
root.render(
  <React.StrictMode>
    <LanguageProvider>
      {/* ToastProvider must be PARENT of SimulationProvider */}
      <ToastProvider>
        <SimulationProvider>
          <App />
        </SimulationProvider>
      </ToastProvider>
    </LanguageProvider>
  </React.StrictMode>
)
