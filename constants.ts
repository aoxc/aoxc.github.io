import { ShipModule, Proposal, ContractFolder, ContractStatus } from './types'

// Mapping based on the file tree provided
export const FLEET_MODULES: ShipModule[] = [
  {
    id: 'andromeda',
    name: 'ANDROMEDA CORE',
    role: 'Governance & Core',
    contractRef: 'ANDROMEDA_CORE.sol',
    status: 'active',
    description: 'Ana Gemi ve Yönetim Merkezi. DAO kararlarının nihai onay mercii.',
    themeColor: 'cyan',
    localToken: {
      symbol: 'AOXC',
      name: 'AOXC Governance',
      contractAddress: '0xeb9580c3946bb47d73aae1d4f7a94148b554b2f4',
      explorerUrl:
        'https://www.oklink.com/tr/x-layer/token/0xeb9580c3946bb47d73aae1d4f7a94148b554b2f4',
      price: 0.0071,
      change24h: 0.0
    },
    treasury: { locked: '100,000,000', earnings: '0.000', asset: 'AOXC' },
    marketStats: { taxRevenue24h: '5,400 AOXC', exchangeRate: '1.00 AOXC' },
    missions: [
      { id: 1, status: 'PENDING', label: 'Core Sync' },
      { id: 2, status: 'PENDING', label: 'Vote Validation' },
      { id: 3, status: 'PENDING', label: 'Proposal Audit' }
    ],
    icon: 'Cpu'
  },
  {
    id: 'aquila',
    name: 'AQUILA EXCHANGE',
    role: 'DEX & Liquidity',
    contractRef: 'AQUILA_EXCHANGE.sol',
    status: 'active',
    description: 'Yüksek frekanslı likidite motoru ve piyasa yapıcısı.',
    themeColor: 'emerald', // Green
    localToken: {
      symbol: 'AQLXP',
      name: 'Aquila LP XP',
      price: 0.0032, // Relative to AOXC
      change24h: 5.2,
      contractAddress: '0x97Bdd1fD1CAF756e00eFD42eBa9406821465B365'
    },
    treasury: { locked: '1,000,000', earnings: '0.000', asset: 'AOXC' },
    marketStats: { taxRevenue24h: '18,200 AOXC', exchangeRate: '1 AQLXP = 0.0032 AOXC' },
    missions: [
      { id: 1, status: 'PENDING', label: 'Liquidity Provision' },
      { id: 2, status: 'PENDING', label: 'Swap Route Opt' },
      { id: 3, status: 'PENDING', label: 'Arbitrage Check' }
    ],
    icon: 'ArrowRightLeft'
  },
  {
    id: 'centaurus',
    name: 'CENTAURUS BRIDGE',
    role: 'Interchain Bridge',
    contractRef: 'CENTAURUS_BRIDGE.sol',
    status: 'active',
    description: 'OKX X Layer ve diğer zincirler arası boyut kapısı.',
    themeColor: 'violet', // Purple
    localToken: {
      symbol: 'CNTXP',
      name: 'Centaurus Warp XP',
      price: 0.0085,
      change24h: -1.1
    },
    treasury: { locked: '1,000,000', earnings: '0.000', asset: 'AOXC' },
    marketStats: { taxRevenue24h: '8,900 AOXC', exchangeRate: '1 CNTXP = 0.0085 AOXC' },
    missions: [
      { id: 1, status: 'PENDING', label: 'Bridge Security' },
      { id: 2, status: 'PENDING', label: 'Cross-Chain Sync' },
      { id: 3, status: 'PENDING', label: 'Relayer Maint.' }
    ],
    icon: 'Network'
  },
  {
    id: 'pegasus',
    name: 'PEGASUS ORACLE',
    role: 'Data Feeds',
    contractRef: 'PEGASUS_ORACLE.sol',
    status: 'active',
    description: 'Gerçek zamanlı fiyat kahini ve veri gözlemcisi.',
    themeColor: 'amber', // Yellow
    localToken: {
      symbol: 'PGSXP',
      name: 'Pegasus Sight XP',
      price: 0.015,
      change24h: 0.5,
      contractAddress: '0x20c0DD8B6559912acfAC2ce061B8d5b19Db8CA84'
    },
    treasury: { locked: '1,000,000', earnings: '0.000', asset: 'AOXC' },
    marketStats: { taxRevenue24h: '4,200 AOXC', exchangeRate: '1 PGSXP = 0.0150 AOXC' },
    missions: [
      { id: 1, status: 'PENDING', label: 'Price Feed Update' },
      { id: 2, status: 'PENDING', label: 'Data Validation' },
      { id: 3, status: 'PENDING', label: 'Node Consensus' }
    ],
    icon: 'Eye'
  },
  {
    id: 'quasar',
    name: 'QUASAR SENTRY',
    role: 'Security Monitoring',
    contractRef: 'QUASAR_SENTRY.sol',
    status: 'active',
    description: 'Tehdit algılama kalkanı ve siber savunma hattı.',
    themeColor: 'rose', // Red
    localToken: {
      symbol: 'QSRXP',
      name: 'Quasar Shield XP',
      price: 0.006,
      change24h: 3.8
    },
    treasury: { locked: '1,000,000', earnings: '0.000', asset: 'AOXC' },
    marketStats: { taxRevenue24h: '11,500 AOXC', exchangeRate: '1 QSRXP = 0.0060 AOXC' },
    missions: [
      { id: 1, status: 'PENDING', label: 'Threat Scan' },
      { id: 2, status: 'PENDING', label: 'Firewall Patch' },
      { id: 3, status: 'PENDING', label: 'Incident Response' }
    ],
    icon: 'ShieldAlert'
  },
  {
    id: 'virgo',
    name: 'VIRGO FABRICATOR',
    role: 'Asset Production',
    contractRef: 'VIRGO_FABRICATOR.sol',
    status: 'maintenance',
    description: 'NFT, Sentetik varlık ve gemi parçası üretim tesisi.',
    themeColor: 'fuchsia', // Pink
    localToken: {
      symbol: 'VRGXP',
      name: 'Virgo Matter XP',
      price: 0.035,
      change24h: 12.4
    },
    treasury: { locked: '1,000,000', earnings: '0.000', asset: 'AOXC' },
    marketStats: { taxRevenue24h: '22,100 AOXC', exchangeRate: '1 VRGXP = 0.0350 AOXC' },
    missions: [
      { id: 1, status: 'PENDING', label: 'Asset Minting' },
      { id: 2, status: 'PENDING', label: 'Metadata Update' },
      { id: 3, status: 'PENDING', label: 'Supply Audit' }
    ],
    icon: 'Box'
  },
  {
    id: 'sombrero',
    name: 'SOMBRERO SENTINEL',
    role: 'Compliance & Policy',
    contractRef: 'SOMBRERO_SENTINEL.sol',
    status: 'active',
    description: 'Yasal uyumluluk, KYC ve transfer politikaları denetçisi.',
    themeColor: 'orange', // Orange
    localToken: {
      symbol: 'SMBXP',
      name: 'Sombrero Badge XP',
      price: 0.0008,
      change24h: 0.0
    },
    treasury: { locked: '1,000,000', earnings: '0.000', asset: 'AOXC' },
    marketStats: { taxRevenue24h: '1,200 AOXC', exchangeRate: '1 SMBXP = 0.0008 AOXC' },
    missions: [
      { id: 1, status: 'PENDING', label: 'KYC Check' },
      { id: 2, status: 'PENDING', label: 'Policy Enforce' },
      { id: 3, status: 'PENDING', label: 'Audit Log' }
    ],
    icon: 'Scale'
  }
]

export const MOCK_PROPOSALS: Proposal[] = [
  {
    id: 1042,
    title: 'AOXCHub Upgrade v2.1',
    proposer: '0x71...9A23',
    description:
      "AOXCHub.sol sözleşmesinde işlem ücretlerinin optimize edilmesi ve Hazine payının %2'den %2.5'a çıkarılması teklifidir.",
    forVotes: 154000,
    againstVotes: 12000,
    endTime: '24s 12dk',
    status: 'Active',
    module: 'ANDROMEDA'
  },
  {
    id: 1041,
    title: 'Aquila Liquidity Mining Program',
    proposer: '0x88...BB11',
    description: 'USDC-AOXC çifti için yeni farming ödüllerinin aktifleştirilmesi.',
    forVotes: 450000,
    againstVotes: 445000,
    endTime: '0s',
    status: 'Executed',
    module: 'AQUILA'
  },
  {
    id: 1040,
    title: 'Blacklist Malicious Wallets',
    proposer: 'Quasar System',
    description: 'Son köprü saldırısıyla ilişkili cüzdanların dondurulması.',
    forVotes: 800000,
    againstVotes: 0,
    endTime: '0s',
    status: 'Executed',
    module: 'QUASAR'
  }
]

const SOL_BOILERPLATE = (name: string) => `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "../interfaces/I${name}.sol";

/**
 * @title ${name}
 * @dev Core component of the AOXCDAO Ecosystem on X Layer.
 * Managed by Andromeda Core governance.
 */
contract ${name} is AccessControl, ReentrancyGuard, I${name} {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    
    event LogProcess(address indexed caller, uint256 timestamp);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function executeOp() external onlyRole(ADMIN_ROLE) {
        emit LogProcess(msg.sender, block.timestamp);
    }
}`

export const CONTRACT_TREE: ContractFolder[] = [
  {
    name: 'src',
    type: 'folder',
    children: [
      {
        name: 'asset',
        type: 'folder',
        children: [
          {
            name: 'AssetBackingLedger.sol',
            type: 'file',
            status: ContractStatus.MAINNET,
            version: 'v1.0',
            description: 'Varlık destek defteri.',
            content: SOL_BOILERPLATE('AssetBackingLedger'),
            deployedAddress: '0x123...abc'
          },
          {
            name: 'MintController.sol',
            type: 'file',
            status: ContractStatus.MAINNET,
            version: 'v1.2',
            description: 'AOXC basım yetkilendirmesi.',
            content: SOL_BOILERPLATE('MintController'),
            deployedAddress: '0x456...def'
          },
          {
            name: 'RedeemController.sol',
            type: 'file',
            status: ContractStatus.AUDIT,
            version: 'v0.9',
            description: 'Varlık geri ödeme kontrolcüsü.',
            content: SOL_BOILERPLATE('RedeemController')
          }
        ]
      },
      {
        name: 'compliance',
        type: 'folder',
        children: [
          {
            name: 'ComplianceRegistry.sol',
            type: 'file',
            status: ContractStatus.MAINNET,
            version: 'v2.0',
            description: 'Yasal uyumluluk kayıt defteri.',
            content: SOL_BOILERPLATE('ComplianceRegistry'),
            deployedAddress: '0x789...ghi'
          },
          {
            name: 'IdentityRegistry.sol',
            type: 'file',
            status: ContractStatus.MAINNET,
            version: 'v2.1',
            description: 'KYC/AML kimlik kayıtları.',
            content: SOL_BOILERPLATE('IdentityRegistry'),
            deployedAddress: '0xabc...123'
          },
          {
            name: 'JurisdictionRegistry.sol',
            type: 'file',
            status: ContractStatus.TESTNET,
            version: 'v0.5',
            description: 'Yargı bölgeleri haritası.',
            content: SOL_BOILERPLATE('JurisdictionRegistry')
          }
        ]
      },
      {
        name: 'core',
        type: 'folder',
        children: [
          {
            name: 'AOXCHub.sol',
            type: 'file',
            status: ContractStatus.MAINNET,
            version: 'v3.0',
            description: 'Merkezi işlem dağıtıcısı.',
            content: SOL_BOILERPLATE('AOXCHub'),
            deployedAddress: '0xCore...Hub'
          },
          {
            name: 'AOXC.sol',
            type: 'file',
            status: ContractStatus.MAINNET,
            version: 'v1.0',
            description: 'AOXC Native Token Sözleşmesi.',
            content: SOL_BOILERPLATE('AOXC'),
            deployedAddress: '0xToken...AOXC'
          },
          {
            name: 'AOXCStorage.sol',
            type: 'file',
            status: ContractStatus.MAINNET,
            version: 'v1.1',
            description: 'Kalıcı veri deposu.',
            content: SOL_BOILERPLATE('AOXCStorage')
          }
        ]
      },
      {
        name: 'governance',
        type: 'folder',
        children: [
          {
            name: 'ANDROMEDA_CORE.sol',
            type: 'file',
            status: ContractStatus.MAINNET,
            version: 'v4.0',
            description: 'Ana Yönetim Modülü.',
            content: SOL_BOILERPLATE('ANDROMEDA_CORE')
          },
          {
            name: 'AOXCGovernor.sol',
            type: 'file',
            status: ContractStatus.MAINNET,
            version: 'v2.2',
            description: 'Oylama mantığı.',
            content: SOL_BOILERPLATE('AOXCGovernor')
          },
          {
            name: 'AOXCTimelock.sol',
            type: 'file',
            status: ContractStatus.MAINNET,
            version: 'v1.0',
            description: 'İşlem gecikme kilidi.',
            content: SOL_BOILERPLATE('AOXCTimelock')
          },
          {
            name: 'AQUILA_EXCHANGE.sol',
            type: 'file',
            status: ContractStatus.MAINNET,
            version: 'v1.5',
            description: 'DEX Kontratı.',
            content: SOL_BOILERPLATE('AQUILA_EXCHANGE')
          }
        ]
      },
      {
        name: 'infrastructure',
        type: 'folder',
        children: [
          {
            name: 'BridgeAdapter.sol',
            type: 'file',
            status: ContractStatus.DEV,
            version: 'v0.1',
            description: 'Layer 2 Köprü adaptörü.',
            content: SOL_BOILERPLATE('BridgeAdapter')
          },
          {
            name: 'Treasury.sol',
            type: 'file',
            status: ContractStatus.MAINNET,
            version: 'v1.0',
            description: 'Hazine kasası.',
            content: SOL_BOILERPLATE('Treasury')
          }
        ]
      },
      {
        name: 'monitoring',
        type: 'folder',
        children: [
          {
            name: 'RiskSignals.sol',
            type: 'file',
            status: ContractStatus.DESIGN,
            version: 'v0.0.1',
            description: 'Risk analiz sinyalleri.',
            content: SOL_BOILERPLATE('RiskSignals')
          }
        ]
      }
    ]
  }
]
