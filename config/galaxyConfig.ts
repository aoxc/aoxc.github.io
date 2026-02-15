// --- THE MASTER CONTROLLER ---
// This configuration controls the entire application state.
// Switch MODE to 'MAINNET' to connect to real X Layer.

export const GALAXY_CONFIG = {
  // SYSTEM MODE: 'DEMO' (Shadow Network) | 'MAINNET' (Real X Layer)
  mode: (process.env.NEXT_PUBLIC_APP_MODE as 'DEMO' | 'MAINNET') || 'DEMO',

  // RPC ENDPOINTS
  rpc: {
    DEMO: 'http://127.0.0.1:8545', // Docker/Anvil Container
    MAINNET: 'https://rpc.xlayer.com'
  },

  // SHIP REGISTRY (The 7 Pillars)
  ships: {
    ANDROMEDA: {
      id: 'andromeda',
      name: 'Andromeda',
      token: 'AOXC',
      color: 'rose',
      role: 'Governance'
    },
    AQUILA: { id: 'aquila', name: 'Aquila', token: 'AQLXP', color: 'emerald', role: 'Finance' },
    CENTAURUS: {
      id: 'centaurus',
      name: 'Centaurus',
      token: 'CNTXP',
      color: 'violet',
      role: 'Logistics'
    },
    PEGASUS: { id: 'pegasus', name: 'Pegasus', token: 'PGSXP', color: 'amber', role: 'Data' },
    QUASAR: { id: 'quasar', name: 'Quasar', token: 'QSRXP', color: 'cyan', role: 'Defense' },
    VIRGO: { id: 'virgo', name: 'Virgo', token: 'VRGXP', color: 'fuchsia', role: 'Production' },
    SOMBRERO: {
      id: 'sombrero',
      name: 'Sombrero',
      token: 'SMBXP',
      color: 'orange',
      role: 'Intelligence'
    }
  },

  // ECONOMY SETTINGS
  economy: {
    blockTime: 15 * 60, // 15 Minutes (Shadow Mode)
    taxRate: 0.025, // 2.5%
    initialSupply: '1,000,000,000'
  }
}

export const getActiveRpc = () => {
  return GALAXY_CONFIG.mode === 'DEMO' ? GALAXY_CONFIG.rpc.DEMO : GALAXY_CONFIG.rpc.MAINNET
}
