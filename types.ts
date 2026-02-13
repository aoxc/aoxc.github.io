
export interface ShipModule {
  id: string;
  name: string;
  role: string;
  contractRef: string;
  status: 'active' | 'maintenance' | 'offline';
  description: string;
  // New visual & economic props
  themeColor: string; // Tailwind color class prefix (e.g., 'emerald') or Hex
  localToken: {
    symbol: string;
    name: string;
    contractAddress?: string; // Real chain address
    explorerUrl?: string;
    price: number; // in AOXC
    change24h: number; // percentage
  };
  treasury: {
    amount: string; // e.g. "124.5M"
    asset: string; // e.g. "USDC"
  };
  icon: string;
}

export interface Proposal {
  id: number;
  title: string;
  proposer: string;
  description: string;
  forVotes: number;
  againstVotes: number;
  endTime: string;
  status: 'Active' | 'Executed' | 'Defeated';
  module: string; // e.g., 'Andromeda', 'Aquila'
}

export type RankTier = 'ADMIRAL' | 'CAPTAIN' | 'GOLD' | 'SILVER' | 'BRONZE';

export interface MeritBadgeNFT {
  id: string;
  tier: RankTier;
  shipId: string; // Hangi gemiye ait olduğu
  issuedDate: string;
  tokenId: string;
}

export interface UserProfile {
  address: string;
  balance: string;
  reputation: number; // Liyakat puanı based on ReputationManager.sol
  rank: string;
  role: string; // Based on RoleAuthority.sol
  badges: MeritBadgeNFT[]; // Kullanıcının sahip olduğu NFT rozetleri
}

export enum ContractStatus {
  DESIGN = 'DESIGN',       // Tasarım/Öneri Aşaması
  DEV = 'DEV',             // Geliştirme
  TESTNET = 'TESTNET',     // Test Ağı
  AUDIT = 'AUDIT',         // Denetim/Onay
  MAINNET = 'MAINNET'      // Canlı Ağ (X Layer)
}

export interface ContractFile {
  name: string;
  type: 'file';
  status: ContractStatus;
  version: string;
  description: string;
  content: string; // Mock Solidity code
  deployedAddress?: string;
}

export interface ContractFolder {
  name: string;
  type: 'folder';
  children: (ContractFolder | ContractFile)[];
}

export enum PageView {
  DASHBOARD = 'DASHBOARD',
  GOVERNANCE = 'GOVERNANCE',
  SWAP = 'SWAP',
  TREASURY = 'TREASURY',
  PROFILE = 'PROFILE',
  MISSIONS = 'MISSIONS',
  CONTRACTS = 'CONTRACTS'
}
